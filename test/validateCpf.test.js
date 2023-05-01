import validateCpf from "../src/validateCpf.js";
import expect from "expect";

test.each([
    '123.456.789-09',
    '529.307.530-64',
    '092.629.790-29',
    '483.115.640-00'
])("Should return true for valid CPFs", (cpf) => {
    const result = validateCpf(cpf);
    expect(result).toBe(true);
});

test.each([
    '123.456.789-90',
    '529.307.530-46',
    '092.629.790-92',
    '483.115.640-01'
])("Should return false for invalid CPFs", (cpf) => {
    const result = validateCpf(cpf);
    expect(result).toBe(false);
});

test.each([
    '123.456.789-9',
    '529.307.530',
    '092.abc.790-29',
    '483.115.640-000'
])("Should return false for invalid CPFs", (cpf) => {
    const result = validateCpf(cpf);
    expect(result).toBe(false);
});

test.each([
    '111.111.111-11',
    '222.222.222-22',
    '333.333.333-33',
    '444.444.444-44',
    '555.555.555-55',
    '666.666.666-66',
    '777.777.777-77',
    '888.888.888-88',
    '999.999.999-99',
    '000.000.000-00',
])("Should return false for CPFs with equal digits", (cpf) => {
    const result = validateCpf(cpf);
    expect(result).toBe(false);
});
