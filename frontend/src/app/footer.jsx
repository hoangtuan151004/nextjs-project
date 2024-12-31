import Link from "next/link";

export default function Footer() {
    return (
      <>
      <div className="footer">
        <div className="footer-static-middle">
            <div className="footer-logo-wrap pt-50 pb-35">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="footer-logo">
                    <img src="images/2.png"
                      alt="Footer Logo"/>
                  </div>
                  <ul className="des">
                    <li>
                      Địa chỉ:
                      Công viên phần mềm Quang Trung, Quận
                      12, TP Hồ Chí Minh
                    </li>
                    <li>
                      Số điện thoại:(+123) 123 321 345
                    </li>
                    <li>
                      Email: jodd23855@gmail.com
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6">
                  <div className="footer-block">
                    <h3 className="footer-block-title">Thông
                      tin</h3>
                    <ul>
                      <li><a href="#">Giới thiệu</a></li>
                      <li><a href="#">Liên hệ công
                          ty</a></li>
                      <li><a href="#">Liên hệ hợp
                          tác</a></li>
                      <li><a href="#">Gia nhập
                          TOTODAY</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6">
                  <div className="footer-block">
                    <h3 className="footer-block-title">Chính
                      sách</h3>
                    <ul>
                      <li><a href="#">Chính sách thành
                          viên</a></li>
                      <li><a href="#">Chính sách hoàn
                          tiền</a></li>
                      <li><a href="#">Chính sách sản
                          phẩm</a></li>
                      <li><a href="#">Chính sách kiểm
                          hàng</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="footer-block">
                    <h3 className="footer-block-title">Chính
                      sách</h3>
                    <ul>
                      <li><a href="#">Chính sách thành
                          viên</a></li>
                      <li><a href="#">Chính sách hoàn
                          tiền</a></li>
                      <li><a href="#">Chính sách sản
                          phẩm</a></li>
                      <li><a href="#">Chính sách kiểm
                          hàng</a></li>
                    </ul>

                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
    );
  }
  