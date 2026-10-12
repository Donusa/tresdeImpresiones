import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { photoGroupsForProduct, selectionForProduct, minimumPriceForProduct } from '../src/data/productOptions.js';

const products = JSON.parse(readFileSync(new URL('../src/assets/Productos/precios.json', import.meta.url), 'utf8'));
const product = (name) => products.find((entry) => entry.Nombre === name);

test('groups multiple photos of a color and optional base finish into separate galleries', () => {
  const groups = photoGroupsForProduct({ Fotos: [
    { Color: 'Azul', Hex: '#225cad', Archivo: 'azul-1.jpeg' },
    { Color: 'Roja', Archivo: 'roja.jpeg' },
    { Color: 'Azul', Archivo: 'azul-2.jpeg' },
    { Archivo: 'base-1.jpeg' }, { Archivo: 'base-2.jpeg' },
  ] });
  assert.deepEqual(groups.map(({ color, files }) => ({ color, files })), [
    { color: 'Azul', files: ['azul-1.jpeg', 'azul-2.jpeg'] },
    { color: 'Roja', files: ['roja.jpeg'] },
    { color: null, files: ['base-1.jpeg', 'base-2.jpeg'] },
  ]);
});

test('Bristol and lobo use a single base gallery and every catalog photo exists', () => {
  for (const [name, count] of [['Bristol', 9], ['Lobo marino', 2]]) {
    const groups = photoGroupsForProduct(product(name));
    assert.equal(groups.length, 1);
    assert.equal(groups[0].color, null);
    assert.equal(groups[0].files.length, count);
  }
  for (const entry of products) {
    for (const photo of entry.Fotos) {
      assert.ok(existsSync(new URL(`../src/assets/Productos/${photo.Archivo}`, import.meta.url)), photo.Archivo);
    }
  }
  assert.ok(photoGroupsForProduct(product('Silla Bristol')).some((group) => group.color === 'Azul'));
});

test('every chair and umbrella color offers all requested sizes and prices', () => {
  for (const [name, prices] of [
    ['Silla Bristol', { '11 cm': 16500, '9 cm': 13500, '7 cm': 9500 }],
    ['Sombrilla', { 'Chica · 12 cm': 16000, 'Grande · 15 cm': 23000 }],
  ]) {
    const entry = product(name);
    for (const group of photoGroupsForProduct(entry)) {
      for (const [size, price] of Object.entries(prices)) {
        assert.deepEqual(selectionForProduct(entry, group.color, size), { color: group.color, size, price });
      }
    }
    assert.equal(minimumPriceForProduct(entry), Math.min(...Object.values(prices)));
  }
});

test('supports size-only and fixed-price products and rejects nonexistent options', () => {
  assert.deepEqual(selectionForProduct(product('Bristol'), null, 'Mini'), { color: null, size: 'Mini', price: 10000 });
  assert.deepEqual(selectionForProduct(product('Bristol'), null, 'Grande'), { color: null, size: 'Grande', price: 20000 });
  assert.deepEqual(selectionForProduct(product('Lobo marino')), { color: null, size: null, price: 10000 });
  assert.deepEqual(selectionForProduct(product('Edificio Demetrio Elíades')), { color: null, size: null, price: 23000 });
  assert.equal(selectionForProduct(product('Lobo marino'), 'Rojo'), null);
  assert.equal(selectionForProduct(product('Bristol'), null, 'Inexistente'), null);
  assert.equal(selectionForProduct({ Precio: 100, Tamanos: [{ Nombre: 'Único' }] }).price, 100);
});
