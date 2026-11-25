# HSE PMU COMMAND · LNG — Khung quản trị HSE chủ đầu tư

Ứng dụng tham chiếu và quản trị HSE phía Ban Quản lý dự án LNG, xây dựng theo vòng đời dự án và dữ liệu công khai về LNG Nghi Sơn. **Phiên bản 5.0 · 25/11/2026**.

Đây là khung quản trị đề xuất độc lập, chưa phải hệ thống, quy trình hoặc hồ sơ đã được Trung Nam hay chủ đầu tư phê duyệt. Cần đối chiếu hồ sơ dự án, luật hiện hành, thiết kế, hợp đồng và phân quyền trước khi áp dụng. Không nhập dữ liệu mật vào bản công khai.

## Giao diện V5.0

Mặc định mở chế độ Trình chiếu với dashboard phạm vi hệ thống, sơ đồ khái niệm LNG–điện, vòng đời P0–P5 và nhóm điều hướng nghiệp vụ. Chuyển nút Trình chiếu/Làm việc để mở phần nhập dữ liệu, ghi chú, checklist và theo dõi tiến độ; không xóa dữ liệu hiện có. Tìm nhanh toàn hệ thống qua nút tìm kiếm hoặc phím `/`, Esc để đóng. Có giao diện sáng/tối, toàn màn hình khi trình duyệt hỗ trợ. Số liệu dashboard là số lượng nội dung tham chiếu, không phải dữ liệu thực tế hoặc mức tuân thủ dự án. Sơ đồ chuỗi LNG chỉ là sơ đồ khái niệm.

## Chức năng

- Tổng quan và bản đồ vòng đời P0–P4.
- Vai trò chủ đầu tư: 11 tình huống phân quyền, 7 nội dung thống nhất với Project Director, 4 hồ sơ tham chiếu công khai.
- Kế hoạch triển khai 30–60–90 ngày: đầu vào, hành động, đầu ra và nhịp quản trị.
- Pháp lý theo mốc: 7 nhóm, 16 đánh giá có điều kiện, 36 lượt viện dẫn; phân loại dự án, ĐTM/GPMT, PCCC, xây dựng, LNG, EPC, chạy thử. Kiểm tra lại hiệu lực tại thời điểm thực hiện thủ tục.
- Critical Risk: 44 rủi ro và 132 hàng rào đề xuất, đánh giá tham chiếu 5×5, tiêu chuẩn hiệu suất, control owner, kiểm chứng, STOP/HOLD, điều kiện xem xét tiếp tục và xuất CSV. Điểm giả định không phải kết quả QRA hay chấp thuận hoạt động.
- P5 trong Critical Risk: 16 rủi ro vận hành chuyên sâu (48 controls mới), 24 rủi ro gốc có lưu ý O&M, lọc 5 hệ thống, 40 rủi ro liên quan O&M, KPI và nhịp quản trị ca/ngày/tuần/restart. Không thay đổi P0–P4 của các quy trình BQLDA; cần xác minh cấu hình và thẩm quyền O&M.
- 35 quy trình, 36 nhóm viện dẫn điều khoản, 35 nguồn tham chiếu, 7 mốc quyết định, 12 dòng RACI.
- 10 biểu mẫu CSV và 100 tiêu chí kiểm chứng, yêu cầu bằng chứng khi đánh dấu đạt.
- 50 tình huống quản trị xuyên suốt 5 giai đoạn, hướng xử lý, bằng chứng, escalation và sai lầm cần tránh.
- Thuật ngữ HSE/LNG, sao lưu và khôi phục JSON.

## Sử dụng

Mở `index.html` bằng trình duyệt để chạy offline. Bản trực tuyến: https://kenclark1209-tradewars.github.io/hse-pmu-command-lng/ nếu GitHub Pages đã triển khai nhánh main.

Dữ liệu quản trị lưu cục bộ trong trình duyệt, cùng khóa localStorage phiên bản trước. Xuất JSON để sao lưu. Nhập dữ liệu sẽ thay thế dữ liệu quản trị hiện tại; chỉ nhập dữ liệu tin cậy. Không coi trạng thái tự đánh dấu trong app là xác nhận pháp lý, phê duyệt thiết kế hoặc cấp phép công việc.

## Mã nguồn

- `source/content.json`: dữ liệu nghiệp vụ.
- `source/template.html`: giao diện, CSS và JavaScript.
- `source/build.py`: đóng gói HTML độc lập.
- `source/validate_content.py`: kiểm tra cấu trúc và liên kết dữ liệu.
- `source/test_app.js`: smoke test logic và DOM mô phỏng.

```bash
python source/validate_content.py
python source/build.py
node source/test_app.js
```

Kiểm thử logic không thay thế kiểm thử trình duyệt, kiểm chứng nguồn pháp lý hay thẩm định chuyên môn. Repository công khai: không đưa hồ sơ nội bộ, dữ liệu cá nhân hoặc hồ sơ dự án mật vào đây.
