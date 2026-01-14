import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter, ComposedChart } from 'recharts';
import { TrendingUp, ShoppingCart, DollarSign, Package, Calendar, AlertCircle, RefreshCw, ArrowUp, ArrowDown, Activity, Users, Target, Zap, Brain, FileText, TrendingDown, Clock } from 'lucide-react';

// ADD YOUR GOOGLE SHEETS URL HERE
const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbxSA1g4kke1jYBSYqtp09PP_yiVw6LUArDoNzBZQheAHmSUQiAh1TDW_Jj2r80DWCZM/exec';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const [refreshInterval, setRefreshInterval] = useState(120000); // 120 seconds
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [showSummary, setShowSummary] = useState(false);

  // Fetch data from Google Sheets
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(SHEET_API_URL);
      const data = await response.json();
      
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
      setLastRefresh(new Date());
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

  // ============ ADVANCED ANALYTICS ============
  
  // KPI Calculations
  const totalRevenue = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalTransactions = new Set(filteredTransactions.map(t => t.id)).size;
  const avgBasketSize = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;
  const totalItems = filteredTransactions.reduce((sum, t) => sum + t.quantity, 0);
  const avgItemsPerTransaction = totalTransactions > 0 ? totalItems / totalTransactions : 0;

  // Growth Rate Calculation (comparing last 7 days with previous 7 days)
  const getLast7Days = () => {
    const today = new Date();
    const last7 = filteredTransactions.filter(t => {
      const tDate = new Date(t.date.split('/').reverse().join('-'));
      const diff = Math.floor((today - tDate) / (1000 * 60 * 60 * 24));
      return diff >= 0 && diff < 7;
    });
    const prev7 = filteredTransactions.filter(t => {
      const tDate = new Date(t.date.split('/').reverse().join('-'));
      const diff = Math.floor((today - tDate) / (1000 * 60 * 60 * 24));
      return diff >= 7 && diff < 14;
    });
    
    const last7Revenue = last7.reduce((sum, t) => sum + t.amount, 0);
    const prev7Revenue = prev7.reduce((sum, t) => sum + t.amount, 0);
    const growthRate = prev7Revenue > 0 ? ((last7Revenue - prev7Revenue) / prev7Revenue) * 100 : 0;
    
    return { last7Revenue, prev7Revenue, growthRate };
  };
  
  const growth = getLast7Days();

  // Product Performance Analysis
  const productQuantities = {};
  const productRevenue = {};
  const productFrequency = {};
  
  filteredTransactions.forEach(t => {
    productQuantities[t.product_name] = (productQuantities[t.product_name] || 0) + t.quantity;
    productRevenue[t.product_name] = (productRevenue[t.product_name] || 0) + t.amount;
    productFrequency[t.product_name] = (productFrequency[t.product_name] || 0) + 1;
  });

  // Top Products by Multiple Metrics
  const topProducts = Object.entries(productQuantities)
    .map(([name, qty]) => ({ 
      name, 
      quantity: qty,
      revenue: productRevenue[name],
      frequency: productFrequency[name],
      avgPrice: productRevenue[name] / qty
    }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 10);

  // Revenue by Product
  const revenueByProduct = Object.entries(productRevenue)
    .map(([name, revenue]) => ({ name, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 8);

  // Product Performance Radar Chart Data
  const topProductsRadar = topProducts.slice(0, 5).map(p => ({
    product: p.name.substring(0, 15),
    quantity: (p.quantity / Math.max(...topProducts.map(x => x.quantity))) * 100,
    revenue: (p.revenue / Math.max(...topProducts.map(x => x.revenue))) * 100,
    frequency: (p.frequency / Math.max(...topProducts.map(x => x.frequency))) * 100
  }));

  // Daily Sales Trend with Moving Average
  const dailySales = {};
  const dailyTransactions = {};
  
  filteredTransactions.forEach(t => {
    dailySales[t.date] = (dailySales[t.date] || 0) + t.amount;
    dailyTransactions[t.date] = (dailyTransactions[t.date] || 0) + 1;
  });
  
  const salesTrend = Object.entries(dailySales)
    .map(([date, amount]) => ({ 
      date, 
      amount,
      transactions: dailyTransactions[date]
    }))
    .sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return dateA - dateB;
    });

  // Calculate 3-day moving average
  salesTrend.forEach((item, idx) => {
    if (idx >= 2) {
      const avg = (salesTrend[idx].amount + salesTrend[idx-1].amount + salesTrend[idx-2].amount) / 3;
      salesTrend[idx].movingAvg = avg;
    }
  });

  // Hourly Analysis
  const hourlySales = Array(24).fill(0);
  const hourlyTransactions = Array(24).fill(0);
  
  filteredTransactions.forEach(t => {
    const hour = parseInt(t.time.split(':')[0]);
    if (!isNaN(hour) && hour >= 0 && hour < 24) {
      hourlySales[hour] += t.amount;
      hourlyTransactions[hour] += 1;
    }
  });
  
  const heatmapData = hourlySales.map((value, hour) => ({
    hour: `${hour}:00`,
    sales: value || 0,
    transactions: hourlyTransactions[hour] || 0,
    avgTicket: hourlyTransactions[hour] > 0 ? value / hourlyTransactions[hour] : 0
  })).filter(d => d.sales > 0 || d.transactions > 0); // Only include hours with data

  // Peak hours identification
  const peakHour = heatmapData.length > 0 
    ? heatmapData.reduce((max, curr) => curr.sales > max.sales ? curr : max, heatmapData[0])
    : null;

  // Day of Week Analysis
  const dayOfWeekSales = {};
  const dayNames = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  
  filteredTransactions.forEach(t => {
    const date = new Date(t.date.split('/').reverse().join('-'));
    const day = dayNames[date.getDay()];
    dayOfWeekSales[day] = (dayOfWeekSales[day] || 0) + t.amount;
  });
  
  const weekdayData = dayNames.map(day => ({
    day,
    sales: dayOfWeekSales[day] || 0
  }));

  // RFM Analysis (Recency, Frequency, Monetary)
  const productRFM = Object.keys(productRevenue).map(product => {
    const productTxns = filteredTransactions.filter(t => t.product_name === product);
    const lastSaleDate = productTxns.length > 0 
      ? Math.max(...productTxns.map(t => new Date(t.date.split('/').reverse().join('-')).getTime()))
      : 0;
    const recency = lastSaleDate > 0 ? Math.floor((Date.now() - lastSaleDate) / (1000 * 60 * 60 * 24)) : 999;
    
    return {
      product,
      recency,
      frequency: productFrequency[product],
      monetary: productRevenue[product]
    };
  }).sort((a, b) => a.recency - b.recency).slice(0, 10);

  // ABC Analysis (Pareto Principle)
  const sortedProducts = Object.entries(productRevenue)
    .map(([name, revenue]) => ({ name, revenue }))
    .sort((a, b) => b.revenue - a.revenue);
  
  let cumulativeRevenue = 0;
  const abcAnalysis = sortedProducts.map(p => {
    cumulativeRevenue += p.revenue;
    const percentage = (cumulativeRevenue / totalRevenue) * 100;
    let category = 'C';
    if (percentage <= 80) category = 'A';
    else if (percentage <= 95) category = 'B';
    return { ...p, category, cumulative: percentage };
  });

  const categoryA = abcAnalysis.filter(p => p.category === 'A');
  const categoryB = abcAnalysis.filter(p => p.category === 'B');
  const categoryC = abcAnalysis.filter(p => p.category === 'C');

  // Price Elasticity Scatter
  const priceQuantityScatter = topProducts.map(p => ({
    name: p.name.substring(0, 15),
    price: p.avgPrice,
    quantity: p.quantity,
    revenue: p.revenue
  }));

  // ============ AI-POWERED RECOMMENDATIONS ============
  const recommendations = [];
  
  // Stock recommendations
  const lowStockThreshold = 5;
  Object.entries(productQuantities).forEach(([product, qty]) => {
    if (qty < lowStockThreshold) {
      recommendations.push({ 
        type: 'critical',
        icon: '⚠️',
        message: `${product} का स्टॉक बहुत कम है (${qty.toFixed(1)} इकाई बिकी) - तुरंत रिस्टॉक करें`
      });
    }
  });

  // High performers
  if (topProducts[0]) {
    recommendations.push({ 
      type: 'success',
      icon: '🌟',
      message: `${topProducts[0].name} सबसे अधिक बिकने वाला प्रोडक्ट है (${topProducts[0].quantity.toFixed(1)} इकाई) - स्टॉक बढ़ाने पर विचार करें`
    });
  }

  // Peak hour optimization
  if (peakHour && peakHour.sales > 0) {
    recommendations.push({
      type: 'info',
      icon: '🕐',
      message: `${peakHour.hour} पर सबसे ज्यादा बिक्री (₹${peakHour.sales.toFixed(0)}) - इस समय स्टाफिंग बढ़ाएं`
    });
  }

  // Growth insights
  if (growth.growthRate > 10) {
    recommendations.push({
      type: 'success',
      icon: '📈',
      message: `बिक्री में ${growth.growthRate.toFixed(1)}% की वृद्धि! यह रुझान जारी रखें`
    });
  } else if (growth.growthRate < -10) {
    recommendations.push({
      type: 'warning',
      icon: '📉',
      message: `बिक्री में ${Math.abs(growth.growthRate).toFixed(1)}% की कमी - मार्केटिंग रणनीति समीक्षा आवश्यक`
    });
  }

  // ABC Analysis recommendations
  recommendations.push({
    type: 'info',
    icon: '🎯',
    message: `${categoryA.length} प्रोडक्ट्स (Category A) 80% राजस्व उत्पन्न कर रहे हैं - इन पर फोकस करें`
  });

  // Average basket size insights
  if (avgBasketSize < totalRevenue / totalTransactions * 0.8) {
    recommendations.push({
      type: 'warning',
      icon: '🛒',
      message: `औसत बिल साइज़ कम है (₹${avgBasketSize.toFixed(0)}) - क्रॉस-सेलिंग और बंडल ऑफर्स आजमाएं`
    });
  }

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E74C3C', '#3498DB'];

  // Executive Summary Generation
  const generateSummary = () => {
    const bestSellingProduct = topProducts[0]?.name || 'N/A';
    const bestRevenueProduct = revenueByProduct[0]?.name || 'N/A';
    const bestDay = weekdayData.reduce((max, curr) => curr.sales > max.sales ? curr : max, weekdayData[0])?.day || 'N/A';
    
    return {
      period: dateFilter.start && dateFilter.end 
        ? `${dateFilter.start} से ${dateFilter.end}` 
        : 'सभी समय',
      totalRevenue: totalRevenue.toFixed(2),
      totalTransactions,
      avgBasketSize: avgBasketSize.toFixed(2),
      growthRate: growth.growthRate.toFixed(1),
      bestSellingProduct,
      bestRevenueProduct,
      bestDay,
      peakHour: peakHour?.hour || 'N/A',
      totalProducts: Object.keys(productRevenue).length,
      categoryACount: categoryA.length,
      categoryARevenue: ((categoryA.reduce((sum, p) => sum + p.revenue, 0) / totalRevenue) * 100).toFixed(1)
    };
  };

  const summary = generateSummary();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4 text-blue-600" size={64} />
          <p className="text-2xl font-semibold text-gray-700">डेटा लोड हो रहा है...</p>
          <p className="text-sm text-gray-500 mt-2">कृपया प्रतीक्षा करें</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">📊 एडवांस्ड एनालिटिक्स डैशबोर्ड</h1>
              <p className="text-blue-100">AI-संचालित व्यावसायिक अंतर्दृष्टि</p>
              <p className="text-sm text-blue-200 mt-1">अंतिम अपडेट: {lastRefresh.toLocaleTimeString('hi-IN')}</p>
            </div>
            <button
              onClick={() => setShowSummary(!showSummary)}
              className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-semibold flex items-center gap-2 shadow-lg"
            >
              <FileText size={20} />
              {showSummary ? 'सारांश छुपाएं' : 'कार्यकारी सारांश'}
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-3 items-center flex-wrap mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex gap-2 items-center flex-wrap">
              <Calendar size={20} />
              <input
                type="date"
                value={dateFilter.start}
                onChange={e => setDateFilter(prev => ({ ...prev, start: e.target.value }))}
                className="p-2 border rounded-lg text-gray-800"
              />
              <span className="text-sm">से</span>
              <input
                type="date"
                value={dateFilter.end}
                onChange={e => setDateFilter(prev => ({ ...prev, end: e.target.value }))}
                className="p-2 border rounded-lg text-gray-800"
              />
            </div>
            <button
              onClick={() => setDateFilter({ start: '', end: '' })}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
            >
              फ़िल्टर हटाएं
            </button>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-all flex items-center gap-2 shadow-lg"
            >
              <RefreshCw size={16} />
              रीफ्रेश करें
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        {showSummary && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6 border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <FileText className="text-blue-600" />
              कार्यकारी सारांश
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="space-y-3">
                <p><strong>अवधि:</strong> {summary.period}</p>
                <p><strong>कुल राजस्व:</strong> ₹{summary.totalRevenue}</p>
                <p><strong>कुल लेनदेन:</strong> {summary.totalTransactions}</p>
                <p><strong>औसत बिल साइज़:</strong> ₹{summary.avgBasketSize}</p>
                <p><strong>वृद्धि दर (7 दिन):</strong> 
                  <span className={growth.growthRate >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {' '}{summary.growthRate}%
                  </span>
                </p>
              </div>
              <div className="space-y-3">
                <p><strong>सबसे ज्यादा बिकने वाला:</strong> {summary.bestSellingProduct}</p>
                <p><strong>सबसे ज्यादा राजस्व:</strong> {summary.bestRevenueProduct}</p>
                <p><strong>सबसे अच्छा दिन:</strong> {summary.bestDay}</p>
                <p><strong>पीक आवर:</strong> {summary.peakHour}</p>
                <p><strong>कुल प्रोडक्ट्स:</strong> {summary.totalProducts}</p>
                <p><strong>Category A प्रोडक्ट्स:</strong> {summary.categoryACount} ({summary.categoryARevenue}% राजस्व)</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="font-semibold text-blue-800">💡 मुख्य निष्कर्ष:</p>
              <p className="text-gray-700 mt-2">
                आपकी दुकान ने {summary.totalRevenue} रुपये का राजस्व उत्पन्न किया है और {summary.totalTransactions} लेनदेन पूर्ण किए हैं। 
                {growth.growthRate >= 0 
                  ? ` बिक्री में ${summary.growthRate}% की सकारात्मक वृद्धि देखी गई है।` 
                  : ` बिक्री में ${Math.abs(growth.growthRate)}% की कमी आई है, जिस पर ध्यान देने की आवश्यकता है।`
                } {summary.categoryACount} हाई-वैल्यू प्रोडक्ट्स आपके {summary.categoryARevenue}% राजस्व का स्रोत हैं।
              </p>
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">कुल राजस्व</p>
                <p className="text-3xl font-bold">₹{totalRevenue.toFixed(0)}</p>
                <div className="flex items-center gap-1 mt-2">
                  {growth.growthRate >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  <span className="text-sm">{Math.abs(growth.growthRate).toFixed(1)}%</span>
                </div>
              </div>
              <DollarSign size={48} className="opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">कुल लेनदेन</p>
                <p className="text-3xl font-bold">{totalTransactions}</p>
                <p className="text-sm mt-2">औसत: {avgItemsPerTransaction.toFixed(1)} आइटम/बिल</p>
              </div>
              <ShoppingCart size={48} className="opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">औसत बिल साइज़</p>
                <p className="text-3xl font-bold">₹{avgBasketSize.toFixed(0)}</p>
                <p className="text-sm mt-2">{totalItems} कुल आइटम</p>
              </div>
              <TrendingUp size={48} className="opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">प्रोडक्ट रेंज</p>
                <p className="text-3xl font-bold">{Object.keys(productRevenue).length}</p>
                <p className="text-sm mt-2">Category A: {categoryA.length}</p>
              </div>
              <Package size={48} className="opacity-80" />
            </div>
          </div>
        </div>

        {/* Charts Row 1: Product Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Products with Metrics */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:shadow-2xl transition-all">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              🏆 टॉप 10 प्रोडक्ट्स (मात्रा)
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={120} style={{ fontSize: '12px' }} />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }}
                  formatter={(value) => value.toFixed(2)}
                />
                <Bar dataKey="quantity" fill="#8884d8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Distribution Pie */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:shadow-2xl transition-all">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              💰 राजस्व वितरण (टॉप 8)
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={revenueByProduct}
                  dataKey="revenue"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label={(entry) => `₹${(entry.revenue / 1000).toFixed(0)}k`}
                  labelLine={false}
                >
                  {revenueByProduct.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2: Trends and Time Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales Trend with Moving Average */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:shadow-2xl transition-all">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              📈 बिक्री ट्रेंड + मूविंग एवरेज
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={salesTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" angle={-45} textAnchor="end" height={80} style={{ fontSize: '11px' }} />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }} />
                <Legend />
                <Bar dataKey="amount" fill="#82ca9d" name="दैनिक बिक्री (₹)" radius={[8, 8, 0, 0]} />
                <Line type="monotone" dataKey="movingAvg" stroke="#ff7300" strokeWidth={3} name="3-दिन औसत" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Hourly Heatmap */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:shadow-2xl transition-all">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              🕐 घंटे के अनुसार बिक्री हीटमैप
            </h2>
            {heatmapData.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={heatmapData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="hour" angle={-45} textAnchor="end" height={80} style={{ fontSize: '11px' }} />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }} />
                  <Bar dataKey="sales" fill="#FF6384" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[350px] flex items-center justify-center text-gray-500">
                <p>कोई डेटा उपलब्ध नहीं है</p>
              </div>
            )}
          </div>
        </div>

        {/* Charts Row 3: Advanced Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Product Performance Radar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:shadow-2xl transition-all">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <Target className="text-purple-600" />
              टॉप 5 प्रोडक्ट परफॉर्मेंस रडार
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={topProductsRadar}>
                <PolarGrid stroke="#e0e0e0" />
                <PolarAngleAxis dataKey="product" style={{ fontSize: '11px' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="मात्रा" dataKey="quantity" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="राजस्व" dataKey="revenue" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Radar name="फ्रीक्वेंसी" dataKey="frequency" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Day of Week Analysis */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:shadow-2xl transition-all">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <Calendar className="text-blue-600" />
              सप्ताह के दिन बिक्री विश्लेषण
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={weekdayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="day" style={{ fontSize: '12px' }} />
                <YAxis />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }} />
                <Bar dataKey="sales" fill="#36A2EB" radius={[8, 8, 0, 0]}>
                  {weekdayData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 4: Advanced Algorithms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* ABC Analysis */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:shadow-2xl transition-all">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <Brain className="text-indigo-600" />
              ABC विश्लेषण (पेरेटो)
            </h2>
            <div className="mb-4 grid grid-cols-3 gap-3">
              <div className="bg-green-100 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-700">{categoryA.length}</p>
                <p className="text-sm text-gray-600">Category A</p>
                <p className="text-xs text-gray-500">80% राजस्व</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-yellow-700">{categoryB.length}</p>
                <p className="text-sm text-gray-600">Category B</p>
                <p className="text-xs text-gray-500">15% राजस्व</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg text-center">
                <p className="text-2xl font-bold text-red-700">{categoryC.length}</p>
                <p className="text-sm text-gray-600">Category C</p>
                <p className="text-xs text-gray-500">5% राजस्व</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={abcAnalysis.slice(0, 20)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} style={{ fontSize: '10px' }} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cumulative" stroke="#8884d8" strokeWidth={2} name="संचयी %" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Price-Quantity Scatter */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:shadow-2xl transition-all">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <Activity className="text-pink-600" />
              मूल्य-मात्रा विश्लेषण
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis type="number" dataKey="price" name="औसत मूल्य" unit="₹" />
                <YAxis type="number" dataKey="quantity" name="मात्रा" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="प्रोडक्ट्स" data={priceQuantityScatter} fill="#8884d8">
                  {priceQuantityScatter.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RFM Analysis Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 transform hover:shadow-2xl transition-all">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
            <Zap className="text-yellow-600" />
            RFM विश्लेषण (Recency, Frequency, Monetary)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <tr>
                  <th className="p-3 text-left rounded-tl-lg">प्रोडक्ट</th>
                  <th className="p-3 text-left">Recency (दिन)</th>
                  <th className="p-3 text-left">Frequency (बार)</th>
                  <th className="p-3 text-left rounded-tr-lg">Monetary (₹)</th>
                </tr>
              </thead>
              <tbody>
                {productRFM.map((item, idx) => (
                  <tr key={idx} className="border-t hover:bg-blue-50 transition-all">
                    <td className="p-3 font-medium">{item.product}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded ${item.recency <= 7 ? 'bg-green-100 text-green-700' : item.recency <= 30 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {item.recency}
                      </span>
                    </td>
                    <td className="p-3">{item.frequency}</td>
                    <td className="p-3 font-semibold text-green-600">₹{item.monetary.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-orange-500">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
            <Brain className="text-orange-600" />
            AI-संचालित सिफ़ारिशें
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.length > 0 ? (
              recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border-l-4 transform hover:scale-105 transition-all ${
                    rec.type === 'critical' ? 'bg-red-50 border-red-500' :
                    rec.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                    rec.type === 'success' ? 'bg-green-50 border-green-500' :
                    'bg-blue-50 border-blue-500'
                  }`}
                >
                  <p className="font-medium flex items-center gap-2">
                    <span className="text-2xl">{rec.icon}</span>
                    {rec.message}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-2">कोई सिफारिश उपलब्ध नहीं है</p>
            )}
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 transform hover:shadow-2xl transition-all">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
            <Clock className="text-blue-600" />
            हाल की 20 लेनदेन
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <tr>
                  <th className="p-3 text-left rounded-tl-lg">ID</th>
                  <th className="p-3 text-left">तारीख</th>
                  <th className="p-3 text-left">समय</th>
                  <th className="p-3 text-left">प्रोडक्ट</th>
                  <th className="p-3 text-left">मात्रा</th>
                  <th className="p-3 text-left rounded-tr-lg">राशि</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.slice(-20).reverse().map((t, idx) => (
                  <tr key={idx} className="border-t hover:bg-blue-50 transition-all">
                    <td className="p-3 text-gray-500">{t.id}</td>
                    <td className="p-3">{t.date}</td>
                    <td className="p-3">{t.time}</td>
                    <td className="p-3 font-medium">{t.product_name}</td>
                    <td className="p-3">{t.quantity} {t.unit}</td>
                    <td className="p-3 font-bold text-green-600">₹{t.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>डैशबोर्ड हर 120 सेकंड में ऑटो-रिफ्रेश होता है</p>
          <p className="mt-1">Powered by AI Analytics | अंतिम अपडेट: {lastRefresh.toLocaleString('hi-IN')}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;