import express from 'express';
import webpack from 'webpack';
import config from '../config/webpack';
import webpackConfig from './webpack.config.dev';
// import { logStart, logError } from '../../shared/utils/logger';

const app = express();
const compiler = webpack(webpackConfig);
const port = config.port;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: '/' // bundle can be accessed at http://localhost:3001/bundle.js
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, '0.0.0.0', err => {
  if (err) return console.log('dev_server start', err);
  
  console.log(`Webpack server listening on port ${port}`);
});
