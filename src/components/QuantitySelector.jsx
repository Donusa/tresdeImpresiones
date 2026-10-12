import React from 'react';
import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ label, onChange, value }) {
  const updateQuantity = (nextValue) => {
    const parsedValue = Number.parseInt(nextValue, 10);
    onChange(Number.isFinite(parsedValue) ? Math.max(1, parsedValue) : 1);
  };

  return (
    <div className="inline-flex h-12 shrink-0 items-center rounded-xl border border-primary-200 bg-white p-1 focus-within:ring-2 focus-within:ring-primary-100" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => updateQuantity(value - 1)}
        disabled={value <= 1}
        className="grid h-9 w-8 place-items-center rounded-lg text-primary-600 transition hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed disabled:opacity-35"
        aria-label="Restar una unidad"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <input
        type="number"
        min="1"
        step="1"
        inputMode="numeric"
        value={value}
        onChange={(event) => updateQuantity(event.target.value)}
        className="h-9 w-9 appearance-none border-0 bg-transparent p-0 text-center text-sm font-semibold text-gray-950 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        aria-label="Cantidad"
      />
      <button
        type="button"
        onClick={() => updateQuantity(value + 1)}
        className="grid h-9 w-8 place-items-center rounded-lg text-primary-600 transition hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
        aria-label="Sumar una unidad"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
