import generateHTML from './generateHTML';

export default function render(url, userId) {
  
  return new Promise((resolve, reject) => {
    
    const mountMeImFamous = `<div>Your URL is ${url}</div>`;
    
    resolve(generateHTML(mountMeImFamous));
  });
}