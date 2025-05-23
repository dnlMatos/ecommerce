import CategoryModel from "../models/category.model.js";

export const AddCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        message: "Nome e imagem são obrigatórios",
        error: true,
        success: false,
      });
    }

    const addCategory = new CategoryModel({
      name,
      image,
    });

    const saveCategory = await addCategory.save();

    if (!saveCategory) {
      return res.status(500).json({
        message: "Erro ao adicionar categoria",
        error: true,
        success: false,
      });
    }

    return res.json({
      message: "Categoria adicionada com sucesso",
      error: false,
      success: true,
      data: saveCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCategoryController = async (req, res) => {
  try {
    const data = await CategoryModel.find().sort({ createdAt: -1 });

    return res.json({
      message: "Categorias encontradas",
      error: false,
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { _id, name, image } = req.body;

    const update = await CategoryModel.updateOne(
      { _id: _id },
      {
        name,
        image,
      }
    );

    return res.json({
      message: "Categoria atualizada com sucesso",
      error: false,
      success: true,
      data: update,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.body;

    const checkSubCategory = await SubCategoryModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();

    const checkProduct = await ProductModel.find({
      category: {
        $in: [_id],
      },
    }).countDocuments();

    if (checkSubCategory > 0 || checkProduct > 0) {
      return res.status(400).json({
        message: "Categoria não pode ser deletada por estar em uso",
        error: true,
        success: false,
      });
    }

    const deleteCategory = await CategoryModel.deleteOne({ _id: id });

    return res.json({
      message: "Categoria deletada com sucesso",
      error: false,
      success: true,
      data: deleteCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
