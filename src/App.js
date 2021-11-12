import React, { useState, useEffect } from "react";
import axios from 'axios';
import Pizza from "./PizzaForm";
import * as yup from 'yup';
import schema from './validation/formSchema';
import { Route, Link } from 'react-router-dom';

const emptyForm = {
  name: '',
  size: '',
  pepperoni: false,
  ham: false,
  veggies: false,
  mushrooms: false, 
  special: ''
}

const emptyFormErrors = {
  name: '',
  size: '',
  special: ''
}

const initialDisabled = true

const App = () => {

  const [formValues, setFormValues] = useState(emptyForm)
  const [formErrors, setFormErrors] = useState(emptyFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)
  const [confirm, setConfirm] = useState(emptyForm)
  
  const postNewPizza = newPizza => {
    // 🔥 STEP 6- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED FRIEND TO STATE
    //    helper to [POST] `newFriend` to `http://buddies.com/api/friends`
    //    and regardless of success or failure, the form should reset

    axios.post('https://reqres.in/api/orders', newPizza)
      .then(resp => {
        console.log(resp.data)
        setConfirm(resp.data)
      })
      .catch(err => console.error(err))
      .finally(() => {
        setFormValues(emptyForm)
      })
  }

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

  const validate = (name, value) => {
    yup.reach(schema, name).validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
  }

  const inputChange = (name, value) => {
    // 🔥 STEP 10- RUN VALIDATION WITH YUP
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid));
  }, [formValues])

  return (
    <>
      <h1>Lambda Eats</h1>
      <p>Enjoy delicious pizza that will melt in you mouth like carrot cake</p>
      <nav>
        <Link id='order-pizza' to="/">Home</Link>
        <Link id='pizza-form' to="/pizza">Pizza</Link>

      </nav>
      <Route path="/pizza">
      <Pizza 
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
        confirm={confirm}
      />
      <h3>Your order has been Confirmed if information shows up under here after you submit.</h3>
      Name: {confirm.name}<br />
      Size: {confirm.size}<br />
      Pepperoni: {confirm.pepperoni}  <br />
      Ham: {confirm.ham}  <br />
      Veggies: {confirm.veggies}  <br />
      Mushrooms: {confirm.mushrooms.boolean}<br />
      Special information: {confirm.special}
      </Route>

    </>
  );
};
export default App;


