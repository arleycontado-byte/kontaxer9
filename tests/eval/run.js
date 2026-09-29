import fs from 'node:fs';
import { createEngine } from '../../js/assistant/engine.js';
import { INTENTS } from '../../js/assistant/knowledge-base.js';

const cases = JSON.parse(fs.readFileSync(new URL('./heldout.json', import.meta.url), 'utf8'));
const norm = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const trained = new Set(INTENTS.flatMap(intent => intent.examples.map(norm)));
const overlaps = cases.filter(item => trained.has(norm(item.phrase)));
if (overlaps.length) throw new Error(`Frases reservadas repetidas en entrenamiento: ${overlaps.map(x => x.phrase).join(' | ')}`);
const confusions = new Map(), byIntent = new Map();
let correct = 0, fallbackInScope = 0, confidentWrong = 0, inScope = 0;
const failures = [];
for (const item of cases) {
  const result = createEngine().reply(item.phrase);
  const wanted = item.expected[0], actual = result.intents || [result.intent];
  const ok = item.expected.length > 1 ? item.expected.every(id => actual.includes(id)) : result.intent === wanted;
  if (ok) correct++;
  if (item.inScope) { inScope++; if (result.intent === 'fallback') fallbackInScope++; }
  if (!ok && result.score >= 0.75) confidentWrong++;
  const key = `${wanted} → ${result.intent}`;
  confusions.set(key, (confusions.get(key) || 0) + 1);
  const stat = byIntent.get(wanted) || { n: 0, correct: 0 };
  stat.n++; if (ok) stat.correct++; byIntent.set(wanted, stat);
  if (!ok) failures.push({ phrase: item.phrase, expected: item.expected.join(' + '), got: result.intent, score: result.score, tokens: result.tokens });
}
const pct = (n, d) => `${(100 * n / (d || 1)).toFixed(1)}%`;
const report = [`# Evaluación del asistente KONTAXER`, '', `- Frases reservadas: ${cases.length}`, `- Exactitud de intención primaria: ${pct(correct, cases.length)} (${correct}/${cases.length})`, `- Fallback dentro de alcance: ${pct(fallbackInScope, inScope)} (${fallbackInScope}/${inScope})`, `- Respuesta segura incorrecta (confianza ≥ 0.75): ${pct(confidentWrong, cases.length)} (${confidentWrong}/${cases.length})`, '', '## Exactitud por intención', '', '| Intención | Correctas | Total | Exactitud |', '|---|---:|---:|---:|', ...[...byIntent].sort().map(([id, s]) => `| ${id} | ${s.correct} | ${s.n} | ${pct(s.correct, s.n)} |`), '', '## Confusiones principales', '', '| Ruta | Casos |', '|---|---:|', ...[...confusions].sort((a,b)=>b[1]-a[1]).slice(0,20).map(([k,v])=>`| ${k} | ${v} |`), '', '## Errores', '', ...failures.map(x => `- “${x.phrase}” → esperado **${x.expected}**, obtenido **${x.got}** (puntaje ${x.score}; tokens: ${x.tokens?.join(', ') || '—'})`) ].join('\n');
console.log(report);
if (process.argv.includes('--save')) fs.writeFileSync(new URL('./report.md', import.meta.url), report + '\n');
if (process.argv.includes('--gate') && (correct / cases.length < .9 || fallbackInScope / inScope > .08 || confidentWrong / cases.length > .02)) process.exitCode = 1;
