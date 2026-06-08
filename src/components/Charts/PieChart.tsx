import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  total: number;
  completed: number;
  progress: number;
  pending: number;
}
const COLORS = [
    "var(--accent-color)",
    "color-mix(in srgb, var(--accent-color) 80%, white)",
    "color-mix(in srgb, var(--accent-color) 60%, white)",
    "color-mix(in srgb, var(--accent-color) 40%, white)",
]

export function TasksPieChart({
  total,
  completed,
  progress,
  pending,
}: Props) {
  const data = [
    { name: "Total", value: total },
    { name: "Completed", value: completed },
    { name: "In Progress", value: progress },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="dashboardPanel chartPanel">
      <div className="panelHeader">
        <h2>Tasks Distribution</h2>
      </div>

      <div className="pieChartContainer">
        <ResponsiveContainer width="100%" aspect={2.5}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius="100%"
              label={false}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                  className={`pieSlice pieSlice${index}`}
                />
              ))}
            </Pie>

            <Tooltip wrapperClassName="customChartTooltip" />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}