function validateEqualDigits(cpf) {
    const allDigitsEqualRegExp = /^(\d)\1+$/;
    return Boolean(cpf.match(allDigitsEqualRegExp));
}

function calculateDigits(cpf) {
    let accumulator1 = 0;
    let accumulator2 = 0;
    for (let i = 0; i < cpf.length - 2; i++) {
        const digit = parseInt(cpf[i]);
        if (isNaN(digit)) return false;
        const position = i + 1;
        accumulator1 += (11 - position) * digit;
        accumulator2 += (12 - position) * digit;
    }
    let remainder = accumulator1 % 11;
    let verifyingDigit1 = (remainder < 2) ? 0 : 11 - remainder;
    accumulator2 += 2 * verifyingDigit1;
    remainder = accumulator2 % 11;
    let verifyingDigit2 = (remainder < 2) ? 0 : 11 - remainder;
    return [verifyingDigit1, verifyingDigit2];
}

export default function validateCpf(cpf) {
    if (typeof cpf !== 'string') return false;
    cpf=cpf.replaceAll(/[.\- ]/g,'');
    if (cpf.length !== 11) return false;
    if (validateEqualDigits(cpf)) return false;
    const digits = calculateDigits(cpf);
    if (!digits) return false;
    const [verifyingDigit1, verifyingDigit2] = digits;
    let verifyingDigitsResult = verifyingDigit1.toString() + verifyingDigit2.toString();
    let verifyingDigitsFromInput = cpf.substring(cpf.length-2, cpf.length);
    return verifyingDigitsResult === verifyingDigitsFromInput;
}
