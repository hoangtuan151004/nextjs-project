import { createSlice } from "@reduxjs/toolkit";
// import hàm tạo slice , import vô hàm CreateSlice từ thư viện redux toolkit
// Khai báo 1 sice với tên là counterslice, có cái counter này có 3 thành phần
// name là tên của slice, init là trá trị ban đầu của state là 0
// các reducer sẽ thay đổi state, là các acction
const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    //acction tăng lên giá trị 1 đơn vị của state
    increment: (state) => state + 1,
    //acction giảm lên giá trị 1 đơn vị của state
    decrement: (state) => state - 1,
  },
});

export const { increment, decrement } = counterSlice.actions; // cuối cùng là xuất ra 2 acction để sử dụng
export default counterSlice.reducer;
