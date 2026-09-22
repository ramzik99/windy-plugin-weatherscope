export function currentPosition(geolocation=globalThis.navigator?.geolocation){
 return new Promise((resolve,reject)=>{
  if(!geolocation){reject(new Error('Location is unavailable in this browser. Choose a point on the map.'));return;}
  // Browser permission prompts can otherwise wait indefinitely before their own timeout starts.
  const timer=setTimeout(()=>reject(new Error('Finding your location timed out. Try again or choose a point on the map.')),20000);
  geolocation.getCurrentPosition(position=>{
   clearTimeout(timer);
   const lat=position?.coords?.latitude,lon=position?.coords?.longitude;
   if(!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180){reject(new Error('Your location could not be read. Try again or choose a point on the map.'));return;}
   resolve({lat,lon});
  },error=>{clearTimeout(timer);reject(new Error(error?.code===1?'Location access was denied. Allow location for Windy in your browser settings, or choose a point on the map.':error?.code===3?'Finding your location timed out. Try again or choose a point on the map.':'Your location is currently unavailable. Try again or choose a point on the map.'));},
  {enableHighAccuracy:false,timeout:15000,maximumAge:60000});
 });
}
