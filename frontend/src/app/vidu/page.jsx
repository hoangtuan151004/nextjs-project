"use client"; // Optional directive
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object({
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      "Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một số"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

export default function FormWithYup() {
  const [formValues, setFormValues] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setFormValues(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
      </div>
      <div>
        <label>Mật khẩu:</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
      </div>
      <div>
        <label>Xác nhận mật khẩu:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
        {formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null}
      </div>
      <button type="submit">Đăng nhập</button>
      {formValues && (
        <div>
          <h2>Form Values</h2>
          <pre>{JSON.stringify(formValues, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}

// "use client";

// import { useState } from "react";

// export default function FormExample() {
//   const [inputValue, setInputValue] = useState("");
//   const [isFocused, setIsFocused] = useState("");
//   // Đùng để bắt lỗi form
//   return (
//     <form>
//       <label>
//         Input:
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onFocus={() => setIsFocused("Đang focus")}
//           onBlur={() => setIsFocused("Đang blur")}
//         />
//       </label>
//       <h1>{isFocused}</h1>
//     </form>
//   );
// }

// "use client";
// import { useDispatch, useSelector } from "react-redux";
// import { increment, decrement } from "../redux/slices/counterslice";

// export default function Counter() {
//   const dispatch = useDispatch();
//   const count = useSelector((state) => state.counter);

//   return (
//     <div>
//       <h1>Counter: {count}</h1>
//       <button onClick={() => dispatch(increment())}>Increment</button>
//       <button onClick={() => dispatch(decrement())}>Decrement</button>
//     </div>
//   );
// }

// import React, { useState } from "react";
// export default function Counter() {
//   const [like, setLike] = useState("Thích");
//   const changeLike = () => {
//     if (like == "Thích") {
//       setLike("Đã thích");
//     } else {
//       setLike("Thích");
//     }
//   };
//   return (
//     <div>
//       <button onClick={changeLike}>{like}</button>
//     </div>
//   );

//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((responseData) => setData(responseData));
//   }, []);

//   return (
//     <div>
//       {data.map((item) => (
//         <li key={item.id}>{item.name}</li>
//       ))}
//     </div>
//   );
