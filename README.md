# Layanan Parfum CusGan

Layanan Parfum CusGan dikembangkan untuk menciptakan wewangian yang dipersonalisasi berdasarkan karakteristik kepribadian pengguna. Layanan ini menggunakan arsitektur mikro yang dapat melakukan uji kepribadian dan menentukan wewangian yang cocok untuk pengguna. Layanan ini diimplementasikan menggunakan FastAPI dan mendukung operasi CRUD (Create, Read, Update, Delete) untuk mengelola data kepribadian.

## Fitur

### 1. Mengambil Semua Kepribadian
   - **Endpoint:** `/personality`
   - **Metode:** GET
   - **Deskripsi:** Mendapatkan detail semua kepribadian yang tersedia dalam database.

### 2. Mengambil Kepribadian Spesifik
   - **Endpoint:** `/personality/{item_id}`
   - **Metode:** GET
   - **Deskripsi:** Mendapatkan detail kepribadian berdasarkan ID tertentu.

### 3. Menambahkan Kepribadian Baru
   - **Endpoint:** `/personality`
   - **Metode:** POST
   - **Deskripsi:** Menambahkan profil kepribadian baru ke dalam database.

### 4. Memperbarui Kepribadian
   - **Endpoint:** `/personality`
   - **Metode:** PUT
   - **Deskripsi:** Memodifikasi profil kepribadian yang sudah ada.

### 5. Menghapus Kepribadian
   - **Endpoint:** `/personality/{item_id}`
   - **Metode:** DELETE
   - **Deskripsi:** Menghapus profil kepribadian berdasarkan ID mereka.

## Penggunaan

### Mengambil Semua Kepribadian

```http
GET /personality