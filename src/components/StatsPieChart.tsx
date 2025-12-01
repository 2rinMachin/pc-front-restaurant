'use client';

import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface StatusCounts {
  complete?: number;
  cooking?: number;
  wait_for_dispatcher?: number;
  wait_for_cook?: number;
  wait_for_deliverer?: number;
}

const COLORS = ['#333', '#555', '#777', '#999', '#bbb'];

export const StatsPieChart = () => {
  const { data } = useQuery<StatusCounts>({
    queryKey: ['analytics', 'status_counts'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ANALYTICS_URL}/status-counts`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
          },
        },
      );
      if (!res.ok) throw new Error('Error al cargar las estadísticas');
      return res.json();
    },
  });

  const chartData = data
    ? [
        { name: 'Pedidos completos', value: data.complete ?? 0 },
        { name: 'En cocina', value: data.cooking ?? 0 },
        { name: 'Esperando a transportista', value: data.wait_for_dispatcher ?? 0 },
        { name: 'Esperando a cocinero', value: data.wait_for_cook ?? 0 },
        { name: 'Esperando a delivery', value: data.wait_for_deliverer ?? 0 },
      ]
    : [];

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="flex items-center justify-center">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
            >
              {chartData.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip/>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="divide-y border-t border-b border-neutral-200 text-lg">
        {chartData.map((item, idx) => (
          <li
            key={item.name}
            className="flex justify-between px-4 py-3 items-center"
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-4 w-4"
                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
              />
              <span>{item.name}</span>
            </div>
            <span className="font-semibold">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
