import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Wish {
  timestamp: string;
  name: string;
  message: string;
}

export interface WishesDisplayRef {
  refresh: () => Promise<void>;
}

const WishesDisplay = forwardRef<WishesDisplayRef>((props, ref) => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishes = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/get-wishes');

      if (!response.ok) {
        throw new Error('Failed to fetch wishes');
      }

      const data = await response.json();
      setWishes(data.wishes || []);
    } catch (err) {
      console.error('Error fetching wishes:', err);
      setError('Không thể tải lời chúc. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  // Expose refresh method to parent via ref
  useImperativeHandle(ref, () => ({
    refresh: fetchWishes
  }));

  useEffect(() => {
    fetchWishes();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-primary/5" id="wishes-section">
        <div className="container mx-auto px-4">
          <h2 className="font-script text-5xl text-primary text-center mb-12">
            Lời Chúc Từ Mọi Người
          </h2>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Đang tải lời chúc...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-primary/5" id="wishes-section">
        <div className="container mx-auto px-4">
          <h2 className="font-script text-5xl text-primary text-center mb-12">
            Lời Chúc Từ Mọi Người
          </h2>
          <div className="text-center py-20">
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (wishes.length === 0) {
    return (
      <section className="py-20 bg-primary/5" id="wishes-section">
        <div className="container mx-auto px-4">
          <h2 className="font-script text-5xl text-primary text-center mb-12">
            Lời Chúc Từ Mọi Người
          </h2>
          <div className="text-center py-20">
            <Heart className="w-16 h-16 mx-auto mb-4 text-primary/30" />
            <p className="text-muted-foreground font-serif text-lg">
              Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc nhé!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-primary/5" id="wishes-section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-script text-5xl text-primary text-center mb-4">
            Lời Chúc Từ Mọi Người
          </h2>
          <p className="font-serif text-lg text-muted-foreground text-center mb-12">
            {wishes.length} lời chúc đã được gửi đến
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {wishes.map((wish, index) => (
            <motion.div
              key={`${wish.timestamp}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-primary fill-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg truncate">{wish.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {new Date(wish.timestamp).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                  <p className="font-serif text-muted-foreground leading-relaxed line-clamp-6">
                    "{wish.message}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

WishesDisplay.displayName = 'WishesDisplay';

export default WishesDisplay;
