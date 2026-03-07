import React from 'react';
import { Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Contact() {
  const whatsappLink = "https://wa.me/2234219772";

  return (
    <section id="contacto" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">Contacto</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            ¿Listo para imprimir tu proyecto?
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Contáctanos directamente por WhatsApp para cotizaciones y consultas.
          </p>
        </div>

        <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-1">
          <div className="bg-gray-50 rounded-lg p-8 shadow-sm text-center">
            <h3 className="text-lg font-medium text-gray-900">Información de contacto</h3>
            <p className="mt-4 text-gray-500">
              Estamos disponibles para responder tus dudas y ofrecerte asesoría personalizada.
            </p>
            
            <dl className="mt-8 space-y-6 flex flex-col items-center">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p>+54 223 421-9772</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-3 text-base text-gray-500">
                  <p>Buenos Aires, Argentina</p>
                </div>
              </div>
            </dl>

            <div className="mt-10">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-[#25D366] hover:bg-[#128C7E] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <MessageCircle className="mr-2 h-6 w-6" />
                Chatear por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
