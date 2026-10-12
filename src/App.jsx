import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ProjectsCarousel from './components/ProjectsCarousel';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Shop from './components/Shop';
import ProductModal from './components/ProductModal';
import LoadingScreen from './components/LoadingScreen';
import { products } from './data/productCatalog';
import { cartItemKey, readCart, saveCart } from './data/cartStorage';
import { selectionForProduct } from './data/productOptions';

const storeViews = new Set(['comprar']);

function currentView() {
  const hash = window.location.hash.replace('#', '');
  return [...storeViews].some((view) => hash === view || hash.startsWith(`${view}/`)) ? 'comprar' : 'inicio';
}

function selectedProductFromHash() {
  const match = window.location.hash.match(/^#comprar\/([^/]+)$/);
  try {
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const finishLoading = useCallback(() => setIsLoading(false), []);
  const [view, setView] = useState(currentView);
  const [modalProduct, setModalProduct] = useState(() => products.find((product) => product.Nombre === selectedProductFromHash()) ?? null);
  const [modalSelection, setModalSelection] = useState({});
  const pendingSelection = useRef(null);
  const [cartItems, setCartItems] = useState(() => readCart(products));
  const [cartNotice, setCartNotice] = useState(null);
  const [isProductSearchOpen, setIsProductSearchOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  useEffect(() => saveCart(cartItems), [cartItems]);

  useEffect(() => {
    if (!cartNotice) return;
    const timer = window.setTimeout(() => setCartNotice(null), 3500);
    return () => window.clearTimeout(timer);
  }, [cartNotice]);

  const addToCart = useCallback((product, quantity = 1, color = null, size = null) => {
    const catalogProduct = products.find((entry) => entry.Nombre === product.Nombre);
    if (!catalogProduct) return false;
    const selection = selectionForProduct(catalogProduct, color, size);
    if (!selection) return false;
    const { color: selectedColor, size: selectedSize, price } = selection;
    const unitsToAdd = Math.max(1, Number.parseInt(quantity, 10) || 1);
    if (!Number.isSafeInteger(unitsToAdd)) return false;
    setCartItems((currentItems) => {
      const itemKey = cartItemKey(product.Nombre, selectedColor, selectedSize);
      const existingItem = currentItems.find((item) => cartItemKey(item.name, item.color, item.size) === itemKey);
      if (existingItem) {
        return currentItems.map((item) => cartItemKey(item.name, item.color, item.size) === itemKey ? { ...item, quantity: item.quantity + unitsToAdd } : item);
      }
      return [...currentItems, { name: product.Nombre, price, quantity: unitsToAdd, ...(selectedColor ? { color: selectedColor } : {}), ...(selectedSize ? { size: selectedSize } : {}) }];
    });
    setCartNotice({ message: `Agregaste ${unitsToAdd} ${unitsToAdd === 1 ? 'unidad' : 'unidades'} de ${product.Nombre}${selectedColor ? ` en color ${selectedColor}` : ''}${selectedSize ? `, tamaño ${selectedSize}` : ''} al carrito.` });
  }, []);

  const removeFromCart = (name, color = null, size = null) => {
    const itemKey = cartItemKey(name, color, size);
    setCartItems((currentItems) => currentItems.flatMap((item) => {
      if (cartItemKey(item.name, item.color, item.size) !== itemKey) return [item];
      return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [];
    }));
  };

  const clearCart = () => {
    setCartItems([]);
    setCartNotice(null);
  };

  const openProductSearch = () => {
    setIsProductSearchOpen(true);
    window.location.hash = 'comprar';
  };

  const openProduct = useCallback((product, selection = {}) => {
    setModalSelection(selection);
    const productHash = `#comprar/${encodeURIComponent(product.Nombre)}`;
    if (view === 'comprar') {
      if (window.location.hash !== productHash) window.history.pushState(null, '', productHash);
      setModalProduct(product);
      return;
    }
    pendingSelection.current = selection;
    window.location.hash = productHash;
  }, [view]);

  const closeProductModal = useCallback(() => {
    setModalProduct(null);
    if (selectedProductFromHash()) window.history.replaceState(null, '', '#comprar');
  }, []);

  const clearProductSearch = useCallback(() => setProductSearch(''), []);

  const closeProductSearch = () => {
    setIsProductSearchOpen(false);
    setProductSearch('');
  };

  useEffect(() => {
    let previousView = currentView();
    let scrollFrame;
    const updateView = () => {
      window.cancelAnimationFrame(scrollFrame);
      const nextView = currentView();
      const nextSelectedProduct = selectedProductFromHash();
      setModalSelection(pendingSelection.current ?? {});
      pendingSelection.current = null;
      setModalProduct(nextSelectedProduct ? products.find((product) => product.Nombre === nextSelectedProduct) ?? null : null);
      if (nextView === 'comprar' && previousView !== 'comprar' && !nextSelectedProduct) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      setView(nextView);
      if (nextView !== 'comprar') {
        closeProductSearch();
        const targetId = window.location.hash.slice(1);
        scrollFrame = requestAnimationFrame(() => {
          if (!targetId || targetId === 'inicio') window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          else document.getElementById(targetId)?.scrollIntoView();
        });
      }
      previousView = nextView;
    };
    updateView();
    window.addEventListener('hashchange', updateView);
    return () => {
      window.removeEventListener('hashchange', updateView);
      window.cancelAnimationFrame(scrollFrame);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {isLoading && <LoadingScreen onComplete={finishLoading} />}
      <Header items={cartItems} isProductSearchOpen={isProductSearchOpen} onAdd={addToCart} onClearCart={clearCart} onCloseProductSearch={closeProductSearch} onOpenProductSearch={openProductSearch} onProductSearchChange={setProductSearch} onRemove={removeFromCart} productSearch={productSearch} />
      {view === 'comprar' ? (
        <div key="comprar" className="page-transition page-transition--shop pt-12 sm:pt-10"><Shop onAddToCart={addToCart} onClearSearch={clearProductSearch} onSelectProduct={openProduct} productSearch={productSearch} /></div>
      ) : (
        <div key="inicio" className="page-transition page-transition--home pt-28 sm:pt-[6.5rem]">
          <main>
            <Hero />
            <Services />
            <ProjectsCarousel onSelectProduct={openProduct} />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
      <div role="status" aria-live="polite" aria-atomic="true" className="pointer-events-none fixed inset-x-4 bottom-6 z-[60] flex justify-center">
        {!modalProduct && cartNotice && <div className="flex max-w-md items-center gap-3 rounded-2xl border border-primary-200 bg-white px-5 py-4 text-sm font-semibold text-gray-900 shadow-lg"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />{cartNotice.message}</div>}
      </div>
      {modalProduct && <ProductModal key={modalProduct.Nombre} product={modalProduct} initialSelection={modalSelection} onAddToCart={addToCart} onClose={closeProductModal} />}
    </div>
  );
}

export default App;
