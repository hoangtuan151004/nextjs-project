// store dùng để lưu trữ toàn bộ trạng thái của ứng dụng, để có thể quản lý, dễ dàng chia sẻ

import { configureStore } from "@reduxjs/toolkit"; // cấu hình store từ thư viện
import cartSlice from "./slices/cartslide"; // import cartSlide nhúng, định nghĩa

export const store = configureStore({
  //lưu slice tên là cart vào store, lúc này chỉ là nhúng thôi, bây giờ là mình đặt tên cho nó
  reducer: {
    cart: cartSlice.reducer,
  },
});
