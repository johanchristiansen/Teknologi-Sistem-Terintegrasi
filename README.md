```markdown
# CusGan - Custom Fragrance App

## Latar Belakang

CusGan adalah aplikasi parfum kustom yang memungkinkan pengguna menciptakan wewangian yang sesuai dengan karakteristik kepribadian mereka. Aplikasi ini menggunakan mikroservis untuk melakukan tes kepribadian dan menentukan kombinasi wewangian yang cocok. Pengguna dapat menambahkan, memperbarui, menghapus, dan melihat profil kepribadian mereka.

## Kebutuhan Instalasi

Sebelum menjalankan aplikasi, pastikan Anda telah menginstal Python dan pip. Selanjutnya, instal dependensi dengan menjalankan perintah berikut:

```bash
pip install -r requirements.txt
```

## Menjalankan Aplikasi

Untuk menjalankan aplikasi, gunakan perintah berikut:

```bash
uvicorn personality:app --reload
```

Aplikasi akan berjalan di `http://127.0.0.1:8000`. Buka browser atau gunakan Postman untuk berinteraksi dengan API.

## Autentikasi

Aplikasi sekarang dilengkapi dengan autentikasi menggunakan token JWT. Untuk mendapatkan token akses, kirim permintaan POST ke `/token` dengan menyertakan `username` dan `password`. Gunakan token yang diterima dalam header permintaan untuk rute-rute yang dilindungi.

Contoh permintaan POST untuk mendapatkan token:

```bash
curl -X POST "http://127.0.0.1:8000/token" -H "accept: application/json" -H "Content-Type: application/x-www-form-urlencoded" -d "username=testuser&password=testpassword"
```

## Endpoint API

### Mengambil Kepribadian Spesifik

```bash
GET /personality/{item_id}
```

Mengembalikan informasi kepribadian berdasarkan ID. Memerlukan token akses.

### Menambahkan Kepribadian Baru

```bash
POST /personality
```

Menambahkan profil kepribadian baru. Memerlukan token akses.

Contoh payload JSON:

```json
{
  "Nama": "John Doe",
  "Id": 3,
  "Umur": 25,
  "Pekerjaan": "Developer",
  "Deskripsi_Kepribadian": ["Friendly", "Innovative"],
  "Kombinasi_Fragrance": ["Lavender", "Vanilla"]
}
```

### Memperbarui Kepribadian

```bash
PUT /personality
```

Memperbarui profil kepribadian berdasarkan ID. Memerlukan token akses.

Contoh payload JSON:

```json
{
  "Nama": "John Doe",
  "Id": 3,
  "Umur": 25,
  "Pekerjaan": "Senior Developer",
  "Deskripsi_Kepribadian": ["Friendly", "Innovative", "Experienced"],
  "Kombinasi_Fragrance": ["Lavender", "Sandalwood"]
}
```

### Menghapus Kepribadian

```bash
DELETE /personality/{item_id}
```

Menghapus profil kepribadian berdasarkan ID. Memerlukan token akses.

## Tes Penggunaan dengan Postman

Anda dapat menggunakan Postman untuk menguji endpoint-endpoint API dengan mudah. Pastikan Anda sudah mendapatkan token akses melalui endpoint `/token` dan menyertakannya dalam header setiap permintaan yang memerlukan autentikasi.

---

Terima kasih telah menggunakan CusGan! Jika Anda memiliki pertanyaan atau masukan, jangan ragu untuk menghubungi kami.
```

Pastikan untuk memperbarui informasi terkait, seperti URL, nama pengguna, dan kata sandi sesuai dengan pengaturan Anda. Juga, pastikan untuk menyertakan contoh payload yang sesuai dengan struktur data yang diharapkan untuk setiap endpoint.