import babel from 'rollup-plugin-babel';

export default {
  entry: 'client/src/client.js',
  dest: 'client/dist/bundle.js',
  format: 'es6',
  plugins: [
    babel()
  ]
};