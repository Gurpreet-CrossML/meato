"use client";

import { motion } from "framer-motion";
import { Leaf, Truck, ChefHat, Thermometer } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";

const features = [
  {
    icon: Leaf,
    title: "Ethically Sourced",
    description:
      "Every cut comes from farms that prioritize animal welfare, sustainable pastures, and responsible land management.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Truck,
    title: "Farm Fresh Delivery",
    description:
      "Order by noon for next-day delivery. Our insulated packaging keeps your meat fresh and cold from our cold rooms to your door.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: ChefHat,
    title: "Expert Butcher Cuts",
    description:
      "Our master butchers have over 20 years of experience. Each cut is trimmed, portioned, and prepared to professional standards.",
    color: "text-[#E86A33]",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Thermometer,
    title: "Cold Chain Guaranteed",
    description:
      "From farm to your fridge, we maintain a strict unbroken cold chain at -1°C to 4°C. Safety and freshness, always guaranteed.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

export default function WhyMeato() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block text-[10px] font-bold tracking-[0.3em] text-[#E86A33] dark:text-[#FF7A3C] uppercase mb-4">
            Our Promise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Choose <span className="gradient-text">Meato</span>
          </h2>
          <p className="text-foreground/50 mt-4 max-w-lg mx-auto">
            We believe great meat deserves great care — from farm to fork, every
            step is crafted with intention.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="glass rounded-3xl p-7 flex flex-col gap-4 h-full"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${f.bgColor} flex items-center justify-center`}
                >
                  <f.icon size={22} className={f.color} />
                </div>
                <h3 className="font-bold text-base">{f.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
