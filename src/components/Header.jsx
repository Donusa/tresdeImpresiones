import React, { useEffect, useRef, useState } from 'react';
import { Menu, Minus, Plus, Search, ShoppingCart, Trash2, Truck, X } from 'lucide-react';
import { orderWhatsAppUrl } from '../data/contact';
import { cartItemKey } from '../data/cartStorage';

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
];

function CartDropdown({ items, onAdd, onClear, onClose, onRemove }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const checkoutUrl = orderWhatsAppUrl(items);
  return (
    <section className="absolute right-0 top-[calc(100%+0.65rem)] w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl shadow-gray-300/40" aria-label="Carrito de compras">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h2 className="font-bold text-gray-900">Tu carrito</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{itemCount} {itemCount === 1 ? 'unidad' : 'unidades'}</span>
          {items.length > 0 && (
            <button type="button" onClick={onClear} className="inline-flex items-center gap-1 text-xs font-bold text-red-600 transition hover:text-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2" aria-label="Vaciar todo el carrito">
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />Vaciar
            </button>
          )}
        </div>
      </div>
      {items.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary-50 text-primary-600"><ShoppingCart className="h-5 w-5" /></div>
          <p className="mt-4 font-semibold text-gray-900">Tu carrito está vacío</p>
          <p className="mt-1 text-sm leading-6 text-gray-500">Los productos que agregues aparecerán acá.</p>
          <a href="#comprar" onClick={onClose} className="mt-5 inline-flex text-sm font-semibold text-primary-700 hover:text-primary-900">Ir a comprar</a>
        </div>
      ) : (
        <ul className="max-h-72 divide-y divide-gray-100 overflow-y-auto px-5">
          {items.map((item) => (
            <li key={cartItemKey(item.name, item.color, item.size)} className="flex items-center justify-between gap-3 py-4">
              <div className="min-w-0">
                <p className="truncate font-semibold capitalize text-gray-900">{item.name}</p>
                {item.color && <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.12em] text-primary-700">Color {item.color}</p>}
                {item.size && <p className="mt-0.5 text-xs font-semibold text-gray-600">Tamaño: {item.size}</p>}
                <p className="mt-0.5 text-sm text-gray-500">${item.price.toLocaleString('es-AR')} c/u</p>
                {item.quantity > 1 && <p className="mt-1 text-xs font-bold text-primary-700">Subtotal: ${(item.price * item.quantity).toLocaleString('es-AR')}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button type="button" onClick={() => onRemove(item.name, item.color, item.size)} className="grid h-7 w-7 place-items-center rounded-full border border-primary-200 text-primary-700 transition hover:bg-primary-50" aria-label={`Quitar una unidad de ${item.name}${item.color ? `, color ${item.color}` : ''}${item.size ? `, tamaño ${item.size}` : ''}`}><Minus className="h-3.5 w-3.5" /></button>
                <span className="w-5 text-center text-sm font-bold text-gray-900" aria-label={`${item.quantity} unidades`}>{item.quantity}</span>
                <button type="button" onClick={() => onAdd({ Nombre: item.name }, 1, item.color, item.size)} className="grid h-7 w-7 place-items-center rounded-full bg-primary-600 text-white transition hover:bg-primary-700" aria-label={`Agregar una unidad de ${item.name}${item.color ? `, color ${item.color}` : ''}${item.size ? `, tamaño ${item.size}` : ''}`}><Plus className="h-3.5 w-3.5" /></button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
        <div className="flex items-center justify-between text-sm font-semibold text-gray-900"><span>Total</span><span>${total.toLocaleString('es-AR')}</span></div>
        {items.length > 0 ? (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              onClose();
              window.setTimeout(onClear, 0);
            }}
            className="mt-4 block w-full rounded-lg bg-primary-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Finalizar compra por WhatsApp
          </a>
        ) : (
          <button disabled className="mt-4 w-full cursor-not-allowed rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white opacity-45">Finalizar compra por WhatsApp</button>
        )}
      </div>
    </section>
  );
}

function ProductSearch({ active, onChange, onClose, value }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (active) inputRef.current?.focus();
  }, [active]);

  return <div className={`product-search-morph__field relative ${active ? 'pointer-events-auto scale-100 opacity-100' : 'pointer-events-none scale-[0.97] opacity-0'}`}>
    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-600" aria-hidden="true" />
    <input ref={inputRef} tabIndex={active ? 0 : -1} type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Buscar productos..." className="h-10 w-full rounded-xl border border-primary-200 bg-primary-50/50 pl-9 pr-9 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100" />
    <button type="button" tabIndex={active ? 0 : -1} onClick={onClose} className="absolute right-1.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg text-gray-500 transition hover:bg-primary-100 hover:text-primary-800" aria-label="Cerrar búsqueda"><X className="h-4 w-4" /></button>
  </div>;
}

export default function Header({ items = [], isProductSearchOpen, onAdd, onClearCart, onCloseProductSearch, onOpenProductSearch, onProductSearchChange, onRemove, productSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(() => window.scrollY > 80);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    const updateHeader = () => setIsCompact(window.scrollY > 80);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsMenuOpen(false);
  };

  const openShopSearch = () => {
    onOpenProductSearch();
    setIsCartOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-sm ${isCompact ? 'site-header--compact' : ''}`}>
      <div className="site-header__promo flex h-12 items-center justify-center overflow-hidden bg-primary-800 px-4 text-center text-white sm:h-10">
        <div className="flex items-center gap-2.5 text-xs font-semibold leading-tight tracking-wide sm:text-sm">
          <Truck className="h-4 w-4 shrink-0 text-primary-200" aria-hidden="true" />
          <p className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span>Envíos a todo el país</span>
            <span className="hidden text-primary-300 sm:inline" aria-hidden="true">•</span>
            <span>Envío gratis en compras superiores a $60.000</span>
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="site-header__main flex h-16 items-center justify-between gap-4">
          <a href="#inicio" className="group flex shrink-0 items-center" aria-label="TresDe Impresiones — Ir al inicio">
            <div className="site-header__logo relative flex h-16 w-16 items-center justify-center overflow-hidden"><img src="/logo.png" alt="TresDe Impresiones" className="h-full w-auto scale-150 object-contain transition-transform group-hover:scale-[1.6]" /></div>
            <span className="site-header__brand ml-2 flex flex-col gap-1 text-gray-900" aria-hidden="true">
              <span className="site-header__brand-name text-2xl font-black leading-none tracking-[0.08em]">TRES<span className="text-primary-600">DE</span></span>
              <span className="site-header__brand-subtitle text-[10px] font-semibold leading-none tracking-[0.23em]">IMPRESIONES</span>
            </span>
          </a>

          <nav className="site-header__nav hidden min-w-0 flex-1 items-center justify-end gap-6 md:flex" aria-label="Navegación principal">
            {links.map((link) => <a key={link.href} href={link.href} onClick={onCloseProductSearch} className="whitespace-nowrap text-gray-700 transition-colors hover:text-primary-600">{link.label}</a>)}
            <div className={`product-search-morph relative shrink-0 overflow-hidden ${isProductSearchOpen ? 'w-72' : 'w-[4.75rem]'}`}>
              <ProductSearch active={isProductSearchOpen} onChange={onProductSearchChange} onClose={onCloseProductSearch} value={productSearch} />
              <button type="button" tabIndex={isProductSearchOpen ? -1 : 0} onClick={openShopSearch} className={`product-search-morph__button absolute inset-0 h-10 whitespace-nowrap text-gray-700 transition-colors hover:text-primary-600 ${isProductSearchOpen ? 'pointer-events-none scale-95 opacity-0' : 'pointer-events-auto scale-100 opacity-100'}`}>Comprar</button>
            </div>
            <button onClick={toggleCart} className="relative rounded-full p-2 text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700" aria-label={`Carrito, ${cartCount} productos`} aria-expanded={isCartOpen}>
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              {cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary-600 px-1 text-xs font-bold text-white">{cartCount}</span>}
            </button>
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <button onClick={toggleCart} className="relative rounded-full p-2 text-gray-700 hover:text-primary-600" aria-label={`Carrito, ${cartCount} productos`} aria-expanded={isCartOpen}>
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              {cartCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary-600 px-1 text-xs font-bold text-white">{cartCount}</span>}
            </button>
            <button onClick={() => { setIsMenuOpen(!isMenuOpen); setIsCartOpen(false); }} className="rounded-full p-2 text-gray-700 hover:text-primary-600 focus:outline-none" aria-expanded={isMenuOpen} aria-label="Abrir menú">{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
          </div>
        </div>
      </div>

      <div className={`overflow-hidden border-t border-transparent transition-[max-height,opacity] duration-500 ease-out md:hidden ${isProductSearchOpen ? 'max-h-20 border-primary-100 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        <div className="px-4 py-3 sm:px-6"><ProductSearch active={isProductSearchOpen} onChange={onProductSearchChange} onClose={onCloseProductSearch} value={productSearch} /></div>
      </div>
      {isCartOpen && <CartDropdown items={items} onAdd={onAdd} onClear={onClearCart} onClose={() => setIsCartOpen(false)} onRemove={onRemove} />}
      {isMenuOpen && <div className="border-t bg-white md:hidden"><nav className="space-y-1 px-2 pb-3 pt-2" aria-label="Navegación móvil">
        {links.map((link) => <a key={link.href} href={link.href} className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600" onClick={() => setIsMenuOpen(false)}>{link.label}</a>)}
        <button type="button" className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600" onClick={openShopSearch}>Comprar</button>
      </nav></div>}
    </header>
  );
}
