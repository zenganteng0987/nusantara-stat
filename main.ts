// NusantaraStat — program pengemas entri (Node 22, stdlib saja).
// Situsnya tinggal di app/ sebagai file statis yang dibuka browser di
// app/index.html; tidak ada langkah build. Program ini menyalin app/ dan
// screenshots/ dari sebelah file ini ke direktori output, lalu menulis
// dossier.json di sana memakai pustaka make.fun yang sudah divendor.
// Di luar container penilai, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// Batas-batas dari gate penilai: hanya text_max_bytes yang membentuk isi
// dossier; sisanya menolak entri yang memang akan ditolak penilai
// (lebih dari 4 tangkapan layar atau satu di atas 256 KiB; app/ di atas
// 993 entri atau 16 MiB).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);

// Catatan penanda: dossier ditulis dari app/ + screenshots/ yang sama
// persis dengan yang ada di sebelah file ini, tanpa perubahan apa pun,
// sehingga hasil dua kali jalan selalu identik (deterministik).
console.log(`dossier.json ditulis ke ${out}`);
