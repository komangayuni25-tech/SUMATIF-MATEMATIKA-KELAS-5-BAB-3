/**
 * Definisi Type & Interface Aplikasi Tes Sumatif
 * SD Negeri 3 Loloan Timur
 */

export type QuestionType = 'pg' | 'pgk_kategori';
export type Difficulty = 'Mudah' | 'Sedang' | 'Sukar';
export type CognitiveLevel = 'L1' | 'L2' | 'L3';

export interface StudentBirthDate {
  hari: string;
  bulan: string;
  tahun: string;
}

export interface StudentIdentity {
  nama: string;
  noAbsen: string;
  tglLahir: StudentBirthDate;
}

export interface OptionItem {
  id: string; // 'A', 'B', 'C', 'D'
  text: string;
}

export interface StatementItem {
  id: string; // e.g. 's1', 's2', 's3'
  text: string;
  correctAnswer: boolean; // true = Benar, false = Salah
}

export interface Question {
  id: number;
  type: QuestionType;
  text: string;
  image?: string; // Gambar/Diagram visual SVG atau URL ilustrasi edukatif
  options?: OptionItem[]; // Untuk 'pg' (4 opsi A, B, C, D)
  statements?: StatementItem[]; // Untuk 'pgk_kategori' (3 pernyataan Benar/Salah)
  correctAnswer?: string; // 'A' | 'B' | 'C' | 'D' untuk 'pg'
  difficulty: Difficulty;
  cognitiveLevel?: CognitiveLevel; // L1: Pemahaman, L2: Penerapan, L3: Penalaran / HOTS
  element?: string; // e.g. 'Bilangan'
  indicator?: string; // Indikator Soal
  explanation: string;
  topic: string;
}

export interface ShuffledQuestion extends Question {
  originalQuestionId: number;
  shuffledOptions?: OptionItem[];
}

export type AnswerValue = string | Record<string, boolean>;

export interface ExamResult {
  id?: string;
  timestamp: string;
  nama: string;
  noAbsen: string;
  kelas: string;
  tglLahir?: string;
  durasiPengerjaan?: string;
  benar: number;
  salah: number;
  sebagian?: number;
  totalSkor?: number;
  nilai: number;
  status: 'Tuntas' | 'Remedial' | 'Lulus' | 'Belum Lulus';
  detailJawaban?: Record<number, AnswerValue>;
  itemScores?: Record<number, number>; // Skor per butir (1, 0, or fractional)
  itemStatuses?: Record<number, 'benar' | 'sebagian' | 'salah'>;
}

export type AppStage = 1 | 2 | 3 | 4;
