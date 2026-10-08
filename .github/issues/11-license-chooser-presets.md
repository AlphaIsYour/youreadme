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
