import jwt from "jsonwebtoken";

const generateAccessToken = async (userId) => {
  const token = await jwt.sign(
    { id: userId },
    process.env.SECRET_TOKEN_ACCESS,
    {
      expiresIn: "10h",
    }
  );
  return token;
};

export default generateAccessToken;
