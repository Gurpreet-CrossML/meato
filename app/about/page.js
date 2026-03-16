import Footer from "@/components/footer";
import ScrollReveal from "@/components/scroll-reveal";
import { Leaf, Users, Award, Heart } from "lucide-react";

export const metadata = {
  title: "About Meato — Our Story & Values",
  description:
    "Learn how Meato sources the finest beef from ethical farms and delivers it fresh to your doorstep.",
};

const values = [
  {
    icon: Leaf,
    title: "Sustainability First",
    description:
      "We partner only with farms that use sustainable grazing practices, minimize carbon footprint, and prioritize land health for future generations.",
  },
  {
    icon: Users,
    title: "Community Farmers",
    description:
      "Every farm we source from is family-owned and operated. We pay fair prices above market rate to support rural communities.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    description:
      "Every cut is graded, hand-selected, and inspected by our master butchers before it ever reaches your door.",
  },
  {
    icon: Heart,
    title: "Animal Welfare",
    description:
      "All our cattle are pasture-raised with space to roam, fed natural diets, and never administered growth hormones or routine antibiotics.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <span className="inline-block text-[10px] font-bold tracking-[0.3em] text-[#E86A33] uppercase mb-4">
              Our Story
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Meat done{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #E86A33, #5C4033)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                the right way
              </span>
            </h1>
            <p className="text-foreground/60 text-lg leading-relaxed">
              Meato was founded by a team of butchers, farmers, and food lovers
              who believed the world deserved better quality meat — sourced
              transparently, prepared expertly, and delivered with care.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="right">
              <div
                className="h-80 rounded-3xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #2d1810, #3d2415, #1a0e0a)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-7xl">🥩</p>
                    <p className="text-white/40 text-sm mt-4 tracking-widest">
                      EST. 2020
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left">
              <div className="space-y-5">
                <h2 className="text-3xl font-bold">
                  From Butcher Shop to Your Door
                </h2>
                <p className="text-foreground/60 leading-relaxed">
                  What started as a small neighborhood butcher shop in 2020 has
                  grown into a nationwide premium meat delivery service. Our
                  founder, Marcus Reid, had a simple mission: make the quality
                  of meat available to professional chefs accessible to every
                  home cook.
                </p>
                <p className="text-foreground/60 leading-relaxed">
                  Today we work with over 40 partner farms, employ 12 master
                  butchers, and deliver to thousands of homes every week. Our
                  commitment to quality, transparency, and ethics remains
                  unchanged since day one.
                </p>
                <div className="flex gap-8 pt-2">
                  {[
                    { value: "40+", label: "Partner Farms" },
                    { value: "12", label: "Master Butchers" },
                    { value: "50K+", label: "Happy Customers" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="text-2xl font-bold text-[#E86A33]">
                        {s.value}
                      </p>
                      <p className="text-xs text-foreground/50 mt-0.5">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4" id="farms">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <h2 className="text-4xl font-bold">
              Our{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #E86A33, #5C4033)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Values
              </span>
            </h2>
            <p className="text-foreground/50 mt-3 max-w-md mx-auto">
              The principles that guide every decision we make, from farm to
              fork.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="glass rounded-3xl p-8 flex gap-5 items-start h-full">
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                    <v.icon size={22} className="text-[#E86A33]" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{v.title}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
