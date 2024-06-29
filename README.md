## DIM CUSTOM SYMBOLS

All font/symbol generation used by [DIM](https://github.com/DestinyItemManager/DIM)

## How to add a new glyph

- Create an SVG with a height of 960 (or the generated glyph will either be too large or to small)

- Name the glyph uf####-{symbolname}, where #### is the next available decimal number (in the svg folder)

- Add an entry in `src/generate-symbols.ts` for your new symbol.
  e.g. [DimCustomSymbols.gunsmith, 'Gunsmith'],

  Where the quoted text is discoverably via an exact match in the manifest,
  if it is not available leave it off and in the DIM PR that is generated you will need to add an i18n entry.

## Special Thanks

Thanks to [@Gix3612](https://github.com/Gix3612) for setting up [DIMCustomSymbols](https://github.com/DestinyItemManager/d2-additional-info/pull/441) initially, it was a long road to get here.
