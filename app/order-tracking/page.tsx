"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { formatPrice } from "@/lib/utils"

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [orderData, setOrderData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    const orderParam = searchParams.get("order")
    if (orderParam) {
      setOrderNumber(orderParam)
      handleTrackOrder(null, orderParam)
    }
  }, [searchParams])

  const handleTrackOrder = async (e: React.FormEvent | null, orderNum?: string) => {
    if (e) e.preventDefault()
    setIsLoading(true)

    const searchOrderNumber = orderNum || orderNumber

    try {
      const { data: order, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          order_items (
            id,
            product_name,
            product_image,
            quantity,
            price,
            total
          )
        `,
        )
        .eq("order_number", searchOrderNumber)
        .single()

      if (error || !order) {
        setOrderData(null)
      } else {
        // Create timeline based on order status
        const timeline = [
          {
            status: "pending",
            title: "Sipariş Alındı",
            date: new Date(order.created_at).toLocaleString("tr-TR"),
            completed: true,
          },
          {
            status: "confirmed",
            title: "Sipariş Onaylandı",
            date: order.status !== "pending" ? new Date(order.updated_at).toLocaleString("tr-TR") : null,
            completed: ["confirmed", "preparing", "shipped", "delivered"].includes(order.status),
          },
          {
            status: "preparing",
            title: "Hazırlanıyor",
            date: order.status === "preparing" ? new Date(order.updated_at).toLocaleString("tr-TR") : null,
            completed: ["preparing", "shipped", "delivered"].includes(order.status),
          },
          {
            status: "shipped",
            title: "Kargoya Verildi",
            date: order.status === "shipped" ? new Date(order.updated_at).toLocaleString("tr-TR") : null,
            completed: ["shipped", "delivered"].includes(order.status),
          },
          {
            status: "delivered",
            title: "Teslim Edildi",
            date:
              order.status === "delivered"
                ? new Date(order.delivered_at || order.updated_at).toLocaleString("tr-TR")
                : null,
            completed: order.status === "delivered",
          },
        ]

        setOrderData({
          ...order,
          timeline,
        })
      }
    } catch (error) {
      console.error("Error tracking order:", error)
      setOrderData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-6 h-6" />
      case "confirmed":
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

  const getOverallStatus = (status: string) => {
    switch (status) {
      case "pending":
        return { text: "Sipariş Alındı", color: "text-orange-600", bgColor: "bg-orange-100" }
      case "confirmed":
        return { text: "Sipariş Onaylandı", color: "text-blue-600", bgColor: "bg-blue-100" }
      case "preparing":
        return { text: "Hazırlanıyor", color: "text-yellow-600", bgColor: "bg-yellow-100" }
      case "shipped":
        return { text: "Kargoda", color: "text-blue-600", bgColor: "bg-blue-100" }
      case "delivered":
        return { text: "Teslim Edildi", color: "text-green-600", bgColor: "bg-green-100" }
      default:
        return { text: "Bilinmiyor", color: "text-gray-600", bgColor: "bg-gray-100" }
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
              <p className="text-lg text-gray-600">Sipariş numaranız ile siparişinizi takip edin</p>
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
                    placeholder="Örn: SAN1234567890"
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
            </div>

            {orderData && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Sipariş #{orderData.order_number}</h2>
                  <div
                    className={`inline-flex items-center px-4 py-2 ${getOverallStatus(orderData.status).bgColor} ${getOverallStatus(orderData.status).color} rounded-full`}
                  >
                    {getStatusIcon(orderData.status)}
                    <span className="ml-2 font-medium">{getOverallStatus(orderData.status).text}</span>
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
                            {step.title}
                          </p>
                          <p className={`text-sm ${step.completed ? "text-gray-600" : "text-gray-400"}`}>
                            {step.date || "Beklemede"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Details */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Sipariş Detayları</h3>

                  {/* Items */}
                  <div className="space-y-3 mb-6">
                    {orderData.order_items?.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product_image || "/placeholder.svg?height=50&width=50"}
                            alt={item.product_name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{item.product_name}</p>
                            <p className="text-sm text-gray-600">Adet: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium text-gray-800">{formatPrice(item.total)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ara Toplam</span>
                      <span>{formatPrice(orderData.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kargo</span>
                      <span>{formatPrice(orderData.shipping_amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">KDV</span>
                      <span>{formatPrice(orderData.tax_amount)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">Toplam</span>
                      <span className="text-lg font-bold text-emerald-600">{formatPrice(orderData.total_amount)}</span>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {orderData.shipping_address_text && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Teslimat Adresi</h4>
                      <p className="text-gray-600">{orderData.shipping_address_text}</p>
                      {orderData.phone && <p className="text-gray-600 mt-1">Tel: {orderData.phone}</p>}
                    </div>
                  )}
                </div>
              </div>
            )}

            {orderNumber && !orderData && !isLoading && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">❌</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sipariş Bulunamadı</h3>
                <p className="text-gray-600">
                  Girdiğiniz sipariş numarasına ait bir sipariş bulunamadı. Lütfen sipariş numaranızı kontrol edin.
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
