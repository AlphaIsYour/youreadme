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
