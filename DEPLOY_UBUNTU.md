# Deploy Wedding Website lên Ubuntu Server (T3 Small)

## 📋 Yêu cầu
- Ubuntu Server 20.04 hoặc 22.04
- Instance type: t3.small (2 vCPU, 2GB RAM)
- Port 80 (HTTP) và 443 (HTTPS) mở trong Security Group
- Domain name đã trỏ về IP server

---

## 🚀 Bước 1: Chuẩn bị Server

### SSH vào server

```bash
ssh ubuntu@your-server-ip
# hoặc nếu dùng key file
ssh -i your-key.pem ubuntu@your-server-ip
```

### Cập nhật hệ thống

```bash
sudo apt update && sudo apt upgrade -y
```

### Cài đặt Node.js (v20 LTS)

```bash
# Cài nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load nvm
source ~/.bashrc

# Cài Node.js v20
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node -v  # should show v20.x.x
npm -v
```

### Cài đặt pnpm

```bash
npm install -g pnpm
pnpm -v
```

### Cài đặt PM2 (Process Manager)

```bash
npm install -g pm2
pm2 -v
```

### Cài đặt Nginx (Web Server)

```bash
sudo apt install nginx -y
sudo systemctl status nginx
```

---

## 📦 Bước 2: Clone và Build Project

### Clone repository

```bash
cd ~
git clone https://github.com/your-username/wedding-xuantuoi-vanthuong.git
# Hoặc upload code qua SCP/SFTP
```

### Vào thư mục project

```bash
cd wedding-xuantuoi-vanthuong
```

### Tạo file .env.local

```bash
nano .env.local
```

Paste nội dung sau (thay đổi giá trị thực tế):

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_sheet_id_here
```

**Lưu file:** `Ctrl + O` → `Enter` → `Ctrl + X`

### Cài đặt dependencies

```bash
pnpm install
```

### Build frontend

```bash
pnpm run build
```

Output sẽ ở `dist/public/`

---

## 🔧 Bước 3: Chạy Backend API với PM2

### Tạo thư mục logs

```bash
mkdir -p logs
```

### Khởi động API server với PM2

Chạy trực tiếp bằng câu lệnh (không cần file ecosystem):

```bash
pm2 start npm --name "wedding-api" -- run dev:api
```

Hoặc nếu muốn chi tiết hơn:

```bash
pm2 start "npm run dev:api" \
  --name wedding-api \
  --log ./logs/api-combined.log \
  --error ./logs/api-error.log \
  --output ./logs/api-output.log \
  --time
```

### Kiểm tra status

```bash
pm2 status
pm2 logs wedding-api
```

### Thiết lập PM2 tự khởi động khi reboot

```bash
pm2 startup
# Chạy lệnh mà PM2 gợi ý (bắt đầu với sudo)
pm2 save
```

---

## 🌐 Bước 4: Cấu hình Nginx

### Tạo config file cho Nginx

```bash
sudo nano /etc/nginx/sites-available/wedding
```

Paste nội dung sau (thay `your-domain.com` bằng domain thật):

```nginx
# Redirect HTTP to HTTPS (sẽ thêm sau khi có SSL)
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;

    # Tạm thời serve trực tiếp (sau này sẽ redirect to HTTPS)
    root /home/ubuntu/wedding-xuantuoi-vanthuong/dist/public;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API proxy
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Lưu file:** `Ctrl + O` → `Enter` → `Ctrl + X`

### Enable site

```bash
sudo ln -s /etc/nginx/sites-available/wedding /etc/nginx/sites-enabled/
```

### Xóa default site (nếu có)

```bash
sudo rm /etc/nginx/sites-enabled/default
```

### Test cấu hình Nginx

```bash
sudo nginx -t
```

Nếu OK, reload Nginx:

```bash
sudo systemctl reload nginx
```

---

## 🔒 Bước 5: Cài đặt SSL (HTTPS) với Let's Encrypt

### Cài đặt Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Lấy SSL certificate

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

**Trả lời các câu hỏi:**
- Email: your-email@example.com
- Agree to terms: Yes (Y)
- Redirect HTTP to HTTPS: Yes (2)

Certbot sẽ tự động cấu hình Nginx để dùng HTTPS.

### Test auto-renewal

```bash
sudo certbot renew --dry-run
```

SSL certificate sẽ tự động renew trước khi hết hạn.

---

## ✅ Bước 6: Verify Deployment

### Kiểm tra các service

```bash
# Nginx status
sudo systemctl status nginx

# PM2 status
pm2 status

# API logs
pm2 logs wedding-api --lines 50
```

### Test trên browser

1. Mở: `https://your-domain.com`
2. Test form gửi lời chúc
3. Kiểm tra danh sách lời chúc hiển thị

### Test API trực tiếp

```bash
# Test submit wish
curl -X POST https://your-domain.com/api/submit-wish \
  -H "Content-Type: application/json" \
  -d '{"name":"Server Test","message":"Testing from production"}'

# Test get wishes
curl https://your-domain.com/api/get-wishes
```

---

## 🔄 Bước 7: Update Code (Khi có thay đổi)

### Script tự động update

Tạo file script:

```bash
nano ~/deploy.sh
```

Paste nội dung:

```bash
#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Go to project directory
cd ~/wedding-xuantuoi-vanthuong

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build frontend
echo "🏗️  Building frontend..."
pnpm run build

# Restart API
echo "🔄 Restarting API server..."
pm2 restart wedding-api

# Reload Nginx
echo "🌐 Reloading Nginx..."
sudo systemctl reload nginx

echo "✅ Deployment completed!"
pm2 status
```

Cho phép execute:

```bash
chmod +x ~/deploy.sh
```

### Chạy khi cần update:

```bash
~/deploy.sh
```

---

## 📊 Monitor & Maintenance

### Xem logs

```bash
# API logs
pm2 logs wedding-api

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# System logs
journalctl -xe
```

### Monitor resources

```bash
# CPU, RAM usage
htop

# Disk usage
df -h

# PM2 monitoring
pm2 monit
```

### Restart services

```bash
# Restart API
pm2 restart wedding-api

# Restart Nginx
sudo systemctl restart nginx

# Reboot server (nếu cần)
sudo reboot
```

---

## 🔥 Firewall (UFW)

### Enable firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## 🐛 Troubleshooting

### Lỗi API 500

```bash
# Check logs
pm2 logs wedding-api --err

# Check env variables
cat .env.local

# Restart API
pm2 restart wedding-api
```

### Lỗi Nginx 502 Bad Gateway

```bash
# Check API running
pm2 status

# Check Nginx config
sudo nginx -t

# Check API port
sudo netstat -tuln | grep 3001
```

### SSL certificate errors

```bash
# Renew manually
sudo certbot renew

# Check expiry
sudo certbot certificates
```

### Out of memory

```bash
# Check memory
free -h

# Restart services
pm2 restart all
sudo systemctl restart nginx
```

---

## 📝 Checklist Deploy

- [ ] Server Ubuntu đã setup
- [ ] Node.js v20 installed
- [ ] pnpm installed
- [ ] PM2 installed
- [ ] Nginx installed
- [ ] Code đã clone/upload
- [ ] .env.local đã tạo với credentials đúng
- [ ] Dependencies installed (`pnpm install`)
- [ ] Frontend built (`pnpm run build`)
- [ ] API running with PM2
- [ ] Nginx configured
- [ ] Domain trỏ về server IP
- [ ] SSL certificate installed
- [ ] Website accessible via HTTPS
- [ ] API endpoints working
- [ ] PM2 auto-startup enabled

---

## 🎯 Performance Tips

### 1. Enable Nginx caching

Edit `/etc/nginx/sites-available/wedding`, thêm:

```nginx
# Cache zone
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=100m inactive=60m;

# Trong location /api/
location /api/get-wishes {
    proxy_cache api_cache;
    proxy_cache_valid 200 5m;
    proxy_pass http://localhost:3001;
    # ... các config khác
}
```

### 2. Optimize PM2

```bash
# Use cluster mode for better performance
pm2 start ecosystem.config.cjs --instances 2
```

### 3. Monitor với PM2 Plus (Optional)

```bash
pm2 plus
# Follow instructions to link account
```

---

## 💰 Cost Estimate (AWS)

- **t3.small EC2:** ~$15/month (On-Demand)
- **Data transfer:** ~$1-5/month (depends on traffic)
- **Domain:** ~$12/year
- **Total:** ~$17-20/month

---

## 🆘 Support

Nếu gặp vấn đề, check logs:

```bash
# All logs
pm2 logs
sudo tail -100 /var/log/nginx/error.log
journalctl -xe
```

Good luck! 🎉
