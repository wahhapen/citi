const request = document.querySelector('.request');
const requestForm = request.querySelector('form');
const requestItems = request.querySelectorAll('.request-item');
const requestMail = request.querySelector('.mail');
const requestName = request.querySelector('.name');
const requestCountry = request.querySelector('.country');
const requestTerms = request.querySelector('.request-terms');
const countrySelect = requestCountry.querySelector('select');
const mailInput = requestMail.querySelector('input');
const nameInput = requestName.querySelector('input');
const termsInput = requestTerms.querySelector('input');
const cleanFields = request.querySelectorAll('.request-item__clean');
const requestSubmit = request.querySelector('.submit');

const regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regName = /^[a-zA-Zа-яА-Я-\ ]+$/;

function clearField() {
  this.parentNode.querySelector('input').value = '';
  this.parentNode.classList.remove('request-item--show-clean');
}

const validateForm = e => {
  e.preventDefault();
  if (mailInput.value.match(regMail)) {
    if (nameInput.value.match(regName)) {
      requestForm.submit();
    } else {
      requestName.classList.add('request-item--error');
    }
  } else {
    requestMail.classList.add('request-item--error');
    if (nameInput.value.match(regName)) {
    } else {
      requestName.classList.add('request-item--error');
    }
  }
};

const checkDisable = () => {
  if (
    mailInput.value !== '' &&
    nameInput.value !== '' &&
    countrySelect.value !== '' &&
    termsInput.checked
  ) {
    requestSubmit.disabled = false;
  } else {
    requestSubmit.disabled = true;
  }
};

Array.prototype.forEach.call(requestItems, requestItem => {
  const childrenTextInput = requestItem.querySelector('input');

  if (childrenTextInput) {
    requestItem.addEventListener('input', () => {
      requestItem.classList.remove('request-item--error');

      if (requestItem.querySelector('input').value !== '') {
        requestItem.classList.add('request-item--show-clean');
      } else {
        requestItem.classList.remove('request-item--show-clean');
      }
    });
  }
});

requestSubmit.addEventListener('click', validateForm);
request.addEventListener('change', checkDisable);

Array.prototype.forEach.call(cleanFields, cleanField =>
  cleanField.addEventListener('click', clearField)
);

const orderedItems = document.querySelectorAll('.ordered-item');
const modalCancel = document.querySelector('.modal__cancel');
const modalClose = document.querySelector('.modal__close');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');

const closeModal = () => {
  body.classList.remove('disable-scroll');
  overlay.classList.remove('shown');
};

const openModal = () => {
  body.classList.add('disable-scroll');
  overlay.classList.add('shown');
};

modalClose.addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);
Array.prototype.forEach.call(orderedItems, orderedItem =>
  orderedItem.addEventListener('click', openModal)
);
