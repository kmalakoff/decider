const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

require('./initialize')({port: PORT, useWebpackDevServer: NODE_ENV === 'development'});
