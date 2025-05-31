"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Database } from "@/lib/database.types"

type Category = Database["public"]["Tables"]["categories"]["Row"]

interface CategorySliderProps {
  categories: Category[]
}

export default function CategorySlider({ categories }: CategorySliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const itemsPerView = 6
  const maxIndex = Math.max(0, categories.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  // Default icons for categories if not provided
  const defaultIcons: Record<string, string> = {
    "Doğum Günü": "🎂",
    Orkide: "🌺",
    Ayçiçeği: "🌻",
    "Yeni İş/Terfi": "🎉",
    "Sevgiliye Çiçek": "💕",
    "Çiçek Sepeti": "🧺",
    "Yeni Bebek": "👶",
    "Saksı Çiçekleri": "🪴",
    "İndirimli Çiçekler": "🏷️",
    "Geçmiş Olsun": "🤗",
    Güller: "🌹",
    "Dekoratif Çiçekler": "🎨",
  }

  // Default background colors for categories
  const bgColors = [
    "bg-pink-100",
    "bg-purple-100",
    "bg-yellow-100",
    "bg-blue-100",
    "bg-red-100",
    "bg-green-100",
    "bg-blue-100",
    "bg-emerald-100",
    "bg-orange-100",
    "bg-teal-100",
    "bg-rose-100",
    "bg-indigo-100",
  ]

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
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="flex-shrink-0 w-1/6 min-w-[140px]"
                >
                  <div className="group cursor-pointer">
                    <div
                      className={`${bgColors[index % bgColors.length]} rounded-2xl p-4 mb-3 transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg`}
                    >
                      <div className="relative">
                        <div className="w-full h-20 bg-white/50 rounded-lg flex items-center justify-center">
                          {category.image_url ? (
                            <Image
                              src={category.image_url || "/placeholder.svg"}
                              alt={category.name}
                              width={80}
                              height={80}
                              className="object-contain"
                            />
                          ) : (
                            <div className="text-3xl">{category.icon || defaultIcons[category.name] || "🌸"}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-center text-sm font-medium text-gray-700 group-hover:text-emerald-600 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </Link>
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
