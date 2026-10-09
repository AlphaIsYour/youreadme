# Open-Source Contributor Issues for Reavas (YouREADME)

Dokumen ini berisi daftar issue open-source nyata, terstruktur, dan telah dipublikasikan ke tab **Issues** di GitHub repositori [`AlphaIsYour/youreadme`](https://github.com/AlphaIsYour/youreadme/issues).
Setiap issue telah dilengkapi dengan latar belakang masalah (_Why_), panduan teknis (_Possible Approach_), _Acceptance Criteria_, tingkat kesulitan, dan label `good first issue` / `help wanted`.

---

## Issue #1 — [GOOD FIRST ISSUE] [DATA] Add Database, DevOps, and Cloud badges to Badge Catalog

- **Labels**: `good first issue`, `enhancement`, `documentation`
- **Difficulty**: **Beginner** (1–2 hours)
- **Relevant Files**: `src/data/badges.ts`

### Problem

Katalog badge di `src/data/badges.ts` saat ini baru mencakup kategori dasar (_Frameworks_, _Languages_, _Tools_, _License_, _Status_). Kategori esensial seperti **Database** (PostgreSQL, MySQL, MongoDB, Redis, Supabase) dan **DevOps / Cloud** (Docker, Kubernetes, AWS, Cloudflare, Vercel) belum tersedia.

### Why

Banyak project open-source menggunakan database dan layanan cloud yang ingin mereka tampilkan di barisan badge README. Tanpa ini, pengguna harus membuat link badge secara manual.

### Current Behavior

Hanya ada 5 kategori badge bawaan di `BadgePicker.tsx`.

### Expected Behavior

Badge Picker memiliki kategori baru seperti `Database` dan `Cloud & DevOps` dengan logo dan warna resmi Shields.io.

### Possible Approach

1. Buka `src/data/badges.ts`.
2. Tambahkan objek badge baru mengikuti antarmuka `Badge`:
   ```ts
   {
     id: 'badge-postgresql',
     label: 'PostgreSQL',
     message: 'PostgreSQL',
     color: '4169e1',
     logo: 'postgresql',
     logoColor: 'white',
     category: 'Database',
   }
   ```
3. Tambahkan minimal 8–10 badge populer (PostgreSQL, MySQL, Redis, MongoDB, Supabase, Docker, Kubernetes, AWS, Cloudflare).

### Acceptance Criteria

- [ ] Badge baru muncul di modal `BadgePicker` pada kategori yang sesuai.
- [ ] Preview badge Shields.io dapat di-load dengan benar.
- [ ] `npm run lint` dan `npm run build` berhasil tanpa error.

---

## Issue #2 — [GOOD FIRST ISSUE] [BUG] Ignore headings inside markdown code blocks in Heading Validator

- **Labels**: `bug`, `good first issue`, `markdown`
- **Difficulty**: **Beginner - Intermediate** (2–3 hours)
- **Relevant Files**: `src/lib/markdown.ts`

### Problem

Fungsi `validateHeadingStructure` di `src/lib/markdown.ts` memindai baris teks dengan regex `^(#{1,6})\s+(.+)`. Jika sebuah blok kode (misalnya shell script) memuat komentar seperti `# Step 1: Install dependencies`, validator salah mengira baris tersebut sebagai heading H1.

### Why

Ini memicu peringatan palsu (_false-positive warnings_) seperti `Multiple H1 headings found` atau `Heading level skip detected`, yang membingungkan pengguna saat memasukkan kode instalasi.

### Current Behavior

Komentar `#` di dalam blok kode ` ``` ` dihitung sebagai heading Markdown.

### Expected Behavior

Baris yang berada di antara triple backtick (` ``` `) harus dilewati (_ignored_) dari pengecekan heading.

### Possible Approach

Gunakan flag boolean pelacak `isInCodeBlock = false;`. Saat menemukan baris yang diawali ` ``` `, balik nilai flag `isInCodeBlock = !isInCodeBlock`. Abaikan deteksi heading jika `isInCodeBlock === true`.

### Acceptance Criteria

- [ ] Komentar bertanda `#` di dalam kode blok tidak memicu peringatan heading.
- [ ] Heading asli di luar kode blok tetap divalidasi dengan benar.
- [ ] Struktur hierarki H1 -> H2 -> H3 tetap terjaga.

---

## Issue #3 — [GOOD FIRST ISSUE] [BUG] URL encode dynamic parameters for shields.io badges in Header renderer

- **Labels**: `bug`, `good first issue`
- **Difficulty**: **Beginner** (1 hour)
- **Relevant Files**: `src/lib/markdown.ts`

### Problem

Di `renderHeader()` pada `src/lib/markdown.ts`, URL badge Shields.io dibuat langsung menggunakan string template:

```ts
header += `![Version](https://img.shields.io/badge/version-${project.version}-blue) `;
header += `![License](https://img.shields.io/badge/license-${project.license}-green) `;
```

Jika pengguna memasukkan nama lisensi seperti `Apache 2.0` (ada spasi) atau versi seperti `v1.0.0-beta/1` (ada tanda slash), URL gambar Shields.io menjadi rusak (_broken image link_).

### Why

Shields.io mewajibkan karakter khusus seperti spasi atau tanda hubung di-encode (misal spasi diubah menjadi `%20` atau `_`).

### Current Behavior

Spasi dan karakter khusus menyebabkan gambar badge gagal di-render di preview markdown.

### Expected Behavior

Badge Shields.io tetap tampil valid meskipun input pengguna mengandung spasi atau karakter khusus.

### Possible Approach

Gunakan helper encode URL seperti `encodeURIComponent()` atau format penggantian Shields.io (mengganti `-` menjadi `--` dan spasi menjadi `_` sesuai spesifikasi Shields.io).

### Acceptance Criteria

- [ ] Lisensi dengan spasi seperti `Apache 2.0` atau `GPL v3` menghasilkan badge yang valid.
- [ ] Versi dengan tag semver kompleks tetap ter-render dengan sempurna.

---

## Issue #4 — [GOOD FIRST ISSUE] [A11Y] Add missing aria-labels and keyboard focus to editor action buttons

- **Labels**: `accessibility`, `ui/ux`, `good first issue`
- **Difficulty**: **Beginner** (1–2 hours)
- **Relevant Files**: `src/components/editor/SectionEditor.tsx`, `src/components/editor/SortableSection.tsx`, `src/app/editor/page.tsx`

### Problem

Beberapa tombol aksi di antarmuka editor hanya menggunakan ikon visual (misal tombol drag handle, tombol hapus section, tombol collapse/expand, dan tombol toggle sidebar) tanpa atribut `aria-label` yang ramah pembaca layar (_screen reader_).

### Why

Aplikasi open-source yang baik harus dapat diakses oleh semua developer, termasuk yang mengandalkan navigasi keyboard dan teknologi asistif (a11y).

### Current Behavior

Elemen `<button>` icon-only tidak memiliki nama aksesibel yang dibacakan oleh screen reader.

### Expected Behavior

Setiap tombol aksi memiliki `aria-label` yang jelas (contoh: `aria-label="Delete section"`, `aria-label="Drag to reorder"`), serta outline focus yang jelas saat dinavigasi menggunakan tombol `Tab`.

### Acceptance Criteria

- [ ] Semua tombol tanpa teks di `SectionEditor.tsx` dan `SortableSection.tsx` memiliki `aria-label` deskriptif.
- [ ] Pengguna dapat menavigasi dan mengaktifkan tombol dengan keyboard (`Tab`, `Space`, `Enter`).

---

## Issue #5 — [TESTING] Add unit test suite for markdown compilation & validator functions

- **Labels**: `testing`, `developer-experience`, `help wanted`
- **Difficulty**: **Intermediate** (3–4 hours)
- **Relevant Files**: `package.json`, `src/lib/markdown.ts`, `src/lib/utils.ts`, `vitest.config.ts`

### Problem

Repositori saat ini belum memiliki test runner atau unit test suite otomatis. Kontributor yang ingin mengubah fungsi logika parser tidak dapat menguji apakah perubahan mereka menyebabkan regresi.

### Why

Automated testing adalah jaring pengaman paling penting dalam project open source agar maintainer dapat me-merge PR dengan aman dan cepat.

### Current Behavior

Tidak ada skrip `npm test` di `package.json`.

### Expected Behavior

Terdapat test runner ringan (disarankan **Vitest**) dengan skrip `npm test` yang dapat dijalankan secara lokal maupun di CI GitHub Actions.

### Possible Approach

1. Pasang `vitest` sebagai dev dependency: `npm install -D vitest`.
2. Tambahkan skrip `"test": "vitest run"` dan `"test:watch": "vitest"` di `package.json`.
3. Buat file pengujian di `src/lib/__tests__/markdown.test.ts`:
   - Uji output `generateMarkdown` dengan kombinasi section yang di-disable/enable.
   - Uji `validateHeadingStructure` (deteksi tidak ada H1, deteksi level skip).
   - Uji `getDefaultChecklist`.
4. Tambahkan step `run: npm test` pada workflow `.github/workflows/ci.yml`.

### Acceptance Criteria

- [ ] Skrip `npm test` berjalan sukses dan melewati semua unit test.
- [ ] Test mencakup skenario sukses dan skenario edge cases.
- [ ] Workflow CI GitHub Actions otomatis menjalankan `npm test`.

---

## Issue #6 — [FEATURE / UX] Auto-save draft to localStorage with reset confirmation

- **Labels**: `enhancement`, `ui/ux`, `help wanted`
- **Difficulty**: **Intermediate** (2–4 hours)
- **Relevant Files**: `src/app/editor/page.tsx`

### Problem

Saat ini, jika pengguna me-refresh halaman browser atau tab tertutup tanpa sengaja saat menyusun README yang panjang, seluruh perubahan hilang dan kembali ke template default.

### Why

Kehilangan progres ketikan adalah pengalaman pengguna yang sangat membuat frustrasi.

### Current Behavior

State aplikasi hanya disimpan di memori komponen React.

### Expected Behavior

- Form input dan section tersimpan otomatis ke `localStorage` (dengan debounce 500ms agar performa tetap ringan).
- Saat halaman editor dimuat, jika ada draft tersimpan, aplikasi otomatis memuat draft tersebut.
- Tombol "Reset to Default" menampilkan dialog konfirmasi agar pengguna tidak sengaja menghapus draft mereka.

### Acceptance Criteria

- [ ] Refresh halaman editor tidak menghilangkan data yang sudah diketik.
- [ ] Ada indikator status kecil ("Saved" / "Saving...").
- [ ] Tombol Reset meminta konfirmasi sebelum mengosongkan `localStorage`.

---

## Issue #7 — [FEATURE] Add Word Count, Character Count, and Estimated Reading Time

- **Labels**: `enhancement`, `ui/ux`, `good first issue`
- **Difficulty**: **Beginner - Intermediate** (2 hours)
- **Relevant Files**: `src/components/preview/MarkdownPreview.tsx`

### Problem

Pengguna tidak mengetahui seberapa panjang atau padat file README yang mereka buat, apakah terlalu ringkas atau justru terlalu panjang untuk sebuah dokumentasi awal.

### Why

Statistik panjang dokumen (jumlah kata, estimasi menit membaca) memberikan umpan balik langsung yang sangat berguna bagi maintainer proyek untuk menjaga README tetap ringkas dan padat.

### Current Behavior

Header di atas preview hanya menampilkan tab "Preview" dan "Raw Markdown".

### Expected Behavior

Di bilah status preview, terdapat metadata ringkas:

- Contoh: `~450 words • 3,120 chars • 2 min read`.

### Possible Approach

1. Hitung jumlah kata dari string `markdown`:
   ```ts
   const wordCount = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
   const charCount = markdown.length;
   const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
   ```
2. Tampilkan badge statistik kecil di bagian atas `MarkdownPreview.tsx`.

### Acceptance Criteria

- [ ] Menampilkan jumlah kata dan karakter secara akurat dan reaktif saat pengguna mengetik.
- [ ] Tampilan rapi dan responsif di mode mobile maupun desktop.

---

## Issue #8 — [TEMPLATE] Add "Fullstack API / Backend Service" Starter Template

- **Labels**: `enhancement`, `documentation`, `good first issue`
- **Difficulty**: **Beginner** (1–2 hours)
- **Relevant Files**: `src/data/templates.ts`, `src/types/index.ts`

### Problem

Pilihan template saat ini baru ada 4 (_Web Application_, _Library / Package_, _CLI Tool_, _Minimalist Starter_). Belum ada template yang difokuskan khusus untuk proyek **Backend / REST & GraphQL API / Microservices**.

### Why

Proyek backend membutuhkan bagian dokumentasi khusus seperti: _API Endpoints summary_, _Environment Variables table_, _Database Migrations_, dan _Health Checks_.

### Current Behavior

Pengembang backend harus memilih template Web Application lalu menghapus dan membuat banyak section manual.

### Expected Behavior

Tersedia template ke-5 bernama "Backend API / Microservice" dengan struktur section siap pakai (Architecture, API Endpoints, Environment Variables, Database Setup, Docker Run).

### Acceptance Criteria

- [ ] Template baru muncul di modal `TemplateSelector`.
- [ ] Memilih template ini memuat struktur section backend yang lengkap dan representatif.
- [ ] Tipe TypeScript tetap valid tanpa error kompilasi.

---

## Issue #9 — [UI / UX] Add Keyboard Shortcuts for Export, Copy, and Tab Switching

- **Labels**: `enhancement`, `developer-experience`, `ui/ux`
- **Difficulty**: **Intermediate** (2–3 hours)
- **Relevant Files**: `src/app/editor/page.tsx`

### Problem

Pengembang terbiasa menggunakan shortcut keyboard. Saat ini, untuk melakukan export, menyalin teks, atau beralih antara tab Editor dan Preview, pengguna harus mengklik tombol dengan kursor mouse.

### Why

Pintasan keyboard mempercepat alur kerja (_productivity boost_) secara drastis bagi pengguna tingkat lanjut.

### Current Behavior

Hanya interaksi klik mouse yang didukung untuk export dan copy.

### Expected Behavior

- `Ctrl + S` / `Cmd + S`: Trigger download README.md (mencegah default browser save page).
- `Ctrl + Shift + C` / `Cmd + Shift + C`: Copy raw markdown ke clipboard.
- Terdapat tooltip kecil penunjuk shortcut pada tombol terkait.

### Acceptance Criteria

- [ ] Menekan shortcut menjalankan fungsi yang sesuai.
- [ ] Event handler mencegah konflik dengan shortcut bawaan browser default.
- [ ] Bekerja mulus di Windows, Linux, dan macOS.

---

## Issue #10 — [UI / UX] Responsive Mobile Toggle for Split Editor and Preview

- **Labels**: `ui/ux`, `responsive`, `help wanted`
- **Difficulty**: **Intermediate** (3 hours)
- **Relevant Files**: `src/app/editor/page.tsx`

### Problem

Pada layar smartphone / tablet (layar < 1024px), antarmuka editor dan preview terasa sempit atau memerlukan scrolling horizontal/vertikal bertumpuk.

### Why

Banyak kontributor menginspeksi atau mengedit dokumentasi melalui perangkat portabel atau layar laptop berukuran kecil.

### Current Behavior

Tampilan responsif saat ini menyembunyikan sebagian panel atau membuat tampilan bertumpuk panjang.

### Expected Behavior

Pada viewport layar kecil (`< lg`), sediakan bottom navigation bar atau floating segment switch (`[Edit] | [Preview]`) yang membuat pengguna dapat beralih tampilan secara penuh dan nyaman dengan satu ketukan jari.

### Acceptance Criteria

- [ ] Tampilan editor dan preview memiliki pengalaman mulus tanpa scroll horizontal di layar mobile (resolusi 375px - 768px).
- [ ] Transisi antar tab terasa instan dan tidak merusak layout.

---

## Issue #11 — [FEATURE] Quick Section Presets (License Chooser, Contributing Guidelines generator)

- **Labels**: `enhancement`, `help wanted`
- **Difficulty**: **Intermediate** (3–4 hours)
- **Relevant Files**: `src/components/editor/SectionEditor.tsx`, `src/lib/markdown.ts`

### Problem

Saat ini, bagian lisensi di `renderLicense` hanya memuat satu baris ringkas: `This project is licensed under the MIT License`. Tidak ada opsi untuk memilih jenis lisensi lengkap (MIT, Apache 2.0, GPL v3, BSD-3, Unlicense).

### Why

Pemilihan lisensi dan panduan kontribusi adalah elemen paling penting dalam repositori open source.

### Current Behavior

Input lisensi hanya berupa input teks bebas tanpa rekomendasi atau teks klausul standar.

### Expected Behavior

Pada section License, sediakan dropdown pemilih lisensi populer yang otomatis menyertakan ringkasan hak cipta dan klausul lisensi yang tepat ke dalam markdown.

### Acceptance Criteria

- [ ] Dropdown lisensi menyediakan pilihan: MIT, Apache 2.0, GPL-3.0, BSD-3-Clause, Unlicense.
- [ ] Memilih lisensi memperbarui teks section dan badge lisensi secara otomatis.

---

## Issue #12 — [DOCS / DX] Add Code Formatting script with Prettier & Git Pre-commit guidance

- **Labels**: `developer-experience`, `documentation`, `good first issue`
- **Difficulty**: **Beginner** (1–2 hours)
- **Relevant Files**: `package.json`, `.prettierrc` (baru), `.prettierignore` (baru), `CONTRIBUTING.md`

### Problem

Repositori saat ini hanya memiliki ESLint, tetapi belum memiliki konfigurasi **Prettier** untuk konsistensi indentasi, tanda petik (_quotes_), dan trailing commas.

### Why

Perbedaan pengaturan editor (tab vs spasi, single quotes vs double quotes) antar kontributor sering kali menghasilkan diff commit yang berantakan dan sulit di-review.

### Current Behavior

Tidak ada perintah `npm run format`.

### Expected Behavior

Terdapat file konfigurasi `.prettierrc` standar dan skrip `npm run format` di `package.json`, serta panduan singkat di `CONTRIBUTING.md`.

### Acceptance Criteria

- [ ] File `.prettierrc` ditambahkan dengan konfigurasi umum (misal: `semi: true`, `singleQuote: true`, `tabWidth: 2`).
- [ ] Menambahkan skrip `"format": "prettier --write ."` dan `"format:check": "prettier --check ."` ke `package.json`.
- [ ] Panduan format terdokumentasi di `CONTRIBUTING.md`.
