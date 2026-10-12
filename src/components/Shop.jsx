import React, { memo, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { products, variantsForProduct } from '../data/productCatalog';
import { minimumPriceForProduct, selectionForProduct, sizesForProduct } from '../data/productOptions';
import QuantitySelector from './QuantitySelector';
import AddToCartButton from './AddToCartButton';
import ProductColorSelector from './ProductColorSelector';
import ProductSizeSelector from './ProductSizeSelector';
import ProductImageGallery from './ProductImageGallery';

function Shop({ onAddToCart, onClearSearch, onSelectProduct, productSearch }) {
  const [sortBy, setSortBy] = useState('default');
  const [quantities, setQuantities] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedImages, setSelectedImages] = useState({});

  const setProductQuantity = (productName, quantity) => {
    setQuantities((current) => ({ ...current, [productName]: quantity }));
  };

  const addProduct = (product) => {
    const quantity = quantities[product.Nombre] ?? 1;
    const selection = selectionForProduct(product, selectedColors[product.Nombre], selectedSizes[product.Nombre]);
    if (onAddToCart(product, quantity, selection.color, selection.size) === false) return false;
    setProductQuantity(product.Nombre, 1);
  };
  const visibleProducts = useMemo(() => {
    const query = productSearch.trim().toLocaleLowerCase('es-AR');
    const matches = products.filter((product) => product.Nombre.toLocaleLowerCase('es-AR').includes(query));
    return [...matches].sort((first, second) => {
      if (sortBy === 'price-asc') return minimumPriceForProduct(first) - minimumPriceForProduct(second);
      if (sortBy === 'price-desc') return minimumPriceForProduct(second) - minimumPriceForProduct(first);
      return 0;
    });
  }, [productSearch, sortBy]);

  return (
    <main className="min-h-screen bg-[#fffaf5] pt-16">
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 border-b border-primary-100 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">Catálogo</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-950">Productos disponibles</h1>
              <p className="mt-3 text-sm leading-6 text-gray-600">Elegí color, tamaño y cantidad. Agregá todo desde acá.</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <label className="sr-only" htmlFor="sort-products">Ordenar productos</label>
              <select id="sort-products" value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-xl border border-primary-100 bg-white px-4 py-3 text-sm font-semibold text-gray-700 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100">
                <option value="default">Orden original</option>
                <option value="price-asc">Menor precio (desde)</option>
                <option value="price-desc">Mayor precio (desde)</option>
              </select>
            </div>
          </div>
          <p className="mb-6 mt-5 text-sm font-medium text-gray-500">{visibleProducts.length} de {products.length} productos</p>

          {visibleProducts.length > 0 ? <div className="grid gap-4">
            {visibleProducts.map((product) => {
              const variants = variantsForProduct(product, { thumbnails: true });
              const selection = selectionForProduct(product, selectedColors[product.Nombre], selectedSizes[product.Nombre]);
              const { color: selectedColor, size: selectedSize, price } = selection;
              const images = variants.find((variant) => variant.color === selectedColor)?.images ?? [];
              const imageIndex = selectedImages[product.Nombre] ?? 0;
              const quantity = quantities[product.Nombre] ?? 1;
              const sizes = sizesForProduct(product);
              const hasOptions = variants.some((variant) => variant.color) || sizes.length > 0;
              const openProduct = () => onSelectProduct(product, { ...selection, imageIndex, quantity });
              return (
                <article id={`producto-${product.Nombre}`} key={product.Nombre} aria-label={product.Nombre} className="shop-product relative isolate overflow-hidden rounded-2xl border border-primary-100 bg-white transition-colors duration-300 hover:border-primary-300 focus-within:border-primary-300">
                  <ProductImageGallery compact fit={product.AjusteImagen} images={images} productName={product.Nombre} color={selectedColor} imageIndex={imageIndex} onImageChange={(index) => setSelectedImages((current) => ({ ...current, [product.Nombre]: index }))} onOpen={openProduct} className="shop-product__image" />
                  <div className="shop-product__details">
                    <button type="button" onClick={openProduct} className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600">
                      <h3 className="text-base font-bold leading-snug text-gray-950 sm:text-lg">{product.Nombre}</h3>
                    </button>
                    <p className="mt-1 flex flex-wrap items-baseline gap-x-2 text-2xl font-bold tracking-tight text-primary-600" aria-live="polite">
                      <span>${price.toLocaleString('es-AR')}</span>
                      <span className="text-xs font-normal tracking-normal text-gray-500">por unidad</span>
                    </p>
                    {product.Resumen && <p className="mt-2 text-sm leading-5 text-gray-500">{product.Resumen}</p>}
                  </div>
                  <div className={`shop-product__options ${hasOptions ? '' : 'shop-product__options--single'}`}>
                    {hasOptions ? <>
                      <ProductColorSelector compact inline variants={variants} selectedColor={selectedColor} onChange={(color) => {
                        setSelectedColors((current) => ({ ...current, [product.Nombre]: color }));
                        setSelectedImages((current) => ({ ...current, [product.Nombre]: 0 }));
                      }} />
                      <ProductSizeSelector compact inline sizes={sizes} selectedSize={selectedSize} onChange={(size) => setSelectedSizes((current) => ({ ...current, [product.Nombre]: size }))} />
                    </> : <p className="text-sm text-gray-500">Modelo único</p>}
                  </div>
                  <div className="shop-product__purchase">
                    <p className="mb-2 text-xs font-semibold text-gray-600" aria-hidden="true">Cantidad</p>
                    <div className="flex items-center gap-2">
                      <QuantitySelector label={`Cantidad de ${product.Nombre}`} value={quantity} onChange={(nextQuantity) => setProductQuantity(product.Nombre, nextQuantity)} />
                      <AddToCartButton onAdd={() => addProduct(product)} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div> : <div className="rounded-2xl border border-dashed border-primary-300 bg-white px-6 py-16 text-center">
            <Search className="mx-auto h-7 w-7 text-primary-600" aria-hidden="true" />
            <h3 className="mt-4 text-lg font-bold text-gray-900">No encontramos ese producto</h3>
            <p className="mt-1 text-sm text-gray-600">Probá con otro nombre o revisá la búsqueda.</p>
            <button type="button" onClick={onClearSearch} className="mt-5 text-sm font-bold text-primary-700 hover:text-primary-900">Limpiar búsqueda</button>
          </div>}
        </div>
      </section>
    </main>
  );
}

export default memo(Shop);
