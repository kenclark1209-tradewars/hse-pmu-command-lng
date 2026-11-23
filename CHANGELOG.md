# Changelog

## v2.0.0 — 2026-11-23

- Mở rộng tình huống giả định HSE BQLDA từ 8 lên **50**, có lọc theo giai đoạn/độ khó, hướng xử lý, bằng chứng, escalation, bẫy phỏng vấn, nguồn tra cứu và làm lại ca đã thử.
- Nâng phần phỏng vấn từ 10 lên **91 câu** chia 9 chủ đề, câu hỏi xoáy, trả lời gợi ý, sai lầm cần tránh, lưu dàn ý tự viết, tự chấm điểm và lọc câu cần ôn lại.
- Bổ sung **100 tiêu chí kiểm soát chất lượng** cho 10 biểu mẫu CSV. Mỗi tiêu chí có phương pháp review, bằng chứng, critical flag, trạng thái tự rà và xuất checklist CSV.
- Bắt buộc evidence khi đánh dấu Đạt, ghi rõ lý do khi Chưa đạt/Không áp dụng; không dùng trạng thái này làm xác nhận pháp lý thực tế.
- Sao lưu/khôi phục JSON v2 bao gồm interviews + templateChecks; duy trì khóa localStorage v1 để giữ tiến độ đã có.
- Thêm kiểm tra nguồn tham chiếu, tính toàn vẹn dữ liệu và smoke test tương tác.

## v1.0.0 — 2026-11-23

- Bản gốc HTML offline: 35 quy trình, 27 nguồn tra cứu, 10 mẫu CSV, 8 tình huống, 10 câu hỏi phỏng vấn.
