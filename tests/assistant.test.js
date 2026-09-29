import assert from 'node:assert/strict';
import {createEngine} from '../js/assistant/engine.js';
import {INTENTS,SERVICES} from '../js/assistant/knowledge-base.js';

let passed=0;function check(label,fn){try{fn();passed++;}catch(error){console.error(`FALLÓ: ${label}\n${error.message}`);process.exitCode=1;}}
function intent(input,want){const result=createEngine().reply(input);assert.equal(result.intent,want,`"${input}" debía detectar ${want} y detectó ${result.intent}`);return result;}
const required=[
 ['hola','greeting'],['Holaaa','greeting'],['ola','greeting'],['buenas tardes','greeting'],['hey','greeting'],['gracias','thanks'],['quien eres','identity'],['que puedes hacer','capabilities'],['que servicios tienen','services'],['necesito un contador','service_contabilidad'],['tengo dudas de inpuestos','service_tributaria'],['quiero llevar mis libros','service_contabilidad'],['cuanto cuesta','price'],['cual es su direccion','address'],['horario de atencion','hours'],['asdfgh','fallback'],['adios','farewell'],['hablan de privacidad','privacy'],['como los contacto','contact'],['numero de whatsapp','whatsapp'],['correo electronico','email'],['instagram de kontaxer','instagram'],['para quien es el servicio','who_for'],['que debo tener a mano','prepare'],['como es el proceso','process'],['quienes son','who_we_are'],['jajaja','laugh'],['ok','confirm'],['no','deny'],['claro','yes'],['me llamo Ana','name'],['cuentame mas','followup_more'],['y eso que incluye','followup_this'],['cuentame un chiste','joke'],['eres tonto','insult'],['???','empty'],['servicio de auditoria','service_auditorias'],['planificacion financiera','service_finanzas'],['normativa vigente','regulation'],['quiero hablar con alguien','contact'],['muy amable','thanks_alt'],['donde estan ubicados','address'],['politica de privacidad','privacy'],['trabajan con pymes','who_for'],['necesito una auditoria','service_auditorias'],['asesoria tributaria','service_tributaria'],['cuanto vale el servicio','price'],['quiero organizar mis finanzas','service_finanzas'],['soy emprendedor','who_for'],['ayuda','fallback']
];
for(const [q,want] of required)check(`${q} → ${want}`,()=>intent(q,want));
check('la KB tiene al menos 40 intenciones',()=>assert.ok(INTENTS.length>=40));
check('la KB tiene al menos 150 frases',()=>assert.ok(INTENTS.reduce((n,x)=>n+x.examples.length,0)>=150));
check('cuatro servicios definidos',()=>assert.equal(SERVICES.length,4));
check('precio nunca inventa',()=>assert.match(intent('cuanto cuesta','price').text,/No tengo ese dato confirmado/));
check('normativa deriva',()=>assert.match(intent('normativa vigente','regulation').text,/No tengo ese dato confirmado/));
check('privacidad no activa impuestos',()=>assert.notEqual(intent('hablan de privacidad','privacy').intent,'service_tributaria'));
check('corrección se informa',()=>assert.ok(intent('tengo dudas de inpuestos','service_tributaria').corrected.some(item=>item.to==='impuestos')));
check('memoria del servicio',()=>{const e=createEngine();e.reply('quiero llevar mis libros');assert.match(e.reply('y eso que incluye').text,/Contabilidad General/);});
check('memoria de nombre en saludo',()=>{const e=createEngine();e.reply('me llamo Ana');assert.match(e.reply('hola').text,/Ana/);});
check('nombre se guarda',()=>{const e=createEngine();e.reply('me llamo Ana');assert.equal(e.getMemory().name,'Ana');});
check('acciones presentes',()=>assert.ok(intent('hola','greeting').buttons.length>=2));
check('sin coincidencia de subcadena iva',()=>assert.notEqual(intent('privacidad','privacy').intent,'service_tributaria'));
check('saludo con pregunta de servicio conserva contexto',()=>{const e=createEngine();e.reply('asesoria tributaria');assert.equal(e.getMemory().service,'tributaria');});
check('normaliza tildes',()=>assert.equal(intent('asesoría tributaria','service_tributaria').intent,'service_tributaria'));
check('followup de precio no da tarifa',()=>assert.match(intent('y cuanto cuesta','price').text,/No tengo ese dato confirmado/));
check('resumen de servicios no inventa',()=>assert.match(intent('que servicios tienen','services').text,/Auditorías/));
check('contacto usa teléfono correcto',()=>assert.match(intent('contactar a kontaxer','contact').text,/324 920 1210/));
check('datos de correo',()=>assert.match(intent('email de kontaxer','email').text,/kontaxer01@gmail.com/));
check('fallback es útil',()=>assert.match(intent('asdfgh','fallback').text,/servicios|contacto|solicitud/));
check('motor reinicia memoria',()=>{const e=createEngine();e.reply('me llamo Ana');e.reset();assert.equal(e.getMemory().name,'');});

if(!process.exitCode)console.log(`OK: ${passed} pruebas aprobadas.`);
