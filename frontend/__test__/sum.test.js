import { sum, product, roundedProduct } from './sum';

test ('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test ('product should multiply two numbers', () => {
    expect(product(16, 14)).toBe(224);
});

test ('product should maintain decimal precision', () => {
    expect(product(2.5, 3.4)).toBe(8.5);
})

test ('roundedProduct should multiply two numbers', () => {
    expect(roundedProduct(16, 14)).toBe(224);
});

test ('roundedProduct should round down decimal results', () => {
    expect(roundedProduct(2.5, 3.4)).toBe(8);
})

