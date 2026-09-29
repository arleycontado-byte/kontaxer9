import assert from 'node:assert/strict';
import { createEngine } from '../js/assistant/engine.js';
import { normalize, cleanText } from '../js/assistant/normalize.js';
import { scoreIntents } from '../js/assistant/scorer.js';
import { INTENTS, SERVICES } from '../js/assistant/knowledge-base.js';

let count=0;const test=(name,fn)=>{fn();count++;};
test('normalización de tildes, signos y abreviaturas',()=>{assert.equal(cleanText('¿Árboles, INFO!'),'arboles info');assert.equal(normalize('q info xfa').text,'que informacion por favor');});
test('el corrector solo arregla errores de palabras del dominio',()=>{const result=normalize('inpuestos');assert.equal(result.text,'impuestos');assert.deepEqual(result.corrected[0],{from:'inpuestos',to:'impuestos'});});
test('no cambia palabras válidas comunes ni el par buenas/cuentas',()=>{const result=normalize('tengo buenas cuentas y quiero contar');assert.equal(result.text,'tengo buenas cuentas y quiero contar');assert.deepEqual(result.corrected,[]);});
test('segmenta mensajes con varias intenciones',()=>{assert.deepEqual(normalize('hola, necesito un contador. Gracias').segments,['hola','necesito un contador','Gracias']);});
test('clasifica errores de ortografía con léxico seguro',()=>{assert.equal(createEngine().reply('tengo dudas de inpuestos').intent,'service_tributaria');});
test('detecta ambas intenciones en un mensaje combinado',()=>{const result=createEngine().reply('hola, necesito un contador');assert.ok(result.intents.includes('greeting'));assert.ok(result.intents.includes('service_contabilidad'));});
test('la despedida y el agradecimiento se conservan',()=>{const result=createEngine().reply('gracias, adios');assert.ok(result.intents.includes('thanks'));assert.ok(result.intents.includes('farewell'));});
test('incluye diagnóstico suficiente para ?debug',()=>{const result=createEngine().reply('datos de contacto');assert.ok(result.alternatives.length<=3);assert.ok(result.segments.length);assert.ok(result.confidence);assert.ok(result.reason);});
test('extrae y conserva el nombre entre turnos y sesiones',()=>{
 const values=new Map();Object.defineProperty(globalThis,'sessionStorage',{configurable:true,value:{getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value),removeItem:key=>values.delete(key)}});
 const first=createEngine();first.reply('soy Carlos');assert.equal(first.getMemory().name,'Carlos');
 const restored=createEngine();assert.equal(restored.getMemory().name,'Carlos');assert.match(restored.reply('hola').text,/Carlos/);
 delete globalThis.sessionStorage;
});
test('servicio recordado tolera formas cercanas',()=>{const engine=createEngine();engine.reply('estoy buscando auditorías');assert.equal(engine.getMemory().service,'auditorias');engine.reset();});
test('hay al menos 60 intenciones y 10 ejemplos por cada una',()=>{assert.ok(INTENTS.length>=60);assert.ok(INTENTS.every(item=>item.examples.length>=10));});
test('toda intención tiene una respuesta sin valores no definidos',()=>{for(const item of INTENTS){const result=createEngine().reply(item.examples[0]);assert.ok(result.text.trim(),item.id);assert.ok(!result.text.includes('undefined'),item.id);}});
test('respuestas no inventan precios, horarios, direcciones ni credenciales',()=>{
 const forbidden=[/\$\s?\d/,/\bCOP\s?\d/i,/\b\d{1,2}:\d{2}\b/,/\b(?:calle|carrera|avenida)\s+\d/i,/\b(?:certificados|certificación garantizada|clientes reconocidos)\b/i];
 for(const item of INTENTS){const text=createEngine().reply(item.examples[0]).text;for(const pattern of forbidden)assert.doesNotMatch(text,pattern,`${item.id}: ${text}`);}
});
test('cada servicio trae la descripción confirmada',()=>{assert.match(SERVICES[0].includes,/registros|conciliaciones|estados financieros|reportes/);assert.match(SERVICES[1].includes,/obligaciones|acompañamiento/);assert.match(SERVICES[2].includes,/control|oportunidades|recomendaciones/);assert.match(SERVICES[3].includes,/presupuestos|proyecciones|KPIs/);});
const top=scoreIntents('necesito organizar mis cuentas',normalize('necesito organizar mis cuentas').tokens);
test('el ranking incluye una intención contable arriba',()=>assert.equal(top[0].id,'service_contabilidad'));
console.log(`OK: ${count} pruebas adicionales aprobadas.`);
