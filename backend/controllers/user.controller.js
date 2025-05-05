import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import sendEmail from "../config/sendEmail.js";

export async function registerUserController(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Campos de email, nome e senha são obrigatórios",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        message: "Usuário já existe",
        error: true,
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code${save?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verifique seu email",
      html: verifyEmailTemplate({ name, url: VerifyEmailUrl }),
    });

    return res.json({
      message: "Usuário criado com sucesso",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong" || error,
      error: true,
      success: false,
    });
  }
}
