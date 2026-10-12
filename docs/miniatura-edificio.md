# Miniatura del Edificio Demetrio Elíades

La fotografía original mide 718 × 1280 px. Su proporción vertical deja bandas laterales al mostrarla completa en las tarjetas. Recortarla para llenar el ancho elimina el cartel y parte de la base.

Se creó una versión de fondo extendido con la herramienta integrada `image_gen` (modo edición). Es una variante generada con IA para las miniaturas de Comprar y Nuestros Trabajos. El modal continúa utilizando la fotografía original sin modificaciones.

- Original: `src/assets/Productos/Edificio Demetrio Elíades.jpeg`.
- Miniatura: `src/assets/Productos/Edificio_Demetrio_Eliades_miniatura.png`.
- Configuración: campo opcional `Miniatura` de la foto en `precios.json`.

## Prompt utilizado

```text
Use case: precise-object-edit.
Asset type: e-commerce thumbnail photograph, background outpainting.
Input image 1 is the edit target, an original portrait photograph of a 3D printed miniature of Edificio Demetrio Elíades with the red HAVANNA sign.
Primary request: extend ONLY the background to the left and right to make a continuous 5:4 landscape photo, ideally 1600 x 1280. Preserve the entire original central 718 x 1280 photograph, at exactly its original scale and height; center it horizontally in the wider output. Continue the gray textured wall, existing curved glass tabletop, lighting, shadows and perspective naturally into the new side regions. The final photograph must look continuous with no seams, inset photograph edges, blurred sidebars, mirroring, frame or vignette.
Invariants: preserve the actual miniature EXACTLY: all floors, windows, proportions, original perspective, color, texture, red rooftop letters HAVANNA, complete square base, shrubs, lamps, shadows. Preserve all original pixels within the original portrait as closely as possible. Do not redraw, redesign, widen, shorten, straighten or retouch the building. Keep both the sign and base fully visible. No zoom or crop on the original image. Do not add any other subjects or text. Only invent the missing wall and tabletop on the lateral extensions.
```
