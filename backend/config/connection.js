import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("String de conexão nao correspondente");
}

//TESTE DE CONEXAO COM O BANCO
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("conectado ao banco de dados");
  } catch (error) {
    console.log("erro ao conectar com o db");
    process.exit(1);
  }
}

export default connectDB;
