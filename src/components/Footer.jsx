import React from 'react';
import { Printer, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center">
              <div className="relative w-16 h-16 -my-4 overflow-hidden flex items-center justify-center">
                <img src="/logo.png" alt="TresDe Impresiones Logo" className="h-full w-auto object-contain scale-150 transform" />
              </div>
              <span className="text-xl font-bold ml-2">tresde Impresiones</span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Tu aliado en fabricación digital. Calidad, precisión y rapidez para todos tus proyectos de impresión 3D.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Navegación</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#inicio" className="text-base text-gray-300 hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-base text-gray-300 hover:text-white transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#proyectos" className="text-base text-gray-300 hover:text-white transition-colors">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-base text-gray-300 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Síguenos</h3>
            <div className="mt-4 flex space-x-6">
              <a href="https://www.instagram.com/tresde.impresiones/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} tresde Impresiones. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
