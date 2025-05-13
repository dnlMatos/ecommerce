import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import sendEmail from "../config/sendEmail.js";
import generatedAccessToken from "../utils/generetedAccessToken.js";
import generatedRefreshToken from "../utils/generetedRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";

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

export async function verifyEmailController(req, res) {
  try {
    const { code } = req.body;
    const { user } = await UserModel.findOne({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: "Cod inválido",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      { _id: code },
      { verify_email: true }
    );

    return res.json({
      message: "Email verificado com sucesso" || error,
      error: true,
      success: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
}

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!email || !password) {
      return res.status(400).json({
        messagem: "Email e senha são obrigatórios",
        error: true,
        success: false,
      });
    }

    if (!user) {
      return res.status(400).json({
        messagem: "Usuário inexistente",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        messagem: "Contate seu administrador",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        messagem: "Senha incorreta",
        error: true,
        success: false,
      });
    }

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.json({
      messagem: "Logado com sucesso",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
}

export async function logoutController(req, res) {
  try {
    const userId = req.userId;

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    return res.json({
      messagem: "Logout realizado com sucesso",
      error: false,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
}

export async function uploadAvatar(req, res) {
  try {
    const userId = req.userId;
    const image = req.file;

    const upload = await uploadImageCloudinary(image);

    await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });

    return res.json({
      messagem: "Avatar atualizado",
      success: true,
      error: false,
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
}

export async function updateUserDetails(req, res) {
  try {
    const userId = req.userId;
    const { name, email, mobile, password } = req.body;

    let hashPassword = "";

    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, salt);
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashPassword }),
      }
    );

    return res.json({
      message: "Usuário atualizado com sucesso",
      error: false,
      success: true,
      // data: updateUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
}

export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        messagem: "Usuário não encontrado",
        error: true,
        success: false,
      });
    }

    const otp = generateOtp();
    const expireTime = new Date() + 60 * 60 * 1000;

    const update = await UserModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toISOString(),
    });

    await sendEmail({
      sendTo: email,
      subject: "Recuperação de senha",
      html: forgotPasswordTemplate({ name: user.name, otp }),
    });

    return res.json({
      message: "Código enviado com sucesso. Verifique seu email",
      error: false,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
}

export async function verifyForgotPasswordOtp(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Código OTP ou email não infomado(s)",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Usuário não encontrado",
        error: true,
        success: false,
      });
    }

    const currentTime = new Date().toISOString();

    if (user.forgot_password_expiry < currentTime) {
      return res.status(400).json({
        message: "Código expirado",
        error: true,
        success: false,
      });
    }

    if (otp !== user.forgot_password_otp) {
      return res.status(400).json({
        message: "Código inválido",
        error: true,
        success: false,
      });
    }

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      forgot_password_otp: "",
      forgot_password_expiry: "",
    });

    return res.json({
      message: "Código verificado com sucesso",
      error: false,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
}

export async function resetPassword(req, res) {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Campos obrigatórios não informados",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Usuário não encontrado",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Senhas não conferem",
        error: true,
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    const updateUser = await UserModel.findByIdAndUpdate(user._id, {
      password: hashPassword,
    });

    return res.json({
      message: "Senha atualizada com sucesso",
      error: false,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
}

export async function refreshTokenController(req, res) {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];

    if (!refreshToken) {
      return res.status(401).json({
        message: "Token inválido",
        error: true,
        success: false,
      });
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    if (!verifyToken) {
      return res.status(401).json({
        message: "Token expirado",
        error: true,
        success: false,
      });
    }

    const userId = verifyToken?._id;

    const newAccessToken = await generatedAccessToken(userId);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookieOptions);

    return res.json({
      message: "Token atualizado com sucesso",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
