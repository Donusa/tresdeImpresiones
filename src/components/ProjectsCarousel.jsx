import React from 'react';
import { imageForProduct, products } from '../data/productCatalog';
import { minimumPriceForProduct, sizesForProduct } from '../data/productOptions';

export default function ProjectsCarousel({ onSelectProduct }) {
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
        <div className="flex w-max animate-scroll hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {/* Original set */}
          <div className="flex space-x-8 px-4">
            {products.map((product) => (
              <ProjectCard key={`original-${product.Nombre}`} product={product} onSelect={onSelectProduct} />
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex space-x-8 px-4">
            {products.map((product) => (
              <ProjectCard key={`duplicate-${product.Nombre}`} product={product} onSelect={onSelectProduct} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ product, onSelect }) {
  const image = imageForProduct(product.Nombre, { thumbnails: true });
  const preserveFullImage = product.AjusteImagen === 'contain';

  return (
    <button type="button" onClick={() => onSelect(product)} aria-label={`Ver detalle de ${product.Nombre}`} className="w-80 flex-shrink-0 group relative overflow-hidden rounded-lg bg-white text-left shadow-lg transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-600">
      <div className="relative h-64 overflow-hidden bg-primary-50">
        {image ? <>
          {preserveFullImage && <div className="product-gallery__backdrop" style={{ backgroundImage: `url("${image}")` }} aria-hidden="true" />}
          <img src={image} alt={product.Nombre} className={`relative h-full w-full object-center ${preserveFullImage ? 'object-contain' : 'object-cover'}`} />
        </> : <div className="grid h-full place-items-center text-sm font-semibold text-primary-700">Imagen no disponible</div>}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900">{product.Nombre}</h3>
        <p className="mt-2 text-xl font-black text-primary-700">{sizesForProduct(product).length > 1 && <span className="text-sm font-medium">Desde </span>}${minimumPriceForProduct(product).toLocaleString('es-AR')}</p>
      </div>
    </button>
  );
}
