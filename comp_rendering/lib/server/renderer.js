import React from 'react';
import { renderToString } from 'react-dom/server';
import generateHTML from './generateHTML';
import App from '../shared/components/App';

export default function render(url, userId, isDev) {
  
  return new Promise((resolve, reject) => {
    
    const mountMeImFamous = renderToString(<App />);
    
    resolve(generateHTML(mountMeImFamous, isDev));
  });
}