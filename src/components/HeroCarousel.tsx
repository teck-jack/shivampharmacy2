"use client"

import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const images = [
  "slide1.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "khali.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "hajmabootiposter.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "slide3.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "slide4.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
]

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full overflow-hidden">
      {/* 👇 Responsive height added here */}
      <div className="relative w-full h-[45vh] sm:h-[65vh] md:h-[80vh] aspect-auto">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-contain sm:object-cover"
              loading="lazy"
            />


          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-2 sm:p-3 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-2 sm:p-3 rounded-full transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-6 bg-white" : "w-2 bg-white/50"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroCarousel
