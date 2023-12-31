let calculator = {
    stack : [0],
    operatorList : ['+', '-', '*', '÷'], 
    input: '', 

    add(num1, num2){
        return num1 + num2;
    }, 
    
    subtract(num1, num2){
        return num1 - num2;
    }, 

    multiply(num1, num2){
        return num1 * num2;
    },
    
    divide(num1, num2){
        if(num2 === 0){
            return "Zero division error";
        }else{
            return num1 / num2;
        }
    }, 

    operate(num1, num2, operator){
        let res; 
        if(operator === "+"){
            res = this.add(num1, num2); 
        } else if(operator === "-"){
            res = this.subtract(num1, num2);
        } else if(operator === "*"){
            res = this.multiply(num1, num2);
        } else if(operator === "÷"){
            res = this.divide(num1, num2); 
        }

        if(!Number.isInteger(res)){
            res = parseFloat(res.toFixed(4));
        }
        return res !== undefined ? res : 'error'; 
    },

    containsNumber(str) {
        const numberPattern = /^[-+]?(\d+(\.\d+)?|\.\d+)$/;
        return numberPattern.test(str);
    },
    

    displayResAndInput(resRef, inputRef){
        resRef.textContent = this.stack[0];
        inputRef.textContent = this.input;
    },
    
    operatorClicked(operator){
        if(this.input.length === 0){
            this.input = operator;
        }
        // input = operator 
        else if(this.input.length === 1 && this.operatorList.includes(this.input)){
            this.input = operator;
        } 
        // input = operator + number -> calculate: 0 - 999
        else if(this.operatorList.includes(this.input[0]) && this.input.length > 1){
            prevOperator = this.input[0];
            num1 = this.stack.pop()
            num2String = this.input.match(/[\d\.]+/)[0];
            num2 = parseFloat(num2String);
            res = this.operate(num1, num2, prevOperator);
            this.stack.length = 0;
            this.stack.push(res);
            this.input = operator;
        }
        // input = number -> replace stack[0]
        else if(this.containsNumber(this.input)){
            this.stack[0] = +this.input;
            this.input = operator;
        }
    }, 

    eqSignClicked(){
        if(this.operatorList.includes(this.input[0])&&this.input.length > 1){
            prevOperator = this.input[0];
            num1 = this.stack.pop()
            num2String = this.input.match(/[\d\.]+/)[0];
            num2 = parseFloat(num2String);
            res = this.operate(num1, num2, prevOperator);
            this.stack.length = 0;
            this.stack.push(res);
            this.input = '';
        }
    },

    numberButtonClicked(num){
        this.input += num;
    },

    dotButtonClicked(){
        if(this.input.includes('.')){
            return
        }
        this.input += '.'
    },

    delButtonClicked(){
        this.input = this.input.slice(0, -1);
    },

    clearButtonClicked(){
        this.stack = [0];
        this.input = '';
    }
};


const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll(".operator-button");
const eqButton = document.querySelector('.equal-button');
const clearButton = document.querySelector('.clearButton');
const deleteButton = document.querySelector('.delButton');
const dotButton = document.querySelector(".dot-button")
const resDisplay = document.querySelector('.result');
const inputDisplay = document.querySelector('.input');

Array.from(numberButtons).forEach((numberButton) => {
    numberButton.addEventListener('click', () => {
        num = parseInt(numberButton.textContent);
        calculator.numberButtonClicked(num);
        calculator.displayResAndInput(resDisplay, inputDisplay);
    })
})

Array.from(operatorButtons).forEach((operatorButton) => {
    operatorButton.addEventListener('click', () => {
        operator = operatorButton.textContent;
        calculator.operatorClicked(operator);
        calculator.displayResAndInput(resDisplay, inputDisplay);
    })
})

eqButton.addEventListener('click', () => {
    calculator.eqSignClicked();
    calculator.displayResAndInput(resDisplay, inputDisplay);
});

clearButton.addEventListener('click', () => {
    calculator.clearButtonClicked();
    calculator.displayResAndInput(resDisplay, inputDisplay);
});

deleteButton.addEventListener('click', () => {
    calculator.delButtonClicked();
    calculator.displayResAndInput(resDisplay, inputDisplay);
});

dotButton.addEventListener('click', () => {
    calculator.dotButtonClicked();
    calculator.displayResAndInput(resDisplay, inputDisplay);
})