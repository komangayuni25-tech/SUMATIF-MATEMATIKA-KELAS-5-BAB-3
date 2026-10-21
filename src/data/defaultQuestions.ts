import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  // ==========================================
  // BAGIAN I: PILIHAN GANDA (40 SOAL SEDANG & SULIT)
  // ==========================================

  // --- SOAL 1 ---
  {
    id: 1,
    type: 'pg',
    topic: 'Membandingkan Pecahan Berpenyebut Sama',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Membandingkan dua pecahan berpenyebut sama menggunakan tanda pertidaksamaan',
    text: 'Diberikan dua buah pecahan: 5/9 dan 7/9. Tanda pertidaksamaan yang tepat untuk menghubungkan kedua pecahan tersebut adalah...',
    image: `<svg viewBox="0 0 400 130" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-md mx-auto">
      <rect width="400" height="130" rx="12" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
      <text x="200" y="24" fill="#1E293B" font-size="12" font-weight="bold" text-anchor="middle">PERBANDINGAN PECAHAN BERPENYEBUT SAMA</text>
      <!-- Bar 1 (5/9) -->
      <g transform="translate(40, 36)">
        <text x="0" y="16" fill="#1E3A8A" font-size="12" font-weight="bold">5/9 :</text>
        <g transform="translate(45, 0)">
          <rect width="260" height="22" fill="#FFFFFF" stroke="#94A3B8" rx="4"/>
          <rect width="144.4" height="22" fill="#3B82F6" rx="4"/>
          <line x1="28.9" y1="0" x2="28.9" y2="22" stroke="#64748B" stroke-dasharray="2 2"/>
          <line x1="57.8" y1="0" x2="57.8" y2="22" stroke="#64748B" stroke-dasharray="2 2"/>
          <line x1="86.7" y1="0" x2="86.7" y2="22" stroke="#64748B" stroke-dasharray="2 2"/>
          <line x1="115.6" y1="0" x2="115.6" y2="22" stroke="#64748B" stroke-dasharray="2 2"/>
          <line x1="144.4" y1="0" x2="144.4" y2="22" stroke="#1E3A8A"/>
          <line x1="173.3" y1="0" x2="173.3" y2="22" stroke="#94A3B8" stroke-dasharray="2 2"/>
          <line x1="202.2" y1="0" x2="202.2" y2="22" stroke="#94A3B8" stroke-dasharray="2 2"/>
          <line x1="231.1" y1="0" x2="231.1" y2="22" stroke="#94A3B8" stroke-dasharray="2 2"/>
        </g>
      </g>
      <!-- Bar 2 (7/9) -->
      <g transform="translate(40, 72)">
        <text x="0" y="16" fill="#047857" font-size="12" font-weight="bold">7/9 :</text>
        <g transform="translate(45, 0)">
          <rect width="260" height="22" fill="#FFFFFF" stroke="#94A3B8" rx="4"/>
          <rect width="202.2" height="22" fill="#10B981" rx="4"/>
          <line x1="28.9" y1="0" x2="28.9" y2="22" stroke="#065F46" stroke-dasharray="2 2"/>
          <line x1="57.8" y1="0" x2="57.8" y2="22" stroke="#065F46" stroke-dasharray="2 2"/>
          <line x1="86.7" y1="0" x2="86.7" y2="22" stroke="#065F46" stroke-dasharray="2 2"/>
          <line x1="115.6" y1="0" x2="115.6" y2="22" stroke="#065F46" stroke-dasharray="2 2"/>
          <line x1="144.4" y1="0" x2="144.4" y2="22" stroke="#065F46" stroke-dasharray="2 2"/>
          <line x1="173.3" y1="0" x2="173.3" y2="22" stroke="#065F46" stroke-dasharray="2 2"/>
          <line x1="202.2" y1="0" x2="202.2" y2="22" stroke="#065F46"/>
          <line x1="231.1" y1="0" x2="231.1" y2="22" stroke="#94A3B8" stroke-dasharray="2 2"/>
        </g>
      </g>
      <text x="200" y="116" fill="#64748B" font-size="11" text-anchor="middle">Pada penyebut sama, pecahan dengan pembilang lebih besar bernilai lebih besar.</text>
    </svg>`,
    options: [
      { id: 'A', text: '5/9 > 7/9' },
      { id: 'B', text: '5/9 < 7/9' },
      { id: 'C', text: '5/9 = 7/9' },
      { id: 'D', text: '5/9 ≥ 7/9' },
    ],
    correctAnswer: 'B',
    explanation: 'Pada dua pecahan yang memiliki penyebut sama (yaitu 9), kita cukup membandingkan nilai pembilangnya. Karena 5 < 7, maka 5/9 < 7/9.',
  },

  // --- SOAL 2 ---
  {
    id: 2,
    type: 'pg',
    topic: 'Membandingkan Pecahan Berpenyebut Berbeda',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Membandingkan dua pecahan berpenyebut berbeda dengan menyamakan penyebut',
    text: 'Perhatikan perbandingan dua pecahan berpenyebut beda berikut:\n3/4 ... 5/6\nTanda pertidaksamaan yang benar untuk mengisi titik-titik tersebut adalah...',
    options: [
      { id: 'A', text: '>' },
      { id: 'B', text: '<' },
      { id: 'C', text: '=' },
      { id: 'D', text: '≥' },
    ],
    correctAnswer: 'B',
    explanation: 'Samakan penyebut dengan mencari KPK dari 4 dan 6, yaitu 12.\n3/4 = (3 × 3)/(4 × 3) = 9/12\n5/6 = (5 × 2)/(6 × 2) = 10/12\nKarena 9/12 < 10/12, maka 3/4 < 5/6.',
  },

  // --- SOAL 3 ---
  {
    id: 3,
    type: 'pg',
    topic: 'Mengurutkan Pecahan Berpenyebut Sama',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Mengurutkan beberapa pecahan berpenyebut sama dari yang terbesar ke terkecil',
    text: 'Diberikan pecahan-pecahan berikut: 3/8, 7/8, 1/8, 5/8.\nUrutan pecahan tersebut dari yang terbesar ke yang terkecil adalah...',
    options: [
      { id: 'A', text: '1/8, 3/8, 5/8, 7/8' },
      { id: 'B', text: '7/8, 3/8, 5/8, 1/8' },
      { id: 'C', text: '7/8, 5/8, 3/8, 1/8' },
      { id: 'D', text: '5/8, 7/8, 3/8, 1/8' },
    ],
    correctAnswer: 'C',
    explanation: 'Karena semua penyebutnya sama (8), urutkan langsung pembilangnya dari yang paling besar ke yang paling kecil: 7 > 5 > 3 > 1. Maka urutannya adalah 7/8, 5/8, 3/8, 1/8.',
  },

  // --- SOAL 4 ---
  {
    id: 4,
    type: 'pg',
    topic: 'Mengurutkan Pecahan Berpenyebut Berbeda',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Mengurutkan empat pecahan berpenyebut berbeda dari yang terkecil ke terbesar',
    text: 'Urutan pecahan 1/2, 2/3, 3/4, dan 5/12 dari yang terkecil hingga terbesar adalah...',
    options: [
      { id: 'A', text: '5/12, 1/2, 2/3, 3/4' },
      { id: 'B', text: '1/2, 5/12, 2/3, 3/4' },
      { id: 'C', text: '5/12, 2/3, 1/2, 3/4' },
      { id: 'D', text: '2/3, 1/2, 3/4, 5/12' },
    ],
    correctAnswer: 'A',
    explanation: 'KPK dari penyebut 2, 3, 4, dan 12 adalah 12.\n1/2 = 6/12\n2/3 = 8/12\n3/4 = 9/12\n5/12 = 5/12\nUrutan pembilang dari terkecil: 5 < 6 < 8 < 9.\nSehingga urutan dari terkecil adalah: 5/12, 1/2, 2/3, 3/4.',
  },

  // --- SOAL 5 ---
  {
    id: 5,
    type: 'pg',
    topic: 'Membandingkan Pecahan Berpenyebut Berbeda',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Menentukan tanda pembanding antara dua pecahan dengan metode perkalian silang',
    text: 'Pilihlah hubungan pembanding yang benar antara pecahan 2/5 dan 3/7 di bawah ini!',
    options: [
      { id: 'A', text: '2/5 > 3/7' },
      { id: 'B', text: '2/5 < 3/7' },
      { id: 'C', text: '2/5 = 3/7' },
      { id: 'D', text: '2/5 ≥ 3/7' },
    ],
    correctAnswer: 'B',
    explanation: 'Metode perkalian silang:\n2 × 7 = 14\n3 × 5 = 15\nKarena 14 < 15, maka 2/5 < 3/7 (atau dengan menyamakan penyebut menjadi 35: 14/35 < 15/35).',
  },

  // --- SOAL 6 ---
  {
    id: 6,
    type: 'pg',
    topic: 'Representasi Visual & Membandingkan Pecahan',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Menganalisis perbandingan pecahan dari diagram arsiran lingkaran',
    text: 'Perhatikan diagram dua lingkaran berarsir pada gambar di atas.\nLingkaran A menunjukkan arsiran 3/8 bagian, sedangkan Lingkaran B menunjukkan arsiran 2/4 bagian. Pernyataan perbandingan yang tepat adalah...',
    image: `<svg viewBox="0 0 400 140" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-md mx-auto">
      <rect width="400" height="140" rx="12" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
      <!-- Lingkaran A (3/8) -->
      <g transform="translate(100, 70)">
        <circle r="45" fill="#E2E8F0" stroke="#475569" stroke-width="2"/>
        <!-- 3 sectors shaded of 8 (each 45 deg) -->
        <path d="M 0 0 L 0 -45 A 45 45 0 0 1 45 0 Z" fill="#3B82F6"/>
        <path d="M 0 0 L 45 0 A 45 45 0 0 1 31.8 31.8 Z" fill="#3B82F6"/>
        <path d="M 0 0 L 31.8 31.8 A 45 45 0 0 1 -0.01 45 Z" fill="#3B82F6"/>
        <!-- dividing lines -->
        <line x1="-45" y1="0" x2="45" y2="0" stroke="#475569" stroke-width="1.5"/>
        <line x1="0" y1="-45" x2="0" y2="45" stroke="#475569" stroke-width="1.5"/>
        <line x1="-31.8" y1="-31.8" x2="31.8" y2="31.8" stroke="#475569" stroke-width="1.5"/>
        <line x1="-31.8" y1="31.8" x2="31.8" y2="-31.8" stroke="#475569" stroke-width="1.5"/>
        <text x="0" y="58" fill="#1E293B" font-size="11" font-weight="bold" text-anchor="middle">Lingkaran A (3/8)</text>
      </g>
      <!-- Lingkaran B (2/4 = 1/2) -->
      <g transform="translate(300, 70)">
        <circle r="45" fill="#E2E8F0" stroke="#475569" stroke-width="2"/>
        <!-- 2 sectors of 4 (half circle) -->
        <path d="M 0 0 L 0 -45 A 45 45 0 0 1 0 45 Z" fill="#10B981"/>
        <line x1="-45" y1="0" x2="45" y2="0" stroke="#475569" stroke-width="1.5"/>
        <line x1="0" y1="-45" x2="0" y2="45" stroke="#475569" stroke-width="1.5"/>
        <text x="0" y="58" fill="#1E293B" font-size="11" font-weight="bold" text-anchor="middle">Lingkaran B (2/4)</text>
      </g>
    </svg>`,
    options: [
      { id: 'A', text: 'Arsiran Lingkaran A lebih besar daripada Lingkaran B' },
      { id: 'B', text: 'Arsiran Lingkaran A sama besar dengan Lingkaran B' },
      { id: 'C', text: 'Arsiran Lingkaran A lebih kecil daripada Lingkaran B' },
      { id: 'D', text: 'Lingkaran A memiliki luas dua kali Lingkaran B' },
    ],
    correctAnswer: 'C',
    explanation: 'Lingkaran A = 3/8 = 0,375. Lingkaran B = 2/4 = 4/8 = 0,5. Karena 3/8 < 4/8, maka luas arsiran Lingkaran A lebih kecil daripada Lingkaran B.',
  },

  // --- SOAL 7 ---
  {
    id: 7,
    type: 'pg',
    topic: 'Garis Bilangan Pecahan',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Menentukan letak pecahan pada garis bilangan berjarak teratur',
    text: 'Perhatikan garis bilangan pecahan pada gambar di atas!\nTitik P berada tepat di antara bilangan 0 dan 1 dengan pembagian 6 skala sama panjang pada garis ke-4. Nilai pecahan pada titik P adalah...',
    image: `<svg viewBox="0 0 400 110" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-md mx-auto">
      <rect width="400" height="110" rx="12" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
      <text x="200" y="24" fill="#1E293B" font-size="12" font-weight="bold" text-anchor="middle">GARIS BILANGAN PECAHAN</text>
      <line x1="40" y1="60" x2="360" y2="60" stroke="#1E293B" stroke-width="3"/>
      <!-- Arrows -->
      <polygon points="360,56 370,60 360,64" fill="#1E293B"/>
      <polygon points="40,56 30,60 40,64" fill="#1E293B"/>
      <!-- Ticks: 0, 1/6, 2/6, 3/6, 4/6(P), 5/6, 1 -->
      <line x1="60" y1="50" x2="60" y2="70" stroke="#1E293B" stroke-width="2.5"/>
      <text x="60" y="88" fill="#1E293B" font-size="12" font-weight="bold" text-anchor="middle">0</text>
      
      <line x1="110" y1="53" x2="110" y2="67" stroke="#64748B" stroke-width="1.5"/>
      <text x="110" y="86" fill="#64748B" font-size="10" text-anchor="middle">1/6</text>

      <line x1="160" y1="53" x2="160" y2="67" stroke="#64748B" stroke-width="1.5"/>
      <text x="160" y="86" fill="#64748B" font-size="10" text-anchor="middle">2/6</text>

      <line x1="210" y1="53" x2="210" y2="67" stroke="#64748B" stroke-width="1.5"/>
      <text x="210" y="86" fill="#64748B" font-size="10" text-anchor="middle">3/6</text>

      <!-- Titik P -->
      <line x1="260" y1="50" x2="260" y2="70" stroke="#DC2626" stroke-width="3"/>
      <circle cx="260" cy="60" r="5" fill="#DC2626"/>
      <text x="260" y="44" fill="#DC2626" font-size="13" font-weight="bold" text-anchor="middle">P (?)</text>

      <line x1="310" y1="53" x2="310" y2="67" stroke="#64748B" stroke-width="1.5"/>
      <text x="310" y="86" fill="#64748B" font-size="10" text-anchor="middle">5/6</text>

      <line x1="360" y1="50" x2="360" y2="70" stroke="#1E293B" stroke-width="2.5"/>
      <text x="360" y="88" fill="#1E293B" font-size="12" font-weight="bold" text-anchor="middle">1 (6/6)</text>
    </svg>`,
    options: [
      { id: 'A', text: '3/6' },
      { id: 'B', text: '4/6 atau 2/3' },
      { id: 'C', text: '5/6' },
      { id: 'D', text: '3/4' },
    ],
    correctAnswer: 'B',
    explanation: 'Rentang 0 sampai 1 dibagi menjadi 6 ruas sama panjang. Titik P terletak pada langkah ke-4 dari titik 0, sehingga bernilai 4/6. Jika disederhanakan dengan membagi pembilang dan penyebut dengan 2, diperoleh 2/3.',
  },

  // --- SOAL 8 ---
  {
    id: 8,
    type: 'pg',
    topic: 'Mengurutkan Pecahan Campuran dan Pecahan Biasa',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Mengurutkan pecahan campuran dan pecahan biasa dari yang terbesar',
    text: 'Diberikan pecahan-pecahan berikut: 1 1/4, 5/4, 7/6, 1 1/2.\nUrutan pecahan tersebut dari yang terbesar ke yang terkecil adalah...',
    options: [
      { id: 'A', text: '1 1/2, 1 1/4 (dan 5/4), 7/6' },
      { id: 'B', text: '7/6, 1 1/4, 5/4, 1 1/2' },
      { id: 'C', text: '1 1/2, 7/6, 1 1/4, 5/4' },
      { id: 'D', text: '5/4, 7/6, 1 1/2, 1 1/4' },
    ],
    correctAnswer: 'A',
    explanation: 'Ubah semua pecahan ke bentuk pecahan biasa dengan penyebut KPK 12:\n1 1/2 = 3/2 = 18/12\n1 1/4 = 5/4 = 15/12\n5/4 = 15/12 (senilai dengan 1 1/4)\n7/6 = 14/12\nUrutan dari yang terbesar adalah: 18/12 (1 1/2), lalu 15/12 (1 1/4 dan 5/4), dan terakhir 14/12 (7/6).',
  },

  // --- SOAL 9 ---
  {
    id: 9,
    type: 'pg',
    topic: 'Penjumlahan Pecahan Berpenyebut Sama',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Menghitung hasil penjumlahan dua pecahan berpenyebut sama',
    text: 'Hasil dari operasi penjumlahan pecahan 4/13 + 7/13 adalah...',
    options: [
      { id: 'A', text: '11/26' },
      { id: 'B', text: '11/13' },
      { id: 'C', text: '28/13' },
      { id: 'D', text: '12/13' },
    ],
    correctAnswer: 'B',
    explanation: 'Pada penjumlahan pecahan berpenyebut sama, jumlahkan pembilangnya langsung sedangkan penyebutnya tetap:\n4/13 + 7/13 = (4 + 7)/13 = 11/13.',
  },

  // --- SOAL 10 ---
  {
    id: 10,
    type: 'pg',
    topic: 'Penjumlahan Pecahan Berpenyebut Sama',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Menjumlahkan pecahan berpenyebut sama dan menyederhanakan hasilnya',
    text: 'Perhatikan model penjumlahan pecahan pada diagram persegi berpetak di atas!\nModel tersebut menggambarkan operasi penjumlahan 3/12 + 5/12. Hasil penjumlahan dalam bentuk pecahan paling sederhana adalah...',
    image: `<svg viewBox="0 0 400 130" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-md mx-auto">
      <rect width="400" height="130" rx="12" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
      <text x="200" y="24" fill="#1E293B" font-size="12" font-weight="bold" text-anchor="middle">MODEL PENJUMLAHAN 3/12 + 5/12</text>
      <!-- 12-slot strip -->
      <g transform="translate(50, 45)">
        <rect width="300" height="35" fill="#FFFFFF" stroke="#475569" stroke-width="2" rx="4"/>
        <!-- 3 blue slots (3/12) -->
        <rect x="0" y="0" width="75" height="35" fill="#3B82F6"/>
        <!-- 5 green slots (5/12) -->
        <rect x="75" y="0" width="125" height="35" fill="#10B981"/>
        <!-- Dividing grid lines every 25px -->
        <line x1="25" y1="0" x2="25" y2="35" stroke="#475569" stroke-width="1.5"/>
        <line x1="50" y1="0" x2="50" y2="35" stroke="#475569" stroke-width="1.5"/>
        <line x1="75" y1="0" x2="75" y2="35" stroke="#1E3A8A" stroke-width="2"/>
        <line x1="100" y1="0" x2="100" y2="35" stroke="#475569" stroke-width="1.5"/>
        <line x1="125" y1="0" x2="125" y2="35" stroke="#475569" stroke-width="1.5"/>
        <line x1="150" y1="0" x2="150" y2="35" stroke="#475569" stroke-width="1.5"/>
        <line x1="175" y1="0" x2="175" y2="35" stroke="#475569" stroke-width="1.5"/>
        <line x1="200" y1="0" x2="200" y2="35" stroke="#065F46" stroke-width="2"/>
        <line x1="225" y1="0" x2="225" y2="35" stroke="#475569" stroke-width="1.5"/>
        <line x1="250" y1="0" x2="250" y2="35" stroke="#475569" stroke-width="1.5"/>
        <line x1="275" y1="0" x2="275" y2="35" stroke="#475569" stroke-width="1.5"/>
      </g>
      <text x="200" y="110" fill="#64748B" font-size="11" text-anchor="middle">Total kotak terarsir: 3 kotak biru + 5 kotak hijau = 8 kotak dari 12</text>
    </svg>`,
    options: [
      { id: 'A', text: '8/24' },
      { id: 'B', text: '8/12' },
      { id: 'C', text: '2/3' },
      { id: 'D', text: '3/4' },
    ],
    correctAnswer: 'C',
    explanation: '3/12 + 5/12 = 8/12.\nSederhanakan dengan membagi pembilang dan penyebut dengan FPB-nya (yaitu 4):\n(8 ÷ 4) / (12 ÷ 4) = 2/3.',
  },

  // --- SOAL 11 ---
  {
    id: 11,
    type: 'pg',
    topic: 'Penjumlahan Pecahan Berpenyebut Berbeda',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Menjumlahkan dua pecahan berpenyebut berbeda',
    text: 'Hitunglah hasil penjumlahan dari pecahan 2/3 + 1/4!',
    options: [
      { id: 'A', text: '3/7' },
      { id: 'B', text: '11/12' },
      { id: 'C', text: '3/12' },
      { id: 'D', text: '8/12' },
    ],
    correctAnswer: 'B',
    explanation: 'KPK dari 3 dan 4 adalah 12.\n2/3 = (2 × 4)/(3 × 4) = 8/12\n1/4 = (1 × 3)/(4 × 3) = 3/12\nJumlah = 8/12 + 3/12 = 11/12.',
  },

  // --- SOAL 12 ---
  {
    id: 12,
    type: 'pg',
    topic: 'Penjumlahan Pecahan Berpenyebut Berbeda',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Menjumlahkan pecahan biasa dengan penyebut bilangan prima 5 dan 7',
    text: 'Hasil penjumlahan dari 3/5 + 2/7 adalah...',
    options: [
      { id: 'A', text: '5/12' },
      { id: 'B', text: '6/35' },
      { id: 'C', text: '31/35' },
      { id: 'D', text: '29/35' },
    ],
    correctAnswer: 'C',
    explanation: 'KPK dari 5 dan 7 adalah 35.\n3/5 = (3 × 7)/35 = 21/35\n2/7 = (2 × 5)/35 = 10/35\n21/35 + 10/35 = 31/35.',
  },

  // --- SOAL 13 ---
  {
    id: 13,
    type: 'pg',
    topic: 'Penjumlahan Tiga Pecahan Berpenyebut Berbeda',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Menjumlahkan tiga pecahan berpenyebut beda dan mengubah ke pecahan campuran',
    text: 'Hasil dari penjumlahan tiga pecahan: 1/2 + 1/3 + 1/4 adalah...',
    options: [
      { id: 'A', text: '3/9' },
      { id: 'B', text: '1 1/12' },
      { id: 'C', text: '1 1/6' },
      { id: 'D', text: '13/24' },
    ],
    correctAnswer: 'B',
    explanation: 'KPK dari penyebut 2, 3, dan 4 adalah 12.\n1/2 = 6/12\n1/3 = 4/12\n1/4 = 3/12\nJumlah = (6 + 4 + 3)/12 = 13/12 = 1 1/12.',
  },

  // --- SOAL 14 ---
  {
    id: 14,
    type: 'pg',
    topic: 'Penjumlahan Pecahan Campuran',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Menjumlahkan dua pecahan campuran berpenyebut berbeda',
    text: 'Hitunglah hasil dari operasi penjumlahan pecahan campuran berikut:\n2 1/3 + 3 2/5 = ...',
    options: [
      { id: 'A', text: '5 3/8' },
      { id: 'B', text: '5 11/15' },
      { id: 'C', text: '6 1/15' },
      { id: 'D', text: '5 7/15' },
    ],
    correctAnswer: 'B',
    explanation: 'Jumlahkan bilangan bulatnya: 2 + 3 = 5.\nJumlahkan bagian pecahannya: 1/3 + 2/5 (KPK = 15):\n1/3 = 5/15\n2/5 = 6/15\n5/15 + 6/15 = 11/15.\nGabungkan: 5 + 11/15 = 5 11/15.',
  },

  // --- SOAL 15 ---
  {
    id: 15,
    type: 'pg',
    topic: 'Penjumlahan Pecahan Campuran',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Menjumlahkan pecahan campuran yang menghasilkan pecahan tidak sejati pada bagian pecahan',
    text: 'Hasil dari 1 3/4 + 2 5/6 adalah...',
    options: [
      { id: 'A', text: '3 8/10' },
      { id: 'B', text: '4 7/12' },
      { id: 'C', text: '3 19/12' },
      { id: 'D', text: '4 5/12' },
    ],
    correctAnswer: 'B',
    explanation: 'Jumlah bilangan bulat = 1 + 2 = 3.\nBagian pecahan = 3/4 + 5/6 (KPK dari 4 dan 6 adalah 12):\n3/4 = 9/12\n5/6 = 10/12\n9/12 + 10/12 = 19/12 = 1 7/12.\nJumlah total = 3 + 1 7/12 = 4 7/12.',
  },

  // --- SOAL 16 ---
  {
    id: 16,
    type: 'pg',
    topic: 'Soal Cerita Penjumlahan Pecahan',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Menyelesaikan masalah kontekstual penjumlahan berat belanjaan dalam bentuk pecahan',
    text: 'Ibu Komang berbelanja ke pasar membeli tepung terigu seberat 1/2 kg dan gula pasir seberat 3/4 kg. Berat seluruh belanjaan Ibu Komang adalah...',
    options: [
      { id: 'A', text: '4/6 kg' },
      { id: 'B', text: '1 1/4 kg' },
      { id: 'C', text: '1 1/2 kg' },
      { id: 'D', text: '1 3/8 kg' },
    ],
    correctAnswer: 'B',
    explanation: 'Total belanjaan = 1/2 kg + 3/4 kg.\nSamakan penyebut menjadi 4:\n1/2 = 2/4\n2/4 + 3/4 = 5/4 kg = 1 1/4 kg.',
  },

  // --- SOAL 17 ---
  {
    id: 17,
    type: 'pg',
    topic: 'Pengurangan Bilangan Cacah dengan Pecahan',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Mengurangkan bilangan cacah dengan pecahan biasa berpenyebut 5',
    text: 'Hasil pengurangan bilangan cacah dengan pecahan biasa: 3 - 2/5 adalah...',
    options: [
      { id: 'A', text: '2 3/5' },
      { id: 'B', text: '1 3/5' },
      { id: 'C', text: '2 2/5' },
      { id: 'D', text: '13/5' },
    ],
    correctAnswer: 'A',
    explanation: 'Ubah angka 3 menjadi pecahan campuran dengan penyebut 5:\n3 = 2 + 1 = 2 + 5/5 = 2 5/5.\n2 5/5 - 2/5 = 2 (5 - 2)/5 = 2 3/5 (atau dalam pecahan biasa 13/5). Opsi paling tepat dalam bentuk campuran adalah 2 3/5.',
  },

  // --- SOAL 18 ---
  {
    id: 18,
    type: 'pg',
    topic: 'Pengurangan Bilangan Cacah dengan Pecahan',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Mengurangkan bilangan cacah dengan pecahan biasa berpenyebut 8',
    text: 'Hasil dari 4 - 3/8 adalah...',
    options: [
      { id: 'A', text: '3 5/8' },
      { id: 'B', text: '3 3/8' },
      { id: 'C', text: '4 5/8' },
      { id: 'D', text: '2 5/8' },
    ],
    correctAnswer: 'A',
    explanation: '4 diubah menjadi 3 + 8/8 = 3 8/8.\n3 8/8 - 3/8 = 3 (8 - 3)/8 = 3 5/8.',
  },

  // --- SOAL 19 ---
  {
    id: 19,
    type: 'pg',
    topic: 'Pengurangan Bilangan Cacah dengan Pecahan Campuran',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Menganalisis pengurangan bilangan cacah berbasis ilustrasi gambar loyang pizza',
    text: 'Perhatikan gambar 3 loyang pizza utuh di atas.\nJika 1 1/4 loyang pizza tersebut dimakan oleh para siswa, sisa pizza yang belum dimakan adalah...',
    image: `<svg viewBox="0 0 400 130" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-md mx-auto">
      <rect width="400" height="130" rx="12" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
      <text x="200" y="22" fill="#1E293B" font-size="12" font-weight="bold" text-anchor="middle">3 LOYANG PIZZA UTUH (DIKURANGI 1 1/4)</text>
      <!-- Pizza 1 (Dimakan Utuh = Silang merah) -->
      <g transform="translate(80, 68)">
        <circle r="34" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
        <line x1="-24" y1="-24" x2="24" y2="24" stroke="#DC2626" stroke-width="4"/>
        <line x1="24" y1="-24" x2="-24" y2="24" stroke="#DC2626" stroke-width="4"/>
        <text x="0" y="46" fill="#DC2626" font-size="10" font-weight="bold" text-anchor="middle">1 Loyang Habis</text>
      </g>
      <!-- Pizza 2 (Dimakan 1/4) -->
      <g transform="translate(200, 68)">
        <circle r="34" fill="#FDE68A" stroke="#B45309" stroke-width="2"/>
        <path d="M 0 0 L 0 -34 A 34 34 0 0 1 34 0 Z" fill="#F87171"/>
        <line x1="-34" y1="0" x2="34" y2="0" stroke="#B45309" stroke-width="1.5"/>
        <line x1="0" y1="-34" x2="0" y2="34" stroke="#B45309" stroke-width="1.5"/>
        <text x="17" y="-12" fill="#7F1D1D" font-size="9" font-weight="bold" text-anchor="middle">1/4</text>
        <text x="0" y="46" fill="#B45309" font-size="10" font-weight="bold" text-anchor="middle">Sisa 3/4 Loyang</text>
      </g>
      <!-- Pizza 3 (Utuh) -->
      <g transform="translate(320, 68)">
        <circle r="34" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
        <circle cx="-10" cy="-8" r="4" fill="#DC2626"/>
        <circle cx="12" cy="10" r="4" fill="#DC2626"/>
        <circle cx="8" cy="-12" r="4" fill="#DC2626"/>
        <text x="0" y="46" fill="#047857" font-size="10" font-weight="bold" text-anchor="middle">Sisa 1 Loyang Utuh</text>
      </g>
    </svg>`,
    options: [
      { id: 'A', text: '1 1/4 loyang' },
      { id: 'B', text: '1 3/4 loyang' },
      { id: 'C', text: '2 1/4 loyang' },
      { id: 'D', text: '2 3/4 loyang' },
    ],
    correctAnswer: 'B',
    explanation: 'Operasi: 3 - 1 1/4.\n3 = 2 + 1 = 2 4/4.\n2 4/4 - 1 1/4 = (2 - 1) + (4/4 - 1/4) = 1 3/4 loyang pizza tersisa.',
  },

  // --- SOAL 20 ---
  {
    id: 20,
    type: 'pg',
    topic: 'Pengurangan Bilangan Cacah dengan Pecahan Campuran',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Mengurangkan bilangan cacah 5 dengan pecahan campuran penyebut 7',
    text: 'Hasil dari 5 - 2 3/7 adalah...',
    options: [
      { id: 'A', text: '3 4/7' },
      { id: 'B', text: '2 4/7' },
      { id: 'C', text: '2 3/7' },
      { id: 'D', text: '3 3/7' },
    ],
    correctAnswer: 'B',
    explanation: '5 diubah menjadi 4 7/7.\n4 7/7 - 2 3/7 = (4 - 2) + (7 - 3)/7 = 2 4/7.',
  },

  // --- SOAL 21 ---
  {
    id: 21,
    type: 'pg',
    topic: 'Pengurangan Pecahan Berpenyebut Sama',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Mengurangkan pecahan berpenyebut sama dan menyederhanakannya',
    text: 'Berapakah hasil dari 7/9 - 4/9 dalam bentuk paling sederhana?',
    options: [
      { id: 'A', text: '3/9' },
      { id: 'B', text: '1/3' },
      { id: 'C', text: '3/0' },
      { id: 'D', text: '11/9' },
    ],
    correctAnswer: 'B',
    explanation: '7/9 - 4/9 = (7 - 4)/9 = 3/9.\nBentuk paling sederhana dari 3/9 adalah 1/3 (dengan membagi pembilang dan penyebut dengan 3).',
  },

  // --- SOAL 22 ---
  {
    id: 22,
    type: 'pg',
    topic: 'Pengurangan Pecahan Berpenyebut Berbeda',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Mengurangkan dua pecahan berpenyebut berbeda',
    text: 'Hitunglah nilai dari operasi pengurangan pecahan berikut:\n5/6 - 2/3 = ...',
    options: [
      { id: 'A', text: '3/3' },
      { id: 'B', text: '1/6' },
      { id: 'C', text: '3/6' },
      { id: 'D', text: '1/2' },
    ],
    correctAnswer: 'B',
    explanation: 'KPK dari 6 dan 3 adalah 6.\n2/3 = (2 × 2)/(3 × 2) = 4/6.\n5/6 - 4/6 = 1/6.',
  },

  // --- SOAL 23 ---
  {
    id: 23,
    type: 'pg',
    topic: 'Pengurangan Pecahan Berpenyebut Berbeda',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Mengurangkan pecahan biasa berpenyebut 8 dan 5',
    text: 'Hasil pengurangan dari pecahan 7/8 - 3/5 adalah...',
    options: [
      { id: 'A', text: '4/3' },
      { id: 'B', text: '11/40' },
      { id: 'C', text: '21/40' },
      { id: 'D', text: '4/40' },
    ],
    correctAnswer: 'B',
    explanation: 'KPK dari 8 dan 5 adalah 40.\n7/8 = (7 × 5)/40 = 35/40\n3/5 = (3 × 8)/40 = 24/40\n35/40 - 24/40 = 11/40.',
  },

  // --- SOAL 24 ---
  {
    id: 24,
    type: 'pg',
    topic: 'Pengurangan Pecahan Campuran',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Mengurangkan dua pecahan campuran dengan meminjam pada pecahan pertama',
    text: 'Hasil dari 3 1/2 - 1 3/4 adalah...',
    options: [
      { id: 'A', text: '2 1/4' },
      { id: 'B', text: '1 3/4' },
      { id: 'C', text: '1 1/2' },
      { id: 'D', text: '2 1/2' },
    ],
    correctAnswer: 'B',
    explanation: 'Ubah penyebut ke 4:\n3 1/2 = 3 2/4 = 2 + 1 2/4 = 2 6/4.\n2 6/4 - 1 3/4 = (2 - 1) + (6/4 - 3/4) = 1 3/4.',
  },

  // --- SOAL 25 ---
  {
    id: 25,
    type: 'pg',
    topic: 'Pengurangan Pecahan Campuran',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Mengurangkan dua pecahan campuran dengan KPK penyebut 15',
    text: 'Tentukan hasil dari operasi 4 2/5 - 2 2/3!',
    options: [
      { id: 'A', text: '1 11/15' },
      { id: 'B', text: '2 11/15' },
      { id: 'C', text: '1 7/15' },
      { id: 'D', text: '2 4/15' },
    ],
    correctAnswer: 'A',
    explanation: 'KPK dari 5 dan 3 adalah 15.\n4 2/5 = 4 6/15 = 3 + 15/15 + 6/15 = 3 21/15.\n2 2/3 = 2 10/15.\n3 21/15 - 2 10/15 = (3 - 2) + (21 - 10)/15 = 1 11/15.',
  },

  // --- SOAL 26 ---
  {
    id: 26,
    type: 'pg',
    topic: 'Operasi Campuran Pecahan',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Menyelesaikan operasi hitung campuran penjumlahan dan pengurangan pecahan',
    text: 'Hasil dari 2 1/4 + 1 1/2 - 3/4 adalah...',
    options: [
      { id: 'A', text: '3' },
      { id: 'B', text: '3 1/4' },
      { id: 'C', text: '3 1/2' },
      { id: 'D', text: '2 3/4' },
    ],
    correctAnswer: 'A',
    explanation: 'Samakan penyebut menjadi 4:\n2 1/4 + 1 2/4 = 3 3/4.\n3 3/4 - 3/4 = 3 (3/4 - 3/4 = 0), sehingga hasilnya tepat 3.',
  },

  // --- SOAL 27 ---
  {
    id: 27,
    type: 'pg',
    topic: 'Operasi Campuran Pecahan',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Menyelesaikan operasi pengurangan dan penjumlahan tiga pecahan berpenyebut berbeda',
    text: 'Hasil dari 5/6 - 1/3 + 2/5 adalah...',
    options: [
      { id: 'A', text: '9/10' },
      { id: 'B', text: '7/10' },
      { id: 'C', text: '11/15' },
      { id: 'D', text: '1 1/10' },
    ],
    correctAnswer: 'A',
    explanation: 'Hitung terlebih dahulu 5/6 - 1/3:\n5/6 - 2/6 = 3/6 = 1/2.\nLalu hitung 1/2 + 2/5 (KPK = 10):\n5/10 + 4/10 = 9/10.',
  },

  // --- SOAL 28 ---
  {
    id: 28,
    type: 'pg',
    topic: 'Soal Cerita Pemecahan Masalah Pecahan',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Menghitung sisa panjang tali setelah digunakan dua kali',
    text: 'Pak Susilo memiliki seutas tali pramuka sepanjang 6 meter. Tali tersebut dipotong 2 1/3 meter untuk membuat tiang bendera dan 1 3/4 meter untuk mengikat tenda. Panjang sisa tali Pak Susilo adalah...',
    options: [
      { id: 'A', text: '1 11/12 meter' },
      { id: 'B', text: '2 1/12 meter' },
      { id: 'C', text: '1 5/12 meter' },
      { id: 'D', text: '2 11/12 meter' },
    ],
    correctAnswer: 'A',
    explanation: 'Total tali yang digunakan = 2 1/3 + 1 3/4 = 2 4/12 + 1 9/12 = 3 13/12 = 4 1/12 meter.\nSisa tali = 6 - 4 1/12 = 5 12/12 - 4 1/12 = 1 11/12 meter.',
  },

  // --- SOAL 29 ---
  {
    id: 29,
    type: 'pg',
    topic: 'Soal Cerita Pengurangan Bilangan Cacah',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Menghitung sisa beras dari karung 10 kg setelah dimasak dua hari',
    text: 'Sebuah karung berisi beras seberat 10 kg. Pada hari Senin dimasak 3 3/4 kg dan pada hari Selasa dimasak 2 1/2 kg. Sisa beras yang masih ada di dalam karung adalah...',
    options: [
      { id: 'A', text: '3 3/4 kg' },
      { id: 'B', text: '4 1/4 kg' },
      { id: 'C', text: '3 1/2 kg' },
      { id: 'D', text: '4 3/4 kg' },
    ],
    correctAnswer: 'A',
    explanation: 'Total beras dimasak = 3 3/4 + 2 1/2 = 3 3/4 + 2 2/4 = 5 5/4 = 6 1/4 kg.\nSisa beras = 10 - 6 1/4 = 9 4/4 - 6 1/4 = 3 3/4 kg.',
  },

  // --- SOAL 30 ---
  {
    id: 30,
    type: 'pg',
    topic: 'Pengurangan Bilangan Cacah dengan Pecahan',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Menghitung sisa air dalam botol setelah diminum',
    text: 'Sebuah botol minuman mula-mula berisi 2 liter air. Putu meminum air tersebut sebanyak 4/5 liter. Berapa liter sisa air di dalam botol tersebut sekarang?',
    options: [
      { id: 'A', text: '1 1/5 liter' },
      { id: 'B', text: '1 4/5 liter' },
      { id: 'C', text: '6/5 liter' },
      { id: 'D', text: '1 2/5 liter' },
    ],
    correctAnswer: 'A',
    explanation: 'Sisa air = 2 - 4/5 = 1 5/5 - 4/5 = 1 1/5 liter (atau 6/5 liter). Bentuk bilangan campuran yang tepat adalah 1 1/5 liter.',
  },

  // --- SOAL 31 ---
  {
    id: 31,
    type: 'pg',
    topic: 'Membandingkan Pecahan',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Menemukan pecahan terkecil dari tiga pecahan berpenyebut tidak sama',
    text: 'Di antara pecahan-pecahan 3/7, 4/9, dan 5/11, pecahan yang memiliki nilai paling kecil adalah...',
    options: [
      { id: 'A', text: '3/7' },
      { id: 'B', text: '4/9' },
      { id: 'C', text: '5/11' },
      { id: 'D', text: 'Ketiganya sama besar' },
    ],
    correctAnswer: 'A',
    explanation: 'Ubah ke bentuk desimal untuk perbandingan akurat:\n3/7 ≈ 0,4285\n4/9 ≈ 0,4444\n5/11 ≈ 0,4545\nNilai paling kecil adalah 3/7 (0,4285).',
  },

  // --- SOAL 32 ---
  {
    id: 32,
    type: 'pg',
    topic: 'Pecahan di Antara Dua Pecahan',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Menentukan suatu pecahan yang nilainya terletak di antara dua pecahan',
    text: 'Manakah pecahan berikut yang nilainya terletak tepat di antara 1/3 dan 1/2?',
    options: [
      { id: 'A', text: '1/4' },
      { id: 'B', text: '5/12' },
      { id: 'C', text: '7/12' },
      { id: 'D', text: '2/5' },
    ],
    correctAnswer: 'B',
    explanation: 'Samakan penyebut 1/3 dan 1/2 menjadi 12:\n1/3 = 4/12\n1/2 = 6/12\nBilangan pecahan di antara 4/12 dan 6/12 adalah 5/12.',
  },

  // --- SOAL 33 ---
  {
    id: 33,
    type: 'pg',
    topic: 'Garis Bilangan Pecahan',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Mengidentifikasi nilai pecahan pada titik tengah garis bilangan',
    text: 'Perhatikan garis bilangan di atas!\nTitik Q berada tepat di tengah-tengah antara pecahan 1/4 dan 3/4. Nilai pecahan pada titik Q tersebut adalah...',
    image: `<svg viewBox="0 0 400 110" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-md mx-auto">
      <rect width="400" height="110" rx="12" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
      <text x="200" y="24" fill="#1E293B" font-size="12" font-weight="bold" text-anchor="middle">TITIK TENGAH ANTARA 1/4 DAN 3/4</text>
      <line x1="50" y1="60" x2="350" y2="60" stroke="#1E293B" stroke-width="3"/>
      <!-- Ticks -->
      <line x1="90" y1="50" x2="90" y2="70" stroke="#1E293B" stroke-width="2"/>
      <text x="90" y="86" fill="#1E293B" font-size="12" font-weight="bold" text-anchor="middle">1/4</text>
      <!-- Point Q -->
      <line x1="200" y1="48" x2="200" y2="72" stroke="#2563EB" stroke-width="3"/>
      <circle cx="200" cy="60" r="6" fill="#2563EB"/>
      <text x="200" y="42" fill="#2563EB" font-size="13" font-weight="bold" text-anchor="middle">Q (?)</text>
      <line x1="310" y1="50" x2="310" y2="70" stroke="#1E293B" stroke-width="2"/>
      <text x="310" y="86" fill="#1E293B" font-size="12" font-weight="bold" text-anchor="middle">3/4</text>
    </svg>`,
    options: [
      { id: 'A', text: '1/2 (atau 2/4)' },
      { id: 'B', text: '2/8' },
      { id: 'C', text: '3/8' },
      { id: 'D', text: '5/8' },
    ],
    correctAnswer: 'A',
    explanation: 'Nilai tengah antara 1/4 dan 3/4 dihitung dengan: (1/4 + 3/4) ÷ 2 = (4/4) ÷ 2 = 1 ÷ 2 = 1/2 (yang sama dengan 2/4).',
  },

  // --- SOAL 34 ---
  {
    id: 34,
    type: 'pg',
    topic: 'Soal Cerita Pembagian Luas Lahan',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Menghitung sisa lahan pertanian dari luas total 4 hektar',
    text: 'Pak Ketut memiliki lahan pertanian seluas 4 hektar. Seluas 1 2/5 hektar ditanami jagung, 1 1/2 hektar ditanami kedelai, dan sisanya ditanami cabai. Luas lahan yang ditanami cabai adalah...',
    options: [
      { id: 'A', text: '1 1/10 hektar' },
      { id: 'B', text: '1 3/10 hektar' },
      { id: 'C', text: '2 1/10 hektar' },
      { id: 'D', text: '9/10 hektar' },
    ],
    correctAnswer: 'A',
    explanation: 'Luas jagung + kedelai = 1 2/5 + 1 1/2 = 1 4/10 + 1 5/10 = 2 9/10 hektar.\nSisa lahan cabai = 4 - 2 9/10 = 3 10/10 - 2 9/10 = 1 1/10 hektar.',
  },

  // --- SOAL 35 ---
  {
    id: 35,
    type: 'pg',
    topic: 'Pengurangan Bilangan Cacah dengan Pecahan Campuran',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Mengurangkan bilangan cacah 7 dengan pecahan campuran penyebut 8',
    text: 'Hasil pengurangan dari 7 - 3 5/8 adalah...',
    options: [
      { id: 'A', text: '3 3/8' },
      { id: 'B', text: '4 3/8' },
      { id: 'C', text: '3 5/8' },
      { id: 'D', text: '4 5/8' },
    ],
    correctAnswer: 'A',
    explanation: '7 = 6 8/8.\n6 8/8 - 3 5/8 = (6 - 3) + (8 - 5)/8 = 3 3/8.',
  },

  // --- SOAL 36 ---
  {
    id: 36,
    type: 'pg',
    topic: 'Operasi Campuran Pecahan Kontekstual',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Menyelesaikan permasalahan isi bak mandi dengan operasi penjumlahan dan pengurangan',
    text: 'Sebuah bak mandi mula-mula terisi air 1/3 bagian. Kemudian kran dibuka sehingga terisi tambahan 1/2 bagian. Setelah itu, air digunakan untuk mandi sebanyak 1/4 bagian. Bagian air yang tersisa di dalam bak mandi adalah...',
    options: [
      { id: 'A', text: '5/12 bagian' },
      { id: 'B', text: '7/12 bagian' },
      { id: 'C', text: '9/12 bagian' },
      { id: 'D', text: '1/12 bagian' },
    ],
    correctAnswer: 'B',
    explanation: 'KPK dari 3, 2, dan 4 adalah 12.\n1/3 = 4/12\n1/2 = 6/12\n1/4 = 3/12\nAir tersisa = 4/12 + 6/12 - 3/12 = (4 + 6 - 3)/12 = 7/12 bagian.',
  },

  // --- SOAL 37 ---
  {
    id: 37,
    type: 'pg',
    topic: 'Pengurangan Pecahan Berpenyebut Berbeda',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Menghitung selisih antara dua pecahan 5/6 dan 3/8',
    text: 'Selisih antara pecahan 5/6 dan 3/8 adalah...',
    options: [
      { id: 'A', text: '11/24' },
      { id: 'B', text: '2/2' },
      { id: 'C', text: '13/24' },
      { id: 'D', text: '7/24' },
    ],
    correctAnswer: 'A',
    explanation: 'KPK dari 6 dan 8 adalah 24.\n5/6 = 20/24\n3/8 = 9/24\nSelisih = 20/24 - 9/24 = 11/24.',
  },

  // --- SOAL 38 ---
  {
    id: 38,
    type: 'pg',
    topic: 'Pengurangan Bilangan Cacah',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Menghitung sisa panjang kayu 8 meter dipotong 3 4/9 meter',
    text: 'Sebuah balok kayu panjangnya 8 meter. Kayu tersebut dipotong untuk membuat tiang jemuran sepanjang 3 4/9 meter. Berapakah panjang sisa kayu tersebut?',
    options: [
      { id: 'A', text: '5 5/9 meter' },
      { id: 'B', text: '4 5/9 meter' },
      { id: 'C', text: '4 4/9 meter' },
      { id: 'D', text: '5 4/9 meter' },
    ],
    correctAnswer: 'B',
    explanation: '8 = 7 9/9.\n7 9/9 - 3 4/9 = (7 - 3) + (9 - 4)/9 = 4 5/9 meter.',
  },

  // --- SOAL 39 ---
  {
    id: 39,
    type: 'pg',
    topic: 'Soal Cerita Pemecahan Masalah Pecahan',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Menghitung panjang pita Ani setelah diberi tambahan dan digunakan berhias',
    text: 'Ni Kadek memiliki pita sepanjang 3 1/4 meter. Ia diberi lagi oleh kakaknya pita sepanjang 1 2/3 meter. Jika pita tersebut digunakan untuk membungkus kado sepanjang 2 1/2 meter, sisa pita Ni Kadek sekarang adalah...',
    options: [
      { id: 'A', text: '2 5/12 meter' },
      { id: 'B', text: '2 7/12 meter' },
      { id: 'C', text: '1 11/12 meter' },
      { id: 'D', text: '3 1/12 meter' },
    ],
    correctAnswer: 'A',
    explanation: 'KPK dari 4, 3, dan 2 adalah 12.\n3 1/4 = 3 3/12\n1 2/3 = 1 8/12\nTotal pita awal = 3 3/12 + 1 8/12 = 4 11/12 meter.\nPita digunakan = 2 1/2 = 2 6/12 meter.\nSisa pita = 4 11/12 - 2 6/12 = 2 5/12 meter.',
  },

  // --- SOAL 40 ---
  {
    id: 40,
    type: 'pg',
    topic: 'Pengurangan Pecahan Campuran',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Menghitung pengurangan dua pecahan campuran dengan penyebut 6 dan 4',
    text: 'Hasil dari operasi 5 1/6 - 2 3/4 adalah...',
    options: [
      { id: 'A', text: '2 5/12' },
      { id: 'B', text: '2 7/12' },
      { id: 'C', text: '3 5/12' },
      { id: 'D', text: '2 1/2' },
    ],
    correctAnswer: 'A',
    explanation: 'KPK dari 6 dan 4 adalah 12.\n5 1/6 = 5 2/12 = 4 + 12/12 + 2/12 = 4 14/12.\n2 3/4 = 2 9/12.\n4 14/12 - 2 9/12 = (4 - 2) + (14 - 9)/12 = 2 5/12.',
  },

  // =========================================================================
  // BAGIAN II: PILIHAN GANDA KOMPLEKS KATEGORI (5 SOAL BENAR / SALAH, 3 PERNYATAAN)
  // =========================================================================

  // --- SOAL 41 ---
  {
    id: 41,
    type: 'pgk_kategori',
    topic: 'Membandingkan dan Mengurutkan Pecahan',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Menilai kebenaran tiga pernyataan konsep perbandingan dan urutan pecahan',
    text: 'Cermatilah setiap pernyataan tentang membandingkan dan mengurutkan pecahan di bawah ini! Tentukan apakah masing-masing pernyataan bernilai BENAR atau SALAH!',
    statements: [
      {
        id: 's1',
        text: 'Pecahan 4/7 bernilai lebih kecil daripada pecahan 6/7 karena penyebutnya sama dan pembilang 4 < 6.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Antara pecahan 2/3 dan 4/6, pecahan 4/6 bernilai lebih besar daripada 2/3.',
        correctAnswer: false, // Salah karena 2/3 senilai dengan 4/6
      },
      {
        id: 's3',
        text: 'Urutan pecahan 1/4, 1/3, 1/2 merupakan urutan pecahan dari nilai yang terkecil ke terbesar.',
        correctAnswer: true, // Benar (0.25 < 0.33 < 0.5)
      },
    ],
    explanation: 'Pembahasan:\n1. Benar: Jika penyebutnya sama, semakin besar pembilang maka semakin besar nilainya (4/7 < 6/7).\n2. Salah: Pecahan 2/3 senilai (=) dengan 4/6 (karena 2×2 / 3×2 = 4/6).\n3. Benar: 1/4 (0,25) < 1/3 (0,33) < 1/2 (0,50).',
  },

  // --- SOAL 42 ---
  {
    id: 42,
    type: 'pgk_kategori',
    topic: 'Operasi Penjumlahan Pecahan',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Menganalisis keabsahan tiga pernyataan operasi penjumlahan pecahan',
    text: 'Perhatikan tiga pernyataan matematis mengenai operasi penjumlahan bilangan pecahan di bawah ini. Tentukan status kebenaran (BENAR / SALAH) untuk setiap pernyataan!',
    statements: [
      {
        id: 's1',
        text: 'Hasil dari 1/5 + 2/5 adalah 3/10.',
        correctAnswer: false, // Salah, hasilnya 3/5 bukan 3/10
      },
      {
        id: 's2',
        text: 'Untuk menjumlahkan 1/2 + 1/3, langkah pertama yang wajib dilakukan adalah menyamakan penyebutnya menjadi 6.',
        correctAnswer: true, // Benar, KPK dari 2 dan 3 adalah 6
      },
      {
        id: 's3',
        text: 'Hasil dari 1 1/4 + 2 1/4 sama dengan 3 1/2.',
        correctAnswer: true, // Benar, 3 2/4 = 3 1/2
      },
    ],
    explanation: 'Pembahasan:\n1. Salah: Pada penjumlahan berpenyebut sama, penyebut tidak dijumlahkan. 1/5 + 2/5 = 3/5.\n2. Benar: Pecahan berpenyebut beda harus disamakan penyebutnya menggunakan KPK (KPK dari 2 dan 3 adalah 6).\n3. Benar: 1 1/4 + 2 1/4 = 3 2/4 = 3 1/2.',
  },

  // --- SOAL 43 ---
  {
    id: 43,
    type: 'pgk_kategori',
    topic: 'Pengurangan Bilangan Cacah dan Pecahan',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Menilai kebenaran konsep pengurangan bilangan bulat/cacah dengan pecahan',
    text: 'Cermatilah pernyataan mengenai konsep pengurangan bilangan cacah dengan bilangan pecahan berikut ini. Tentukan BENAR atau SALAH pada setiap nomor deskripsi!',
    statements: [
      {
        id: 's1',
        text: 'Nilai dari 1 - 3/7 sama dengan 4/7.',
        correctAnswer: true, // Benar (7/7 - 3/7 = 4/7)
      },
      {
        id: 's2',
        text: 'Operasi 4 - 1/3 dapat diselesaikan dengan mengubah 4 menjadi 3 3/3, sehingga hasilnya adalah 3 2/3.',
        correctAnswer: true, // Benar
      },
      {
        id: 's3',
        text: 'Hasil pengurangan dari 5 - 2 1/2 adalah 3 1/2.',
        correctAnswer: false, // Salah, harusnya 2 1/2
      },
    ],
    explanation: 'Pembahasan:\n1. Benar: 1 = 7/7, maka 7/7 - 3/7 = 4/7.\n2. Benar: 4 = 3 + 3/3 = 3 3/3. 3 3/3 - 1/3 = 3 2/3.\n3. Salah: 5 - 2 1/2 = 4 2/2 - 2 1/2 = 2 1/2 (bukan 3 1/2).',
  },

  // --- SOAL 44 ---
  {
    id: 44,
    type: 'pgk_kategori',
    topic: 'Analisis Diagram Model Pecahan',
    difficulty: 'Sedang',
    cognitiveLevel: 'L2',
    element: 'Bilangan',
    indicator: 'Menganalisis pernyataan berdasarkan stimulus gambar diagram batang pecahan',
    text: 'Perhatikan diagram perbandingan batang pecahan berikut!\nBerdasarkan diagram tersebut, analisislah kebenaran dari masing-masing pernyataan!',
    image: `<svg viewBox="0 0 400 135" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-md mx-auto">
      <rect width="400" height="135" rx="12" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5"/>
      <text x="200" y="24" fill="#1E293B" font-size="12" font-weight="bold" text-anchor="middle">DIAGRAM BATANG PECAHAN UTUH</text>
      <!-- Batang 1 Utuh -->
      <g transform="translate(40, 36)">
        <rect width="320" height="20" fill="#E2E8F0" stroke="#475569" stroke-width="1.5" rx="3"/>
        <text x="160" y="15" fill="#1E293B" font-size="11" font-weight="bold" text-anchor="middle">1 UTUH (100%)</text>
      </g>
      <!-- Batang 1/2 -->
      <g transform="translate(40, 62)">
        <rect width="160" height="20" fill="#3B82F6" stroke="#1E3A8A" stroke-width="1.5" rx="3"/>
        <rect x="160" y="0" width="160" height="20" fill="#FFFFFF" stroke="#475569" stroke-width="1.5" rx="3"/>
        <text x="80" y="15" fill="#FFFFFF" font-size="11" font-weight="bold" text-anchor="middle">1/2</text>
        <text x="240" y="15" fill="#64748B" font-size="11" text-anchor="middle">1/2</text>
      </g>
      <!-- Batang 1/4 -->
      <g transform="translate(40, 88)">
        <rect width="80" height="20" fill="#10B981" stroke="#065F46" stroke-width="1.5" rx="3"/>
        <rect x="80" y="0" width="80" height="20" fill="#10B981" stroke="#065F46" stroke-width="1.5" rx="3"/>
        <rect x="160" y="0" width="80" height="20" fill="#FFFFFF" stroke="#475569" stroke-width="1.5" rx="3"/>
        <rect x="240" y="0" width="80" height="20" fill="#FFFFFF" stroke="#475569" stroke-width="1.5" rx="3"/>
        <text x="40" y="15" fill="#FFFFFF" font-size="11" font-weight="bold" text-anchor="middle">1/4</text>
        <text x="120" y="15" fill="#FFFFFF" font-size="11" font-weight="bold" text-anchor="middle">1/4</text>
        <text x="200" y="15" fill="#64748B" font-size="11" text-anchor="middle">1/4</text>
        <text x="280" y="15" fill="#64748B" font-size="11" text-anchor="middle">1/4</text>
      </g>
      <text x="200" y="124" fill="#64748B" font-size="10" text-anchor="middle">Garis tegak membuktikan bahwa 1/2 tepat sama panjang dengan 2 buah 1/4</text>
    </svg>`,
    statements: [
      {
        id: 's1',
        text: 'Dua bagian 1/4 memiliki panjang yang persis sama dengan satu bagian 1/2.',
        correctAnswer: true, // Benar (1/4 + 1/4 = 2/4 = 1/2)
      },
      {
        id: 's2',
        text: 'Jika satu bagian utuh (1) dikurangi 1/4, maka panjang yang tersisa sama dengan 3 bagian 1/4.',
        correctAnswer: true, // Benar (1 - 1/4 = 3/4)
      },
      {
        id: 's3',
        text: 'Pecahan 1/4 memiliki nilai yang lebih besar daripada pecahan 1/2.',
        correctAnswer: false, // Salah (1/4 < 1/2)
      },
    ],
    explanation: 'Pembahasan:\n1. Benar: 1/4 + 1/4 = 2/4 = 1/2.\n2. Benar: 1 utuh = 4/4. 4/4 - 1/4 = 3/4 (3 potong 1/4).\n3. Salah: 1/4 (0,25) lebih kecil daripada 1/2 (0,50).',
  },

  // --- SOAL 45 ---
  {
    id: 45,
    type: 'pgk_kategori',
    topic: 'Pemecahan Masalah Pecahan Kontekstual',
    difficulty: 'Sukar',
    cognitiveLevel: 'L3',
    element: 'Bilangan',
    indicator: 'Mengevaluasi penalaran matematis dalam masalah kontekstual sehari-hari',
    text: 'Di sebuah kegiatan kerja bakti di SD Negeri 3 Loloan Timur, terdapat 5 kaleng cat warna biru. Kelas 5A menggunakan 1 3/4 kaleng dan Kelas 5B menggunakan 2 1/4 kaleng cat untuk mengecat pagar. Tentukan BENAR atau SALAH pada pernyataan-pernyataan berikut!',
    statements: [
      {
        id: 's1',
        text: 'Total cat yang digunakan oleh gabungan Kelas 5A dan Kelas 5B adalah 4 kaleng utuh.',
        correctAnswer: true, // Benar: 1 3/4 + 2 1/4 = 3 4/4 = 4 kaleng
      },
      {
        id: 's2',
        text: 'Sisa cat yang belum digunakan dari 5 kaleng mula-mula adalah 1 kaleng cat.',
        correctAnswer: true, // Benar: 5 - 4 = 1 kaleng
      },
      {
        id: 's3',
        text: 'Kelas 5A menggunakan cat lebih banyak daripada Kelas 5B.',
        correctAnswer: false, // Salah: 1 3/4 < 2 1/4
      },
    ],
    explanation: 'Pembahasan:\n1. Benar: 1 3/4 + 2 1/4 = (1 + 2) + (3/4 + 1/4) = 3 + 4/4 = 3 + 1 = 4 kaleng cat.\n2. Benar: 5 kaleng - 4 kaleng = 1 kaleng sisa cat.\n3. Salah: Kelas 5A menggunakan 1 3/4 (1,75) kaleng, sedangkan Kelas 5B menggunakan 2 1/4 (2,25) kaleng. Jadi Kelas 5B menggunakan lebih banyak daripada Kelas 5A.',
  },
];
