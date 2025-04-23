import { pgTable, text, serial, integer, boolean, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Food items table
export const foodItems = pgTable("food_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  category: text("category").notNull(), // salad, fruit, protein, carb
  calories: integer("calories").notNull(),
  protein: real("protein").notNull(),
  carbs: real("carbs").notNull(),
  fat: real("fat").notNull(),
  price: real("price").notNull(),
  imageUrl: text("image_url").notNull(),
  weight: integer("weight").notNull(), // in grams
});

export const insertFoodItemSchema = createInsertSchema(foodItems).omit({
  id: true,
});

// Pre-designed meals table
export const meals = pgTable("meals", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  description: text("description").notNull(),
  descriptionAr: text("description_ar").notNull(),
  calories: integer("calories").notNull(),
  protein: real("protein").notNull(),
  carbs: real("carbs").notNull(),
  fat: real("fat").notNull(),
  price: real("price").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertMealSchema = createInsertSchema(meals).omit({
  id: true,
});

// Health products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  description: text("description").notNull(),
  descriptionAr: text("description_ar").notNull(),
  price: real("price").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

// Subscription plans table
export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  price: real("price").notNull(),
  features: jsonb("features").notNull(), // Array of features in both languages
  isPopular: boolean("is_popular").default(false),
});

export const insertPlanSchema = createInsertSchema(plans).omit({
  id: true,
});

// Custom plate orders
export const plateOrders = pgTable("plate_orders", {
  id: serial("id").primaryKey(),
  selections: jsonb("selections").notNull(), // Array of selected food item IDs
  totalCalories: integer("total_calories").notNull(),
  totalPrice: real("total_price").notNull(),
});

export const insertPlateOrderSchema = createInsertSchema(plateOrders).omit({
  id: true,
});

// User types
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Export types
export type InsertFoodItem = z.infer<typeof insertFoodItemSchema>;
export type FoodItem = typeof foodItems.$inferSelect;

export type InsertMeal = z.infer<typeof insertMealSchema>;
export type Meal = typeof meals.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertPlan = z.infer<typeof insertPlanSchema>;
export type Plan = typeof plans.$inferSelect;

export type InsertPlateOrder = z.infer<typeof insertPlateOrderSchema>;
export type PlateOrder = typeof plateOrders.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
