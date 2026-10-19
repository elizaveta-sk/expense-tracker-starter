import { useState } from 'react'
import { capitalize, formatDate, formatMoney } from './format'

const typeFilters = [
  { value: "all", label: "All" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expenses" },
];

function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const categoryOptions = filterType === "all"
    ? [...new Set([...categories.expense, ...categories.income])]
    : categories[filterType];

  const handleTypeFilter = (newType) => {
    setFilterType(newType);
    if (newType !== "all" && !categories[newType].includes(filterCategory)) {
      setFilterCategory("all");
    }
  };

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  // Newest first; ids break ties between transactions on the same day.
  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => b.date.localeCompare(a.date) || b.id - a.id
  );

  const clearFilters = () => {
    setFilterType("all");
    setFilterCategory("all");
  };

  return (
    <section className="panel transactions">
      <div className="transactions-header">
        <h2>Transactions</h2>
        <div className="filters">
          <div className="segmented" role="group" aria-label="Filter by type">
            {typeFilters.map(option => (
              <button
                key={option.value}
                type="button"
                className="segment-btn"
                aria-pressed={filterType === option.value}
                onClick={() => handleTypeFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
          <select
            aria-label="Filter by category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            {categoryOptions.map(cat => (
              <option key={cat} value={cat}>{capitalize(cat)}</option>
            ))}
          </select>
        </div>
      </div>

      {sortedTransactions.length === 0 ? (
        <div className="empty-list">
          {transactions.length === 0 ? (
            <p>No transactions yet. Add one above to get started.</p>
          ) : (
            <>
              <p>No transactions match these filters.</p>
              <button type="button" className="text-btn" onClick={clearFilters}>Clear filters</button>
            </>
          )}
        </div>
      ) : (
        <ul className="transaction-rows">
          {sortedTransactions.map(t => (
            <li key={t.id} className="transaction-row">
              <span className="row-date">{formatDate(t.date)}</span>
              <span className="row-main">
                <span className="row-description">{t.description}</span>
                <span className="row-category">{capitalize(t.category)}</span>
              </span>
              <span className={t.type === "income" ? "row-amount income-amount" : "row-amount expense-amount"}>
                {t.type === "income" ? "+" : "−"}{formatMoney(t.amount)}
              </span>
              <button
                type="button"
                className="text-btn delete-btn"
                aria-label={`Delete ${t.description}`}
                onClick={() => onDelete(t.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TransactionList
