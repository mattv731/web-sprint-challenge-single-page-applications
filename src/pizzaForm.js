import React from 'react';

const PizzaForm = (props) => {
    const {
        values,
        submit,
        change,
        disabled,
        errors,
        confirm
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }
    
    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const realValue = type === 'checkbox' ? checked : value
        change(name, realValue)
    }


    return (
        <div>
        <form id='pizza-form' onSubmit={onSubmit}>
            <div className='form'>
                <div className='errors'>
                    <div>{errors.name}</div>
                    <div>{errors.size}</div>
                </div>
            
                <label>Name: 
                    <input
                        id='name-input'
                        value={values.name}
                        onChange={onChange}
                        name='name'
                        type='text'
                    />
                </label>
                <label>Size: 
                    <select
                        id='size=dropdown'
                        value={values.size}
                        onChange={onChange}
                        name='size'
                    >
                        <option value=''>Select a Size</option>
                        <option value='small'>Small</option>
                        <option value='medium'>Medium</option>
                        <option value='large'>Large</option>
                    </select>
                </label>
                <h4>Toppings</h4>
                <label>Pepperoni
                    <input
                        id='pepperoni'
                        value={values.pepperoni}
                        onChange={onChange}
                        name='pepperoni'
                        type='checkbox'
                    />
                </label>
                <label>Ham
                    <input
                        id='ham'
                        value={values.ham}
                        onChange={onChange}
                        name='ham'
                        type='checkbox'
                    />
                </label>
                <label>Veggies
                    <input
                        id='veggies'
                        value={values.veggies}
                        onChange={onChange}
                        name='veggies'
                        type='checkbox'
                    />
                </label>
                <label>Mushrooms
                    <input
                        id='mushrooms'
                        value={values.mushrooms}
                        onChange={onChange}
                        name='mushrooms'
                        type='checkbox'
                    />
                </label>
                <label>Special Instructions: 
                    <input
                        id='special-text'
                        value={values.special}
                        onChange={onChange}
                        name='special'
                        type='text'
                    />
                </label>
                <button id='order-button' disabled={disabled}>Add to Order</button>
            </div>
        </form>
        </div>
    )
}
export default PizzaForm;