"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CategorySlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const categories = [
    { name: "Doğum Günü", icon: "🎂", image: "/placeholder.svg?height=80&width=80", color: "bg-pink-100" },
    { name: "Orkide", icon: "🌺", image: "/placeholder.svg?height=80&width=80", color: "bg-purple-100" },
    { name: "Ayçiçeği", icon: "🌻", image: "/placeholder.svg?height=80&width=80", color: "bg-yellow-100" },
    { name: "Yeni İş/Terfi", icon: "🎉", image: "/placeholder.svg?height=80&width=80", color: "bg-blue-100" },
    { name: "Sevgiliye Çiçek", icon: "💕", image: "/placeholder.svg?height=80&width=80", color: "bg-red-100" },
    { name: "Çiçek Sepeti", icon: "🧺", image: "/placeholder.svg?height=80&width=80", color: "bg-green-100" },
    { name: "Yeni Bebek", icon: "👶", image: "/placeholder.svg?height=80&width=80", color: "bg-blue-100" },
    { name: "Saksı Çiçekleri", icon: "🪴", image: "/placeholder.svg?height=80&width=80", color: "bg-emerald-100" },
    { name: "İndirimli Çiçekler", icon: "🏷️", image: "/placeholder.svg?height=80&width=80", color: "bg-orange-100" },
    { name: "Geçmiş Olsun", icon: "🤗", image: "/placeholder.svg?height=80&width=80", color: "bg-teal-100" },
    { name: "Güller", icon: "🌹", image: "/placeholder.svg?height=80&width=80", color: "bg-rose-100" },
    { name: "Dekoratif Çiçekler", icon: "🎨", image: "/placeholder.svg?height=80&width=80", color: "bg-indigo-100" },
  ]

  const itemsPerView = 6
  const maxIndex = Math.max(0, categories.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Categories Container */}
          <div className="overflow-hidden mx-12">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-4"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {categories.map((category, index) => (
                <div key={index} className="flex-shrink-0 w-1/6 min-w-[140px]">
                  <div className="group cursor-pointer">
                    <div
                      className={`${category.color} rounded-2xl p-4 mb-3 transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg`}
                    >
                      <div className="relative">
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-3xl">
                          {category.icon}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-center text-sm font-medium text-gray-700 group-hover:text-emerald-600 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? "bg-emerald-500 scale-125" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
