import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "Finally, an app that understands us! I can manage my expenses without calling my children every time. It's given me back my independence.",
    name: "Margaret Wilson",
    title: "Retired Teacher, 75",
    image: "https://images.unsplash.com/photo-1447005497901-b3e9ee359928?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    quote: "KindKeeper helps me keep track of all my medical bills and appointments. The large text and simple design make it so easy to use.",
    name: "Robert Johnson",
    title: "Former Engineer, 82",
    image: "https://images.unsplash.com/photo-1559963043-3d19915bec6b?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    quote: "My children feel more at ease knowing I can manage my finances independently. The reminders for bills are a lifesaver!",
    name: "Patricia Brown",
    title: "Retired Nurse, 78",
    image: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section className="relative py-32 overflow-hidden" id="testimonials">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-900" />
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto">
          <Card variant="dark" className="relative overflow-hidden">
            <div className="relative p-8">
              <Quote className="absolute -top-4 -left-4 w-12 h-12 text-[#FF6B2C] opacity-50 transform -scale-x-100" />
              <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-28 h-28 rounded-full mx-auto mb-8 object-cover border-4 border-[#FF6B2C] shadow-lg"
                />
                <blockquote className="text-2xl text-white/90 italic mb-8 text-center px-8">
                  {testimonials[currentIndex].quote}
                </blockquote>
                <div className="text-center">
                  <p className="text-xl font-semibold text-[#FF6B2C]">{testimonials[currentIndex].name}</p>
                  <p className="text-white/60">{testimonials[currentIndex].title}</p>
                </div>
              </div>

              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-[#FF6B2C] w-6' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-slate-800/90 p-2 rounded-full shadow-lg text-[#FF6B2C] hover:text-[#FF4F2C] transition-colors duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-slate-800/90 p-2 rounded-full shadow-lg text-[#FF6B2C] hover:text-[#FF4F2C] transition-colors duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}