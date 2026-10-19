import { useState } from 'react'
import { capitalize } from './format'

const types = [
  { value: "expense", label: "Expense" },
  { value: "income", label: "Income" },
];

function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <section className="panel add-transaction">
      <h2>Add a transaction</h2>
      <form className="transaction-form" onSubmit={handleSubmit}>
        <fieldset className="field">
          <legend className="field-label">Type</legend>
          <div className="segmented">
            {types.map(option => (
              <label key={option.value} className="segment">
                <input
                  type="radio"
                  name="type"
                  value={option.value}
                  checked={type === option.value}
                  onChange={(e) => setType(e.target.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="field">
          <span className="field-label">Description</span>
          <input
            type="text"
            placeholder="e.g. Coffee with Sam"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <div className="field-row">
          <label className="field">
            <span className="field-label">Amount</span>
            <span className="amount-input">
              <span className="amount-prefix" aria-hidden="true">$</span>
              <input
                type="number"
                inputMode="decimal"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </span>
          </label>

          <label className="field">
            <span className="field-label">Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{capitalize(cat)}</option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit" className="primary-btn">
          Add {type === "income" ? "income" : "expense"}
        </button>
      </form>
    </section>
  );
}

export default TransactionForm
