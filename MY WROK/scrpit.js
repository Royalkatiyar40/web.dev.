const display = document.getElementById('display');
        const buttons = document.getElementById('buttons');

        buttons.addEventListener('click', function(event) {
            if (event.target.tagName === 'BUTTON') {
                handleButtonClick(event.target.textContent);
            }
        });

        let currentInput = '';
        let previousInput = '';
        let operator = '';

        function handleButtonClick(value) {
            if (value >= '0' && value <= '9') {
                currentInput += value;
            } else if (value === '.') {
                if (!currentInput.includes('.')) {
                    currentInput += value;
                }
            } else if (value === 'C') {
                clearCalculator();
            } else if (value === '=') {
                calculateResult();
            } else {
                handleOperator(value);
            }

            updateDisplay();
        }

        function clearCalculator() {
            currentInput = '';
            previousInput = '';
            operator = '';
        }

        function handleOperator(value) {
            if (currentInput !== '') {
                if (previousInput !== '') {
                    calculateResult();
                }
                previousInput = currentInput;
                currentInput = '';
                operator = value;
            } else if (previousInput !== '') {
                operator = value;
            }
        }

        function calculateResult() {
            if (currentInput !== '' && previousInput !== '') {
                const num1 = parseFloat(previousInput);
                const num2 = parseFloat(currentInput);

                switch (operator) {
                    case '+':
                        currentInput = (num1 + num2).toString();
                        break;
                    case '-':
                        currentInput = (num1 - num2).toString();
                        break;
                    case '*':
                        currentInput = (num1 * num2).toString();
                        break;
                    case '/':
                        if (num2 !== 0) {
                            currentInput = (num1 / num2).toString();
                        } else {
                            currentInput = 'Error';
                        }
                        break;
                    default:
                        break;
                }

                previousInput = '';
                operator = '';
            }
        }

        function updateDisplay() {
            display.textContent = currentInput || '0';
        }
