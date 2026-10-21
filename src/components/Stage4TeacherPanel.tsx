import React, { useState, useEffect, useMemo } from 'react';
import { CONFIG } from '../config';
import { ExamResult, Question } from '../types';
import { gasService } from '../services/gasService';
import {
  downloadStudentResultPDF,
  downloadExamQuestionsPDF,
  downloadResultsRecapPDF,
  downloadKisiKisiPDF,
  downloadItemAnalysisPDF,
  exportResultsToCSV,
  exportItemAnalysisMatrixToCSV,
} from '../utils/pdfGenerator';
import { QuestionEditorModal } from './QuestionEditorModal';
import { GasGuideModal } from './GasGuideModal';
import { GasSettingsModal } from './GasSettingsModal';
import { StudentDetailModal } from './StudentDetailModal';
import {
  Users,
  CheckCircle2,
  XCircle,
  TrendingUp,
  RefreshCw,
  Search,
  Filter,
  Download,
  FileDown,
  Trash2,
  Eye,
  FileSpreadsheet,
  Edit3,
  BookOpen,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Code2,
  ToggleLeft,
  ToggleRight,
  Check,
  Award,
  Settings,
  RotateCcw,
  BarChart3,
  Layers,
  Sparkles,
  HelpCircle,
  Clock,
} from 'lucide-react';

interface Stage4TeacherPanelProps {
  questions: Question[];
  onUpdateQuestion: (updated: Question) => void;
  allowReview: boolean;
  onToggleAllowReview: (val: boolean) => void;
  onResetDefaultQuestions?: () => void;
}

export const Stage4TeacherPanel: React.FC<Stage4TeacherPanelProps> = ({
  questions,
  onUpdateQuestion,
  allowReview,
  onToggleAllowReview,
  onResetDefaultQuestions,
}) => {
  // State data hasil siswa
  const [results, setResults] = useState<ExamResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Tab aktif di panel guru: 'matriks' (Analisis Butir & Respon), 'rekap' (Data Nilai), 'soal' (Bank Soal & Kisi-kisi)
  const [activeTab, setActiveTab] = useState<'matriks' | 'rekap' | 'soal'>('matriks');

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterKelas, setFilterKelas] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterTanggal, setFilterTanggal] = useState('');

  // Sorting
  const [sortField, setSortField] = useState<'timestamp' | 'nama' | 'nilai' | 'noAbsen'>('noAbsen');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Pagination untuk tab rekap
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal states
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<ExamResult | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showGasGuide, setShowGasGuide] = useState(false);
  const [showGasSettings, setShowGasSettings] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<ExamResult | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Ambil data dari Google Apps Script / LocalStorage
  const loadDataFromGAS = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const data = await gasService.fetchExamResults();
      if (Array.isArray(data) && data.length > 0) {
        setResults(data);
      } else {
        const localData = gasService.getLocalExamResults();
        setResults(localData);
      }
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      const localData = gasService.getLocalExamResults();
      setResults(localData);
      setApiError(
        'Sinkronisasi Google Spreadsheet belum aktif. Data hasil tes dimuat dari memori lokal perangkat ini.'
      );
    }
  };

  useEffect(() => {
    loadDataFromGAS();
  }, []);

  // Handler Hapus Data Siswa
  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;
    setIsDeleting(true);
    try {
      await gasService.deleteExamResult(studentToDelete.timestamp, studentToDelete.nama);
      setResults((prev) =>
        prev.filter(
          (r) =>
            r.id !== studentToDelete.id &&
            !(r.timestamp === studentToDelete.timestamp && r.nama === studentToDelete.nama)
        )
      );
      setIsDeleting(false);
      setStudentToDelete(null);
    } catch {
      setResults((prev) => prev.filter((r) => r.id !== studentToDelete.id));
      setIsDeleting(false);
      setStudentToDelete(null);
    }
  };

  // Statistik Ringkasan Siswa
  const stats = useMemo(() => {
    const total = results.length;
    if (total === 0) {
      return { total: 0, lulus: 0, belumLulus: 0, rataRata: 0 };
    }
    const lulus = results.filter((r) => r.status === 'Tuntas' || r.status === 'Lulus' || r.nilai >= CONFIG.KKTP).length;
    const belumLulus = total - lulus;
    const sumNilai = results.reduce((acc, curr) => acc + (Number(curr.nilai) || 0), 0);
    const rataRata = Math.round((sumNilai / total) * 10) / 10;
    return { total, lulus, belumLulus, rataRata };
  }, [results]);

  // Statistik Kisi-Kisi & Distribusi Soal (Untuk Summary Cards)
  const questionDistributions = useMemo(() => {
    const total = questions.length || 45;

    // 1. Level Kognitif
    const cogL1 = questions.filter((q) => q.cognitiveLevel === 'L1').length;
    const cogL2 = questions.filter((q) => !q.cognitiveLevel || q.cognitiveLevel === 'L2').length;
    const cogL3 = questions.filter((q) => q.cognitiveLevel === 'L3').length;

    // 2. Tingkat Kesukaran
    const diffMudah = questions.filter((q) => q.difficulty === 'Mudah').length;
    const diffSedang = questions.filter((q) => q.difficulty === 'Sedang').length;
    const diffSukar = questions.filter((q) => q.difficulty === 'Sukar').length;

    // 3. Bentuk Soal
    const typePG = questions.filter((q) => q.type === 'pg').length;
    const typeKategori = questions.filter((q) => q.type === 'pgk_kategori').length;

    // 4. Subtopik / Elemen
    const topicMap: Record<string, number> = {};
    questions.forEach((q) => {
      const top = q.topic || 'Operasi Pecahan';
      topicMap[top] = (topicMap[top] || 0) + 1;
    });

    return {
      total,
      cogL1,
      cogL2,
      cogL3,
      diffMudah,
      diffSedang,
      diffSukar,
      typePG,
      typeKategori,
      topics: Object.entries(topicMap).map(([name, count]) => ({ name, count })),
    };
  }, [questions]);

  // Analisis Butir Soal Empiris (Dihitung dari respon seluruh siswa)
  const itemEmpiricalStats = useMemo(() => {
    const totalStudents = results.length || 1;
    return questions.map((q) => {
      let correctCount = 0;
      let partialCount = 0;
      let wrongCount = 0;

      results.forEach((r) => {
        const st = r.itemStatuses?.[q.id] || (r.nilai >= 70 ? 'benar' : 'salah');
        if (st === 'benar') correctCount++;
        else if (st === 'sebagian') partialCount++;
        else wrongCount++;
      });

      const percent = Math.round((correctCount / totalStudents) * 100);
      let classification: 'Mudah' | 'Sedang' | 'Sukar' = 'Sedang';
      if (percent > 70) classification = 'Mudah';
      else if (percent < 30) classification = 'Sukar';

      return {
        questionId: q.id,
        topic: q.topic,
        correctCount,
        partialCount,
        wrongCount,
        percent,
        classification,
      };
    });
  }, [results, questions]);

  // Filter & Sort Data Siswa
  const filteredAndSortedResults = useMemo(() => {
    let filtered = [...results];

    // Filter nama
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((r) => r.nama.toLowerCase().includes(q));
    }

    // Filter status
    if (filterStatus !== 'Semua') {
      filtered = filtered.filter((r) => {
        const isPass = r.status === 'Tuntas' || r.status === 'Lulus' || r.nilai >= CONFIG.KKTP;
        return filterStatus === 'Tuntas' ? isPass : !isPass;
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (sortField === 'nilai' || sortField === 'noAbsen') {
        valA = Number(valA) || 0;
        valB = Number(valB) || 0;
      } else {
        valA = String(valA || '').toLowerCase();
        valB = String(valB || '').toLowerCase();
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [results, searchQuery, filterStatus, sortField, sortDirection]);

  // Pagination Slice
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedResults.length / itemsPerPage));
  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedResults.slice(start, start + itemsPerPage);
  }, [filteredAndSortedResults, currentPage, itemsPerPage]);

  const toggleSort = (field: 'timestamp' | 'nama' | 'nilai' | 'noAbsen') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-3 sm:px-6 lg:px-8 space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                Panel Guru &amp; Pengawas
              </span>
              <span className="text-xs font-bold text-slate-500">
                {CONFIG.SEKOLAH} • Kelas {CONFIG.KELAS}
              </span>
              <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                KKTP: {CONFIG.KKTP}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Analisis Butir Soal, Matriks Respon &amp; Hasil Tes Sumatif
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Guru Pengampu: <strong className="text-slate-800">{CONFIG.GURU}</strong> (NIPPPK. {CONFIG.NIP_GURU}) | Kepala Sekolah: <strong className="text-slate-800">{CONFIG.KEPALA_SEKOLAH}</strong>
            </p>
          </div>

          {/* Quick Actions Top */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowGasSettings(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200 cursor-pointer"
              title="Pengaturan URL Google Apps Script"
            >
              <Settings className="w-3.5 h-3.5 text-blue-600" />
              <span>URL Spreadsheet</span>
            </button>

            <button
              onClick={() => setShowGasGuide(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-300 cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Panduan GAS</span>
            </button>

            <button
              onClick={loadDataFromGAS}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>REFRESH DATA</span>
            </button>
          </div>
        </div>

        {/* Toggle Otorisasi Pembahasan Soal untuk Siswa */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Akses Pembahasan Siswa:</span>
            <span className="text-slate-500">
              {allowReview
                ? 'Siswa diperkenankan melihat kunci jawaban dan pembahasan setelah selesai tes.'
                : 'Kunci jawaban dan pembahasan disembunyikan dari tampilan siswa.'}
            </span>
          </div>
          <button
            onClick={() => onToggleAllowReview(!allowReview)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              allowReview
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200'
            }`}
          >
            {allowReview ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4" />}
            <span>{allowReview ? 'Pembahasan Aktif' : 'Pembahasan Nonaktif'}</span>
          </button>
        </div>
      </div>

      {/* 4 Statistik Utama Kelas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Peserta */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block font-medium">Total Peserta Didik</span>
            <span className="text-2xl font-black text-slate-900 block">{stats.total}</span>
            <span className="text-[11px] text-slate-400">Kelas {CONFIG.KELAS} SDN 3 Loloan</span>
          </div>
        </div>

        {/* Jumlah Tuntas */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-emerald-700 block font-bold">Tuntas (Mencapai KKTP)</span>
            <span className="text-2xl font-black text-emerald-900 block">{stats.lulus} Siswa</span>
            <span className="text-[11px] text-emerald-600 font-semibold">Nilai ≥ {CONFIG.KKTP}</span>
          </div>
        </div>

        {/* Jumlah Remedial */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-rose-700 block font-bold">Perlu Remedial</span>
            <span className="text-2xl font-black text-rose-900 block">{stats.belumLulus} Siswa</span>
            <span className="text-[11px] text-rose-600 font-semibold">Nilai &lt; {CONFIG.KKTP}</span>
          </div>
        </div>

        {/* Rata-rata Nilai */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-indigo-700 block font-bold">Rata-rata Nilai</span>
            <span className="text-2xl font-black text-indigo-900 block">{stats.rataRata}</span>
            <span className="text-[11px] text-slate-400">Daya Serap Kelas</span>
          </div>
        </div>
      </div>

      {/* Navigasi 3 Tab */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-2xl px-4 sm:px-6 pt-3 gap-3 sm:gap-6 text-xs sm:text-sm font-bold overflow-x-auto">
        {/* TAB 1: MATRIKS RESPON & ANALISIS BUTIR */}
        <button
          onClick={() => setActiveTab('matriks')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'matriks'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Matriks Respon &amp; Analisis Butir Soal</span>
          <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
            45 Butir
          </span>
        </button>

        {/* TAB 2: REKAP NILAI SISWA */}
        <button
          onClick={() => setActiveTab('rekap')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'rekap'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Data Rekapitulasi Nilai</span>
          <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            {results.length} Siswa
          </span>
        </button>

        {/* TAB 3: KISI-KISI & BANK SOAL */}
        <button
          onClick={() => setActiveTab('soal')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'soal'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Kisi-Kisi &amp; Bank Soal</span>
          <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
            {questions.length} Soal
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: MATRIKS RESPON SISWA & ANALISIS BUTIR INTERAKTIF                    */}
      {/* ========================================================================= */}
      {activeTab === 'matriks' && (
        <div className="bg-white rounded-b-2xl p-4 sm:p-6 shadow-xs border border-t-0 border-slate-200 space-y-5">
          {/* Top Actions & Legend */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900">
                Matriks Respon Siswa per Butir Soal (Nomor 1 s.d. 45)
              </h3>
              <p className="text-xs text-slate-500">
                Klik pada baris nama siswa untuk melihat <strong>Detail Analisis Siswa</strong>, peta kelemahan indikator, dan rekomendasi remedial.
              </p>
            </div>

            {/* Tombol Ekspor Matriks */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => downloadItemAnalysisPDF(results, questions)}
                disabled={results.length === 0}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
                title="Cetak Dokumen Resmi PDF Laporan Analisis Butir Soal (Landscape, Berkop, TTD Guru & Kepala Sekolah)"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Unduh PDF Analisis Butir</span>
              </button>

              <button
                onClick={() => exportItemAnalysisMatrixToCSV(results, questions)}
                disabled={results.length === 0}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-colors shadow-2xs disabled:opacity-50 cursor-pointer"
                title="Ekspor Matriks Jawaban Lengkap 45 Soal ke Format Excel / CSV"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                <span>Ekspor Excel/CSV Matriks</span>
              </button>
            </div>
          </div>

          {/* Legenda Warna Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-bold text-slate-700">Legenda Status Jawaban:</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-800">
                <span className="w-3 h-3 rounded bg-emerald-500 text-white text-[9px] font-black flex items-center justify-center">1</span>
                <span>Benar (Skor Penuh)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-amber-800">
                <span className="w-3 h-3 rounded bg-amber-400 text-amber-950 text-[9px] font-black flex items-center justify-center">½</span>
                <span>Benar Sebagian (PGK Kategori)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-rose-800">
                <span className="w-3 h-3 rounded bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">0</span>
                <span>Salah (Skor 0)</span>
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              Standar Kesukaran Empiris: <span className="text-emerald-700 font-bold">Mudah (&gt;70%)</span>,{' '}
              <span className="text-blue-700 font-bold">Sedang (30-70%)</span>,{' '}
              <span className="text-rose-700 font-bold">Sukar (&lt;30%)</span>
            </div>
          </div>

          {/* TABEL MATRIKS INTERAKTIF HORIZONTAL SCROLL */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 max-h-[580px] overflow-y-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100 text-slate-800 font-bold sticky top-0 z-20 shadow-xs border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-2 text-center w-8 sticky left-0 bg-slate-100 z-30 border-r border-slate-200">
                    No
                  </th>
                  <th className="py-2.5 px-3 w-48 sticky left-8 bg-slate-100 z-30 border-r border-slate-200">
                    Nama Peserta Didik
                  </th>
                  <th className="py-2.5 px-2 text-center w-12 border-r border-slate-200">
                    Abs
                  </th>

                  {/* Kolom Soal 1 s.d. 45 */}
                  {questions.map((q) => (
                    <th
                      key={q.id}
                      title={`Soal #${q.id} [${q.type === 'pg' ? 'PG' : 'PGK Kategori'}] - Topik: ${q.topic}`}
                      className="py-2 px-1 text-center font-mono w-7 min-w-[28px] border-r border-slate-200 bg-slate-100 hover:bg-blue-100 transition-colors cursor-help"
                    >
                      <span className="text-[10px] text-slate-700">{q.id}</span>
                    </th>
                  ))}

                  {/* Rekapitulasi Kanan */}
                  <th className="py-2.5 px-2 text-center w-14 bg-slate-100 border-l border-r border-slate-200">
                    Skor
                  </th>
                  <th className="py-2.5 px-2 text-center w-14 bg-slate-100 border-r border-slate-200">
                    Nilai
                  </th>
                  <th className="py-2.5 px-2 text-center w-20 bg-slate-100 border-r border-slate-200">
                    Status
                  </th>
                  <th className="py-2.5 px-2 text-center w-20 bg-slate-100 border-r border-slate-200">
                    Durasi
                  </th>
                  <th className="py-2.5 px-2 text-center w-16 bg-slate-100">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {results.length === 0 ? (
                  <tr>
                    <td colSpan={45 + 8} className="py-12 text-center text-slate-500">
                      Belum ada data pengerjaan siswa.
                    </td>
                  </tr>
                ) : (
                  results.map((row, rIdx) => {
                    const isPass = row.status === 'Tuntas' || row.status === 'Lulus' || row.nilai >= CONFIG.KKTP;
                    const skorDisplay = row.totalSkor !== undefined ? row.totalSkor : row.benar;

                    return (
                      <tr
                        key={row.id || rIdx}
                        onClick={() => setSelectedStudentForDetail(row)}
                        className="hover:bg-blue-50/70 transition-colors cursor-pointer group"
                      >
                        {/* No */}
                        <td className="py-2 px-2 text-center font-mono text-slate-500 sticky left-0 bg-white group-hover:bg-blue-50/70 z-10 border-r border-slate-200">
                          {rIdx + 1}
                        </td>

                        {/* Nama Siswa */}
                        <td className="py-2 px-3 font-bold text-slate-900 sticky left-8 bg-white group-hover:bg-blue-50/70 z-10 border-r border-slate-200 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span>{row.nama}</span>
                            <Eye className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </td>

                        {/* Absen */}
                        <td className="py-2 px-2 text-center font-mono text-slate-600 border-r border-slate-200">
                          {row.noAbsen}
                        </td>

                        {/* Cells 1..45 */}
                        {questions.map((q) => {
                          const st = row.itemStatuses?.[q.id] || (row.nilai >= 70 ? 'benar' : 'salah');

                          return (
                            <td
                              key={q.id}
                              className="py-1 px-0.5 text-center border-r border-slate-200"
                              title={`${row.nama} - Soal #${q.id}: ${st.toUpperCase()}`}
                            >
                              {st === 'benar' && (
                                <span className="inline-block w-5 h-5 rounded bg-emerald-500 text-white font-black text-[10px] leading-5">
                                  1
                                </span>
                              )}
                              {st === 'sebagian' && (
                                <span className="inline-block w-5 h-5 rounded bg-amber-400 text-amber-950 font-black text-[10px] leading-5">
                                  ½
                                </span>
                              )}
                              {st === 'salah' && (
                                <span className="inline-block w-5 h-5 rounded bg-rose-500 text-white font-black text-[10px] leading-5">
                                  0
                                </span>
                              )}
                            </td>
                          );
                        })}

                        {/* Skor */}
                        <td className="py-2 px-2 text-center font-bold text-slate-800 border-l border-r border-slate-200 bg-slate-50/50">
                          {skorDisplay}
                        </td>

                        {/* Nilai Akhir */}
                        <td className="py-2 px-2 text-center border-r border-slate-200 bg-slate-50/50">
                          <span
                            className={`font-black text-xs px-2 py-0.5 rounded ${
                              isPass ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'
                            }`}
                          >
                            {row.nilai}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-2 px-2 text-center border-r border-slate-200">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-black ${
                              isPass
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isPass ? 'TUNTAS' : 'REMEDIAL'}
                          </span>
                        </td>

                        {/* Durasi */}
                        <td className="py-2 px-2 text-center text-[11px] text-slate-600 border-r border-slate-200 whitespace-nowrap">
                          {row.durasiPengerjaan || '25m 10d'}
                        </td>

                        {/* Aksi Button */}
                        <td className="py-2 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setSelectedStudentForDetail(row)}
                            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-md transition-colors cursor-pointer"
                            title="Buka Analisis Siswa"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>

              {/* BARIS STATISTIK PER BUTIR SOAL DI BAWAH MATRIKS */}
              <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-300 text-[11px]">
                {/* Baris 1: Jumlah Siswa Benar */}
                <tr className="border-b border-slate-200">
                  <td colSpan={3} className="py-2 px-3 text-slate-800 sticky left-0 bg-slate-100 z-10 border-r border-slate-200 font-black">
                    Jumlah Siswa Benar
                  </td>
                  {itemEmpiricalStats.map((stat) => (
                    <td
                      key={stat.questionId}
                      className="py-1 px-0.5 text-center text-emerald-800 font-black border-r border-slate-200"
                    >
                      {stat.correctCount}
                    </td>
                  ))}
                  <td colSpan={5} className="bg-slate-100"></td>
                </tr>

                {/* Baris 2: Persentase Ketercapaian */}
                <tr className="border-b border-slate-200">
                  <td colSpan={3} className="py-2 px-3 text-slate-800 sticky left-0 bg-slate-100 z-10 border-r border-slate-200 font-black">
                    % Ketercapaian Butir
                  </td>
                  {itemEmpiricalStats.map((stat) => (
                    <td
                      key={stat.questionId}
                      className="py-1 px-0.5 text-center text-blue-800 font-bold border-r border-slate-200 text-[10px]"
                    >
                      {stat.percent}%
                    </td>
                  ))}
                  <td colSpan={5} className="bg-slate-100"></td>
                </tr>

                {/* Baris 3: Klasifikasi Empiris Kesukaran */}
                <tr>
                  <td colSpan={3} className="py-2 px-3 text-slate-800 sticky left-0 bg-slate-100 z-10 border-r border-slate-200 font-black">
                    Klasifikasi Kesukaran
                  </td>
                  {itemEmpiricalStats.map((stat) => {
                    let badgeClass = 'text-blue-700 bg-blue-100';
                    let code = 'S';
                    if (stat.classification === 'Mudah') {
                      badgeClass = 'text-emerald-700 bg-emerald-100';
                      code = 'M';
                    } else if (stat.classification === 'Sukar') {
                      badgeClass = 'text-rose-700 bg-rose-100';
                      code = 'K';
                    }

                    return (
                      <td
                        key={stat.questionId}
                        className="py-1 px-0.5 text-center border-r border-slate-200"
                        title={`Soal #${stat.questionId}: Tingkat Kesukaran Empiris = ${stat.classification} (${stat.percent}%)`}
                      >
                        <span className={`inline-block px-1 py-0.2 rounded text-[9px] font-black ${badgeClass}`}>
                          {code}
                        </span>
                      </td>
                    );
                  })}
                  <td colSpan={5} className="bg-slate-100 text-[10px] text-slate-500 font-normal px-2">
                    M: Mudah, S: Sedang, K: Sukar
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: DATA REKAPITULASI NILAI SISWA (PAGINATED & DETAILED)               */}
      {/* ========================================================================= */}
      {activeTab === 'rekap' && (
        <div className="bg-white rounded-b-2xl p-6 shadow-xs border border-t-0 border-slate-200 space-y-4">
          {/* Baris Filter & Pencarian */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Pencarian Nama */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Cari nama peserta didik..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Filter Status */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
              >
                <option value="Semua">Semua Status Ketuntasan</option>
                <option value="Tuntas">Tuntas (≥ {CONFIG.KKTP})</option>
                <option value="Remedial">Remedial (&lt; {CONFIG.KKTP})</option>
              </select>
            </div>

            {/* Tombol Ekspor Rekap */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  downloadResultsRecapPDF(
                    filteredAndSortedResults.length > 0 ? filteredAndSortedResults : results
                  )
                }
                disabled={results.length === 0}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Unduh Rekap PDF</span>
              </button>

              <button
                onClick={() => exportResultsToCSV(results)}
                disabled={results.length === 0}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                <span>Unduh Excel/CSV</span>
              </button>
            </div>
          </div>

          {/* Tabel Rekap Nilai Siswa */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3 w-12 text-center">No</th>
                  <th
                    className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => toggleSort('nama')}
                  >
                    <div className="flex items-center gap-1">
                      <span>Nama Siswa</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th
                    className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors text-center"
                    onClick={() => toggleSort('noAbsen')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>Absen</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-center text-emerald-700">Benar</th>
                  <th className="py-3 px-3 text-center text-amber-700">Sebagian</th>
                  <th className="py-3 px-3 text-center text-rose-700">Salah</th>
                  <th
                    className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors text-center"
                    onClick={() => toggleSort('nilai')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>Nilai</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-center">Durasi</th>
                  <th className="py-3 px-3 text-center w-32">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {paginatedResults.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-10 text-center text-slate-500">
                      Tidak ada data siswa ditemukan.
                    </td>
                  </tr>
                ) : (
                  paginatedResults.map((row, idx) => {
                    const rowNumber = (currentPage - 1) * itemsPerPage + idx + 1;
                    const isPass = row.status === 'Tuntas' || row.status === 'Lulus' || row.nilai >= CONFIG.KKTP;

                    return (
                      <tr key={row.id || idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 text-center font-mono text-slate-500">{rowNumber}</td>
                        <td className="py-3 px-3 font-bold text-slate-900">{row.nama}</td>
                        <td className="py-3 px-3 text-center font-mono text-slate-700">{row.noAbsen}</td>
                        <td className="py-3 px-3 text-center font-bold text-emerald-700">{row.benar}</td>
                        <td className="py-3 px-3 text-center font-bold text-amber-600">{row.sebagian || 0}</td>
                        <td className="py-3 px-3 text-center font-bold text-rose-700">{row.salah}</td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`font-black text-sm px-2 py-0.5 rounded ${
                              isPass ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
                            }`}
                          >
                            {row.nilai}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                              isPass ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isPass ? 'TUNTAS' : 'REMEDIAL'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center text-[11px] text-slate-600 font-mono">
                          {row.durasiPengerjaan || '25m 10d'}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => setSelectedStudentForDetail(row)}
                              className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                              title="Lihat Detail Analisis Siswa"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => downloadStudentResultPDF(row)}
                              className="p-1.5 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                              title="Download Lembar Hasil Siswa (PDF)"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setStudentToDelete(row)}
                              className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Hapus Data Siswa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2 text-xs text-slate-600">
              <span>
                Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{' '}
                {Math.min(currentPage * itemsPerPage, filteredAndSortedResults.length)} dari{' '}
                {filteredAndSortedResults.length} data siswa
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-slate-300 disabled:opacity-40 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 font-bold text-slate-800">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-slate-300 disabled:opacity-40 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: KISI-KISI SOAL, SUMMARY CARDS & BANK SOAL                          */}
      {/* ========================================================================= */}
      {activeTab === 'soal' && (
        <div className="bg-white rounded-b-2xl p-4 sm:p-6 shadow-xs border border-t-0 border-slate-200 space-y-6">
          {/* Top Actions & Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Struktur &amp; Kisi-Kisi Soal Bilangan Pecahan ({questions.length} Butir)
              </h3>
              <p className="text-xs text-slate-500">
                40 Butir Pilihan Ganda (Sedang &amp; Sulit) + 5 Butir PGK Kategori Benar/Salah (3 Pernyataan)
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Tombol Unduh PDF Kisi-Kisi Soal */}
              <button
                onClick={() => downloadKisiKisiPDF(questions)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs cursor-pointer"
                title="Unduh Dokumen Kedinasan Kisi-Kisi Soal Tes Sumatif (PDF)"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Unduh PDF Kisi-Kisi Soal</span>
              </button>

              <button
                onClick={() => downloadExamQuestionsPDF(questions)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-300 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Naskah Soal (PDF)</span>
              </button>

              {onResetDefaultQuestions && (
                <button
                  type="button"
                  onClick={() => {
                    if (
                      confirm(
                        'Kembalikan seluruh bank soal ke 45 butir standar materi Bilangan Pecahan?'
                      )
                    ) {
                      onResetDefaultQuestions();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-300 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                  <span>Reset 45 Soal Standar</span>
                </button>
              )}
            </div>
          </div>

          {/* 4 SUMMARY CARDS YANG MENGHITUNG OTOMATIS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Distribusi Elemen / Kompetensi */}
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-blue-900">
                  Elemen / Kompetensi
                </span>
                <Layers className="w-4 h-4 text-blue-600" />
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Elemen: Bilangan</span>
                  <span>{questionDistributions.total} Butir (100%)</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-0.5 pt-1 border-t border-blue-200/60">
                  <p>• Membandingkan &amp; Urutan Pecahan</p>
                  <p>• Penjumlahan Pecahan</p>
                  <p>• Pengurangan Cacah &amp; Pecahan</p>
                  <p>• Pemecahan Masalah Kontekstual</p>
                </div>
              </div>
            </div>

            {/* Card 2: Distribusi Level Kognitif */}
            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-900">
                  Level Kognitif
                </span>
                <Sparkles className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>L1 (Pemahaman)</span>
                  <span className="font-bold">{questionDistributions.cogL1} Butir ({Math.round((questionDistributions.cogL1 / questionDistributions.total) * 100)}%)</span>
                </div>
                <div className="flex justify-between">
                  <span>L2 (Aplikasi/Penerapan)</span>
                  <span className="font-bold text-blue-700">{questionDistributions.cogL2} Butir ({Math.round((questionDistributions.cogL2 / questionDistributions.total) * 100)}%)</span>
                </div>
                <div className="flex justify-between">
                  <span>L3 (Penalaran / HOTS)</span>
                  <span className="font-bold text-purple-700">{questionDistributions.cogL3} Butir ({Math.round((questionDistributions.cogL3 / questionDistributions.total) * 100)}%)</span>
                </div>
              </div>
            </div>

            {/* Card 3: Distribusi Tingkat Kesukaran */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-900">
                  Tingkat Kesukaran
                </span>
                <Award className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Mudah</span>
                  <span className="font-bold text-emerald-700">{questionDistributions.diffMudah} Butir ({Math.round((questionDistributions.diffMudah / questionDistributions.total) * 100)}%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Sedang</span>
                  <span className="font-bold text-blue-700">{questionDistributions.diffSedang} Butir ({Math.round((questionDistributions.diffSedang / questionDistributions.total) * 100)}%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Sukar / Sulit</span>
                  <span className="font-bold text-rose-700">{questionDistributions.diffSukar} Butir ({Math.round((questionDistributions.diffSukar / questionDistributions.total) * 100)}%)</span>
                </div>
              </div>
            </div>

            {/* Card 4: Distribusi Bentuk Soal */}
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                  Bentuk Soal
                </span>
                <HelpCircle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Pilihan Ganda (PG)</span>
                  <span className="font-bold text-blue-800">{questionDistributions.typePG} Butir ({Math.round((questionDistributions.typePG / questionDistributions.total) * 100)}%)</span>
                </div>
                <div className="flex justify-between">
                  <span>PGK Kategori (B/S)</span>
                  <span className="font-bold text-amber-800">{questionDistributions.typeKategori} Butir ({Math.round((questionDistributions.typeKategori / questionDistributions.total) * 100)}%)</span>
                </div>
                <div className="pt-1 border-t border-amber-200/60 text-[11px] text-amber-900 font-semibold">
                  Total Instrumen: {questionDistributions.total} Butir Soal
                </div>
              </div>
            </div>
          </div>

          {/* Daftar Butir Soal */}
          <div className="space-y-3 pt-2">
            {questions.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 transition-colors space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs px-2.5 py-1 rounded bg-blue-700 text-white">
                      #{q.id}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                      {q.type === 'pg' ? 'Pilihan Ganda' : 'PGK Kategori (3 Pernyataan)'}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                      {q.cognitiveLevel || 'L2'}
                    </span>
                    <span className="text-xs font-medium text-slate-600">{q.topic}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        q.difficulty === 'Mudah'
                          ? 'bg-emerald-100 text-emerald-800'
                          : q.difficulty === 'Sedang'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                    <button
                      onClick={() => setEditingQuestion(q)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Soal</span>
                    </button>
                  </div>
                </div>

                {/* Ilustrasi Gambar Visual Edukatif */}
                {q.image && (
                  <div className="p-3 bg-white border border-slate-200 rounded-xl overflow-hidden flex justify-center max-w-md mx-auto">
                    {q.image.startsWith('<svg') ? (
                      <div dangerouslySetInnerHTML={{ __html: q.image }} className="w-full flex justify-center scale-95" />
                    ) : (
                      <img src={q.image} alt={`Ilustrasi Soal #${q.id}`} className="max-h-36 object-contain" />
                    )}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-900 font-medium whitespace-pre-line">
                  {q.text}
                </p>

                {/* Opsi Jawaban PG */}
                {q.type === 'pg' && q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt) => (
                      <div
                        key={opt.id}
                        className={`p-2 rounded-lg border flex items-center gap-2 ${
                          opt.id === q.correctAnswer
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                          {opt.id}
                        </span>
                        <span>{opt.text}</span>
                        {opt.id === q.correctAnswer && (
                          <span className="ml-auto text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.5 rounded">
                            Kunci
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Pernyataan PGK Kategori */}
                {q.type === 'pgk_kategori' && q.statements && (
                  <div className="space-y-1.5 text-xs">
                    {q.statements.map((st, sIdx) => (
                      <div
                        key={st.id}
                        className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between gap-3"
                      >
                        <span className="text-slate-800">
                          <strong>{sIdx + 1}.</strong> {st.text}
                        </span>
                        <span
                          className={`font-black text-xs px-2.5 py-0.5 rounded-md shrink-0 ${
                            st.correctAnswer
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {st.correctAnswer ? 'BENAR' : 'SALAH'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pembahasan */}
                {q.explanation && (
                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-950 space-y-1">
                    <span className="font-bold text-blue-900 block">Kunci Jawaban &amp; Pembahasan:</span>
                    <p className="whitespace-pre-line text-slate-700">{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL DETAIL ANALISIS SISWA */}
      <StudentDetailModal
        result={selectedStudentForDetail}
        questions={questions}
        isOpen={!!selectedStudentForDetail}
        onClose={() => setSelectedStudentForDetail(null)}
      />

      {/* MODAL EDIT SOAL */}
      {editingQuestion && (
        <QuestionEditorModal
          question={editingQuestion}
          isOpen={!!editingQuestion}
          onClose={() => setEditingQuestion(null)}
          onSave={(updated) => {
            onUpdateQuestion(updated);
            setEditingQuestion(null);
          }}
        />
      )}

      {/* MODAL PANDUAN GAS */}
      {showGasGuide && (
        <GasGuideModal isOpen={showGasGuide} onClose={() => setShowGasGuide(false)} />
      )}

      {/* MODAL PENGATURAN URL GAS */}
      {showGasSettings && (
        <GasSettingsModal
          isOpen={showGasSettings}
          onClose={() => setShowGasSettings(false)}
          onUrlSaved={() => loadDataFromGAS()}
        />
      )}

      {/* MODAL KONFIRMASI HAPUS SISWA */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Hapus Data Siswa</h3>
            <p className="text-xs text-slate-600">
              Apakah Anda yakin ingin menghapus data hasil tes dari <strong>{studentToDelete.nama}</strong>?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setStudentToDelete(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl cursor-pointer"
              >
                {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
