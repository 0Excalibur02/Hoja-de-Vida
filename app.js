(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
    // Contact form: habilitar botón "Enviar Correo" sólo cuando todos los campos estén diligenciados
    const contactName = document.getElementById('contact-name');
    const contactEmail = document.getElementById('contact-email');
    const contactSubject = document.getElementById('contact-subject');
    const contactMessage = document.getElementById('contact-message');
    const sendBtn = document.getElementById('send-btn');

    function isEmailValid(email) {
        return /^\S+@\S+\.\S+$/.test(email);
    }

    function validateContactForm() {
        if (!contactName || !contactEmail || !contactSubject || !contactMessage || !sendBtn) return;
        const allFilled = [contactName, contactEmail, contactSubject, contactMessage].every(el => el.value && el.value.trim() !== '');
        const emailOk = isEmailValid(contactEmail.value.trim());
        if (allFilled && emailOk) {
            sendBtn.disabled = false;
            sendBtn.removeAttribute('aria-disabled');
        } else {
            sendBtn.disabled = true;
            sendBtn.setAttribute('aria-disabled', 'true');
        }
    }

    // Añadir listeners de entrada para validar en tiempo real
    [contactName, contactEmail, contactSubject, contactMessage].forEach(el => {
        if (el) el.addEventListener('input', validateContactForm);
    });

    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            // Si está deshabilitado, no hacer nada
            if (sendBtn.disabled) return;
            const ownerEmail = 'joseandres.jabc@gmail.com';
            const subject = encodeURIComponent(contactSubject.value.trim());
            const body = encodeURIComponent(
                `Nombre: ${contactName.value.trim()}\nCorreo: ${contactEmail.value.trim()}\n\n${contactMessage.value.trim()}`
            );
            // Abrir el cliente de correo del usuario con los datos
            window.location.href = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
        });
    }
})();
