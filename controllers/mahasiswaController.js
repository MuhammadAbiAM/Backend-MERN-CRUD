import Mahasiswa from '../models/mahasiswaModel.js';

export const getMahasiswa = async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.find();
        res.json(mahasiswa);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getMahasiswaById = async (req, res) => {
    try {
        const mahasiswa = await Mahasiswa.findById(req.params.id);
        res.json(mahasiswa);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// export const saveMahasiswa = async (req, res) => {
//     const mahasiswa = new Mahasiswa(req.body);
//     try {
//         const insertedmahasiswa = await mahasiswa.save();
//         res.status(201).json(insertedmahasiswa);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

export const saveMahasiswa = async (req, res) => {
    const { nama, nim, jurusan } = req.body;
    const errors = {};

    if (!nama || nama.trim() === '') {
        errors.nama = "Nama wajib diisi.";
    } else if (nama.length < 3) {
        errors.nama = "Nama minimal 3 karakter.";
    }

    if (!nim || nim.trim() === '') {
        errors.nim = "NIM wajib diisi.";
    } else if (!/^\d{9}$/.test(nim)) {
        errors.nim = "NIM harus terdiri dari 9 digit angka.";
    }

    if (!jurusan || jurusan.trim() === '') {
        errors.jurusan = "Jurusan wajib diisi.";
    }

    // Cek NIM duplikat
    const existingNim = await Mahasiswa.findOne({ nim });
    if (existingNim) {
        errors.nim = "NIM sudah terdaftar.";
    }

    // Jika ada error, kembalikan semua error
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    // Lanjutkan simpan ke database
    try {
        const mahasiswa = new Mahasiswa({ nama, nim, jurusan });
        const inserted = await mahasiswa.save();
        res.status(201).json(inserted);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



export const updateMahasiswa = async (req, res) => {
    const { nama, nim, jurusan } = req.body;
    const errors = {};

    // Validasi hanya field yang dikirim
    if ('nama' in req.body) {
        if (!nama || nama.trim() === '') {
            errors.nama = "Nama wajib diisi.";
        } else if (nama.length < 3) {
            errors.nama = "Nama minimal 3 karakter.";
        }
    }

    if ('nim' in req.body) {
        if (!nim || nim.trim() === '') {
            errors.nim = "NIM wajib diisi.";
        } else if (!/^\d{9}$/.test(nim)) {
            errors.nim = "NIM harus 9 digit angka.";
        }
    }

    if ('jurusan' in req.body) {
        if (!jurusan || jurusan.trim() === '') {
            errors.jurusan = "Jurusan wajib diisi.";
        }
    }

    // Cek apakah ada mahasiswa lain dengan NIM yang sama
    const existingNim = await Mahasiswa.findOne({ nim, _id: { $ne: req.params.id } });
    if (existingNim) {
        errors.nim = "NIM sudah digunakan oleh mahasiswa lain.";
    }

    // Jika ada error, kembalikan semua error
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        const updatedmahasiswa = await Mahasiswa.updateOne({ _id: req.params.id }, { $set: req.body });
        res.status(200).json(updatedmahasiswa);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteMahasiswa = async (req, res) => {
    try {
        const deletedmahasiswa = await Mahasiswa.deleteOne({ _id: req.params.id });
        res.status(200).json(deletedmahasiswa);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}