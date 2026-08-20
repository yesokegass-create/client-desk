import { ref } from 'vue';

export function useFormValidation() {
  const errors = ref({});

  const clearErrors = () => {
    errors.value = {};
  };

  const clearError = (field) => {
    if (errors.value[field]) {
      delete errors.value[field];
    }
  };

  const handleValidationErrors = (error) => {
    if (error.response && error.response.status === 422 && error.response.data.errors) {
      const serverErrors = error.response.data.errors;
      const formattedErrors = {};
      
      for (const field in serverErrors) {
        formattedErrors[field] = serverErrors[field][0];
      }
      
      errors.value = formattedErrors;
      return true;
    }
    return false;
  };

  const isValidEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isValidPhone = (phone) => {
    return /^[\d\s\+\-]{8,20}$/.test(phone);
  };

  const getInputClass = (field, baseClass = 'form-input') => {
    return {
      [baseClass]: true,
      'border-red-500': !!errors.value[field],
      'focus:border-red-500': !!errors.value[field],
      'focus:ring-red-500': !!errors.value[field],
      'error-input': !!errors.value[field]
    };
  };

  return {
    errors,
    clearErrors,
    clearError,
    handleValidationErrors,
    isValidEmail,
    isValidPhone,
    getInputClass
  };
}
