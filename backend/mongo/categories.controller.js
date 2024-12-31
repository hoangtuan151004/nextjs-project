const categoryModel = require("./categories.model");
const productModel = require("./product.model");
module.exports = {
  gettAll,
  insert,
  updateById,
  getByCategory,
  getCategoryByName,
  deleteCate,
  getById,
};

async function gettAll() {
  try {
    const result = await categoryModel.find();
    return result;
  } catch (error) {
    console.log("Lỗi lấy sp", error);
    throw error;
  }
}

async function getByCategory(category) {
  try {
    const productsCategory = await productModel.find({
      "category.categoryId": category,
    });
    return productsCategory;
  } catch (error) {
    console.log("Lỗi lấy sản phẩm  theo ID danh mục", error);
    throw error;
  }
}

async function getCategoryByName(categoryName) {
  try {
    const category = await categoryModel.findOne({ name: categoryName });
    return category;
  } catch (error) {
    throw error;
  }
}

async function insert(body) {
  try {
    const name = body;
    console.log("Category Name:", name);

    const cateNew = new categoryModel(name);
    const result = await cateNew.save();
    return result;
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
}

async function updateById(id, body) {
  try {
    const cate = await categoryModel.findById(id);
    if (!cate) {
      throw new Error("Không tìm thấy danh mục");
    }
    const name = body;
    const result = await categoryModel.findByIdAndUpdate(id, name);
    return result;
  } catch (error) {
    console.log("lỗi update", error);
    throw error;
  }
}

async function deleteCate(id) {
  try {
    const pros = await productModel.find({ "category.categoryId": id });
    if (pros.length > 0) {
      return { success: false, message: "Danh mục có sản phẩm không thể xóa" };
    } else {
      const result = await categoryModel.findByIdAndDelete(id);
      if (result) {
        return { success: true, message: "Xóa danh mục thành công" };
      } else {
        return { success: false, message: "Không tìm thấy danh mục để xóa" };
      }
    }
  } catch (error) {
    console.log("LỖI XÓA DANH MỤC THEO ID", error);
    throw { success: false, message: "Đã xảy ra lỗi khi xóa danh mục", error };
  }
}

async function getById(id) {
  try {
    const proId = await categoryModel.findById(id);
    return proId;
  } catch (error) {
    console.log("LỖI LAAYS CHI TIẾT DM", error);
    throw error;
  }
}
