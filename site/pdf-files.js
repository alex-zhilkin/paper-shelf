export async function fingerprint(blob){
  return [...new Uint8Array(await crypto.subtle.digest('SHA-256',await blob.arrayBuffer()))].map(b=>b.toString(16).padStart(2,'0')).join('');
}
export function versionedPdfPath(id,hash){
  if(!/^[-a-zA-Z0-9_]{1,100}$/.test(id)||! /^[a-f0-9]{64}$/.test(hash))throw Error('Invalid PDF identity. Attach the PDF again.');
  return `shelf/pdfs/${id}-${hash}.pdf`;
}
export function storedPdfPath(id,file){
  const legacy=`shelf/pdfs/${id}.pdf`;
  if(file?.path===legacy)return legacy;
  if(/^[a-f0-9]{64}$/.test(file?.fingerprint||''))return versionedPdfPath(id,file.fingerprint);
  return legacy;
}
