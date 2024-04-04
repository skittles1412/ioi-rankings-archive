import {resolve} from "path";
import {defineConfig} from "vite";

const years = [2017, 2019, 2020, 2021, 2022, 2023];

function patchHtmlPlugin() {
    return {
        name: "patch-ioi-html",

        transformIndexHtml(src, ctx) {
            const year = ctx.path.match(/^\/ioi-(\d{4})\/index.html$/)?.[1];

            if (year == undefined) {
                return;
            }

            return src.replaceAll("%YEAR-efbe4cb20d823f09e43b742be27a29aa96263cf1f03fc1b3641247a6b86b32da%", year);
        }
    }
}

export default defineConfig({
    plugins: [patchHtmlPlugin()],
    root: resolve(__dirname, "src"),
    resolve: {
        preserveSymlinks: true
    },
    build: {
        emptyOutDir: true,
        outDir: resolve(__dirname, "dist"),
        sourcemap: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                ...Object.fromEntries(years.map(y => [`ioi-${y}`, resolve(__dirname, `src/ioi-${y}/index.html`)])),
            },
            output: {
                manualChunks: {
                    jquery: ["jquery"],
                    raphael: ["raphael"],
                    stats: [resolve(__dirname, "src/stats.json")]
                }
            }
        },
    },
});
