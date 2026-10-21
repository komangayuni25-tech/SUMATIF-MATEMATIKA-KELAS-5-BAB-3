import { jsPDF } from 'jspdf';
import { CONFIG } from '../config';
import { ExamResult, Question } from '../types';

/**
 * Format tanggal dalam bahasa Indonesia
 */
export function formatIndonesianDate(dateStr?: string): string {
  const d = dateStr ? new Date(dateStr) : new Date();
  if (isNaN(d.getTime())) {
    return new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * 1. Download Lembar Hasil Tes Siswa (Tanda Tangan Guru & Orang Tua/Wali)
 */
export function downloadStudentResultPDF(result: ExamResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 16;

  // --- KOP SURAT SEKOLAH ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 5.5;
  doc.setFontSize(13);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(CONFIG.ALAMAT_SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 3;

  // Garis Pembatas Kop
  doc.setLineWidth(0.8);
  doc.line(15, y, pageWidth - 15, y);
  doc.setLineWidth(0.2);
  doc.line(15, y + 0.8, pageWidth - 15, y + 0.8);
  y += 7;

  // --- JUDUL DOKUMEN ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.text('LEMBAR LAPORAN HASIL TES SUMATIF MATEMATIKA', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Tahun Ajaran 2025/2026 • Kurikulum Merdeka`, pageWidth / 2, y, { align: 'center' });
  y += 8;

  // --- DATA IDENTITAS SISWA ---
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, y, pageWidth - 30, 36, 2, 2, 'FD');

  doc.setFontSize(9);
  const leftX = 20;
  const col2X = 54;
  const rightX = 112;
  const col4X = 146;

  y += 6.5;
  doc.setFont('helvetica', 'bold');
  doc.text('Nama Peserta', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.nama}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Mata Pelajaran', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${CONFIG.MATA_PELAJARAN}`, col4X, y);

  y += 6.5;
  doc.setFont('helvetica', 'bold');
  doc.text('Nomor Absen', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.noAbsen}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Lingkup Materi', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: Bilangan Pecahan`, col4X, y);

  y += 6.5;
  doc.setFont('helvetica', 'bold');
  doc.text('Kelas', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: Kelas ${result.kelas || CONFIG.KELAS}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Standar KKTP', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${CONFIG.KKTP} (Skala 100)`, col4X, y);

  y += 6.5;
  doc.setFont('helvetica', 'bold');
  doc.text('Waktu Selesai', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.timestamp}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Durasi Pengerjaan', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.durasiPengerjaan || '25 menit'}`, col4X, y);

  y += 11;

  // --- TABEL PEROLEHAN HASIL ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('A. Rincian Perolehan Nilai & Ketuntasan', 15, y);
  y += 4.5;

  // Header Tabel
  doc.setFillColor(30, 58, 138); // Dark Navy
  doc.rect(15, y, pageWidth - 30, 7.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8.5);
  doc.text('Komponen Penilaian Hasil Tes', 20, y + 5);
  doc.text('Perolehan / Status', pageWidth - 45, y + 5, { align: 'right' });
  doc.setTextColor(0, 0, 0);
  y += 7.5;

  const totalSoal = CONFIG.TOTAL_SOAL || 45;
  const tableRows = [
    { label: 'Jumlah Butir Soal Keseluruhan', value: `${totalSoal} Butir (40 PG + 5 PGK Kategori)` },
    { label: 'Jumlah Jawaban Benar Penuh', value: `${result.benar} Soal` },
    { label: 'Jumlah Jawaban Benar Sebagian (Kategori)', value: `${result.sebagian || 0} Soal` },
    { label: 'Jumlah Jawaban Salah', value: `${result.salah} Soal` },
    { label: 'Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)', value: `${CONFIG.KKTP}` },
  ];

  doc.setFont('helvetica', 'normal');
  tableRows.forEach((row, i) => {
    doc.setFillColor(i % 2 === 0 ? 255 : 248, i % 2 === 0 ? 255 : 250, i % 2 === 0 ? 255 : 252);
    doc.rect(15, y, pageWidth - 30, 6.8, 'F');
    doc.rect(15, y, pageWidth - 30, 6.8, 'S');
    doc.text(row.label, 20, y + 4.8);
    doc.text(row.value, pageWidth - 45, y + 4.8, { align: 'right' });
    y += 6.8;
  });

  // Nilai Akhir
  const isPass = result.status === 'Tuntas' || result.status === 'Lulus' || result.nilai >= CONFIG.KKTP;
  doc.setFillColor(isPass ? 240 : 254, isPass ? 253 : 242, isPass ? 244 : 242);
  doc.rect(15, y, pageWidth - 30, 9, 'F');
  doc.rect(15, y, pageWidth - 30, 9, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('NILAI AKHIR TES SUMATIF (Skala 0 - 100)', 20, y + 6);
  doc.setFontSize(12);
  doc.setTextColor(isPass ? 22 : 185, isPass ? 101 : 28, isPass ? 52 : 28);
  doc.text(String(result.nilai), pageWidth - 45, y + 6.5, { align: 'right' });
  doc.setTextColor(0, 0, 0);
  y += 9;

  // Status Ketuntasan
  doc.setFillColor(241, 245, 249);
  doc.rect(15, y, pageWidth - 30, 8, 'F');
  doc.rect(15, y, pageWidth - 30, 8, 'S');
  doc.setFontSize(9);
  doc.text('Status Ketercapaian Kompetensi', 20, y + 5.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(isPass ? 22 : 185, isPass ? 101 : 28, isPass ? 52 : 28);
  doc.text(isPass ? 'TUNTAS (Mencapai KKTP)' : 'REMEDIAL (Belum Mencapai KKTP)', pageWidth - 45, y + 5.5, {
    align: 'right',
  });
  doc.setTextColor(0, 0, 0);
  y += 12;

  // --- CATATAN GURU ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('B. Catatan Perkembangan & Rekomendasi Guru:', 15, y);
  y += 4;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  const note = isPass
    ? 'Selamat! Ananda telah menguasai kompetensi materi pecahan dengan tuntas dan membanggakan. Terus pertahankan ketelitian dan rasa ingin tahu dalam belajar matematika tingkat lanjut (pengayaan).'
    : 'Ananda perlu penguatan konsep dasar pada topik pecahan berpenyebut beda dan pengurangan bilangan cacah. Diharapkan mengikuti bimbingan remedial bersama guru kelas.';
  doc.text(note, 15, y, { maxWidth: pageWidth - 30 });
  y += 15;

  // --- TANDA TANGAN (GURU & ORANG TUA/WALI) ---
  const ttdY = Math.max(y, 222);
  const colLeft = 22;
  const colRight = pageWidth - 68;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  // Kiri: Orang Tua
  doc.text('Mengetahui,', colLeft, ttdY);
  doc.text('Orang Tua / Wali Siswa,', colLeft, ttdY + 4.5);

  // Kanan: Guru Kelas
  const tglFormatted = formatIndonesianDate();
  doc.text(`Jembrana, ${tglFormatted}`, colRight, ttdY);
  doc.text(`Guru Kelas ${CONFIG.KELAS},`, colRight, ttdY + 4.5);

  const lineY = ttdY + 24;

  // Garis Orang Tua
  doc.line(colLeft, lineY, colLeft + 45, lineY);
  doc.text('( ......................................... )', colLeft, lineY + 4);

  // Garis Guru
  doc.setFont('helvetica', 'bold');
  doc.text(CONFIG.GURU, colRight, lineY - 1);
  doc.line(colRight, lineY, colRight + 48, lineY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`NIPPPK. ${CONFIG.NIP_GURU}`, colRight, lineY + 3.5);

  // Simpan PDF
  const safeName = (result.nama || 'siswa').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Hasil_Tes_Matematika_${safeName}_Absen_${result.noAbsen}.pdf`);
}

/**
 * 2. Download Naskah Soal Ujian (PDF)
 */
export function downloadExamQuestionsPDF(questions: Question[]): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 16;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 16) {
      doc.addPage();
      y = 16;
      addPageHeader();
    }
  };

  const addPageHeader = () => {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `${CONFIG.SEKOLAH} | Naskah Soal Tes Sumatif Matematika Kelas ${CONFIG.KELAS}`,
      pageWidth / 2,
      9,
      { align: 'center' }
    );
    doc.setTextColor(0, 0, 0);
  };

  // --- KOP SOAL ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFontSize(12.5);
  doc.text('NASKAH SOAL TES SUMATIF MATEMATIKA', pageWidth / 2, y, { align: 'center' });
  y += 3;

  doc.setLineWidth(0.6);
  doc.line(15, y, pageWidth - 15, y);
  y += 5.5;

  // Metadata Soal
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Mata Pelajaran : ${CONFIG.MATA_PELAJARAN}`, 16, y);
  doc.text(`Kelas / Semester : Kelas ${CONFIG.KELAS}`, 120, y);
  y += 4.5;
  doc.text(`Lingkup Materi : ${CONFIG.MATERI}`, 16, y, { maxWidth: 100 });
  doc.text(`Waktu / KKTP      : 60 Menit / KKTP: ${CONFIG.KKTP}`, 120, y);
  y += 6;

  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.rect(15, y, pageWidth - 30, 10, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('PETUNJUK UMUM:', 18, y + 3.8);
  doc.setFont('helvetica', 'normal');
  doc.text(
    '1. Kerjakan soal dengan teliti dan jujur. 2. Pilihlah satu jawaban paling tepat untuk soal PG. 3. Tentukan Benar/Salah untuk soal PGK Kategori.',
    18,
    y + 7.5,
    { maxWidth: pageWidth - 36 }
  );
  y += 14;

  // Iterasi Soal
  questions.forEach((q, idx) => {
    checkPageBreak(25);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);

    let typeLabel = 'Pilihan Ganda';
    if (q.type === 'pgk_kategori') typeLabel = 'Pilihan Ganda Kompleks Kategori (Benar / Salah)';

    doc.setTextColor(30, 58, 138);
    doc.text(`No. ${idx + 1} [${typeLabel} - Level: ${q.cognitiveLevel || 'L2'} - ${q.difficulty}]`, 15, y);
    doc.setTextColor(0, 0, 0);
    y += 4.5;

    // Teks Soal
    doc.setFont('helvetica', 'normal');
    const textLines = doc.splitTextToSize(q.text, pageWidth - 32);
    checkPageBreak(textLines.length * 4 + 10);
    doc.text(textLines, 16, y);
    y += textLines.length * 4 + 1.5;

    // Opsi Jawaban PG
    if (q.options && q.options.length > 0) {
      q.options.forEach((opt) => {
        checkPageBreak(7);
        const optLines = doc.splitTextToSize(`${opt.id}. ${opt.text}`, pageWidth - 36);
        doc.text(optLines, 20, y);
        y += optLines.length * 4 + 0.5;
      });
      y += 2.5;
    }

    // Pernyataan Kategori (Benar / Salah)
    if (q.statements && q.statements.length > 0) {
      q.statements.forEach((st, sIdx) => {
        checkPageBreak(8);
        const stLines = doc.splitTextToSize(
          `(${sIdx + 1}) ${st.text}   [  ] BENAR    [  ] SALAH`,
          pageWidth - 36
        );
        doc.text(stLines, 20, y);
        y += stLines.length * 4 + 1;
      });
      y += 2.5;
    }
  });

  doc.save(`Naskah_Soal_Matematika_Pecahan_Kelas_${CONFIG.KELAS}_SDN_3_Loloan_Timur.pdf`);
}

/**
 * 3. Export Rekap Nilai ke Format CSV
 */
export function exportResultsToCSV(results: ExamResult[]): void {
  const headers = ['Timestamp', 'Nama Siswa', 'Kelas', 'Nomor Absen', 'Durasi', 'Benar', 'Sebagian', 'Salah', 'Nilai', 'Status'];

  const rows = results.map((r) => [
    `"${r.timestamp || ''}"`,
    `"${r.nama || ''}"`,
    `"${r.kelas || CONFIG.KELAS}"`,
    `"${r.noAbsen || ''}"`,
    `"${r.durasiPengerjaan || '-'}"`,
    r.benar,
    r.sebagian || 0,
    r.salah,
    r.nilai,
    `"${r.status}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Rekap_Nilai_Tes_Sumatif_Kelas_${CONFIG.KELAS}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 4. Download Rekapitulasi Data Nilai Siswa (PDF Resmi Berkop dan Tanda Tangan)
 */
export function downloadResultsRecapPDF(results: ExamResult[]): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 12;
  const marginRight = 12;

  let y = 14;

  // Kop
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 5.5;
  doc.setFontSize(13);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(CONFIG.ALAMAT_SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 2.5;

  doc.setLineWidth(0.8);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  doc.setLineWidth(0.2);
  doc.line(marginLeft, y + 0.8, pageWidth - marginRight, y + 0.8);
  y += 6;

  // Judul
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`REKAPITULASI HASIL TES SUMATIF MATEMATIKA KELAS ${CONFIG.KELAS}`, pageWidth / 2, y, {
    align: 'center',
  });
  y += 4.5;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Materi: ${CONFIG.MATERI} • Standar KKTP: ${CONFIG.KKTP}`, pageWidth / 2, y, {
    align: 'center',
  });
  y += 7;

  // Tabel Siswa
  const cols = [
    { label: 'No', width: 9, align: 'center' as const },
    { label: 'Nama Peserta Didik', width: 55, align: 'left' as const },
    { label: 'Absen', width: 14, align: 'center' as const },
    { label: 'Benar', width: 15, align: 'center' as const },
    { label: 'Sebagian', width: 16, align: 'center' as const },
    { label: 'Salah', width: 15, align: 'center' as const },
    { label: 'Nilai', width: 16, align: 'center' as const },
    { label: 'Ketuntasan', width: 26, align: 'center' as const },
    { label: 'Durasi', width: 20, align: 'center' as const },
  ];

  // Header
  doc.setFillColor(30, 58, 138);
  doc.rect(marginLeft, y, pageWidth - marginLeft - marginRight, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);

  let curX = marginLeft;
  cols.forEach((c) => {
    const textX = c.align === 'center' ? curX + c.width / 2 : curX + 2;
    doc.text(c.label, textX, y + 4.8, { align: c.align });
    curX += c.width;
  });
  doc.setTextColor(0, 0, 0);
  y += 7;

  // Rows
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);

  results.forEach((r, idx) => {
    if (y + 7 > pageHeight - 38) {
      doc.addPage();
      y = 15;
    }

    const isPass = r.status === 'Tuntas' || r.status === 'Lulus' || r.nilai >= CONFIG.KKTP;
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(marginLeft, y, pageWidth - marginLeft - marginRight, 6.2, 'F');
    doc.rect(marginLeft, y, pageWidth - marginLeft - marginRight, 6.2, 'S');

    curX = marginLeft;
    const vals = [
      String(idx + 1),
      r.nama,
      r.noAbsen,
      String(r.benar),
      String(r.sebagian || 0),
      String(r.salah),
      String(r.nilai),
      isPass ? 'TUNTAS' : 'REMEDIAL',
      r.durasiPengerjaan || '-',
    ];

    cols.forEach((c, cIdx) => {
      const textX = c.align === 'center' ? curX + c.width / 2 : curX + 2;
      const val = vals[cIdx];
      if (cIdx === 1) {
        const trunc = doc.splitTextToSize(val, c.width - 3)[0] || val;
        doc.text(trunc, textX, y + 4.2);
      } else if (cIdx === 6 || cIdx === 7) {
        doc.setFont('helvetica', 'bold');
        if (cIdx === 7) {
          doc.setTextColor(isPass ? 22 : 185, isPass ? 101 : 28, isPass ? 52 : 28);
        }
        doc.text(val, textX, y + 4.2, { align: c.align });
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
      } else {
        doc.text(val, textX, y + 4.2, { align: c.align });
      }
      curX += c.width;
    });

    y += 6.2;
  });

  // Tanda Tangan
  if (y + 36 > pageHeight - 16) {
    doc.addPage();
    y = 16;
  } else {
    y += 6;
  }

  const tglStr = formatIndonesianDate();
  const colLeftX = marginLeft + 6;
  const colRightX = pageWidth - marginRight - 55;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Mengetahui,', colLeftX, y);
  doc.text('Kepala Sekolah,', colLeftX, y + 4);

  doc.text(`Jembrana, ${tglStr}`, colRightX, y);
  doc.text(`Guru Kelas ${CONFIG.KELAS},`, colRightX, y + 4);

  const sigLineY = y + 22;
  doc.setFont('helvetica', 'bold');
  doc.text(CONFIG.KEPALA_SEKOLAH, colLeftX, sigLineY);
  doc.line(colLeftX, sigLineY + 1, colLeftX + 50, sigLineY + 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(`NIP. ${CONFIG.NIP_KEPALA_SEKOLAH}`, colLeftX, sigLineY + 4.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(CONFIG.GURU, colRightX, sigLineY);
  doc.line(colRightX, sigLineY + 1, colRightX + 50, sigLineY + 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(`NIPPPK. ${CONFIG.NIP_GURU}`, colRightX, sigLineY + 4.5);

  doc.save(`Rekapitulasi_Nilai_Matematika_Kelas_${CONFIG.KELAS}.pdf`);
}

/**
 * 5. Download Dokumen Kedinasan PDF: KISI-KISI SOAL TES SUMATIF
 */
export function downloadKisiKisiPDF(questions: Question[]): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 12;
  const marginRight = 12;
  let y = 14;

  const checkPageBreak = (needed: number) => {
    if (y + needed > pageHeight - 16) {
      doc.addPage();
      y = 15;
    }
  };

  // --- KOP SURAT ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 5.5;
  doc.setFontSize(13);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(CONFIG.ALAMAT_SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 2.5;

  doc.setLineWidth(0.8);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  doc.setLineWidth(0.2);
  doc.line(marginLeft, y + 0.8, pageWidth - marginRight, y + 0.8);
  y += 6;

  // Judul
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`KISI-KISI PENULISAN SOAL TES SUMATIF MATEMATIKA`, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Mata Pelajaran: MATEMATIKA • Kelas: 5 • Materi: Bilangan Pecahan • Tahun Ajaran 2025/2026`,
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 7;

  // Header Tabel Kisi-kisi
  const cols = [
    { label: 'No', width: 9, align: 'center' as const },
    { label: 'Materi / Topik', width: 44, align: 'left' as const },
    { label: 'Indikator Soal', width: 75, align: 'left' as const },
    { label: 'Level', width: 14, align: 'center' as const },
    { label: 'Bentuk', width: 22, align: 'center' as const },
    { label: 'Kunci/Skor', width: 22, align: 'center' as const },
  ];

  doc.setFillColor(30, 58, 138);
  doc.rect(marginLeft, y, pageWidth - marginLeft - marginRight, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);

  let curX = marginLeft;
  cols.forEach((c) => {
    const textX = c.align === 'center' ? curX + c.width / 2 : curX + 2;
    doc.text(c.label, textX, y + 4.8, { align: c.align });
    curX += c.width;
  });
  doc.setTextColor(0, 0, 0);
  y += 7;

  // Rows Kisi-kisi
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);

  questions.forEach((q, idx) => {
    const rowHeight = 7.5;
    checkPageBreak(rowHeight + 2);

    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(marginLeft, y, pageWidth - marginLeft - marginRight, rowHeight, 'F');
    doc.rect(marginLeft, y, pageWidth - marginLeft - marginRight, rowHeight, 'S');

    curX = marginLeft;
    const bentukLabel = q.type === 'pg' ? 'Pilihan Ganda' : 'PGK Kategori';
    const kunciStr = q.type === 'pg' ? `Kunci: ${q.correctAnswer}` : '3 Pernyataan';

    const vals = [
      String(idx + 1),
      q.topic,
      q.indicator || q.topic,
      q.cognitiveLevel || 'L2',
      bentukLabel,
      kunciStr,
    ];

    cols.forEach((c, cIdx) => {
      const textX = c.align === 'center' ? curX + c.width / 2 : curX + 1.5;
      const val = vals[cIdx];
      if (cIdx === 1 || cIdx === 2) {
        const trunc = doc.splitTextToSize(val, c.width - 3)[0] || val;
        doc.text(trunc, textX, y + 5);
      } else {
        doc.text(val, textX, y + 5, { align: c.align });
      }
      curX += c.width;
    });

    y += rowHeight;
  });

  // Tanda Tangan
  checkPageBreak(38);
  y += 6;
  const tglStr = formatIndonesianDate();
  const colLeftX = marginLeft + 6;
  const colRightX = pageWidth - marginRight - 55;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Mengetahui,', colLeftX, y);
  doc.text('Kepala Sekolah,', colLeftX, y + 4);

  doc.text(`Jembrana, ${tglStr}`, colRightX, y);
  doc.text(`Guru Kelas ${CONFIG.KELAS},`, colRightX, y + 4);

  const sigLineY = y + 22;
  doc.setFont('helvetica', 'bold');
  doc.text(CONFIG.KEPALA_SEKOLAH, colLeftX, sigLineY);
  doc.line(colLeftX, sigLineY + 1, colLeftX + 50, sigLineY + 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(`NIP. ${CONFIG.NIP_KEPALA_SEKOLAH}`, colLeftX, sigLineY + 4.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(CONFIG.GURU, colRightX, sigLineY);
  doc.line(colRightX, sigLineY + 1, colRightX + 50, sigLineY + 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(`NIPPPK. ${CONFIG.NIP_GURU}`, colRightX, sigLineY + 4.5);

  doc.save(`Kisi_Kisi_Soal_Matematika_Kelas_${CONFIG.KELAS}_SDN_3_Loloan_Timur.pdf`);
}

/**
 * 6. Export Matriks Respon Butir Soal ke Format Excel / CSV
 */
export function exportItemAnalysisMatrixToCSV(results: ExamResult[], questions: Question[]): void {
  const qHeaders = questions.map((q) => `Soal_${q.id}`);
  const headers = [
    'No',
    'Timestamp',
    'Nama Siswa',
    'Absen',
    'Kelas',
    ...qHeaders,
    'Total Skor',
    'Nilai Akhir',
    'Status Ketuntasan',
    'Durasi',
  ];

  const rows = results.map((r, idx) => {
    const qResponses = questions.map((q) => {
      const st = r.itemStatuses?.[q.id];
      if (st === 'benar') return '1';
      if (st === 'sebagian') return '0.67';
      if (st === 'salah') return '0';
      return r.nilai >= 75 ? '1' : '0';
    });

    return [
      idx + 1,
      `"${r.timestamp || ''}"`,
      `"${r.nama || ''}"`,
      `"${r.noAbsen || ''}"`,
      `"${r.kelas || CONFIG.KELAS}"`,
      ...qResponses,
      r.totalSkor !== undefined ? r.totalSkor : Math.round((r.benar + (r.sebagian || 0) * 0.67) * 10) / 10,
      r.nilai,
      `"${r.status}"`,
      `"${r.durasiPengerjaan || '-'}"`,
    ];
  });

  // Baris Statistik Bawah
  const n = results.length || 1;
  const correctCounts = questions.map((q) => {
    return results.filter((r) => r.itemStatuses?.[q.id] === 'benar').length;
  });
  const percentages = correctCounts.map((c) => Math.round((c / n) * 100));
  const classifications = percentages.map((p) => (p > 70 ? 'Mudah' : p >= 30 ? 'Sedang' : 'Sukar'));

  const statRow1 = ['', '', 'JUMLAH SISWA BENAR', '', '', ...correctCounts, '', '', '', ''];
  const statRow2 = ['', '', 'PERSENTASE KETERCAPAIAN (%)', '', '', ...percentages.map((p) => `${p}%`), '', '', '', ''];
  const statRow3 = ['', '', 'KLASIFIKASI KESUKARAN EMPIRIS', '', '', ...classifications, '', '', '', ''];

  const allRows = [headers.join(','), ...rows.map((r) => r.join(',')), statRow1.join(','), statRow2.join(','), statRow3.join(',')];
  const csvContent = '\uFEFF' + allRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Analisis_Butir_Soal_Matriks_Respon_Kelas_${CONFIG.KELAS}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 7. Download PDF Laporan Analisis Butir Soal & Matriks Respon Siswa (Landscape Kedinasan)
 */
export function downloadItemAnalysisPDF(results: ExamResult[], questions: Question[]): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 297mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 210mm
  const marginLeft = 10;
  const marginRight = 10;
  let y = 12;

  const checkPageBreak = (needed: number) => {
    if (y + needed > pageHeight - 16) {
      doc.addPage();
      y = 14;
    }
  };

  // Kop Dinas
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA - DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, {
    align: 'center',
  });
  y += 4.5;
  doc.setFontSize(13);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(CONFIG.ALAMAT_SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 2.5;

  doc.setLineWidth(0.8);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  doc.setLineWidth(0.2);
  doc.line(marginLeft, y + 0.8, pageWidth - marginRight, y + 0.8);
  y += 5.5;

  // Judul
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('LAPORAN HASIL ANALISIS BUTIR SOAL & MATRIKS RESPON SISWA', pageWidth / 2, y, { align: 'center' });
  y += 4;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `Mata Pelajaran: MATEMATIKA • Materi: Bilangan Pecahan (45 Butir) • Kelas: 5 • Standar KKTP: ${CONFIG.KKTP} • Peserta: ${results.length} Siswa`,
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 6;

  // TABEL MATRIKS:
  // Kolom: No (7), Nama Siswa (42), Absen (9), Butir 1..45 (masing-masing ~3.8mm), Total (11), Nilai (11), Status (16), Durasi (12)
  const qCount = questions.length || 45;
  const qColWidth = 3.8;
  const colNoW = 7;
  const colNamaW = 38;
  const colAbsenW = 8;
  const colTotalW = 10;
  const colNilaiW = 10;
  const colStatusW = 15;
  const colDurasiW = 11;

  // Header Baris Matriks
  doc.setFillColor(30, 58, 138);
  doc.rect(marginLeft, y, pageWidth - marginLeft - marginRight, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);

  let curX = marginLeft;
  doc.text('No', curX + colNoW / 2, y + 4.8, { align: 'center' });
  curX += colNoW;
  doc.text('Nama Siswa', curX + 2, y + 4.8);
  curX += colNamaW;
  doc.text('Abs', curX + colAbsenW / 2, y + 4.8, { align: 'center' });
  curX += colAbsenW;

  // Kolom Soal 1..45
  for (let qId = 1; qId <= qCount; qId++) {
    doc.text(String(qId), curX + qColWidth / 2, y + 4.8, { align: 'center' });
    curX += qColWidth;
  }

  doc.text('Skor', curX + colTotalW / 2, y + 4.8, { align: 'center' });
  curX += colTotalW;
  doc.text('Nilai', curX + colNilaiW / 2, y + 4.8, { align: 'center' });
  curX += colNilaiW;
  doc.text('Status', curX + colStatusW / 2, y + 4.8, { align: 'center' });
  curX += colStatusW;
  doc.text('Waktu', curX + colDurasiW / 2, y + 4.8, { align: 'center' });

  doc.setTextColor(0, 0, 0);
  y += 7;

  // Baris-baris siswa
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);

  results.forEach((r, idx) => {
    checkPageBreak(5.5);

    const isPass = r.status === 'Tuntas' || r.status === 'Lulus' || r.nilai >= CONFIG.KKTP;
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(marginLeft, y, pageWidth - marginLeft - marginRight, 5.2, 'F');
    doc.rect(marginLeft, y, pageWidth - marginLeft - marginRight, 5.2, 'S');

    curX = marginLeft;
    doc.text(String(idx + 1), curX + colNoW / 2, y + 3.8, { align: 'center' });
    curX += colNoW;

    const shortName = doc.splitTextToSize(r.nama, colNamaW - 2)[0] || r.nama;
    doc.text(shortName, curX + 1.5, y + 3.8);
    curX += colNamaW;

    doc.text(r.noAbsen, curX + colAbsenW / 2, y + 3.8, { align: 'center' });
    curX += colAbsenW;

    // Respon 1..45
    for (let qId = 1; qId <= qCount; qId++) {
      const st = r.itemStatuses?.[qId] || (r.nilai >= 75 ? 'benar' : 'salah');
      if (st === 'benar') {
        doc.setTextColor(22, 101, 52); // green
        doc.text('1', curX + qColWidth / 2, y + 3.8, { align: 'center' });
      } else if (st === 'sebagian') {
        doc.setTextColor(180, 83, 9); // amber
        doc.text('½', curX + qColWidth / 2, y + 3.8, { align: 'center' });
      } else {
        doc.setTextColor(220, 38, 38); // red
        doc.text('0', curX + qColWidth / 2, y + 3.8, { align: 'center' });
      }
      curX += qColWidth;
    }

    doc.setTextColor(0, 0, 0);
    const skorDisplay = String(r.totalSkor !== undefined ? r.totalSkor : r.benar);
    doc.text(skorDisplay, curX + colTotalW / 2, y + 3.8, { align: 'center' });
    curX += colTotalW;

    doc.setFont('helvetica', 'bold');
    doc.text(String(r.nilai), curX + colNilaiW / 2, y + 3.8, { align: 'center' });
    curX += colNilaiW;

    doc.setTextColor(isPass ? 22 : 185, isPass ? 101 : 28, isPass ? 52 : 28);
    doc.text(isPass ? 'TUNTAS' : 'REMED', curX + colStatusW / 2, y + 3.8, { align: 'center' });
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    curX += colStatusW;

    doc.text(r.durasiPengerjaan || '-', curX + colDurasiW / 2, y + 3.8, { align: 'center' });

    y += 5.2;
  });

  // Baris Statistik Bawah (Jumlah Siswa Benar, %, Klasifikasi)
  const n = results.length || 1;
  checkPageBreak(18);

  // Baris 1: Jumlah Siswa Benar
  doc.setFillColor(241, 245, 249);
  doc.rect(marginLeft, y, pageWidth - marginLeft - marginRight, 5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.text('Jml Siswa Benar', marginLeft + 2, y + 3.6);
  curX = marginLeft + colNoW + colNamaW + colAbsenW;
  for (let qId = 1; qId <= qCount; qId++) {
    const count = results.filter((r) => r.itemStatuses?.[qId] === 'benar').length;
    doc.text(String(count), curX + qColWidth / 2, y + 3.6, { align: 'center' });
    curX += qColWidth;
  }
  y += 5;

  // Baris 2: % Ketercapaian
  doc.setFillColor(248, 250, 252);
  doc.rect(marginLeft, y, pageWidth - marginLeft - marginRight, 5, 'FD');
  doc.text('% Ketercapaian', marginLeft + 2, y + 3.6);
  curX = marginLeft + colNoW + colNamaW + colAbsenW;
  for (let qId = 1; qId <= qCount; qId++) {
    const count = results.filter((r) => r.itemStatuses?.[qId] === 'benar').length;
    const pct = Math.round((count / n) * 100);
    doc.text(`${pct}%`, curX + qColWidth / 2, y + 3.6, { align: 'center' });
    curX += qColWidth;
  }
  y += 5;

  // Baris 3: Klasifikasi Kesukaran Empiris
  doc.setFillColor(241, 245, 249);
  doc.rect(marginLeft, y, pageWidth - marginLeft - marginRight, 5, 'FD');
  doc.text('Tk. Kesukaran', marginLeft + 2, y + 3.6);
  curX = marginLeft + colNoW + colNamaW + colAbsenW;
  for (let qId = 1; qId <= qCount; qId++) {
    const count = results.filter((r) => r.itemStatuses?.[qId] === 'benar').length;
    const pct = Math.round((count / n) * 100);
    const diff = pct > 70 ? 'M' : pct >= 30 ? 'S' : 'K';
    doc.text(diff, curX + qColWidth / 2, y + 3.6, { align: 'center' });
    curX += qColWidth;
  }
  y += 7;

  // Keterangan & Tanda Tangan
  checkPageBreak(32);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.5);
  doc.text(
    '* Keterangan: M = Mudah (>70% benar), S = Sedang (30%-70% benar), K = Sukar (<30% benar). ½ = Benar Sebagian (PGK Kategori).',
    marginLeft,
    y
  );
  y += 6;

  // Tanda Tangan
  const tglStr = formatIndonesianDate();
  const colLeftX = marginLeft + 14;
  const colRightX = pageWidth - marginRight - 65;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Mengetahui,', colLeftX, y);
  doc.text('Kepala Sekolah,', colLeftX, y + 4);

  doc.text(`Jembrana, ${tglStr}`, colRightX, y);
  doc.text(`Guru Kelas ${CONFIG.KELAS},`, colRightX, y + 4);

  const sigLineY = y + 19;
  doc.setFont('helvetica', 'bold');
  doc.text(CONFIG.KEPALA_SEKOLAH, colLeftX, sigLineY);
  doc.line(colLeftX, sigLineY + 1, colLeftX + 50, sigLineY + 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text(`NIP. ${CONFIG.NIP_KEPALA_SEKOLAH}`, colLeftX, sigLineY + 4);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(CONFIG.GURU, colRightX, sigLineY);
  doc.line(colRightX, sigLineY + 1, colRightX + 50, sigLineY + 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text(`NIPPPK. ${CONFIG.NIP_GURU}`, colRightX, sigLineY + 4);

  doc.save(`Laporan_Analisis_Butir_Soal_Matematika_Kelas_${CONFIG.KELAS}.pdf`);
}
