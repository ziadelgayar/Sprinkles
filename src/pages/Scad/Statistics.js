import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const Statistics = () => {
  const dataSets = {
    current: {
      reportStatus: { accepted: 45, rejected: 12, flagged: 8, pending: 15 },
      reviewMetrics: {
        averageReviewTime: '2.5 days', fastestReview: '1 day', slowestReview: '5 days', totalReviews: 80
      },
      courseDistribution: [
        { name: 'Computer Science', count: 25, percentage: 31.25 },
        { name: 'Business Administration', count: 20, percentage: 25 },
        { name: 'Engineering', count: 15, percentage: 18.75 },
        { name: 'Design', count: 10, percentage: 12.5 },
        { name: 'Other', count: 10, percentage: 12.5 }
      ],
      companyPerformance: [
        { name: 'Tech Corp', rating: 4.8, internships: 30, acceptanceRate: 95 },
        { name: 'Global Solutions', rating: 4.7, internships: 28, acceptanceRate: 92 },
        { name: 'Innovation Labs', rating: 4.6, internships: 25, acceptanceRate: 90 }
      ]
    },
    previous: {
      reportStatus: { accepted: 30, rejected: 20, flagged: 10, pending: 5 },
      reviewMetrics: {
        averageReviewTime: '3.2 days', fastestReview: '1.5 days', slowestReview: '6 days', totalReviews: 65
      },
      courseDistribution: [
        { name: 'Computer Science', count: 20, percentage: 30.7 },
        { name: 'Business Administration', count: 15, percentage: 23.1 },
        { name: 'Engineering', count: 10, percentage: 15.4 },
        { name: 'Design', count: 10, percentage: 15.4 },
        { name: 'Other', count: 10, percentage: 15.4 }
      ],
      companyPerformance: [
        { name: 'Creative Minds', rating: 4.9, internships: 22, acceptanceRate: 97 },
        { name: 'SoftNet', rating: 4.5, internships: 18, acceptanceRate: 89 },
        { name: 'BlueOcean Inc.', rating: 4.6, internships: 20, acceptanceRate: 91 }
      ]
    },
    all: {
      reportStatus: { accepted: 90, rejected: 32, flagged: 18, pending: 20 },
      reviewMetrics: {
        averageReviewTime: '2.9 days', fastestReview: '1 day', slowestReview: '6 days', totalReviews: 140
      },
      courseDistribution: [
        { name: 'Computer Science', count: 45, percentage: 32.1 },
        { name: 'Business Administration', count: 35, percentage: 25 },
        { name: 'Engineering', count: 25, percentage: 17.9 },
        { name: 'Design', count: 20, percentage: 14.3 },
        { name: 'Other', count: 15, percentage: 10.7 }
      ],
      companyPerformance: [
        { name: 'Tech Corp', rating: 4.8, internships: 50, acceptanceRate: 94 },
        { name: 'Global Solutions', rating: 4.7, internships: 48, acceptanceRate: 92 },
        { name: 'BlueOcean Inc.', rating: 4.6, internships: 45, acceptanceRate: 91 }
      ]
    }
  };

  const [timeRange, setTimeRange] = useState('current');
  const stats = dataSets[timeRange];
  const totalReports =
    stats.reportStatus.accepted +
    stats.reportStatus.rejected +
    stats.reportStatus.flagged +
    stats.reportStatus.pending;

  const reportChartData = [
    { name: 'Accepted', value: stats.reportStatus.accepted },
    { name: 'Rejected', value: stats.reportStatus.rejected },
    { name: 'Flagged', value: stats.reportStatus.flagged },
    { name: 'Pending', value: stats.reportStatus.pending }
  ];

  const COLORS = ['#4CAF50', '#F44336', '#FF9800', '#9E9E9E'];

  return (
    <div className="main-content p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Internship Statistics</h1>

      {/* Time Range Selector */}
      <div className="flex gap-4">
        {['current', 'previous', 'all'].map((range) => (
          <button
            key={range}
            className={`px-4 py-2 rounded ${
              timeRange === range ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setTimeRange(range)}
          >
            {range === 'current'
              ? 'Current Cycle'
              : range === 'previous'
              ? 'Previous Cycle'
              : 'All Time'}
          </button>
        ))}
      </div>

      {/* Report Status Pie Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Report Status Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={reportChartData}
              cx="50%"
              cy="50%"
              label
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {reportChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Review Metrics */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Review Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(stats.reviewMetrics).map(([label, value]) => (
            <div key={label} className="text-center">
              <p className="text-gray-500 capitalize">{label.replace(/([A-Z])/g, ' $1')}</p>
              <p className="text-xl font-bold text-gray-800">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Course Distribution Bar Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Course Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.courseDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3182CE" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Company Performance */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Top Performing Companies</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.companyPerformance.map((company, idx) => (
            <div key={idx} className="border p-3 rounded bg-gray-50">
              <h3 className="text-lg font-semibold">{company.name}</h3>
              <p className="text-sm text-gray-600">Rating: {company.rating}/5</p>
              <p className="text-sm text-gray-600">Internships: {company.internships}</p>
              <p className="text-sm text-gray-600">Acceptance Rate: {company.acceptanceRate}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Statistics;
