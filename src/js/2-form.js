let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');

fillFieldFromLS();
form.addEventListener('input', onFieldInput);
form.addEventListener('submit', onFormSubmit);

function onFieldInput(event) {
  const fieldValue = event.target.value.trim();
  const fieldName = event.target.name;

  formData[fieldName] = fieldValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function fillFieldFromLS() {
  const formDataFromLS = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );

  if (formDataFromLS === null) {
    return;
  }

  formData = formDataFromLS;

  for (const key in formDataFromLS) {
    if (formDataFromLS.hasOwnProperty(key)) {
      form.elements[key].value = formDataFromLS[key];
    }
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  if (
    form.elements.email.value.length == 0 ||
    form.elements.message.value.length == 0
  ) {
    alert('Fill please all fields');
    return;
  } else {
    console.log(formData);
  }

  event.target.reset();
  localStorage.removeItem('feedback-form-state');
  formData = {};
}
