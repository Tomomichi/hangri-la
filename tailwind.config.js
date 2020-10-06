module.exports = {
  purge: [
    './pages/**/*.js',
    './components/**/*.js',
    './_contents/**/*.js',
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
