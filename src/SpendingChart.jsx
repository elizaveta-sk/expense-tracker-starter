import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList, ResponsiveContainer } from 'recharts'

const BAR_COLOR = "#2a78d6";
const ROW_HEIGHT = 40;

function SpendingChart({ transactions }) {
  const totalsByCategory = {};
  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      totalsByCategory[t.category] = (totalsByCategory[t.category] || 0) + t.amount;
    });

  const data = Object.entries(totalsByCategory)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="empty-chart">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={data.length * ROW_HEIGHT + 20}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 60, bottom: 0, left: 0 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="category" width={100} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ fill: "#f0f0f0" }}
              formatter={(value) => [`$${value}`, "Spent"]}
            />
            <Bar dataKey="amount" fill={BAR_COLOR} barSize={20} radius={[0, 4, 4, 0]}>
              <LabelList dataKey="amount" position="right" formatter={(value) => `$${value}`} fill="#333" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart
