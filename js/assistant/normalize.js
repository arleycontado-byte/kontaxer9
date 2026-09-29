import { INTENTS, STOPWORDS, SYNONYMS } from './knowledge-base.js';
const ABBREVIATIONS=Object.freeze({q:'que',xq:'porque',pq:'porque',info:'informacion',xfa:'por favor',porfa:'por favor',tb:'tambien',d:'de',x:'por'});
// Palabras frecuentes protegidas: el corrector nunca las modifica.
const COMMON=new Set('a abarca abajo abrir abril abogado acerca actividad adelante además ademas ahora agua alguien alguna algunas alguno algunos allí alli alto amiga amigo andar año anos antes acompanar acompanamiento apoyo aquí aqui así asi ayudar ayuda ayer bajo bastante bien buenas bueno cada caja calle cambiar camino campo cantidad casa casi caso ciudad claro cliente cobrar comercio comprar común como conocer consulta contar continuar correo cosa cuando cuenta cuentas cuyo dar dato datos debe dejar dentro desde después despues día dias dinero decir diferentes difícil dificil donde dos durante edad ejemplo empresa emprendedor enviar equipo era escribir espacio estado estar esta este esto éxito experiencia fácil facil fecha feliz forma fuera general gracias grupo haber hacer hacia hasta hola hora hoy idea igual importante información informacion ingreso inicio interés interes lado leer llevar local luego lugar manera mayor mejor mercado mesa mes mismo momento muy nombre negocio ni nuevo número numero objetivo oficina opción opcion otro pago palabra papel parte pasar pedir persona personas pero poco poder poner porque posible primero principal problema pronto puede pueden que quien quiero razón recibir recurso registro revisar salida ser servicio si sin sobre solo solución solucion soy su suma tener tiempo tienda tipo todo trabajo tres tu uno usar usuario valor varios venta ver vez vida virtual web zona'.split(' '));
export function cleanText(input=''){return String(input).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/([a-z])\1{2,}/g,'$1$1').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();}
export function stem(word){let w=SYNONYMS[word]||word;for(const suffix of ['amientos','imientos','aciones','adores','adoras','acion','ucion','mente','ando','iendo','ados','adas','idos','idas','aron','ieron','amos','emos','imos','an','en','es','os','as','s'])if(w.length-suffix.length>=4&&w.endsWith(suffix)){w=w.slice(0,-suffix.length);break;}if(w.length>5&&/[ao]$/.test(w))w=w.slice(0,-1);return w;}
const DOMAIN_WORDS=new Set(INTENTS.flatMap(i=>i.keywords).flatMap(term=>term.split(' ')));
const DOMAIN=new Set([...DOMAIN_WORDS,...[...DOMAIN_WORDS].map(stem)]);
function damerau(a,b){const d=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));for(let i=0;i<=a.length;i++)d[i][0]=i;for(let j=0;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++){d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])d[i][j]=Math.min(d[i][j],d[i-2][j-2]+1);}return d[a.length][b.length];}
export function normalize(input=''){
 const original=cleanText(input).split(' ').filter(Boolean),expanded=original.flatMap(w=>(ABBREVIATIONS[w]||w).split(' ')),corrected=[];
 const safe=expanded.map(word=>{
  if(word.length<5||COMMON.has(word))return word;
  const limit=word.length>=9?2:1;let best=word,bestDistance=Infinity;
  for(const candidate of DOMAIN){if(Math.abs(candidate.length-word.length)>limit)continue;const distance=damerau(word,candidate);if(distance<bestDistance){best=candidate;bestDistance=distance;}}
  if(best!==word&&bestDistance<=limit){corrected.push({from:word,to:best});return best;}
  return word;
 });
 return {original:String(input),text:safe.join(' '),tokens:safe.map(stem).filter(w=>!STOPWORDS.has(w)),corrected,segments:String(input).split(/[,;.!?]+|\s+y\s+/i).map(s=>s.trim()).filter(Boolean)};
}
