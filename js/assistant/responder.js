import { BUSINESS, SERVICES, FAQ } from './knowledge-base.js';

const used=new Map();
const small={
 greeting:['¡Hola! Soy el asistente local de KONTAXER. ¿Qué necesitas consultar?','¡Buenas! Puedo orientarte sobre los servicios de KONTAXER.','¡Hola! ¿Te interesa conocer algún servicio?'],
 thanks:['¡Con gusto! ¿Hay algo más que quieras consultar?','A ti. Aquí estoy para orientarte sobre KONTAXER.','¡Gracias por escribir! ¿Qué necesitas?'],
 farewell:['¡Hasta luego! Puedes volver cuando quieras.','Que estés muy bien. ¡Hasta pronto!','Gracias por escribir a KONTAXER. ¡Chao!'],
 how_are_you:['¡Gracias por preguntar! Estoy listo para orientarte.','Todo bien, gracias. ¿Qué información buscas?','Estoy aquí para compartir información de KONTAXER.'],
 identity:['Soy el asistente local de KONTAXER y comparto información general sobre sus servicios.','Puedo orientarte sobre los servicios y canales de contacto de KONTAXER.','Soy una herramienta local de información de KONTAXER.'],
 capabilities:['Puedo contarte sobre los servicios confirmados y facilitarte el contacto.','Puedo orientarte sobre contabilidad, tributos, auditorías y planificación financiera.','Puedo compartir información general y ayudarte a preparar una consulta.'],
 fallback:['No estoy seguro de haber entendido. Puedo orientarte sobre servicios o contacto.','¿Puedes contarme un poco más? También puedes consultar por los servicios.','Puedo ayudarte con información general o facilitarte el contacto.'],
 out_of_scope:['No puedo ayudar con esa consulta desde este asistente. Sí puedo orientarte sobre los servicios de KONTAXER.','Esa pregunta queda fuera de la información de KONTAXER que tengo. Puedo ayudarte con sus servicios.','No tengo información para responder eso; puedo compartir detalles de KONTAXER o sus canales de contacto.']
};
const actions=[{label:'Ver servicios',action:'services'},{label:'Preparar solicitud',action:'form'},{label:'Hablar por WhatsApp',action:'whatsapp'},{label:'Orientador',action:'guide'}];
function variant(id,items){let i=Math.floor(Math.random()*items.length);if(items.length>1&&used.get(id)===i)i=(i+1)%items.length;used.set(id,i);return items[i];}
function contactActions(){return [{label:'Abrir WhatsApp',action:'whatsapp'},{label:'Correo',action:'email'}];}
function unknown(text='ese dato'){return `No tengo ese dato confirmado sobre ${text}. Puedes consultarlo directamente con KONTAXER.`;}
export function answer(intent,memory,context={}){
 const ids=context.intents||[intent],name=memory.name||'',service=SERVICES.find(s=>s.id===memory.service);let text='',buttons=actions;
 if(intent==='greeting'||intent==='thanks'||intent==='farewell'||intent==='how_are_you'||intent==='identity'||intent==='capabilities'||intent==='out_of_scope')text=variant(intent,small[intent]);
 else if(intent==='services')text=`KONTAXER ofrece ${SERVICES.map(s=>s.name).join(', ')}.`;
 else if(intent.startsWith('service_')&&SERVICES.some(s=>`service_${s.id}`===intent)){const s=SERVICES.find(x=>`service_${x.id}`===intent);text=`${s.name}: ${s.includes}`;}
 else if(intent==='service_detail'||intent==='include'||intent==='followup_this'||intent==='followup_more'){text=service?`${service.name}: ${service.includes} ${service.prepare}`:`¿Sobre cuál servicio quieres saber más? ${SERVICES.map(s=>s.name).join(', ')}.`;}
 else if(['price','hours','address','regulation','coverage','payment','discount','duration'].includes(intent))text=unknown(({price:'el precio o las tarifas',hours:'el horario de atención',address:'la dirección',regulation:'la normativa vigente',coverage:'la cobertura geográfica o virtual',payment:'los medios de pago',discount:'los descuentos o promociones',duration:'los tiempos de atención'})[intent]);
 else if(intent==='quote_request')text=unknown('las cotizaciones o el valor del servicio');
 else if(intent==='appointment')text=unknown('la disponibilidad para agendar una consulta');
 else if(intent==='contact'||intent==='whatsapp'||intent==='email'||intent==='human_handoff')text=`Puedes comunicarte por WhatsApp al ${BUSINESS.phone} o escribir a ${BUSINESS.email}.`;
 else if(intent==='instagram')text='Puedes encontrar a KONTAXER en Instagram: @kontaxer.';
 else if(intent==='who_for')text='Los servicios confirmados están dirigidos a pymes y emprendedores.';
 else if(intent==='who_for_naturales')text='La información confirmada indica atención a pymes y emprendedores. No tengo confirmado si atienden a personas naturales; puedes consultarlo con KONTAXER.';
 else if(intent==='service_unconfirmed')text='No tengo confirmado que KONTAXER ofrezca ese servicio. Puedes consultar directamente por WhatsApp o correo.';
 else if(intent==='experience'||intent==='trust'||intent==='why_choose')text=unknown(intent==='experience'?'la trayectoria o experiencia':intent==='trust'?'credenciales o referencias verificadas':'diferencias o ventajas comprobadas');
 else if(intent==='document_needed'||intent==='prepare')text='Para iniciar, conviene tener una descripción de tu actividad y de la consulta. Los documentos específicos dependen del caso; puedes confirmarlos con KONTAXER.';
 else if(intent==='first_step'||intent==='process'||intent==='web_navigation')text='Puedes contarle a KONTAXER qué necesitas mediante el formulario y continuar por WhatsApp o correo.';
 else if(intent==='multi_service')text=`KONTAXER ofrece ${SERVICES.map(s=>s.name).join(', ')}. Puedes indicar cuáles te interesan para que revisen tu caso.`;
 else if(intent==='compare_services')text='Puedo describir los servicios confirmados: contabilidad organiza registros, conciliaciones y reportes; tributaria orienta sobre obligaciones; auditorías revisan control y procesos; planificación financiera contempla presupuestos, proyecciones, KPIs y seguimiento.';
 else if(intent==='advice')text='No puedo indicar qué declarar ni hacer un diagnóstico tributario. Una persona de KONTAXER puede revisar el contexto y la normativa aplicable.';
 else if(intent==='privacy')text='La información que escribes en el asistente se conserva en esta sesión del navegador. Revisa la política de privacidad del sitio para conocer el tratamiento de datos del formulario.';
 else if(intent==='who_we_are')text='KONTAXER ofrece servicios contables y tributarios para pymes y emprendedores.';
 else if(intent==='name')text=`¡Mucho gusto${name?`, ${name}`:''}! ¿Qué necesitas consultar?`;
 else if(intent==='complaint')text='Lamento que la respuesta no te haya servido. Puedes contar tu caso directamente al equipo de KONTAXER por WhatsApp o correo.';
 else if(intent==='laugh'||intent==='joke')text='Puedo seguir ayudándote con información de los servicios de KONTAXER.';
 else if(intent==='yes'||intent==='confirm')text=service?`Perfecto. Seguimos con ${service.name}. ¿Qué quieres saber?`:'Perfecto. ¿Te interesa conocer los servicios, el contacto o preparar una solicitud?';
 else if(intent==='deny')text='Entendido. ¿Qué te gustaría consultar?';
 else text=variant('fallback',small.fallback);
 if(ids.includes('greeting')&&intent!=='greeting')text=`¡Hola${name?`, ${name}`:''}! ${text}`;
 if(ids.includes('thanks')&&intent!=='thanks'&&intent!=='farewell')text=`Con gusto. ${text}`;
 if(name&&!text.includes(name)&&intent==='greeting')text=`¡Hola, ${name}! ${text.replace(/^¡[^!]+!\s*/, '')}`;
 else if(name&&!text.includes(name)&&['thanks','farewell'].includes(intent))text=`${name}, ${text}`;
 if(['price','hours','address','regulation','coverage','payment','discount','duration','quote_request','appointment','contact','whatsapp','email','advice','service_unconfirmed','experience','trust','who_for_naturales','human_handoff','complaint'].includes(intent))buttons=contactActions();
 return {text,buttons};
}
export {FAQ};
