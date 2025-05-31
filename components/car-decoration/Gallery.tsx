"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const galleryImages = [
    {
      id: 1,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Düğün Arabası Süsleme",
      category: "Düğün",
      title: "Klasik Beyaz Gül Süsleme",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Nişan Arabası Süsleme",
      category: "Nişan",
      title: "Pembe Güller ve Tül",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Kına Gecesi Süsleme",
      category: "Kına",
      title: "Kırmızı Güller ve Altın Detay",
    },
    {
      id: 4,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Premium Araba Süsleme",
      category: "Premium",
      title: "Lüks Orkide Aranjmanı",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Gelin Arabası",
      category: "Düğün",
      title: "Gelin Arabası Özel Tasarım",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Damat Arabası",
      category: "Düğün",
      title: "Damat Arabası Süsleme",
    },
    {
      id: 7,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Sünnet Düğünü",
      category: "Sünnet",
      title: "Mavi Tema Süsleme",
    },
    {
      id: 8,
      src: "/placeholder.svg?height=400&width=600",
      alt: "Yıldönümü Süsleme",
      category: "Özel",
      title: "Romantik Yıldönümü",
    },
  ]

  const categories = ["Tümü", "Düğün", "Nişan", "Kına", "Premium", "Sünnet", "Özel"]
  const [activeCategory, setActiveCategory] = useState("Tümü")

  const filteredImages =
    activeCategory === "Tümü" ? galleryImages : galleryImages.filter((img) => img.category === activeCategory)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1)
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">📸 Çalışmalarımızdan Örnekler</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Daha önce gerçekleştirdiğimiz araba süsleme projelerinden bazı örnekler
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full ${
                activeCategory === category
                  ? "bg-purple-500 hover:bg-purple-600"
                  : "border-purple-500 text-purple-600 hover:bg-purple-50"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => openLightbox(index)}
            >
              <div className="relative h-64">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
                <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-semibold">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.category}</p>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">{image.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <Image
                src={filteredImages[selectedImage].src || "/placeholder.svg"}
                alt={filteredImages[selectedImage].alt}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain"
              />

              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2"
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Navigation */}
              <Button
                variant="ghost"
                size="sm"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">{filteredImages[selectedImage].title}</h3>
                <p className="text-sm opacity-90">{filteredImages[selectedImage].category}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
