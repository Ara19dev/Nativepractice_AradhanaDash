function calculator(a, b, op) {
    let res;
    switch (op) {
        case '+':
            res = a + b;
            break;
        case '-':
            res = a - b;
            break;
        case '*':
            res  = a * b;
            break;
        case '/':
            if (b !== 0) {
                res = a / b;
            } else {
                res ="enter valid divisor. Division by zero is undefined."
                        }
            break;
        case '%':
            res= a % b;
            break;
        default:
            res = "please enter a valid operator";
    }

    return res;
}

const n = 55;   
const m = 6;    
const op = '*';   
const out = calculator(n, m, op);
console.log("Result is: " + out);
