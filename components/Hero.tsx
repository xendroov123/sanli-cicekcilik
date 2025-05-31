"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Sparkles, Gift, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "SEVDİKLERİNE",
      subtitle: "EN TAZE SÜRPRİZLERİ YAP!",
      description: "Özel günlerinizi unutulmaz kılacak taze çiçekler ve hediyeler",
      image: "/placeholder.svg?height=400&width=600",
      buttonText: "ALIŞVERİŞE BAŞLA",
      bgColor: "from-rose-400 to-pink-500",
    },
    {
      title: "AYNI GÜN TESLİMAT",
      subtitle: "HER YERİN KOKUSU ÇIÇEK OLSUN",
      description: "Türkiye'nin her yerine aynı gün teslimat imkanı",
      image: "/placeholder.svg?height=400&width=600",
      buttonText: "HEMEN SİPARİŞ VER",
      bgColor: "from-emerald-400 to-green-500",
    },
    {
      title: "ÖZEL TASARIMLAR",
      subtitle: "SİZE ÖZEL ÇIÇEK ARANJMANLARI",
      description: "Profesyonel floristlerimizden özel tasarım çiçekler",
      image: "/placeholder.svg?height=400&width=600",
      buttonText: "TASARIMLARI KEŞFET",
      bgColor: "from-purple-400 to-indigo-500",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[500px] md:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
            }`}
          >
            <div className={`h-full bg-gradient-to-r ${slide.bgColor} relative`}>
              <div className="container mx-auto px-4 h-full">
                <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                  {/* Content */}
                  <div className="text-white space-y-6 z-10 relative">
                    <div className="space-y-2">
                      <h2 className="text-4xl md:text-6xl font-bold leading-tight">{slide.title}</h2>
                      <h3 className="text-2xl md:text-4xl font-semibold italic">{slide.subtitle}</h3>
                    </div>

                    <p className="text-lg md:text-xl opacity-90 max-w-md">{slide.description}</p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        size="lg"
                        className="bg-white text-gray-800 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        {slide.buttonText}
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className="border-white text-white hover:bg-white hover:text-gray-800 font-semibold px-8 py-4 rounded-full"
                      >
                        <Gift className="w-5 h-5 mr-2" />
                        HEDİYE PAKETLEME
                      </Button>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-6 pt-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Truck className="w-5 h-5" />
                        <span>Ücretsiz Kargo</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Sparkles className="w-5 h-5" />
                        <span>Taze Garanti</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Gift className="w-5 h-5" />
                        <span>Hediye Paketi</span>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative">
                    <div className="relative z-10">
                      <img
                        src={slide.image || "/placeholder.svg"}
                        alt="Çiçek Aranjmanı"
                        className="w-full h-auto max-w-lg mx-auto drop-shadow-2xl"
                      />
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-10 right-10 w-20 h-20 bg-white/20 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 text-6xl">🌸</div>
                <div className="absolute top-40 right-32 text-4xl">🌺</div>
                <div className="absolute bottom-32 left-40 text-5xl">🌷</div>
                <div className="absolute bottom-20 right-20 text-3xl">🌹</div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="sm"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white rounded-full p-3"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white rounded-full p-3"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
