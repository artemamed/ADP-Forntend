// Import necessary libraries and components
import React from 'react';
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import 'tailwindcss/tailwind.css';

// Dummy Data for Charts
const lineChartData = [
  { name: 'Jan', sales: 400 },
  { name: 'Feb', sales: 300 },
  { name: 'Mar', sales: 500 },
  { name: 'Apr', sales: 200 },
  { name: 'May', sales: 600 },
];

const pieChartData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

// Colors for the Pie Chart
const pieColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Home = () => {
  return (
    <div className="min-h-screen ">
      <header className="mb-8">
        <h1 className="text-3xl font-bold ">Dashboard</h1>
        <p className="text-gray-400">Welcome to your ADP dashboard.</p>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cards */}
        <div className="p-4 dark:bg-secondary shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold ">Total Sales</h2>
          <p className="mt-2 text-2xl font-bold text-blue-600">$12,345</p>
          <p className="mt-1 text-sm text-gray-400">Compared to last month: +12%</p>
        </div>
        <div className="p-4 dark:bg-secondary shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold ">Active Users</h2>
          <p className="mt-2 text-2xl font-bold text-green-600">1,234</p>
          <p className="mt-1 text-sm text-gray-400">Compared to last week: +8%</p>
        </div>
        <div className="p-4 dark:bg-secondary shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold ">Pending Tasks</h2>
          <p className="mt-2 text-2xl font-bold text-red-600">45</p>
          <p className="mt-1 text-sm text-gray-400">Due today: 5</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="p-4 dark:bg-secondary shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold  mb-4">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="p-4 dark:bg-secondary shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold  mb-4">Sales Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              >
                {pieChartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-8 dark:bg-secondary shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold  mb-4">Recent Activities</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="dark:bg-secondary">
              <th className="p-2 border border-gray-200 text-left">Date</th>
              <th className="p-2 border border-gray-200 text-left">Activity</th>
              <th className="p-2 border border-gray-200 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-gray-200">2024-11-15</td>
              <td className="p-2 border border-gray-200">Completed Sales Target</td>
              <td className="p-2 border border-gray-200 text-green-600">Completed</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-200">2024-11-14</td>
              <td className="p-2 border border-gray-200">Updated CRM</td>
              <td className="p-2 border border-gray-200 text-yellow-600">Pending</td>
            </tr>
            <tr>
              <td className="p-2 border border-gray-200">2024-11-13</td>
              <td className="p-2 border border-gray-200">Meeting with Team</td>
              <td className="p-2 border border-gray-200 text-blue-600">In Progress</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
