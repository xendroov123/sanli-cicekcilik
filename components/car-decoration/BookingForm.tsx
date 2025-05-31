"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Clock, MapPin, Phone, User, Car, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function BookingForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    eventTime: "",
    location: "",
    carModel: "",
    package: "",
    specialRequests: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Randevu Talebiniz Alındı! 🎉",
        description: "En kısa sürede sizinle iletişime geçeceğiz.",
      })
      setIsSubmitting(false)
      setFormData({
        name: "",
        phone: "",
        email: "",
        eventType: "",
        eventDate: "",
        eventTime: "",
        location: "",
        carModel: "",
        package: "",
        specialRequests: "",
      })
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section id="booking-form" className="py-16 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📅 Randevu Alın</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Özel gününüz için araba süsleme randevusu almak çok kolay! Formu doldurun, sizinle iletişime geçelim.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">İletişim Bilgileri</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-500 p-3 rounded-full">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Telefon</p>
                      <p className="opacity-90">0850 532 66 51</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-purple-500 p-3 rounded-full">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Adres</p>
                      <p className="opacity-90">
                        Atatürk Mah. Çiçek Sok. No:123
                        <br />
                        Merkez/İstanbul
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-purple-500 p-3 rounded-full">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Çalışma Saatleri</p>
                      <p className="opacity-90">Pazartesi - Pazar: 08:00 - 22:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-semibold mb-4">💡 Önemli Notlar</h4>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>• Randevular en az 3 gün önceden alınmalıdır</li>
                  <li>• Düğün sezonu için 1 hafta önceden rezervasyon önerilir</li>
                  <li>• Süsleme işlemi 1-3 saat arasında sürmektedir</li>
                  <li>• Araç temiz ve kuru olmalıdır</li>
                  <li>• Özel isteklerinizi mutlaka belirtin</li>
                </ul>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white mb-2 block">
                      <User className="w-4 h-4 inline mr-2" />
                      Ad Soyad *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      placeholder="Adınız ve soyadınız"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white mb-2 block">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Telefon *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      placeholder="0555 123 45 67"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-white mb-2 block">
                    E-posta
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white mb-2 block">
                      <Heart className="w-4 h-4 inline mr-2" />
                      Etkinlik Türü *
                    </Label>
                    <Select value={formData.eventType} onValueChange={(value) => handleInputChange("eventType", value)}>
                      <SelectTrigger className="bg-white/20 border-white/30 text-white">
                        <SelectValue placeholder="Etkinlik seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dugun">Düğün</SelectItem>
                        <SelectItem value="nisan">Nişan</SelectItem>
                        <SelectItem value="kina">Kına Gecesi</SelectItem>
                        <SelectItem value="sunnet">Sünnet Düğünü</SelectItem>
                        <SelectItem value="yildonumu">Yıldönümü</SelectItem>
                        <SelectItem value="diger">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white mb-2 block">Paket Seçimi</Label>
                    <Select value={formData.package} onValueChange={(value) => handleInputChange("package", value)}>
                      <SelectTrigger className="bg-white/20 border-white/30 text-white">
                        <SelectValue placeholder="Paket seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="klasik">Klasik Paket - ₺299</SelectItem>
                        <SelectItem value="premium">Premium Paket - ₺499</SelectItem>
                        <SelectItem value="luks">Lüks Paket - ₺799</SelectItem>
                        <SelectItem value="ozel">Özel Teklif İstiyorum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventDate" className="text-white mb-2 block">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Etkinlik Tarihi *
                    </Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => handleInputChange("eventDate", e.target.value)}
                      className="bg-white/20 border-white/30 text-white"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="eventTime" className="text-white mb-2 block">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Süsleme Saati *
                    </Label>
                    <Input
                      id="eventTime"
                      type="time"
                      value={formData.eventTime}
                      onChange={(e) => handleInputChange("eventTime", e.target.value)}
                      className="bg-white/20 border-white/30 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-white mb-2 block">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Süsleme Adresi *
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    placeholder="Süsleme yapılacak adres"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="carModel" className="text-white mb-2 block">
                    <Car className="w-4 h-4 inline mr-2" />
                    Araç Modeli
                  </Label>
                  <Input
                    id="carModel"
                    value={formData.carModel}
                    onChange={(e) => handleInputChange("carModel", e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    placeholder="Örn: BMW 3.20i, Mercedes C180"
                  />
                </div>

                <div>
                  <Label htmlFor="specialRequests" className="text-white mb-2 block">
                    Özel İstekler
                  </Label>
                  <Textarea
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    placeholder="Özel renk tercihleri, tema, ek istekler..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-full text-lg"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Randevu Talebini Gönder"}
                </Button>

                <p className="text-sm opacity-75 text-center">
                  * Zorunlu alanlar. Randevu talebiniz 24 saat içinde onaylanacaktır.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
