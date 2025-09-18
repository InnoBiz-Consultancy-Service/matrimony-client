interface UserId {
  email: string;
  phone: string;
  role: string;
  _id: string;
}

export interface BiodataItem {
  _id: string;
  name: string;
  gender: string;
  age: number;
  isApproved: "pending" | "approved" | "rejected";
  userId: UserId;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  data: BiodataItem[];
  message?: string;
}