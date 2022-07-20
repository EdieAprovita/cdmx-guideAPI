export interface IUser {
  _id?: string;
  username: string;
  password: string;
  role: string;
  email: string;
  photo: string;
  isAdmin: boolean;
  isProfessional: boolean;
}

export interface Business {
  _id?: string;
  name: string;
  author: string;
  address: string;
  image: string;
  contact: [
    {
      phone: string;
      email: string;
      facebook: string;
      instagram: string;
    }
  ];
  budget: number;
  typeBusiness: string;
  reviews: [Array: unknown];
  rating: number;
  numReviews: number;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface Doctor {
  _id: string;
  name: string;
  author: string;
  address: string;
  image: string;
  specialty: string;
  contact: [
    {
      phone: number;
      email: string;
      facebook?: string;
      instagram?: string;
    }
  ];
  reviews: [Array: unknown];
  rating: number;
  numReviews: number;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface Market {
  _id: string;
  name: string;
  author: string;
  address: string;
  image: string;
  typeMarket: string;
  reviews: [Array: unknown];
  rating: number;
  numReviews: number;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}
