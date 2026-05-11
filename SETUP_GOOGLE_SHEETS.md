# Hướng dẫn Setup Google Sheets để lưu lời chúc

## Bước 1: Tạo Google Sheet

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo sheet mới với tên "Wedding Wishes" (hoặc tên bất kỳ)
3. Thêm header vào dòng đầu tiên:
   - Cột A: `Thời gian`
   - Cột B: `Họ và Tên`
   - Cột C: `Lời Chúc`
4. Lưu lại **Sheet ID** từ URL (phần giữa `/d/` và `/edit`):
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   ```

## Bước 2: Tạo Google Service Account

1. Truy cập [Google Cloud Console](https://console.cloud.google.com)
2. Tạo project mới hoặc chọn project hiện có
3. Bật **Google Sheets API**:
   - Vào **APIs & Services** > **Enable APIs and Services**
   - Tìm và enable "Google Sheets API"

4. Tạo Service Account:
   - Vào **IAM & Admin** > **Service Accounts**
   - Click **Create Service Account**
   - Đặt tên (ví dụ: "wedding-wishes")
   - Click **Create and Continue**
   - Skip phần Grant access (không cần role)
   - Click **Done**

5. Tạo Private Key:
   - Click vào service account vừa tạo
   - Vào tab **Keys**
   - Click **Add Key** > **Create new key**
   - Chọn **JSON** format
   - Download file JSON về máy

## Bước 3: Share Google Sheet với Service Account

1. Mở file JSON vừa download
2. Copy giá trị của `client_email` (dạng: `xxx@xxx.iam.gserviceaccount.com`)
3. Quay lại Google Sheet của bạn
4. Click **Share** button
5. Paste email của service account vào
6. Chọn quyền **Editor**
7. **BỎ TICK** ô "Notify people" (không cần thông báo)
8. Click **Share**

## Bước 4: Cấu hình Vercel Environment Variables

1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project của bạn
3. Vào **Settings** > **Environment Variables**
4. Thêm 3 biến môi trường sau:

### Variable 1: GOOGLE_SHEET_ID
- **Name**: `GOOGLE_SHEET_ID`
- **Value**: Sheet ID từ URL (bước 1)
- **Environment**: Production, Preview, Development

### Variable 2: GOOGLE_SERVICE_ACCOUNT_EMAIL
- **Name**: `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- **Value**: Giá trị `client_email` từ file JSON
- **Environment**: Production, Preview, Development

### Variable 3: GOOGLE_PRIVATE_KEY
- **Name**: `GOOGLE_PRIVATE_KEY`
- **Value**: Giá trị `private_key` từ file JSON (bao gồm cả `-----BEGIN PRIVATE KEY-----` và `-----END PRIVATE KEY-----`)
- **Environment**: Production, Preview, Development

⚠️ **LƯU Ý QUAN TRỌNG**:
- Khi copy `private_key`, giữ nguyên các ký tự `\n` (newline)
- Hoặc có thể paste toàn bộ key gồm cả dấu ngoặc kép

## Bước 5: Deploy lại trên Vercel

Sau khi thêm environment variables, deploy lại project:

```bash
git add .
git commit -m "Add Google Sheets integration for wishes"
git push
```

Hoặc trigger deployment thủ công trong Vercel Dashboard.

## Kiểm tra

1. Truy cập website của bạn
2. Vào phần "Gửi Lời Chúc"
3. Điền tên và lời chúc
4. Click "Gửi Lời Chúc"
5. Kiểm tra Google Sheet - lời chúc sẽ xuất hiện ở dòng mới

## Xem lời chúc

Tất cả lời chúc sẽ được lưu vào Google Sheet theo thứ tự:
- **Cột A**: Thời gian gửi (định dạng Việt Nam)
- **Cột B**: Tên người gửi
- **Cột C**: Nội dung lời chúc

Bạn có thể:
- Xem trực tiếp trên Google Sheets
- Export ra Excel/PDF
- Share với người khác
- Tạo biểu đồ thống kê

## Troubleshooting

### Lỗi "Server configuration error"
- Kiểm tra lại 3 environment variables đã được set đúng chưa
- Đảm bảo không có khoảng trắng thừa

### Lỗi "Permission denied"
- Kiểm tra đã share Sheet với service account email chưa
- Đảm bảo quyền là **Editor** (không phải Viewer)

### Lỗi "Invalid credentials"
- Kiểm tra lại `GOOGLE_PRIVATE_KEY` có đầy đủ không
- Đảm bảo giữ nguyên format của private key

### Lời chúc không xuất hiện trong Sheet
- Kiểm tra tên sheet là "Sheet1" (hoặc update trong code `api/submit-wish.ts` dòng 58)
- Kiểm tra Sheet ID có đúng không

## Bảo mật

⚠️ **QUAN TRỌNG**:
- **KHÔNG** commit file JSON service account vào Git
- **KHÔNG** share private key với ai
- Chỉ cấp quyền Editor cho service account trên Sheet cần thiết
- Có thể thu hồi và tạo key mới bất cứ lúc nào trong Google Cloud Console

## Nâng cao

### Tùy chỉnh tên Sheet
Nếu muốn đổi tên sheet từ "Sheet1" sang tên khác, sửa file `api/submit-wish.ts`:

```typescript
range: 'TÊN_SHEET_CỦA_BẠN!A:C',
```

### Thêm validation
Có thể thêm data validation trong Google Sheet để kiểm tra dữ liệu.

### Tạo Google Form thay thế
Nếu muốn đơn giản hơn, có thể dùng Google Form và embed vào website.
