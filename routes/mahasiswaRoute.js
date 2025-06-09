import express from 'express';
import {
    getMahasiswa,
    getMahasiswaById,
    saveMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
} from '../controllers/mahasiswaController.js';

const router = express.Router();

router.get('/', getMahasiswa);
router.get('/:id', getMahasiswaById);
router.post('/', saveMahasiswa);
router.put('/:id', updateMahasiswa);
router.delete('/:id', deleteMahasiswa);

export default router;
