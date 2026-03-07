import React from 'react';
import { Layers, Palette, PenTool, Gift } from 'lucide-react';

const services = [
  {
    title: 'Impresión FDM',
    description: 'Impresión de alta calidad para piezas únicas, decorativas y funcionales en diversos materiales.',
    icon: Layers,
  },
  {
    title: 'Pintado Artesanal',
    description: 'Damos vida a tus figuras con acabados detallados y pintura a mano profesional. Cada pieza es única.',
    icon: Palette,
  },
  {
    title: 'Diseño y Modelado',
    description: 'Creamos modelos digitales desde cero o adaptamos diseños existentes para materializar tus ideas.',
    icon: PenTool,
  },
  {
    title: 'Figuras Personalizadas',
    description: 'Especialistas en figuras de colección, miniaturas y regalos personalizados a pequeña escala.',
    icon: Gift,
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">Nuestros Servicios</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Soluciones integrales en 3D
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Servicios artesanales y personalizados con atención al detalle.
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                <service.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{service.title}</h3>
              <p className="mt-2 text-base text-gray-500 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
