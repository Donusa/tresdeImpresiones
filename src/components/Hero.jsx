import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="relative bg-white pt-20 pb-16 overflow-hidden lg:pt-32 lg:pb-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Tus ideas hechas</span>{' '}
              <span className="block text-primary-600 xl:inline">realidad en 3D</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl lg:mx-0">
              Creamos figuras y piezas únicas a pequeña escala. Especialistas en impresión 3D y pintado artesanal para dar vida a tus personajes y proyectos.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  href="https://wa.me/2234219772"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10 transition-colors"
                >
                  Cotizar ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="#proyectos"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10 transition-colors"
                >
                  Ver proyectos
                </a>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-400 to-primary-100 rounded-2xl transform rotate-3 blur-lg opacity-30"></div>
            <img
              className="relative rounded-2xl shadow-xl w-full object-cover h-64 sm:h-72 md:h-96 lg:h-full"
              src="/display5.jpeg"
              alt="Figura 3D pintada a mano"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
