import { formatMoney } from './format'

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const spentShare = totalIncome > 0 ? Math.min(totalExpenses / totalIncome, 1) : 1;
  const hasActivity = totalIncome > 0 || totalExpenses > 0;

  let headline;
  if (!hasActivity) {
    headline = <>Nothing tracked yet. Add your income or an expense below.</>;
  } else if (totalIncome === 0) {
    headline = <>You've spent <strong>{formatMoney(totalExpenses)}</strong>, with no income added yet.</>;
  } else if (balance >= 0) {
    headline = <>You've spent <strong>{formatMoney(totalExpenses)}</strong> of the <strong>{formatMoney(totalIncome)}</strong> that came in.</>;
  } else {
    headline = <>You've spent <strong>{formatMoney(totalExpenses)}</strong>, which is <strong>{formatMoney(-balance)}</strong> more than came in.</>;
  }

  return (
    <section className="summary" aria-label="Summary">
      <p className="summary-headline">{headline}</p>

      {hasActivity && (
        <>
          <div
            className="balance-bar"
            role="img"
            aria-label={`${Math.round(spentShare * 100)}% of income spent`}
          >
            <div className="balance-bar-spent" style={{ width: `${spentShare * 100}%` }} />
          </div>
          <div className="balance-legend">
            <span className="legend-item">
              <span className="swatch swatch-spent" aria-hidden="true" />
              Spent <strong>{formatMoney(totalExpenses)}</strong>
            </span>
            <span className="legend-item">
              <span className="swatch swatch-left" aria-hidden="true" />
              Left <strong>{formatMoney(Math.max(balance, 0))}</strong>
            </span>
            {totalIncome > 0 && (
              <span className="legend-share">{Math.round((totalExpenses / totalIncome) * 100)}% of income</span>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default Summary
