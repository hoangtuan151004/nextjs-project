"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register() {
  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
      repass: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("vui lòng nhập email"),
      pass: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số"
        )
        .required("Vui lòng nhập mật khẩu"),
      repass: Yup.string()
        .oneOf([Yup.ref("pass"), null], "Mật khẩu không khớp")
        .required("Vui lòng nhập lại mật khẩu"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            pass: values.pass,
          }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          if (res.status === 400 && errorData.message === "Email đã tồn tại") {
            setFieldError("email", "Email đã tồn tại");
          } else {
            throw new Error(errorData.message || "Đăng ký thất bại");
          }
        }
        // Xử lý thành công
        window.location.href = "/dangnhap";
        alert("Đăng ký thành công");
      } catch (error) {
        setFieldError("general", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      <div class="container">
        <div class="box">
          <div class="login-box">
            <div class="login-auth__login">
              <div class="login-title">ĐĂNG KÝ</div>
            </div>
            <form class="login-form" onSubmit={formik.handleSubmit}>
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
              <input
                placeholder="Nhập lại mật khẩu"
                type="password"
                className="form-control"
                {...formik.getFieldProps("repass")}
              />

              <div class="login-button">
                <button
                  class="btn-cart-right"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Đăng ký
                </button>
              </div>
              {formik.touched.repass && formik.errors.repass ? (
                <div className="text-danger">{formik.errors.repass}</div>
              ) : null}
              {formik.touched.pass && formik.errors.pass ? (
                <div className="text-danger">{formik.errors.pass}</div>
              ) : null}
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
              {formik.errors.general && (
                <p className="my-3 text-danger">{formik.errors.general}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
