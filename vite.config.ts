import {resolve} from 'path';
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import dynamicImport from 'vite-plugin-dynamic-import';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      name: 'crawlab-ui',
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'crawlab-ui',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'vue',
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        }
      }
    },
  },
  resolve: {
    alias: [
      {find: '@', replacement: resolve(__dirname, 'src')},
      {find: 'vue', replacement: resolve('./node_modules/vue/dist/vue.esm-bundler.js')},
    ],
    extensions: [
      '.js',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
      '.vue',
      '.scss',
    ]
  },
  plugins: [
    vue(),
    dynamicImport(),
    dts(),
  ],
  server: {
    cors: true,
  },
});
