'use client';

import { useFinanceStore } from '@/lib/store';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
];

const categoryTrendData = [
  { category: 'Cloud Services', value: 295.5, percentage: 18 },
  { category: 'Salary', value: 5500, percentage: 35 },
  { category: 'Office', value: 2000, percentage: 15 },
  { category: 'Marketing', value: 450, percentage: 8 },
  { category: 'Other', value: 1000, percentage: 24 },
];

const monthlyComparison = [
  { month: 'January', actual: 3500, budget: 3000, variance: 500 },
  { month: 'February', actual: 2800, budget: 3000, variance: -200 },
  { month: 'March', actual: 4200, budget: 3500, variance: 700 },
  { month: 'April', actual: 3900, budget: 3800, variance: 100 },
  { month: 'May', actual: 4500, budget: 4000, variance: 500 },
  { month: 'June', actual: 5000, budget: 4500, variance: 500 },
];

const cumulativeFlow = [
  { week: 'W1', cumulative: 2400 },
  { week: 'W2', cumulative: 4610 },
  { week: 'W3', cumulative: 6900 },
  { week: 'W4', cumulative: 8900 },
  { week: 'W5', cumulative: 11080 },
  { week: 'W6', cumulative: 13580 },
  { week: 'W7', cumulative: 15680 },
];

const categoryExpenses = [
  { category: 'Cloud Services', amount: 295.5 },
  { category: 'Software', amount: 299 },
  { category: 'Office Supplies', amount: 125 },
  { category: 'Meals', amount: 85.5 },
  { category: 'Marketing', amount: 450 },
  { category: 'Hardware', amount: 599 },
  { category: 'Bank Fees', amount: 1000 },
  { category: 'Rent', amount: 2000 },
];

export default function InsightsPage() {
  const { transactions } = useFinanceStore();

  // Calculate insights
  const completedTransactions = transactions.filter((t) => t.status === 'completed');
  const totalIncome = completedTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = completedTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const averageTransaction = completedTransactions.length > 0
    ? (totalIncome + totalExpense) / completedTransactions.length
    : 0;

  const categoryBreakdown = categoryExpenses.map((item) => ({
    ...item,
    percentage: Math.round((item.amount / totalExpense) * 100),
  }));

  const topExpenseCategory = categoryBreakdown.reduce((max, curr) =>
    curr.amount > max.amount ? curr : max
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 md:p-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Insights</h2>
          <p className="text-muted-foreground">
            Deep dive into your financial analytics and trends.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Transaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                ${averageTransaction.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-muted-foreground mt-1">across {completedTransactions.length} transactions</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Income Ratio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {((totalIncome / (totalIncome + totalExpense)) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">of total flow</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Top Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{topExpenseCategory.percentage}%</p>
              <p className="text-xs text-muted-foreground mt-1">{topExpenseCategory.category}</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Efficiency Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">87%</p>
              <div className="mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-primary" />
                <p className="text-xs text-muted-foreground">vs last month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Expense Breakdown */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ percentage }) => `${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: `1px solid var(--color-border)`,
                    }}
                    formatter={(value: any) => `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Budget vs Actual */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Budget vs Actual</CardTitle>
              <CardDescription>Monthly expense comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: `1px solid var(--color-border)`,
                    }}
                  />
                  <Legend />
                  <Bar dataKey="budget" fill="var(--color-chart-3)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="actual" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cumulative Cash Flow */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Cumulative Cash Flow</CardTitle>
              <CardDescription>Weekly accumulation</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cumulativeFlow}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: `1px solid var(--color-border)`,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulative"
                    stroke="var(--color-primary)"
                    dot={{ fill: 'var(--color-primary)' }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Trend */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Top Expenses</CardTitle>
              <CardDescription>By category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryBreakdown.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded"
                        style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        ${item.amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </span>
                      <Badge variant="secondary">{item.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Breakdown */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Category Comparison</CardTitle>
            <CardDescription>Amount distribution across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={categoryExpenses} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis type="number" stroke="var(--color-muted-foreground)" />
                <YAxis dataKey="category" type="category" width={120} stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: `1px solid var(--color-border)`,
                  }}
                  formatter={(value: any) => `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
                />
                <Bar dataKey="amount" fill="var(--color-primary)" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
