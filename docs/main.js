window.onload = () => {
  // uloha znie vyuzi localStorage nato aby si nacitala budget value a ak tam je cislo vlozit ho po nacitani stranky namiesto 0
  // console.log(localStorage.getItem('budget'));
  // console.log(document.getElementById('your-budget').innerText);
  document.getElementById('your-budget').innerText = Number(
    localStorage.getItem('budget')
  );
  document.getElementById('your-balance').innerText = Number(
    localStorage.getItem('balance')
  );
  const budgetInput = document.getElementById('input-budget');

  // hack
  // Array.from(document.querySelectorAll('input')).forEach(element =>
  //   element.addEventListener('click', e => {
  //     e.target.classList.remove('is-invalid');
  //   })
  // );

  document.getElementById('btn-calculate').addEventListener('click', () => {
    if (budgetInput.value.length === 0) {
      budgetInput.classList.add('is-invalid');
      setTimeout(function() {
        budgetInput.classList.remove('is-invalid');
      }, 3000);
    } else {
      const budget = document.getElementById('your-budget');
      const balance = document.getElementById('your-balance');
      const colBalance = document.getElementById('col-balance');

      budget.innerText = Number(budgetInput.value) + Number(budget.innerText);

      const balanceResult =
        Number(budgetInput.value) + Number(balance.innerText);

      balance.innerText = balanceResult;

      const actualBudget = localStorage.getItem('budget');
      const resultNewBudget = Number(actualBudget) + Number(budgetInput.value);
      localStorage.setItem('budget', resultNewBudget);
      const actualBalance = localStorage.getItem('balance');
      const resultNewBalance =
        Number(actualBalance) + Number(budgetInput.value);
      localStorage.setItem('balance', resultNewBalance);

      if (balanceResult > 0) {
        colBalance.style.color = 'green';
      } else {
        colBalance.style.color = 'red';
      }

      budgetInput.value = null;
    }
  });

  document.getElementById('btn-add-expense').addEventListener('click', () => {
    const expenseInputText = document.getElementById('input-expense-text');
    const expenceInputNumber = document.getElementById('input-expense-number');

    if (expenseInputText.value.length === 0) {
      expenseInputText.classList.add('is-invalid');
      setTimeout(function() {
        expenseInputText.classList.remove('is-invalid');
      }, 3000);
    }
    if (expenceInputNumber.value.length === 0) {
      expenceInputNumber.classList.add('is-invalid');
      setTimeout(function() {
        expenceInputNumber.classList.remove('is-invalid');
      }, 3000);
    }

    if (
      expenseInputText.value.length !== 0 &&
      expenceInputNumber.value.length !== 0
    ) {
      const expense = document.getElementById('your-expenses');
      const balance = document.getElementById('your-balance');

      expense.innerText =
        Number(expenceInputNumber.value) + Number(expense.innerText);

      balance.innerText =
        Number(balance.innerText) - Number(expenceInputNumber.value);

      localStorage.setItem('balance', balance.innerText);
      localStorage.setItem('expense', expense.innerText);

      const expenceList = document.getElementById('expense-list');

      const index = document.querySelectorAll('#expense-list tr').length + 1;

      const createHtml = `
      <tr>
        <th scope="row" style="color: purple;">${index}</th>
        <td style="color: purple;">${expenseInputText.value}</td>
        <td style="color: purple;">${expenceInputNumber.value}</td>
        <td>
        <i style="color: purple;" class="far fa-edit btn-edit"></i>
        <i style="color: red;" class="far fa-trash-alt btn-delete"></i> 
        </td>
      </tr>
      `;

      expenceList.innerHTML += createHtml;

      expenseInputText.value = null;
      expenceInputNumber.value = null;

      Array.from(document.querySelectorAll('.btn-edit')).forEach(element =>
        element.addEventListener('click', e => {
          const children = e.target.parentElement.parentElement.children;
          document.getElementById('input-expense-text').value =
            children[1].innerText;
          document.getElementById('input-expense-number').value =
            children[2].innerText;

          const expense = document.getElementById('your-expenses');
          const balance = document.getElementById('your-balance');

          const previousValue =
            e.target.parentElement.parentElement.children[2].innerText;

          expense.innerText = Number(expense.innerText) - Number(previousValue);
          balance.innerText = Number(balance.innerText) + Number(previousValue);

          const expenseLocalStorageData = localStorage.getItem('expense');
          const resultExpense =
            Number(expenseLocalStorageData) - Number(previousValue);
          localStorage.setItem('expense', resultExpense);

          const balanceLocalStorageData = localStorage.getItem('balance');
          const resultBalance =
            Number(balanceLocalStorageData) + Number(previousValue);
          localStorage.setItem('balance', resultBalance);

          e.target.parentElement.parentElement.remove();
        })
      );

      Array.from(document.querySelectorAll('.btn-delete')).forEach(element =>
        element.addEventListener('click', e => {
          const expense = document.getElementById('your-expenses');
          const balance = document.getElementById('your-balance');

          const previousValue =
            e.target.parentElement.parentElement.children[2].innerText;

          expense.innerText = Number(expense.innerText) - Number(previousValue);
          balance.innerText = Number(balance.innerText) + Number(previousValue);

          const expenseLocalStorageData = localStorage.getItem('expense');
          const resultExpense =
            Number(expenseLocalStorageData) - Number(previousValue);
          localStorage.setItem('expense', resultExpense);

          const balanceLocalStorageData = localStorage.getItem('balance');
          const resultBalance =
            Number(balanceLocalStorageData) + Number(previousValue);
          localStorage.setItem('balance', resultBalance);

          e.target.parentElement.parentElement.remove();
        })
      );
    }
  });
};

///DU:

//-edit a delete btn zmenit na ikony,
// -vyrobit hover na calculate a add expence btns vo formularoch,
// -zmenit html d-flex na bootstrap postup,
// -logika pre btn delete a btn edit
