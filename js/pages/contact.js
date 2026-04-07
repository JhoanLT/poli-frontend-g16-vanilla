function renderContact() {
  document.getElementById('main').innerHTML = `
    <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">

      <div class="mb-10">
        <p class="text-xs font-bold uppercase tracking-widest text-coral">Contacto</p>
        <h1 class="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">Ponete en contacto</h1>
        <p class="mt-2 text-slate">Completa el formulario y te responderemos pronto.</p>
      </div>

      <div class="grid gap-12 lg:grid-cols-[1fr_360px]">

        <!-- Form -->
        <form id="contact-form" novalidate class="space-y-5">
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-ink" for="cf-name">Nombre completo *</label>
              <input id="cf-name" type="text" class="input" placeholder="Tu nombre" />
              <p class="form-error mt-1 hidden text-xs text-red-500" id="err-name"></p>
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-ink" for="cf-email">Correo electronico *</label>
              <input id="cf-email" type="email" class="input" placeholder="correo@ejemplo.com" />
              <p class="form-error mt-1 hidden text-xs text-red-500" id="err-email"></p>
            </div>
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-ink" for="cf-subject">Asunto *</label>
            <input id="cf-subject" type="text" class="input" placeholder="Sobre que quieres hablar?" />
            <p class="form-error mt-1 hidden text-xs text-red-500" id="err-subject"></p>
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-ink" for="cf-message">Mensaje *</label>
            <textarea id="cf-message" rows="5" class="input resize-none" placeholder="Escribe tu mensaje aqui..."></textarea>
            <p class="form-error mt-1 hidden text-xs text-red-500" id="err-message"></p>
          </div>
          <button type="submit" id="cf-submit" class="btn-coral px-8">Enviar mensaje</button>
          <div id="form-success" class="hidden rounded-2xl bg-teal/10 p-4 text-sm font-medium text-teal">
            ✓ Mensaje enviado con exito. Te contactaremos pronto.
          </div>
        </form>

        <!-- Info -->
        <div class="flex flex-col gap-4">
          <div class="rounded-2xl border border-sand bg-white/80 p-6 shadow-soft">
            <h2 class="font-display text-lg font-bold text-ink">Informacion de contacto</h2>
            <div class="mt-4 space-y-3 text-sm text-slate">
              <p>📧 <a href="mailto:contacto@poliservicehub.com" class="text-coral hover:underline">contacto@poliservicehub.com</a></p>
              <p>📍 Bogota, Colombia</p>
              <p>🕐 Lunes a viernes, 8am – 6pm</p>
            </div>
          </div>
          <div class="rounded-2xl border border-sand bg-white/80 p-6 shadow-soft">
            <h2 class="font-display text-base font-bold text-ink">Tiempo de respuesta</h2>
            <p class="mt-2 text-sm text-slate">Respondemos en un plazo de 24 a 48 horas habiles.</p>
          </div>
        </div>

      </div>
    </div>
  `;

  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateContactForm()) {
      const btn = document.getElementById('cf-submit');
      btn.textContent = 'Enviando...';
      btn.disabled = true;
      setTimeout(() => {
        document.getElementById('form-success').classList.remove('hidden');
        document.getElementById('contact-form').reset();
        btn.textContent = 'Enviar mensaje';
        btn.disabled = false;
        showToast('Mensaje enviado con exito');
      }, 800);
    }
  });
}

function validateContactForm() {
  let valid = true;

  const fields = [
    { id: 'cf-name',    errId: 'err-name',    label: 'El nombre',  minLen: 2 },
    { id: 'cf-subject', errId: 'err-subject', label: 'El asunto',   minLen: 3 },
    { id: 'cf-message', errId: 'err-message', label: 'El mensaje',  minLen: 10 },
  ];

  fields.forEach(f => {
    const el  = document.getElementById(f.id);
    const err = document.getElementById(f.errId);
    if (!el.value.trim() || el.value.trim().length < f.minLen) {
      err.textContent = `${f.label} es requerido (min. ${f.minLen} caracteres).`;
      err.classList.remove('hidden');
      el.classList.add('border-red-400');
      valid = false;
    } else {
      err.classList.add('hidden');
      el.classList.remove('border-red-400');
    }
  });

  // Email validation
  const emailEl  = document.getElementById('cf-email');
  const emailErr = document.getElementById('err-email');
  const emailRe  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(emailEl.value.trim())) {
    emailErr.textContent = 'Ingresa un correo electronico valido.';
    emailErr.classList.remove('hidden');
    emailEl.classList.add('border-red-400');
    valid = false;
  } else {
    emailErr.classList.add('hidden');
    emailEl.classList.remove('border-red-400');
  }

  return valid;
}
