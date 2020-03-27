//DU

// input + btn - po stlaceni sa mi hodnota z inputu vlozi do local storage plus sa zobrazi na stranke vedla inputu

// druhy btn - po kliknuti sa mi odpocita hodnota -10 z local storage aj zo stranky

// treti btn - urobi clear celeho local storage

window.onload = () => {
  document.getElementById('your-value').innerText = Number(
    localStorage.getItem('value')
  );

  const inputValue = document.getElementById('input-value');
  const btnAddValue = document.getElementById('btn-add-value');
  const btnMinusValue = document.getElementById('btn-minus-value');
  const btnClear = document.getElementById('btn-clear');

  const value = document.getElementById('your-value');

  btnAddValue.addEventListener('click', () => {
    value.innerText = Number(inputValue.value) + Number(value.innerText);

    const actualValue = localStorage.getItem('value');
    const newValue = Number(actualValue) + Number(inputValue.value);
    localStorage.setItem('value', newValue);

    inputValue.value = null;
  });

  btnMinusValue.addEventListener('click', () => {
    value.innerText = Number(value.innerText) - 10;

    const actualValue = localStorage.getItem('value');
    const newValueAfterMinus = Number(actualValue) - 10;

    localStorage.setItem('value', newValueAfterMinus);
  });

  btnClear.addEventListener('click', () => {
    value.innerText = 0;
    localStorage.clear();
  });
};
