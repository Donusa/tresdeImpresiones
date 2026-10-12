import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductImageGallery({ compact = false, fit = compact ? 'cover' : 'contain', images = [], productName, color, imageIndex = 0, onImageChange, onOpen, className = '' }) {
  const index = imageIndex >= 0 && imageIndex < images.length ? imageIndex : 0;
  const alt = `${productName}${color ? ` en color ${color}` : ''}${images.length > 1 ? `, foto ${index + 1} de ${images.length}` : ''}`;
  const picture = images[index]
    ? <img key={images[index]} src={images[index]} alt={alt} className={`product-variant-image absolute inset-0 h-full w-full object-center ${fit === 'cover' ? 'object-cover' : 'object-contain'}`} />
    : <div className="grid h-full place-items-center text-sm font-semibold text-primary-700">Imagen no disponible</div>;
  const navigate = (direction) => onImageChange((index + direction + images.length) % images.length);

  return (
    <div
      className={`product-gallery relative overflow-hidden bg-primary-50 ${compact ? 'product-gallery--compact' : ''} ${className}`}
      role="group"
      aria-label={`Fotos de ${productName}`}
      onKeyDown={(event) => {
        if (images.length < 2 || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        navigate(event.key === 'ArrowLeft' ? -1 : 1);
      }}
    >
      {compact && fit === 'contain' && images[index] && <div className="product-gallery__backdrop" style={{ backgroundImage: `url("${images[index]}")` }} aria-hidden="true" />}
      {onOpen ? <button type="button" onClick={onOpen} className="block h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-600" aria-label={`Ver detalle de ${productName}`}>{picture}</button> : picture}
      {images.length > 1 && <>
        <div className="product-gallery__navigation">
          <button type="button" onClick={() => navigate(-1)} className="product-gallery__arrow" aria-label={`Foto anterior de ${productName}`}><ChevronLeft aria-hidden="true" /></button>
          <button type="button" onClick={() => navigate(1)} className="product-gallery__arrow" aria-label={`Foto siguiente de ${productName}`}><ChevronRight aria-hidden="true" /></button>
        </div>
        <div className="product-gallery__pagination">
          <div className="product-gallery__progress" aria-hidden="true">
            {images.map((image, photoIndex) => <span key={`${image}-${photoIndex}`} className={photoIndex === index ? 'product-gallery__step product-gallery__step--active' : 'product-gallery__step'} />)}
          </div>
        </div>
        <span className="sr-only" aria-live="polite" aria-atomic="true">Foto {index + 1} de {images.length} de {productName}</span>
      </>}
    </div>
  );
}
