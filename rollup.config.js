
import resolve from 'rollup-plugin-node-resolve';//保证第三方插件可用
import commonjs from 'rollup-plugin-commonjs';//保证第三方插件可用
import postcss from 'rollup-plugin-postcss'; //postcss
import vue from 'rollup-plugin-vue2';
import replace from 'rollup-plugin-replace';
import buble from 'rollup-plugin-buble';

// PostCSS plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';


//import eslint from 'rollup-plugin-eslint';

export default {
  entry: 'src/index.js',
  dest: 'dist/main.js',
  format: 'umd',
  sourceMap: 'inline',
  moduleName:'gerUI',
  plugins: [ 

    postcss({
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false, }),
        cssnano()
      ],
      extensions: [ '.css' ],
    }),
    vue(),
    buble({
      objectAssign: 'Object.assign'
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    })
   /* eslint({
      exclude: [
        'src/styles/**',
      ]
    }),*/
  ]
};