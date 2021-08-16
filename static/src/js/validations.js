/* 
Ce fichier empêche la validation des formulaires si une condition n'est pas respectée
*/

//Cette fonction vérifie qu'un input soit bien rempli
let required = (propertyType) => {
    return v => v && v.length > 0 || `You must put input a ${propertyType}`
};
//Cette fonction vérifie qu'un input fasse au minimum X caratères
let minLength = (propertyType, minLength) => {
    return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength}`
};
//Cette fonction vérifie qu'un input fasse au maximum X caratères
let maxLength = (propertyType, maxLength) => {
    return v => v && v.length <= maxLength || `${propertyType} must be at less than ${maxLength}`
};
//Cette fonction vérifie le format des mails
let emailFormat = () => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/;
    return v => v && regex.test(v) || "Must be a valid email"
}

export default {
    required,
    minLength,
    maxLength,
    emailFormat
}