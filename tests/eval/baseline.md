# Evaluación del asistente KONTAXER

- Frases reservadas: 231
- Exactitud de intención primaria: 9.5% (22/231)
- Fallback dentro de alcance: 59.5% (131/220)
- Respuesta segura incorrecta (confianza ≥ 0.75): 12.6% (29/231)

## Exactitud por intención

| Intención | Correctas | Total | Exactitud |
|---|---:|---:|---:|
| address | 1 | 3 | 33.3% |
| advice | 0 | 1 | 0.0% |
| compare_services | 0 | 4 | 0.0% |
| complaint | 0 | 6 | 0.0% |
| contact | 1 | 7 | 14.3% |
| coverage | 0 | 12 | 0.0% |
| discount | 0 | 12 | 0.0% |
| document_needed | 0 | 11 | 0.0% |
| duration | 0 | 12 | 0.0% |
| experience | 0 | 12 | 0.0% |
| farewell | 0 | 2 | 0.0% |
| first_step | 0 | 13 | 0.0% |
| greeting | 3 | 3 | 100.0% |
| hours | 2 | 2 | 100.0% |
| human_handoff | 0 | 6 | 0.0% |
| multi_service | 0 | 4 | 0.0% |
| name | 1 | 2 | 50.0% |
| out_of_scope | 0 | 11 | 0.0% |
| payment | 0 | 12 | 0.0% |
| price | 3 | 10 | 30.0% |
| privacy | 2 | 2 | 100.0% |
| service_auditorias | 1 | 12 | 8.3% |
| service_contabilidad | 1 | 13 | 7.7% |
| service_finanzas | 0 | 12 | 0.0% |
| service_tributaria | 6 | 13 | 46.2% |
| service_unconfirmed | 0 | 9 | 0.0% |
| services | 1 | 7 | 14.3% |
| trust | 0 | 12 | 0.0% |
| who_for_naturales | 0 | 6 | 0.0% |

## Confusiones principales

| Ruta | Casos |
|---|---:|
| payment → fallback | 12 |
| trust → fallback | 12 |
| duration → fallback | 10 |
| service_finanzas → fallback | 9 |
| experience → fallback | 9 |
| discount → fallback | 8 |
| first_step → fallback | 7 |
| service_tributaria → fallback | 6 |
| service_unconfirmed → fallback | 6 |
| service_contabilidad → fallback | 6 |
| service_tributaria → service_tributaria | 6 |
| document_needed → fallback | 6 |
| service_contabilidad → greeting | 5 |
| coverage → hours | 5 |
| contact → fallback | 5 |
| service_auditorias → fallback | 5 |
| service_auditorias → process | 5 |
| coverage → fallback | 5 |
| services → fallback | 4 |
| price → fallback | 4 |

## Errores

- “necesito organizar mis cuentas” → esperado **service_contabilidad**, obtenido **greeting** (puntaje 0.62; tokens: necesito, organizar, mis, buena)
- “datos de contacto” → esperado **contact**, obtenido **privacy** (puntaje 0.99; tokens: privacidad, contacto)
- “que hora es” → esperado **out_of_scope**, obtenido **hours** (puntaje 0.99; tokens: hora)
- “atienden fuera de bogota” → esperado **coverage**, obtenido **hours** (puntaje 0.99; tokens: atienden, fuera, bogota)
- “cual es su telefono” → esperado **contact**, obtenido **fallback** (puntaje 0; tokens: telefono)
- “dame su numero” → esperado **contact**, obtenido **fallback** (puntaje 0.351; tokens: dame, numero)
- “quiero declarar renta” → esperado **service_tributaria**, obtenido **fallback** (puntaje 0.328; tokens: quiero, declarar, renta)
- “necesito ayuda con el iva” → esperado **service_tributaria**, obtenido **capabilities** (puntaje 0.62; tokens: necesito, ayuda, iva)
- “como hago mi declaracion de renta” → esperado **advice**, obtenido **fallback** (puntaje 0.31; tokens: hago, declaracion, renta)
- “quiero hacer un presupuesto” → esperado **service_finanzas**, obtenido **fallback** (puntaje 0.341; tokens: quiero, hacer, presupuesto)
- “me interesa la auditoria” → esperado **service_auditorias**, obtenido **fallback** (puntaje 0.356; tokens: interesa, auditoria)
- “gracias, adios” → esperado **farewell + thanks**, obtenido **thanks** (puntaje 0.78; tokens: gracia, adio)
- “me pueden ayudar con nomina” → esperado **service_unconfirmed**, obtenido **capabilities** (puntaje 0.62; tokens: pued, ayudar, nomina)
- “hacen facturacion electronica” → esperado **service_unconfirmed**, obtenido **fallback** (puntaje 0.341; tokens: hacer, facturacion, electronico)
- “trabajan con personas naturales” → esperado **who_for_naturales**, obtenido **process** (puntaje 0.62; tokens: trabajan, persona, natural)
- “hay descuentos” → esperado **discount**, obtenido **fallback** (puntaje 0; tokens: descuento)
- “puedo pagar con tarjeta” → esperado **payment**, obtenido **fallback** (puntaje 0.31; tokens: puedo, pagar, tarjeta)
- “cuanto tardan” → esperado **duration**, obtenido **fallback** (puntaje 0.278; tokens: cuanto, tardan)
- “tienen experiencia” → esperado **experience**, obtenido **fallback** (puntaje 0.341; tokens: tienen, experiencia)
- “es confiable kontaxer” → esperado **trust**, obtenido **fallback** (puntaje 0.337; tokens: contabilidad, kontaxer)
- “tengo una tienda” → esperado **first_step**, obtenido **fallback** (puntaje 0.31; tokens: tengo, tienda)
- “q servicios manejan” → esperado **services**, obtenido **fallback** (puntaje 0.31; tokens: servicio, manejan)
- “donde queda su oficina” → esperado **address**, obtenido **fallback** (puntaje 0.31; tokens: queda, oficina)
- “quien me ayuda a cuadrar las cuentas de la empresa” → esperado **service_contabilidad**, obtenido **greeting** (puntaje 0.62; tokens: quien, ayuda, cuadrar, buena, empresa)
- “busco apoyo para registrar los movimientos contables” → esperado **service_contabilidad**, obtenido **fallback** (puntaje 0.337; tokens: busco, apoyo, registrar, movimiento, contabilidad)
- “me colaboran con conciliaciones bancarias” → esperado **service_contabilidad**, obtenido **fallback** (puntaje 0; tokens: colaboran, concili, bancaria)
- “quiero ordenar los libros de mi pyme” → esperado **service_contabilidad**, obtenido **fallback** (puntaje 0.337; tokens: quiero, ordenar, contabilidad, pyme)
- “necesito estados financieros para mi negocio” → esperado **service_contabilidad**, obtenido **how_are_you** (puntaje 0.62; tokens: necesito, esta, finanza, negocio)
- “hacen reportes contables periodicos” → esperado **service_contabilidad**, obtenido **fallback** (puntaje 0.341; tokens: hacer, report, contabilidad, periodico)
- “busco un contador para organizar mis registros” → esperado **service_contabilidad**, obtenido **fallback** (puntaje 0.337; tokens: busco, contabilidad, organizar, mis, registro)
- “me ayudan con balances y cuentas” → esperado **service_contabilidad**, obtenido **greeting** (puntaje 0.62; tokens: ayuda, balanc, buena)
- “quiero poner al dia la contabilidad” → esperado **service_contabilidad**, obtenido **fallback** (puntaje 0.337; tokens: quiero, poner, dia, contabilidad)
- “me asesoran para presentar la declaracion” → esperado **service_tributaria**, obtenido **fallback** (puntaje 0.38; tokens: asesoria, preguntar, declaracion)
- “quiero revisar mi situacion frente a la dian” → esperado **service_tributaria**, obtenido **fallback** (puntaje 0.31; tokens: quiero, revisar, situacion, frente, dias)
- “busco asesoria para mis deberes fiscales” → esperado **service_tributaria**, obtenido **fallback** (puntaje 0.35; tokens: busco, asesoria, mis, deber, fiscal)
- “necesito entender que informacion reunir para renta” → esperado **service_tributaria**, obtenido **fallback** (puntaje 0.62; tokens: necesito, entender, informacion, reunir, renta)
- “quiero revisar los controles de mi empresa” → esperado **service_auditorias**, obtenido **fallback** (puntaje 0.24; tokens: quiero, revisar, control, empresa)
- “necesito evaluar los procesos internos” → esperado **service_auditorias**, obtenido **process** (puntaje 0.62; tokens: necesito, evaluar, proceso, interno)
- “busco una revision para encontrar oportunidades” → esperado **service_auditorias**, obtenido **fallback** (puntaje 0.253; tokens: busco, revision, encontrar, oportunidad)
- “me hacen control de procesos contables” → esperado **service_auditorias**, obtenido **process** (puntaje 0.62; tokens: hacer, control, proceso, contabilidad)
- “quiero recomendaciones para mejorar procesos” → esperado **service_auditorias**, obtenido **process** (puntaje 0.62; tokens: quiero, recomend, mejorar, proceso)
- “pueden revisar como estamos trabajando” → esperado **service_auditorias**, obtenido **how_are_you** (puntaje 0.62; tokens: pued, revisar, esta, trabajan)
- “quisiera detectar fallas y oportunidades” → esperado **service_auditorias**, obtenido **fallback** (puntaje 0; tokens: quisiera, detectar, falla, oportunidad)
- “hacen auditoria enfocada en procesos” → esperado **service_auditorias**, obtenido **process** (puntaje 0.62; tokens: hacer, auditoria, enfocada, proceso)
- “quiero verificar los controles del negocio” → esperado **service_auditorias**, obtenido **fallback** (puntaje 0.24; tokens: quiero, verificar, control, negocio)
- “ayudenme a proyectar las finanzas del negocio” → esperado **service_finanzas**, obtenido **fallback** (puntaje 0.229; tokens: ayudenme, proyectar, finanza, negocio)
- “necesito armar un flujo de caja” → esperado **service_finanzas**, obtenido **laugh** (puntaje 0.62; tokens: necesito, armar, flujo, jaja)
- “quiero estimar ingresos y gastos futuros” → esperado **service_finanzas**, obtenido **fallback** (puntaje 0.24; tokens: quiero, estimar, ingreso, gasto, futuro)
- “me ayudan a definir indicadores financieros” → esperado **service_finanzas**, obtenido **capabilities** (puntaje 0.62; tokens: ayuda, definir, indic, finanza)
- “busco seguimiento de resultados financieros” → esperado **service_finanzas**, obtenido **fallback** (puntaje 0.18; tokens: busco, seguimiento, result, finanza)
- “necesito planear las finanzas de mi pyme” → esperado **service_finanzas**, obtenido **fallback** (puntaje 0.328; tokens: necesito, planear, finanza, pyme)
- “quiero organizar la plata de la empresa” → esperado **service_finanzas**, obtenido **fallback** (puntaje 0.293; tokens: quiero, organizar, dinero, empresa)
- “me ayudan a proyectar ventas y costos” → esperado **service_finanzas**, obtenido **capabilities** (puntaje 0.62; tokens: ayuda, proyectar, venta, costo)
- “necesito controlar indicadores de mi negocio” → esperado **service_finanzas**, obtenido **fallback** (puntaje 0.31; tokens: necesito, controlar, indic, negocio)
- “quisiera planificar el presupuesto anual” → esperado **service_finanzas**, obtenido **fallback** (puntaje 0; tokens: quisiera, planificar, presupuesto, anual)
- “atienden empresas desde otras ciudades” → esperado **coverage**, obtenido **hours** (puntaje 0.99; tokens: atienden, empresa, desde, otra, ciudad)
- “puedo recibir asesoria de manera virtual” → esperado **coverage**, obtenido **fallback** (puntaje 0.35; tokens: puedo, recibir, asesoria, manera, virtual)
- “trabajan con clientes fuera de colombia” → esperado **coverage**, obtenido **process** (puntaje 0.62; tokens: trabajan, client, fuera, colombia)
- “pueden atenderme si estoy en medellin” → esperado **coverage**, obtenido **fallback** (puntaje 0.31; tokens: pued, atenderme, estoy, medellin)
- “la cobertura incluye todo el pais” → esperado **coverage**, obtenido **include** (puntaje 0.62; tokens: cobertura, incluye, todo, pais)
- “prestan el servicio remoto” → esperado **coverage**, obtenido **fallback** (puntaje 0.31; tokens: estan, servicio, remoto)
- “vivo en cali, me pueden atender” → esperado **coverage**, obtenido **hours** (puntaje 0.99; tokens: vivo, cali, pued, atienden)
- “atienden desde bogota hacia otras regiones” → esperado **coverage**, obtenido **hours** (puntaje 0.99; tokens: atienden, desde, bogota, hacia, otra, region)
- “puedo contratarlos desde el exterior” → esperado **coverage**, obtenido **fallback** (puntaje 0.31; tokens: puedo, contratarlo, desde, exterior)
- “hacen reuniones por internet” → esperado **coverage**, obtenido **fallback** (puntaje 0.341; tokens: hacer, reunion, internet)
- “cual es el valor de llevar la contabilidad” → esperado **price**, obtenido **fallback** (puntaje 0.337; tokens: valor, llevar, contabilidad)
- “me comparte sus tarifas por favor” → esperado **price**, obtenido **fallback** (puntaje 0.31; tokens: comparte, tarifa, favor)
- “cuanto debo presupuestar para la asesoria” → esperado **price**, obtenido **advice** (puntaje 0.4; tokens: cuanto, debo, presupuestar, asesoria)
- “cuanto cobran por impuestos” → esperado **price**, obtenido **service_tributaria** (puntaje 0.92; tokens: cuanto, cobran, tributaria)
- “quisiera cotizar el servicio financiero” → esperado **price**, obtenido **fallback** (puntaje 0.291; tokens: quisiera, cotizar, servicio, finanza)
- “me dan un estimado de honorarios” → esperado **price**, obtenido **fallback** (puntaje 0; tokens: dan, estimado, honorario)
- “cuanto vale una consulta” → esperado **price**, obtenido **confirm** (puntaje 0.62; tokens: cuanto, vale, consulta)
- “aceptan pagos con tarjeta de credito” → esperado **payment**, obtenido **fallback** (puntaje 0.214; tokens: aceptan, paso, tarjeta, credito)
- “que medios de pago reciben” → esperado **payment**, obtenido **fallback** (puntaje 0; tokens: medio, pago, reciben)
- “puedo pagar por transferencia” → esperado **payment**, obtenido **fallback** (puntaje 0.31; tokens: puedo, pagar, transferencia)
- “reciben efectivo” → esperado **payment**, obtenido **fallback** (puntaje 0; tokens: reciben, efectivo)
- “como se realiza el pago” → esperado **payment**, obtenido **fallback** (puntaje 0; tokens: realiza, pago)
- “tienen opciones para pagar en cuotas” → esperado **payment**, obtenido **fallback** (puntaje 0.341; tokens: tienen, opcion, pagar, cuota)
- “se paga antes o despues de la consulta” → esperado **payment**, obtenido **fallback** (puntaje 0.342; tokens: ante, despu, consulta)
- “que bancos o plataformas aceptan” → esperado **payment**, obtenido **fallback** (puntaje 0; tokens: banco, plataforma, aceptan)
- “puedo pagar por nequi” → esperado **payment**, obtenido **fallback** (puntaje 0.31; tokens: puedo, pagar, nequi)
- “como les consigno el valor” → esperado **payment**, obtenido **fallback** (puntaje 0; tokens: les, consigno, valor)
- “tienen promociones para nuevos clientes” → esperado **discount**, obtenido **fallback** (puntaje 0.341; tokens: tienen, promocion, nuevo, client)
- “me pueden hacer un descuento” → esperado **discount**, obtenido **capabilities** (puntaje 0.62; tokens: pued, hacer, descuento)
- “ofrecen algun beneficio en el precio” → esperado **discount**, obtenido **price** (puntaje 0.99; tokens: ofrece, algun, beneficio, precio)
- “hay descuento para emprendedores” → esperado **discount**, obtenido **fallback** (puntaje 0.328; tokens: descuento, emprendedor)
- “manejan promociones este mes” → esperado **discount**, obtenido **fallback** (puntaje 0.31; tokens: manejan, promocion, ese, mes)
- “existe tarifa especial para pymes” → esperado **discount**, obtenido **fallback** (puntaje 0.328; tokens: existe, tarifa, especial, pyme)
- “puedo acceder a un precio preferencial” → esperado **discount**, obtenido **price** (puntaje 0.99; tokens: puedo, acceder, precio, preferencial)
- “hacen paquetes con descuento” → esperado **discount**, obtenido **fallback** (puntaje 0.341; tokens: hacer, paquet, descuento)
- “tienen una oferta disponible” → esperado **discount**, obtenido **fallback** (puntaje 0.341; tokens: tienen, oferta, disponibl)
- “hay rebaja si contrato varios servicios” → esperado **discount**, obtenido **contact** (puntaje 0.62; tokens: rebaja, contacto, vario, servicio)
- “en cuanto tiempo entregan el informe” → esperado **duration**, obtenido **fallback** (puntaje 0.278; tokens: cuanto, tiempo, entregan, informe)
- “cuanto demora el proceso contable” → esperado **duration**, obtenido **process** (puntaje 0.62; tokens: cuanto, demora, proceso, contabilidad)
- “que plazo manejan para una auditoria” → esperado **duration**, obtenido **fallback** (puntaje 0.356; tokens: plazo, manejan, auditoria)
- “cuantos dias tarda la asesoria” → esperado **duration**, obtenido **fallback** (puntaje 0.35; tokens: cuanto, dias, tarda, asesoria)
- “cuando estaria listo el reporte” → esperado **duration**, obtenido **confirm** (puntaje 0.62; tokens: estaria, listo, reporte)
- “cuanto se demora organizar los libros” → esperado **duration**, obtenido **fallback** (puntaje 0.337; tokens: cuanto, demora, organizar, contabilidad)
- “tienen un tiempo estimado de respuesta” → esperado **duration**, obtenido **fallback** (puntaje 0.341; tokens: tienen, tiempo, estimado, respuesta)
- “cuantas semanas dura el acompañamiento” → esperado **duration**, obtenido **fallback** (puntaje 0.278; tokens: cuanto, semana, duda, acompanamiento)
- “que tan rapido pueden empezar” → esperado **duration**, obtenido **fallback** (puntaje 0.31; tokens: tan, rapido, pued, empezar)
- “cual es la fecha de entrega habitual” → esperado **duration**, obtenido **fallback** (puntaje 0.228; tokens: fecha, entrega, habitual)
- “cuantos años llevan prestando estos servicios” → esperado **experience**, obtenido **how_are_you** (puntaje 0.62; tokens: cuanto, nos, llevar, prest, esta, servicio)
- “desde cuando existe la firma” → esperado **experience**, obtenido **fallback** (puntaje 0.359; tokens: desde, existe, firma)
- “tienen trayectoria trabajando con empresas” → esperado **experience**, obtenido **process** (puntaje 0.62; tokens: tienen, trayectoria, trabajan, empresa)
- “que experiencia tienen en contabilidad” → esperado **experience**, obtenido **fallback** (puntaje 0.341; tokens: experiencia, tienen, contabilidad)
- “hace cuanto atienden emprendedores” → esperado **experience**, obtenido **hours** (puntaje 0.99; tokens: hacer, cuanto, atienden, emprendedor)
- “puedo conocer su recorrido profesional” → esperado **experience**, obtenido **fallback** (puntaje 0.35; tokens: puedo, conocer, recorrido, profesional)
- “cuantos casos han manejado” → esperado **experience**, obtenido **fallback** (puntaje 0.31; tokens: cuanto, paso, han, manejan)
- “tienen experiencia en pequeñas empresas” → esperado **experience**, obtenido **fallback** (puntaje 0.341; tokens: tienen, experiencia, pequena, empresa)
- “son expertos con muchos años” → esperado **experience**, obtenido **fallback** (puntaje 0.367; tokens: son, experto, mucha, nos)
- “que antecedentes tiene kontaxer” → esperado **experience**, obtenido **fallback** (puntaje 0.341; tokens: antecedent, tienen, kontaxer)
- “como se que puedo confiar en ustedes” → esperado **trust**, obtenido **fallback** (puntaje 0.31; tokens: puedo, confiar, usted)
- “kontaxer es una empresa segura” → esperado **trust**, obtenido **fallback** (puntaje 0.293; tokens: kontaxer, empresa, segura)
- “puedo confiarles la contabilidad” → esperado **trust**, obtenido **fallback** (puntaje 0.337; tokens: puedo, confiarl, contabilidad)
- “como verifico que son confiables” → esperado **trust**, obtenido **fallback** (puntaje 0.292; tokens: verifico, son, confiabl)
- “que respaldo ofrecen a sus clientes” → esperado **trust**, obtenido **fallback** (puntaje 0.367; tokens: respaldo, ofrece, client)
- “me da tranquilidad compartir documentos” → esperado **trust**, obtenido **fallback** (puntaje 0.31; tokens: da, tranquilidad, compartir, documento)
- “son una firma confiable” → esperado **trust**, obtenido **fallback** (puntaje 0.359; tokens: son, firma, contabilidad)
- “como protegen la confianza del cliente” → esperado **trust**, obtenido **fallback** (puntaje 0; tokens: protegen, confianza, cliente)
- “tienen referencias verificables” → esperado **trust**, obtenido **fallback** (puntaje 0.341; tokens: tienen, referencia, verificabl)
- “que garantia tengo al contratarlos” → esperado **trust**, obtenido **fallback** (puntaje 0.31; tokens: garantia, tengo, contratarlo)
- “que documentos debo enviar para empezar” → esperado **document_needed**, obtenido **fallback** (puntaje 0.31; tokens: documento, debo, enviar, empezar)
- “necesitan mis extractos bancarios” → esperado **document_needed**, obtenido **fallback** (puntaje 0.359; tokens: necesitan, mis, extracto, bancario)
- “que papeles llevo a la primera reunion” → esperado **document_needed**, obtenido **fallback** (puntaje 0.31; tokens: papel, llevo, primera, reunion)
- “que informacion les sirve para revisar mi caso” → esperado **document_needed**, obtenido **capabilities** (puntaje 0.62; tokens: informacion, les, sirve, revisar, caso)
- “debo adjuntar certificados o facturas” → esperado **document_needed**, obtenido **fallback** (puntaje 0.292; tokens: debo, adjuntar, certific, factura)
- “que soportes contables hay que compartir” → esperado **document_needed**, obtenido **fallback** (puntaje 0.337; tokens: soport, contabilidad, compartir)
- “cuales datos necesitan de mi negocio” → esperado **document_needed**, obtenido **privacy** (puntaje 0.99; tokens: cual, privacidad, necesitan, negocio)
- “tengo que mandar estados de cuenta” → esperado **document_needed**, obtenido **price** (puntaje 0.99; tokens: tengo, mandar, esta, cuesta)
- “que documentos preparo para los impuestos” → esperado **document_needed**, obtenido **service_tributaria** (puntaje 0.92; tokens: documento, preparo, tributaria)
- “hay algun formato que deba llenar” → esperado **document_needed**, obtenido **fallback** (puntaje 0.292; tokens: algun, formato, debo, llevar)
- “por donde empiezo si quiero ordenar mi negocio” → esperado **first_step**, obtenido **fallback** (puntaje 0.24; tokens: empiezo, quiero, ordenar, negocio)
- “quiero contratar un servicio, que hago primero” → esperado **first_step**, obtenido **services** (puntaje 0.384; tokens: quiero, contactar, servicio, hago, primero)
- “como arranco con ustedes” → esperado **first_step**, obtenido **fallback** (puntaje 0; tokens: arranco, usted)
- “cual seria el primer paso para una asesoria” → esperado **first_step**, obtenido **fallback** (puntaje 0.35; tokens: seria, primer, paso, asesoria)
- “tengo mi emprendimiento desordenado por donde comienzo” → esperado **first_step**, obtenido **fallback** (puntaje 0.31; tokens: tengo, emprendimiento, desordenado, comienzo)
- “quisiera iniciar una consulta con kontaxer” → esperado **first_step**, obtenido **fallback** (puntaje 0.342; tokens: quisiera, iniciar, consulta, kontaxer)
- “como solicito que me contacten” → esperado **first_step**, obtenido **contact** (puntaje 0.62; tokens: solicito, contacto)
- “necesito ayuda para empezar a llevar libros” → esperado **first_step**, obtenido **capabilities** (puntaje 0.62; tokens: necesito, ayuda, empezar, llevar, contabilidad)
- “cual es el paso inicial para revisar mis cuentas” → esperado **first_step**, obtenido **greeting** (puntaje 0.62; tokens: paso, inicial, revisar, mis, buena)
- “quiero empezar con planificacion financiera” → esperado **first_step**, obtenido **service_finanzas** (puntaje 0.62; tokens: quiero, empezar, planificacion, financiera)
- “q hacen en kontaxer exactamente” → esperado **services**, obtenido **fallback** (puntaje 0.341; tokens: hacer, kontaxer, exacta)
- “me explica que areas de trabajo tienen” → esperado **services**, obtenido **process** (puntaje 0.62; tokens: explica, area, trabajan, tienen)
- “con que temas empresariales me pueden apoyar” → esperado **services**, obtenido **fallback** (puntaje 0.31; tokens: tema, empresarial, pued, apoyar)
- “que soluciones ofrecen a negocios pequeños” → esperado **services**, obtenido **fallback** (puntaje 0.367; tokens: solucion, ofrece, negocio, pequeno)
- “manejan contabilidad y finanzas” → esperado **multi_service**, obtenido **fallback** (puntaje 0.337; tokens: manejan, contabilidad, finanza)
- “necesito auditoria y tambien apoyo tributario” → esperado **multi_service**, obtenido **service_tributaria** (puntaje 0.92; tokens: necesito, auditoria, tambien, apoyo, tributaria)
- “puedo contratar contabilidad junto con presupuesto” → esperado **multi_service**, obtenido **fallback** (puntaje 0.367; tokens: puedo, contactar, contabilidad, junto, presupuesto)
- “quiero comparar auditoria con contabilidad” → esperado **compare_services**, obtenido **fallback** (puntaje 0.356; tokens: quiero, comparar, auditoria, contabilidad)
- “cual es la diferencia entre impuestos y auditoria” → esperado **compare_services**, obtenido **service_tributaria** (puntaje 0.92; tokens: diferencia, entre, tributaria, auditoria)
- “me interesa mas de un servicio” → esperado **multi_service**, obtenido **fallback** (puntaje 0.376; tokens: interesa, mas, servicio)
- “hacen nomina para empleados” → esperado **service_unconfirmed**, obtenido **fallback** (puntaje 0.341; tokens: hacer, nomina, emple)
- “pueden facturar electronicamente por mi” → esperado **service_unconfirmed**, obtenido **fallback** (puntaje 0.31; tokens: pued, facturar, electronica)
- “venden software de contabilidad” → esperado **service_unconfirmed**, obtenido **fallback** (puntaje 0.337; tokens: venden, software, contabilidad)
- “tambien llevan recursos humanos” → esperado **service_unconfirmed**, obtenido **fallback** (puntaje 0.18; tokens: tambien, llevar, recurso, humano)
- “ofrecen asesoria juridica” → esperado **service_unconfirmed**, obtenido **fallback** (puntaje 0.367; tokens: ofrece, asesoria, juridica)
- “me ayudan a cobrar cartera” → esperado **service_unconfirmed**, obtenido **capabilities** (puntaje 0.62; tokens: ayuda, cobrar, cartera)
- “hacen declaracion de renta para personas naturales” → esperado **who_for_naturales**, obtenido **fallback** (puntaje 0.359; tokens: hacer, declaracion, renta, persona, natural)
- “atienden a alguien que no tiene empresa” → esperado **who_for_naturales**, obtenido **hours** (puntaje 0.99; tokens: atienden, alguien, tienen, empresa)
- “trabajan con independientes como persona natural” → esperado **who_for_naturales**, obtenido **process** (puntaje 0.62; tokens: trabajan, independient, persona, natural)
- “tienen clientes que son personas naturales” → esperado **who_for_naturales**, obtenido **fallback** (puntaje 0.359; tokens: tienen, client, son, persona, natural)
- “yo no tengo pyme, igual me asesoran” → esperado **who_for_naturales**, obtenido **fallback** (puntaje 0.35; tokens: yo, tengo, pyme, igual, asesoria)
- “necesito hablar con un asesor humano” → esperado **human_handoff**, obtenido **fallback** (puntaje 0.35; tokens: necesito, hablar, asesor, humano)
- “me comunicas con una persona por favor” → esperado **human_handoff**, obtenido **fallback** (puntaje 0.359; tokens: comunica, persona, favor)
- “quiero que me llame alguien de la oficina” → esperado **human_handoff**, obtenido **contact** (puntaje 0.385; tokens: quiero, llamo, alguien, oficina)
- “prefiero continuar con un asesor” → esperado **human_handoff**, obtenido **fallback** (puntaje 0.35; tokens: prefiero, continuar, asesor)
- “necesito que un contador revise esto” → esperado **human_handoff**, obtenido **service_contabilidad** (puntaje 0.62; tokens: necesito, contabilidad, revise)
- “no me resolvieron la consulta” → esperado **complaint**, obtenido **deny** (puntaje 0.78; tokens: resolvieron, consulta)
- “estoy inconforme con la respuesta” → esperado **complaint**, obtenido **fallback** (puntaje 0; tokens: estoy, inconforme, respuesta)
- “quiero presentar una queja” → esperado **complaint**, obtenido **fallback** (puntaje 0.78; tokens: quiero, preguntar, queja)
- “esto no me sirve, necesito ayuda” → esperado **complaint**, obtenido **capabilities** (puntaje 0.62; tokens: sirve, necesito, ayuda)
- “tu respuesta fue incorrecta” → esperado **complaint**, obtenido **fallback** (puntaje 0; tokens: tu, respuesta, incorrecta)
- “quien gano el partido ayer” → esperado **out_of_scope**, obtenido **fallback** (puntaje 0.368; tokens: quien, mano, partido, ayer)
- “cuentame un chiste largo” → esperado **out_of_scope**, obtenido **joke** (puntaje 0.78; tokens: cuentame, chiste, largo)
- “va a llover mañana en bogota” → esperado **out_of_scope**, obtenido **how_are_you** (puntaje 0.62; tokens: va, llover, manana, bogota)
- “que hora es en tokio” → esperado **out_of_scope**, obtenido **hours** (puntaje 0.99; tokens: hora, tokio)
- “quien es el presidente actual” → esperado **out_of_scope**, obtenido **fallback** (puntaje 0.368; tokens: quien, presidente, actual)
- “recomiendame una pelicula de terror” → esperado **out_of_scope**, obtenido **fallback** (puntaje 0; tokens: recomiendame, pelicula, terror)
- “como preparo arroz con pollo” → esperado **out_of_scope**, obtenido **prepare** (puntaje 0.62; tokens: preparo, arroz, pollo)
- “cuanto cuesta un vuelo a madrid” → esperado **out_of_scope**, obtenido **price** (puntaje 0.99; tokens: cuanto, cuesta, vuelo, madrid)
- “dame el resultado de la loteria” → esperado **out_of_scope**, obtenido **fallback** (puntaje 0.249; tokens: dame, resultado, loteria)
- “explicame la fotosintesis” → esperado **out_of_scope**, obtenido **service_detail** (puntaje 0.385; tokens: explicame, fotosintesi)
- “porfa pasame el telefono y el correo” → esperado **contact**, obtenido **fallback** (puntaje 0.292; tokens: porfa, pasame, telefono, correo)
- “gracias por la ayuda, hablamos luego” → esperado **farewell + thanks**, obtenido **thanks** (puntaje 0.78; tokens: gracia, ayuda, hablamo, luego)
- “tienen oficina cerca de mi casa” → esperado **address**, obtenido **fallback** (puntaje 0.341; tokens: tienen, oficina, cerca, casa)
- “soy maria fernanda y busco ayuda tributaria” → esperado **name + service_tributaria**, obtenido **service_tributaria** (puntaje 0.92; tokens: soy, maria, fernanda, busco, ayuda, tributaria)
- “el iva es parte de los servicios que ofrecen” → esperado **service_tributaria**, obtenido **fallback** (puntaje 0.367; tokens: iva, parte, servicio, ofrece)
- “tengo buenas cuentas pero quiero un contador” → esperado **service_contabilidad**, obtenido **greeting** (puntaje 0.62; tokens: tengo, buena, buena, quiero, contabilidad)
- “puedo llamarlos al celular” → esperado **contact**, obtenido **fallback** (puntaje 0.31; tokens: puedo, llamarlo, celular)
- “necesito un presupuesto para mi tienda” → esperado **service_finanzas**, obtenido **fallback** (puntaje 0.31; tokens: necesito, presupuesto, tienda)
- “me hacen una revision de procesos y control” → esperado **service_auditorias**, obtenido **process** (puntaje 0.62; tokens: hacer, revision, proceso, control)
- “no se si necesito contabilidad o asesoria tributaria” → esperado **compare_services**, obtenido **service_tributaria** (puntaje 0.92; tokens: necesito, contabilidad, asesoria, tributaria)
- “a donde escribo para que me atienda alguien” → esperado **human_handoff**, obtenido **hours** (puntaje 0.99; tokens: escribo, atienden, alguien)
- “no tengo claro que servicio escoger” → esperado **first_step**, obtenido **deny** (puntaje 0.78; tokens: tengo, claro, servicio, escoger)
- “me siento perdido con las cuentas del negocio” → esperado **service_contabilidad**, obtenido **greeting** (puntaje 0.62; tokens: siento, perdido, buena, negocio)
- “cual es el numero para llamar desde celular” → esperado **contact**, obtenido **fallback** (puntaje 0.351; tokens: numero, llamar, desde, celular)
- “atienden por videollamada a clientes de otra ciudad” → esperado **coverage**, obtenido **hours** (puntaje 0.99; tokens: atienden, videollamada, client, otra, ciudad)
- “cuanto se demora una conciliacion bancaria” → esperado **duration**, obtenido **fallback** (puntaje 0.278; tokens: cuanto, demora, conciliacion, bancaria)
- “tienen algun descuento por contratar contabilidad” → esperado **discount**, obtenido **fallback** (puntaje 0.367; tokens: tienen, algun, descuento, contactar, contabilidad)
- “puedo pagar con tarjeta debito o transferencia” → esperado **payment**, obtenido **fallback** (puntaje 0.31; tokens: puedo, pagar, tarjeta, debito, transferencia)
- “me confirman si tienen experiencia con pymes” → esperado **experience**, obtenido **fallback** (puntaje 0.341; tokens: confirman, tienen, experiencia, pyme)
- “me da confianza compartir los extractos” → esperado **trust**, obtenido **fallback** (puntaje 0; tokens: da, confianza, compartir, extracto)
- “que archivos debo tener listos para revisar renta” → esperado **document_needed**, obtenido **confirm** (puntaje 0.62; tokens: archivo, debo, listo, revisar, renta)
- “quiero comenzar con una asesoria, como sigo” → esperado **first_step**, obtenido **fallback** (puntaje 0.35; tokens: quiero, comenzar, asesoria, sigo)
- “me parece mal que no den respuesta clara” → esperado **complaint**, obtenido **yes** (puntaje 0.62; tokens: parece, mal, den, respuesta, claro)
- “pueden atender nomina y tambien facturacion electronica” → esperado **service_unconfirmed**, obtenido **hours** (puntaje 0.99; tokens: pued, atienden, nomina, tambien, facturacion, electronico)
- “busco comparar plan financiero con auditoria” → esperado **compare_services**, obtenido **fallback** (puntaje 0.356; tokens: busco, comparar, plan, finanza, auditoria)
- “tengo un negocio pequeño y quiero saber sus opciones” → esperado **services**, obtenido **followup_more** (puntaje 0.412; tokens: tengo, negocio, pequeno, quiero, saber, opcion)
