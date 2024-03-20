import {Component} from 'react'
import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManger extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, optionId, amountInput} = this.state

    const optionType = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )

    const {displayText} = optionType
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state

    const updatedTransactionsList = transactionsList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({transactionsList: updatedTransactionsList})
  }

  getIncomeAmount = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getExpensesAmount = () => {
    const {transactionsList} = this.state

    let expensesAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  getBalanceAmount = () => {
    const {transactionsList} = this.state

    let incomeAmount = 0
    let expensesAmount = 0
    let balanceAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {transactionsList, titleInput, optionId, amountInput} = this.state
    const incomeAmount = this.getIncomeAmount()
    const balanceAmount = this.getBalanceAmount()
    const expensesAmount = this.getExpensesAmount()

    return (
      <div className="app-container">
        <div className="responsive-main-container">
          <div className="main-header-container">
            <h1 className="heading">Hi, Richard</h1>
            <p className="heading-description">
              Welcome back to your
              <span className="money-manager-text"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            incomeAmount={incomeAmount}
            balanceAmount={balanceAmount}
            expensesAmount={expensesAmount}
          />
          <div className="transactions-details-container">
            <form className="transaction-form" onSubmit={this.onAddTransaction}>
              <h1 className="transaction-heading">Add Transaction</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                id="title"
                className="input-element"
                placeholder="TITLE"
                type="text"
                value={titleInput}
                onChange={this.onChangeTitleInput}
              />
              <label htmlFor="AMOUNT" className="label">
                AMOUNT
              </label>
              <input
                id="AMOUNT"
                className="input-element"
                placeholder="AMOUNT"
                type="text"
                value={amountInput}
                onChange={this.onChangeAmountInput}
              />
              <label htmlFor="select" className="label">
                TYPE
              </label>
              <select
                id="select"
                className="input-element"
                value={optionId}
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <div className="history-transaction-container">
              <h1 className="transaction-heading">History</h1>
              <div className="transaction-table-container">
                <ul className="transaction-table-list">
                  <li className="table-list">
                    <p className="table-heading">Title</p>
                    <p className="table-heading">Amount</p>
                    <p className="table-heading">Type</p>
                  </li>
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      transactionDetails={eachTransaction}
                      key={eachTransaction.id}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManger
