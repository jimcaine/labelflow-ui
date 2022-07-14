import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid,
         Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    date: '3/15/2022',
    cnt: 25000,
  },
  {
    date: '3/22/2022',
    cnt: 12000,
  },
  {
    date: '3/29/2022',
    cnt: 18000,
  },
  {
    date: '4/4/2022',
    cnt: 74000,
  },
  {
    date: '4/11/2022',
    cnt: 28000,
  },
];

export default function BarChart() {

  return (
    <div style={{paddingTop: 30}}>
      <ResponsiveContainer width="95%" height={250}>
      <ReBarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="cnt" fill="#00adb5" />
      </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};
