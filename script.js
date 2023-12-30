// add, subtract, multiply divide
// decimal number
// negative number
// zero, /0 

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    if(num2 === 0){
        alert("Zero division error");
    }else{
        return num1 / num2;
    }
}

function operate(num1, num2, operator){
    let res; 
    if(operator === "+"){
        res = add(num1, num2);
    }else if(operator === "-"){
        res = subtract(num1, num2);
    }else if(operator === "*"){
        res = multiply(num1, num2);
    }else if(operator === "/"){
        res = divide(num1, num2)
    }
    return res? res:'error'
}