import UploadSubCategoryModel from "../../front/src/components/UploadSubCategoryModel";

export const AddSubCategoryController = async (req, res) => {
  try {
    const { name, image, category } = req.body;

    if (!name && !image && !category[0]) {
      return res.status(400).json({
        message: "Nome, foto ou categoria não informados",
        error: true,
        success: false,
      });
    }

    const payload = {
      name,
      image,
      category,
    };

    const createSubCategory = new UploadSubCategoryModel(payload);
    const save = await createSubCategory.save();

    return res.json({
      message: "Subcategoria cadastrada com sucesso",
      error: true,
      success: false,
      data: save,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getSubCategoryController = async (req, res) => {
  try {
    const data = await UploadSubCategoryModel.find().sort({ createAt: -1 });

    return res.json({
      message: "Dados da categoria",
      error: true,
      success: false,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
