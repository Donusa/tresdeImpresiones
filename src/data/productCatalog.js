import products from '../assets/Productos/precios.json';
import { photoGroupsForProduct } from './productOptions.js';

const productImages = import.meta.glob('../assets/Productos/*.{jpeg,jpg,png,webp}', {
  eager: true,
  import: 'default',
});

export { products };

function imageByFilename(filename) {
  return Object.entries(productImages).find(([path]) => path.endsWith(`/${filename}`))?.[1];
}

export function variantsForProduct(product, { thumbnails = false } = {}) {
  if (Array.isArray(product.Fotos) && product.Fotos.length > 0) {
    return photoGroupsForProduct(product).map(({ files, ...variant }) => {
      const images = files.map((filename) => {
        const thumbnail = thumbnails && product.Fotos.find((photo) => photo.Archivo === filename)?.Miniatura;
        return imageByFilename(thumbnail || filename) ?? imageByFilename(filename);
      }).filter(Boolean);
      return { ...variant, images, image: images[0] };
    });
  }

  const legacyImage = Object.entries(productImages).find(([path]) => path.includes(`/${product.Nombre}.`))?.[1];
  return legacyImage ? [{ color: null, hex: null, images: [legacyImage], image: legacyImage }] : [];
}

export function imageForProduct(name, options) {
  const product = products.find((catalogProduct) => catalogProduct.Nombre === name);
  return product ? variantsForProduct(product, options)[0]?.image : undefined;
}
