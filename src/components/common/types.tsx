export interface Admin {
  id:number;
  username: string;
  password?: string;
  phone_number: string;
  role?: "superadmin" | "admin";
}
