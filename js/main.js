(function(){
  'use strict';
  var WA='5516993553753';
  var doc=document;
  doc.documentElement.classList.add('js');
  var y=doc.getElementById('ano'); if(y) y.textContent=new Date().getFullYear();

  // Menu mobile
  var burger=doc.getElementById('burger'), menu=doc.getElementById('menu');
  function closeMenu(){menu.classList.remove('open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Abrir menu');}
  burger.addEventListener('click',function(){
    var open=menu.classList.toggle('open');
    burger.setAttribute('aria-expanded',String(open));
    burger.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
  });
  menu.addEventListener('click',function(e){if(e.target.closest('a'))closeMenu();});
  doc.addEventListener('keydown',function(e){if(e.key==='Escape'){closeMenu();}});

  // FAQ (acordeão)
  doc.querySelectorAll('.qa button').forEach(function(b){
    b.addEventListener('click',function(){
      var open=b.getAttribute('aria-expanded')==='true';
      b.setAttribute('aria-expanded',String(!open));
      doc.getElementById(b.getAttribute('aria-controls')).classList.toggle('open',!open);
    });
  });

  // Botões "Consultar ..." -> WhatsApp com mensagem pronta
  doc.querySelectorAll('[data-wa]').forEach(function(a){
    a.href='https://wa.me/'+WA+'?text='+encodeURIComponent(a.getAttribute('data-wa'));
    a.target='_blank'; a.rel='noopener';
  });

  // Formulário -> WhatsApp
  var form=doc.getElementById('form-orcamento'), err=doc.getElementById('form-err');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var f=form.elements, bad=[];
    ['nome','tel','tipo','cidade'].forEach(function(n){
      var el=f[n], ok=el.value.trim()!=='';
      if(n==='tel') ok=ok&&el.value.replace(/\D/g,'').length>=10;
      el.setAttribute('aria-invalid',ok?'false':'true');
      if(!ok) bad.push(el);
    });
    if(bad.length){
      err.hidden=false;
      err.textContent='Preencha nome, telefone com DDD, tipo de madeira e cidade de entrega.';
      bad[0].focus(); return;
    }
    err.hidden=true;
    var v=function(n){return f[n].value.trim();};
    var msg='Olá! Gostaria de solicitar um orçamento.\n\n'+
      'Nome: '+v('nome')+'\nTelefone: '+v('tel')+'\nTipo de madeira: '+v('tipo')+'\nCidade de entrega: '+v('cidade')+
      (v('qtd')?'\nQuantidade aproximada: '+v('qtd'):'')+
      (v('med')?'\nMedidas/especificações: '+v('med'):'')+
      (v('obs')?'\nObservações: '+v('obs'):'');
    var a=doc.createElement('a');
    a.href='https://wa.me/'+WA+'?text='+encodeURIComponent(msg);
    a.target='_blank'; a.rel='noopener'; doc.body.appendChild(a); a.click(); a.remove();
  });
  form.addEventListener('input',function(e){if(e.target.getAttribute('aria-invalid')==='true'&&e.target.value.trim())e.target.setAttribute('aria-invalid','false');});

  // Entrada suave ao rolar
  var items=doc.querySelectorAll('.sec-head,.prod,.app,.diffs article,.g,.about>*,.loc>*,.quote-in>*,.cta-band,.insta-in,.faq');
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});},{rootMargin:'0px 0px -8% 0px'});
    items.forEach(function(el){el.classList.add('rv');io.observe(el);});
  }
})();
