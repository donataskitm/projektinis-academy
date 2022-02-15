import {useState} from 'react';

const useForm = (initialValues, validate, callback) => {

  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(inputs);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if(noErrors){
      console.log("Klaidų nėra", inputs);
      callback(validationErrors);
      setInputs(initialValues);
    }else{
      console.log("Įvyko klaida", validationErrors);
    }
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    errors
  };
};
export default useForm;