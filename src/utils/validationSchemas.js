import * as Yup from 'yup';




export const validationSchemaData = Yup.object({
    firstName: Yup.string()
        .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, 'First Name can be two words at max and one space in between')
        .min(3).max(24)
        .required('Required'),
    lastName: Yup.string()
        .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, 'Last Name can be two words at max and one space in between')
        .min(3).max(24)
        .required('Required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    contact: Yup.string()
        .matches(/^\+?\d{8,}$/, 'Contact not valid')
        .required('Required'),
    about: Yup.string()
        .required('Required'),
});
