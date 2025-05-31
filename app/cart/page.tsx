"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/store/cart"
import { formatPrice } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore()
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id)
      return
    }
    updateQuantity(id, newQuantity)
  }

  const handleRemoveItem = (id: number, name: string) => {
    removeItem(id)
    toast({
      title: "Ürün kaldırıldı",
      description: `${name} sepetinizden kaldırıldı.`,
    })
  }

  const handleApplyCoupon = () => {
    setIsApplyingCoupon(true)
    setTimeout(() => {
      if (couponCode.toLowerCase() === "welcome10") {
        toast({
          title: "Kupon uygulandı!",
          description: "%10 indirim kuponunuz uygulandı.",
        })
      } else {
        toast({
          title: "Geçersiz kupon",
          description: "Girdiğiniz kupon kodu geçerli değil.",
          variant: "destructive",
        })
      }
      setIsApplyingCoupon(false)
    }, 1000)
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal > 100 ? 0 : 15
  const discount = couponCode.toLowerCase() === "welcome10" ? subtotal * 0.1 : 0
  const total = subtotal + shipping - discount

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-8 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🛒</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Sepetiniz Boş</h1>
              <p className="text-lg text-gray-600 mb-8">Henüz sepetinize ürün eklemediniz.</p>
              <Button
                onClick={() => router.push("/")}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Alışverişe Başla
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-emerald-600">
              Ana Sayfa
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Sepetim</span>
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
              Alışverişe Devam Et
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-800">Sepetim ({items.length} ürün)</h1>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      clearCart()
                      toast({
                        title: "Sepet temizlendi",
                        description: "Tüm ürünler sepetinizden kaldırıldı.",
                      })
                    }}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Sepeti Temizle
                  </Button>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                        <p className="text-emerald-600 font-bold">{formatPrice(item.price)}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="px-3 py-1 h-10"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="px-4 py-2 min-w-[60px] text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-3 py-1 h-10"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-red-600 hover:bg-red-50 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-gray-800">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Sipariş Özeti</h2>

                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">İndirim Kuponu</label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Kupon kodunu girin"
                      className="flex-1"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={isApplyingCoupon || !couponCode}
                      variant="outline"
                      size="sm"
                    >
                      {isApplyingCoupon ? "..." : "Uygula"}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Örnek kupon: WELCOME10</p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ara Toplam</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Kargo</span>
                    <span className="font-medium">
                      {shipping === 0 ? <span className="text-green-600">Ücretsiz</span> : formatPrice(shipping)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>İndirim</span>
                      <span className="font-medium">-{formatPrice(discount)}</span>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Toplam</span>
                      <span className="text-emerald-600">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Info */}
                {shipping > 0 && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-6">
                    <p className="text-sm text-blue-700">
                      💡 {formatPrice(100 - subtotal)} daha ekleyin, ücretsiz kargo kazanın!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <Button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-full text-lg"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Ödemeye Geç
                </Button>

                {/* Security Info */}
                <div className="mt-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>🔒</span>
                    <span>Güvenli ödeme</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
