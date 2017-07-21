'use strict';

var request = document.querySelector('.request');
var requestForm = request.querySelector('form');
var requestItems = request.querySelectorAll('.request-item');
var requestMail = request.querySelector('.mail');
var requestName = request.querySelector('.name');
var requestCountry = request.querySelector('.country');
var requestTerms = request.querySelector('.request-terms');
var countrySelect = requestCountry.querySelector('select');
var mailInput = requestMail.querySelector('input');
var nameInput = requestName.querySelector('input');
var termsInput = requestTerms.querySelector('input');
var cleanFields = request.querySelectorAll('.request-item__clean');
var requestSubmit = request.querySelector('.submit');

var regMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var regName = /^[a-zA-Zа-яА-Я-\ ]+$/;

function clearField() {
  this.parentNode.querySelector('input').value = '';
  this.parentNode.classList.remove('request-item--show-clean');
}

var validateForm = function validateForm(e) {
  e.preventDefault();
  if (mailInput.value.match(regMail)) {
    if (nameInput.value.match(regName)) {
      requestForm.submit();
    } else {
      requestName.classList.add('request-item--error');
    }
  } else {
    requestMail.classList.add('request-item--error');
    if (nameInput.value.match(regName)) {} else {
      requestName.classList.add('request-item--error');
    }
  }
};

var checkDisable = function checkDisable() {
  if (mailInput.value !== '' && nameInput.value !== '' && countrySelect.value !== '' && termsInput.checked) {
    requestSubmit.disabled = false;
  } else {
    requestSubmit.disabled = true;
  }
};

Array.prototype.forEach.call(requestItems, function (requestItem) {
  var childrenTextInput = requestItem.querySelector('input');

  if (childrenTextInput) {
    requestItem.addEventListener('input', function () {
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

Array.prototype.forEach.call(cleanFields, function (cleanField) {
  return cleanField.addEventListener('click', clearField);
});

var orderedItems = document.querySelectorAll('.ordered-item');
var modalCancel = document.querySelector('.modal__cancel');
var modalClose = document.querySelector('.modal__close');
var body = document.querySelector('body');
var overlay = document.querySelector('.overlay');

var closeModal = function closeModal() {
  body.classList.remove('disable-scroll');
  overlay.classList.remove('shown');
};

var openModal = function openModal() {
  body.classList.add('disable-scroll');
  overlay.classList.add('shown');
};

modalClose.addEventListener('click', closeModal);
modalCancel.addEventListener('click', closeModal);
Array.prototype.forEach.call(orderedItems, function (orderedItem) {
  return orderedItem.addEventListener('click', openModal);
});