"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { testimonials } from "@/data/testimonials";

export const Testimonials = () => {
  const { locale, t } = useI18n();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {t("Client Highlights", "Destaques dos Clientes")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t(
              "See what our partners say about our work.",
              "Veja o que nossos parceiros dizem sobre nosso trabalho."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="group relative p-8 rounded-3xl border border-gray-200 bg-gray-50/10 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Glassmorphism Gradient Overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">{testimonial.name}</h4>
                    <p className="text-xs text-gray-600">
                      {testimonial.role[locale]}
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-gray-700 mb-6 flex-grow">
                  "{testimonial.content[locale]}"
                </p>

                <div className="flex gap-1 text-yellow-400 text-xs">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};