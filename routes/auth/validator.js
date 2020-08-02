const PasswordValidator = require('password-validator');

const MIN_LENGTH = 8;
const MAX_LENGTH = 100;
const schema = new PasswordValidator()
    .is().min(MIN_LENGTH)
    .is().max(MAX_LENGTH)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols()
    .has().not().spaces();

const decodePasswordError = (error) => {
    switch (error) {
        case "min": return `The password must be at least ${MIN_LENGTH} characters long`;
        case "max": return `The password must be at most ${MAX_LENGTH} characters long`;
        case "uppercase": return "The password must have at least one uppercase character";
        case "lowercase": return "The password must have at least one lowercase character";
        case "digits": return "The password must have at least one digit";
        case "symbols": return "The password must have at least one symbol";
        case "spaces": return "The password must have not have whitespaces";
        default: return error;
    }
}

const isValidEmail = email => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const validatePassword = password => {
    return schema.validate(password, { list: true })
        .map(error => decodePasswordError(error));
}

module.exports = {
    isValidEmail,
    validatePassword
}