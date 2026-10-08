### Problem

Pengguna tidak mengetahui seberapa panjang atau padat file README yang mereka buat, apakah terlalu ringkas atau justru terlalu panjang untuk sebuah dokumentasi awal.

### Why

Statistik panjang dokumen (jumlah kata, estimasi menit membaca) memberikan umpan balik langsung yang sangat berguna bagi maintainer untuk menjaga README tetap ringkas dan padat.

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
