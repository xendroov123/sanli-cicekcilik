"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Mesajınız Gönderildi! 📧",
        description: "En kısa sürede size dönüş yapacağız.",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">📞 Bize Ulaşın</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sorularınız, önerileriniz veya özel istekleriniz için bizimle iletişime geçin
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">İletişim Bilgileri</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <Phone className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Telefon</h3>
                      <p className="text-gray-600">0850 532 66 51</p>
                      <p className="text-sm text-gray-500">7/24 Müşteri Hizmetleri</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <Mail className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">E-posta</h3>
                      <p className="text-gray-600">info@sanlicicek.com</p>
                      <p className="text-sm text-gray-500">24 saat içinde yanıt</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <MapPin className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Adres</h3>
                      <p className="text-gray-600">
                        Atatürk Mahallesi, Çiçek Sokak No:123
                        <br />
                        Merkez/İstanbul
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <Clock className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Çalışma Saatleri</h3>
                      <p className="text-gray-600">Pazartesi - Pazar</p>
                      <p className="text-gray-600">08:00 - 22:00</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 space-y-3">
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => window.open("https://wa.me/908505326651", "_blank")}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp ile Yaz
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                    onClick={() => window.open("tel:+908505326651")}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Hemen Ara
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Mesaj Gönder</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 mb-2 block">
                        Ad Soyad *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Adınız ve soyadınız"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-700 mb-2 block">
                        Telefon
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="0555 123 45 67"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 mb-2 block">
                      E-posta *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 mb-2 block">Konu *</Label>
                    <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Mesaj konusunu seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order">Sipariş Hakkında</SelectItem>
                        <SelectItem value="complaint">Şikayet</SelectItem>
                        <SelectItem value="suggestion">Öneri</SelectItem>
                        <SelectItem value="custom-order">Özel Sipariş</SelectItem>
                        <SelectItem value="car-decoration">Araba Süsleme</SelectItem>
                        <SelectItem value="other">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700 mb-2 block">
                      Mesajınız *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Mesajınızı buraya yazın..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg"
                  >
                    {isSubmitting ? (
                      "Gönderiliyor..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Mesajı Gönder
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">❓ Sıkça Sorulan Sorular</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Teslimat süresi ne kadar?</h3>
                    <p className="text-gray-600 text-sm">14:00'a kadar verilen siparişler aynı gün teslim edilir.</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Hangi şehirlere teslimat yapıyorsunuz?</h3>
                    <p className="text-gray-600 text-sm">Türkiye'nin tüm illerine teslimat yapıyoruz.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Ödeme seçenekleri nelerdir?</h3>
                    <p className="text-gray-600 text-sm">
                      Kredi kartı, banka kartı ve kapıda ödeme seçenekleri mevcuttur.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Özel tasarım sipariş verebilir miyim?</h3>
                    <p className="text-gray-600 text-sm">
                      Evet, özel tasarım siparişleriniz için bizimle iletişime geçin.
                    </p>
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
