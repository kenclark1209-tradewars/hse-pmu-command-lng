# Changelog

## v3.0.0 — 2026-11-23

- Ưu tiên hoàn toàn **HSE phía chủ đầu tư** theo xác nhận ứng viên từ nhân sự. Chưa suy đoán pháp nhân dự án, JD, quyền ký và tình trạng lựa chọn nhà đầu tư.
- Mở 4 màn hình: Vai trò chủ đầu tư, Phỏng vấn 27/11, Nhận việc 30–60–90 và Pháp lý theo mốc.
- Bổ sung 11 mô phỏng phân quyền, 7 legal trigger gates, 7 câu cần làm rõ với Project Director, 5 mốc triển khai sau nhận việc và 5 nhịp quản trị.
- Lộ trình phỏng vấn ngày 23–27/11, 24 câu trọng điểm chọn từ 91 câu và 12 mock interviews mức quản lý với câu hỏi xoáy và bằng chứng.
- Cập nhật câu Q090 để **không hỏi lại** điều nhân sự đã xác nhận (owner-side).
- Nâng thư viện lên **28** nguồn, thêm văn bản hợp nhất PCCC 2026 để định hướng đối chiếu.
- Bổ sung lưu bài mock, tiến độ nhận việc và JSON export/import v3 giữ tương thích dữ liệu localStorage v1/v2.
- Thêm brief một trang [`OWNER_HSE_BRIEF_27-11.md`](OWNER_HSE_BRIEF_27-11.md).
- Kiểm thử Node và kiểm tra toàn vẹn dữ liệu; việc render browser Chromium vẫn cần kiểm tra thủ công trên máy người dùng.


## v2.0.0 — 2026-11-23

- Mở rộng tình huống giả định HSE BQLDA từ 8 lên **50**, có lọc theo giai đoạn/độ khó, hướng xử lý, bằng chứng, escalation, bẫy phỏng vấn, nguồn tra cứu và làm lại ca đã thử.
- Nâng phần phỏng vấn từ 10 lên **91 câu** chia 9 chủ đề, câu hỏi xoáy, trả lời gợi ý, sai lầm cần tránh, lưu dàn ý tự viết, tự chấm điểm và lọc câu cần ôn lại.
- Bổ sung **100 tiêu chí kiểm soát chất lượng** cho 10 biểu mẫu CSV. Mỗi tiêu chí có phương pháp review, bằng chứng, critical flag, trạng thái tự rà và xuất checklist CSV.
- Bắt buộc evidence khi đánh dấu Đạt, ghi rõ lý do khi Chưa đạt/Không áp dụng; không dùng trạng thái này làm xác nhận pháp lý thực tế.
- Sao lưu/khôi phục JSON v2 bao gồm interviews + templateChecks; duy trì khóa localStorage v1 để giữ tiến độ đã có.
- Thêm kiểm tra nguồn tham chiếu, tính toàn vẹn dữ liệu và smoke test tương tác.

## v1.0.0 — 2026-11-23

- Bản gốc HTML offline: 35 quy trình, 27 nguồn tra cứu, 10 mẫu CSV, 8 tình huống, 10 câu hỏi phỏng vấn.
