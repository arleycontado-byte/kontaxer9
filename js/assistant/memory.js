import { SERVICES } from './knowledge-base.js';
import { cleanText } from './normalize.js';
export function createMemory(){return {name:'',topic:'',service:'',turns:[]};}
export function remember(memory,normalized,name=''){
 const m={...memory,turns:[...(memory.turns||[]),{topic:normalized.text}].slice(-5)};
 if(name)m.name=name;
 const text=cleanText(normalized.text);
 const service=SERVICES.find(s=>s.id==='contabilidad'&&/contabil|contador|cuenta|libro/.test(text))||SERVICES.find(s=>s.id==='tributaria'&&/tribut|impuesto|renta|declaracion|iva/.test(text))||SERVICES.find(s=>s.id==='auditorias'&&/auditor|revision|control/.test(text))||SERVICES.find(s=>s.id==='finanzas'&&/finanz|presupuesto|proyeccion|flujo de caja/.test(text));
 if(service)m.service=service.id;
 m.topic=text;
 return m;
}
