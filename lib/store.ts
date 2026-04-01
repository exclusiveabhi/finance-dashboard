import { create } from 'zustand';

export type UserRole = 'admin' | 'viewer';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

interface FinanceStore {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  transactions: Transaction[];
  selectedDateRange: { from: Date; to: Date };
  setSelectedDateRange: (from: Date, to: Date) => void;
}

const mockTransactions: Transaction[] = [
  { id: '1', date: '2026-03-28', description: 'Salary Deposit', category: 'Income', amount: 5500, type: 'income', status: 'completed', reference: 'SAL-001' },
  { id: '2', date: '2026-03-27', description: 'AWS Services', category: 'Cloud Services', amount: 245.50, type: 'expense', status: 'completed', reference: 'INV-001' },
  { id: '3', date: '2026-03-26', description: 'Office Supplies', category: 'Operations', amount: 125.00, type: 'expense', status: 'completed', reference: 'PUR-001' },
  { id: '4', date: '2026-03-25', description: 'Client Payment', category: 'Income', amount: 3200, type: 'income', status: 'completed', reference: 'INV-002' },
  { id: '5', date: '2026-03-24', description: 'Software License', category: 'Software', amount: 299.00, type: 'expense', status: 'completed', reference: 'LIC-001' },
  { id: '6', date: '2026-03-23', description: 'Freelance Project', category: 'Income', amount: 1500, type: 'income', status: 'completed', reference: 'PROJ-001' },
  { id: '7', date: '2026-03-22', description: 'Team Lunch', category: 'Meals', amount: 85.50, type: 'expense', status: 'completed', reference: 'MEAL-001' },
  { id: '8', date: '2026-03-21', description: 'Cloud Storage', category: 'Cloud Services', amount: 50.00, type: 'expense', status: 'completed', reference: 'SUB-001' },
  { id: '9', date: '2026-03-20', description: 'Contract Income', category: 'Income', amount: 2500, type: 'income', status: 'pending', reference: 'CON-001' },
  { id: '10', date: '2026-03-19', description: 'Marketing Campaign', category: 'Marketing', amount: 450.00, type: 'expense', status: 'completed', reference: 'MKT-001' },
  { id: '11', date: '2026-03-18', description: 'Bank Transfer', category: 'Banking', amount: 1000, type: 'expense', status: 'completed', reference: 'BNK-001' },
  { id: '12', date: '2026-03-17', description: 'Affiliate Commission', category: 'Income', amount: 750, type: 'income', status: 'completed', reference: 'AFF-001' },
  { id: '13', date: '2026-03-16', description: 'Hardware Purchase', category: 'Equipment', amount: 599.00, type: 'expense', status: 'completed', reference: 'HW-001' },
  { id: '14', date: '2026-03-15', description: 'Consulting Payment', category: 'Income', amount: 2000, type: 'income', status: 'completed', reference: 'CONS-001' },
  { id: '15', date: '2026-03-14', description: 'Office Rent', category: 'Rent', amount: 2000, type: 'expense', status: 'completed', reference: 'RNT-001' },
];

export const useFinanceStore = create<FinanceStore>((set) => {
  // Always initialize with 'admin' on both server and client to prevent hydration mismatch
  const storedRole: UserRole = 'admin';
  const storedDates = typeof window !== 'undefined' ? localStorage.getItem('dateRange') : null;
  const initialDates = storedDates ? JSON.parse(storedDates) : {
    from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
    to: new Date(),
  };

  return {
    userRole: storedRole,
    transactions: mockTransactions,
    selectedDateRange: initialDates,
    setUserRole: (role: UserRole) => {
      set({ userRole: role });
      if (typeof window !== 'undefined') {
        localStorage.setItem('userRole', role);
      }
    },
    setSelectedDateRange: (from: Date, to: Date) => {
      set({ selectedDateRange: { from, to } });
      if (typeof window !== 'undefined') {
        localStorage.setItem('dateRange', JSON.stringify({ from, to }));
      }
    },
  };
});
