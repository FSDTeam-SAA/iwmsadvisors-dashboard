export interface Subscriber {
  _id: string;
  email: string;
  isSubscribed: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalData: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface SubscriberResponse {
  status: boolean;
  message: string;
  data: {
    subscribers: Subscriber[];
    pagination: Pagination;
  };
}
