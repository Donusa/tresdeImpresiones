import React, { useId } from 'react';
import { Check } from 'lucide-react';

export default function ProductColorSelector({ compact = false, inline = false, onChange, selectedColor, variants }) {
  const groupName = useId();
  const colors = variants.filter((variant) => variant.color);
  if (!colors.length) return null;

  return (
    <fieldset className={inline ? 'product-option-row' : undefined}>
      <legend className={inline ? 'product-option-row__label' : compact ? 'sr-only' : 'mb-3 text-sm font-bold text-gray-900'}>
        {inline ? <>Color<span className="sr-only">: {selectedColor}</span></> : compact ? 'Elegir color' : <>Color: <span className="font-semibold text-primary-700">{selectedColor}</span></>}
      </legend>
      <div className={`flex flex-wrap ${inline ? 'gap-1' : compact ? 'gap-1.5' : 'gap-2.5'}`}>
        {colors.map((variant) => {
          const selected = variant.color === selectedColor;
          return (
            <label key={variant.color} className="relative z-20 shrink-0 cursor-pointer" title={variant.color}>
              <input
                type="radio"
                name={groupName}
                value={variant.color}
                checked={selected}
                onChange={() => onChange(variant.color)}
                className="peer sr-only"
                aria-label={`Color ${variant.color}`}
              />
              <span
                className={`grid place-items-center rounded-full border bg-white transition peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-600 ${compact ? 'h-7 w-7' : 'h-10 w-10'} ${selected ? 'border-gray-950 ring-2 ring-white ring-offset-2 ring-offset-primary-200' : 'border-gray-300 hover:scale-105 hover:border-gray-500'}`}
              >
                <span className={`grid place-items-center rounded-full border border-black/10 ${compact ? 'h-[1.15rem] w-[1.15rem]' : 'h-7 w-7'}`} style={{ background: variant.secondaryHex ? `linear-gradient(135deg, ${variant.hex} 50%, ${variant.secondaryHex} 50%)` : variant.hex }}>
                  {selected && <Check className={`${compact ? 'h-3 w-3' : 'h-4 w-4'} ${['Crema', 'Blanca', 'Amarilla'].includes(variant.color) ? 'text-gray-950' : 'text-white drop-shadow'}`} strokeWidth={3} aria-hidden="true" />}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
