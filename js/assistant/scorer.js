import { INTENTS, STOPWORDS } from './knowledge-base.js';
import { cleanText, stem } from './normalize.js';

const PRIORITY={services:13,price:10,regulation:10,discount:9,payment:11,duration:9,coverage:9,advice:9,contact:10,privacy:10,document_needed:10,prepare:4,experience:10,trust:11,compare_services:11,multi_service:11,first_step:11,service_unconfirmed:11,human_handoff:11};
const EXACT_ONLY=new Set(['fallback','followup_cost','followup_more','followup_this','service_detail','joke','laugh','insult','confirm','deny','yes','nonsense','empty','prepare']);
const STOP_STEMS=new Set([...STOPWORDS].map(stem));
const unimportant=word=>STOPWORDS.has(word)||STOP_STEMS.has(word)||STOPWORDS.has(stem(word));
const exampleWords=new Map(INTENTS.map(i=>[i.id,i.examples.map(p=>cleanText(p).split(' ').map(stem).filter(w=>w&&!unimportant(w)))]));

// Rango léxico interpretable: términos distintos + frase específica + apoyo BM25 débil.
export function scoreIntents(text,tokens=[]){
 const normalized=cleanText(text),tokenSet=new Set(tokens.map(stem).filter(w=>!unimportant(w)));
 const scores=INTENTS.map(intent=>{
  const exactExample=intent.examples.some(example=>cleanText(example)===normalized);
  if(intent.id==='fallback'||(EXACT_ONLY.has(intent.id)&&!exactExample))return null;
  const keys=[...new Set((intent.keywords||[]).map(cleanText).filter(Boolean).map(term=>term.includes(' ')?`p:${term}`:`w:${stem(term)}`).filter(key=>key.startsWith('p:')||!unimportant(key.slice(2))))];
  const hits=[];let phraseHit=false;
  for(const key of keys){const phrase=key.startsWith('p:');const term=key.slice(2);const words=term.split(' ').map(stem);
   const hit=phrase?(` ${normalized} `).includes(` ${term} `):tokenSet.has(term)||normalized.split(' ').some(w=>stem(w)===term);
   if(hit){hits.push(term);if(phrase)phraseHit=true;}
  }
  const examples=exampleWords.get(intent.id)||[];
  const exampleScore=examples.reduce((best,words)=>{if(words.length<2)return best;const overlap=words.filter(w=>tokenSet.has(w)).length;return Math.max(best,overlap/words.length);},0);
  const n=new Set(hits).size;
  const score=exactExample ? .98 : n ? Math.min(1,.48+Math.min(.32,n*.105)+(phraseHit ? .22 : 0)+Math.min(.08,exampleScore*.08)) : 0;
  return {id:intent.id==='followup_cost'?'price':intent.id,label:intent.id==='followup_cost'?'Precio':intent.label,score:Number(score.toFixed(3)),matchedTerms:[...new Set(hits)]};
 }).filter(x=>x?.score>0).sort((a,b)=>b.score-a.score||(PRIORITY[b.id]||0)-(PRIORITY[a.id]||0));
 return scores;
}
