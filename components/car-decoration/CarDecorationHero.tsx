"use client"

import { Calendar, Phone, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CarDecorationHero() {
  const scrollToBooking = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 text-white py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-6xl">🚗</div>
        <div className="absolute top-40 right-32 text-4xl">💐</div>
        <div className="absolute bottom-32 left-40 text-5xl">🌹</div>
        <div className="absolute bottom-20 right-20 text-3xl">💒</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                ÖZEL GÜNLERİNİZ İÇİN
                <span className="block text-yellow-300">ARABA SÜSLEME</span>
              </h1>
              <p className="text-xl md:text-2xl opacity-90">
                Düğün, nişan, kına gecesi için profesyonel araba süsleme hizmeti
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-lg">4.9/5 (127 Değerlendirme)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={scrollToBooking}
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Calendar className="w-5 h-5 mr-2" />
                RANDEVU AL
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-4 rounded-full"
                onClick={() => window.open("tel:+908505326651")}
              >
                <Phone className="w-5 h-5 mr-2" />
                HEMEN ARA
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-2xl mb-2">🎨</div>
                <p className="text-sm">Özel Tasarım</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <p className="text-sm">Hızlı Hizmet</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">💯</div>
                <p className="text-sm">%100 Memnuniyet</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Araba Süsleme"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white rounded-full opacity-10 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
