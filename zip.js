/* ZIP sin dependencias: formato STORE y CRC32. Los archivos se empaquetan localmente. */
(() => {
 const table=Uint32Array.from({length:256},(_,n)=>{let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
 const crc32=data=>{let c=0xffffffff;for(const n of data)c=table[(c^n)&255]^(c>>>8);return (c^0xffffffff)>>>0;};
 const encode=new TextEncoder();
 async function makeZip(entries){
  const parts=[],central=[];let offset=0,centralSize=0;
  for(const entry of entries){
   const name=encode.encode(entry.name),data=typeof entry.data==='string'?encode.encode(entry.data):new Uint8Array(entry.data),crc=crc32(data);
   const head=new Uint8Array(30+name.length),v=new DataView(head.buffer);
   v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x0800,true);v.setUint16(12,0x21,true);v.setUint32(14,crc,true);v.setUint32(18,data.length,true);v.setUint32(22,data.length,true);v.setUint16(26,name.length,true);head.set(name,30);
   parts.push(head,data);
   const ch=new Uint8Array(46+name.length),cv=new DataView(ch.buffer);
   cv.setUint32(0,0x02014b50,true);cv.setUint16(4,20,true);cv.setUint16(6,20,true);cv.setUint16(8,0x0800,true);cv.setUint16(14,0x21,true);cv.setUint32(16,crc,true);cv.setUint32(20,data.length,true);cv.setUint32(24,data.length,true);cv.setUint16(28,name.length,true);cv.setUint32(42,offset,true);ch.set(name,46);central.push(ch);centralSize+=ch.length;offset+=head.length+data.length;
  }
  const end=new Uint8Array(22),ev=new DataView(end.buffer);ev.setUint32(0,0x06054b50,true);ev.setUint16(8,entries.length,true);ev.setUint16(10,entries.length,true);ev.setUint32(12,centralSize,true);ev.setUint32(16,offset,true);
  return new Blob([...parts,...central,end],{type:'application/zip'});
 }
 window.CrunchZip={makeZip};
})();
