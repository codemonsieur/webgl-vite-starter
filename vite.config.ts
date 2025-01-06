import type { UserConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
import { viteSingleFile } from 'vite-plugin-singlefile';

export default {
    plugins: [
        [
            glsl({
                compress: true,
            }),
            viteSingleFile()
        ],
    ],
    build: {
    },
} satisfies UserConfig