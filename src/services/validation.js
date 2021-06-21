const validate = (values) => {
  const errors = {};
  /* validating first name */
  if (!values.firstName) {
    errors.firstName = 'First name is required';
  } else if (values.firstName.length < 1) {
    errors.firstName = 'Invalid First name';
  }

  /* validating last name */
  if (!values.lastName) {
    errors.lastName = 'Last name is required';
  } else if (values.lastName.length < 1) {
    errors.lastName = 'Invalid Last name';
  }

  /* validating email using regex to pass email */
  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default validate;
