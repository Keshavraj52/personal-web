import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, ShoppingCart, DollarSign, Package, Calendar, AlertCircle, RefreshCw } from 'lucide-react';

// ADD YOUR GOOGLE SHEETS URL HERE
const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbxSA1g4kke1jYBSYqtp09PP_yiVw6LUArDoNzBZQheAHmSUQiAh1TDW_Jj2r80DWCZM/exec';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds

  // Fetch data from Google Sheets
  const fetchData = async () => {
    try {
      setLoading(true);
      // Replace with your Google Sheets API endpoint
      const response = await fetch(SHEET_API_URL);
      const data = await response.json();
      
      // Transform data
      const transformed = data.values?.slice(1).map(row => ({
        id: row[0],
        date: row[1],
        time: row[2],
        product_name: row[3],
        quantity: parseFloat(row[4]),
        unit: row[5],
        amount: parseFloat(row[6])
      })) || [];
      
      setTransactions(transformed);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  // Filter transactions by date
  const filteredTransactions = transactions.filter(t => {
    if (!dateFilter.start && !dateFilter.end) return true;
    const tDate = new Date(t.date.split('/').reverse().join('-'));
    const start = dateFilter.start ? new Date(dateFilter.start) : null;
    const end = dateFilter.end ? new Date(dateFilter.end) : null;
    if (start && tDate < start) return false;
    if (end && tDate > end) return false;
    return true;
  });

  // KPI Calculations
  const totalRevenue = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalTransactions = new Set(filteredTransactions.map(t => t.id)).size;
  const avgBasketSize = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

  // Top Products by Quantity
  const productQuantities = {};
  filteredTransactions.forEach(t => {
    productQuantities[t.product_name] = (productQuantities[t.product_name] || 0) + t.quantity;
  });
  const topProducts = Object.entries(productQuantities)
    .map(([name, qty]) => ({ name, quantity: qty }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 10);

  // Revenue by Product
  const productRevenue = {};
  filteredTransactions.forEach(t => {
    productRevenue[t.product_name] = (productRevenue[t.product_name] || 0) + t.amount;
  });
  const revenueByProduct = Object.entries(productRevenue)
    .map(([name, revenue]) => ({ name, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 8);

  // Daily Sales Trend
  const dailySales = {};
  filteredTransactions.forEach(t => {
    dailySales[t.date] = (dailySales[t.date] || 0) + t.amount;
  });
  const salesTrend = Object.entries(dailySales)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return dateA - dateB;
    });

  // Hourly Heatmap
  const hourlySales = Array(24).fill(0);
  filteredTransactions.forEach(t => {
    const hour = parseInt(t.time.split(':')[0]);
    if (!isNaN(hour)) hourlySales[hour] += t.amount;
  });
  const heatmapData = hourlySales.map((value, hour) => ({
    hour: `${hour}:00`,
    sales: value
  }));

  // Recommendations Logic
  const recommendations = [];
  const lowStockThreshold = 5;
  Object.entries(productQuantities).forEach(([product, qty]) => {
    if (qty < lowStockThreshold) {
      recommendations.push({ type: 'restock', message: `${product} को रिस्टॉक करें (केवल ${qty.toFixed(1)} बिका)` });
    }
  });
  
  const topSeller = topProducts[0];
  if (topSeller) {
    recommendations.push({ type: 'promote', message: `${topSeller.name} सबसे ज्यादा बिकने वाला प्रोडक्ट है - स्टॉक बढ़ाएं` });
  }

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-xl">डेटा लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 दुकान एनालिटिक्स डैशबोर्ड</h1>
          <div className="flex gap-4 items-center flex-wrap">
            <div className="flex gap-2 items-center">
              <Calendar size={20} />
              <input
                type="date"
                value={dateFilter.start}
                onChange={e => setDateFilter(prev => ({ ...prev, start: e.target.value }))}
                className="p-2 border rounded"
              />
              <span>से</span>
              <input
                type="date"
                value={dateFilter.end}
                onChange={e => setDateFilter(prev => ({ ...prev, end: e.target.value }))}
                className="p-2 border rounded"
              />
            </div>
            <button
              onClick={() => setDateFilter({ start: '', end: '' })}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              फ़िल्टर हटाएं
            </button>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
            >
              <RefreshCw size={16} />
              रीफ्रेश करें
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">कुल राजस्व</p>
                <p className="text-2xl font-bold text-green-600">₹{totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="text-green-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">कुल लेनदेन</p>
                <p className="text-2xl font-bold text-blue-600">{totalTransactions}</p>
              </div>
              <ShoppingCart className="text-blue-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">औसत बिल साइज़</p>
                <p className="text-2xl font-bold text-purple-600">₹{avgBasketSize.toFixed(2)}</p>
              </div>
              <TrendingUp className="text-purple-500" size={40} />
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Products Bar Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">🏆 टॉप प्रोडक्ट्स (मात्रा)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantity" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Pie Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">💰 राजस्व वितरण</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueByProduct}
                  dataKey="revenue"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.name}: ₹${entry.revenue.toFixed(0)}`}
                >
                  {revenueByProduct.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales Trend Line Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">📈 बिक्री ट्रेंड</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#82ca9d" strokeWidth={2} name="बिक्री (₹)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Hourly Heatmap */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">🕐 घंटे के अनुसार बिक्री</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={heatmapData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#FF6384" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="text-orange-500" />
            सिफारिशें
          </h2>
          <div className="space-y-3">
            {recommendations.length > 0 ? (
              recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-l-4 ${
                    rec.type === 'restock' ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'
                  }`}
                >
                  <p className="font-medium">{rec.message}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">कोई सिफारिश नहीं</p>
            )}
          </div>
        </div>

        {/* Transaction Table */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">📋 हाल की लेनदेन</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">तारीख</th>
                  <th className="p-2 text-left">समय</th>
                  <th className="p-2 text-left">प्रोडक्ट</th>
                  <th className="p-2 text-left">मात्रा</th>
                  <th className="p-2 text-left">राशि</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.slice(-20).reverse().map((t, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="p-2">{t.date}</td>
                    <td className="p-2">{t.time}</td>
                    <td className="p-2 font-medium">{t.product_name}</td>
                    <td className="p-2">{t.quantity} {t.unit}</td>
                    <td className="p-2 font-semibold text-green-600">₹{t.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;