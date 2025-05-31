import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// Örnek kategori verileri
const categories = [
  {
    name: "Doğum Günü",
    slug: "dogum-gunu",
    description: "Doğum günü için özel çiçek aranjmanları",
    icon: "🎂",
    is_active: true,
    sort_order: 1,
  },
  {
    name: "Orkide",
    slug: "orkide",
    description: "Zarif orkide çeşitleri",
    icon: "🌺",
    is_active: true,
    sort_order: 2,
  },
  {
    name: "Ayçiçeği",
    slug: "aycicegi",
    description: "Güneşin enerjisini taşıyan ayçiçekleri",
    icon: "🌻",
    is_active: true,
    sort_order: 3,
  },
  {
    name: "Yeni İş/Terfi",
    slug: "yeni-is-terfi",
    description: "Yeni başlangıçlar için özel çiçekler",
    icon: "🎉",
    is_active: true,
    sort_order: 4,
  },
  {
    name: "Sevgiliye Çiçek",
    slug: "sevgiliye-cicek",
    description: "Sevdikleriniz için romantik çiçekler",
    icon: "💕",
    is_active: true,
    sort_order: 5,
  },
  {
    name: "Çiçek Sepeti",
    slug: "cicek-sepeti",
    description: "Özenle hazırlanmış çiçek sepetleri",
    icon: "🧺",
    is_active: true,
    sort_order: 6,
  },
  {
    name: "Yeni Bebek",
    slug: "yeni-bebek",
    description: "Yeni doğan bebekler için özel aranjmanlar",
    icon: "👶",
    is_active: true,
    sort_order: 7,
  },
  {
    name: "Saksı Çiçekleri",
    slug: "saksi-cicekleri",
    description: "Uzun ömürlü saksı çiçekleri",
    icon: "🪴",
    is_active: true,
    sort_order: 8,
  },
]

// Örnek ürün verileri
const products = [
  {
    name: "Şanlı Gül Buketi",
    slug: "sanli-gul-buketi",
    description: "Özel günleriniz için hazırlanmış 11 adet kırmızı gülden oluşan buket.",
    short_description: "11 adet kırmızı gül buketi",
    price: 199.99,
    original_price: 299.99,
    stock_quantity: 50,
    images: JSON.stringify(["/placeholder.svg?height=300&width=300"]),
    is_featured: true,
    is_bestseller: true,
    is_new: false,
    is_active: true,
    category_id: 5, // Sevgiliye Çiçek kategorisi
  },
  {
    name: "Pembe Orkide Aranjmanı",
    slug: "pembe-orkide-aranjmani",
    description: "2 dallı pembe orkide özel seramik saksıda sunulur.",
    short_description: "2 dallı pembe orkide",
    price: 349.99,
    original_price: 459.99,
    stock_quantity: 25,
    images: JSON.stringify(["/placeholder.svg?height=300&width=300"]),
    is_featured: true,
    is_bestseller: false,
    is_new: true,
    is_active: true,
    category_id: 2, // Orkide kategorisi
  },
  {
    name: "Karma Çiçek Sepeti",
    slug: "karma-cicek-sepeti",
    description: "Mevsimin en taze çiçeklerinden hazırlanmış özel sepet aranjmanı.",
    short_description: "Mevsim çiçekleri sepeti",
    price: 149.99,
    original_price: 189.99,
    stock_quantity: 30,
    images: JSON.stringify(["/placeholder.svg?height=300&width=300"]),
    is_featured: true,
    is_bestseller: false,
    is_new: false,
    is_active: true,
    category_id: 6, // Çiçek Sepeti kategorisi
  },
  {
    name: "Beyaz Lilyum Buketi",
    slug: "beyaz-lilyum-buketi",
    description: "Saf ve zarif beyaz lilyumlardan oluşan özel buket.",
    short_description: "Beyaz lilyum buketi",
    price: 249.99,
    original_price: 329.99,
    stock_quantity: 20,
    images: JSON.stringify(["/placeholder.svg?height=300&width=300"]),
    is_featured: true,
    is_bestseller: false,
    is_new: false,
    is_active: true,
    category_id: 1, // Doğum Günü kategorisi
  },
  {
    name: "Şanlı Pembe Güller",
    slug: "sanli-pembe-guller",
    description: "9 adet pembe gülden oluşan zarif buket.",
    short_description: "9 adet pembe gül",
    price: 179.99,
    original_price: 229.99,
    stock_quantity: 40,
    images: JSON.stringify(["/placeholder.svg?height=300&width=300"]),
    is_featured: false,
    is_bestseller: true,
    is_new: false,
    is_active: true,
    category_id: 5, // Sevgiliye Çiçek kategorisi
  },
  {
    name: "Karma Ayçiçeği Buketi",
    slug: "karma-aycicegi-buketi",
    description: "Güneşin enerjisini taşıyan ayçiçekleri ve mevsim çiçeklerinden oluşan buket.",
    short_description: "Ayçiçeği ve mevsim çiçekleri",
    price: 149.99,
    original_price: 199.99,
    stock_quantity: 35,
    images: JSON.stringify(["/placeholder.svg?height=300&width=300"]),
    is_featured: false,
    is_bestseller: false,
    is_new: true,
    is_active: true,
    category_id: 3, // Ayçiçeği kategorisi
  },
  {
    name: "Beyaz Orkide Aranjmanı",
    slug: "beyaz-orkide-aranjmani",
    description: "3 dallı beyaz orkide şık seramik saksıda sunulur.",
    short_description: "3 dallı beyaz orkide",
    price: 299.99,
    original_price: 399.99,
    stock_quantity: 15,
    images: JSON.stringify(["/placeholder.svg?height=300&width=300"]),
    is_featured: false,
    is_bestseller: false,
    is_new: false,
    is_active: true,
    category_id: 2, // Orkide kategorisi
  },
  {
    name: "Kırmızı Gül Sepeti",
    slug: "kirmizi-gul-sepeti",
    description: "21 adet kırmızı gülden oluşan özel sepet aranjmanı.",
    short_description: "21 adet kırmızı gül sepeti",
    price: 219.99,
    original_price: 279.99,
    stock_quantity: 25,
    images: JSON.stringify(["/placeholder.svg?height=300&width=300"]),
    is_featured: false,
    is_bestseller: true,
    is_new: false,
    is_active: true,
    category_id: 6, // Çiçek Sepeti kategorisi
  },
]

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Supabase credentials are missing" }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Kategorileri ekle
    const { error: categoriesError } = await supabase.from("categories").upsert(categories, { onConflict: "slug" })

    if (categoriesError) {
      return NextResponse.json({ error: categoriesError.message }, { status: 500 })
    }

    // Kategorileri getir (ID'leri almak için)
    const { data: categoryData } = await supabase.from("categories").select("id, slug")

    // Kategori ID'lerini eşleştir
    const categoryMap =
      categoryData?.reduce(
        (acc, cat) => {
          acc[cat.slug] = cat.id
          return acc
        },
        {} as Record<string, number>,
      ) || {}

    // Ürünleri ekle (kategori ID'lerini güncelle)
    const productsWithCategoryIds = products.map((product) => {
      const categorySlug = categories.find((cat) => cat.sort_order === product.category_id)?.slug
      return {
        ...product,
        category_id: categorySlug ? categoryMap[categorySlug] : null,
      }
    })

    const { error: productsError } = await supabase
      .from("products")
      .upsert(productsWithCategoryIds, { onConflict: "slug" })

    if (productsError) {
      return NextResponse.json({ error: productsError.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Seed data added successfully",
      categories: categoryData?.length || 0,
      products: productsWithCategoryIds.length,
    })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}
