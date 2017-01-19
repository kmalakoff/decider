const NODE_ENV = process.env.NODE_ENV;
const PORT = +process.env.PORT;

require('./initialize')({port: PORT, useWebpackDevServer: NODE_ENV === 'development'});
