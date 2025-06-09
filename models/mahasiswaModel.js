import mongoose from "mongoose";

const MahasiswaSchema = new mongoose.Schema({
    nama:
    {
        type: String,
        required: [true, "Nama wajib diisi"],
    },
    nim:
    {
        type: String,
        required: [true, "NIM wajib diisi"],
        unique: true,
    },
    jurusan:
    {
        type: String,
        required: [true, "Jurusan wajib diisi"],
    },
});

export default mongoose.model("Mahasiswa", MahasiswaSchema, "mahasiswa");
