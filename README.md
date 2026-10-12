# React + Vite

## Catálogo de productos

El catálogo se edita en `src/assets/Productos/precios.json` y las imágenes se guardan en esa misma carpeta.

- `Nombre`, `Descripcion` y `Precio` definen los datos base del producto. `Resumen` es una frase breve opcional para las fichas del listado; el modal muestra la descripción completa.
- Las miniaturas llenan su recuadro. Para fotos especialmente altas, `AjusteImagen: "contain"` conserva la foto completa y rellena los laterales con un fondo desenfocado de la misma imagen. El modal siempre muestra la foto completa.
- `Tamanos` es opcional. Cada opción tiene `Nombre` y puede indicar su propio `Precio`; si lo omite, usa el precio base. La primera opción es el tamaño seleccionado inicialmente. Las medidas en centímetros del catálogo corresponden a la altura.
- `Fotos` contiene una entrada por imagen con `Archivo`. `Color`, `Hex` y `HexSecundario` son opcionales; el segundo tono permite representar combinaciones de colores. `Miniatura` permite usar otra imagen en Comprar y Nuestros Trabajos, conservando `Archivo` para el modal. Si no existe esa miniatura, se usa el original.
- El edificio usa una miniatura con el fondo extendido mediante IA para llenar los recuadros sin franjas ni recortar el cartel o la base. El original se conserva para el detalle. Ver [origen y prompt](docs/miniatura-edificio.md).
- Varias fotos con el mismo `Color` forman una galería. Si el producto no ofrece colores, se omite `Color` en todas sus fotos y se muestran juntas sin selector de color.
- Los tamaños se aplican a todos los colores del producto. El carrito y el pedido de WhatsApp conservan la combinación elegida y su precio. El ordenamiento por precio usa el menor precio disponible de cada producto.

Las pruebas del catálogo y del carrito se ejecutan con `node --test tests/*.test.js`.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
