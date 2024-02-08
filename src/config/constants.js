export const messages = {
    userUpdated: 'Your profile has been saved successfully.',
    userPasswordError: 'Current authenticated user is empty or null.',
    fieldRequired: 'This field is required',
    incorrectCurrentPasswordError:'Incorrect current password. Please try again.',
    passwordNotMatchError:'New password and confirm new password do not match.',
    sameCurrentAndOldPasswordError:'Current password and new password cannot be the same.',
    chartacterValidationError:'New password must be at least 5 characters long and contain at least one capital letter, one numeric digit, and one special character.',
    catchError:'Password change failed ',
    successfullPasswordChange:'Password changed successfully.',
    reloginConfirmation:'Please confirm to change password and re-login',
    requiredField:'This is Required.',
    invalidField:'Invalid Field.',
    emailInvalid:'Invalid Email',
    mobileInvalid:'Invalid Mobile Number',
    requiredPositiveNumber:'Required positive numbers',
    nonZero:'Should not be a zero',
    requiredDecimal:'Provide value in {decimal} decimals',
    greatorError:'Cannot be greator value',
    sumNotEqual:'Sum of values are not equal',
    lessAmount:'Should be less than Requested Amount',
    shouldEqual: 'Sum of Initial and Charge Amounts should be equal to Requested Amount',
    spEmailInvalid:'Please enter a valid email address (i.e. yourname@domain.com).',
    spConfirm: 'Your current payment is due to expire on {date}. Would you like to continue?',
    expiryDateNotLessThanDueDate:'Expiration date cannot be before the due date.'
};

export const Countries = [
    // {text: 'Select Country', value: ''},
    {text: 'India', value: 'india'},
    {text: 'United Kingdom', value: 'uk'},
    {text: 'United States', value: 'us'},
    {text: 'Australia', value: 'aus'},
    {text: 'China', value: 'ch'},
    {text: 'Russia', value: 'rus'},
];

export const Currencies = [
    // {text: 'INR', value: 'inr'},
    {text: 'GBP', value: 'gbp'},
    {text: 'EUR', value: 'eur'},
    // {text: 'USD', value: 'usd'}
];

export const States = [
    {text: 'Select State', value: ''},
    {text: 'Uttar Pradesh', value: 'up'},
    {text: 'Madhya Pradesh', value: 'mp'},
];

export const Languages = [
    {text: 'English', value: 'en'},
    {text: 'Spanish', value: 'es'},
]

export const Pagination = {
    pageSize: 10,
    pageNo: 1,
    totalPages : 5,
    numPageShow: 3
}
