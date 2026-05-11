# 🚀 Deploy lên Vercel - Hướng dẫn nhanh

## ✅ Đã tối ưu sẵn

### 1. **Lazy Loading**
- Hero image: Load ngay lập tức
- Các ảnh khác: Load khi scroll đến
- Tự động giảm First Load time

### 2. **Vercel Image Optimization**
File `vercel.json` đã config:
- ✅ Cache ảnh 1 năm trên CDN
- ✅ Tự động convert WebP/AVIF
- ✅ Responsive images
- ✅ Edge caching toàn cầu

### 3. **Giữ nguyên ảnh gốc**
- **78MB** ảnh gốc (chất lượng cao)
- Vercel tự động optimize khi deliver
- User nhận ~20-30MB (WebP/AVIF)

## 🚀 Deploy

### Bước 1: Push lên GitHub
```bash
git add .
git commit -m "Ready for production"
git push
```

### Bước 2: Deploy trên Vercel
1. Vào https://vercel.com
2. Import GitHub repo
3. Framework: **Vite**
4. Root Directory: **.**
5. Build Command: `pnpm run build`
6. Output Directory: `dist/public`

### Bước 3: Add Environment Variables
Vào **Settings** → **Environment Variables**, thêm:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=we-515@feisty-legend-419703.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
GOOGLE_SHEET_ID=1vegdnFgCkMngzWDyosLJM97mYBuiiaRR9GBIre9puUg
```

### Bước 4: Deploy
Click **Deploy** → Xong! 🎉

## 📊 Kết quả dự kiến

### Performance trên Vercel:
- **First Load**: 2-3 giây (3G)
- **LCP**: <2.5s
- **Images**: WebP/AVIF tự động
- **Cache**: Lần 2+ load <1s

### Vercel làm gì tự động?
1. ✅ Gzip/Brotli compression
2. ✅ Image optimization (WebP/AVIF)
3. ✅ CDN global caching
4. ✅ Auto SSL certificate
5. ✅ HTTP/2 + HTTP/3

## ⚡ Tips

### Nếu muốn tối ưu thêm:
- Bật Vercel Speed Insights (miễn phí)
- Monitor performance trên dashboard
- Check PageSpeed Insights sau deploy

### Không cần:
- ❌ Nén ảnh thủ công
- ❌ Setup CDN riêng
- ❌ Config nginx/apache
- ❌ SSL certificate

Vercel lo tất cả! 🚀
