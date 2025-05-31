"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { formatPrice, calculateDiscountPercentage } from "@/lib/utils"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AddToCartButton from "@/components/add-to-cart-button"
import type { Database } from "@/lib/database.types"

type Product = Database["public"]["Tables"]["products"]["Row"] & {
  categories?: Database["public"]["Tables"]["categories"]["Row"]
}

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function fetchProduct() {
      try {
        // Ürün detaylarını getir
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select(`
            *,
            categories (*)
          `)
          .eq("slug", params.slug)
          .eq("is_active", true)
          .single()

        if (productError || !productData) {
          router.push("/404")
          return
        }

        setProduct(productData)

        // İlgili ürünleri getir (aynı kategoriden)
        if (productData.category_id) {
          const { data: relatedData } = await supabase
            .from("products")
            .select("*")
            .eq("category_id", productData.category_id)
            .eq("is_active", true)
            .neq("id", productData.id)
            .limit(4)

          setRelatedProducts(relatedData || [])
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        router.push("/404")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.slug, supabase, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Ürün yükleniyor...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Ürün Bulunamadı</h1>
            <p className="text-gray-600 mb-8">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
            <Button onClick={() => router.push("/")} className="bg-emerald-500 hover:bg-emerald-600">
              Ana Sayfaya Dön
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const images = (product.images as string[]) || []
  const imageUrl = images.length > 0 ? images[0] : "/placeholder.svg?height=600&width=600"

  const discountPercentage = product.original_price
    ? calculateDiscountPercentage(product.original_price, product.price)
    : 0

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <button onClick={() => router.push("/")} className="hover:text-emerald-600">
              Ana Sayfa
            </button>
            <span className="mx-2">/</span>
            {product.categories && (
              <>
                <button
                  onClick={() => router.push(`/categories/${product.categories?.slug}`)}
                  className="hover:text-emerald-600"
                >
                  {product.categories.name}
                </button>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-gray-900">{product.name}</span>
          </div>

          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-1 text-gray-600"
            >
              <ArrowLeft className="w-4 h-4" />
              Geri Dön
            </Button>
          </div>

          {/* Product Detail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Product Images */}
            <div className="relative">
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                <div className="relative h-[400px] w-full">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-8 left-8 flex flex-col gap-2">
                {product.is_new && <Badge className="bg-green-500 text-white px-3 py-1">Yeni</Badge>}
                {product.is_bestseller && <Badge className="bg-orange-500 text-white px-3 py-1">Çok Satan</Badge>}
                {discountPercentage > 0 && (
                  <Badge className="bg-red-500 text-white px-3 py-1">%{discountPercentage} İndirim</Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                  ))}
                </div>
                <span className="text-gray-600">(24 Değerlendirme)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-emerald-600">{formatPrice(product.price)}</span>
                {product.original_price && (
                  <span className="text-xl text-gray-400 line-through">{formatPrice(product.original_price)}</span>
                )}
              </div>

              {/* Short Description */}
              {product.short_description && <p className="text-gray-600 mb-6">{product.short_description}</p>}

              {/* Add to Cart */}
              <div className="mb-8">
                <AddToCartButton product={product} />
              </div>

              {/* Features */}
              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <Truck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">Ücretsiz Kargo</p>
                      <p className="text-sm text-gray-500">100 TL üzeri siparişlerde</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">Güvenli Ödeme</p>
                      <p className="text-sm text-gray-500">256-bit SSL şifreleme</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <Truck className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium">Aynı Gün Teslimat</p>
                      <p className="text-sm text-gray-500">14:00'a kadar verilen siparişlerde</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SKU & Category */}
              <div className="text-sm text-gray-500 space-y-1">
                {product.sku && <p>SKU: {product.sku}</p>}
                {product.categories && (
                  <p>
                    Kategori:{" "}
                    <button
                      onClick={() => router.push(`/categories/${product.categories?.slug}`)}
                      className="text-emerald-600 hover:underline"
                    >
                      {product.categories.name}
                    </button>
                  </p>
                )}
                {product.tags && product.tags.length > 0 && <p>Etiketler: {product.tags.join(", ")}</p>}
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ürün Açıklaması</h2>
            <div className="prose max-w-none">
              <p>{product.description || "Bu ürün için henüz detaylı açıklama bulunmamaktadır."}</p>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Benzer Ürünler</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                    onClick={() => router.push(`/products/${relatedProduct.slug}`)}
                  >
                    <div className="relative h-48">
                      <Image
                        src={(relatedProduct.images as string[])?.[0] || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{relatedProduct.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-emerald-600">{formatPrice(relatedProduct.price)}</span>
                        {relatedProduct.original_price && (
                          <span className="text-sm text-gray-400 line-through">
                            {formatPrice(relatedProduct.original_price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
