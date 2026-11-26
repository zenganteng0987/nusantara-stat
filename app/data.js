/* Data BPS 2020–2024 untuk NusantaraStat.
   Angka dipakai persis seperti rilis BPS; tiap tampilan mencantumkan
   sumber dan tahunnya. Format tampilan memakai koma desimal (id-ID). */

const BPS_TAHUN = [2020, 2021, 2022, 2023, 2024];

const BPS_INDIKATOR = {
  penduduk: {
    label: 'Penduduk',
    satuan: 'juta jiwa',
    nilai: [270.20, 272.25, 275.77, 278.69, 281.60],
    desimal: 2,
    sumber: 'BPS, Proyeksi Penduduk / Sensus Penduduk',
    ringkas: 'Jumlah penduduk Indonesia terus bertambah, dari 270,20 juta jiwa pada 2020 menjadi 281,60 juta jiwa pada 2024.',
    cerita: 'Penduduk Indonesia bertambah sekitar 2–3 juta jiwa setiap tahun. Pada 2024 penduduk mencapai 281,60 juta jiwa dengan kepadatan sekitar 147 jiwa per km persegi. Sejak 2022 Indonesia memiliki 38 provinsi setelah pemekaran empat provinsi baru di Papua; sebelumnya 34 provinsi.'
  },
  pdb_tumbuh: {
    label: 'Pertumbuhan PDB',
    satuan: '% (yoy)',
    nilai: [-2.07, 3.70, 5.31, 5.05, 5.03],
    desimal: 2,
    sumber: 'BPS, Produk Domestik Bruto',
    ringkas: 'Ekonomi terkontraksi −2,07% pada 2020, lalu pulih dan tumbuh di atas 5% pada 2022–2024.',
    cerita: 'Pandemi menekan ekonomi hingga −2,07% pada 2020. Pemulihan berlanjut pada 2021 (3,70%) dan mencapai 5,31% pada 2022. Pada 2023–2024 pertumbuhan stabil di kisaran 5%, yakni 5,05% dan 5,03%.'
  },
  pdb_nominal: {
    label: 'PDB Harga Berlaku',
    satuan: 'Rp triliun',
    nilai: [15434.2, 16976.6, 19588.4, 20892.4, 22139.0],
    desimal: 1,
    sumber: 'BPS, Produk Domestik Bruto',
    ringkas: 'Nilai PDB harga berlaku naik dari Rp15.434,2 triliun (2020) menjadi Rp22.139,0 triliun (2024).',
    cerita: 'PDB harga berlaku naik setiap tahun pada 2020–2024, dari Rp15.434,2 triliun menjadi Rp22.139,0 triliun. PDB per kapita pada 2024 tercatat Rp78,62 juta.'
  },
  inflasi: {
    label: 'Inflasi',
    satuan: '% (yoy)',
    nilai: [1.68, 1.87, 5.51, 2.61, 1.57],
    desimal: 2,
    sumber: 'BPS, Indeks Harga Konsumen',
    ringkas: 'Inflasi melonjak ke 5,51% pada 2022, lalu kembali mereda ke 1,57% pada 2024.',
    cerita: 'Inflasi sempat melonjak ke 5,51% pada 2022 seiring kenaikan harga energi dan pangan, lalu mereda ke 2,61% pada 2023 dan 1,57% pada 2024 — terendah dalam lima tahun terakhir.'
  },
  tpt: {
    label: 'Tingkat Pengangguran Terbuka',
    satuan: '%',
    nilai: [7.07, 6.49, 5.86, 5.32, 4.91],
    desimal: 2,
    sumber: 'BPS, Survei Angkatan Kerja Nasional (Sakernas)',
    ringkas: 'Pengangguran turun setiap tahun, dari 7,07% (2020) menjadi 4,91% (2024).',
    cerita: 'Tingkat Pengangguran Terbuka memuncak pada 2020 (7,07%) saat pandemi, lalu turun konsisten setiap tahun hingga 4,91% pada 2024 — level terendah dalam periode ini.'
  },
  kemiskinan: {
    label: 'Kemiskinan',
    satuan: '%',
    nilai: [10.19, 10.14, 9.57, 9.36, 9.03],
    desimal: 2,
    sumber: 'BPS, Survei Sosial Ekonomi Nasional (Susenas)',
    ringkas: 'Penduduk miskin turun dari 10,19% (2020) menjadi 9,03% (2024).',
    cerita: 'Persentase penduduk miskin menurun perlahan dari 10,19% pada 2020 menjadi 9,03% pada 2024. Penurunan terbesar terjadi pada 2022, dari 10,14% menjadi 9,57%.'
  },
  ipm: {
    label: 'Indeks Pembangunan Manusia',
    satuan: 'poin',
    nilai: [71.94, 72.29, 72.91, 74.39, 75.02],
    desimal: 2,
    sumber: 'BPS, Indeks Pembangunan Manusia',
    ringkas: 'IPM naik dari 71,94 (2020) menjadi 75,02 (2024), menembus kategori tinggi.',
    cerita: 'IPM naik setiap tahun, dari 71,94 pada 2020 menjadi 75,02 pada 2024. Kenaikan terbesar terjadi pada 2023 (+1,48 poin), didorong membaiknya kesehatan, pendidikan, dan standar hidup layak.'
  },
  gini: {
    label: 'Rasio Gini',
    satuan: 'poin',
    nilai: [0.381, 0.379, 0.381, 0.379, 0.379],
    desimal: 3,
    sumber: 'BPS, Survei Sosial Ekonomi Nasional (Susenas)',
    ringkas: 'Ketimpangan relatif stabil di kisaran 0,379–0,381 selama 2020–2024.',
    cerita: 'Rasio Gini bergerak tipis antara 0,379 dan 0,381 pada 2020–2024. Angka di bawah 0,4 menunjukkan ketimpangan pengeluaran yang relatif moderat dan stabil.'
  }
};

/* Fakta penunjang (dipakai di halaman terkait, selalu dengan tahun). */
const BPS_FAKTA = {
  provinsi: { '2020': 34, '2021': 34, '2022': 38, '2023': 38, '2024': 38 },
  kepadatan2024: '±147 jiwa/km²',
  pdbPerKapita2024: 'Rp78,62 juta'
};

/* Urutan halaman indikator, untuk tautan sebelum/berikut. */
const URUTAN_INDIKATOR = [
  { kunci: 'penduduk', rute: '#/penduduk', judul: 'Penduduk' },
  { kunci: 'pdb_tumbuh', rute: '#/ekonomi', judul: 'Ekonomi' },
  { kunci: 'inflasi', rute: '#/harga', judul: 'Harga' },
  { kunci: 'tpt', rute: '#/tenaga-kerja', judul: 'Tenaga Kerja' },
  { kunci: 'kemiskinan', rute: '#/kemiskinan', judul: 'Kemiskinan' },
  { kunci: 'ipm', rute: '#/ipm', judul: 'IPM' }
];
