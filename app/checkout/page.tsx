"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCartStore } from "@/store/cart"
import { formatPrice } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [user, setUser] = useState(null)
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()

  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    notes: "",
  })

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    paymentMethod: "credit-card",
  })

  useEffect(() => {
    // Check if cart is empty
    if (items.length === 0) {
      router.push("/cart")
      return
    }

    // Get user data
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        setShippingData((prev) => ({
          ...prev,
          firstName: user.user_metadata?.first_name || "",
          lastName: user.user_metadata?.last_name || "",
          email: user.email || "",
          phone: user.user_metadata?.phone || "",
        }))
      }
    }

    getUser()
  }, [items, router, supabase])

  const subtotal = getTotalPrice()
  const shipping = subtotal > 100 ? 0 : 15
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep(2)
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(async () => {
      try {
        // Create order in database (simplified)
        const orderNumber = `SAN${Date.now()}`

        toast({
          title: "Ödeme Başarılı! 🎉",
          description: `Sipariş numaranız: ${orderNumber}`,
        })

        clearCart()
        router.push(`/order-success?order=${orderNumber}`)
      } catch (error) {
        toast({
          title: "Ödeme Hatası",
          description: "Bir hata oluştu, lütfen tekrar deneyin.",
          variant: "destructive",
        })
      } finally {
        setIsProcessing(false)
      }
    }, 3000)
  }

  const handleInputChange = (section: string, field: string, value: string) => {
    if (section === "shipping") {
      setShippingData((prev) => ({ ...prev, [field]: value }))
    } else {
      setPaymentData((prev) => ({ ...prev, [field]: value }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/cart")}
              className="flex items-center gap-1 text-gray-600"
            >
              <ArrowLeft className="w-4 h-4" />
              Sepete Dön
            </Button>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
              <div className={`flex items-center ${currentStep >= 1 ? "text-emerald-600" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-emerald-600 text-white" : "bg-gray-300"}`}
                >
                  1
                </div>
                <span className="ml-2 font-medium">Teslimat Bilgileri</span>
              </div>

              <div className={`w-16 h-1 ${currentStep >= 2 ? "bg-emerald-600" : "bg-gray-300"}`}></div>

              <div className={`flex items-center ${currentStep >= 2 ? "text-emerald-600" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-emerald-600 text-white" : "bg-gray-300"}`}
                >
                  2
                </div>
                <span className="ml-2 font-medium">Ödeme</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">📍 Teslimat Bilgileri</h2>

                  <form onSubmit={handleShippingSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-gray-700 mb-2 block">
                          Ad *
                        </Label>
                        <Input
                          id="firstName"
                          value={shippingData.firstName}
                          onChange={(e) => handleInputChange("shipping", "firstName", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="lastName" className="text-gray-700 mb-2 block">
                          Soyad *
                        </Label>
                        <Input
                          id="lastName"
                          value={shippingData.lastName}
                          onChange={(e) => handleInputChange("shipping", "lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-gray-700 mb-2 block">
                          E-posta *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingData.email}
                          onChange={(e) => handleInputChange("shipping", "email", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-gray-700 mb-2 block">
                          Telefon *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={shippingData.phone}
                          onChange={(e) => handleInputChange("shipping", "phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-gray-700 mb-2 block">
                        Adres *
                      </Label>
                      <Textarea
                        id="address"
                        value={shippingData.address}
                        onChange={(e) => handleInputChange("shipping", "address", e.target.value)}
                        placeholder="Mahalle, sokak, bina no, daire no"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-gray-700 mb-2 block">
                          İl *
                        </Label>
                        <Select
                          value={shippingData.city}
                          onValueChange={(value) => handleInputChange("shipping", "city", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="İl seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="istanbul">İstanbul</SelectItem>
                            <SelectItem value="ankara">Ankara</SelectItem>
                            <SelectItem value="izmir">İzmir</SelectItem>
                            <SelectItem value="bursa">Bursa</SelectItem>
                            <SelectItem value="antalya">Antalya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="district" className="text-gray-700 mb-2 block">
                          İlçe *
                        </Label>
                        <Input
                          id="district"
                          value={shippingData.district}
                          onChange={(e) => handleInputChange("shipping", "district", e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="postalCode" className="text-gray-700 mb-2 block">
                          Posta Kodu
                        </Label>
                        <Input
                          id="postalCode"
                          value={shippingData.postalCode}
                          onChange={(e) => handleInputChange("shipping", "postalCode", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes" className="text-gray-700 mb-2 block">
                        Sipariş Notu
                      </Label>
                      <Textarea
                        id="notes"
                        value={shippingData.notes}
                        onChange={(e) => handleInputChange("shipping", "notes", e.target.value)}
                        placeholder="Özel istekleriniz, teslimat notları..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg"
                    >
                      Ödemeye Geç
                    </Button>
                  </form>
                </div>
              )}

              {currentStep === 2 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">💳 Ödeme Bilgileri</h2>

                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div>
                      <Label className="text-gray-700 mb-2 block">Ödeme Yöntemi</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div
                          className={`border-2 rounded-lg p-4 cursor-pointer ${paymentData.paymentMethod === "credit-card" ? "border-emerald-500 bg-emerald-50" : "border-gray-200"}`}
                          onClick={() => handleInputChange("payment", "paymentMethod", "credit-card")}
                        >
                          <CreditCard className="w-6 h-6 mb-2 text-emerald-600" />
                          <p className="font-medium">Kredi Kartı</p>
                        </div>

                        <div
                          className={`border-2 rounded-lg p-4 cursor-pointer ${paymentData.paymentMethod === "debit-card" ? "border-emerald-500 bg-emerald-50" : "border-gray-200"}`}
                          onClick={() => handleInputChange("payment", "paymentMethod", "debit-card")}
                        >
                          <CreditCard className="w-6 h-6 mb-2 text-emerald-600" />
                          <p className="font-medium">Banka Kartı</p>
                        </div>

                        <div
                          className={`border-2 rounded-lg p-4 cursor-pointer ${paymentData.paymentMethod === "cash-on-delivery" ? "border-emerald-500 bg-emerald-50" : "border-gray-200"}`}
                          onClick={() => handleInputChange("payment", "paymentMethod", "cash-on-delivery")}
                        >
                          <Truck className="w-6 h-6 mb-2 text-emerald-600" />
                          <p className="font-medium">Kapıda Ödeme</p>
                        </div>
                      </div>
                    </div>

                    {paymentData.paymentMethod !== "cash-on-delivery" && (
                      <>
                        <div>
                          <Label htmlFor="cardName" className="text-gray-700 mb-2 block">
                            Kart Üzerindeki İsim *
                          </Label>
                          <Input
                            id="cardName"
                            value={paymentData.cardName}
                            onChange={(e) => handleInputChange("payment", "cardName", e.target.value)}
                            placeholder="JOHN DOE"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="cardNumber" className="text-gray-700 mb-2 block">
                            Kart Numarası *
                          </Label>
                          <Input
                            id="cardNumber"
                            value={paymentData.cardNumber}
                            onChange={(e) => handleInputChange("payment", "cardNumber", e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate" className="text-gray-700 mb-2 block">
                              Son Kullanma Tarihi *
                            </Label>
                            <Input
                              id="expiryDate"
                              value={paymentData.expiryDate}
                              onChange={(e) => handleInputChange("payment", "expiryDate", e.target.value)}
                              placeholder="MM/YY"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="cvv" className="text-gray-700 mb-2 block">
                              CVV *
                            </Label>
                            <Input
                              id="cvv"
                              value={paymentData.cvv}
                              onChange={(e) => handleInputChange("payment", "cvv", e.target.value)}
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex items-center gap-4">
                      <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                        Geri Dön
                      </Button>

                      <Button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg"
                      >
                        {isProcessing ? (
                          "İşleniyor..."
                        ) : (
                          <>
                            <Shield className="w-5 h-5 mr-2" />
                            Ödemeyi Tamamla
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Sipariş Özeti</h3>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">Adet: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-800">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 border-t border-gray-200 pt-4">
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

                  <div className="flex justify-between">
                    <span className="text-gray-600">KDV</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Toplam</span>
                      <span className="text-emerald-600">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Security Info */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Güvenli Ödeme</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">256-bit SSL şifreleme ile korunmaktadır</p>
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
