import express from "express";
import postagensRoutes from './routes/postagens.js';

process.loadEnvFile();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())

app.use('/postagens', postagensRoutes);

app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);});


