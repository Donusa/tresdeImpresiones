// Repeated colors share a gallery; omitted colors belong to the base finish.
export function photoGroupsForProduct(product) {
  const groups = new Map();
  for (const photo of product.Fotos ?? []) {
    const color = photo.Color || null;
    if (!groups.has(color)) {
      groups.set(color, { color, hex: photo.Hex, secondaryHex: photo.HexSecundario, files: [] });
    }
    if (photo.Archivo) groups.get(color).files.push(photo.Archivo);
  }
  return [...groups.values()];
}

export function sizesForProduct(product) {
  return product.Tamanos ?? [];
}

export function selectionForProduct(product, color = null, size = null) {
  const groups = photoGroupsForProduct(product);
  const selectedColor = color ?? groups[0]?.color ?? null;
  if (selectedColor !== null && !groups.some((group) => group.color === selectedColor)) return null;
  const sizes = sizesForProduct(product);
  const selectedSize = size ?? sizes[0]?.Nombre ?? null;
  const sizeOption = sizes.find((option) => option.Nombre === selectedSize);
  if (selectedSize !== null && !sizeOption) return null;
  return {
    color: selectedColor,
    size: selectedSize,
    price: Number(sizeOption?.Precio ?? product.Precio),
  };
}

export function minimumPriceForProduct(product) {
  const sizes = sizesForProduct(product);
  return sizes.length ? Math.min(...sizes.map((size) => Number(size.Precio ?? product.Precio))) : Number(product.Precio);
}
