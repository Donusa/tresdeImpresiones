import React from 'react';

const projects = [
  // Modelos - Proceso creativo
  {
    id: 1,
    title: 'Modelo 3D - Concepto',
    image: '/model1.jpeg',
    description: 'Diseño y modelado digital de personajes'
  },
  {
    id: 2,
    title: 'Modelado Orgánico',
    image: '/model2.jpeg',
    description: 'Creación de formas complejas y detalladas'
  },
  {
    id: 3,
    title: 'Esculpido Digital',
    image: '/model3.jpeg',
    description: 'Proceso de detallado en alta resolución'
  },
  {
    id: 4,
    title: 'Diseño de Personajes',
    image: '/model4.jpeg',
    description: 'Modelado 3D listo para impresión'
  },
  {
    id: 5,
    title: 'Preparación para Impresión',
    image: '/model5.jpeg',
    description: 'Optimización de malla para manufactura aditiva'
  },
  {
    id: 6,
    title: 'Renderizado Previo',
    image: '/model6.jpeg',
    description: 'Visualización del modelo antes de imprimir'
  },
  // Display - Trabajos terminados
  {
    id: 7,
    title: 'Figura Terminada',
    image: '/display1.jpeg',
    description: 'Impresión y post-procesado completo'
  },
  {
    id: 8,
    title: 'Pintado Artesanal',
    image: '/display2.jpeg',
    description: 'Acabado a mano con máximo detalle'
  },
  {
    id: 9,
    title: 'Coleccionable',
    image: '/display3.jpeg',
    description: 'Pieza única para exhibición'
  },
  {
    id: 10,
    title: 'Miniatura Detallada',
    image: '/display4.jpeg',
    description: 'Alta resolución en pequeña escala'
  },
  {
    id: 11,
    title: 'Proyecto Personalizado',
    image: '/display5.jpeg',
    description: 'Realización a medida según requerimientos'
  },
  {
    id: 12,
    title: 'Acabado Profesional',
    image: '/display6.jpeg',
    description: 'Técnicas de pintura y texturizado'
  },
   {
    id: 13,
    title: 'Figura de Acción',
    image: '/display7.jpeg',
    description: 'Personaje articulado y pintado'
  },
  {
    id: 14,
    title: 'Diorama',
    image: '/display8.jpeg',
    description: 'Escenografía y ambientación completa'
  }
];

export default function ProjectsCarousel() {
  return (
    <section id="proyectos" className="py-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center">
          Nuestros Trabajos
        </h2>
        <p className="mt-4 text-xl text-gray-500 text-center">
          Explora algunos de los proyectos que hemos realizado con pasión y precisión.
        </p>
      </div>

      <div className="relative w-full">
        <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
          {/* Original set */}
          <div className="flex space-x-8 px-4">
            {projects.map((project) => (
              <ProjectCard key={`original-${project.id}`} project={project} />
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex space-x-8 px-4">
            {projects.map((project) => (
              <ProjectCard key={`duplicate-${project.id}`} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="w-80 flex-shrink-0 group relative rounded-lg overflow-hidden shadow-lg bg-white transition-transform hover:-translate-y-1">
      <div className="aspect-w-16 aspect-h-9 h-64 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
        <p className="mt-2 text-sm text-gray-600">{project.description}</p>
      </div>
    </div>
  );
}
