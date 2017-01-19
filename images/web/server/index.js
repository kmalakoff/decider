const NODE_ENV = process.env.NODE_ENV;
const PORT = +process.env.PORT;

console.log('**************************');
console.log('**************************');
console.log('process.env', process.env);
console.log('**************************');
console.log('**************************');

require('./initialize')({port: PORT, useWebpackDevServer: NODE_ENV === 'development'});
