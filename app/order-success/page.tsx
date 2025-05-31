"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, Package, Truck, Phone, Mail } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"

export default function OrderSuccessPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const order = searchParams.get("order")
    if (order) {
      setOrderNumber(order)
    } else {
      router.push("/")
    }
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">🎉 Siparişiniz Alındı!</h1>

              <p className="text-lg text-gray-600 mb-6">
                Teşekkür ederiz! Siparişiniz başarıyla oluşturuldu ve en kısa sürede hazırlanacak.
              </p>

              {orderNumber && (
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Sipariş Numaranız</h2>
                  <p className="text-2xl font-bold text-emerald-600">{orderNumber}</p>
                  <p className="text-sm text-gray-500 mt-2">Bu numarayı sipariş takibi için saklayın</p>
                </div>
              )}
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Sonraki Adımlar</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">E-posta Onayı</h3>
                    <p className="text-gray-600 text-sm">Sipariş detaylarınızı e-posta adresinize gönderdik</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Package className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">Sipariş Hazırlığı</h3>
                    <p className="text-gray-600 text-sm">Çiçekleriniz özenle hazırlanıyor (1-2 saat)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-800">Teslimat</h3>
                    <p className="text-gray-600 text-sm">Aynı gün teslimat için kurye yola çıkacak</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-emerald-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4">📞 Sorularınız mı var?</h3>
              <p className="text-emerald-700 mb-4">
                Sipariş durumunuz hakkında bilgi almak için bizimle iletişime geçin
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => window.open("tel:+908505326651")}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  0850 532 66 51
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/order-tracking")}
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Sipariş Takibi
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Ana Sayfaya Dön
              </Button>

              <Button onClick={() => router.push("/products")} className="bg-emerald-500 hover:bg-emerald-600">
                Alışverişe Devam Et
              </Button>
            </div>

            {/* Estimated Delivery */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-700 font-medium">🚚 Tahmini Teslimat: Bugün 16:00 - 20:00 arası</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
