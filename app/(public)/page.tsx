import { Hero } from "../components/Hero";
import { FeaturedPosts } from "../components/FeaturedPosts";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedPosts />
      <Newsletter />
      <Footer />
    </main>
  );
}