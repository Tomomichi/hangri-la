module.exports = {
  purge: [
    './pages/**/*.js',
    './components/**/*.js',
    './lib/**/*.js',
    './_contents/**/*.md',
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
