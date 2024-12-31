// Import các hàm cần thiết từ "@reduxjs/toolkit"
import { createSlice, payLoadAction } from "@reduxjs/toolkit";

// Khởi tạo state ban đầu của giỏ hàng
const initialState = {
  items: [], // Mảng lưu trữ các mặt hàng trong giỏ hàng
};

// Tạo một slice cho giỏ hàng với tên là "cart"
const cartSlice = createSlice({
  name: "cart", // Tên của slice
  initialState, // Trạng thái ban đầu của slice
  reducers: {
    // Các reducer để quản lý các hành động trên giỏ hàng
    // Hàm thêm vào giỏ hàng
    addToCart: (state, action) => {
      // Kiểm tra xem mặt hàng đã tồn tại trong giỏ hàng chưa
      const existingItem = state.items.find(
        (item) => item._id === action.payload.item._id
      );

      // Nếu mặt hàng đã tồn tại, cập nhật số lượng
      if (existingItem) {
        existingItem.quantity =
          Number(existingItem.quantity) + Number(action.payload.quantity);
      } else {
        // Nếu mặt hàng chưa tồn tại, thêm mặt hàng vào giỏ hàng
        state.items.push({
          ...action.payload.item,
          quantity: action.payload.quantity,
        });
      }
    },
    // Hàm xóa mặt hàng khỏi giỏ hàng
    removeFromCart: (state, action) => {
      // Lọc bỏ mặt hàng có _id trùng với _id của action.payload
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    // Hàm cập nhật số lượng của một mặt hàng trong giỏ hàng
    updateCartItemQuantity: (state, action) => {
      // Tìm mặt hàng cần cập nhật
      const item = state.items.find((item) => item._id === action.payload._id);

      // Nếu tìm thấy mặt hàng, cập nhật số lượng
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    // Hàm xóa toàn bộ mặt hàng trong giỏ hàng
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Xuất các hàm actions để sử dụng ở nơi khác
export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
  cartSlice.actions;

// Xuất slice để sử dụng trong store
export default cartSlice;
