import {finite,HOUR} from './engine.mjs';

export function seriesGeometry(field,start,end){
 const points=(field?.ts||[]).flatMap((t,i)=>t>=start&&t<=end?[{t,v:finite(field.values[i])?field.values[i]:null}]:[]);
 const values=points.map(p=>p.v).filter(finite);
 if(!values.length)return {points,path:'',min:null,max:null};
 const min=Math.min(...values),max=Math.max(...values),pad=(max-min)*.08||1;
 let path='',previous=null;
 for(const p of points){p.x=48+(p.t-start)/Math.max(1,end-start)*488;p.y=finite(p.v)?24+(max+pad-p.v)/(max-min+2*pad)*130:null;
  if(p.y===null){previous=null;continue;}
  // Never bridge missing samples or long forecast gaps.
  path+=`${previous!==null&&p.t-previous<=3*HOUR?'L':'M'}${p.x},${p.y} `;previous=p.t;
 }
 return {points,path,min,max};
}
export function fieldColor(v,min,max){
 if(!finite(v)||!finite(min)||!finite(max))return '#1a2936';
 const ratio=max===min?.5:Math.max(0,Math.min(1,(v-min)/(max-min)));
 return `hsl(${205-ratio*175} 55% ${24+ratio*14}%)`;
}
export function sourceHealth(data,time,now=Date.now()){
 const supplied=data?.header?.refTime;
 const run=typeof supplied==='string'?Date.parse(supplied):NaN;
 const age=finite(run)?(now-run)/HOUR:null;
 const available=(data?.fields||[]).filter(f=>{const i=f.ts.indexOf(time);return i>=0&&finite(f.values[i]);}).length;
 return {age,available,total:data?.fields.length||0,lead:finite(run)?(time-run)/HOUR:null};
}
