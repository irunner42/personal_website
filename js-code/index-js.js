const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

// Open modal
openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

// Close modal
closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

// Close when clicking overlay
overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => closeModal(modal))
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}



document.getElementById("submitBtn").addEventListener("click", function (e) {
  e.preventDefault(); 

  const form = document.getElementById("form");
  const nameInput = document.querySelector('.modal_input[type="text"]');
  const emailInput = document.querySelector('.modal_input[type="email"]');
  const messageInput = document.querySelector(".modal_input_message");

  const inputs = [
    { input: nameInput, labelText: "Name", type: "text" },
    { input: emailInput, labelText: "Email", type: "email" },
    { input: messageInput, labelText: "Message", type: "text" },
  ];

  let allValid = true;

  inputs.forEach(({ input, type }) => {
    const tag = input.previousElementSibling;
    let errorMessage = "";
    const existingError = input.nextElementSibling;
    if (existingError && existingError.classList.contains("error-message")) {
      existingError.remove();
    }

    input.classList.remove("error");
    tag.classList.remove("error-label");

    if (!input.value.trim()) {
      allValid = false;
      errorMessage =
        type === "email"
          ? " Please choose the right email format."
          : " Please enter the information correctly.";
    } else if (type === "email" && !input.value.includes("@")) {
      allValid = false;
      errorMessage = " Please choose the right email format.";
    }

    if (errorMessage) {
      input.classList.add("error");
      tag.classList.add("error-label");

      const errorDiv = document.createElement("div");
      errorDiv.classList.add("error-message");
      errorDiv.textContent = errorMessage;
      input.insertAdjacentElement("afterend", errorDiv);
    }
  });

  if (!allValid) return;

  const formData = new FormData(form);
  fetch(form.action, {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      alert(`Thank you, ${nameInput.value.trim()}! Your message has been sent.`);

      inputs.forEach(({ input }) => {
        input.value = "";
        input.classList.remove("error");
        const tag = input.previousElementSibling;
        tag.classList.remove("error-label");
        const existingError = input.nextElementSibling;
        if (existingError && existingError.classList.contains("error-message")) {
          existingError.remove();
        }
      });

      closeModal(document.getElementById("modal"));
    })
    .catch(err => {
      alert("Oops! Something went wrong. Please try again later.");
      console.error(err);
    });
});


window.addEventListener('load', () => {
    document.getElementById('project-card').classList.add('visible');
});
window.addEventListener('load', () => {
    document.getElementById('project-card_1').classList.add('visible');
});





