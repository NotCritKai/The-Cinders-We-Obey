const menu=document.querySelector('.menu-toggle');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('#site-links').classList.toggle('open',open);});
const search=document.querySelector('#term-search');
search?.addEventListener('input',()=>{const query=search.value.trim().toLowerCase();let count=0;document.querySelectorAll('[data-term]').forEach(term=>{const match=term.textContent.toLowerCase().includes(query);term.hidden=!match;if(match)count++;});document.querySelector('#term-count').textContent=count+' '+(count===1?'term':'terms');document.querySelector('#no-terms').hidden=count!==0;});

const characterSelect=document.querySelector('#character-select');
if(characterSelect){
 const showCharacter=()=>{
  const selected=characterSelect.value;
  document.querySelectorAll('[data-character]').forEach(profile=>{
   profile.hidden=selected!==profile.dataset.character && selected!==profile.dataset.chapter;
  });
 };
 characterSelect.addEventListener('change',showCharacter);
 showCharacter();
}
