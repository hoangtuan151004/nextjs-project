var express = require("express");
var router = express.Router();
const usersController = require("../mongo/user.controller");
const checktoken = require("../helper/checktoken");
const jwt = require("jsonwebtoken"); // Import thư viện jsonwebtoken

router.get("/", async (req, res) => {
  try {
    const users = await usersController.gettAll();
    return res.status(200).json(users);
  } catch (error) {
    console.log("Load user không thành công", error);
    res.status(500).json({ mess: error });
  }
});

// Đăng ký
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const result = await usersController.register(body);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Thêm user không thành công", error);
    res.status(500).json({ mess: error });
  }
});

//Đăng nhập
router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const result = await usersController.login(body);
    return res.status(200).json(result);
  } catch (error) {
    console.log("lỗi đăng nhập", error);
    return res.status(500).json(error);
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new Error("Refresh token không tồn tại");
    }

    // Xác thực refreshToken
    jwt.verify(refreshToken, "refresh_token_secret", (error, decoded) => {
      if (error) {
        throw new Error("Refresh token không hợp lệ");
      } else {
        // Tạo accessToken mới
        const user = decoded;
        const accessToken = jwt.sign(
          { _id: user._id, email: user.email, role: user.role },
          "access_token_secret",
          { expiresIn: "1m" }
        );

        // Trả về accessToken mới
        return res
          .status(200)
          .json({ user, accessToken: accessToken, refreshToken: refreshToken });
      }
    });
  } catch (error) {
    console.log("Lỗi refresh token:", error);
    return res.status(500).json({ mess: error.message });
  }
});

router.get("/checktoken", async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "access_token_secret", (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }
    res.status(200).json({ message: "Token hợp lệ" });
  });
});

//lấy thông tin chi tiết user qua token
router.get("/detailuser", async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Không có token" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, "access_token_secret", async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Token không hợp lệ" });
      }

      try {
        const userInfo = await usersController.DetailUser(decodedToken.email);
        res.status(200).json(userInfo);
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

router.get("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const result = await usersController.forgotPass(email);
    res.status(200).json({ status: result });
  } catch (error) {
    console.log(error);
    res.status(414).json({ erro: error.message });
  }
});

module.exports = router;
