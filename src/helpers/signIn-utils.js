function switchInputs(form, isEnable) {
  const inputs = form.querySelectorAll('input');
  inputs.forEach((input) => {
    if (isEnable) {
      input.removeAttribute('disabled');
    } else {
      input.setAttribute('disabled', 'disabled');
    }
  });
}

export default switchInputs;
