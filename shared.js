/* Compartido por la web y el editor. No contiene contraseñas ni claves. */
(() => {
  const draftKey = 'quinoa-crunch-draft-v3';
  const clone = value => JSON.parse(JSON.stringify(value));
  const text = value => String(value ?? '');
  // Conserva los datos existentes y corrige la escritura anterior de la marca.
  const quinuaText = value => text(value).replace(/\bquinoa\b/gi, word => word === word.toUpperCase() ? 'QUINUA' : word[0] === 'Q' ? 'Quinua' : 'quinua');
  const escape = value => text(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const color = (value, fallback='#ae8751') => /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
  const image = value => {
    const v=text(value).trim();
    if (/^data:image\/(png|jpeg|webp|gif);base64,[a-z0-9+/=]+$/i.test(v)) return v;
    if (/^https:\/\//i.test(v)) { try { const u=new URL(v); if (!u.username && !u.password) return u.href; } catch {} }
    if (/^(?:\.\/)?assets\/[a-z0-9_./-]+\.(svg|png|jpe?g|webp|gif)$/i.test(v) && !v.includes('..')) return v;
    return '';
  };
  function normalize(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('La configuración debe ser un objeto.');
    const base=clone(window.SITE_CONFIG);
    for (const key of Object.keys(base)) {
      if (key==='products' || key==='heroLines' || key==='version') continue;
      if (typeof raw[key]==='string') base[key]=raw[key];
    }
    base.accent=color(base.accent); base.navy=color(base.navy,'#173b50'); base.paper=color(base.paper,'#f6f0e5'); base.logo=image(base.logo); base.collectionImage=image(base.collectionImage); base.motion=base.motion==='off'?'off':'on';
    base.autoplay=base.autoplay==='off'?'off':'on';
    base.autoplaySeconds=Math.min(30,Math.max(3,Number(raw.autoplaySeconds??base.autoplaySeconds)||6));
    if(Array.isArray(raw.heroLines)) base.heroLines=[0,1,2].map(i=>text(raw.heroLines[i]));
    if(Array.isArray(raw.products)) {
      if(raw.products.length>30) throw new Error('Puedes agregar hasta 30 productos.');
      base.products=raw.products.map((p,i)=>({
        id:text(p.id || 'producto-'+i).replace(/[^a-z0-9-]/gi,'').slice(0,65)||'producto-'+i,
        name:text(p.name || 'Nuevo producto'),label:text(p.label),headline:text(p.headline),description:text(p.description),
        image:image(p.image), photo:image(p.photo), color:color(p.color,base.paper), ink:color(p.ink,base.navy), accent:color(p.accent,base.accent),
        icon:['quinoa','chocolate','oats','leaf','bar'].includes(p.icon)?p.icon:'bar',
        tags:Array.isArray(p.tags)?p.tags.slice(0,6).map(text):[],detail:text(p.detail),price:text(p.price),visible:p.visible!==false,
        imageScale:Math.min(140,Math.max(60,Number(p.imageScale)||100))
      }));
    }
    for (const key of ['brand','kicker','whatsappMessage','contactTitle','contactDescription','contactButton','contactMicro','aboutTitle','aboutDescription','footerTagline','collectionLabel']) base[key]=quinuaText(base[key]);
    for (const product of base.products) {
      for (const key of ['name','label','headline','description','detail']) product[key]=quinuaText(product[key]);
      product.tags=product.tags.map(quinuaText);
    }
    return base;
  }
  function readDraft(){try {const r=localStorage.getItem(draftKey);return r?normalize(JSON.parse(r)):null;}catch{return null;}}
  function writeDraft(c){localStorage.setItem(draftKey,JSON.stringify(c));}
  function configSource(config){return '/* Editado en el configurador de Quinua Crunch. */\nwindow.SITE_CONFIG = '+JSON.stringify(config,null,2).replace(/</g,'\\u003c')+';\n';}
  function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function whatsappURL(config,product){const phone=text(config.whatsapp).replace(/\D/g,'');if(!/^[1-9]\d{7,14}$/.test(phone))return '';const message=product?`¡Hola! Me interesa ${product.name} de ${config.brand}. Quisiera conocer su precio y disponibilidad.`:config.whatsappMessage;return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;}
  function renderIcons(root=document.body){
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
    while(walker.nextNode()){const n=walker.currentNode;if(/[↗↘]/.test(n.nodeValue) && !n.parentElement.closest('script,style,textarea,input,svg'))nodes.push(n);}
    for(const n of nodes){const frag=document.createDocumentFragment();for(const part of n.nodeValue.split(/([↗↘])/)){if(part==='↗'||part==='↘'){const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg'),path=document.createElementNS(ns,'path');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class','inline-arrow');svg.setAttribute('aria-hidden','true');path.setAttribute('d',part==='↗'?'M5 19 19 5M5 5h14v14':'M5 5 19 19M5 19h14V5');path.setAttribute('fill','none');path.setAttribute('stroke','currentColor');path.setAttribute('stroke-width','1.7');svg.append(path);frag.append(svg);}else frag.append(document.createTextNode(part));}n.replaceWith(frag);}
  }
  function flavorIcon(key){
    const paths={
      quinoa:'<path d="M12 27V7m0 11-5-4m5 0 5-4"/><ellipse cx="12" cy="5" rx="2.5" ry="3"/><ellipse cx="6" cy="11" rx="2.3" ry="3" transform="rotate(-35 6 11)"/><ellipse cx="18" cy="9" rx="2.3" ry="3" transform="rotate(35 18 9)"/><ellipse cx="6" cy="19" rx="2.3" ry="3" transform="rotate(-35 6 19)"/><ellipse cx="18" cy="17" rx="2.3" ry="3" transform="rotate(35 18 17)"/>',
      chocolate:'<path d="M6 5h13l7 7v15H6Zm13 0v7h7M6 16h20M6 22h20M12 5v22m7-15v15"/>',
      oats:'<path d="M16 29V5m0 8L9 8m7 11-7-5m7 11-7-5m7-7 7-5m-7 11 7-5m-7 11 7-5"/><path d="M9 8C6 8 5 4 6 2c4 0 6 2 6 5M23 8c3 0 4-4 3-6-4 0-6 2-6 5M9 14c-3 0-4-4-3-6m17 6c3 0 4-4 3-6M9 20c-3 0-4-4-3-6m17 6c3 0 4-4 3-6"/>',
      leaf:'<path d="M7 26c-9-14 7-23 20-22 1 15-8 27-20 22Zm0 0L23 9"/>',
      bar:'<rect x="3" y="9" width="26" height="14" rx="3"/><path d="M8 9v14m16-14v14M12 14h8m-8 4h5"/>'
    };
    return '<svg class="flavor-icon" viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">'+(paths[key]||paths.bar)+'</svg>';
  }
  window.Crunch={draftKey,clone,escape,color,image,normalize,readDraft,writeDraft,configSource,download,whatsappURL,renderIcons,flavorIcon};
})();
