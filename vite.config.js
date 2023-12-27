const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/chart.funnel.js' ),
            name: 'chart-plugin-funnel.js',
            fileName: (format) => `chart-plugin-funnel.${format}.js`
        }
    }
})