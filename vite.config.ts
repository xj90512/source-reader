import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {resolve} from 'path'

import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueSetupExtend(),
        createSvgIconsPlugin({
            iconDirs: [resolve(__dirname, 'src/icons')],
            symbolId: 'icon-[dir]-[name]',
            inject: 'body-first',
            customDomId: '__svg__icons__dom__',
        })
    ],
    resolve: {
        // 配置路径别名
        alias: {
            '@': resolve(__dirname, './src'),
            '@router': resolve(__dirname, './src/router'),
            '@components': resolve(__dirname, './src/components'),
            '@assets': resolve(__dirname, './src/assets'),
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    // prevent vite from obscuring rust errors
    clearScreen: false,
    // tauri expects a fixed port, fail if that port is not available
    server: {
        port: 8420,
        strictPort: true,
    },
    // to make use of `TAURI_DEBUG` and other env variables
    // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
    envPrefix: ["VITE_", "TAURI_"],
    build: {
        // Tauri supports es2021
        target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
        // don't minify for debug builds
        minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
        // produce sourcemaps for debug builds
        sourcemap: !!process.env.TAURI_DEBUG,
        rollupOptions: {
            external: [],
            output: {
                manualChunks: undefined
            }
        }
    },
    optimizeDeps: {
        include: ['virtual:svg-icons-register']
    }
});
