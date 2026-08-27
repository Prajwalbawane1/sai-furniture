import React from "react";
import { 
  TreePine, 
  Ruler, 
  ShieldCheck, 
  Award, 
  HeartHandshake, 
  Truck 
} from "lucide-react";

export function WhyChooseUs() {
  const points = [
    {
      icon: TreePine,
      title: "Grade-A Seasoned Timber",
      description:
        "We source mature CP Teakwood and Indian Sheesham, naturally seasoned and kiln-treated to eliminate moisture and warping.",
    },
    {
      icon: Ruler,
      title: "Bespoke Made-to-Measure",
      description:
        "Every home is unique. Customize bed dimensions, sofa seating depths, wardrobe internal partitions, and polish finishes.",
    },
    {
      icon: ShieldCheck,
      title: "Termite & Borer Resistant",
      description:
        "Triple-layer anti-termite and borer treatment combined with marine-grade BWR joinery gives your furniture decades of endurance.",
    },
    {
      icon: Award,
      title: "Direct Showroom Pricing",
      description:
        "By manufacturing directly in Navegaon, we eliminate retail broker markups, giving you solid timber at exceptional pricing.",
    },
    {
      icon: HeartHandshake,
      title: "Gadchiroli Heritage & Trust",
      description:
        "Serving thousands of proud homeowners across Navegaon, Gadchiroli, Armori, and surrounding Vidarbha regions with unwavering trust.",
    },
    {
      icon: Truck,
      title: "Safe Delivery & Installation",
      description:
        "Our skilled carpentry crew personally delivers, carries, and installs your heavy furniture at your home with zero hassle.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-700">
            Uncompromising Excellence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900">
            Why Discerning Families Choose Sai Furniture
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
            We don&apos;t build temporary flat-pack furniture. We craft heavy, timeless wooden heirlooms designed to enrich your living spaces for generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {points.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div
                key={i}
                className="group relative rounded-3xl bg-white p-8 border border-sand-200 shadow-sm hover:shadow-luxury-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="inline-flex p-3.5 rounded-2xl bg-brand-50 text-brand-800 border border-brand-100 mb-6 group-hover:bg-brand-900 group-hover:text-amber-300 transition-colors duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-2">
                  {pt.title}
                </h3>
                <p className="text-sm text-charcoal-600 leading-relaxed">
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
