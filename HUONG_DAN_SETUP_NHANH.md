# ✅ Hướng dẫn Setup Nhanh - Lưu Lời Chúc vào Google Sheets

Tôi đã tự động setup một số bước cho bạn rồi! Chỉ cần làm theo các bước sau:

## ✨ Những gì đã được setup tự động:

1. ✅ File `.env.local` đã có sẵn thông tin Service Account
2. ✅ `.gitignore` đã được update để không commit file nhạy cảm
3. ✅ API endpoint `/api/submit-wish` đã sẵn sàng
4. ✅ Form gửi lời chúc đã được kết nối với API

## 📋 Bạn chỉ cần làm 3 bước:

### Bước 1: Tạo Google Sheet (2 phút)

1. Truy cập: https://sheets.google.com
2. Tạo sheet mới (File > New > Spreadsheet)
3. Đặt tên: "Wedding Wishes" (hoặc tên bất kỳ)
4. Thêm header vào dòng 1:
   - Cell A1: `Thời gian`
   - Cell B1: `Họ và Tên`
   - Cell C1: `Lời Chúc`

### Bước 2: Share Sheet với Service Account (1 phút)

1. Click nút **Share** (góc phải trên)
2. Paste email này vào:
   ```
   we-515@feisty-legend-419703.iam.gserviceaccount.com
   ```
3. Chọn quyền: **Editor**
4. **BỎ TICK** ô "Notify people"
5. Click **Share**

### Bước 3: Copy Sheet ID và cập nhật (1 phút)

1. Nhìn vào URL của Google Sheet, nó sẽ có dạng:
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   ```

2. Copy phần `[SHEET_ID]` (giữa `/d/` và `/edit`)

3. Mở file `.env.local` trong project

4. Thay thế dòng này:
   ```
   GOOGLE_SHEET_ID=your_sheet_id_here
   ```

   Thành:
   ```
   GOOGLE_SHEET_ID=SHEET_ID_BẠN_VỪA_COPY
   ```

## 🚀 Deploy lên Vercel

### Bước 4: Thêm Environment Variables vào Vercel

1. Vào Vercel Dashboard: https://vercel.com/dashboard
2. Chọn project của bạn
3. Vào **Settings** > **Environment Variables**
4. Thêm **3 biến** sau (copy từ file `.env.local`):

#### Variable 1:
- Name: `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- Value: `we-515@feisty-legend-419703.iam.gserviceaccount.com`
- Environments: ✅ Production, ✅ Preview, ✅ Development

#### Variable 2:
- Name: `GOOGLE_PRIVATE_KEY`
- Value: Copy toàn bộ private key từ `.env.local` (bao gồm cả dấu ngoặc kép)
- Environments: ✅ Production, ✅ Preview, ✅ Development

#### Variable 3:
- Name: `GOOGLE_SHEET_ID`
- Value: Sheet ID bạn vừa copy ở bước 3
- Environments: ✅ Production, ✅ Preview, ✅ Development

### Bước 5: Deploy

```bash
git add .
git commit -m "Add Google Sheets integration for wedding wishes"
git push
```

Vercel sẽ tự động deploy lại.

## ✅ Kiểm tra

1. Vào website của bạn
2. Scroll xuống phần "Gửi Lời Chúc"
3. Điền tên và lời chúc
4. Click "Gửi Lời Chúc"
5. Mở Google Sheet → Lời chúc sẽ xuất hiện!

## 🎉 Hoàn thành!

Từ giờ, mọi lời chúc sẽ tự động lưu vào Google Sheet theo format:

| Thời gian | Họ và Tên | Lời Chúc |
|-----------|-----------|----------|
| 15/12/2025, 10:30:45 | Nguyễn Văn A | Chúc mừng hạnh phúc! |

Bạn có thể:
- ✅ Xem trực tiếp trên Google Sheets
- ✅ Export ra Excel/PDF
- ✅ Share với người khác
- ✅ In ra để lưu kỷ niệm

## ⚠️ Lưu ý Bảo mật

- ✅ File `feisty-legend-419703-55097f03f05d.json` đã được thêm vào `.gitignore`
- ✅ **KHÔNG BAO GIỜ** commit file JSON này lên Git
- ✅ Giữ file `.env.local` ở local, không push lên Git
- ✅ Chỉ thêm thông tin vào Vercel Environment Variables

## 🆘 Gặp vấn đề?

### Lỗi: "Server configuration error"
→ Kiểm tra lại 3 environment variables trong Vercel đã đủ chưa

### Lỗi: "Permission denied"
→ Kiểm tra đã share Sheet với email `we-515@feisty-legend-419703.iam.gserviceaccount.com` chưa

### Lời chúc không xuất hiện
→ Kiểm tra Sheet ID có đúng không, và tên sheet phải là "Sheet1"

---

**Tổng thời gian setup: ~5 phút** ⏱️

Chúc bạn thành công! 🎊
