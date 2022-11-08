import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

import path from "path"

const projectRootDir = path.resolve(__dirname)

const appSrcPath = path.resolve(projectRootDir, "src")
const appNodePath = path.resolve(projectRootDir, "node_modules")
const commonSrcPath = path.resolve(projectRootDir, "..", "common")
const commonNodePath = path.resolve(projectRootDir, "..", "node_modules")
const publicPath = path.resolve(projectRootDir, "public")
const buildOutput = path.resolve(projectRootDir, "dist")

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    envDir: projectRootDir,
    resolve: {
        alias: {
            // "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@app": appSrcPath,
            "@common": commonSrcPath
        }
    },
    
})
