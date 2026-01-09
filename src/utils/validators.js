import * as Yup from 'yup';

// Login validation schema
export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

// Register validation schema
export const registerSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

// Site validation schema
export const siteSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Site name must be at least 2 characters')
        .required('Site name is required'),
    location: Yup.string()
        .required('Location is required'),
    clientName: Yup.string()
        .required('Client name is required'),
    startDate: Yup.date()
        .required('Start date is required'),
});

// Expense validation schema
export const expenseSchema = Yup.object().shape({
    expenseType: Yup.string()
        .required('Expense type is required'),
    amount: Yup.number()
        .positive('Amount must be positive')
        .required('Amount is required'),
    date: Yup.date()
        .required('Date is required'),
    remark: Yup.string(),
});

// Material validation schema
export const materialSchema = Yup.object().shape({
    materialName: Yup.string()
        .required('Material name is required'),
    quantity: Yup.number()
        .positive('Quantity must be positive')
        .required('Quantity is required'),
    rate: Yup.number()
        .positive('Rate must be positive')
        .required('Rate is required'),
    supplier: Yup.string()
        .required('Supplier is required'),
    billNumber: Yup.string(),
});

// Labour work validation schema
export const labourWorkSchema = Yup.object().shape({
    labourName: Yup.string()
        .required('Labour/Group name is required'),
    workDescription: Yup.string()
        .required('Work description is required'),
    unit: Yup.string()
        .required('Unit is required'),
    quantity: Yup.number()
        .positive('Quantity must be positive')
        .required('Quantity is required'),
    rate: Yup.number()
        .positive('Rate must be positive')
        .required('Rate is required'),
});

// Measurement validation schema
export const measurementSchema = Yup.object().shape({
    itemName: Yup.string()
        .required('Item name is required'),
    length: Yup.number()
        .positive('Length must be positive')
        .required('Length is required'),
    width: Yup.number()
        .positive('Width must be positive'),
    height: Yup.number()
        .positive('Height must be positive'),
    unit: Yup.string()
        .required('Unit is required'),
});

// Payment validation schema
export const paymentSchema = Yup.object().shape({
    amount: Yup.number()
        .positive('Amount must be positive')
        .required('Amount is required'),
    paymentMode: Yup.string()
        .required('Payment mode is required'),
    date: Yup.date()
        .required('Date is required'),
    remark: Yup.string(),
});

// Machine validation schema
export const machineSchema = Yup.object().shape({
    machineName: Yup.string()
        .required('Machine name is required'),
    rentPerDay: Yup.number()
        .positive('Rent must be positive')
        .required('Rent is required'),
    rateType: Yup.string()
        .oneOf(['day', 'hour'], 'Invalid rate type')
        .required('Rate type is required'),
});

// Invoice entry validation schema
export const invoiceEntrySchema = Yup.object().shape({
    invoiceNumber: Yup.string()
        .required('Invoice number is required'),
    amount: Yup.number()
        .positive('Amount must be positive')
        .required('Amount is required'),
    date: Yup.date()
        .required('Date is required'),
    description: Yup.string(),
});
