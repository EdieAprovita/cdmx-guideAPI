import { Types } from "mongoose";

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
  author: Types.ObjectId;
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
  reviews: [Review: unknown];
  rating: number;
  numReviews: number;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface Doctor {
  _id?: string;
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
  reviews: [Review: unknown];
  rating: number;
  numReviews: number;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface Market {
  _id?: string;
  name: string;
  author: string;
  address: string;
  image: string;
  typeMarket: string;
  reviews: [Review: unknown];
  rating: number;
  numReviews: number;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface Post {
  _id?: string;
  user: string;
  text: string;
  name: string;
  avatar: string;
  likes: [{ user: Types.ObjectId }];
  comments: [
    {
      user: Types.ObjectId;
      text: string;
      name: string;
      avatar: string;
      date: Date;
    }
  ];
  date: Date;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface Profession {
  _id?: string;
  professionName: string;
  author: Types.ObjectId;
  specialty: string;
  contact: [
    {
      phone: number;
      email: string;
      facebook?: string;
      instagram?: string;
    }
  ];
  reviews: [Review: unknown];
  rating: number;
  numReviews: number;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface Review {
  _id?: string;
  username: string;
  rating: number;
  comment: string;
  user: Types.ObjectId;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface ProfessionProfile {
  _id?: string;
  user: Types.ObjectId;
  contact: [{ phone: number; email: string }];
  skills: [string];
  experience: [
    {
      title: string;
      company: string;
      location: string;
      from: Date;
      to: Date;
      current: boolean;
      description: string;
    }
  ];
  education: [
    {
      school: string;
      degree: string;
      fieldOfStudy: string;
      from: Date;
      to: Date;
      current: boolean;
      description: string;
    }
  ];
  social: [
    {
      youtube: string;
      facebook: string;
      twitter: string;
      instagram: string;
      linkedin: string;
    }
  ];
  date: Date;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface Recipe {
  _id?: string;
  title: string;
  author: Types.ObjectId;
  description: string;
  instructions: string;
  ingredients: [string];
  typeDish: string;
  image: string;
  cookingTime: number;
  difficulty: string;
  reviews: [Review: unknown];
  rating: number;
  numReviews: number;
  budget: string;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface Restaurant {
  _id?: string;
  name: string;
  author: Types.ObjectId;
  typePlace: string;
  address: string;
  image: string;
  budget: string;
  contact: [
    {
      phone: number;
      facebook: string;
      instagram: string;
    }
  ];
  reviews: [Review: unknown];
  rating: number;
  numReviews: number;
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}
