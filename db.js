let openPromise;
function database(){return openPromise ||=new Promise((resolve,reject)=>{const request=indexedDB.open('shelf-v1',1);request.onupgradeneeded=()=>{for(const name of ['catalogs','files'])request.result.createObjectStore(name);};request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});}
async function operation(store,mode,key,value){const db=await database();return new Promise((resolve,reject)=>{const tx=db.transaction(store,mode);const request=value===undefined?tx.objectStore(store).get(key):tx.objectStore(store).put(value,key);let result;request.onsuccess=()=>result=request.result;tx.oncomplete=()=>resolve(result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Device storage is unavailable.'));});}
export const readCatalog=async namespace=>(await operation('catalogs','readonly',namespace))||{papers:[],base:[],dirty:false,seeded:false};
export const writeCatalog=(namespace,data)=>operation('catalogs','readwrite',namespace,data);
export const readFile=(namespace,id)=>operation('files','readonly',namespace+':'+id);
export const writeFile=(namespace,id,file)=>operation('files','readwrite',namespace+':'+id,file);
export async function migrateFiles(from,to,papers){for(const p of papers){if(p.file){const file=await readFile(from,p.id);if(file)await writeFile(to,p.id,file);}}}
