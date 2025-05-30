import SubCategoryModel from "../models/subCategory.model.js";

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

    const createSubCategory = new SubCategoryModel(payload);
    const save = await createSubCategory.save();

    return res.json({
      message: "Subcategoria cadastrada com sucesso",
      error: false,
      success: true,
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
    const data = await SubCategoryModel.find()
      .sort({ createAt: -1 })
      .populate("category");

    return res.json({
      message: "Dados da categoria",
      error: false,
      success: true,
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

export const updateSubCategoryController = async (req, res) => {
  try {
    const { _id, name, image, category } = req.body;

    const checkSub = await SubCategoryModel.findId(_id);

    if (!checkSub) {
      return res.status(400).json({
        message: "Verifiquei seu id",
        error: true,
        success: false,
      });
    }

    const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, {
      name,
      image,
      category,
    });

    return res.json({
      message: "Atualizado com sucesso",
      data: updateSubCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteSubCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;
    const deleteSub = await SubCategoryModel.findByIdAndDelete(_id);

    return res.json({
      message: "Deletado com sucesso",
      data: deleteSub,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
