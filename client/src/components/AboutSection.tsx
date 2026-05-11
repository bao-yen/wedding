import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { WEDDING_DATA } from "../../../shared/weddingData";
import { Heart, Sparkles, Calendar, Church } from "lucide-react";

const timelineIcons = {
  first: Heart,
  confession: Sparkles,
  proposal: Calendar,
  wedding: Church,
};

const TimelineItem = ({ 
  year, 
  title, 
  description, 
  align, 
  icon 
}: { 
  year: string, 
  title: string, 
  description: string, 
  align: 'left' | 'right',
  icon: keyof typeof timelineIcons
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const Icon = timelineIcons[icon];

  return (
    <div ref={ref} className={`flex flex-col md:flex-row items-center justify-between w-full mb-16 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
      <motion.div 
        initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="w-full md:w-5/12 relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
        <div className="relative p-8 bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1">
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center shadow-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-baseline gap-3 mb-3">
            <h3 className="font-script text-3xl text-primary">{year}</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-accent/50 to-transparent" />
          </div>
          <h4 className="font-serif text-2xl font-bold mb-3 text-foreground">{title}</h4>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </motion.div>
      
      <div className="w-full md:w-2/12 flex justify-center my-6 md:my-0 relative">
        <motion.div 
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative"
        >
          <div className="w-6 h-6 bg-gradient-to-br from-accent to-primary rounded-full ring-8 ring-accent/20 shadow-lg" />
          <motion.div
            className="absolute inset-0 rounded-full bg-accent"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
      
      <div className="w-full md:w-5/12" /> {/* Spacer */}
    </div>
  );
};

export default function AboutSection() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-24 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      </div>
      
      {/* Floating Hearts */}
      <motion.div
        className="absolute top-40 right-20 text-accent/20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Heart className="w-16 h-16" fill="currentColor" />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-20 text-primary/20"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        <Sparkles className="w-12 h-12" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={headerInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="flex items-center gap-2 text-accent">
              <Heart className="w-8 h-8" fill="currentColor" />
              <Sparkles className="w-6 h-6" />
            </div>
          </motion.div>
          <h2 className="font-script text-6xl md:text-7xl leading-[80px] py-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6">
            Our Love Story
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6" />
          <p className="font-serif text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto italic">
            "Yêu không chỉ là nhìn nhau, mà là cùng nhau nhìn về một hướng."
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Enhanced Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-b from-accent via-primary to-accent opacity-30" />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-accent to-primary"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          <TimelineItem 
            year="2024" 
            title="Lần đầu gặp gỡ" 
            description='Một ngày đầu thu Hà Nội, trong cuộc gặp gỡ tưởng chừng rất tình cờ, chúng mình đã có cơ hội biết đến nhau. Lần đầu gặp mặt, em còn ngây ngô nhờ anh giới thiệu người yêu cho mình, ngờ đâu người mà anh "nhiệt tình" giới thiệu lại chính là... bản thân anh!'
            align="left"
            icon="first"
          />
          <TimelineItem 
            year="2024" 
            title="Lời tỏ tình" 
            description="Hành trình từ 'người được mai mối' trở thành người yêu chính thức chẳng hề dễ dàng, bởi anh đã phải kiên nhẫn ngỏ lời tới tận lần thứ 3 mới nhận được sự đồng ý. Chính sự chân thành và kiên định không bỏ cuộc ấy đã hoàn toàn thuyết phục được em, đánh dấu một cột mốc ngọt ngào mới của hai đứa." 
            align="right"
            icon="confession"
          />
          <TimelineItem 
            year="2026" 
            title="Cầu hôn" 
            description="Từ anh chàng tự 'mai mối' bất đắc dĩ, đến hành trình 3 lần tỏ tình gian nan, cuối cùng anh cũng quỳ gối trao chiếc nhẫn định mệnh. Lần này thì chẳng cần đến 3 lần hỏi, bởi ánh mắt rưng rưng và cái gật đầu hạnh phúc ngay lập tức của em đã thay cho mọi lời đồng ý trọn đời."
            align="left"
            icon="proposal"
          />
          <TimelineItem 
            year="2026"
            title="Ngày chung đôi"
            description="Từ hai người xa lạ được bạn bè mai mối, giới thiệu, giờ đây chúng mình đã chính thức nắm tay nhau bước lên lễ đường. Cùng nhau chia sẻ buồn vui, cùng nhau xây dựng tổ ấm. Cảm ơn bạn đã luôn ở đây, đồng hành và chúc mừng cho hai đứa!"
            align="right"
            icon="wedding"
          />
        </div>

        
        {/* Couple Introduction */}
        <div className="mt-32 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h3 className="font-script text-5xl md:text-6xl text-primary mb-4">The Happy Couple</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Groom */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-accent/20 hover:border-accent/40 transition-all duration-300">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                    <img
                      src="/image/chú rể.JPG"
                      alt="Chú Rể"
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-8 text-center">
                    <div className="mb-4">
                      <h3 className="font-script text-5xl text-primary mb-2">Chú Rể</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-3" />
                      <h4 className="font-serif text-3xl font-bold text-foreground mb-4">{WEDDING_DATA.groom.fullName}</h4>
                    </div>
                    <div className="space-y-2 text-muted-foreground mb-6">
                      <p className="flex items-center justify-center gap-2">
                        <span className="font-semibold">Con ông:</span>
                        <span>{WEDDING_DATA.groom.father}</span>
                      </p>
                      <p className="flex items-center justify-center gap-2">
                        <span className="font-semibold">Con bà:</span>
                        <span>{WEDDING_DATA.groom.mother}</span>
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-4 top-0 text-6xl text-accent/20 font-serif">"</div>
                      <p className="italic text-foreground/80 px-6 leading-relaxed">
                        Người đàn ông ấm áp, luôn biết cách quan tâm và che chở.
                      </p>
                      <div className="absolute -right-4 bottom-0 text-6xl text-accent/20 font-serif">"</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Bride */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-primary/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-accent/20 hover:border-accent/40 transition-all duration-300">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10" />
                    <img
                      src="/image/cô dâu.JPG"
                      alt="Cô Dâu"
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-8 text-center">
                    <div className="mb-4">
                      <h3 className="font-script text-5xl text-primary mb-2">Cô Dâu</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-3" />
                      <h4 className="font-serif text-3xl font-bold text-foreground mb-4">{WEDDING_DATA.bride.fullName}</h4>
                    </div>
                    <div className="space-y-2 text-muted-foreground mb-6">
                      <p className="flex items-center justify-center gap-2">
                        <span className="font-semibold">Con ông:</span>
                        <span>{WEDDING_DATA.bride.father}</span>
                      </p>
                      <p className="flex items-center justify-center gap-2">
                        <span className="font-semibold">Con bà:</span>
                        <span>{WEDDING_DATA.bride.mother}</span>
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-4 top-0 text-6xl text-accent/20 font-serif">"</div>
                      <p className="italic text-foreground/80 px-6 leading-relaxed">
                        Cô gái dịu dàng, xinh đẹp với nụ cười tỏa nắng.
                      </p>
                      <div className="absolute -right-4 bottom-0 text-6xl text-accent/20 font-serif">"</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
