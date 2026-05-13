# Development Guide - Wedding Website

## 🚀 Chạy Development Server

### Cách 1: Chạy tất cả cùng lúc (Khuyến nghị)

```bash
npm run dev:all
```

Lệnh này sẽ chạy đồng thời:
- **Vite dev server** trên `http://localhost:3000` (Frontend)
- **API dev server** trên `http://localhost:3001` (Backend API)

### Cách 2: Chạy riêng từng service

**Terminal 1 - API Server:**
```bash
npm run dev:api
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

---

## 📡 API Endpoints

### Development (localhost)

- **POST** `http://localhost:3000/api/submit-wish` - Gửi lời chúc
- **GET** `http://localhost:3000/api/get-wishes` - Lấy danh sách lời chúc

*(Vite sẽ tự động proxy đến port 3001)*

### Production (Vercel)

- **POST** `/api/submit-wish` - Gửi lời chúc
- **GET** `/api/get-wishes` - Lấy danh sách lời chúc

---

## 🔧 Cấu hình

### Environment Variables

File: `.env.local`

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_sheet_id_here
```

### Vite Proxy (Development)

File: `vite.config.ts`

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },
}
```

---

## 🧪 Test API

### Test Submit Wish

```bash
curl -X POST http://localhost:3000/api/submit-wish \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","message":"Hello World!"}'
```

### Test Get Wishes

```bash
curl http://localhost:3000/api/get-wishes
```

---

## 📦 Build & Deploy

### Build Production

```bash
npm run build
```

Output: `dist/public/`

### Preview Production Build

```bash
npm run preview
```

### Deploy to Vercel

```bash
git push
```

Vercel sẽ tự động deploy khi push lên main branch.

---

## 🗂️ Cấu trúc Project

```
wedding_yenvtb/
├── api/                    # Vercel API Routes (Production)
│   ├── submit-wish.ts     # POST endpoint gửi lời chúc
│   └── get-wishes.ts      # GET endpoint lấy lời chúc
├── server/                 # Local Dev API Server
│   └── dev-api.ts         # Express server cho development
├── client/                 # React Frontend
│   └── src/
│       ├── components/
│       │   ├── RsvpSection.tsx        # Form gửi lời chúc
│       │   └── WishesDisplay.tsx      # Hiển thị lời chúc
│       └── pages/
│           └── Home.tsx               # Main page
├── shared/                 # Shared code
│   └── weddingData.ts
├── .env.local             # Environment variables
├── vite.config.ts         # Vite configuration
└── package.json
```

---

## 🐛 Troubleshooting

### Lỗi 404 khi gọi API

**Nguyên nhân:** API server chưa chạy

**Giải pháp:**
```bash
# Dừng tất cả processes
Ctrl + C

# Chạy lại
npm run dev:all
```

### Lỗi Google Sheets Authentication

**Kiểm tra:**
1. File `.env.local` có đúng định dạng không?
2. `GOOGLE_PRIVATE_KEY` có đầy đủ `\n` không?
3. Service Account đã được share quyền truy cập Sheet chưa?

**Test:**
```bash
# Kiểm tra env variables
cat .env.local
```

### Port 3000 hoặc 3001 đã được sử dụng

**Giải pháp:**

```bash
# Tìm process đang dùng port
lsof -i :3000
lsof -i :3001

# Kill process
kill -9 <PID>
```

Hoặc thay đổi port trong:
- `vite.config.ts` (port 3000)
- `server/dev-api.ts` (port 3001)

---

## 📝 Notes

- **Development:** Sử dụng Express server để chạy API locally
- **Production:** Vercel sẽ tự động deploy API routes từ thư mục `/api`
- **Proxy:** Vite proxy giúp frontend gọi API qua cùng origin (tránh CORS)
