import test from 'node:test';
import assert from 'node:assert/strict';
import { cartItemKey, readCart, saveCart } from '../src/data/cartStorage.js';
import { orderWhatsAppUrl, whatsappUrl } from '../src/data/contact.js';

const products = [{ Nombre: 'prod1', Precio: 1000 }, { Nombre: 'prod2', Precio: 1200 }];
const productsWithColors = [{
  Nombre: 'Silla Bristol', Precio: 16500,
  Fotos: [{ Color: 'Roja' }, { Color: 'Turquesa' }],
}];
const memoryStorage = (initial = null) => {
  let data = initial;
  return { getItem: () => data, setItem: (_key, value) => { data = value; } };
};

test('restores quantities with current catalog prices and persists clearing', () => {
  const storage = memoryStorage();
  saveCart([{ name: 'prod1', price: 500, quantity: 3 }], storage);
  assert.deepEqual(readCart(products, storage), [{ name: 'prod1', price: 1000, quantity: 3 }]);
  saveCart([], storage);
  assert.deepEqual(readCart(products, storage), []);
});

test('ignores unavailable products and invalid quantities in saved carts', () => {
  const storage = memoryStorage(JSON.stringify([
    null, { name: 'removed', quantity: 2 }, { name: 'prod2', quantity: -1 },
    { name: 'prod2', quantity: 1.5 }, { name: 'prod2', quantity: '3' },
    { name: 'prod1', quantity: 2 }, { name: 'prod1', quantity: 1 },
  ]));
  assert.deepEqual(readCart(products, storage), [{ name: 'prod1', price: 1000, quantity: 3 }]);
  assert.deepEqual(
    readCart([...products, { Nombre: 'removed', Precio: 9999 }], storage),
    [{ name: 'prod1', price: 1000, quantity: 3 }],
    'unavailable products are also removed from persisted storage',
  );
});

test('malformed or unavailable browser storage never breaks shopping', () => {
  for (const value of ['broken JSON', '{}', 'null']) {
    assert.deepEqual(readCart(products, memoryStorage(value)), []);
  }
  const deniedStorage = {
    getItem() { throw new Error('Storage denied'); },
    setItem() { throw new Error('Storage full'); },
  };
  assert.deepEqual(readCart(products, deniedStorage), []);
  assert.doesNotThrow(() => saveCart([], deniedStorage));
});

test('persists and restores product colors as separate cart items', () => {
  const storage = memoryStorage();
  saveCart([
    { name: 'Silla Bristol', price: 1, quantity: 2, color: 'Roja' },
    { name: 'Silla Bristol', price: 1, quantity: 1, color: 'Turquesa' },
  ], storage);
  assert.deepEqual(readCart(productsWithColors, storage), [
    { name: 'Silla Bristol', price: 16500, quantity: 2, color: 'Roja' },
    { name: 'Silla Bristol', price: 16500, quantity: 1, color: 'Turquesa' },
  ]);
});

test('WhatsApp order preserves special characters, quantities and totals', () => {
  const url = new URL(orderWhatsAppUrl([
    { name: 'Pieza & edición #1', price: 1000, quantity: 3 },
    { name: 'prod2', price: 1200, quantity: 2 },
  ]));
  const message = url.searchParams.get('text');
  assert.equal(url.origin + url.pathname, whatsappUrl());
  assert.ok(message.includes('Pieza & edición #1'));
  assert.ok(message.includes('Cantidad: 3'));
  assert.ok(message.includes('Precio unitario: $1.000'));
  assert.ok(message.includes('Subtotal: $2.400'));
  assert.ok(message.endsWith('Total del pedido: $5.400'));
});

test('WhatsApp order includes the selected color', () => {
  const url = new URL(orderWhatsAppUrl([
    { name: 'Silla Bristol', color: 'Turquesa', price: 16500, quantity: 1 },
  ]));
  assert.ok(url.searchParams.get('text').includes('Color: Turquesa'));
});

const productsWithSizes = [{
  ...productsWithColors[0],
  Tamanos: [{ Nombre: '11 cm', Precio: 16500 }, { Nombre: '9 cm', Precio: 13500 }, { Nombre: '7 cm', Precio: 9500 }],
}, {
  Nombre: 'Bristol', Precio: 10000,
  Fotos: [{ Archivo: 'bristol-1.jpeg' }, { Archivo: 'bristol-2.jpeg' }],
  Tamanos: [{ Nombre: 'Mini', Precio: 10000 }, { Nombre: 'Grande', Precio: 20000 }],
}];

test('restores colors and sizes separately, groups duplicates, and uses each current size price', () => {
  const storage = memoryStorage();
  saveCart([
    { name: 'Silla Bristol', color: 'Roja', size: '7 cm', quantity: 2, price: 1 },
    { name: 'Silla Bristol', color: 'Roja', size: '7 cm', quantity: 1, price: 1 },
    { name: 'Silla Bristol', color: 'Roja', size: '9 cm', quantity: 1, price: 1 },
    { name: 'Silla Bristol', color: 'Turquesa', size: '7 cm', quantity: 1, price: 1 },
    { name: 'Bristol', size: 'Grande', quantity: 2, price: 1 },
  ], storage);
  assert.deepEqual(readCart(productsWithSizes, storage), [
    { name: 'Silla Bristol', color: 'Roja', size: '7 cm', quantity: 3, price: 9500 },
    { name: 'Silla Bristol', color: 'Roja', size: '9 cm', quantity: 1, price: 13500 },
    { name: 'Silla Bristol', color: 'Turquesa', size: '7 cm', quantity: 1, price: 9500 },
    { name: 'Bristol', size: 'Grande', quantity: 2, price: 20000 },
  ]);
  assert.notEqual(cartItemKey('Silla Bristol', 'Roja', '7 cm'), cartItemKey('Silla Bristol', 'Roja', '9 cm'));
});

test('migrates old cart lines to the default size and removes unavailable options', () => {
  const storage = memoryStorage(JSON.stringify([
    { name: 'Silla Bristol', color: 'Roja', quantity: 2 },
    { name: 'Silla Bristol', color: 'Roja', size: 'Retirada', quantity: 1 },
    { name: 'Silla Bristol', color: 'Retirado', size: '7 cm', quantity: 1 },
    { name: 'Bristol', color: 'Inventado', size: 'Mini', quantity: 1 },
    { name: 'Bristol', size: 'Mini', quantity: 1 },
  ]));
  const expected = [
    { name: 'Silla Bristol', color: 'Roja', size: '11 cm', quantity: 2, price: 16500 },
    { name: 'Bristol', size: 'Mini', quantity: 1, price: 10000 },
  ];
  assert.deepEqual(readCart(productsWithSizes, storage), expected);
  assert.deepEqual(readCart(productsWithSizes, storage), expected);
});

test('WhatsApp order includes size, optional color, and totals at the selected prices', () => {
  const message = new URL(orderWhatsAppUrl([
    { name: 'Silla Bristol', color: 'Azul', size: '7 cm', price: 9500, quantity: 2 },
    { name: 'Bristol', size: 'Grande', price: 20000, quantity: 1 },
    { name: 'Lobo marino', price: 10000, quantity: 1 },
  ])).searchParams.get('text');
  assert.ok(message.includes('Color: Azul\n  Tamaño: 7 cm'));
  assert.ok(message.includes('• Bristol\n  Tamaño: Grande'));
  assert.ok(message.includes('• Lobo marino\n  Cantidad: 1'));
  assert.ok(message.includes('Subtotal: $19.000'));
  assert.ok(message.endsWith('Total del pedido: $49.000'));
});
