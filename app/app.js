/* Router hash + render NusantaraStat. Semua halaman tercapai lewat tautan;
   pemilih tahun, sorting, dan kotak cari benar-benar mengubah tampilan. */

var tahunPilih = 2024;
var urutTahun = null;      /* tahun kolom yang dipakai sorting di Perbandingan */
var urutNaik = true;
var cariTeks = '';

var WARNA = '#0B3B4D';
var AKSES = '#E8A33D';

function el() { return document.getElementById('app'); }

function idxTahun(t) { return BPS_TAHUN.indexOf(t); }

function nilai(ind, t) { return BPS_INDIKATOR[ind].nilai[idxTahun(t)]; }

function pilihTahunHTML() {
  var opsi = BPS_TAHUN.map(function (t) {
    return '<option value="' + t + '"' + (t === tahunPilih ? ' selected' : '') + '>' + t + '</option>';
  }).join('');
  return '<label class="pilih-tahun">Tahun <select id="tahun" aria-label="Pilih tahun">' + opsi + '</select></label>';
}

function sumberHTML(ind) {
  return '<p class="sumber">Sumber: ' + BPS_INDIKATOR[ind].sumber + ' (BPS), tahun 2020–2024.</p>';
}

function tabelIndikator(ind) {
  var d = BPS_INDIKATOR[ind];
  var baris = BPS_TAHUN.map(function (t, i) {
    return '<tr' + (t === tahunPilih ? ' class="baris-aktif"' : '') + '><td>' + t + '</td><td>' + formatID(d.nilai[i], d.desimal) + ' ' + d.satuan + '</td></tr>';
  }).join('');
  return '<table class="tabel"><thead><tr><th>Tahun</th><th>' + d.label + ' (' + d.satuan + ')</th></tr></thead><tbody>' + baris + '</tbody></table>';
}

function kartuKPI(ind) {
  var d = BPS_INDIKATOR[ind];
  return '<a class="kpi" href="#/' + ruteIndikator(ind) + '">'
    + '<span class="kpi-label">' + d.label + '</span>'
    + '<span class="kpi-angka">' + formatID(nilai(ind, tahunPilih), d.desimal) + '</span>'
    + '<span class="kpi-satuan">' + d.satuan + ' · ' + tahunPilih + '</span>'
    + '<span class="kpi-sumber">Sumber: BPS ' + tahunPilih + '</span></a>';
}

function ruteIndikator(ind) {
  var peta = { penduduk: 'penduduk', pdb_tumbuh: 'ekonomi', inflasi: 'harga', tpt: 'tenaga-kerja', kemiskinan: 'kemiskinan', ipm: 'ipm' };
  return peta[ind] || 'perbandingan';
}

function tautanSebelumBerikut(pos) {
  var seb = URUTAN_INDIKATOR[pos - 1];
  var ber = URUTAN_INDIKATOR[pos + 1];
  return '<nav class="sebelum-berikut">'
    + (seb ? '<a href="' + seb.rute + '">← ' + seb.judul + '</a>' : '<span></span>')
    + '<a href="#/perbandingan">Semua indikator →</a>'
    + (ber ? '<a href="' + ber.rute + '">' + ber.judul + ' →</a>' : '<span></span>')
    + '</nav>';
}

/* ---------------- Beranda ---------------- */
function renderBeranda() {
  var grid = URUTAN_INDIKATOR.map(function (it) {
    var d = BPS_INDIKATOR[it.kunci];
    return '<a class="grid-item" href="' + it.rute + '"><strong>' + d.label + '</strong>'
      + '<span>' + d.ringkas + '</span>'
      + '<span class="grid-angka">' + formatID(nilai(it.kunci, 2024), d.desimal) + ' ' + d.satuan + ' (2024)</span></a>';
  }).join('');
  el().innerHTML =
    '<section class="hero"><p class="hero-kicker">Data BPS · 2020–2024</p>'
    + '<h1>Indonesia dalam angka, 2020–2024</h1>'
    + '<p class="hero-teks">Penduduk, ekonomi, harga, pekerjaan, kemiskinan, dan pembangunan manusia — diringkas dari rilis Badan Pusat Statistik agar mudah dibaca sekilas.</p>'
    + '<div class="hero-aksi"><a class="tombol" href="#/perbandingan">Bandingkan semua indikator</a>'
    + '<a class="tombol tombol-garis" href="#/ekonomi">Lihat ekonomi</a></div></section>'
    + '<section class="bagian"><div class="bagian-kepala"><h2>Angka pokok ' + tahunPilih + '</h2>' + pilihTahunHTML() + '</div>'
    + '<div class="kpi-grid">'
    + kartuKPI('penduduk') + kartuKPI('pdb_tumbuh') + kartuKPI('inflasi')
    + kartuKPI('tpt') + kartuKPI('kemiskinan') + kartuKPI('ipm')
    + '</div><p class="catatan">Ubah tahun di atas: keenam kartu ikut berubah. Sumber tiap angka: BPS.</p></section>'
    + '<section class="bagian"><h2>Pertumbuhan PDB, 2020–2024</h2>'
    + '<div class="grafik">' + grafikGaris(BPS_INDIKATOR.pdb_tumbuh.nilai, BPS_TAHUN, AKSES) + '</div>'
    + sumberHTML('pdb_tumbuh') + '</section>'
    + '<section class="bagian"><h2>Jelajahi indikator</h2><div class="grid-indikator">' + grid + '</div></section>';
}

/* ---------------- Halaman indikator ---------------- */
function renderIndikator(pos) {
  var it = URUTAN_INDIKATOR[pos];
  var d = BPS_INDIKATOR[it.kunci];
  var isi = '<section class="bagian"><p class="kicker">Indikator · BPS 2020–2024</p>'
    + '<h1>' + d.label + '</h1>'
    + '<div class="bagian-kepala"><div class="angka-besar"><span class="angka-besar-nilai">'
    + formatID(nilai(it.kunci, tahunPilih), d.desimal) + '</span>'
    + '<span class="angka-besar-satuan">' + d.satuan + ' · ' + tahunPilih + '</span></div>'
    + pilihTahunHTML() + '</div>'
    + '<p>' + d.cerita + '</p>'
    + '<div class="grafik">' + grafikGaris(d.nilai, BPS_TAHUN, WARNA) + '</div>'
    + sumberHTML(it.kunci);
  if (it.kunci === 'pdb_tumbuh') {
    var pn = BPS_INDIKATOR.pdb_nominal;
    isi += '<h2>PDB harga berlaku</h2>'
      + '<p>' + pn.cerita + '</p>'
      + '<div class="grafik">' + grafikBatang(pn.nilai, BPS_TAHUN, AKSES) + '</div>'
      + '<p class="sumber">Sumber: ' + pn.sumber + ' (BPS), tahun 2020–2024. PDB per kapita 2024: ' + BPS_FAKTA.pdbPerKapita2024 + '.</p>'
      + tabelIndikator('pdb_nominal');
  }
  if (it.kunci === 'penduduk') {
    isi += '<p>Jumlah provinsi: 34 pada 2020–2021, lalu 38 sejak 2022 (pemekaran empat provinsi Papua). Kepadatan penduduk 2024: ' + BPS_FAKTA.kepadatan2024 + '.</p>';
  }
  isi += '<h2>Data 2020–2024</h2>' + tabelIndikator(it.kunci) + '</section>'
    + tautanSebelumBerikut(pos);
  el().innerHTML = isi;
}

/* ---------------- Perbandingan ---------------- */
function renderPerbandingan() {
  var kunciSemua = Object.keys(BPS_INDIKATOR);
  var cari = cariTeks.trim().toLowerCase();
  var baris = kunciSemua.filter(function (k) {
    return !cari || BPS_INDIKATOR[k].label.toLowerCase().indexOf(cari) !== -1;
  });
  if (urutTahun !== null) {
    var i = idxTahun(urutTahun);
    baris.sort(function (a, b) {
      var s = BPS_INDIKATOR[a].nilai[i] - BPS_INDIKATOR[b].nilai[i];
      return urutNaik ? s : -s;
    });
  }
  var kepala = BPS_TAHUN.map(function (t) {
    var panah = urutTahun === t ? (urutNaik ? ' ▲' : ' ▼') : '';
    return '<th><button class="urut" data-tahun="' + t + '">' + t + panah + '</button></th>';
  }).join('');
  var isiBaris = baris.map(function (k) {
    var d = BPS_INDIKATOR[k];
    var sel = d.nilai.map(function (v) { return '<td>' + formatID(v, d.desimal) + '</td>'; }).join('');
    return '<tr><td><a href="#/' + ruteIndikator(k) + '">' + d.label + '</a><br><span class="sel-satuan">' + d.satuan + '</span></td>' + sel + '</tr>';
  }).join('');
  el().innerHTML =
    '<section class="bagian"><p class="kicker">Perbandingan · BPS 2020–2024</p>'
    + '<h1>Semua indikator, 2020–2024</h1>'
    + '<p>Klik kepala kolom tahun untuk mengurutkan baris dari nilai terkecil ke terbesar (klik lagi untuk membalik). Ketik di kotak cari untuk menyaring indikator.</p>'
    + '<label class="cari">Cari indikator <input id="cari" type="search" placeholder="mis. inflasi" value="' + cariTeks.replace(/"/g, '') + '"></label>'
    + (baris.length === 0
      ? '<p class="kosong">Tidak ada indikator yang cocok dengan “' + cariTeks + '”.</p>'
      : '<div class="gulir"><table class="tabel tabel-banding"><thead><tr><th>Indikator</th>' + kepala + '</tr></thead><tbody>' + isiBaris + '</tbody></table></div>')
    + '<p class="sumber">Sumber: BPS, 2020–2024. Satuan tiap baris tertulis di bawah nama indikator.</p></section>';
}

/* ---------------- Tentang ---------------- */
function renderTentang() {
  el().innerHTML =
    '<section class="bagian"><p class="kicker">Tentang</p>'
    + '<h1>Tentang NusantaraStat</h1>'
    + '<p>NusantaraStat adalah situs visualisasi independen yang merangkum angka-angka pokok Indonesia tahun 2020–2024 dari Badan Pusat Statistik (BPS). Situs ini <strong>bukan situs resmi BPS</strong> dan tidak berafiliasi dengan BPS.</p>'
    + '<h2>Sumber data</h2><ul>'
    + '<li>Penduduk — BPS, Proyeksi Penduduk / Sensus Penduduk, 2020–2024.</li>'
    + '<li>Pertumbuhan PDB dan PDB harga berlaku — BPS, Produk Domestik Bruto, 2020–2024.</li>'
    + '<li>Inflasi — BPS, Indeks Harga Konsumen, 2020–2024.</li>'
    + '<li>Tingkat Pengangguran Terbuka — BPS, Survei Angkatan Kerja Nasional (Sakernas), 2020–2024.</li>'
    + '<li>Kemiskinan dan Rasio Gini — BPS, Survei Sosial Ekonomi Nasional (Susenas), 2020–2024.</li>'
    + '<li>Indeks Pembangunan Manusia — BPS, 2020–2024.</li></ul>'
    + '<h2>Cara membaca</h2><ul>'
    + '<li>Angka memakai koma desimal dan titik ribuan, mengikuti penulisan Indonesia.</li>'
    + '<li>“yoy” berarti dibandingkan dengan tahun sebelumnya (year-on-year).</li>'
    + '<li>Pemilih tahun di tiap halaman mengubah angka besar dan baris tabel yang disorot.</li>'
    + '<li>Jumlah provinsi berubah dari 34 menjadi 38 pada 2022 karena pemekaran empat provinsi di Papua.</li></ul>'
    + '<p>Angka di situs ini disajikan untuk dibaca cepat; untuk rilis resmi dan metodologi lengkap, lihat publikasi BPS.</p></section>';
}

/* ---------------- Router ---------------- */
function ruteSaatIni() {
  var h = window.location.hash || '#/';
  return h.replace(/^#\/?/, '').split('/')[0];
}

function render() {
  var r = ruteSaatIni();
  var petaPos = { penduduk: 0, ekonomi: 1, harga: 2, 'tenaga-kerja': 3, kemiskinan: 4, ipm: 5 };
  if (r === '' || r === '/') renderBeranda();
  else if (Object.prototype.hasOwnProperty.call(petaPos, r)) renderIndikator(petaPos[r]);
  else if (r === 'perbandingan') renderPerbandingan();
  else if (r === 'tentang') renderTentang();
  else renderBeranda();
  window.scrollTo(0, 0);
  var pilih = document.getElementById('tahun');
  if (pilih) pilih.addEventListener('change', function () {
    tahunPilih = Number(pilih.value);
    render();
  });
  var cari = document.getElementById('cari');
  if (cari) {
    cari.addEventListener('input', function () {
      cariTeks = cari.value;
      var pos = cari.selectionStart;
      render();
      var baru = document.getElementById('cari');
      if (baru) { baru.focus(); baru.setSelectionRange(pos, pos); }
    });
  }
  var tombolUrut = document.querySelectorAll('.urut');
  tombolUrut.forEach(function (b) {
    b.addEventListener('click', function () {
      var t = Number(b.getAttribute('data-tahun'));
      if (urutTahun === t) urutNaik = !urutNaik;
      else { urutTahun = t; urutNaik = true; }
      render();
    });
  });
}

window.addEventListener('hashchange', render);
document.addEventListener('DOMContentLoaded', render);
if (document.readyState !== 'loading') render();
