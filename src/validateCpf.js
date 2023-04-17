export function validateCpf(cpf) {
    if (typeof cpf !== 'string') return false
    cpf=cpf.replaceAll(/[.\- ]/g,'');
    if (cpf.length !== 11) return false
    let accumulator1 = 0
    let accumulator2 = 0;
    let verifyingDigit1, verifyingDigit2, remainder;
    for (let i = 0; i < cpf.length - 2; i++) {
        const digit = parseInt(cpf[i]);
        if (isNaN(digit)) return false;
        const position = i + 1;
        accumulator1 += (11 - position) * digit;
        accumulator2 += (12 - position) * digit;
    }
    remainder = accumulator1 % 11;
    verifyingDigit1 = (remainder < 2) ? verifyingDigit1 = 0 : 11 - remainder;
    accumulator2 += 2 * verifyingDigit1;
    remainder = accumulator2 % 11;
    verifyingDigit2 = (remainder < 2) ? verifyingDigit2 = 0 : 11 - remainder;
    let verifyingDigitsResult = verifyingDigit1.toString() + verifyingDigit2.toString();
    let verifyingDigitsFromInput = cpf.substring(cpf.length-2, cpf.length);
    return verifyingDigitsResult === verifyingDigitsFromInput;
}
