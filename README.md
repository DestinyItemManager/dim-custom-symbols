## DIM CUSTOM SYMBOLS

All font/symbol generation used by [DIM](https://github.com/DestinyItemManager/DIM)

## How to add a new glyph

- Create an SVG with a height of 960 (or the generated glyph will either be too large or to small)

- Name the glyph, the symbol name you want it to be (e.g. prismatic.svg), webFont will automatically assign it the next available codepoint and rename it.

- Place the glyph in the `svg/` directory.

- Run `pnpm generate-data-sub generate-custom-glyph`

- Add an entry in `src/generate-symbols.ts` for your new symbol.
  e.g. [DimCustomSymbols.gunsmith, 'Gunsmith'],

  Where the quoted text is discoverably via an exact match in the manifest, (it must be `displayProperties.name` or `progressDescription` if Objective)
  [DataExplorer](https://data.destinysets.com) can be useful here.

  If an exact match cannot be found, then a manual translation will have to be added. When your PR is submitted into DIM it will fail because of a missing translation key.
  In DIM, this is your chance to add the translation key and update `src\app\dim-ui\destiny-symbols\destiny-symbols.ts`. You will need to add your glyph to the manualTranslations array along with the i18n key.
  e.g. `[DimCustomSymbols.prismatic]: tl('Glyphs.Prismatic'),`

- Run `pnpm generate-data`

## Special Thanks

Thanks to [@Gix3612](https://github.com/Gix3612) for setting up [DIMCustomSymbols](https://github.com/DestinyItemManager/d2-additional-info/pull/441) initially, it was a long road to get here.
