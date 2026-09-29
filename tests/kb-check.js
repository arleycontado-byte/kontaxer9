import assert from 'node:assert/strict';
import { INTENTS, SERVICES } from '../js/assistant/knowledge-base.js';
import { answer } from '../js/assistant/responder.js';
import { createMemory } from '../js/assistant/memory.js';

assert.ok(INTENTS.length>=60,`Solo hay ${INTENTS.length} intenciones.`);
const seen=new Map();
for(const intent of INTENTS){
 assert.ok(intent.examples.length>=10,`${intent.id}: requiere al menos 10 ejemplos.`);
 const response=answer(intent.id,createMemory());assert.ok(response.text.trim(),`${intent.id}: falta respuesta.`);
 for(const phrase of intent.examples){const normalized=phrase.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();assert.ok(!seen.has(normalized)||seen.get(normalized)===intent.id,`Ejemplo duplicado “${phrase}” entre ${seen.get(normalized)} y ${intent.id}.`);seen.set(normalized,intent.id);}
}
assert.equal(SERVICES.length,4);
console.log(`OK: ${INTENTS.length} intenciones; ${seen.size} ejemplos únicos; respuestas presentes.`);
