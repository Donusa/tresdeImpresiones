import React, { useId } from 'react';

export default function ProductSizeSelector({ compact = false, inline = false, sizes, selectedSize, onChange }) {
  const groupName = useId();
  if (!sizes.length) return null;

  return (
    <fieldset className={inline ? 'product-option-row relative z-20' : 'relative z-20'}>
      <legend className={inline ? 'product-option-row__label' : 'mb-2 text-sm font-bold text-gray-900'}>Tamaño</legend>
      <div className={`flex flex-wrap ${compact ? 'gap-1.5' : 'gap-2'}`}>
        {sizes.map((size) => (
          <label key={size.Nombre} className="cursor-pointer">
            <input type="radio" name={groupName} value={size.Nombre} checked={selectedSize === size.Nombre} onChange={() => onChange(size.Nombre)} className="peer sr-only" aria-label={`Tamaño ${size.Nombre}`} />
            <span className={`inline-flex min-h-9 items-center rounded-lg border px-3 py-2 text-xs font-semibold transition peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-600 ${selectedSize === size.Nombre ? 'border-primary-600 bg-primary-50 text-primary-800' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'}`}>
              {size.Nombre}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
