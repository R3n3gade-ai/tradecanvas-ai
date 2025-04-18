import React, { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Search, Calendar, Filter, Download, RefreshCw } from 'lucide-react';

// Mock data for charts
const mockData = [
  { date: 'Jan', SPY: 380, QQQ: 290, AAPL: 130, MSFT: 220 },
  { date: 'Feb', SPY: 390, QQQ: 300, AAPL: 140, MSFT: 230 },
  { date: 'Mar', SPY: 385, QQQ: 295, AAPL: 135, MSFT: 225 },
  { date: 'Apr', SPY: 400, QQQ: 310, AAPL: 145, MSFT: 235 },
  { date: 'May', SPY: 410, QQQ: 320, AAPL: 150, MSFT: 240 },
  { date: 'Jun', SPY: 405, QQQ: 315, AAPL: 148, MSFT: 238 },
  { date: 'Jul', SPY: 420, QQQ: 330, AAPL: 155, MSFT: 245 },
  { date: 'Aug', SPY: 430, QQQ: 340, AAPL: 160, MSFT: 250 },
  { date: 'Sep', SPY: 425, QQQ: 335, AAPL: 158, MSFT: 248 },
  { date: 'Oct', SPY: 440, QQQ: 350, AAPL: 165, MSFT: 255 },
  { date: 'Nov', SPY: 450, QQQ: 360, AAPL: 170, MSFT: 260 },
  { date: 'Dec', SPY: 460, QQQ: 370, AAPL: 175, MSFT: 265 },
];

const Charts: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('SPY');
  const [timeframe, setTimeframe] = useState('1Y');

  const symbols = ['SPY', 'QQQ', 'AAPL', 'MSFT'];
  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y', 'YTD', 'ALL'];

  return (
    <DashboardLayout title="Charts" showRefresh={true}>
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Charts</h1>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-md text-sm">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="bg-card p-4 rounded-lg shadow-sm border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search symbol..."
                  className="pl-10 pr-4 py-2 rounded-md bg-background border border-white/10 focus:outline-none focus:border-primary transition-colors w-full md:w-64"
                  value={selectedSymbol}
                  onChange={(e) => setSelectedSymbol(e.target.value.toUpperCase())}
                />
              </div>
              <div className="flex space-x-1">
                {symbols.map(symbol => (
                  <button
                    key={symbol}
                    className={`px-3 py-1.5 rounded-md text-sm ${selectedSymbol === symbol ? 'bg-primary text-white' : 'bg-background hover:bg-accent'}`}
                    onClick={() => setSelectedSymbol(symbol)}
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {timeframes.map(tf => (
                  <button
                    key={tf}
                    className={`px-3 py-1.5 rounded-md text-sm ${timeframe === tf ? 'bg-primary text-white' : 'bg-background hover:bg-accent'}`}
                    onClick={() => setTimeframe(tf)}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <button className="flex items-center space-x-1 bg-background hover:bg-accent px-3 py-1.5 rounded-md text-sm">
                <Calendar className="h-4 w-4" />
                <span>Custom</span>
              </button>
              <button className="flex items-center space-x-1 bg-background hover:bg-accent px-3 py-1.5 rounded-md text-sm">
                <Filter className="h-4 w-4" />
                <span>Indicators</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="bg-card p-4 rounded-lg shadow-sm border border-white/10">
          <div className="mb-4">
            <h2 className="text-xl font-bold">{selectedSymbol} Chart</h2>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                ${mockData[mockData.length - 1][selectedSymbol].toFixed(2)}
              </span>
              <span className="text-green-500">+2.45%</span>
            </div>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData}>
                <defs>
                  <linearGradient id="colorSymbol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e1e1e',
                    borderColor: '#333',
                    color: '#fff'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={selectedSymbol}
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorSymbol)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparison Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-4 rounded-lg shadow-sm border border-white/10">
            <h3 className="text-lg font-medium mb-2">Volume</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e1e1e',
                      borderColor: '#333',
                      color: '#fff'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey={selectedSymbol}
                    stroke="#82ca9d"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg shadow-sm border border-white/10">
            <h3 className="text-lg font-medium mb-2">Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e1e1e',
                      borderColor: '#333',
                      color: '#fff'
                    }}
                  />
                  {symbols.map((symbol, index) => (
                    <Line
                      key={symbol}
                      type="monotone"
                      dataKey={symbol}
                      stroke={['#8884d8', '#82ca9d', '#ffc658', '#ff8042'][index]}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Charts;
