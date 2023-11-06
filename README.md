```markdown
# Layanan Parfum CusGan

Layanan Parfum CusGan didesain untuk membantu dalam menciptakan parfum yang dipersonalisasi berdasarkan karakteristik kepribadian pengguna. Layanan ini menggunakan arsitektur berbasis mikro untuk melakukan uji kepribadian dan menentukan parfum yang sesuai untuk pengguna. Layanan ini diimplementasikan menggunakan FastAPI dan mendukung berbagai operasi CRUD (Create, Read, Update, Delete) untuk mengelola data kepribadian.

## Fitur

### Mengambil Semua Kepribadian
- **Endpoint:** `/personality`
- **Metode:** GET
- **Deskripsi:** Mengambil detail semua kepribadian yang tersedia dalam database.

### Mengambil Kepribadian Spesifik
- **Endpoint:** `/personality/{item_id}`
- **Metode:** GET
- **Deskripsi:** Mengambil detail kepribadian berdasarkan ID tertentu.

### Menambahkan Kepribadian Baru
- **Endpoint:** `/personality`
- **Metode:** POST
- **Deskripsi:** Menambahkan profil kepribadian baru ke dalam database.

### Memperbarui Kepribadian
- **Endpoint:** `/personality`
- **Metode:** PUT
- **Deskripsi:** Memodifikasi profil kepribadian yang sudah ada.

### Menghapus Kepribadian
- **Endpoint:** `/personality/{item_id}`
- **Metode:** DELETE
- **Deskripsi:** Menghapus profil kepribadian berdasarkan ID mereka.

## Penggunaan

### Mengambil Semua Kepribadian
```http
GET /personality
```

### Mengambil Kepribadian Spesifik
```http
GET /personality/{item_id}
```
Gunakan metode ini untuk mendapatkan detail kepribadian spesifik dengan mengganti `{item_id}` dengan ID kepribadian yang diinginkan.

### Menambahkan Kepribadian Baru
```http
POST /personality
Content-Type: application/json

{
    "Nama": "Nama Pengguna",
    "Id": 1,
    "Umur": 25,
    "Pekerjaan": "Profesi Pengguna",
    "Deskripsi_Kepribadian": ["Ciri Kepribadian 1", "Ciri Kepribadian 2"],
    "Kombinasi_Fragrance": ["Wangi 1", "Wangi 2"]
}
```
Gunakan metode ini untuk menambahkan profil kepribadian baru ke dalam database. Gantilah nilai dengan informasi kepribadian yang sesuai.

### Memperbarui Kepribadian
```http
PUT /personality
Content-Type: application/json

{
    "Nama": "Nama Pengguna",
    "Id": 1,
    "Umur": 25,
    "Pekerjaan": "Profesi Pengguna",
    "Deskripsi_Kepribadian": ["Ciri Kepribadian 1", "Ciri Kepribadian 2"],
    "Kombinasi_Fragrance": ["Wangi 1", "Wangi 2"]
}
```
Gunakan metode ini untuk memperbarui profil kepribadian yang sudah ada. Gantilah nilai dengan informasi kepribadian yang diperbarui.

### Menghapus Kepribadian
```http
DELETE /personality/{item_id}
```
Gunakan metode ini untuk menghapus profil kepribadian berdasarkan ID mereka. Gantilah `{item_id}` dengan ID kepribadian yang akan dihapus.

## Instalasi dan Konfigurasi

1. Clone repository.
2. Instal dependensi yang diperlukan dengan perintah: `pip install -r requirements.txt`.
3. Jalankan aplikasi FastAPI dengan: `uvicorn app:app --reload`.

## Struktur Data

Layanan mengelola data kepribadian dengan struktur berikut:
```json
{
    "Nama": "Nama Pengguna",
    "Id": 1,
    "Umur": 25,
    "Pekerjaan": "Profesi Pengguna",
    "Deskripsi_Kepribadian": ["Ciri Kepribadian 1", "Ciri Kepribadian 2"],
    "Kombinasi_Fragrance": ["Wangi 1", "Wangi 2"]
}
```

## Penyimpanan Data

Layanan menyimpan dan mengambil data dari file JSON yang bernama `personality.json`.

## Catatan

- Pastikan autentikasi dan otorisasi yang tepat diimplementasikan untuk penggunaan produksi.
- Selalu tangani respons dan error sesuai dengan kode status HTTP dan struktur JSON yang diharapkan.

Anda dapat meningkatkan keamanan, validasi, dan penanganan error berdasarkan kebutuhan aplikasi dan spesifikasi Anda.
```