import React, { useMemo } from 'react';
import { CONFIG } from '../config';
import { ExamResult, Question } from '../types';
import { downloadStudentResultPDF } from '../utils/pdfGenerator';
import {
  X,
  Download,
  User,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Target,
  Clock,
  BookOpen,
  Award,
  ChevronRight,
} from 'lucide-react';

interface StudentDetailModalProps {
  result: ExamResult | null;
  questions?: Question[];
  isOpen: boolean;
  onClose: () => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  result,
  questions = [],
  isOpen,
  onClose,
}) => {
  if (!isOpen || !result) return null;

  const isPass = result.status === 'Tuntas' || result.status === 'Lulus' || result.nilai >= CONFIG.KKTP;

  // Analisis Butir & Topik Kelemahan
  const analysis = useMemo(() => {
    const wrongQuestions: { q: Question; userStatus: string }[] = [];
    const correctQuestions: Question[] = [];
    const topicStats: Record<string, { total: number; correct: number; wrong: number }> = {};

    questions.forEach((q) => {
      const status = result.itemStatuses?.[q.id] || (
        // fallback heuristic if itemStatuses not stored
        result.detailJawaban && result.detailJawaban[q.id] !== undefined
          ? (result.nilai >= 80 ? 'benar' : 'salah')
          : 'salah'
      );

      // Track topic
      const topicName = q.topic || 'Operasi Pecahan';
      if (!topicStats[topicName]) {
        topicStats[topicName] = { total: 0, correct: 0, wrong: 0 };
      }
      topicStats[topicName].total += 1;

      if (status === 'benar') {
        correctQuestions.push(q);
        topicStats[topicName].correct += 1;
      } else {
        wrongQuestions.push({ q, userStatus: status });
        topicStats[topicName].wrong += 1;
      }
    });

    // Identifikasi topik dengan tingkat kesalahan tertinggi
    const weakTopics = Object.entries(topicStats)
      .filter(([_, stat]) => stat.wrong > 0)
      .sort((a, b) => b[1].wrong / b[1].total - a[1].wrong / a[1].total)
      .map(([topic, stat]) => ({
        topic,
        errorRate: Math.round((stat.wrong / stat.total) * 100),
        wrongCount: stat.wrong,
        totalCount: stat.total,
      }));

    return {
      wrongQuestions,
      correctQuestions,
      weakTopics,
    };
  }, [result, questions]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 relative overflow-hidden">
        {/* Header Modal */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900">{result.nama}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  Absen {result.noAbsen}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Kelas {result.kelas || CONFIG.KELAS} • {CONFIG.SEKOLAH}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          {/* Card Hasil Ringkas */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/30 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Hasil Akhir Tes Sumatif
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span
                  className={`text-3xl font-black ${
                    isPass ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {result.nilai}
                </span>
                <span className="text-xs text-slate-500 font-medium">/ 100</span>
                <span
                  className={`ml-2 inline-flex items-center gap-1 text-xs font-black px-2.5 py-0.5 rounded-full ${
                    isPass
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {isPass ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  {isPass ? 'TUNTAS' : 'REMEDIAL'} (KKTP: {CONFIG.KKTP})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
              <div>
                <span className="text-slate-400 block text-[11px]">Durasi Pengerjaan:</span>
                <span className="font-bold text-slate-800 inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  {result.durasiPengerjaan || '25m 10d'}
                </span>
              </div>
              <div className="border-l border-slate-200 pl-4">
                <span className="text-slate-400 block text-[11px]">Waktu Selesai:</span>
                <span className="font-semibold text-slate-700">{result.timestamp}</span>
              </div>
            </div>
          </div>

          {/* 3 Metrics Badge: Benar, Sebagian, Salah */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-[11px] font-bold text-emerald-700 block">Benar Penuh</span>
              <span className="text-xl font-black text-emerald-800">{result.benar} Soal</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-[11px] font-bold text-amber-700 block">Benar Sebagian</span>
              <span className="text-xl font-black text-amber-800">{result.sebagian || 0} Soal</span>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-center">
              <span className="text-[11px] font-bold text-rose-700 block">Salah</span>
              <span className="text-xl font-black text-rose-800">{result.salah} Soal</span>
            </div>
          </div>

          {/* 1. SEBARAN BUTIR SOAL (GRID 1 S.D. 45) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                <Target className="w-4 h-4 text-blue-600" />
                <span>Peta Respon Butir Soal (Nomor 1 s.d. {questions.length || 45})</span>
              </h4>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="inline-flex items-center gap-1 text-emerald-700">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block"></span> Benar
                </span>
                <span className="inline-flex items-center gap-1 text-amber-700">
                  <span className="w-2.5 h-2.5 rounded bg-amber-400 inline-block"></span> Sebagian
                </span>
                <span className="inline-flex items-center gap-1 text-rose-700">
                  <span className="w-2.5 h-2.5 rounded bg-rose-500 inline-block"></span> Salah
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap gap-1.5">
              {questions.map((q) => {
                const st = result.itemStatuses?.[q.id] || (result.benar > q.id ? 'benar' : 'salah');
                let colorClass = 'bg-rose-500 text-white';
                if (st === 'benar') colorClass = 'bg-emerald-500 text-white';
                if (st === 'sebagian') colorClass = 'bg-amber-400 text-amber-950 font-black';

                return (
                  <div
                    key={q.id}
                    title={`Soal #${q.id}: ${q.topic} - Status: ${st.toUpperCase()}`}
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center cursor-help transition-transform hover:scale-110 shadow-2xs ${colorClass}`}
                  >
                    {q.id}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. ANALISIS KELEMAHAN INDIKATOR & TOPIK MATERI */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Analisis Kelemahan Indikator &amp; Topik Materi</span>
            </h4>

            {analysis.weakTopics.length === 0 ? (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Siswa telah menguasai seluruh indikator dan topik materi bilangan pecahan dengan sangat baik!</span>
              </div>
            ) : (
              <div className="space-y-2">
                {analysis.weakTopics.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 text-xs">{item.topic}</span>
                      <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {item.wrongCount} dari {item.totalCount} Soal Belum Tepat ({item.errorRate}%)
                      </span>
                    </div>
                    {/* Progress Bar Error */}
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-rose-500 h-2 rounded-full transition-all"
                        style={{ width: `${item.errorRate}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. REKOMENDASI TINDAK LANJUT / REMEDIAL SPESIFIK */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
            <h4 className="font-bold text-blue-900 text-xs sm:text-sm flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-blue-700" />
              <span>Rekomendasi Tindak Lanjut Guru (Remedial &amp; Pengayaan)</span>
            </h4>
            <div className="text-xs text-blue-950 space-y-1.5">
              {isPass ? (
                <>
                  <p className="font-semibold text-emerald-800">
                    Program Pengayaan (Enrichment):
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    <li>Siswa telah mencapai standar KKTP ({CONFIG.KKTP}) dengan hasil memuaskan.</li>
                    <li>
                      Berikan tantangan soal HOTS tingkat lanjut: Operasi perkalian dan pembagian bilangan pecahan serta kombinasi pecahan desimal.
                    </li>
                    <li>Siswa dapat diberdayakan menjadi tutor sebaya untuk membantu rekan sekelas yang memerlukan remedial.</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="font-semibold text-rose-800">
                    Program Remedial Terstruktur:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    <li>
                      Perlu bimbingan intensif pada materi: <strong className="text-slate-900">{analysis.weakTopics.map((t) => t.topic).slice(0, 2).join(', ') || 'Operasi Pecahan'}</strong>.
                    </li>
                    <li>
                      Lakukan pengulangan konsep dasar mencari KPK penyebut sebelum menjumlahkan atau mengurangkan pecahan berpenyebut beda.
                    </li>
                    <li>
                      Gunakan alat peraga konkret atau diagram lingkaran/batang berarsir untuk memvisualisasikan pengurangan bilangan cacah (misal: 3 - 3/4).
                    </li>
                    <li>Jadwalkan tes remedial ulang pada butir soal indikator yang belum tuntas.</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer Modal */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-2 bg-slate-50/80">
          <button
            onClick={() => downloadStudentResultPDF(result)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Lembar Hasil Siswa (PDF)</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
