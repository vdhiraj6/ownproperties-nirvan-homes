// Smooth scroll
document.querySelectorAll('nav a[href^="#"]').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

// Popup controls
const overlay = document.getElementById('leadOverlay');
document.getElementById('openLead').addEventListener('click', ()=> overlay.style.display='flex');
document.getElementById('openFixed').addEventListener('click', ()=> overlay.style.display='flex');
document.getElementById('closeModal').addEventListener('click', ()=> overlay.style.display='none');
document.getElementById('cancelPopup').addEventListener('click', ()=> overlay.style.display='none');

// Formspree endpoint (replace with your own)
const FORMSPREE = 'YOUR_FORMSPREE_ENDPOINT';

// Handle form submit
function handleSubmit(form, statusEl){
  form.addEventListener('submit', e=>{
    e.preventDefault();
    statusEl.textContent = 'Submitting...';
    const data = {};
    form.querySelectorAll('input,textarea').forEach(input=> data[input.name] = input.value.trim());
    if(FORMSPREE && FORMSPREE !== 'YOUR_FORMSPREE_ENDPOINT'){
      fetch(FORMSPREE, {
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify(data)
      }).then(res=>{
        if(res.ok){statusEl.textContent='Thank you!'; form.reset(); setTimeout(()=> overlay.style.display='none', 1200);}
        else statusEl.textContent='Error, please try again.';
      }).catch(()=> statusEl.textContent='Error, please try again.');
    } else {
      statusEl.textContent='Formspree endpoint not set.';
    }
  });
}
handleSubmit(document.getElementById('contactForm'), document.getElementById('formStatus'));
handleSubmit(document.getElementById('popupForm'), document.getElementById('popupStatus'));
