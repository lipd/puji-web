const CracoLessPlugin = require('craco-less')
const { color } = require('./src/style/color')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': color.primary },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
