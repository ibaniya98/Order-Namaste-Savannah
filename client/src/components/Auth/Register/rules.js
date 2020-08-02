export const emailValidationRules = [
    {
        type: 'email',
        message: 'Please enter a valid email',
    },
    {
        required: true,
        message: 'Please input your email',
    }
];

export const passwordValidationRules = [
    {
        required: true,
        message: 'Please input your password',
    },
    {
        max: 100,
        message: 'The password can be at most 100 characters long'
    },
    {
        min: 8,
        message: 'The password must be at least 8 characters long'
    },
    {
        pattern: /\d/,
        message: 'The password should have at least one digit'
    },
    {
        pattern: /[a-z]/,
        message: 'The password should have at least one lowercase alphabet'
    },
    {
        pattern: /[A-Z]/,
        message: 'The password should have at least one uppercase alphabet'
    },
    {
        pattern: /[`~\!@#\$%\^\&\*\(\)\-_\=\+\[\{\}\]\\\|;:'",<.>\/\?]/,
        message: 'The password should have at least one special character'
    }
]
