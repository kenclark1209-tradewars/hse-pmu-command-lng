# HSE PMU COMMAND · LNG — Bản V3

**Webapp offline tiếng Việt để học và thực hành tư duy HSE Manager phía Ban Quản lý dự án (chủ đầu tư) LNG.** Đây là một ứng dụng độc lập, không sử dụng backend, AI API, tài khoản hoặc thư viện bên ngoài.

> **Quan trọng:** Tài liệu này là **mô phỏng/học tập**, không phải JD, phân quyền hoặc quy trình được Trung Nam hay một chủ đầu tư cụ thể ban hành. Không dùng lựa chọn tình huống, kết quả tự chấm hoặc checklist của ứng dụng làm quyết định pháp lý, nghiệm thu hay giấy phép trên công trường thật. Nội dung pháp luật/tiêu chuẩn cần kiểm tra **phiên bản, điều khoản, hiệu lực, phạm vi và quy định chuyển tiếp** trước khi áp dụng.

## Mở ứng dụng

- **Offline:** tải hoặc clone repo, mở `index.html` bằng Chrome/Edge. Không cần cài đặt.
- **Online:** nếu chủ repo bật GitHub Pages, sử dụng đường dẫn Pages tương ứng (chưa tự động bật bởi mã nguồn).
- **Sao lưu:** ở góc trên, chọn `Xuất tiến độ` để lưu JSON chứa tiến độ, bài phỏng vấn và đánh giá biểu mẫu; `Nhập dữ liệu` để phục hồi trên thiết bị khác. Dữ liệu mặc định lưu **localStorage của trình duyệt đang dùng**. Không đưa bí mật công ty hoặc dữ liệu cá nhân vào ứng dụng/repo công khai.

## Tính năng

| Phần | Mô tả |
| --- | --- |
| Vai trò chủ đầu tư (mới v3) | Đã xác nhận tuyển phía chủ đầu tư; giải thích rõ dữ kiện chưa xác minh, 5 ưu tiên và 11 tình huống phân quyền owner–EPC–Legal–Engineering–Operations. |
| Phỏng vấn 27/11 (mới v3) | Lộ trình 4 ngày, 24 câu trọng điểm, 12 phiên phỏng vấn mô phỏng cấp giám đốc/HR, mẫu trả lời, câu hỏi xoáy, bằng chứng cần dùng và tự chấm. |
| Nhận việc 30–60–90 (mới v3) | Kế hoạch 5 ngày đầu, 5 mốc triển khai, deliverables, nhóm phối hợp, quyết định trình PM và nhịp quản trị tuần/tháng; lưu bằng chứng. |
| Pháp lý theo mốc (mới v3) | 7 nhóm nghĩa vụ theo điều kiện kích hoạt, văn bản/nguồn chính thức, owner và bằng chứng cần xác minh; không mặc định mọi nghĩa vụ đều áp dụng. |
| Playbooks | 35 quy trình 5 giai đoạn, 28 nguồn pháp luật/tiêu chuẩn để tra cứu, đầu vào → cách làm → đầu ra → tiêu chí kiểm chứng → cảnh báo |
| Tình huống | **50 ca** giả định sát BQLDA: tiền đầu tư, FEED/đấu thầu, giám sát nhiều EPC, thi công, first gas, ESD, môi trường, khủng hoảng, bàn giao O&M. Mỗi ca có đáp án, **các bước xử lý**, **bằng chứng**, **khi cần escalation**, bẫy phỏng vấn và nguồn liên quan. Có tìm kiếm/lọc/làm lại. |
| Luyện phỏng vấn | **91 câu hỏi** trong **9 chủ đề**, gồm góc nhìn nhà tuyển dụng, trả lời mẫu theo tư duy quản trị, câu hỏi xoáy, sai lầm, nguồn tham chiếu và playbook liên quan. Viết câu trả lời thật, tự chấm 4 tiêu chí + điểm 1–5, lọc câu cần ôn và luyện ngẫu nhiên. |
| Biểu mẫu | **10 mẫu CSV** và **100 tiêu chí review chi tiết**: cách kiểm, bằng chứng mong đợi, trọng yếu/thông thường, trạng thái Đạt/Chưa đạt/N/A/Chưa kiểm; xuất **checklist CSV**. |
| Tiến độ | Giữ nguyên `hse_owner_pmu_playbook_v1` để bảo toàn tiến độ bản trước; bản xuất JSON dùng phiên bản 3 và nhập được dữ liệu phiên bản 2/cũ. |

### Cách học trước phỏng vấn

1. Vào **Phỏng vấn 27/11**, chọn các mốc 23, 24, 25, 26/11. Tự trả lời 12 mock cấp quản lý và 24 câu trọng điểm; chỉ mở gợi ý sau khi nói thành tiếng.
2. Vào **Vai trò chủ đầu tư**, học 11 tình huống phân quyền trước khi luyện bất kỳ câu hỏi HSE EPC nào.
3. Vào **Nhận việc 30–60–90**, lấy riêng 5 ngày đầu làm khung trả lời “anh làm gì từ hôm đầu tiên?”.
4. Vào **Pháp lý theo mốc**, học trigger/owner/evidence với từng luật/tiêu chuẩn, đặc biệt ĐTM/GPMT, PCCC, NĐ 207 và QCVN 19 cho kho LNG trên bờ.
5. Vào **Quy trình**, đọc `P0-01`, `P0-03`, `P0-04`, `P0-05`, `P0-10` và `P1-01` để hiểu pháp nhân, legal matrix, EIA/PCCC, LNG và Employer HSE Requirements.
6. Vào **Tình huống**, lọc `P0` và `P1` trước, tự chọn phương án rồi đọc kỹ phần *việc phải tổ chức*, *bằng chứng* và *escalation*. Sau đó luyện `P2–P4`.
7. Vào **Luyện phỏng vấn**: ẩn đáp án, nói thành tiếng 60–120 giây, ghi dàn ý của chính anh, tự chấm, rồi mới bật đáp án và tự phản biện câu hỏi xoáy.
8. Vào **Biểu mẫu**, tải mẫu `Legal / Permit Register`, mở 10 tiêu chí review và ghi bằng chứng; học cách nhận ra hồ sơ chưa đạt, đừng chỉ đánh dấu checkbox.
9. Xuất JSON sau mỗi buổi học để dự phòng. Không nhập dữ liệu dự án mật lên một trang web công khai.

## Cách dùng phần checklist biểu mẫu

- `Chưa kiểm`: chưa có kết luận.
- `Đạt`: **bắt buộc có mã/link bằng chứng** (ứng dụng không tự xác minh tính hợp lệ của bằng chứng).
- `Chưa đạt`: phải ghi lý do và hướng khắc phục.
- `Không áp dụng`: phải có lý do, không được dùng để lách việc phải kiểm.
- App chỉ báo *đã tự rà đủ* nếu không còn mục chưa kiểm/chưa đạt và mọi mục đạt/N/A có chứng cứ/lý do; **không đồng nghĩa được phép phê duyệt hoặc đưa hệ thống vào sử dụng**.
- Tải `Checklist CSV` để in/nhập vào Excel; bản CSV có cả cột cách kiểm và bằng chứng mong đợi.

## Mã nguồn và kiểm thử

- `source/content.json`: nội dung cấu trúc; đây là nguồn dữ liệu chính, không sửa trực tiếp nội dung trong `index.html`.
- `source/template.html`: giao diện, CSS, JavaScript, có một placeholder `__DATA__`.
- `source/build.py`: tạo `index.html` từ JSON + template.
- `source/validate_content.py`: kiểm tra ID, tham chiếu pháp lý, logic tình huống và độ đầy đủ.
- `source/test_app.js`: test render logic, tương tác tình huống, form checklist, phỏng vấn, lưu trạng thái và các luồng cũ.

```bash
python source/validate_content.py
python source/build.py
node source/test_app.js
```

Script không thay thế kiểm thử thực tế trên Chrome/Edge và điện thoại. **Không xác nhận nội dung là tư vấn pháp lý**, và không đảm bảo kết quả thực tế chỉ từ các test tĩnh.

## Cách đọc trách nhiệm HSE phía BQLDA

- **BQLDA/chủ đầu tư:** đặt yêu cầu, giám sát, đánh giá hiệu lực thực hiện, điều phối giao diện và quản trị các rủi ro cấp dự án theo phân quyền.
- **EPC/nhà thầu:** tổ chức thực thi công việc an toàn, quản lý nhân lực, công việc, thầu phụ và biện pháp thi công trong phạm vi hợp đồng.
- **Technical Authority/Design/Operations:** các kết luận chuyên ngành về thiết kế, an toàn quy trình, thiết bị, PSSR/first gas theo năng lực và phân quyền; HSE không tự ký thay.
- **Legal/Environmental/PCCC:** kiểm tra thủ tục, điều kiện, chủ thể nghĩa vụ và thẩm quyền theo hồ sơ thực tế; app không tự cấp giấy phép.

Cơ sở tham khảo nổi bật: [Nghị định 207/2026/NĐ-CP – Điều 16 (trách nhiệm chủ đầu tư)](https://vanban.org/van-ban/nghi-dinh-207-2026-nd-cp-luat-xay-dung-quan-ly-chat-luong-thi-cong-xay-dung/dieu-16), [QCVN 19:2022/BCT](https://tieuchuanxaydung.vsqi.gov.vn/quychuan/view?sohieu=QCVN+19%3A2022%2FBCT), [IOGP Report 423](https://idms.iogp.org/Documents/485), [hướng dẫn PCCC của Cục Cảnh sát PCCC](https://canhsatpccc.gov.vn/vi/news/nghien-cuu-trao-doi/huong-dan-thuc-hien-tham-dinh-thiet-ke-kiem-tra-cong-tac-nghiem-thu-ve-phong-chay-va-chua-chay-doi-voi-du-an-dau-tu-xay-dung-cong-trinh-cong-trinh-4742). Đây chỉ là nguồn tham khảo ban đầu, không thay rà soát hồ sơ thực tế và nguồn chính thức khi áp dụng.

## Bản tóm tắt ôn tập phỏng vấn

Xem [`OWNER_HSE_BRIEF_27-11.md`](OWNER_HSE_BRIEF_27-11.md). Tóm tắt phạm vi công việc owner-side, đầu ra 5 ngày đầu, 12 câu trọng điểm và ví dụ báo cáo giám đốc. Các ghi chú về tình trạng tuyển dụng là thông tin ứng viên cung cấp, chưa phải JD/hồ sơ dự án được Trung Nam công bố.

**Riêng tư:** Repository hiện đặt public. Nội dung học tập giả định có nhắc tới thời điểm phỏng vấn và bối cảnh kinh nghiệm ứng viên; nếu không muốn công khai, đổi repository sang private trong Settings của GitHub trước khi tiếp tục chia sẻ. Không commit CV, hợp đồng lao động, email tuyển dụng, bằng chứng dự án hay dữ liệu bảo mật.
