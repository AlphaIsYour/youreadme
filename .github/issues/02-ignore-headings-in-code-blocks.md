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
