import { normalize } from './normalize.js';
import { scoreIntents } from './scorer.js';
import { createMemory, remember } from './memory.js';
import { answer } from './responder.js';

const KEY='kontaxer-assistant-v2', COURTESY=new Set(['greeting','thanks','farewell','how_are_you','laugh']);
const SAFE_FALLBACK={id:'fallback',label:'Consulta general',score:0};
function loadMemory(){try{return {...createMemory(),...JSON.parse(globalThis.sessionStorage?.getItem(KEY)||'{}')}}catch{return createMemory()}}
function saveMemory(memory){try{globalThis.sessionStorage?.setItem(KEY,JSON.stringify(memory))}catch{}}

export function createEngine(){
 let memory=loadMemory();
 return {
  reset(){memory=createMemory();try{globalThis.sessionStorage?.removeItem(KEY)}catch{}},
  getMemory(){return {...memory}},
  reply(message){
   const n=normalize(message), chunks=n.segments.length?n.segments:[String(message)], found=[];
   for(const chunk of chunks){
   const part=normalize(chunk), ranked=scoreIntents(part.text,part.tokens);
    for(const candidate of ranked.slice(0,2))if(candidate.score>=.53&&ranked[0].score-candidate.score<=.14&&!found.some(item=>item.id===candidate.id))found.push(candidate);
   }
   let ranked=scoreIntents(n.text,n.tokens), best=ranked[0];
   // El texto completo gana a fragmentos; los fragmentos aportan cortesías y otras intenciones explícitas.
   for(const candidate of ranked.slice(0,3))if(candidate.score>=.53&&ranked[0].score-candidate.score<=.14&&!found.some(item=>item.id===candidate.id))found.push(candidate);
   const serviceIds=new Set(found.map(item=>item.id).filter(id=>id.startsWith('service_')&&!['service_unconfirmed'].includes(id)));
   if(n.segments.length>1&&serviceIds.size>1&&!found.some(item=>item.id==='multi_service'))found.push({id:'multi_service',label:'Varios servicios',score:.9});
   const nameCandidate=extractName(n.text);
   if(nameCandidate&&!found.some(item=>item.id==='name'))found.push({id:'name',label:'Nombre',score:.94});
   if(!n.text)found.unshift({id:'empty',label:'Vacío',score:.99});
   if(!found.length)found.push(SAFE_FALLBACK);
   // Priorizar preguntas principales; una despedida cierra el turno y los saludos no tapan la consulta.
   let main=found.filter(item=>!COURTESY.has(item.id)).sort((a,b)=>b.score-a.score||priority(b.id)-priority(a.id))[0]||found[0];
   if(found.some(item=>item.id==='farewell'))main=found.find(item=>item.id==='farewell');
   const ids=found.map(item=>item.id);
   const previous={...memory};
   memory=remember(memory,n,nameCandidate);saveMemory(memory);
   const result=answer(main.id,previous,{intents:ids,normalized:n});
   const confidence=main.score>=.8?'alta':main.score>=.58?'media':'baja';
   const threshold=confidence==='alta'?.8:confidence==='media'?.58:.53;
   const alternatives=ranked.slice(0,3);
   return {...result,intent:main.id,intents:ids,score:main.score,confidence,threshold,reason:main.id==='fallback'?'sin señal suficiente':`coincidieron: ${(main.matchedTerms||[]).join(', ')||main.label}`,corrected:n.corrected,tokens:n.tokens,segments:n.segments,alternatives};
  }
 };
}
function priority(id){return ({services:13,price:12,contact:10,multi_service:9,compare_services:9,service_unconfirmed:9,first_step:8,privacy:8,coverage:7,discount:7,payment:7,duration:7,experience:7,trust:7})[id]||0;}
function extractName(text){
 const match=text.match(/(?:me llamo|mi nombre es|puedes llamarme|soy)\s+([a-z]+(?:\s+[a-z]+)?)/i);
 if(!match)return '';
 const candidate=match[1].trim();
 if(['persona natural','emprendedor','emprendedora','contador','contadora','independiente','cliente'].includes(candidate))return '';
 return candidate.split(' ').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ');
}
