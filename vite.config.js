import { resolve } from "path";
import { defineConfig } from "vite";

const years = [2017, 2019, 2020, 2021, 2022, 2023];

export default defineConfig({
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
        },
    },
});
