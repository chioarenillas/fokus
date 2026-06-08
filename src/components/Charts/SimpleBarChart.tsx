import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props { 
    total: number;
    completed: number;
    progress: number;
    pending: number;
}

export function SimpleBarChart({ total, completed, progress, pending }: Props) {

    const data = [
        { name: "Total", value: total },
        { name: "Completed", value: completed },
        { name: "In Progress", value: progress },
        { name: "Pending", value: pending }
    ];

    return (
        <div className="dashboardPanel chartPanel">
          
          <div className="panelHeader">
            <h2>Analytics Overview</h2>
          </div>

          <div className="chartContainer">
            <ResponsiveContainer width="100%" aspect={2.5}>
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                
                <Tooltip wrapperClassName="customChartTooltip" />
                
                <Bar dataKey="value" fill="var(--accent-color)" radius={[6, 6, 0, 0]} barSize={45} />        
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
    );
}