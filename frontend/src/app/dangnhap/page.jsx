"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      pass: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await fetch("http://localhost:3000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Đăng nhập thất bại");
        }

        const data = await res.json();
        console.log(data);

        const token = data.accessToken;

        if (!token) {
          throw new Error("Token không tồn tại trong phản hồi");
        }

        // Lưu token vào cookie
        document.cookie = `token=${token}; path=/; max-age=${60 * 60}`;
        // Chuyển trang theo role
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role === 1) {
          window.location.href = "http://localhost:3002/sanpham";
        } else {
          window.location.href = "/taikhoan";
          alert("Đăng nhập thành công");
        }
      } catch (error) {
        setFieldError("general", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="container">
        <div className="box">
          <div className="login-box">
            <div className="login-auth__login">
              <div className="login-title">Đăng Nhập</div>
            </div>
            <form className="login-form" onSubmit={formik.handleSubmit}>
              <input
                placeholder="Email"
                type="email"
                className="form-control"
                {...formik.getFieldProps("email")}
              />
              <br />
              <input
                placeholder="Mật khẩu"
                type="password"
                className="form-control"
                {...formik.getFieldProps("pass")}
              />
              <br />
              <div className="login-button">
                <button
                  className="btn-cart-right"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Đăng Nhập
                </button>
              </div>
              {formik.errors.general && (
                <p className="my-3 text-danger">{formik.errors.general}</p>
              )}
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
              {formik.touched.pass && formik.errors.pass ? (
                <div className="text-danger">{formik.errors.pass}</div>
              ) : null}
            </form>
            <p>
              Chưa có tài khoản đăng ký <a href="/dangky">tại đây</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
