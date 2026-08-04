/* ==========================================================================
   Stackframe — Contact form validation
   ========================================================================== */

(function () {
  'use strict';

  var form = document.getElementById('contact-form');
  if (!form) return;

  var successBox = document.getElementById('form-success');
  var errorBox = document.getElementById('form-error');

  var fields = {
    name: {
      input: document.getElementById('name'),
      group: document.getElementById('group-name'),
      validate: function (value) {
        return value.trim().length > 0;
      }
    },
    email: {
      input: document.getElementById('email'),
      group: document.getElementById('group-email'),
      validate: function (value) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(value.trim());
      }
    },
    message: {
      input: document.getElementById('message'),
      group: document.getElementById('group-message'),
      validate: function (value) {
        return value.trim().length >= 10;
      }
    }
  };

  function validateField(field) {
    var isValid = field.validate(field.input.value);
    field.group.classList.toggle('has-error', !isValid);
    field.input.setAttribute('aria-invalid', isValid ? 'false' : 'true');
    return isValid;
  }

  Object.keys(fields).forEach(function (key) {
    var field = fields[key];
    field.input.addEventListener('blur', function () {
      validateField(field);
    });
    field.input.addEventListener('input', function () {
      if (field.group.classList.contains('has-error')) {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    successBox.classList.remove('is-visible');
    errorBox.classList.remove('is-visible');

    var allValid = Object.keys(fields).every(function (key) {
      return validateField(fields[key]);
    });

    if (!allValid) {
      errorBox.classList.add('is-visible');
      errorBox.focus && errorBox.focus();
      return;
    }

    /*
      This is a static, front-end-only demo site with no backend configured.
      In production, replace this block with a real submission — e.g. a
      fetch() call to your form-handling endpoint or serverless function.
    */
    successBox.classList.add('is-visible');
    form.reset();
  });
})();
