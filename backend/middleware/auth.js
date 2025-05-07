import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const token =
      req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token inexistente", error: true, success: false });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decode) {
      return res.status(401).json({
        message: "Acesso não autorizado",
        error: true,
        success: false,
      });
    }

    req.userId = decode.id;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Usuário não logado" || error,
      error: true,
      success: false,
    });
  }
};

export default auth;
