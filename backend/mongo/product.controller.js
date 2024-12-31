const productModel = require("./product.model");
const categoryModel = require("./categories.model");
module.exports = {
  insert,
  gettAll,
  getByKey,
  updateById,
  remove,
  getNew,
  getById,
  search,
  getHot,
  getRelatedProductsByProductId,
  getProView,
  getDecrease,
  getAscending,
};

async function insert(body) {
  try {
    const { name, img, price, quantity, category, description } = body;
    console.log("Category ID:", category);
    console.log("Category Name:", name);
    console.log("Category price:", price);
    console.log("Category mota:", description);
    console.log("Category img:", img);
    console.log("Category soluong:", quantity);
    // tim id
    const categoryFind = await categoryModel.findById(category); //người dùng sẽ nhập và tìm kiếm theo cái id trong cái categoryMOdel
    console.log("Category found:", categoryFind);
    if (!categoryFind) {
      throw new Error("Không tìm thấy danh mục");
    }
    const proNew = new productModel({
      name,
      img,
      price,
      quantity,
      category,
      category: {
        categoryId: categoryFind._id,
        categoryName: categoryFind.name,
      },
      description,
    });

    // lưu database
    const result = await proNew.save();
    return result;
  } catch (error) {
    console.log("Lỗi", error);
    throw error;
  }
}

async function gettAll() {
  try {
    const result = await productModel.find();
    return result;
  } catch (error) {
    console.log("Lỗi lấy sp", error);
    throw error;
  }
}

async function getByKey(key, value) {
  try {
    const pro = await productModel.find({ [key]: value });
    return pro;
  } catch (error) {
    console.log("Lỗi lấy sp theo key", error);
    throw error;
  }
}

// cập nhật sp theo id

async function updateById(id, body) {
  try {
    const pro = await productModel.findById(id);
    if (!pro) {
      throw new Error("Không tìm thấy sản phẩm");
    }
    const { name, price, img, quantity, category, description } = body;
    let cateFind = null;
    if (category) {
      cateFind = await categoryModel.findById(category);
      if (!cateFind) {
        throw new Error("Khong tim thay danh muc");
      }
    }
    const cateUpdate = cateFind
      ? {
          categoryId: cateFind._id,
          categoryName: cateFind.name,
        }
      : pro.category;

    const result = await productModel.findByIdAndUpdate(
      id,
      { name, price, img, quantity, category: cateUpdate, description },
      { new: true }
    );
    return result;
  } catch (error) {
    console.log("lỗi update", error);
    throw error;
  }
}

// xóa sp theo id
async function remove(id) {
  try {
    const result = await productModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log("LỖI XÓA SP THEO ID", error);
    throw error;
  }
}

async function getNew() {
  try {
    const result = await productModel.find().sort({ _id: -1 }).limit(4);
    return result;
  } catch (error) {
    console.log("LỖI", error);
    throw error;
  }
}

async function getHot() {
  try {
    const result = await productModel.find({ hot: 1 }).limit(4);
    return result;
  } catch (error) {
    console.log("LỖI", error);
    throw error;
  }
}

async function getById(id) {
  try {
    const proId = await productModel.findById(id);
    return proId;
  } catch (error) {
    console.log("LỖI LAAYS CHI TIẾT SP", error);
    throw error;
  }
}

async function getRelatedProductsByProductId(id) {
  try {
    // Tìm sản phẩm với productId được cung cấp
    const product = await productModel.findById(id);
    // Trích xuất categoryId từ sản phẩm tìm được
    const categoryId = product.category.categoryId;

    // Tìm tất cả các sản phẩm trong cùng một category
    const relatedProducts = await productModel
      .find({
        "category.categoryId": categoryId,
        _id: { $ne: id }, // loại trừ sản phẩm hiện tại
      })
      .limit(4);
    console.log("Related Products in controller:", relatedProducts); // Kiểm tra kết quả trả về từ database

    return relatedProducts;
  } catch (error) {
    console.log("Lỗi lấy sản phẩm liên quan", error);
    throw error;
  }
}

async function search(name) {
  try {
    const result = await productModel.find(
      {
        name: { $regex: name, $options: "i" }, // i :không phân biệt hoa thường
      },
      { name: 1, price: 1, quantity: 1, img: 1 }
    );
    return result;
  } catch (error) {
    console.log("Lỗi lấy sp", error);
    throw error;
  }
}

async function getDecrease() {
  try {
    const result = await productModel.find().sort({ price: -1 }); // -1 laf giamr daanf
    return result;
  } catch (error) {
    console.log("Lỗi lấy sp", error);
    throw error;
  }
}
async function getAscending() {
  try {
    const result = await productModel.find().sort({ price: 1 });
    return result;
  } catch (error) {
    console.log("Lỗi lấy sp theo key", error);
    throw error;
  }
}

async function getProView() {
  try {
    const result = await productModel
      .find({ view: { $gte: 50 } })
      .sort({ view: -1 })
      .limit(4);
    return result;
  } catch (error) {
    console.log("Lỗi lấy sp", error);
    throw error;
  }
}
