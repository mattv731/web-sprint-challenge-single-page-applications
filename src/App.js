import React, { useState, useEffect } from "react";
import axios from 'axios';
import Pizza from "./PizzaForm";
import * as yup from 'yup';
import schema from './validation/formSchema';
import { Route, Link } from 'react-router-dom';


// Initial values to reset after form is submitted
const emptyForm = {
  name: '',
  size: '',
  pepperoni: false,
  ham: false,
  veggies: false,
  mushrooms: false, 
  special: ''
}

// Initial errors to reset after form is submitted

const emptyFormErrors = {
  name: '',
  size: '',
  special: ''
}

// Submit is only allowed when requirements are met
const initialDisabled = true

const App = () => {

  const [formValues, setFormValues] = useState(emptyForm)
  const [formErrors, setFormErrors] = useState(emptyFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)
  const [confirm, setConfirm] = useState(emptyForm)
  
  const postNewPizza = newPizza => {

// posting information to this end point
    axios.post('https://reqres.in/api/orders', newPizza)
      .then(resp => {
        setConfirm(resp.data)
      })
      .catch(err => console.error(err))
      .finally(() => {
        //reset the form to blank
        setFormValues(emptyForm)
      })
  }

  // update the data
  const formSubmit = () => {
    const newPizza = {
      name: formValues.name.trim(),
      size: formValues.size.trim(),
      pepperoni: !!formValues.pepperoni,
      ham: !!formValues.ham,
      veggies: !!formValues.veggies,
      mushrooms: !!formValues.mushrooms,
      special: formValues.special.trim(),
    }
    postNewPizza(newPizza)
  }

  // make sure the information getting passed in is valid
  const validate = (name, value) => {
    yup.reach(schema, name).validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
  }

  // Making new form values
  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  // make the submit button enabled if the requirements are met
  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid));
  }, [formValues])

  return (
    <>
      <h1>Lambda Eats</h1>
      <p>Enjoy delicious pizza that will melt in you mouth like carrot cake</p>
      <nav>
        <Link id='home' to='/'>Home</Link>
        <Link id='order-pizza' to="/pizza">Pizza</Link> 
        {/*the test wasn't 
        working so that's why I have two buttons that do the same thing. I was a little confused with the instruction wording */}
        <Link id='pizza-form' to="/pizza">order-pizza</Link>

      </nav>
      <Route path="/pizza">
      <Pizza 
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      {/** order confirmation */}
      <h3>Your order has been Confirmed if information shows up under here after you submit.</h3>
      Name: {confirm.name}<br />
      Size: {confirm.size}<br />
      Pepperoni: { confirm.pepperoni.toString() }  <br />
      Ham: { confirm.ham.toString() }  <br />
      Veggies: { confirm.veggies.toString() }  <br />
      Mushrooms: { confirm.mushrooms.toString() }<br />
      Special information: {confirm.special}
      </Route>

    </>
  );
};
export default App;


