import {readFile,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const {WINDY_API_KEY:apiKey,RELEASE_REPOSITORY:repositoryName,RELEASE_OWNER:repositoryOwner,RELEASE_COMMIT:commitSha}=process.env;
if(!apiKey||!repositoryName||!repositoryOwner||!commitSha)throw Error('Set WINDY_API_KEY securely and provide RELEASE_REPOSITORY, RELEASE_OWNER and RELEASE_COMMIT. No upload attempted.');
const metadata=JSON.parse(await readFile('dist/plugin.json','utf8'));
if(metadata.name!=='windy-plugin-weatherscope')throw Error('Unexpected plugin identity.');
await writeFile('dist/plugin.json',JSON.stringify({...metadata,repositoryName,repositoryOwner,commitSha},null,2));
const archived=spawnSync('tar',['-cf','plugin.tar','-C','dist','.'],{stdio:'inherit'});
if(archived.status!==0)throw Error('Unable to package plugin.');
const body=new FormData();body.append('plugin_archive',new Blob([await readFile('plugin.tar')],{type:'application/x-tar'}),'plugin.tar');
const response=await fetch('https://node.windy.com/plugins/v1.0/upload',{method:'POST',headers:{'x-windy-api-key':apiKey},body,signal:AbortSignal.timeout(120000)});
const result=await response.text();
// Never echo credentials even if an upstream error reflects request values.
const safeResult=result.split(apiKey).join('[REDACTED]');
if(!response.ok)throw Error(`Windy upload failed (${response.status}): ${safeResult.slice(0,2000)}`);
await writeFile('publish-result.json',safeResult);
console.log(safeResult);
