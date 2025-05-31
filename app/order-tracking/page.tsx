"use client"

import type React from "react"

import { useState } from "react"
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [orderData, setOrderData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (orderNumber === "SAN2024001") {
        setOrderData({
          orderNumber: "SAN2024001",
          status: "delivered",
          items: [
            { name: "Şanlı Gül Buketi", quantity: 1, price: 199.99 },
            { name: "Pembe Orkide", quantity: 1, price: 349.99 },
          ],
          total: 549.98,
          timeline: [
            { status: "ordered", date: "2024-01-15 10:30", completed: true },
            { status: "preparing", date: "2024-01-15 11:00", completed: true },
            { status: "shipped", date: "2024-01-15 14:30", completed: true },
            { status: "delivered", date: "2024-01-15 16:45", completed: true },
          ],
        })
      } else {
        setOrderData(null)
      }
      setIsLoading(false)
    }, 1500)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ordered":
        return <Package className="w-6 h-6" />
      case "preparing":
        return <Clock className="w-6 h-6" />
      case "shipped":
        return <Truck className="w-6 h-6" />
      case "delivered":
        return <CheckCircle className="w-6 h-6" />
      default:
        return <Package className="w-6 h-6" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "ordered":
        return "Sipariş Alındı"
      case "preparing":
        return "Hazırlanıyor"
      case "shipped":
        return "Kargoya Verildi"
      case "delivered":
        return "Teslim Edildi"
      default:
        return "Bilinmiyor"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">📦 Sipariş Takibi</h1>
              <p className="text-lg text-gray-600">Sipariş numaranız ve e-posta adresinizle siparişinizi takip edin</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <form onSubmit={handleTrackOrder} className="space-y-6">
                <div>
                  <Label htmlFor="orderNumber" className="text-gray-700 mb-2 block">
                    Sipariş Numarası
                  </Label>
                  <Input
                    id="orderNumber"
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Örn: SAN2024001"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 mb-2 block">
                    E-posta Adresi
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg"
                >
                  {isLoading ? (
                    <>
                      <Search className="w-5 h-5 mr-2 animate-spin" />
                      Aranıyor...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Siparişi Takip Et
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Test için:</strong> Sipariş numarası olarak "SAN2024001" yazın
                </p>
              </div>
            </div>

            {orderData && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Sipariş #{orderData.orderNumber}</h2>
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Teslim Edildi
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Sipariş Durumu</h3>
                  <div className="space-y-4">
                    {orderData.timeline.map((step, index) => (
                      <div key={step.status} className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-full ${step.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
                        >
                          {getStatusIcon(step.status)}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${step.completed ? "text-gray-800" : "text-gray-400"}`}>
                            {getStatusText(step.status)}
                          </p>
                          <p className={`text-sm ${step.completed ? "text-gray-600" : "text-gray-400"}`}>{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Sipariş Detayları</h3>
                  <div className="space-y-3">
                    {orderData.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">Adet: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-gray-800">₺{item.price}</p>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                      <p className="text-lg font-bold text-gray-800">Toplam</p>
                      <p className="text-lg font-bold text-emerald-600">₺{orderData.total}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {orderNumber && email && !orderData && !isLoading && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">❌</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sipariş Bulunamadı</h3>
                <p className="text-gray-600">
                  Girdiğiniz bilgilere ait bir sipariş bulunamadı. Lütfen bilgilerinizi kontrol edin.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
