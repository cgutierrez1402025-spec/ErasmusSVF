// Pestañas de documentación
document.querySelectorAll('[data-tabs]').forEach(g=>{
  const btns=g.querySelectorAll('[role=tab]');
  btns.forEach(b=>b.addEventListener('click',()=>{
    btns.forEach(x=>{x.setAttribute('aria-selected',x===b);
      document.getElementById(x.getAttribute('aria-controls')).hidden=x!==b;});
  }));
});

// Checklist con progreso guardado en el navegador
document.querySelectorAll('.check').forEach(list=>{
  const id=list.dataset.key, boxes=[...list.querySelectorAll('input')];
  const bar=document.querySelector(`progress[data-for="${id}"]`);
  const saved=JSON.parse(localStorage.getItem('svf-'+id)||'[]');
  boxes.forEach((b,i)=>{b.checked=!!saved[i];
    b.addEventListener('change',()=>{update();
      localStorage.setItem('svf-'+id,JSON.stringify(boxes.map(x=>x.checked)));});});
  function update(){bar.max=boxes.length;bar.value=boxes.filter(x=>x.checked).length;
    bar.nextElementSibling.textContent=`${bar.value} de ${boxes.length}`;}
  update();
});

// Calculadora de puntos (máx. 15)
const f=document.getElementById('calc');
if(f){
  const out=document.getElementById('total'),det=document.getElementById('det');
  const clamp=(v,m)=>Math.min(m,Math.max(0,parseFloat(v)||0));
  const calc=()=>{
    const i=+f.idioma.value,n=+f.nota.value,e=clamp(f.entrevista.value,5),t=clamp(f.tutor.value,2);
    const tot=i+n+e+t;
    out.textContent=`${tot} / 15`;
    det.textContent=`Idioma ${i} + Nota media ${n} + Entrevista/CV/carta ${e} + Informe tutor/a ${t}`;
  };
  f.addEventListener('input',calc);f.addEventListener('change',calc);calc();
}
