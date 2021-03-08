const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.address.street = !isEmpty(data.address.street) ? data.address.street : "";
  data.address.city = !isEmpty(data.address.city) ? data.address.city : "";
  data.address.state = !isEmpty(data.address.state) ? data.address.state : "";
  data.address.zipCode = !isEmpty(data.address.zipCode) ? data.address.zipCode : "";

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First Name field is required';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password = 'Password must match';
  }

  if (Validator.isEmpty(data.address.street)) {
    errors.address.street = 'Name field is required';
  }

  if (Validator.isEmpty(data.address.city)) {
    errors.address.city = 'Name field is required';
  }

  if (Validator.isEmpty(data.address.state)) {
    errors.address.state = 'Name field is required';
  }

  if (Validator.isEmpty(data.address.zipCode)) {
    errors.address.zipCode = 'Name field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};