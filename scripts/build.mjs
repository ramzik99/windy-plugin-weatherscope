import {spawnSync} from 'node:child_process';
import {mkdir,copyFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
const result=spawnSync(process.execPath,['node_modules/rollup/dist/bin/rollup','-c'],{stdio:'inherit',env:{...process.env,SERVE:'false'}});
if(result.status!==0)process.exit(result.status||1);
await copyFile('package.json','dist/package.json');
