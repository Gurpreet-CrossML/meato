import Hero from "@/components/sections/hero";
import FeaturedProducts from "@/components/sections/featured-products";
import ShopByCategory from "@/components/sections/shop-by-category";
import WhyMeato from "@/components/sections/why-meato";
import Testimonials from "@/components/sections/testimonials";
import Newsletter from "@/components/sections/newsletter";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <ShopByCategory />
      <WhyMeato />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
}
