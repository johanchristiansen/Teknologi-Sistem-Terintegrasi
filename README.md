# CusGan API & Frontend

## Deskripsi Singkat
CusGan adalah aplikasi web yang mengintegrasikan backend API dengan frontend menggunakan FastAPI dan React. Aplikasi ini memungkinkan pengguna untuk mengelola data kepribadian, catatan aroma, dan rekomendasi produk berdasarkan deskripsi kepribadian. Terdapat juga fitur pendaftaran pengguna, autentikasi, dan manajemen pinjaman setelah diintegrasikan dengan layanan loan recommendation.

## Fitur
- **Manajemen Kepribadian**: Update data kepribadian.
- **Autentikasi Pengguna**: Pendaftaran dan login pengguna.
- **Rekomendasi Produk**: Berdasarkan deskripsi kepribadian.
- **Manajemen Pinjaman**: Pengajuan dan rekomendasi pinjaman dengan memanfaatkan layanan loan recommendation

## Persyaratan Teknis
- **Backend**: FastAPI
  - Autentikasi OAuth2
  - JWT untuk manajemen token
  - CORS middleware
- **Frontend**: React
  - Penggunaan `useState` dan `useEffect` Hooks
  - Navigasi dengan `react-router-dom`
  - Komunikasi dengan backend melalui Axios

## Cara Penggunaan
1. **Instalasi Dependensi**:
   - Backend: `pip install -r requirements.txt`
   - Frontend: `npm install`
2. **Menjalankan Server**:
   - Backend: `uvicorn main:app --reload`
   - Frontend: `npm start`
3. **Autentikasi Pengguna**:
   - Mendaftar dan login untuk mendapatkan token akses.
4. **Manajemen Kepribadian dan Rekomendasi Produk**:
   - Update data kepribadian untuk melihat rekomendasi produk.
5. **Mengisi Form Pinjaman Online dan Melihat Rekomendasi**:
   - Tambahkan data kemampuan finansial dan jumlah pinjaman untuk melihat rekomendasi.

## Struktur Data
- **PersonalityItem**:
  - Nama, Id, Umur, Pekerjaan, Deskripsi_Kepribadian, Kombinasi_Fragrance
- **UserRegistration**:
  - username, password
- **NotesItem**:
  - Deskripsi_Kepribadian, Kombinasi_Fragrance, Produk, Harga

## Endpoint API
- `/personality`: GET, POST, PUT, DELETE
- `/notes`: GET
- `/register`: POST
- `/token`: POST (Login)