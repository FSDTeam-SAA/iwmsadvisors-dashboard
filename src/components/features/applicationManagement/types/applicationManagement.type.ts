export interface Application {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  resumeCV: string;
  coverLetter: string;
  portfolioUrl?: string;
  linkedinProfile?: string;
  isAgreed: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApplicationResponse {
  status: boolean;
  message: string;
  data: Application[];
}
