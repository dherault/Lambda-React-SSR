import onServer from './onServer';

const chalk = onServer ? require('chalk') : null;

export const log = createLogger();
export const logWarning = createLogger({
  prefix: '!!!',
  chalk: 'bgRed',
  textClient: 'White',
  backgroundClient: 'Crimson',
});
export const logStart = createLogger({
  prefix: '.:!',
  chalk: 'bgGreen',
  textClient: 'White',
  backgroundClient: 'Chartreuse',
});
export const logFetch = createLogger({
  prefix: '+++',
  chalk: 'bgMagenta',
  textClient: 'White',
  backgroundClient: 'LightPink',
});
export const logApi = createLogger({
  prefix: 'API',
  chalk: 'bgYellow',
});
export const logRendering = createLogger({
  prefix: 'RND',
  chalk: 'bgBlue',
});
export const logWebsocket = createLogger({
  prefix: '_w_',
  chalk: 'bgBlack',
  textClient: 'White',
  backgroundClient: 'DarkSlateGray',
});
export const logReducer = createLogger({
  prefix: '.R.',
  chalk: 'bgCyan',
  textClient: 'White',
  backgroundClient: 'SkyBlue',
});

export function createLogger(options={}) {
  
  const prefix = options.prefix || '...';
  const chalkKey = options.chalk || 'gray';
  const textClient = options.textClient || 'Gray';
  const backgroundClient = options.backgroundClient || 'White';
  
  [prefix, chalkKey, textClient, backgroundClient].forEach(x => {
    if (typeof x !== 'string') throw new Error('createLogger: args must be strings');
  });
  
  return (...messages) => {
    if (onServer) {
      return console.log(chalk[chalkKey](prefix), ...messages);
    } else {
      return console.log(`%c${prefix}`, `color:${textClient};background:${backgroundClient};`, ...messages);
    }
  };
}

export function logError(message, error) {
  logWarning(message);
  console.error(error);
}

// Logs informations regarding a Hapi.js request
let c = 0;
function preprendZero(i) {
  const ii = i.toString();
  return ii.length > 1 ? ii : '0' + ii;
}

export function logRequest(logger, {info: {remoteAddress}, method, url: {path}}) {
  c++;
  const d = new Date();
  const h = preprendZero(d.getHours());
  const m = preprendZero(d.getMinutes());
  const s = preprendZero(d.getSeconds());
  console.log('\n');  
  logger( `[${c}]`, `${h}:${m}:${s} ${remoteAddress} ${method} ${path}`);
}
