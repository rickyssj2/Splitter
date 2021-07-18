//selecting elements
const inputBill = document.querySelector('.input-bill');
const inputCustom = document.querySelector('.input-custom');
const inputNum = document.querySelector('.input-num');
const tipAmount = document.querySelector('.card__tip-amount');
const totalAmount = document.querySelector('.card__total-amount');
const errorTextEl = document.querySelector('.error-text');
const resetButton = document.getElementById('reset');
const btnArray = Array.from(document.querySelectorAll('.btn-dark'));

tipAmount.textContent = totalAmount.textContent = `$0.00`;
let billValue = 0,
    tipValue = 0,
    tip = 0,
    numValue = 0,
    total = 0;

btnArray.forEach(btn => {
    btn.addEventListener('click', () => {
        console.log(Number.parseInt(btn.innerText));
        resetBtnArray();
        btn.classList.add('btn-light');
        tipValue = Number.parseInt(btn.innerText);
        calcTip();
        calcTotal();
        activateResetButton();
    });
});

//RESET FUNCTIONALITY
resetButton.addEventListener('click', checkReset);

const activateResetButton = () => {
    resetButton.classList.add('btn-light');
    resetButton.classList.remove('btn-disabled');
};
function checkReset() {
    if (!resetButton.classList.contains('btn-disabled')) {
        resetFunction();
    }
}

//reset button classes
const resetBtnArray = () => {
    btnArray.forEach(button => {
        button.classList.remove('btn-light');
    });
};

const resetFunction = () => {
    inputBill.value = inputCustom.value = inputNum.value = '';
    tipAmount.textContent = totalAmount.textContent = '$0.00';
    (billValue = 0), (tipValue = 0), (tip = 0), (numValue = 0);
    resetBtnArray();
};

inputBill.oninput = e => {
    billValue = Number(e.target.value);
    calcTip();
    calcTotal();
    activateResetButton();
};
inputCustom.onclick = () => {
    resetBtnArray();
    tip = 0;
    tipAmount.textContent = '$0.00';
};
inputCustom.oninput = e => {
    tipValue = Number(e.target.value);
    calcTip();
    calcTotal();
    activateResetButton();
    resetBtnArray();
};
inputNum.oninput = e => {
    numValue = Number(e.target.value);
    if (!numValue) {
        totalAmount.textContent = `$0.00`;
        errorTextEl.classList.remove('hidden');
        inputNum.classList.add('input-error');
    } else {
        calcTip();
        calcTotal();
        activateResetButton();
        errorTextEl.classList.add('hidden');
        inputNum.classList.remove('input-error');
    }
};

const calcTip = () => {
    tip = (billValue * tipValue) / 100;
    tipAmount.textContent = `$${tip.toFixed(2)}`;
};

const calcTotal = () => {
    if (numValue !== 0 && billValue !== 0) {
        total = (billValue + tip) / numValue;
        totalAmount.textContent = `$${total.toFixed(2)}`;
    }
};
