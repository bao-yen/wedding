# PM2 Quick Reference - Wedding Website

## 🚀 Khởi động API Server

### Cách đơn giản nhất:
```bash
pm2 start npm --name "wedding-api" -- run dev:api
```

### Với logging chi tiết:
```bash
pm2 start "npm run dev:api" \
  --name wedding-api \
  --log ./logs/api-combined.log \
  --error ./logs/api-error.log \
  --output ./logs/api-output.log \
  --time
```

### Với environment variables:
```bash
pm2 start npm --name "wedding-api" -- run dev:api \
  --env production
```

---

## 📊 Kiểm tra trạng thái

### Xem danh sách apps
```bash
pm2 list
# hoặc
pm2 status
```

### Xem thông tin chi tiết
```bash
pm2 show wedding-api
```

### Monitor real-time
```bash
pm2 monit
```

---

## 📝 Xem Logs

### Xem tất cả logs
```bash
pm2 logs
```

### Xem logs của app cụ thể
```bash
pm2 logs wedding-api
```

### Xem 100 dòng cuối
```bash
pm2 logs wedding-api --lines 100
```

### Chỉ xem error logs
```bash
pm2 logs wedding-api --err
```

### Xóa logs cũ
```bash
pm2 flush
```

---

## 🔄 Quản lý Process

### Restart
```bash
pm2 restart wedding-api
```

### Reload (zero-downtime)
```bash
pm2 reload wedding-api
```

### Stop
```bash
pm2 stop wedding-api
```

### Start lại sau khi stop
```bash
pm2 start wedding-api
```

### Delete (xóa khỏi PM2)
```bash
pm2 delete wedding-api
```

### Restart tất cả apps
```bash
pm2 restart all
```

---

## 💾 Lưu & Khôi phục

### Lưu danh sách apps hiện tại
```bash
pm2 save
```

### Khôi phục apps đã lưu
```bash
pm2 resurrect
```

---

## 🔧 Auto-start khi reboot

### Setup auto-startup
```bash
pm2 startup
# Chạy lệnh mà PM2 gợi ý (thường bắt đầu với sudo)
```

### Ví dụ output:
```bash
sudo env PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.11.0/bin /home/ubuntu/.nvm/versions/node/v20.11.0/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

### Lưu danh sách apps để auto-start
```bash
pm2 save
```

### Disable auto-startup
```bash
pm2 unstartup
```

---

## 🔍 Debug & Troubleshooting

### Xem environment variables
```bash
pm2 env 0
# hoặc
pm2 show wedding-api
```

### Reset restart counter
```bash
pm2 reset wedding-api
```

### Xem CPU & Memory usage
```bash
pm2 monit
```

---

## 🧹 Maintenance

### Update PM2
```bash
npm install -g pm2@latest
pm2 update
```

### Xóa tất cả apps
```bash
pm2 delete all
```

### Kill PM2 daemon
```bash
pm2 kill
```

---

## 📋 Các lệnh hữu ích khác

### Xem version
```bash
pm2 -v
```

### Describe app
```bash
pm2 describe wedding-api
```

### Prettylist
```bash
pm2 prettylist
```

### Generate ecosystem file từ process đang chạy
```bash
pm2 ecosystem
```

---

## 🎯 Workflow Deploy thường dùng

### 1. Deploy lần đầu
```bash
cd ~/wedding-xuantuoi-vanthuong
pnpm install
pnpm run build
mkdir -p logs
pm2 start npm --name "wedding-api" -- run dev:api
pm2 save
pm2 startup
```

### 2. Update code
```bash
cd ~/wedding-xuantuoi-vanthuong
git pull
pnpm install
pnpm run build
pm2 restart wedding-api
```

### 3. Check health
```bash
pm2 status
pm2 logs wedding-api --lines 50
curl http://localhost:3001/api/get-wishes
```

---

## ⚠️ Common Issues

### PM2 app bị crash liên tục
```bash
# Xem error logs
pm2 logs wedding-api --err

# Xem restart count
pm2 list

# Reset và xem logs từ đầu
pm2 reset wedding-api
pm2 logs wedding-api
```

### Port 3001 đã được sử dụng
```bash
# Tìm process đang dùng port
sudo lsof -i :3001

# Kill process cũ
pm2 delete wedding-api
# hoặc
sudo kill -9 <PID>

# Start lại
pm2 start npm --name "wedding-api" -- run dev:api
```

### PM2 không auto-start sau reboot
```bash
# Xóa cấu hình cũ
pm2 unstartup

# Setup lại
pm2 startup
# Chạy lệnh gợi ý

# Save lại
pm2 save

# Test bằng cách reboot
sudo reboot
```

---

## 💡 Tips

1. **Luôn chạy `pm2 save` sau khi start app mới**
2. **Dùng `pm2 logs` thường xuyên để debug**
3. **Setup auto-startup ngay từ đầu**
4. **Dùng `pm2 monit` để theo dõi resource usage**
5. **Backup file .env.local trước khi update**
