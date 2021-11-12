import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Error name is required')
        .min(2, 'Name must be 2 characters long'),
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