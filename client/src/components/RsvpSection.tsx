import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { WEDDING_DATA } from "../../../shared/weddingData";

export default function RsvpSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(WEDDING_DATA.bank.accountNumber);
    setCopied(true);
    toast.success("Đã sao chép số tài khoản!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Gift Box */}
          <div>
            <h2 className="font-script text-5xl text-primary mb-6 text-center">Hộp Mừng Cưới</h2>
            <p className="font-serif text-lg text-muted-foreground mb-8 text-center">
              Nếu không thể tham dự, bạn có thể gửi quà mừng qua thông tin bên dưới.
            </p>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-border text-center">
              <img
                src="/img/qr_code.jpg"
                alt="QR Code Chuyển Khoản"
                className="w-full h-full object-contain"
              />
              <div className="space-y-2 mb-6">
                <p className="text-muted-foreground uppercase tracking-wide text-sm">Chủ tài khoản</p>
                <p className="font-bold text-xl">{WEDDING_DATA.bank.accountName}</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground uppercase tracking-wide text-sm">Số tài khoản</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="font-mono text-2xl font-bold tracking-wider">{WEDDING_DATA.bank.accountNumber}</p>
                  <Button size="icon" variant="ghost" onClick={handleCopy} className="h-8 w-8">
                    {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
