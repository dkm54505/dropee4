// Firebase Firestore compatible schema
import { z } from "zod";

// Firestore User Schema
export const userSchema = z.object({
  uid: z.string(), // Firebase UID (document ID)
  email: z.string().email(),
  name: z.string(),
  phone: z.string().optional(),
  role: z.enum(["user", "seller", "admin"]).default("user"),
  isVerified: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
});

// Firestore Seller Schema
export const sellerSchema = z.object({
  userId: z.string(), // Firebase UID
  shopName: z.string(),
  shopUrl: z.string(),
  banner: z.string().optional(),
  description: z.string().optional(),
  isApproved: z.boolean().default(false),
  isPremium: z.boolean().default(false),
  premiumExpiresAt: z.date().optional(),
  walletBalance: z.number().default(0),
  totalEarnings: z.number().default(0),
  createdAt: z.date().default(() => new Date()),
});

// Firestore Product Schema  
export const productSchema = z.object({
  sellerId: z.string(), // Firebase UID
  title: z.string(),
  description: z.string().optional(),
  price: z.number(),
  originalPrice: z.number().optional(),
  images: z.array(z.string()).default([]),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  rating: z.number().default(0),
  reviewCount: z.number().default(0),
  salesCount: z.number().default(0),
  createdAt: z.date().default(() => new Date()),
});

// Firestore Order Schema
export const orderSchema = z.object({
  userId: z.string(), // Firebase UID
  sellerId: z.string(), // Firebase UID  
  productId: z.string(), // Product document ID
  quantity: z.number(),
  price: z.number(),
  commission: z.number(),
  status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]).default("pending"),
  shippingAddress: z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    pincode: z.string(),
    phone: z.string(),
  }).optional(),
  createdAt: z.date().default(() => new Date()),
});

// Firestore Review Schema
export const reviewSchema = z.object({
  userId: z.string(), // Firebase UID
  productId: z.string(), // Product document ID
  orderId: z.string(), // Order document ID
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
});

// Firestore Referral Schema
export const referralSchema = z.object({
  referrerId: z.string(), // Firebase UID
  referredId: z.string(), // Firebase UID
  rewardAmount: z.number().default(0),
  isRewarded: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
});

// Export types for TypeScript
export type User = z.infer<typeof userSchema>;
export type Seller = z.infer<typeof sellerSchema>;
export type Product = z.infer<typeof productSchema>;
export type Order = z.infer<typeof orderSchema>;
export type Review = z.infer<typeof reviewSchema>;
export type Referral = z.infer<typeof referralSchema>;

// Insert schemas (for creating new documents)
export const insertUserSchema = userSchema.omit({ createdAt: true });
export const insertSellerSchema = sellerSchema.omit({ 
  createdAt: true, 
  isApproved: true, 
  walletBalance: true, 
  totalEarnings: true 
});
export const insertProductSchema = productSchema.omit({ 
  createdAt: true, 
  rating: true, 
  reviewCount: true, 
  salesCount: true 
});
export const insertOrderSchema = orderSchema.omit({ createdAt: true, status: true });
export const insertReviewSchema = reviewSchema.omit({ createdAt: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertSeller = z.infer<typeof insertSellerSchema>;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type InsertReview = z.infer<typeof insertReviewSchema>;