'use client';

import { useFinanceStore } from '@/lib/store';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AnimatedCard, AnimatedContainer } from '@/components/animated-card';

const chartData = [
  { month: 'Jan', income: 4000, expense: 2400, profit: 1600 },
  { month: 'Feb', income: 3000, expense: 1398, profit: 1602 },
  { month: 'Mar', income: 2000, expense: 9800, profit: -7800 },
  { month: 'Apr', income: 2780, expense: 3908, profit: -1128 },
  { month: 'May', income: 1890, expense: 4800, profit: -2910 },
  { month: 'Jun', income: 2390, expense: 3800, profit: -1410 },
  { month: 'Jul', income: 3490, expense: 2300, profit: 1190 },
];

const monthlyTrend = [
  { week: 'W1', amount: 2400 },
  { week: 'W2', amount: 2210 },
  { week: 'W3', amount: 2290 },
  { week: 'W4', amount: 2000 },
  { week: 'W5', amount: 2181 },
  { week: 'W6', amount: 2500 },
  { week: 'W7', amount: 2100 },
];

export default function DashboardPage() {
  const { transactions, userRole } = useFinanceStore();

  const totalIncome = transactions
    .filter((t) => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpense;

  const incomeChange = 12.5;
  const expenseChange = -8.2;

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 md:p-6">
        {/* Header */}
        <AnimatedCard variant="slide-left">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">Welcome back! Here&apos;s your financial overview.</p>
          </div>
        </AnimatedCard>

        {/* Summary Cards */}
        <AnimatedContainer staggerDelay={0.1}>
          <div className="grid gap-4 md:grid-cols-3">
            {/* Income Card */}
            <AnimatedCard delay={0}>
              <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Income
                  </CardTitle>
                  <p className="mt-2 text-2xl font-bold">${totalIncome.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="rounded-lg bg-primary/10 p-3">
                  <ArrowUpRight className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {incomeChange}%
                </Badge>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
            </AnimatedCard>

          {/* Expense Card */}
          <AnimatedCard delay={0.1}>
            <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Expenses
                  </CardTitle>
                  <p className="mt-2 text-2xl font-bold">${totalExpense.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="rounded-lg bg-destructive/10 p-3">
                  <ArrowDownLeft className="h-5 w-5 text-destructive" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <TrendingDown className="h-3 w-3" />
                  {expenseChange}%
                </Badge>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
            </AnimatedCard>

          {/* Net Profit Card */}
          <AnimatedCard delay={0.2}>
            <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Net Profit
                  </CardTitle>
                  <p className="mt-2 text-2xl font-bold">${netProfit.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="rounded-lg bg-accent/10 p-3">
                  <Wallet className="h-5 w-5 text-accent" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {netProfit >= 0 ? '+' : ''}{((netProfit / totalIncome) * 100).toFixed(1)}%
                </Badge>
                <span className="text-xs text-muted-foreground">profit margin</span>
              </div>
            </CardContent>
          </Card>
            </AnimatedCard>
          </div>
        </AnimatedContainer>

        {/* Charts */}
        <AnimatedContainer staggerDelay={0.15}>
          <div className="grid gap-6 md:grid-cols-2">
          {/* Income vs Expense Chart */}
          <AnimatedCard delay={0}>
            <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Income vs Expenses</CardTitle>
              <CardDescription>Monthly comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
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
                  <Bar dataKey="income" fill="var(--color-chart-2)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="expense" fill="var(--color-destructive)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          </AnimatedCard>

          {/* Profit Trend Chart */}
          <AnimatedCard delay={0.1}>
            <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Profit Trend</CardTitle>
              <CardDescription>Weekly performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyTrend}>
                  <defs>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: `1px solid var(--color-border)`,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="var(--color-primary)"
                    fillOpacity={1}
                    fill="url(#colorProfit)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          </AnimatedCard>
          </div>
        </AnimatedContainer>

        {/* Recent Transactions */}
        <AnimatedCard delay={0.3} variant="fade">
          <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-lg p-2 ${
                        transaction.type === 'income'
                          ? 'bg-primary/10'
                          : 'bg-destructive/10'
                      }`}
                    >
                      {transaction.type === 'income' ? (
                        <ArrowUpRight
                          className={`h-4 w-4 ${
                            transaction.type === 'income'
                              ? 'text-primary'
                              : 'text-destructive'
                          }`}
                        />
                      ) : (
                        <ArrowDownLeft
                          className={`h-4 w-4 ${
                            transaction.type === 'income'
                              ? 'text-primary'
                              : 'text-destructive'
                          }`}
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        transaction.status === 'completed'
                          ? 'default'
                          : transaction.status === 'pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {transaction.status}
                    </Badge>
                    <p
                      className={`font-semibold ${
                        transaction.type === 'income'
                          ? 'text-primary'
                          : 'text-foreground'
                      }`}
                    >
                      {transaction.type === 'income' ? '+' : '-'}$
                      {transaction.amount.toLocaleString('en-US', {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </AnimatedCard>
      </div>
    </DashboardLayout>
  );
}
