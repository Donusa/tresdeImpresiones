import React, { useEffect, useRef, useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';

export default function AddToCartButton({ onAdd, label = 'Agregar', className = '' }) {
  const [added, setAdded] = useState(false);
  const locked = useRef(false);
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleAdd = () => {
    // Guard immediately, including rapid clicks before React renders again.
    if (locked.current) return;
    locked.current = true;
    try {
      if (onAdd() === false) {
        locked.current = false;
        return;
      }
    } catch (error) {
      locked.current = false;
      throw error;
    }
    setAdded(true);
    timer.current = window.setTimeout(() => {
      locked.current = false;
      setAdded(false);
    }, 1600);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      aria-disabled={added}
      aria-label={added ? 'Agregado' : label}
      className={`add-to-cart inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${added ? 'add-to-cart--added cursor-default bg-emerald-700 focus-visible:ring-emerald-700' : 'bg-primary-600 hover:bg-primary-700 focus-visible:ring-primary-600'} ${className}`}
    >
      <span className="relative h-5 w-5 shrink-0" aria-hidden="true">
        <ShoppingBag className="add-to-cart__bag absolute inset-0 h-5 w-5" />
        <Check className="add-to-cart__check absolute inset-0 h-5 w-5" strokeWidth={2.5} />
      </span>
      <span className="grid" aria-hidden="true">
        <span className="add-to-cart__label col-start-1 row-start-1">{label}</span>
        <span className="add-to-cart__success col-start-1 row-start-1 self-center">Agregado</span>
      </span>
      <span className="sr-only" role="status">{added ? 'Agregado al carrito' : ''}</span>
    </button>
  );
}
