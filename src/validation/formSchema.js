import * as yup from 'yup';


// validate to ensure the requirements are met before ordering
const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Error name is required')
        .min(2, 'name must be at least 2 characters'),
    size: yup
        .string()
        .oneOf(['small','medium','large'], 'Pizza size is required'),
    pepperoni: yup.boolean(),
    ham: yup.boolean(),
    veggies: yup.boolean(),
    mushrooms: yup.boolean(),
    special: yup
        .string()
})
export default formSchema;