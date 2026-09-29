import {BUSINESS} from './js/assistant/knowledge-base.js';
const node=document.querySelector('#privacy-contact');
if(node)node.innerHTML=`<a href="mailto:${BUSINESS.email}">${BUSINESS.email}</a>`;
