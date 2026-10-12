import { photoGroupsForProduct, selectionForProduct } from './productOptions.js';

const cartKey = 'tresde.cart.v1';

export function cartItemKey(name, color = null, size = null) {
  return JSON.stringify([name, color ?? null, size ?? null]);
}

export function readCart(products, storage) {
  try {
    const targetStorage = storage ?? window.localStorage;
    const saved = JSON.parse(targetStorage.getItem(cartKey));
    if (!Array.isArray(saved)) {
      saveCart([], targetStorage);
      return [];
    }
    // Only restore available products and use their current catalog prices.
    const restoredItems = products.flatMap((product) => {
      const availableColors = new Set(photoGroupsForProduct(product).map((group) => group.color));
      const validItems = saved.filter((item) => (
        item?.name === product.Nombre
        && Number.isSafeInteger(item.quantity)
        && item.quantity > 0
        && (availableColors.size === 0 ? !item.color : availableColors.has(item.color ?? null))
      ));
      const grouped = new Map();
      validItems.forEach((item) => {
        // Older carts predate sizes; resolve those lines to the default size.
        const selection = selectionForProduct(product, item.color, item.size);
        if (!selection) return;
        const key = cartItemKey(product.Nombre, selection.color, selection.size);
        const quantity = (grouped.get(key)?.quantity ?? 0) + item.quantity;
        if (!Number.isSafeInteger(quantity)) return;
        grouped.set(key, {
          name: product.Nombre,
          price: selection.price,
          quantity,
          ...(selection.color ? { color: selection.color } : {}),
          ...(selection.size ? { size: selection.size } : {}),
        });
      });
      return [...grouped.values()];
    });
    // Persist the sanitized cart immediately so discontinued products and options
    // do not remain in browser storage after the catalog changes.
    saveCart(restoredItems, targetStorage);
    return restoredItems;
  } catch {
    return [];
  }
}

export function saveCart(items, storage) {
  try {
    (storage ?? window.localStorage).setItem(cartKey, JSON.stringify(items.map(({ name, quantity, color, size }) => ({ name, quantity, ...(color ? { color } : {}), ...(size ? { size } : {}) }))));
  } catch {
    // The in-memory cart remains usable when browser storage is unavailable.
  }
}
