// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/my-eth-app/' // Si estás desplegando en un subdirectorio
    : '/' // Si estás ejecutando localmente
}