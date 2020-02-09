const validate = (value, rules) => {
  let isValid = true;

  for (let rule in rules) {

    switch (rule) {
      	case 'minLength': isValid = isValid && minLengthValidator(value, rules[rule]); break;

        case 'isRequired': isValid = isValid && requiredValidator(value); break;

        case 'exactLen': isValid = isValid && exactLengthValidator(value, rules[rule]); break;

      	default: isValid = true;
    }

  }

  return isValid;
}


/**
 * minLength Val
 * @param  value
 * @param  minLength
 * @return
 */
const minLengthValidator = (value, minLength) => {
    return value.length >= minLength;
}

/**
 * exactLength Val
 * @param  value
 * @param  minLength
 * @return
 */
const exactLengthValidator = (value, exactLength) => {
    return value.length === exactLength;
}

/**
 * Check to confirm that feild is required
 *
 * @param  value
 * @return
 */
const requiredValidator = value => {
    return value.trim() !== '';
}
 



export default validate;
