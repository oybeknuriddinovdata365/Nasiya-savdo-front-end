export interface Admin {
  id: number;
  username: string;
  password?: string;
  phone_number: string;
  role?: "superadmin" | "admin";
}
type Store = {
  id: number;
  full_name: string;
  email: string;
  login: string;
  phone_number: string;
  image: string;
  role: string;
  wallet: string;
  is_active: boolean;
  is_blocked: boolean;
  pin_code: number;
  created_at: string;
  updated_at: string;

  debtors: {
    id: number;
    full_name: string;
    description: string;
    address?: string;
    created_at: string;
    updated_at: string;

    debts: {
      id: number;
      debt_name: string;
      debt_status: "active" | "closed";
      description: string;
      total_amount: string;
      remaining_amount: string;
      monthly_amount: string;
      total_month: number;
      months_paid: number;
      payment_day: number;
      next_payment_date: string;
      created_at: string;
      updated_at: string;
    }[];
  }[];

  payments: {
    id: number;
    payment_date: string;
    sum: string;
    created_at: string;
    updated_at: string;
    debt: {
      id: number;
      debt_name: string;
      description: string;
      debt_status: "open" | "closed";

      total_amount: string;
      remaining_amount: string;
      monthly_amount: string;

      total_month: number;
      months_paid: number;
      payment_day: number;
      next_payment_date: string;

      created_at: string;
      updated_at: string;
    };
  };
};

export type Stores = Store[];
