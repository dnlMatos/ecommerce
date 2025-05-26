import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

const uploadImageController = async (req, res) => {
  try {
    const file = req.file;
    // Passo 1: Verifique se o arquivo foi enviado
    if (!file) {
      return res.status(400).json({
        message: "Nenhum arquivo enviado",
        error: true,
        success: false,
      });
    }

    const uploadImage = await uploadImageCloudinary(file);
    return res.json({
      message: "Imagem carregada com sucesso",
      error: false,
      success: true,
      data: uploadImage,
    });
  } catch (error) {
    // Passo 3: Exiba o erro real do Cloudinary
    console.error("Erro Cloudinary:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export default uploadImageController;
