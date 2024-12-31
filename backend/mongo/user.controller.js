const userModel = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("nodemailer");
const getConstants = require("../helper/constants");

module.exports = {
  gettAll,
  updateById,
  remove,
  register,
  login,
  DetailUser,
  Mailer,
};

async function register(body) {
  try {
    const { email, pass, role } = body;
    let user = await userModel.findOne({ email: email });
    if (user) {
      throw new Error("Email đã tồn tại");
    }

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pass, salt);

    // Tạo mới người dùng
    user = new userModel({ email, pass: hash, role: role || 0 });

    const result = await user.save();
    return result;
  } catch (error) {
    console.log("Lỗi đăng ký:", error);
    throw error;
  }
}

async function gettAll() {
  try {
    const result = await userModel.find();
    return result;
  } catch (error) {
    console.log("Lỗi lấy danh sách user", error);
    throw error;
  }
}

async function updateById(id, body) {
  try {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("Không tìm thấy danh mục");
    }
    const { name, email, pass, phone, role } = body;
    const result = await userModel.findByIdAndUpdate(id, {
      name,
      email,
      pass,
      phone,
      role,
    });
    return result;
  } catch (error) {
    console.log("lỗi update", error);
    throw error;
  }
}

// xóa danh mục theo id
async function remove(id) {
  try {
    const result = await userModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log("LỖI XÓA USER THEO ID", error);
    throw error;
  }
}

async function login(body) {
  try {
    const { email, pass } = body;

    // Tìm người dùng trong cơ sở dữ liệu
    let user = await userModel.findOne({ email: email });
    if (!user) {
      throw new Error("Email không tồn tại");
    }

    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    if (!isPasswordValid) {
      throw new Error("Mật khẩu không chính xác");
    }

    delete user._doc.pass;

    const accessToken = jwt.sign(
      { _id: user._id, email: user.email, name: user.name, role: user.role },
      "access_token_secret",
      { expiresIn: "1m" }
    );

    const refreshToken = jwt.sign(
      { _id: user._id, email: user.email, name: user.name, role: user.role },
      "refresh_token_secret",
      { expiresIn: "1h" }
    );

    return { user: user, accessToken: accessToken, refreshToken: refreshToken };
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    throw error;
  }
}

async function DetailUser(email, name) {
  try {
    const user = await userModel.findOne({ email: email, name: name });
    if (!user) {
      throw new Error("Không tìm thấy user");
    }
    return user;
  } catch (error) {
    throw error;
  }
}

async function Mailer() {
  try {
    const transporter = mailer.createTransport({
      pool: true,
      host: "smtp.gmail.com",
      port: 456,
      secure: true,
      auth: {
        user: getConstants().MAIL,
        pass: getConstants().APP_PASSWORD,
      },
    });
    return transporter;
  } catch (error) {
    throw error;
  }
}

async function forgotPass(email) {
  const token = await userModel.forgotPass(email);
  if (token) {
    const mailOptions = {
      from: getConstants().MAIL, // gửi từ mail nào
      to: email,
      subject: "Reset password",
      html: "<a></a>",
    };
  }
}
