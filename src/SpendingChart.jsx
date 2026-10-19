import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList, ResponsiveContainer } from 'recharts'
import { capitalize, formatMoney } from './format'

// Hex values mirror the tokens in index.css: SVG attributes can't read CSS variables.
const INK = "#17324D";
const SLATE = "#5B6B7C";
const MIST = "#E9EEF2";
const ROW_HEIGHT = 40;

function SpendingChart({ transactions }) {
  const totalsByCategory = {};
  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      totalsByCategory[t.category] = (totalsByCategory[t.category] || 0) + t.amount;
    });

  const data = Object.entries(totalsByCategory)
    .map(([category, amount]) => ({ category: capitalize(category), amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <section className="panel spending-chart">
      <h2>Spending by category</h2>
      {data.length === 0 ? (
        <p className="empty-chart">Your expenses will show up here, grouped by category.</p>
      ) : (
        <ResponsiveContainer width="100%" height={data.length * ROW_HEIGHT + 8}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 64, bottom: 0, left: 0 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="category"
              width={104}
              axisLine={false}
              tickLine={false}
              tick={{ fill: SLATE, fontSize: 14 }}
            />
            <Tooltip
              cursor={{ fill: MIST }}
              formatter={(value) => [formatMoney(value), "Spent"]}
              contentStyle={{ borderRadius: 8, border: `1px solid ${MIST}`, color: INK }}
            />
            <Bar dataKey="amount" fill={INK} barSize={18} radius={[0, 4, 4, 0]} isAnimationActive={false}>
              <LabelList dataKey="amount" position="right" formatter={formatMoney} fill={INK} fontSize={14} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}

export default SpendingChart
