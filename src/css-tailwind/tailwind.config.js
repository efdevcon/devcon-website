module.exports = {
  purge: {
    content: ["../**/*.html", "../**/*.tsx", "../**/*.scss"],
    // enabled: true,
  },
  darkMode: false,
  theme: {
    fontFamily: {
      primary: ['"Maison Neue Mono"'],
      secondary: ["Roboto"],
    },
    colors: {
      primary: {
        DEFAULT: "#30354b",
        light: "#6B7280",
        dark: "#111827",
        opaque: "#D1D5DB",
      },
      secondary: {
        DEFAULT: "#0daed0",
        light: "purple",
        dark: "#0daed0",
        opaque: "#0daed0",
      },
      tertiary: {
        DEFAULT: "#fbcd11",
        light: "#fbcd11",
        dark: "#fbcd11",
        opaque: "#fbcd11",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
