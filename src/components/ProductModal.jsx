import React, { memo, useLayoutEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { variantsForProduct } from '../data/productCatalog';
import { selectionForProduct, sizesForProduct } from '../data/productOptions';
import QuantitySelector from './QuantitySelector';
import AddToCartButton from './AddToCartButton';
import ProductColorSelector from './ProductColorSelector';
import ProductSizeSelector from './ProductSizeSelector';
import ProductImageGallery from './ProductImageGallery';

function ProductModal({ product, initialSelection = {}, onAddToCart, onClose }) {
  const variants = variantsForProduct(product);
  const [selectedColor, setSelectedColor] = useState(initialSelection.color ?? variants[0]?.color ?? null);
  const [selectedSize, setSelectedSize] = useState(initialSelection.size ?? sizesForProduct(product)[0]?.Nombre ?? null);
  const [imageIndex, setImageIndex] = useState(initialSelection.imageIndex ?? 0);
  const selectedVariant = variants.find((variant) => variant.color === selectedColor) ?? variants[0];
  const { price } = selectionForProduct(product, selectedColor, selectedSize);
  const [quantity, setQuantity] = useState(initialSelection.quantity ?? 1);
  const dialogRef = useRef(null);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const body = document.body;
    const properties = ['position', 'top', 'left', 'width', 'overflow', 'paddingRight'];
    const previousStyles = Object.fromEntries(properties.map((property) => [property, body.style[property]]));
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const paddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    Object.assign(body.style, {
      position: 'fixed', top: `-${scrollY}px`, left: `-${scrollX}px`, width: '100%',
      overflow: 'hidden', paddingRight: `${paddingRight + scrollbarWidth}px`,
    });
    // Native modal dialogs make the background inert and contain keyboard focus.
    dialog.showModal();
    return () => {
      dialog.close();
      Object.assign(body.style, previousStyles);
      window.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' });
      const focusTarget = previousFocus?.isConnected && previousFocus !== body
        ? previousFocus
        : document.getElementById(`producto-${product.Nombre}`)?.querySelector('button');
      focusTarget?.focus({ preventScroll: true });
    };
  }, [product.Nombre]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-3 text-gray-900 backdrop:bg-gray-950/65 open:grid open:place-items-center sm:p-4"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const controls = [...event.currentTarget.querySelectorAll('button:not(:disabled), input:not(:disabled), [tabindex="0"]')];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="relative grid h-[min(44rem,calc(100dvh-1.5rem))] w-full max-w-4xl grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-3xl bg-white shadow-2xl md:h-[min(42rem,calc(100dvh-2rem))] md:grid-cols-[1.08fr_0.92fr] md:grid-rows-[minmax(0,1fr)_auto]">
        <button autoFocus type="button" onClick={onClose} className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-sm transition hover:bg-primary-50 hover:text-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600" aria-label="Cerrar detalle del producto">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <ProductImageGallery images={selectedVariant?.images} productName={product.Nombre} color={selectedColor} imageIndex={imageIndex} onImageChange={setImageIndex} className="h-[min(28dvh,16rem)] md:row-span-2 md:h-full md:min-h-0" />
        <div className="min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-7 md:pt-16">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700">Detalle del producto</p>
          <h2 id="product-modal-title" className="mt-3 break-words text-3xl font-black tracking-tight text-gray-950">{product.Nombre}</h2>
          <div className="mt-5 space-y-5">
            <ProductColorSelector variants={variants} selectedColor={selectedColor} onChange={(color) => { setSelectedColor(color); setImageIndex(0); }} />
            <ProductSizeSelector sizes={sizesForProduct(product)} selectedSize={selectedSize} onChange={setSelectedSize} />
          </div>
          <p id="product-modal-description" className="mt-5 text-sm leading-6 text-gray-600">{product.Descripcion}</p>
        </div>
          <div className="isolate border-t border-primary-100 bg-white p-5 [transform:translateZ(0)] sm:p-7">
            <p className="text-2xl font-bold text-primary-700" aria-live="polite">${price.toLocaleString('es-AR')} <span className="text-xs font-medium text-gray-500">por unidad</span></p>
            <div className="mt-4 flex items-center gap-3">
              <QuantitySelector label={`Cantidad de ${product.Nombre}`} value={quantity} onChange={setQuantity} />
              <AddToCartButton onAdd={() => onAddToCart(product, quantity, selectedColor, selectedSize)} label={quantity > 1 ? `Agregar ${quantity} unidades` : 'Agregar al carrito'} />
            </div>
          </div>
      </div>
    </dialog>
  );
}

export default memo(ProductModal);
