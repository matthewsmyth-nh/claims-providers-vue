const selectorParser = require("postcss-selector-parser");
const plugin = require("tailwindcss/plugin");

// Feather theme font family CSS variables (format: any valid font-family value)
const featherThemeFontFamilies = {
  sans: "var(--feather-font-family-sans)",
};

// Feather theme font weight CSS variables (format: any valid font-weight value)
const featherThemeFontWeights = {
  light: "var(--feather-font-weight-light)",
  normal: "var(--feather-font-weight-normal)",
  bold: "var(--feather-font-weight-bold)",
};

// Feather theme color CSS variables (format: r, g, b)
const featherThemeColors = {
  "background": "var(--feather-color-background)",
  "surface": "var(--feather-color-surface)",
  "primary": "var(--feather-color-primary)",
  "primary-variant": "var(--feather-color-primary-variant)",
  "secondary": "var(--feather-color-secondary)",
  "secondary-variant": "var(--feather-color-secondary-variant)",
  "error": "var(--feather-color-error)",
  "success": "var(--feather-color-success)",
  "warning": "var(--feather-color-warning)",
  "on-surface": "var(--feather-color-on-surface)",
  "on-color": "var(--feather-color-on-color)",
  "on-warning": "var(--feather-color-on-warning)",
  "interactive-on-color": "var(--feather-color-interactive-on-color)",
  "interactive-on-surface": "var(--feather-color-interactive-on-surface)",
  "interactive-on-warning": "var(--feather-color-interactive-on-warning)",
  "on-interactive-on-color": "var(--feather-color-on-interactive-on-color)",
  "on-interactive-on-surface": "var(--feather-color-on-interactive-on-surface)",
  "on-interactive-on-warning": "var(--feather-color-on-interactive-on-warning)",
};

// Feather theme shadow CSS variables (format: any valid box-shadow value)
const featherThemeShadows = {
  none: "none",
  0: "var(--feather-shadow-0)",
  1: "var(--feather-shadow-1)",
  2: "var(--feather-shadow-2)",
  3: "var(--feather-shadow-3)",
  4: "var(--feather-shadow-4)",
  5: "var(--feather-shadow-5)",
  6: "var(--feather-shadow-6)",
  7: "var(--feather-shadow-7)",
  8: "var(--feather-shadow-8)",
  9: "var(--feather-shadow-9)",
  10: "var(--feather-shadow-10)",
  11: "var(--feather-shadow-11)",
  12: "var(--feather-shadow-12)",
  13: "var(--feather-shadow-13)",
  14: "var(--feather-shadow-14)",
  15: "var(--feather-shadow-15)",
  16: "var(--feather-shadow-16)",
  17: "var(--feather-shadow-17)",
  18: "var(--feather-shadow-18)",
  19: "var(--feather-shadow-19)",
  20: "var(--feather-shadow-20)",
  21: "var(--feather-shadow-21)",
  22: "var(--feather-shadow-22)",
  23: "var(--feather-shadow-23)",
  24: "var(--feather-shadow-24)",
};

// Feather theme z-index CSS variables (format: any valid z-index value)
const featherThemeZIndices = {
  "-1": "-1",
  "0": "0",
  "1": "1",
  "auto": "auto",
  "dropdown": "var(--feather-z-index-dropdown)",
  "sticky": "var(--feather-z-index-sticky)",
  "fixed": "var(--feather-z-index-fixed)",
  "modal-backdrop": "var(--feather-z-index-modal-backdrop)",
  "modal": "var(--feather-z-index-modal)",
  "popover": "var(--feather-z-index-popover)",
  "tooltip": "var(--feather-z-index-tooltip)",
};

// Palette color names (i.e. available color names in the current palette)
const paletteColorNames = [
  "background",
  "foreground",
  "primary",
  "primary-variant",
  "secondary",
  "secondary-variant",
  "error",
  "success",
  "warning",
  "interactive",
  "on-interactive",
];

// Mapping of palette color name to corresponding Feather theme color CSS variable, by palette name
const palettes = {
  "DEFAULT": {
    "primary": "primary",
    "primary-variant": "primary-variant",
    "secondary": "secondary",
    "secondary-variant": "secondary-variant",
    "success": "success",
    "error": "error",
    "warning": "warning",
  },
  "background": {
    "background": "background",
    "foreground": "on-surface",
    "interactive": "interactive-on-surface",
    "on-interactive": "on-interactive-on-surface",
  },
  "surface": {
    "background": "surface",
    "foreground": "on-surface",
    "interactive": "interactive-on-surface",
    "on-interactive": "on-interactive-on-surface",
  },
  "primary": {
    "background": "primary",
    "foreground": "on-color",
    "interactive": "interactive-on-color",
    "on-interactive": "on-interactive-on-color",
  },
  "primary-variant": {
    "background": "primary-variant",
    "foreground": "on-color",
    "interactive": "interactive-on-color",
    "on-interactive": "on-interactive-on-color",
  },
  "secondary": {
    "background": "secondary",
    "foreground": "on-color",
    "interactive": "interactive-on-color",
    "on-interactive": "on-interactive-on-color",
  },
  "secondary-variant": {
    "background": "secondary-variant",
    "foreground": "on-color",
    "interactive": "interactive-on-color",
    "on-interactive": "on-interactive-on-color",
  },
  "success": {
    "background": "success",
    "foreground": "on-color",
    "interactive": "interactive-on-color",
    "on-interactive": "on-interactive-on-color",
  },
  "error": {
    "background": "error",
    "foreground": "on-color",
    "interactive": "interactive-on-color",
    "on-interactive": "on-interactive-on-color",
  },
  "warning": {
    "background": "warning",
    "foreground": "on-warning",
    "interactive": "interactive-on-warning",
    "on-interactive": "on-interactive-on-warning",
  },
};

// Opacity stops used when generating rgba() colors
const opacity = {
  0: 0,
  5: 0.05,
  10: 0.1,
  20: 0.2,
  30: 0.3,
  40: 0.4,
  50: 0.5,
  60: 0.6,
  70: 0.7,
  80: 0.8,
  90: 0.9,
  95: 0.95,
  100: 1,
};

// Helper to generate mapping of palette color names (including opacity via suffix) to rgba() value.
function generateColors() {
  const colors = {};
  for (const paletteColorName of paletteColorNames) {
    for (const [key, value] of Object.entries(opacity)) {
      const colorKey = value === 1 ? paletteColorName : `${paletteColorName}-${key}`;
      const colorValue = `rgba(var(--feather-palette-${paletteColorName}), ${value})`;

      colors[colorKey] = colorValue;
    }
  }
  return colors;
}

// Colors generated from palettes and feather theme colors.
const colors = {
  none: "none",
  transparent: "transparent",
  current: "currentColor",
  ...generateColors(),
};

const htmlColors = {
  transparent: "transparent",
  current: "currentColor",
  ...colors,
};

const svgColors = {
  none: "none",
  current: "currentColor",
  ...colors,
};

// Font sizes
const fontSize = {
  "headline1": [
    "1.5rem",
    {
      letterSpacing: "normal",
      lineHeight: "2.125rem",
    },
  ],
  "headline2": [
    "1.5rem",
    {
      letterSpacing: "normal",
      lineHeight: "2.125rem",
    },
  ],
  "headline3": [
    "1.25rem",
    {
      letterSpacing: "0.0125em",
      lineHeight: "2rem",
    },
  ],
  "headline4": [
    "1.25rem",
    {
      letterSpacing: "0.0125em",
      lineHeight: "2rem",
    },
  ],
  "subtitle1": [
    "0.875rem",
    {
      letterSpacing: "0.0071428571em",
      lineHeight: "1.625rem",
    },
  ],
  "subtitle2": [
    "0.875rem",
    {
      letterSpacing: "0.0125em",
      lineHeight: "1.625rem",
    },
  ],
  "body-large": [
    "1rem",
    {
      letterSpacing: "0.03125em",
      lineHeight: "1.5rem",
    },
  ],
  "body-small": [
    "0.875rem",
    {
      letterSpacing: "0.01786em",
      lineHeight: "1.375rem",
    },
  ],
  "button": [
    "0.875rem",
    {
      letterSpacing: "0.0892857143em",
      lineHeight: "2.375rem",
    },
  ],
  "caption": [
    "0.75rem",
    {
      letterSpacing: "0.0333333333em",
      lineHeight: "1.375rem",
    },
  ],
  "overline": [
    "0.75rem",
    {
      letterSpacing: "0.1666666667em",
      lineHeight: "2.125rem",
    },
  ],
};

// Responsive breakpoints (mobile-first)
const screens = {
  sm: { min: "600px" },
  md: { min: "720px" },
  lg: { min: "840px" },
  xl: { min: "960px" },
};

module.exports = {
  corePlugins: {
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    letterSpacing: false,
    textOpacity: false,
  },
  purge: ["public/index.html"],
  theme: {
    backgroundColor: htmlColors,
    borderColor: htmlColors,
    boxShadow: featherThemeShadows,
    colors,
    divideColor: htmlColors,
    fill: svgColors,
    fontFamily: featherThemeFontFamilies,
    fontSize,
    fontWeight: featherThemeFontWeights,
    gradientColorStops: htmlColors,
    palettes,
    screens,
    stroke: svgColors,
    textColor: htmlColors,
    zIndex: featherThemeZIndices,
    extend: {
      transitionProperty: {
        "stroke-dashoffset": "stroke-dashoffset",
      },
    },
  },
  variants: {
    elevation: ["responsive", "dark", "group-hover", "focus-within", "hover", "focus"],
    overlay: ["hover", "focus", "group-hover", "group-focus-within"],
    palette: ["responsive", "dark", "group-hover", "focus-within", "hover", "focus"],
    extend: {
      backgroundColor: ["disabled", "group-focus-within"],
      borderColor: ["disabled", "group-focus-within"],
      boxShadow: ["disabled", "group-focus-within"],
      fill: ["hover"],
      margin: ["group-focus-within"],
      maxWidth: ["group-hover"],
      opacity: ["group-focus-within"],
      padding: ["group-focus-within", "group-hover"],
      pointerEvents: ["focus", "disabled"],
      scale: ["group-focus-within"],
      stroke: ["hover"],
      textColor: ["disabled", "group-focus-within"],
      transform: ["hover", "focus", "group-focus-within"],
      translate: ["group-focus-within"],
      zIndex: ["group-focus-within"],
    },
  },
  plugins: [
    // Caret Color
    plugin(({ addUtilities, variants }) => {
      const carets = {
        ".caret-auto": { caretColor: "auto" },
        ".caret-current": { caretColor: "currentColor" },
        ".caret-transparent": { caretColor: "transparent" },
        ".caret-background": { caretColor: `rgb(var(--feather-palette-background))` },
        ".caret-foreground": { caretColor: `rgb(var(--feather-palette-foreground))` },
        ".caret-interactive": { caretColor: `rgb(var(--feather-palette-interactive))` },
        ".caret-error": { caretColor: `rgb(var(--feather-palette-error))` },
      };
      addUtilities(carets, variants("caret"));
    }),
    // Elevation
    plugin(({ addComponents, variants }) => {
      const elevations = {};
      const levels = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24];
      for (const level of levels) {
        elevations[`.elevation-${level}`] = {
          "--feather-color-surface": `var(--feather-color-elevation-${level})`,
          backgroundColor: "rgba(var(--feather-palette-background), 1)",
          boxShadow: featherThemeShadows[level],
        };
      }
      addComponents(elevations, variants("elevation"));
    }),
    // Group Extensions
    plugin(({ addVariant, prefix }) => {
      // Derived from: https://github.com/tailwindlabs/tailwindcss/blob/master/src/lib/substituteVariantsAtRules.js
      const groupClass = prefix("group");
      function generateGroupPseudoClassVariantFunction(pseudoClass) {
        return ({ modifySelectors, separator }) => {
          const parser = selectorParser((selectors) => {
            selectors.walkClasses((sel) => {
              sel.value = `group-${pseudoClass}${separator}${sel.value}`;
              sel.parent.insertBefore(sel, selectorParser().astSync(`.${groupClass}:${pseudoClass} `));
            });
          });
          return modifySelectors(({ selector }) => parser.processSync(selector));
        };
      }

      addVariant("group-focus-within", generateGroupPseudoClassVariantFunction("focus-within"));
      // addVariant('group-focus-visible', generateGroupPseudoClassVariantFunction('focus-visible'));
      // addVariant('group-active', generateGroupPseudoClassVariantFunction('active'));
      // addVariant('group-disabled', generateGroupPseudoClassVariantFunction('disabled'));
    }),
    // Overlay
    plugin(({ addUtilities, variants }) => {
      const overlayParentDefinition = {
        position: "relative",
      };
      const overlayContentDefinition = {
        position: "absolute",
        display: "block",
        content: `""`,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "currentColor",
        opacity: 0.1,
      };
      const overlays = {
        ".overlay-current-before": overlayParentDefinition,
        ".overlay-current-before::before": overlayContentDefinition,
        ".overlay-current-after": overlayParentDefinition,
        ".overlay-current-after::after": overlayContentDefinition,
      };
      addUtilities(overlays, variants("overlay"));
    }),
    // Palette
    plugin(({ addUtilities, theme, variants }) => {
      const { DEFAULT = {}, ...palettes } = theme("palettes");
      const utilities = {};
      for (const [name, pairs] of Object.entries(palettes)) {
        const colorDeclarations = {};
        const merged = { ...DEFAULT, ...pairs };
        for (const [name, value] of Object.entries(merged)) {
          colorDeclarations[`--feather-palette-${name}`] = featherThemeColors[value];
        }
        utilities[`.palette-${name}`] = colorDeclarations;
      }
      addUtilities(utilities, variants("palette"));
    }),
  ],
};