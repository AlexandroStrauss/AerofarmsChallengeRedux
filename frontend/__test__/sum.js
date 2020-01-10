function product (a, b) {
    return a * b;
}
    
function sum (a, b) {
    return a + b;
}

function roundedProduct (a, b) {
    return Math.floor(a * b);
}

exports.product = product;
exports.sum = sum;
exports.roundedProduct = roundedProduct;