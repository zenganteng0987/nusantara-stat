/* Pembuat grafik SVG vanilla untuk NusantaraStat — tanpa library.
   Dua jenis: grafik garis (tren tahunan) dan grafik batang. */

function formatID(nilai, desimal) {
  return nilai.toLocaleString('id-ID', {
    minimumFractionDigits: desimal,
    maximumFractionDigits: desimal
  });
}

function skalaNilai(nilaiArr) {
  let min = Math.min.apply(null, nilaiArr);
  let max = Math.max.apply(null, nilaiArr);
  if (min === max) { min -= 1; max += 1; }
  const pad = (max - min) * 0.15;
  return { min: min - pad, max: max + pad };
}

/* Grafik garis: nilai per tahun, label tahun di sumbu bawah. */
function grafikGaris(nilaiArr, labelArr, warna) {
  const W = 640, H = 260, PL = 56, PR = 16, PT = 18, PB = 34;
  const s = skalaNilai(nilaiArr);
  const x = function (i) { return PL + (i * (W - PL - PR)) / (nilaiArr.length - 1); };
  const y = function (v) { return PT + ((s.max - v) * (H - PT - PB)) / (s.max - s.min); };
  let titik = '';
  let labelNilai = '';
  nilaiArr.forEach(function (v, i) {
    titik += (i ? ' L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1);
    labelNilai += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(v).toFixed(1) + '" r="4.5" fill="' + warna + '"/>';
    labelNilai += '<text x="' + x(i).toFixed(1) + '" y="' + (y(v) - 10).toFixed(1) + '" text-anchor="middle" class="g-nilai">' + formatID(v, 2) + '</text>';
  });
  let sumbu = '';
  labelArr.forEach(function (t, i) {
    sumbu += '<text x="' + x(i).toFixed(1) + '" y="' + (H - 10) + '" text-anchor="middle" class="g-sum">' + t + '</text>';
  });
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Grafik garis tahun ' + labelArr[0] + ' sampai ' + labelArr[labelArr.length - 1] + '">'
    + '<line x1="' + PL + '" y1="' + (H - PB) + '" x2="' + (W - PR) + '" y2="' + (H - PB) + '" class="g-axis"/>'
    + '<path d="' + titik + '" fill="none" stroke="' + warna + '" stroke-width="3" stroke-linejoin="round"/>'
    + labelNilai + sumbu + '</svg>';
}

/* Grafik batang: satu batang per tahun. */
function grafikBatang(nilaiArr, labelArr, warna) {
  const W = 640, H = 260, PL = 56, PR = 16, PT = 24, PB = 34;
  const atas = Math.max.apply(null, nilaiArr) * 1.12;
  const bawah = Math.min(0, Math.min.apply(null, nilaiArr));
  const slot = (W - PL - PR) / nilaiArr.length;
  const y = function (v) { return PT + ((atas - v) * (H - PT - PB)) / (atas - bawah); };
  let batang = '';
  let teks = '';
  nilaiArr.forEach(function (v, i) {
    const bx = PL + i * slot + slot * 0.18;
    const bw = slot * 0.64;
    batang += '<rect x="' + bx.toFixed(1) + '" y="' + y(v).toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + (y(bawah) - y(v)).toFixed(1) + '" rx="4" fill="' + warna + '"/>';
    teks += '<text x="' + (bx + bw / 2).toFixed(1) + '" y="' + (y(v) - 8).toFixed(1) + '" text-anchor="middle" class="g-nilai">' + formatID(v, 2) + '</text>';
    teks += '<text x="' + (bx + bw / 2).toFixed(1) + '" y="' + (H - 10) + '" text-anchor="middle" class="g-sum">' + labelArr[i] + '</text>';
  });
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Grafik batang tahun ' + labelArr[0] + ' sampai ' + labelArr[labelArr.length - 1] + '">'
    + '<line x1="' + PL + '" y1="' + y(bawah).toFixed(1) + '" x2="' + (W - PR) + '" y2="' + y(bawah).toFixed(1) + '" class="g-axis"/>'
    + batang + teks + '</svg>';
}
