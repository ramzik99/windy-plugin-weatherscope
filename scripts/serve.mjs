import http from 'node:http';
import {readFile} from 'node:fs/promises';
const files={'/':'preview.html','/preview.html':'preview.html','/plugin.js':'dist/plugin.js','/plugin.min.js':'dist/plugin.min.js','/plugin.json':'dist/plugin.json'};
http.createServer(async(req,res)=>{
 const path=new URL(req.url,'http://127.0.0.1').pathname,file=files[path];
 if(!file){res.writeHead(404);res.end('Not found');return;}
 try{const body=await readFile(file);res.writeHead(200,{'Content-Type':file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.json')?'application/json':'text/javascript','Access-Control-Allow-Origin':'*','Cache-Control':'no-store'});res.end(body);}catch{res.writeHead(500);res.end('Build the project first.');}
}).listen(9998,'127.0.0.1',()=>console.log('WeatherScope preview: http://127.0.0.1:9998'));
