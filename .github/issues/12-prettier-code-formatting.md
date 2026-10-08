### Problem

Repositori saat ini hanya memiliki ESLint, tetapi belum memiliki konfigurasi **Prettier** untuk konsistensi indentasi, tanda petik (_quotes_), dan trailing commas.

### Why

Perbedaan pengaturan editor (tab vs spasi, single quotes vs double quotes) antar kontributor sering kali menghasilkan diff commit yang berantakan dan sulit di-review.

### Current Behavior

Tidak ada skrip `npm run format`.

### Expected Behavior

Terdapat file konfigurasi `.prettierrc` standar dan skrip `npm run format` di `package.json`, serta panduan singkat di `CONTRIBUTING.md`.

### Acceptance Criteria

- [ ] File `.prettierrc` ditambahkan dengan konfigurasi umum (misal: `semi: true`, `singleQuote: true`, `tabWidth: 2`).
- [ ] Menambahkan skrip `"format": "prettier --write ."` dan `"format:check": "prettier --check ."` ke `package.json`.
- [ ] Panduan format terdokumentasi di `CONTRIBUTING.md`.
