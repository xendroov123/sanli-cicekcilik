import { createClient } from "@/lib/supabase/server"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import CategorySlider from "@/components/category-slider"
import ProductGrid from "@/components/product-grid"
import PromotionBanners from "@/components/PromotionBanners"
import Footer from "@/components/Footer"

export default async function HomePage() {
  const supabase = createClient()

  // Kategorileri getir
  const { data: categories } = await supabase.from("categories").select("*").eq("is_active", true).order("sort_order")

  // Öne çıkan ürünleri getir
  const { data: featuredProducts } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .eq("is_active", true)
    .limit(4)

  // Tüm ürünleri getir
  const { data: allProducts } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(8)

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <Header />
      <main>
        <Hero />
        {categories && <CategorySlider categories={categories} />}
        {featuredProducts && (
          <ProductGrid
            products={featuredProducts}
            title="⭐ Öne Çıkan Ürünler"
            description="En beğenilen ve çok satan çiçek aranjmanlarımızı keşfedin"
          />
        )}
        <PromotionBanners />
        {allProducts && (
          <ProductGrid
            products={allProducts}
            title="🌸 Tüm Ürünlerimiz"
            description="Geniş çiçek koleksiyonumuzdan sevdikleriniz için en güzel seçimi yapın"
          />
        )}
      </main>
      <Footer />
    </div>
  )
}
