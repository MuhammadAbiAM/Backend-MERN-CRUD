import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import mahasiswaRoute from "./routes/mahasiswaRoute.js";

const app = express();
mongoose.connect('mongodb://localhost:27017/merncrud', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));

app.use(cors());
app.use(express.json());
app.use('/api/mahasiswa', mahasiswaRoute);

app.listen(5000, () => console.log('Server up and running...'));

// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Server up and running on port ${port}...`));
