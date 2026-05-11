import { Calendar, MapPin, Clock, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { WEDDING_DATA } from "../../../shared/weddingData";

export default function EventDetails() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-24 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent/30 rounded-full blur-3xl" />
      </div>

      {/* Floating Decorations */}
      <motion.div
        className="absolute top-32 left-20 text-primary/15"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Calendar className="w-20 h-20" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-20 text-accent/15"
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        <Heart className="w-16 h-16" fill="currentColor" />
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
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="w-6 h-6" />
              <Calendar className="w-8 h-8" />
              <Sparkles className="w-6 h-6" />
            </div>
          </motion.div>
          <h2 className="font-script text-6xl md:text-7xl leading-[80px] py-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6">
            Sự Kiện Cưới
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="font-serif text-xl md:text-2xl text-muted-foreground italic">
            Trân trọng kính mời quý khách đến chung vui cùng gia đình
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Schedule */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h3 className="font-script text-4xl text-primary mb-2 text-center lg:text-left">Lịch Trình</h3>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto lg:mx-0" />
            </motion.div>

            {WEDDING_DATA.schedule.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 flex items-start gap-6">
                  <div className="bg-gradient-to-br from-primary to-accent p-4 rounded-2xl text-white shrink-0 shadow-lg">
                    <Clock size={28} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">{event.title}</h3>
                    <div className="flex items-center gap-2 text-primary font-semibold mb-3 text-lg">
                      <Calendar size={18} className="shrink-0" />
                      <span>{event.time} - {event.date}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-base">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Locations */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h3 className="font-script text-4xl text-primary mb-2 text-center lg:text-left">Địa Điểm</h3>
              <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary mx-auto lg:mx-0" />
            </motion.div>

            {/* Bride's Location */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-accent/20 hover:border-accent/40 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-accent to-primary p-3 rounded-xl text-white shadow-lg">
                    <MapPin size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-primary">Nhà Gái</h3>
                </div>
                <div className="mb-6 p-4 bg-accent/5 rounded-xl border border-accent/10">
                  <a
                    href={WEDDING_DATA.bride.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-foreground font-medium leading-relaxed hover:text-accent transition-colors duration-200 flex items-start gap-2 group"
                  >
                    <MapPin size={20} className="shrink-0 mt-1 text-accent group-hover:scale-110 transition-transform" />
                    <span className="underline-offset-4 group-hover:underline">{WEDDING_DATA.bride.address}</span>
                  </a>
                </div>
                <div className="h-64 w-full rounded-2xl overflow-hidden shadow-lg border-2 border-accent/20 hover:border-accent/40 transition-all duration-300">
                  <iframe
                    src={WEDDING_DATA.bride.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bản đồ nhà gái"
                  />
                </div>
              </div>
            </motion.div>

            {/* Groom's Location */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl text-white shadow-lg">
                    <MapPin size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-primary">Nhà Trai</h3>
                </div>
                <div className="mb-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <a
                    href={WEDDING_DATA.groom.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-foreground font-medium leading-relaxed hover:text-primary transition-colors duration-200 flex items-start gap-2 group"
                  >
                    <MapPin size={20} className="shrink-0 mt-1 text-primary group-hover:scale-110 transition-transform" />
                    <span className="underline-offset-4 group-hover:underline">{WEDDING_DATA.groom.address}</span>
                  </a>
                </div>
                <div className="h-64 w-full rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <iframe
                    src={WEDDING_DATA.groom.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bản đồ nhà trai"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
