import './project-videos.js';

const services = [
['porte', 'Portes d’entrée', 'Sécurité, design et performance pour une entrée qui vous ressemble.'],
['roulant', 'Volets roulants', 'Manuels ou motorisés, confort et sécurité au quotidien.'],
['battant', 'Volets battants', 'Charme, isolation et robustesse avec des finitions soignées.'],
['fenetre', 'Fenêtres', 'PVC, aluminium ou bois, des fenêtres performantes et élégantes.'],
['portail', 'Portails', 'Automatiques ou manuels, sécurité et esthétique pour votre extérieur.'],
['veranda', 'Vérandas', 'Des espaces lumineux et confortables toute l’année.'],
['pergola', 'Pergolas', 'Un nouvel espace de vie pour profiter de chaque saison.'],
['escalier', 'Escaliers & Parquets', 'Des matières et des finitions pour sublimer votre intérieur.']
];
const assetBase = new URL('../images/', import.meta.url).href;
document.querySelector('#service-grid').innerHTML = services.map(([image,title,description],i)=>`<a class="service-card" href="#contact" data-service="${title}"><div class="card-photo"><img src="${assetBase}${image}.webp" alt="${title} — photographie d’illustration" loading="lazy" decoding="async"><span class="card-arrow">↗</span></div><div class="card-copy"><span class="service-number">0${i+1}</span><h3>${title}</h3><p>${description}</p></div></a>`).join('');
const menu = document.querySelector('.menu-toggle');
const contactWidget = document.querySelector('#contact-widget');
const contactToggle = document.querySelector('#contact-toggle');
contactWidget.addEventListener('toggle', (event) => {
  contactToggle.setAttribute('aria-expanded', String(event.newState === 'open'));
  if (event.newState === 'open') {
    document.querySelector('nav').classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }
});
menu.addEventListener('click',()=> {const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('nav').classList.toggle('open',open);});
document.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',()=>{document.querySelector('nav').classList.remove('open');menu.setAttribute('aria-expanded','false');}));
document.querySelectorAll('[data-service]').forEach(card=>card.addEventListener('click',()=> {const select=document.querySelector('select');const match=[...select.options].find(o=>o.text.replace('’',"'")===card.dataset.service.replace('’',"'"));if(match)select.value=match.value;}));
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelector('#quote-form').addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.target);data.set('telephone', '+33 ' + data.get('telephone').trim());const body=[...data].map(([key,value])=>`${key} : ${value}`).join('\n');window.location.href=`mailto:contact@bati-renov-design.fr?subject=${encodeURIComponent('Demande de devis — '+data.get('projet'))}&body=${encodeURIComponent(body)}`;document.querySelector('#form-status').textContent='Votre messagerie va s’ouvrir avec votre demande. Envoyez l’email pour nous la transmettre.';});

const phoneInput = document.querySelector('input[name="telephone"]');
phoneInput.addEventListener('input', () => {
  const raw = phoneInput.value;
  let digits = raw.replace(/\D/g, '');
  if (raw.trim().startsWith('+33')) digits = digits.slice(2);
  else if (digits.startsWith('0033')) digits = digits.slice(4);
  if (digits.startsWith('0')) digits = digits.slice(1);
  // Keep editing natural; apply spacing when the user leaves the field.
  phoneInput.setCustomValidity(/^[1-9]\d{8}$/.test(digits) || !digits
    ? '' : 'Saisissez un numéro français de 9 chiffres après +33.');
  phoneInput.dataset.digits = digits;
});
phoneInput.addEventListener('blur', () => {
  const digits = phoneInput.dataset.digits;
  if (digits && /^[1-9]\d{8}$/.test(digits)) {
    phoneInput.value = digits.replace(/^(\d)(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');
  }
});
