var express = require("express");
var router = express.Router();
const categoryController = require("../mongo/categories.controller");
const productController = require("../mongo/product.controller");
const checktoken = require("../helper/checktoken");

router.get("/", async (req, res) => {
  try {
    const category = await categoryController.gettAll();
    // console.log("Category:", category);
    return res.status(200).json(category);
  } catch (error) {
    console.log("Load danh muc không thành công", error);
    res.status(500).json({ mess: error });
  }
});

router.get("/categoryId/:category", async (req, res, next) => {
  try {
    const category = req.params.category;
    const products = await categoryController.getByCategory(category);

    return res.status(200).json(products);
  } catch (error) {
    console.log("Load sản phẩm không thành công", error);
    res.status(500).json({ mess: error });
  }
});

router.get("/name/:categoryName", async (req, res, next) => {
  try {
    const categoryName = req.params.categoryName;

    // Lấy ID của danh mục từ tên danh mục
    const category = await categoryController.getCategoryByName(categoryName);
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }

    // Gọi hàm getByCategory với ID của danh mục
    const products = await categoryController.getByCategory(category._id);

    return res.status(200).json(products);
  } catch (error) {
    console.log("Load sản phẩm không thành công", error);
    res.status(500).json({ message: "Load sản phẩm không thành công", error });
  }
});

// them danh mục mơi

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const result = await categoryController.insert(body);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Thêm danh mục không thành công", error);
    res.status(500).json({ mess: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params; // lấy đượccái id mà người dùng gửi lên
    const pro = await categoryController.getById(id);
    // return pro
    return res.status(200).json(pro);
  } catch (error) {
    console.log("lỗi lay chi tiet sp", error);
    return res.status(500).json({ mess: error });
  }
});

//routing cập nhật sản phẩm theo id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const cateUpdate = await categoryController.updateById(id, body);
    return res.status(200).json({ cateUpdate: cateUpdate });
  } catch (error) {
    console.log("lỗi update danh mục ", error);
    return res.status(500).json({ mess: error });
  }
});

//routing xóa danh mục theo id

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cateDel = await categoryController.deleteCate(id);

    if (cateDel.success) {
      console.log("Xóa danh mục thành công");
      return res.status(200).json(cateDel);
    } else {
      console.log("Không thể xóa danh mục có sản phẩm", cateDel.message);
      return res.status(400).json(cateDel);
    }
  } catch (error) {
    console.log("Lỗi khi xóa danh mục theo ID:", error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi xóa danh mục",
      error: error.message || error,
    }); // Trả về lỗi chi tiết
  }
});

module.exports = router;
