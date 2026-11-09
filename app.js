
'use strict';
const STORAGE='dhalia-homestead-v2';
const starter={
 day:3,season:'Primavera',year:742,coins:15,
 inventory:[
 {name:'Troncos de abedul',qty:11,unit:'uds.',cat:'Madera',place:'Inventario dimensional'},
 {name:'Troncos de roble',qty:5,unit:'uds.',cat:'Madera',place:'Inventario dimensional'},
 {name:'Arcilla gris',qty:15,unit:'kg',cat:'Construcción',place:'Inventario dimensional'},
 {name:'Arena de río',qty:11,unit:'kg',cat:'Construcción',place:'Inventario dimensional'},
 {name:'Juncos largos',qty:35,unit:'tallos',cat:'Fibras',place:'Inventario dimensional'},
 {name:'Menta silvestre',qty:12,unit:'manojos',cat:'Hierbas',place:'Inventario dimensional'},
 {name:'Romero silvestre',qty:10,unit:'manojos',cat:'Hierbas',place:'Inventario dimensional'},
 {name:'Tomillo silvestre',qty:8,unit:'manojos',cat:'Hierbas',place:'Inventario dimensional'},
 {name:'Avellanas',qty:33,unit:'uds.',cat:'Alimentos',place:'Inventario dimensional'},
 {name:'Nueces',qty:12,unit:'uds.',cat:'Alimentos',place:'Inventario dimensional'},
 {name:'Peces de río vivos',qty:4,unit:'uds.',cat:'Fauna',place:'Inventario dimensional'},
 {name:'Cangrejo de arroyo vivo',qty:1,unit:'ud.',cat:'Fauna',place:'Inventario dimensional'},
 {name:'Cristal de Arroyo',qty:6,unit:'fragmentos',cat:'Minerales',place:'Cestas de la cabaña'},
 {name:'Mineral plateado',qty:2,unit:'fragmentos',cat:'Minerales',place:'Cestas de la cabaña'},
 {name:'Geodas cerradas',qty:2,unit:'uds.',cat:'Minerales',place:'Cestas de la cabaña'},
 {name:'Piedras con vetas',qty:6,unit:'uds.',cat:'Minerales',place:'Cestas de la cabaña'}
 ],
 crops:[
 {name:'Zanahorias',count:10,status:'Replantadas',emoji:'🥕'},
 {name:'Lechugas',count:10,status:'Replantadas',emoji:'🥬'},
 {name:'Tomateras',count:10,status:'Produciendo',emoji:'🍅'},
 {name:'Fresal',count:1,status:'Una hilera alargada',emoji:'🍓'}
 ],
 projects:[
 {name:'Construir secadero de hierbas',done:false},
 {name:'Encontrar más arcilla',done:true},
 {name:'Revisar la red de pesca',done:true},
 {name:'Recolectar y replantar verduras',done:true},
 {name:'Cocer la vajilla de arcilla',done:false},
 {name:'Ampliar la cabaña',done:false}
 ],
 journal:[
 {day:1,title:'La primera noche en el claro',body:'Dhalia despierta en Asteria. Explora su parcela y construye con sus propias manos una cabaña pequeña, una cama y una hoguera. Por la noche conoce a Kitt, un animalito crema con una flor azul.'},
 {day:2,title:'Piedras, fresas y un poco de magia',body:'Cuida el manzano y el ciruelo, descubre una planta plateada en el arroyo y coloca una red de pesca. Recoge arcilla, minerales y plantas; teje cestas para exponer sus cristales. Prepara el huerto y descubre que su afinidad acelera el crecimiento hasta producir fresas casi al instante.'},
 {day:3,title:'El claro empieza a florecer',body:'Desayuna una ensalada de su propia cosecha, recolecta y replanta. Comprueba la red y la flor de Kitt, que reacciona a los cristales. Después reúne madera, arcilla, piedras, fibras y hierbas para sus futuras construcciones.'}
 ]
};
function clone(x){return JSON.parse(JSON.stringify(x))}
let data;
try{let saved=JSON.parse(localStorage.getItem(STORAGE));data=valid(saved)?saved:clone(starter)}catch(_){data=clone(starter)}
function valid(x){return !!(x&&Array.isArray(x.inventory)&&Array.isArray(x.crops)&&Array.isArray(x.projects)&&Array.isArray(x.journal))}
function save(){try{localStorage.setItem(STORAGE,JSON.stringify(data))}catch(e){alert('No se ha podido guardar en este navegador. Exporta una copia de tus datos.')}}
function esc(value){return String(value==null?'':value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
const tabs=[['home','⌂','Inicio'],['journal','✎','Diario'],['garden','❀','Huerto'],['inventory','▣','Inventario'],['craft','⚒','Proyectos'],['world','◇','Mapa']];
let active='home';
const nav=document.getElementById('nav');
const view=document.getElementById('view');
function button(label,attrs,secondary){return '<button type="button" class="btn'+(secondary?' secondary':'')+'" '+attrs+'>'+label+'</button>'}
function card(title,body,extra){return '<section class="card '+(extra||'')+'"><h3>'+title+'</h3>'+body+'</section>'}
function record(left,right,sub){return '<div class="record row"><div><strong>'+left+'</strong>'+(sub?'<br><small>'+sub+'</small>':'')+'</div><span class="qty">'+right+'</span></div>'}
function header(title,subtitle){return '<h1 class="page-title">'+title+'</h1><p class="sub">'+subtitle+'</p>'}
function drawNav(){
 nav.innerHTML=tabs.map(function(t){return '<button type="button" data-tab="'+t[0]+'" class="'+(active===t[0]?'active':'')+'" '+(active===t[0]?'aria-current="page"':'')+'><span class="nav-icon">'+t[1]+'</span>'+t[2]+'</button>'}).join('');
 nav.querySelectorAll('[data-tab]').forEach(function(b){b.addEventListener('click',function(){active=b.dataset.tab;render();if(window.innerWidth<740)window.scrollTo({top:0,behavior:'smooth'})})})
}
function home(){
 let remaining=data.projects.filter(function(p){return !p.done});
 let recent=data.journal[data.journal.length-1];
 return '<section class="hero"><img class="hero-image" src="assets/clearing.svg" alt="Cabañita rústica junto a árboles, bancales, arroyo y Kitt en un claro del bosque"><div class="hero-overlay"></div><div class="hero-content"><span class="eyebrow">✦ Una nueva vida en Asteria</span><h1>Un hogar entre<br>raíces y estrellas.</h1><p>Una cabaña hecha a mano. Un huerto que crece con magia. Y Kitt, que siempre está cerca cuando hay fresas.</p><span class="hero-stamp">❧ Nuestro pequeño claro · Año 742</span></div></section>'+
 '<div class="feature-strip"><div class="feature"><strong>🌱 '+data.crops.length+' cultivos</strong><span>Nuestro huerto encantado</span></div><div class="feature"><strong>🪙 '+esc(data.coins)+' platas</strong><span>Ahorros para la aventura</span></div><div class="feature"><strong>📜 '+data.journal.length+' recuerdos</strong><span>Páginas del diario</span></div></div>'+
 '<h2 class="section-title">Rincones de nuestro hogar</h2><div class="grid">'+
 '<section class="card wide art-card"><img src="assets/botanical.svg" alt="Ilustración botánica de fresas y flores"><div class="art-card-content"><span class="tiny">I · El huerto</span><h3>Un milagro entre los bancales</h3><p>Zanahorias, lechugas, tomates y nuestro fresal. Aquí cada planta tiene una historia.</p>'+button('Visitar el huerto','data-go="garden"',true)+'</div></section>'+
 '<section class="card kitt-card"><img src="assets/kitt.svg" alt="Kitt, zorro crema con flor azul"><div><span class="tiny">II · Compañero</span><h3>Kitt</h3><p>Curioso, dormilón y fan absoluto de las fresas. Su flor azul reacciona a la magia.</p><span class="pill">♡ Muy querido</span></div></section>'+
 '<section class="card"><span class="tiny">III · Colecciones</span><h3>Pequeños tesoros</h3><img class="inventory-visual" src="assets/crystals.svg" alt="Cristales verdes azulados"><p>Minerales del arroyo, geodas y piedras expuestas en sus cestas.</p>'+button('Ver inventario','data-go="inventory"',true)+'</section>'+
 card('✎ La última aventura','<span class="tiny">Día '+esc(recent.day)+'</span><h3>'+esc(recent.title)+'</h3><p>'+esc(recent.body.slice(0,225))+'…</p>'+button('Leer diario','data-go="journal"',true),'wide')+
 card('❧ Los próximos planes',remaining.slice(0,4).map(function(p){return '<div class="record">'+esc(p.name)+'</div>'}).join('')+'<div style="margin-top:15px">'+button('Abrir proyectos','data-go="craft"',true)+'</div>')+'</div>'
}
function journal(){
 return header('Diario de aventuras','Las páginas de una vida nueva. Los recuerdos quedan escritos aquí, desde la primera noche en el claro.')+
 '<div class="actions">'+button('＋ Escribir una entrada','data-add="journal"')+button('☼ Avanzar un día','data-add="day"',true)+'</div>'+
 '<div class="grid"><section class="card wide"><div class="tiny">Nuestro libro de recuerdos</div>'+
 data.journal.slice().reverse().map(function(e){return '<article class="entry"><time>Día '+esc(e.day)+' · '+esc(data.season)+' · '+esc(data.year)+'</time><h3>'+esc(e.title)+'</h3><p>'+esc(e.body)+'</p></article>'}).join('')+
 '</section><section class="card"><img class="inventory-visual" style="max-height:220px" src="assets/kitt.svg" alt="Ilustración de Kitt"><h3>Un cuento compartido</h3><p>Cada nueva entrada se queda guardada en tu navegador, como una página de tu propio diario de campo.</p></section></div>'
}
function garden(){
 return header('El huerto encantado','Una semilla, un poquito de agua y la afinidad vegetal de Dhalia. Registra el estado de tus cultivos.')+
 '<div class="actions">'+button('＋ Añadir cultivo','data-add="crop"')+'</div>'+
 '<div class="grid">'+data.crops.map(function(c,i){return '<section class="card crop-card"><div class="crop-emoji">'+esc(c.emoji||'🌱')+'</div><h3>'+esc(c.name)+'</h3><div class="stat">'+esc(c.count)+'</div><p>'+esc(c.status)+'</p>'+button('Editar cultivo','data-editcrop="'+i+'"',true)+'</section>'}).join('')+'</div>'+
 '<h2 class="section-title">El fresal de Dhalia</h2><div class="grid"><section class="card wide art-card"><img style="height:310px" src="assets/botanical.svg" alt="Lámina botánica del fresal"><div class="art-card-content"><h3>Fragaria · El primer gran milagro</h3><p>Las semillas brotaron casi inmediatamente gracias a su magia. Kitt y Dhalia celebraron el descubrimiento con un festín de fresas.</p></div></section>'+
 card('✿ Nota del cuaderno','<p>La magia acelera el crecimiento, pero la tierra sigue necesitando agua y nutrientes. Guarda semillas y observa la salud del suelo.</p><span class="pill">Primavera · Año 742</span>')+'</div>'
}
function inventory(){
 let cats=[...new Set(data.inventory.map(function(x){return x.cat}))];
 return header('Inventario y colecciones','Materiales del inventario dimensional y objetos que Dhalia prefiere ver y tocar en casa.')+
 '<div class="actions">'+button('＋ Añadir recurso','data-add="item"')+button('↓ Exportar copia','id="export"',true)+button('↑ Importar copia','id="import"',true)+'<input id="importFile" class="hidden" type="file" accept="application/json,.json"></div>'+
 '<div class="inventory-grid">'+cats.map(function(cat){let rows=data.inventory.map(function(x,i){return {x:x,i:i}}).filter(function(e){return e.x.cat===cat});
 return '<section class="card"><span class="tiny">Colección</span><h3>'+esc(cat)+'</h3>'+(cat==='Minerales'?'<img class="inventory-visual" src="assets/crystals.svg" alt="Cristales del arroyo">':'')+
 rows.map(function(e){return '<div class="record row"><div><strong>'+esc(e.x.name)+'</strong><br><small>'+esc(e.x.place)+'</small></div><div style="text-align:right"><span class="qty">'+esc(e.x.qty)+' '+esc(e.x.unit)+'</span><br>'+button('Editar','data-edititem="'+e.i+'"',true).replace('class="btn secondary"','class="btn secondary small"')+'</div></div>'}).join('')+'</section>'
 }).join('')+'</div><div class="notice">✿ Las cantidades de partida son orientativas cuando el relato no especificó una cifra exacta. Las piedras expuestas en la cabaña se registran separadas del inventario dimensional. Antes de cambiar de dispositivo, exporta tus datos.</div>'
}
function craft(){
 let n=data.projects.filter(function(p){return p.done}).length;let total=data.projects.length;return header('Taller y proyectos','Nada aparece de la nada: construimos con la madera, la arcilla y las piedras que conseguimos en Asteria.')+
 '<div class="actions">'+button('＋ Nuevo proyecto','data-add="project"')+'</div>'+
 card('El progreso de nuestro claro','<div class="stat">'+n+' de '+total+' proyectos completados</div><div class="progress"><span style="width:'+(total?100*n/total:0)+'%"></span></div>','full')+
 '<div class="grid" style="margin-top:16px">'+
 '<section class="card wide"><h3>Lista de tareas</h3>'+data.projects.map(function(p,i){return '<label class="record row" style="cursor:pointer"><span><input class="check" type="checkbox" data-check="'+i+'" '+(p.done?'checked':'')+'> &nbsp; '+esc(p.name)+'</span><small>'+(p.done?'Completado':'Pendiente')+'</small></label>'}).join('')+'</section>'+
 card('🏡 Cabaña de madera','<p>Una habitación con cama, puerta y cestas llenas de recuerdos.</p><span class="pill">Construida</span>')+
 card('🔥 Horno de piedra','<p>Un horno rústico para cocinar y, cuando esté preparado, hacer pruebas de cerámica.</p><span class="pill">Construido</span>')+
 card('🏺 Vajilla de arcilla','<p>Regadera, platos y cuencos moldeados. Pendientes de secado y cocción.</p><span class="pill">En proceso</span>')+
 card('🌿 Secadero de hierbas','<p>Una idea para conservar menta, romero, tomillo y otras plantas del bosque.</p><span class="pill">Por construir</span>')+
 '</div>'
}
function world(){
 return header('El mundo de Asteria','El claro está lleno de pequeños secretos. Algunos lugares ya son familiares; otros todavía nos esperan.')+
 '<div class="map-wrap"><img class="map-art" src="assets/clearing.svg" alt="Vista ilustrada de la cabaña, el huerto, el arroyo, frutales y bosque">'+
 '<span class="map-label" style="top:31%;left:45%">🏡 Cabaña</span><span class="map-label" style="top:72%;left:19%">🥕 Huerto</span><span class="map-label" style="top:70%;right:2%">💧 Arroyo</span><span class="map-label" style="top:42%;left:7%">🍎 Frutales</span></div>'+
 '<p class="map-note">Mapa artístico del claro, no un plano a escala.</p><div class="grid" style="margin-top:20px">'+
 card('🌳 El claro','<p>Una parcela en el bosque con cabaña hecha a mano, huerto, horno, hoguera y árboles frutales.</p>')+
 card('💧 El arroyo','<p>La red de pesca, depósitos de arcilla, cristales verdes y una planta plateada protegida bajo raíces.</p>')+
 card('🏘️ Sauceblanco','<p>Una pequeña aldea cercana, aún por visitar.</p><span class="pill">Por explorar</span>')+'</div>'
}
function render(){
 drawNav();
 document.getElementById('dayLabel').textContent='Día '+data.day+' · '+data.season+' · '+data.year;
 view.innerHTML=({home:home,journal:journal,garden:garden,inventory:inventory,craft:craft,world:world}[active])();
 view.querySelectorAll('[data-go]').forEach(function(b){b.addEventListener('click',function(){active=b.dataset.go;render()})});
 view.querySelectorAll('[data-add]').forEach(function(b){b.addEventListener('click',function(){edit(b.dataset.add)})});
 view.querySelectorAll('[data-editcrop]').forEach(function(b){b.addEventListener('click',function(){edit('crop',Number(b.dataset.editcrop))})});
 view.querySelectorAll('[data-edititem]').forEach(function(b){b.addEventListener('click',function(){edit('item',Number(b.dataset.edititem))})});
 view.querySelectorAll('[data-check]').forEach(function(b){b.addEventListener('change',function(){data.projects[Number(b.dataset.check)].done=b.checked;save();render()})});
 let exporter=document.getElementById('export');
 if(exporter)exporter.addEventListener('click',function(){let blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});let url=URL.createObjectURL(blob);let a=document.createElement('a');a.href=url;a.download='dhalia-copia-seguridad.json';a.click();setTimeout(function(){URL.revokeObjectURL(url)},1000)});
 let importer=document.getElementById('import');
 if(importer)importer.addEventListener('click',function(){document.getElementById('importFile').click()});
 let file=document.getElementById('importFile');
 if(file)file.addEventListener('change',async function(){if(!file.files[0])return;try{let incoming=JSON.parse(await file.files[0].text());if(!valid(incoming))throw new Error('Formato no válido');if(confirm('¿Sustituir todos los datos actuales por esta copia de seguridad?')){data=incoming;save();render()}}catch(e){alert('No se pudo importar la copia: '+e.message)}})
}
const modal=document.getElementById('modal');
const form=document.getElementById('modalForm');
document.getElementById('cancel').addEventListener('click',function(){modal.close()});
function edit(kind,index){
 if(kind==='day'){if(confirm('¿Avanzar al siguiente día de la historia?')){data.day+=1;save();render()}return}
 index=typeof index==='number'?index:-1;
 let previous=kind==='crop'?data.crops[index]:kind==='item'?data.inventory[index]:null;
 let specs={
 journal:[['title','Título de la aventura','text'],['body','¿Qué ha sucedido?','textarea']],
 crop:[['name','Cultivo','text'],['count','Número de plantas o bancales','number'],['status','Estado actual','text'],['emoji','Emoji','text']],
 item:[['name','Recurso','text'],['qty','Cantidad','number'],['unit','Unidad','text'],['cat','Categoría','text'],['place','Ubicación (inventario o cabaña)','text']],
 project:[['name','Nombre del proyecto','text']]
 };
 document.getElementById('modalTitle').textContent={journal:'Nueva página del diario',crop:'Cultivo del huerto',item:'Recurso o colección',project:'Nuevo proyecto'}[kind];
 document.getElementById('modalFields').innerHTML=specs[kind].map(function(s){
 let v=previous?previous[s[0]]:'';
 return '<label class="field">'+s[1]+(s[2]==='textarea'?'<textarea name="'+s[0]+'" required>'+esc(v)+'</textarea>':'<input name="'+s[0]+'" type="'+s[2]+'" '+(s[2]==='number'?'min="0" step="any"':'')+' value="'+esc(v)+'" required>')+'</label>'
 }).join('');
 form.onsubmit=function(event){
 event.preventDefault();
 let record=Object.fromEntries(new FormData(form));
 if(kind==='journal')data.journal.push({day:data.day,title:record.title,body:record.body});
 if(kind==='crop'){record.count=Number(record.count);if(index>=0)data.crops[index]=record;else data.crops.push(record)}
 if(kind==='item'){record.qty=Number(record.qty);if(index>=0)data.inventory[index]=record;else data.inventory.push(record)}
 if(kind==='project')data.projects.push({name:record.name,done:false});
 save();modal.close();render()
 };
 modal.showModal()
}
render();
