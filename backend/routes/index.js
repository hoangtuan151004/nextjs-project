var express = require("express");
var router = express.Router();
const productController = require("../mongo/product.controller");

// show sản phẩm ở trang chủ
router.get("/", async (req, res, next) => {
  try {
    const product = await productController.gettAll();
    return res.status(200).json(product);
  } catch (error) {
    console.log("Load sản phẩm không thành công", error);
    res.status(500).json({ mess: error });
  }
});

module.exports = router;
