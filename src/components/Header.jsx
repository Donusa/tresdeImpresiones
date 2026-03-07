import React, { useState } from 'react';
import { Menu, X, Printer } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="#" className="flex items-center group">
              <div className="relative w-16 h-16 -my-4 overflow-hidden flex items-center justify-center">
                <img src="/logo.png" alt="TresDe Impresiones Logo" className="h-full w-auto object-contain scale-150 transform transition-transform group-hover:scale-[1.6]" />
              </div>
              <span className="text-xl font-bold text-gray-900 ml-2">tresde Impresiones</span>
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-gray-700 hover:text-primary-600 transition-colors">Inicio</a>
            <a href="#servicios" className="text-gray-700 hover:text-primary-600 transition-colors">Servicios</a>
            <a href="#proyectos" className="text-gray-700 hover:text-primary-600 transition-colors">Proyectos</a>
            <a href="#contacto" className="text-gray-700 hover:text-primary-600 transition-colors">Contacto</a>
          </nav>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a 
              href="#inicio" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </a>
            <a 
              href="#servicios" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </a>
            <a 
              href="#proyectos" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Proyectos
            </a>
            <a 
              href="#contacto" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
