# HSE PMU COMMAND · LNG (Offline)

**Cẩm nang thực hành dành cho HSE Manager phía Ban Quản lý dự án của chủ đầu tư dự án LNG.** Ứng dụng tiếng Việt chạy ngay bằng trình duyệt, không cần đăng nhập, server hoặc trả phí.

> **Phạm vi và mức độ xác nhận**  
> Đây là ứng dụng **đào tạo/mô phỏng** vai trò HSE phía BQLDA, **không phải** quy trình/phân quyền/JD đã được Trung Nam phê duyệt. Không coi tài liệu là lời khuyên pháp lý cho một dự án thật. Mốc, phạm vi văn bản, điều kiện pháp lý và thẩm quyền phải xác minh theo hồ sơ thiết kế, hợp đồng, văn bản hiện hành và người có thẩm quyền trước khi áp dụng.

## Mở ứng dụng

1. Mở tệp **`index.html`** bằng Chrome hoặc Edge (Windows), hoặc trình duyệt hiện đại khác.
2. Để dùng **offline**, không cần cài thư viện gì. Internet chỉ cần khi mở nguồn văn bản/tiêu chuẩn bên ngoài.
3. Ghi chú và tiến độ được lưu vào bộ nhớ trình duyệt **localStorage** của máy đang dùng. Hãy **xuất JSON dự phòng** trong ứng dụng định kỳ. Đừng dùng cho dữ liệu dự án mật hoặc thông tin cá nhân.

## Các module

| Nhóm | Nội dung |
| --- | --- |
| Quy trình | 35 playbook: đầu vào → cách làm → đầu ra → tiêu chí kiểm chứng → tình huống |
| Nguồn tham khảo | 27 nguồn văn bản pháp lý/quy chuẩn/tiêu chuẩn và lưu ý áp dụng |
| Milestone | 7 cổng kiểm soát quản trị theo giai đoạn dự án |
| Vai trò | Ma trận RACI, giới hạn trách nhiệm BQLDA với EPC |
| Biểu mẫu | 10 mẫu CSV tải về và chỉnh sửa |
| Luyện tập | 8 tình huống, 10 câu hỏi phỏng vấn, 30 thuật ngữ LNG/HSE |

## Phát triển nội dung và giao diện

Mã nguồn biên tập:

- `source/content.json`: dữ liệu nội dung (nguồn dữ liệu chính).
- `source/template.html`: bố cục, CSS và JavaScript giao diện; `__DATA__` là placeholder nội dung.
- `source/build.py`: tạo lại `index.html` từ hai file trên.
- `source/test_app.js`: smoke test cho dữ liệu, điều hướng, bài tập và lưu trạng thái (dùng Node.js).
- `index.html`: bản thành phẩm offline/GitHub Pages.

```bash
python source/build.py
node source/test_app.js
```

`node` chỉ dùng để **kiểm thử khi phát triển**, không bắt buộc để sử dụng ứng dụng.

## Tạo repository mới trên GitHub

1. Truy cập `https://github.com/new` và tạo repository tên **`hse-pmu-command-lng`** trong tài khoản của anh. Khi tạo, **không chọn** thêm README, `.gitignore`, license (bộ này đã có các file cần thiết).
2. **Windows**: Giải nén ZIP vào một thư mục riêng và chạy `publish_to_github.bat`. Cần có Git for Windows và đăng nhập GitHub khi được yêu cầu. Script tạo commit và đẩy `main` lên repository đã tạo; **không force push và không xóa bất kỳ repo nào**.
3. Hoặc vào repository mới trên GitHub, dùng **Add file → Upload files** và kéo thả *nội dung đã giải nén* (cả thư mục `source`), rồi commit.
4. Nếu muốn xem trực tuyến qua **GitHub Pages**: vào **Settings → Pages**, chọn **Deploy from a branch**, nhánh **main**, thư mục **/(root)**. Repository public sẽ giúp trang truy cập công khai; không bật nếu cần giữ riêng tư.

## Pháp lý và chuyên môn

Danh mục trong ứng dụng gồm các nguồn Việt Nam và tham khảo quốc tế phục vụ học tập, như Luật Xây dựng 2025, QCVN 18:2021/BXD, quy định PCCC, môi trường, QCVN 19:2022/BCT, tài liệu IFC về LNG và IOGP quản lý nhà thầu. Danh mục **không xác nhận mọi nguồn đều bắt buộc áp dụng** cho LNG Nghi Sơn. Luôn đối chiếu phiên bản, điều khoản, phạm vi công trình và thời điểm áp dụng.

Không dùng kết quả tự ghi “Đã kiểm chứng” trên app thay quyết định, biên bản hay chữ ký người có thẩm quyền. HAZOP/QRA/PSSR phải do các chuyên gia/đơn vị có năng lực thực hiện và được xem xét/phê duyệt theo phân quyền thực tế.

## Quyền sử dụng và an toàn thông tin

- Không tích hợp analytics, API key, backend hoặc dữ liệu người dùng vào repo.
- Đừng commit dữ liệu dự án thật, biên bản, tài khoản hoặc kết quả xuất từ `localStorage`.
- Repo này **độc lập** với dự án Base44 `HSEManager`.