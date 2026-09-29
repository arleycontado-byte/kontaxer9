import { BUSINESS, SERVICES, FAQ, INTENTS } from './js/assistant/knowledge-base.js';
import { createEngine } from './js/assistant/engine.js';

const $=selector=>document.querySelector(selector);
const safeGet=key=>{try{return sessionStorage.getItem(key)}catch{return null}};
const safeSet=(key,value)=>{try{sessionStorage.setItem(key,value)}catch{}};
const safeRemove=key=>{try{sessionStorage.removeItem(key)}catch{}};
const safeParse=(value,fallback)=>{try{return JSON.parse(value)||fallback}catch{return fallback}};
const engine=createEngine(),storeKey='kontaxer-chat-v2',draftKey='kontaxer-form-draft-v2';
let chatHistory=safeParse(safeGet(storeKey),[]),step=0,draft=safeParse(safeGet(draftKey),{}),results=[],activeResult=0,busy=false;
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fold=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es');

function renderServices(){
 $('#service-grid').innerHTML=SERVICES.map(s=>`<article class="service-card"><img class="service-art" src="${esc(s.image)}" alt="${esc(s.imageAlt)}" width="720" height="300" loading="lazy"><p class="eyebrow">KONTAXER</p><h3>${esc(s.name)}</h3><p>${esc(s.summary)}</p><button class="button secondary" data-service="${s.id}">Conocer el servicio</button></article>`).join('');
 document.querySelectorAll('[data-service]').forEach(button=>button.onclick=()=>showService(button.dataset.service));
}
function renderFAQ(){$('#faq-list').innerHTML=FAQ.map(item=>`<details class="faq-item"><summary>${esc(item.q)}</summary><p>${esc(item.a)}</p></details>`).join('');}
function showService(id){
 const service=SERVICES.find(item=>item.id===id);if(!service)return;
 $('#service-detail').innerHTML=`<p class="eyebrow">Servicio KONTAXER</p><h2>${esc(service.name)}</h2><p>${esc(service.summary)}</p><h3>Qué incluye</h3><p>${esc(service.includes)}</p><h3>Para quién es</h3><p>${esc(service.audience)}</p><h3>Qué conviene tener a mano</h3><p>${esc(service.prepare)}</p><a class="button primary" href="#contacto" data-close-service>Preparar solicitud</a>`;
 $('#service-detail [data-close-service]').onclick=()=>$('#service-dialog').close();
 if(!$('#service-dialog').open)$('#service-dialog').showModal();
}

const formSteps=[
 {title:'Tu contacto',fields:[['name','Nombre','text'],['phone','Teléfono (opcional)','tel'],['email','Correo electrónico (opcional)','email']]},
 {title:'Tu negocio',fields:[['business','Nombre del negocio (opcional)','text'],['activity','Actividad (opcional)','text']]},
 {title:'Tu consulta',fields:[['service','Servicio de interés (opcional)','select'],['message','¿Qué necesitas?','textarea']]},
 {title:'Revisa y continúa',fields:[]}
];
const labels={name:'Nombre',phone:'Teléfono',email:'Correo electrónico',business:'Negocio',activity:'Actividad',service:'Servicio de interés',message:'Consulta'};
function renderStep(){
 const config=formSteps[step];$('#progress').textContent=`Paso ${step+1} de 4 · ${config.title}`;$('#form-back').disabled=step===0;$('#form-next').textContent=step===3?'Preparar mensaje':'Continuar';
 if(step===3){$('#form-step').innerHTML='';$('#form-summary').hidden=false;$('#form-summary').innerHTML=`<div class="summary"><h3>Resumen de solicitud</h3>${Object.entries(draft).filter(([,value])=>value).map(([key,value])=>`<p><b>${esc(labels[key]||key)}:</b> ${esc(value)}</p>`).join('')}</div>`;return;}
 $('#form-summary').hidden=true;
 $('#form-step').innerHTML=config.fields.map(([key,label,type])=>{
  const value=esc(draft[key]||'');
  if(type==='select')return `<label for="f-${key}">${esc(label)}<select id="f-${key}" name="${key}" aria-describedby="e-${key}"><option value="">Elige una opción</option>${SERVICES.map(service=>`<option ${draft[key]===service.name?'selected':''}>${esc(service.name)}</option>`).join('')}</select><span class="error" id="e-${key}"></span></label>`;
  if(type==='textarea')return `<label for="f-${key}">${esc(label)}<textarea id="f-${key}" name="${key}" required aria-describedby="e-${key}">${value}</textarea><span class="error" id="e-${key}"></span></label>`;
  return `<label for="f-${key}">${esc(label)}<input id="f-${key}" name="${key}" type="${type}" value="${value}" ${key==='name'?'required':''} aria-describedby="e-${key}"><span class="error" id="e-${key}"></span></label>`;
 }).join('');
 $('#form-step').querySelectorAll('input,select,textarea').forEach(element=>element.oninput=()=>{draft[element.name]=element.value;safeSet(draftKey,JSON.stringify(draft));});
}
function validateStep(){
 let valid=true;
 $('#form-step').querySelectorAll('input,select,textarea').forEach(element=>{
  const value=element.value.trim(),bad=(element.required&&!value)||(Boolean(value)&&element.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))||(Boolean(value)&&element.type==='tel'&&!/^[+\d ()-]{7,}$/.test(value));
  element.setAttribute('aria-invalid',String(bad));const error=$(`#e-${element.name}`);if(error)error.textContent=bad?(element.name==='email'?'Escribe un correo válido.':'Este campo es obligatorio.'):'';
  if(bad)valid=false;
 });
 if(!valid)$('#form-step [aria-invalid="true"]')?.focus({preventScroll:true});
 return valid;
}
function messageForTeam(){return `Hola, quiero consultar a KONTAXER.\nNombre: ${draft.name||''}\nTeléfono: ${draft.phone||''}\nCorreo: ${draft.email||''}\nNegocio: ${draft.business||''}\nActividad: ${draft.activity||''}\nServicio: ${draft.service||''}\nConsulta: ${draft.message||''}`;}
$('#form-back').onclick=()=>{if(step>0){step--;renderStep();}};
$('#form-next').onclick=()=>{
 if(step<3){if(validateStep()){step++;renderStep();}return;}
 const message=messageForTeam(),box=$('#form-summary');box.hidden=false;
 box.innerHTML=`<p>El mensaje está listo. Los datos del formulario se conservan en esta sesión del navegador.</p><div class="actions"><button type="button" class="button secondary" id="copy-message">Copiar mensaje</button><a class="button primary" target="_blank" rel="noopener noreferrer" href="https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}">Continuar por WhatsApp</a><a class="button secondary" href="mailto:${BUSINESS.email}?subject=${encodeURIComponent('Consulta para KONTAXER')}&body=${encodeURIComponent(message)}">Correo</a><button type="button" class="button secondary" id="clear-draft">Borrar datos</button></div>`;
 $('#copy-message').onclick=async()=>{try{await navigator.clipboard.writeText(message);$('#copy-message').textContent='Copiado';}catch{$('#copy-message').textContent='No se pudo copiar';}};
 $('#clear-draft').onclick=()=>{draft={};step=0;safeRemove(draftKey);renderStep();};
};

function guideOpen(){const dialog=$('#guide-dialog');$('#guide-result').innerHTML='';$('#guide-form').hidden=false;if(!dialog.open)dialog.showModal();}
$('#guide-open').onclick=guideOpen;
$('#guide-form').onsubmit=event=>{
 event.preventDefault();if(!event.currentTarget.reportValidity())return;
 const data=new FormData(event.currentTarget),need=String(data.get('need'));let service=SERVICES[0];
 if(need.includes('tributario'))service=SERVICES[1];if(need.includes('Revisar'))service=SERVICES[2];if(need.includes('finanzas'))service=SERVICES[3];
 draft.activity=data.get('activity');draft.message=`Objetivo: ${data.get('goal')}. Necesidad: ${need}.`;draft.service=service.name;safeSet(draftKey,JSON.stringify(draft));
 $('#guide-result').innerHTML=`<h3>Orientación inicial: ${esc(service.name)}</h3><p>${esc(service.summary)} La recomendación concreta depende de la consulta y se confirma con KONTAXER.</p><button class="button primary" id="use-guide">Continuar con esta solicitud</button>`;
 $('#guide-form').hidden=true;$('#use-guide').onclick=()=>{$('#guide-dialog').close();step=0;renderStep();location.hash='contacto';};
};

function updateChat(){
 const area=$('#chat');area.innerHTML=chatHistory.map(message=>`<div class="bubble ${message.role==='user'?'user':''}">${esc(message.text)}${message.buttons?.length?`<div class="bubble-actions">${message.buttons.map(button=>`<button class="chip" data-action="${esc(button.action)}">${esc(button.label)}</button>`).join('')}</div>`:''}</div>`).join('');
 area.scrollTop=area.scrollHeight;area.querySelectorAll('[data-action]').forEach(button=>button.onclick=()=>action(button.dataset.action));safeSet(storeKey,JSON.stringify(chatHistory));
}
function action(value){
 if(value==='services')location.hash='servicios';else if(value==='form'){location.hash='contacto';$('#form-step input')?.focus({preventScroll:true});}
 else if(value==='guide')guideOpen();else if(value==='whatsapp')window.open(`https://wa.me/${BUSINESS.whatsapp}`,'_blank','noopener,noreferrer');
 else if(value==='email')location.href=`mailto:${BUSINESS.email}`;else if(value==='confirm')send('sí');
 else if(value.startsWith('intent:')){const intent=INTENTS.find(item=>item.id===value.slice(7));if(intent)send(intent.examples[0]);}
}
function renderDebug(result){
 const panel=$('#debug-panel');if(!new URLSearchParams(location.search).has('debug'))return;
 panel.hidden=false;panel.innerHTML=`<pre>intención: ${esc(result.intent)}\nintenciones: ${esc(result.intents.join(', '))}\ntop-3: ${esc(result.alternatives.map(item=>`${item.id}=${item.score}`).join(' · '))}\ntokens: ${esc(result.tokens.join(', '))}\ncorrecciones: ${esc(result.corrected.map(item=>`${item.from}→${item.to}`).join(', ')||'ninguna')}\nsegmentos: ${esc(result.segments.join(' | '))}\numbral: ${result.threshold} · confianza ${esc(result.confidence)}\nmotivo: ${esc(result.reason)}</pre>`;
}
function send(text){
 if(!text.trim()||busy)return false;busy=true;
 const submit=$('#chat-form button[type="submit"]');submit.disabled=true;
 chatHistory.push({role:'user',text},{role:'assistant',text:'Escribiendo…',typing:true});updateChat();
 window.setTimeout(()=>{
  chatHistory.pop();const result=engine.reply(text);chatHistory.push({role:'assistant',text:result.text,buttons:result.buttons});updateChat();renderDebug(result);busy=false;submit.disabled=false;
 },180);return true;
}
$('#chat-form').onsubmit=event=>{event.preventDefault();const input=$('#chat-input'),text=input.value;if(send(text))input.value='';};
document.querySelectorAll('[data-message]').forEach(button=>button.onclick=()=>send(button.dataset.message));
$('#clear-chat').onclick=()=>{chatHistory=[];engine.reset();safeRemove(storeKey);chatHistory.push({role:'assistant',text:'¡Hola! Soy el asistente local de KONTAXER. ¿Qué servicio necesitas consultar?'});updateChat();};

const searchable=[...SERVICES.map(item=>({title:item.name,body:item.summary,href:'#servicios',id:item.id})),...FAQ.map(item=>({title:item.q,body:item.a,href:'#faq'})),...['Cómo te ayudamos','Quiénes somos','Contacto','Asistente KONTAXER'].map((title,index)=>({title,body:'Sección KONTAXER',href:['#como-ayudamos','#nosotros','#contacto','#asistente'][index]}))];
function highlight(title,query){
 const folded=fold(title),needle=fold(query).trim();if(!needle)return esc(title);const start=folded.indexOf(needle);if(start<0)return esc(title);
 const map=[];let count=0;for(let i=0;i<title.length;i++){const part=title[i].normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('es');for(let j=0;j<part.length;j++)map[count++]=i;}
 const from=map[start]??0,to=(map[start+needle.length-1]??title.length-1)+1;return `${esc(title.slice(0,from))}<mark>${esc(title.slice(from,to))}</mark>${esc(title.slice(to))}`;
}
function search(query){const term=fold(query.trim());results=term?searchable.filter(item=>fold(`${item.title} ${item.body}`).includes(term)):[];activeResult=0;renderResults(query);}
function renderResults(query=''){
 const list=$('#search-results');list.innerHTML=results.length?results.map((item,index)=>`<li class="${index===activeResult?'result-active':''}" data-index="${index}" tabindex="0"><b>${highlight(item.title,query)}</b><br><span>${esc(item.body)}</span></li>`).join(''):'<li>No encontramos resultados.</li>';
 list.querySelectorAll('[data-index]').forEach(element=>element.onclick=()=>{const item=results[Number(element.dataset.index)];$('#search-dialog').close();if(item.id)showService(item.id);else location.hash=item.href;});
}
function openSearch(){const dialog=$('#search-dialog');if(!dialog.open)dialog.showModal();$('#search-input').focus({preventScroll:true});}
$('#search-open').onclick=openSearch;$('#search-input').oninput=event=>search(event.target.value);
document.addEventListener('keydown',event=>{
 if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();openSearch();}
 if($('#search-dialog').open&&['ArrowDown','ArrowUp','Enter'].includes(event.key)){
  if(event.key==='ArrowDown')activeResult=Math.min(activeResult+1,results.length-1);if(event.key==='ArrowUp')activeResult=Math.max(activeResult-1,0);
  if(event.key==='Enter'&&results[activeResult]){$(`#search-results [data-index="${activeResult}"]`)?.click();return;}renderResults($('#search-input').value);
 }
});
$('#menu-toggle').onclick=()=>{const nav=$('#main-nav'),open=nav.classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(open));};

$('#year').textContent=new Date().getFullYear();
$('#contact-links').insertAdjacentHTML('afterbegin',`<a href="https://wa.me/${BUSINESS.whatsapp}" target="_blank" rel="noopener noreferrer">WhatsApp ${BUSINESS.phone}</a><a href="mailto:${BUSINESS.email}">${BUSINESS.email}</a><a href="${BUSINESS.instagram}" target="_blank" rel="noopener noreferrer">Instagram @kontaxer</a>`);
renderServices();renderFAQ();renderStep();
if(!chatHistory.length)chatHistory.push({role:'assistant',text:'¡Hola! Soy el asistente local de KONTAXER. ¿Qué servicio necesitas consultar?',buttons:[{label:'Ver servicios',action:'services'},{label:'Hablar por WhatsApp',action:'whatsapp'}]});updateChat();
$('#structured-data').textContent=JSON.stringify({'@context':'https://schema.org','@type':'ProfessionalService','name':BUSINESS.brand,'description':BUSINESS.category,'telephone':'+'+BUSINESS.whatsapp,'email':BUSINESS.email,'sameAs':[BUSINESS.instagram],'makesOffer':SERVICES.map(service=>({'@type':'Offer','itemOffered':{'@type':'Service','name':service.name,'description':service.summary}}))});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
window.addEventListener('online',()=>$('#connection').textContent='Conexión disponible · asistente local');window.addEventListener('offline',()=>$('#connection').textContent='Sin conexión · sitio y asistente local disponibles');
