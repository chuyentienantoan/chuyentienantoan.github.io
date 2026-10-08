# Website cẩm nang an toàn thanh toán số — PA05 Hà Tĩnh

Website tĩnh, một trang, HTML5 + CSS3 và JavaScript thuần cho chức năng hỗ trợ. Không cần cài thư viện, không cần bước biên dịch, không có quảng cáo hay công cụ theo dõi.

## Xem thử

Mở `index.html` bằng trình duyệt. Mọi ảnh, cẩm nang và tệp tải đều nằm trong thư mục `assets`. Trang cũng hoạt động khi tắt JavaScript; nút lọc, tăng chữ và trình xem ảnh cần JavaScript.

## Đưa lên GitHub Pages

1. Tạo hoặc chọn repository dùng cho website. Với GitHub Free, sử dụng repository public.
2. Đưa **nội dung bên trong thư mục này** lên repository: `index.html`, `assets/`, `.nojekyll`, `README.md`. Đặt `index.html` ngay ở thư mục gốc, không thêm một lớp thư mục bao ngoài. Giữ nguyên đường dẫn và tên tệp.
3. Vào **Settings → Pages → Build and deployment**. Chọn **Source: Deploy from a branch**, branch **main**, thư mục **/(root)**, rồi **Save**.
4. Sau khi GitHub hoàn tất triển khai, mở **Visit site** tại trang Pages. Website dự án thường có địa chỉ `https://TEN-TAI-KHOAN.github.io/TEN-REPOSITORY/`.

Nếu dùng repository có nội dung sẵn, có thể đặt bộ website trong thư mục `docs/` rồi chọn `main` và `/docs` ở bước 3. Không đưa tệp ZIP lên để thay cho các tệp website đã giải nén.

[Hướng dẫn chính thức GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Nội dung và sử dụng

- 7 nhóm thủ đoạn, 10 áp phích số 1, 2, 3, 4, 6, 7, 8, 9, 15, 16 và cẩm nang 10 trang.
- Ảnh và PDF lấy từ bản watermark 2% đã có; không chèn thêm watermark lần nữa. Cả 10 áp phích xem trên trang dùng bố cục A3, bản xem WebP rộng 1.800 px, nén chất lượng cao để tải nhanh. Cẩm nang giữ độ rộng 1.080 px và được nén nhẹ. PNG A3 và PDF tải về giữ nguyên dung lượng, độ phân giải và dữ liệu của bản gốc.
- Trình xem lưu tạm tối đa 3 ảnh gần nhất và tải trước một trang tiếp theo khi rảnh để vuốt nhanh hơn. Không tải trước tệp download; không tải cả bộ ảnh cùng lúc. Chế độ tiết kiệm dữ liệu/mạng 2G tắt việc tải trước.
- Trên điện thoại, logo hiện ở đầu trang cả khi dùng chữ lớn. Khi cuộn xuống, phần tên đơn vị tự ẩn để thanh đầu trang gọn còn khoảng 59 px; về đầu trang sẽ hiện lại. Hai câu tiêu đề chính nằm trên hai dòng, mỗi câu một dòng.
- Thanh điều hướng đánh dấu mục đang xem; Cẩm nang, Áp phích và Tài liệu là 3 mục trên cùng trang. Liên kết chữ có gạch chân, nút bấm có nền/viền rõ, mục mở rộng có nhãn Mở xem/Thu gọn.
- Popup có tên riêng của mỗi trang cẩm nang, số trang rõ và thanh tiến độ. Liên kết áp phích trong cẩm nang mở ảnh trực tiếp.
- Mưa tiền phủ màn hình đầu trong 3 giây: 36 tờ trên điện thoại, 68 tờ trên máy tính, rơi thành 3 đợt, xoay và chao nhẹ, kích thước và tốc độ khác nhau. Không có nút xem lại. Nếu mở ở tab nền, hiệu ứng chờ tab hiển thị; vẫn tôn trọng chế độ giảm chuyển động.
- Font Noto Sans hỗ trợ tiếng Việt được nhúng sẵn trong `assets/fonts`, kèm giấy phép OFL. Không tải font từ dịch vụ bên ngoài khi xem trang. [Nguồn font chính thức](https://github.com/google/fonts/tree/main/ofl/notosans).
- Khi mở tài liệu, toàn bộ trang tự vừa khung theo cả chiều cao và chiều rộng, không cần cuộn. Chế độ phóng to mới cần cuộn để đọc chi tiết; chọn **Vừa màn hình** để trở lại.
- Popup có tiêu đề gọn một dòng. Trên điện thoại, các nút chuyển trang, phóng to và tải nằm ở thanh dưới; trên màn hình rộng, các nút gộp vào một thanh trên để dành thêm chỗ cho tài liệu.
- Bìa cẩm nang nghiêng nhẹ và nâng lên khi rê chuột. Mưa tiền dùng SVG minh họa, CSS transform/opacity, không chặn nút hay liên kết và được dọn sau 3 giây. Không lặp khi cuộn hoặc mở tài liệu. Hiệu ứng tự tắt khi cuộn khỏi màn hình đầu, bật giảm chuyển động, xoay màn hình hoặc chuyển sang tab khác.
- Nút **A+ Chữ lớn** tăng chữ nội dung website. Với chữ trong ảnh, chọn **Mở xem → Phóng to**.
- Tìm kiếm chấp nhận tiếng Việt có hoặc không dấu. Bộ lọc có thể kết hợp với tìm kiếm; xóa tìm kiếm sẽ đưa về tất cả áp phích.
- Nhấn Esc hoặc Đóng để thoát trình xem; dùng Trước/Sau hoặc phím mũi tên để chuyển trang.
- Trên điện thoại, vuốt trái để sang trang sau, vuốt phải để về trang trước. Có hiệu ứng lật nhẹ khoảng 0,32 giây; thiết bị bật giảm chuyển động sẽ chuyển trang trực tiếp. Khi phóng to, vuốt dùng để di chuyển ảnh, không lật trang. Trang đầu/cuối không tự vòng lại. Nếu mạng chậm, ảnh hiện tại vẫn được giữ trong lúc tải trang mới.
- Nội dung nguồn tham khảo chỉ gồm Bộ Công an, đơn vị thuộc Bộ Công an và Ngân hàng Nhà nước.
- Logo vector trong `assets/brand-logo.svg` kết hợp khiên bảo vệ, thẻ thanh toán, dấu tích xác nhận và các nút kết nối số. Bảng màu xanh navy, xanh ngọc và điểm nhấn vàng; nền trong suốt, không phụ thuộc font. Favicon dùng cùng biểu tượng. Đây là nhận diện minh họa cho website tuyên truyền, không phải huy hiệu chính thức.
- Website không ngăn sao chép. Khi chia sẻ, giữ nguyên nội dung, nguồn và watermark.

## Cấu trúc

`index.html`: nội dung trang, danh sách ảnh. `assets/css/styles.css`: giao diện responsive. `assets/js/app.js`: tăng chữ, lọc và xem ảnh. `assets/images`: ảnh hiển thị. `assets/downloads`: PDF và PNG tải về.

Mọi đường dẫn nội bộ đều tương đối, hỗ trợ GitHub Pages tại tên miền gốc hoặc đường dẫn repository. Các tài liệu nằm cùng website nên không phụ thuộc dịch vụ lưu trữ bên ngoài.
