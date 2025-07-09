import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
    base: "/build/",
    plugins: [
        laravel({
            input: ["resources/js/app.jsx", "resources/css/app.css"],
            refresh: false,
        }),
        react(),
    ],
    build: {
    outDir: "public/build",
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
    css: {
        postcss: {
            plugins: [tailwindcss(), autoprefixer()],
        },
    },
});
