//pegando o display e zerando o currentInput e expressiom
const display = document.getElementById('display');
let currentInput = ''; //apenas números atuais
let expression = ''; //toda a expressão

//função para adicionar coisas no display
function updateDisplay(value) {
    display.value = value;
}

function appendNumber(number) {
    currentInput += number; //incrementa o numero digitado no currentInput
    expression += number; //incrementa o numero digitado na expressão
    updateDisplay(expression);
}

function appendPoint(point) {
    if (currentInput.includes('.') || currentInput === '') return; //se já tiver um ponto ou se o currentInput estiver vazio, não faça nada
    currentInput += point;
    expression += point;
    updateDisplay(expression);
}

function appendOperator(operator) {
    if (['+', '-', '*', '/'].includes(expression.slice(-1))) {
        expression = expression.slice(0, -1) + operator; //substitui o ultimo operador pelo novo

    } else if (currentInput !== '') { //verifica se o currentInput não está vazio
        expression += operator;
        currentInput = ''; //zera o currentInput após adicionar um operador
    }

    updateDisplay(expression)
}

function calculate() {
    if (['+', '-', '*', '/'].includes(expression.slice(-1))) {
        expression = expression.slice(0, -1); //tira o operador caso esteja como ultimo elemento
    }

    try { //Function vai ler o expression em string e retornar o resultado, o toString() vai fazer este resultado voltar a ser string
        let result = Function(`return ${expression}`) ();
        expression = result.toString(); //toString() vai fazer este resultado voltar a ser string
        currentInput = result.toString();
        updateDisplay(expression);

    } catch(error) {
        updateDisplay('ERROR');
        expression = '';
        currentInput = '';
    }
}

function clearDisplay() {
    expression = '';
    currentInput = '';
    updateDisplay('');
}

function deleteLast() {
    if (expression !== '') {
        expression = expression.slice(0, -1);
        if (currentInput !== '') {
            currentInput = currentInput.slice(0, -1);
        }
    }
    updateDisplay(expression);
}