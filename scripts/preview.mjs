import {rollup} from 'rollup';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import {writeFile} from 'node:fs/promises';
const bundle=await rollup({input:'src/preview.mjs',plugins:[svelte({emitCss:false}),resolve({browser:true,dedupe:['svelte']})]});
const {output}=await bundle.generate({format:'iife'});
await writeFile('preview.html',`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WeatherScope · Design preview</title><style>body{margin:0;background:#071019}#app{max-width:620px;margin:30px auto;border:1px solid #293a48;border-radius:14px;overflow:hidden;box-shadow:0 30px 100px #0008}@media(max-width:640px){#app{margin:0;border:0;border-radius:0}}</style><div id="app"></div><script>${output[0].code.replaceAll('</script','<\\/script')}</script></html>`);
await bundle.close();
