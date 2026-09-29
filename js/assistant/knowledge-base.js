// Fuente única de datos públicos de KONTAXER. Añada aquí servicios y frases.
export const BUSINESS = Object.freeze({
  brand: 'KONTAXER', category: 'Servicios contables y tributarios para pymes y emprendedores',
  phone: '324 920 1210', whatsapp: '573249201210', email: 'kontaxer01@gmail.com',
  instagram: 'https://www.instagram.com/kontaxer/'
});
export const SERVICES = [
 {id:'contabilidad', name:'Contabilidad General', image:'assets/service-contabilidad.svg', imageAlt:'Libro contable y gráfico ilustrados', summary:'Organización de registros contables para pymes y emprendedores.', includes:'Registros y organización contable, conciliaciones, estados financieros y reportes periódicos.', audience:'Pymes y emprendedores.', prepare:'Una descripción de tu actividad y tus dudas contables.'},
 {id:'tributaria', name:'Asesoría Tributaria', image:'assets/service-tributaria.svg', imageAlt:'Documento y escudo ilustrados', summary:'Orientación sobre obligaciones y procesos tributarios.', includes:'Revisión del contexto informado, acompañamiento en procesos tributarios e identificación de la información necesaria. La recomendación concreta depende del caso y de la normativa aplicable.', audience:'Pymes y emprendedores.', prepare:'Una descripción general de tu consulta y la información relacionada.'},
 {id:'auditorias', name:'Auditorías', image:'assets/service-auditorias.svg', imageAlt:'Lista de revisión y lupa ilustradas', summary:'Revisión orientada al control y a la mejora de procesos.', includes:'Identificación de oportunidades y recomendaciones accionables con enfoque en procesos.', audience:'Pymes y emprendedores.', prepare:'El objetivo de la revisión y el periodo de interés.'},
 {id:'finanzas', name:'Planificación Financiera', image:'assets/service-finanzas.svg', imageAlt:'Gráfico de planificación financiera ilustrado', summary:'Planificación financiera para apoyar el seguimiento del negocio.', includes:'Presupuestos, proyecciones, KPIs y seguimiento de resultados.', audience:'Pymes y emprendedores.', prepare:'El objetivo de planificación y tus principales preguntas.'}
];
export const FAQ = [
 {q:'¿Qué servicios ofrece KONTAXER?',a:'KONTAXER ofrece Contabilidad General, Asesoría Tributaria, Auditorías y Planificación Financiera.'},
 {q:'¿Cuánto cuesta un servicio?',a:'No tengo ese dato confirmado; puedes consultarlo directamente con KONTAXER.'},
 {q:'¿Cuál es el horario de atención?',a:'No tengo ese dato confirmado; puedes consultarlo directamente con KONTAXER.'},
 {q:'¿Cuál es la dirección?',a:'No tengo ese dato confirmado; puedes consultarlo directamente con KONTAXER.'},
 {q:'¿Qué normas tributarias están vigentes?',a:'No puedo confirmar normativa vigente ni ofrecer un diagnóstico tributario. Consulta directamente con una persona de KONTAXER.'},
 {q:'¿Cómo contacto a KONTAXER?',a:'Puedes escribir por WhatsApp al 324 920 1210 o al correo kontaxer01@gmail.com.'}
];
// Frases de entrenamiento: la clasificación también usa el léxico ponderado y no depende de ellas.
const rows = [
 ['greeting','Saludo',['hola','buenas','hey','ola','buenos dias','buenas tardes','buenas noches','holaaa']],
['farewell','Despedida',['adios','hasta luego','nos vemos','chao']],['thanks','Agradecimiento',['gracias','muchas gracias','te agradezco','mil gracias']],
['how_are_you','Estado',['como estas','que tal estas','como te va','todo bien']],['identity','Identidad',['quien eres','eres un asistente','como te llamas','que eres']],
['capabilities','Capacidades',['que puedes hacer','en que ayudas','para que sirves','como me puedes ayudar']],
['services','Servicios',['que servicios tienen','que ofrece kontaxer','servicios disponibles','quiero conocer los servicios']],
['service_contabilidad','Contabilidad General',['necesito contabilidad','quiero llevar mis libros','servicio contable','contabilidad general']],
['service_tributaria','Asesoría Tributaria',['asesoria tributaria','tengo una duda de impuestos','necesito ayuda tributaria','consulta tributaria']],
['service_auditorias','Auditorías',['necesito una auditoria','servicio de auditoria','auditoria contable','quiero una revision contable']],
['service_finanzas','Planificación Financiera',['planificacion financiera','quiero organizar mis finanzas','ayuda financiera para mi negocio','plan financiero']],
['price','Precio',['cuanto cuesta','cual es el precio','cuanto vale el servicio','que tarifas manejan']],
['hours','Horario',['cual es el horario','horario de atencion','a que hora atienden','cuando puedo llamar']],
['address','Dirección',['cual es su direccion','donde estan ubicados','ubicacion de la oficina','como llegar']],
['regulation','Normativa',['normativa vigente','cual es la norma tributaria actual','impuesto vigente','fecha limite tributaria']],
['contact','Contacto',['como los contacto','quiero hablar con alguien','contactar a kontaxer','necesito una persona']],
['whatsapp','WhatsApp',['numero de whatsapp','escribo por whatsapp','contacto whatsapp','abrir whatsapp']],
['email','Correo',['correo electronico','email de kontaxer','escribir por correo','direccion de email']],
['instagram','Instagram',['instagram de kontaxer','red social instagram','perfil de instagram','ver instagram']],
['who_for','A quién atienden',['para quien es el servicio','trabajan con pymes','atienden emprendedores','soy emprendedor']],
['include','Qué incluye',['que incluye el servicio','que incluye eso','que incluye la contabilidad','que incluye la asesoria']],
['prepare','Preparación',['que debo tener a mano','como me preparo','que informacion necesitan','que documentos llevo']],
['privacy','Privacidad',['hablan de privacidad','politica de privacidad','como cuidan mis datos','uso de datos personales']],
['process','Proceso',['como es el proceso','como trabajan','como empezamos','cuales son los pasos']],
['who_we_are','Quiénes somos',['quienes son','sobre kontaxer','informacion de la firma','conocer kontaxer']],
['thanks_alt','Reconocimiento',['muy amable','genial gracias','perfecto gracias','te lo agradezco mucho']],
['laugh','Risa',['jajaja','jeje','me dio risa','jaja']],['confirm','Confirmación',['ok','vale','listo','de acuerdo']],
['deny','Negación',['no','no gracias','ahora no','no es eso']],['yes','Afirmación',['si','claro','correcto','asi es']],
['name','Nombre',['me llamo ana','mi nombre es','soy','puedes llamarme']],
['followup_cost','Seguimiento precio',['y cuanto cuesta','y el precio','cuanto valdria eso','precio de ese servicio']],
['followup_more','Más información',['cuentame mas','dame mas informacion','amplia la informacion','quiero saber mas']],
['followup_this','Seguimiento',['y eso que incluye','eso que incluye','y eso para que sirve','me explicas eso']],
['joke','Humor',['cuentame un chiste','di algo gracioso','hazme reir','tienes humor']],
 ['insult','Insulto leve',['eres tonto','que inutil','no sirves','malo']],['nonsense','Sin sentido',['qwerty','no entiendo nada','blablabla','texto sin sentido']],
['empty','Vacío',['',' ','...','???']],['service_detail','Detalle servicio',['detalle del servicio','explicame el servicio','quiero saber como funciona','mas sobre el servicio']],
['advice','Consejo profesional',['dime que declarar','haz mi declaracion','cuanto debo pagar','dime que impuesto pagar']],
['fallback','Consulta general',['tengo una consulta','necesito informacion','ayuda','quiero preguntar']]
];
rows.push(
 ['service_unconfirmed','Servicio no confirmado',['hacen nomina','facturacion electronica','manejan recursos humanos','venden software contable']],
 ['coverage','Cobertura',['atienden en otras ciudades','trabajan de forma virtual','cubren otras regiones','atienden fuera de colombia']],
 ['payment','Medios de pago',['aceptan tarjeta como forma de pago','que formas de pago aceptan','aceptan transferencia','como se paga']],
 ['discount','Descuentos',['ofrecen algun descuento','tienen promociones','ofrecen tarifa especial','me hacen una rebaja']],
 ['duration','Duración',['que demora manejan','que plazo manejan','cuanto se demora el proceso','cuando estaria listo']],
 ['experience','Trayectoria',['cuentan con experiencia','cuantos años llevan','desde cuando trabajan','que trayectoria tienen']],
 ['trust','Confianza',['kontaxer inspira confianza','puedo confiar en ustedes','que respaldo tienen','son una firma segura']],
 ['why_choose','Por qué elegir',['por que elegirlos','que los diferencia','por que contratar kontaxer','que ventajas ofrecen']],
 ['who_for_naturales','Personas naturales',['atienden personas naturales','atienden independientes','atienden personas sin empresa','soy persona natural']],
 ['document_needed','Documentos',['que documentos necesitan','que papeles debo enviar','que informacion preparo','necesitan mis extractos']],
 ['first_step','Primer paso',['como empiezo','que hago primero','por donde comienzo','quiero iniciar una consulta']],
 ['complaint','Queja',['quiero dejar un reclamo','estoy inconforme','no me resolvieron','la respuesta no me sirve']],
 ['out_of_scope','Fuera de alcance',['consultar la hora actual','un chiste largo por favor','quien gano el partido','como esta el clima']],
 ['multi_service','Varios servicios',['necesito contabilidad y auditoria','quiero dos servicios','contabilidad junto con finanzas','tributaria y auditoria']],
 ['compare_services','Comparar servicios',['cual es la diferencia entre servicios','comparar auditoria y contabilidad','que servicio me conviene','contabilidad o tributaria']],
 ['human_handoff','Hablar con una persona',['quiero hablar con una persona','comunicarme con alguien','necesito un asesor humano','quiero que me contacten']],
 ['contact','Contacto ampliado',['cual es su telefono','dame su numero','datos de contacto','pasame el celular']],
 ['address','Ubicación ampliada',['donde queda su oficina','cual es la direccion','donde estan ubicados','como llegar a la oficina']],
 ['service_detail','Detalle de servicio',['que incluye la contabilidad','detalle de la asesoria','explicame el servicio','que incluye auditoria']],
 ['service_contabilidad','Organización contable',['organizar mis cuentas','ordenar las cuentas del negocio','llevar contabilidad de la empresa','necesito un contador']],
 ['service_tributaria','Obligaciones tributarias',['declarar renta','ayuda con el iva','dudas de impuestos','declaracion tributaria']],
 ['service_finanzas','Presupuestos y proyecciones',['hacer un presupuesto','proyectar mis finanzas','armar flujo de caja','planificar finanzas']],
 ['service_auditorias','Control y revisión',['me interesa la auditoria','revision de procesos','necesito control interno','auditoria de cuentas']],
 ['advice','Consejo tributario',['como hago mi declaracion de renta','dime que debo declarar','cuanto impuesto debo pagar','haz mi declaracion']],
 ['privacy','Privacidad',['mis datos estan seguros','como cuidan mis datos','mis documentos son privados','politica de privacidad']],
 ['quote_request','Solicitud de cotización',['quiero cotizar un servicio','me envian una cotizacion','solicitar una cotizacion','como pido una cotizacion']],
 ['appointment','Agendar consulta',['quiero agendar una consulta','puedo reservar una reunion','como programo una cita','tienen disponibilidad para reunirme']],
 ['web_navigation','Ayuda del sitio',['no encuentro el formulario','como llego a los servicios en la pagina','donde esta el asistente','como uso este sitio']]
);

const LEXICON={
 greeting:['hola','buenas','buenos dias','buenas tardes','hey'],farewell:['adios','chao','hasta luego','nos vemos'],thanks:['gracias','agradezco','muchas gracias'],name:['me llamo','mi nombre es','puedes llamarme'],
 how_are_you:['como estas','que tal','todo bien'],identity:['quien eres','asistente','como te llamas'],capabilities:['ayudas','puedes hacer','para que sirves'],services:['que servicios tienen','que servicios manejan','q servicios manejan','que servicios ofrece kontaxer','servicios disponibles','portafolio de servicios','conocer los servicios','opciones para negocios'],
 service_contabilidad:['contabilidad','contable','contador','cuentas','libros','conciliacion','balance','estados financieros','registros contables','reportes contables','organizar cuentas','movimientos contables'],service_tributaria:['tributaria','impuesto','impuestos','iva','renta','dian','declaracion','retencion','fiscal','obligaciones tributarias'],service_auditorias:['auditoria','auditorias','revision','control','procesos','controles','recomendaciones','oportunidades','fallas'],service_finanzas:['finanzas','financiera','presupuesto','proyeccion','flujo de caja','kpi','indicadores financieros','ingresos y gastos','plata del negocio','costos'],
 price:['precio','cuesta','costo','tarifa','tarifas','cobran','valor','cotizar','honorarios','cuanto vale','lista de precios'],hours:['horario','horarios','atienden','hora de atencion'],address:['direccion','oficina','ubicacion','sede','donde queda','donde estan'],regulation:['normativa vigente','norma tributaria','fecha limite','vigente'],contact:['telefono','celular','numero','contacto','llamar','linea','correo','email','whatsapp','datos de contacto','numero para llamar'],whatsapp:['whatsapp'],email:['correo','email'],instagram:['instagram'],who_for:['pymes','emprendedores','para quien'],include:['incluye','incluido'],prepare:['documentos','informacion','preparar','papeles'],privacy:['privacidad','privado','datos seguros','datos personales','datos protegidos','mis datos estan seguros','documentos privados','datos documentos privados'],process:['proceso','pasos','como trabajan'],who_we_are:['quienes son','sobre kontaxer'],
 service_unconfirmed:['nomina','facturacion electronica','facturar electronicamente','software contable','recursos humanos','juridica','cartera'],coverage:['cobertura','fuera de bogota','otra ciudad','otras ciudades','virtual','remoto','otras regiones','exterior','medellin','cali','fuera de colombia','videollamada','internet','todo el pais','atenderme desde'],payment:['pagar','pago','tarjeta','transferencia','efectivo','consignar','nequi','cuotas','medios de pago','forma de pago','se paga','bancos','plataformas'],discount:['descuento','descuentos','promocion','promociones','rebaja','oferta','precio preferencial','beneficio en el precio','tarifa especial'],duration:['tardan','demora','plazo','dias','semanas','tiempo de entrega','cuando estaria listo','rapido','fecha de entrega','informe','cuanto tiempo','cuanto demora','acompanamiento'],experience:['experiencia','trayectoria','años','recorrido','antecedentes','casos','cuentan con experiencia','desde cuando existe','recorrido profesional'],trust:['confiable','confianza','confiar','segura','respaldo','garantia','referencias','tranquilidad','verifico que son confiables'],why_choose:['diferencia','ventajas','por que elegir','por que contratarlos'],who_for_naturales:['personas naturales','independientes','sin empresa','persona natural','no tengo empresa','atienden a alguien'],document_needed:['documentos','papeles','extractos','archivos','soportes','certificados','que informacion necesitan','formatos','facturas','estados de cuenta','datos necesitan','archivos listos'],first_step:['empiezo','primero','comienzo','iniciar','arranco','primer paso','por donde empezar','paso inicial','como arranco'],complaint:['queja','inconforme','no me resolvieron','incorrecta','no me sirve','reclamo','respuesta clara','me parece mal','estoy inconforme'],out_of_scope:['que hora es','clima','llover','partido','presidente','pelicula','arroz','loteria','fotosintesis','chiste largo','vuelo a madrid'],multi_service:['contabilidad y auditoria','dos servicios','junto con','mas de un servicio','tambien apoyo','contabilidad y finanzas'],compare_services:['diferencia entre','comparar','o asesoria','que servicio me conviene','comparar auditoria'],human_handoff:['persona','alguien','asesor humano','humano','llame','agente','comunicarme con alguien'],advice:['como hago mi declaracion','dime que declarar','cuanto debo pagar','haz mi declaracion']
};
Object.assign(LEXICON,{
 quote_request:['cotizar un servicio','cotizacion','me envian una cotizacion'],
 appointment:['agendar una consulta','reservar una reunion','programar una cita','disponibilidad para reunirme'],
 web_navigation:['formulario en la pagina','donde esta el asistente','como uso este sitio'],
 capabilities:['que puedes hacer','en que ayudas','para que sirves','como me puedes ayudar'],
 services:[...LEXICON.services,'que hacen en kontaxer','que areas de trabajo','que soluciones ofrecen','temas empresariales','sus opciones','que opciones'],
 first_step:[...LEXICON.first_step,'tienda','tengo un negocio','por donde comienzo','como solicito','quiero comenzar','quiero empezar','paso inicial','necesito ayuda para empezar','no tengo claro que servicio escoger'],
 service_auditorias:[...LEXICON.service_auditorias,'revisar controles','controles internos','mejorar procesos','detectar fallas','verificar controles','oportunidades de mejora','estamos trabajando'],
 service_finanzas:[...LEXICON.service_finanzas,'organizar la plata','controlar indicadores','ingresos y gastos','proyecciones financieras','proyectar ventas','ventas y costos'],
 service_contabilidad:[...LEXICON.service_contabilidad,'balances','reportes contables','movimientos contables','ordenar libros'],
 service_tributaria:[...LEXICON.service_tributaria,'deberes fiscales','declarar renta','ayuda con iva','obligaciones fiscales','iva es parte de los servicios'],
 coverage:[...LEXICON.coverage,'servicio remoto','fuera del pais','reuniones por internet','atencion virtual','otras ciudades'],
 price:[...LEXICON.price,'valor de llevar','cuanto debo presupuestar','cuanto cobran','cuanto vale una consulta','cotizar el servicio financiero','cotizar el servicio'],
 payment:[...LEXICON.payment,'como les consigno','consigno el valor','consignacion','se paga antes','bancos o plataformas'],
 duration:[...LEXICON.duration,'tiempo estimado','tiempo de respuesta','cuantos dias tarda','cuanto tardan','fecha de entrega'],
 experience:[...LEXICON.experience,'hace cuanto atienden','experiencia con pymes','cuantos casos','trayectoria trabajando','cuantos años llevan','años llevan prestando'],
 trust:[...LEXICON.trust,'puedo confiarles','me da confianza','compartir extractos','como verifico','referencias verificables','me da tranquilidad compartir documentos'],
 privacy:[...LEXICON.privacy,'mis datos y documentos quedan privados','documentos quedan privados','datos estan seguros'],
 document_needed:[...LEXICON.document_needed,'papeles llevo','que informacion les sirve','datos necesitan de mi negocio','estados de cuenta','formato que deba llenar','archivos debo tener','que archivos debo tener listos','que documentos preparo'],
 who_for_naturales:[...LEXICON.who_for_naturales,'no tengo pyme','no tengo empresa','atienden personas naturales'],
 human_handoff:[...LEXICON.human_handoff,'prefiero continuar con un asesor','que un contador revise','asesor profesional'],
 service_unconfirmed:[...LEXICON.service_unconfirmed,'venden software de contabilidad','cobrar cartera','facturar electronicamente'],
 compare_services:[...LEXICON.compare_services,'auditoria con contabilidad','plan financiero con auditoria','contabilidad o asesoria tributaria'],
 farewell:[...LEXICON.farewell,'hablamos luego'],
 out_of_scope:[...LEXICON.out_of_scope,'vuelo a madrid','fotosintesis']
});
function typoExample(phrase){
 const words=phrase.split(' ');let index=-1;for(let i=words.length-1;i>=0;i--)if(words[i].length>=6){index=i;break;}if(index<0)return `${phrase} porfa`;
 const letters=[...words[index]],position=Math.min(3,letters.length-2);[letters[position-1],letters[position]]=[letters[position],letters[position-1]];words[index]=letters.join('');return words.join(' ');
}
const expandedRows=rows.map(([id,label,seeds])=>{
 const typo=typoExample(seeds[0]);
 const examples=[...new Set([...seeds,typo,...seeds.map(x=>`necesito consultar ${x}`),...seeds.map(x=>`me pueden orientar sobre ${x}`)])].slice(0,10);
 return {id,label,examples,keywords:LEXICON[id]||seeds.flatMap(x=>x.split(' '))};
});
const merged=new Map();for(const intent of expandedRows){const old=merged.get(intent.id);merged.set(intent.id,old?{...intent,examples:[...new Set([...old.examples,...intent.examples])].slice(0,10),keywords:[...new Set([...old.keywords,...intent.keywords])]}:intent);}
const uniqueRows=[...merged.values()];
export const INTENTS=uniqueRows;
export const STOPWORDS = new Set('a al algo algun alguna como con cual cuando cuanto de del donde el ella en es esa eso este esta estos esto fue hay la las le lo los me mi muy no o para pero por que se si sin su sus te tener un una uno y ya quiero necesito pueden puede me soy tengo quiero hacen tienen atienden ofrece ofrecen hace hacer dame para por favor'.split(' '));
export const SYNONYMS = {telefono:'contacto',celular:'contacto',numero:'contacto',linea:'contacto',llamar:'contacto',impuesto:'tributaria',impuestos:'tributaria',tributario:'tributaria',tributarios:'tributaria',renta:'tributaria',iva:'tributaria',dian:'tributaria',declaracion:'tributaria',libros:'contabilidad',contable:'contabilidad',contador:'contabilidad',cuentas:'contabilidad',conciliaciones:'conciliacion',financiero:'finanzas',financieros:'finanzas',presupuesto:'finanzas',plata:'finanzas',dinero:'finanzas',precio:'precio',costo:'precio',tarifa:'precio',descuentos:'descuento',promociones:'descuento',privacidad:'privacidad',datos:'dato',hora:'hora',horario:'horario',facturacion:'facturacion'};
