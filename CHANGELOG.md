# Changelog

## Critical Risk Management — 2026-11-25

- Thêm menu Critical Risk: 28 rủi ro, 84 critical controls, nhận diện top event và hậu quả, điểm 5×5 minh họa, owner/assurance, stop/hold, link playbook và nguồn.
- Thêm lọc, tự đánh giá và bằng chứng, khóa điểm residual khi critical control chưa được tự kiểm đạt, xuất CSV; lưu/nhập/xuất JSON tiến độ tương thích v3.
- Giữ nguyên toàn bộ module và khóa localStorage cũ. Nội dung là mô phỏng, không chấp thuận hoạt động thực tế.

## Bổ sung pháp lý theo dự án — 2026-11-25

- Thêm bối cảnh phương án LNG Nghi Sơn vị trí mới và đánh giá theo 7 nhóm legal gates; các kết luận chưa đủ hồ sơ được ghi rõ có điều kiện.
- Cập nhật phân quyền ĐTM/GPMT theo NQ 66.19 có thời hạn, phân cấp công trình TT34, thẩm định/ nghiệm thu PCCC theo sửa đổi 2026; trình bày điều khoản, diễn giải, thẩm quyền, mốc, hồ sơ.
- Giữ nguyên localStorage và các luồng trước; thêm kiểm tra dữ liệu và smoke test cho đánh giá mới.

## v4.0.0 — 2026-11-23

- Tích hợp 4 nguồn tham chiếu Trung Nam với mốc thời gian, URL, và suy luận có điều kiện cho HSE chủ đầu tư (không phải JD LNG Nghi Sơn).
- Bổ sung **ví dụ giả định riêng cho cả 91 câu phỏng vấn** và **12 phiên mock** (quyết định, đầu mối kỹ thuật, escalation, bằng chứng).
- Gắn **36 nhóm trích dẫn điều/khoản/mục cụ thể** vào **35 quy trình** ở mục ⑥, kèm ý chính, điều kiện áp dụng và minh chứng cần kiểm tra.
- Chú thích phân biệt quy định luật bắt buộc với thông lệ dự án/các tài liệu IFC–IOGP và hạn chế phạm vi QCVN 19 cho kho LNG trên bờ.
- Duy trì khóa localStorage v1, giữ dữ liệu cũ, bố cục/luồng bài luyện v3.
- Kiểm thử dữ liệu cấu trúc, cú pháp JS và mock DOM cho vai trò owner, legal refs, case interview, mock drill, checklist.



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