import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { WEDDING_DATA } from "../../../shared/weddingData";

export default function QuotesSection() {
  return (
    <section className="py-24 bg-primary/5 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {WEDDING_DATA.quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative p-8 bg-white rounded-xl shadow-md border border-border group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="absolute -top-6 left-8 bg-accent text-accent-foreground p-3 rounded-full shadow-lg">
                <Quote size={24} fill="currentColor" />
              </div>
              
              <div className="mt-6 text-center">
                <p className="font-serif text-xl italic text-foreground/80 leading-relaxed mb-6">
                  "{quote.text}"
                </p>
                <div className="w-12 h-0.5 bg-accent mx-auto mb-4" />
                <p className="font-script text-2xl text-primary">
                  - {quote.author}
                </p>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-accent/30 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-accent/30 rounded-bl-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
