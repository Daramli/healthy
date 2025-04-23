import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPlateOrderSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Put application routes here
  // Prefix all routes with /api

  // Get all food items
  app.get("/api/food-items", async (req, res) => {
    try {
      const foodItems = await storage.getFoodItems();
      res.json(foodItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch food items" });
    }
  });

  // Get food items by category
  app.get("/api/food-items/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const foodItems = await storage.getFoodItemsByCategory(category);
      res.json(foodItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch food items by category" });
    }
  });

  // Get a specific food item
  app.get("/api/food-items/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const foodItem = await storage.getFoodItem(id);
      
      if (!foodItem) {
        return res.status(404).json({ message: "Food item not found" });
      }
      
      res.json(foodItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch food item" });
    }
  });

  // Get all meals
  app.get("/api/meals", async (req, res) => {
    try {
      const meals = await storage.getMeals();
      res.json(meals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meals" });
    }
  });

  // Get a specific meal
  app.get("/api/meals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const meal = await storage.getMeal(id);
      
      if (!meal) {
        return res.status(404).json({ message: "Meal not found" });
      }
      
      res.json(meal);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch meal" });
    }
  });

  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get a specific product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Get all plans
  app.get("/api/plans", async (req, res) => {
    try {
      const plans = await storage.getPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch plans" });
    }
  });

  // Get a specific plan
  app.get("/api/plans/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const plan = await storage.getPlan(id);
      
      if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
      }
      
      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch plan" });
    }
  });

  // Create a new plate order
  app.post("/api/plate-orders", async (req, res) => {
    try {
      const validatedData = insertPlateOrderSchema.parse(req.body);
      const newOrder = await storage.createPlateOrder(validatedData);
      res.status(201).json(newOrder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create plate order" });
    }
  });

  // Calculate BMI and get recommendations
  app.post("/api/bmi-calculator", async (req, res) => {
    try {
      const bmiSchema = z.object({
        height: z.number().positive(),
        weight: z.number().positive(),
        age: z.number().int().positive(),
        gender: z.enum(["male", "female"])
      });

      const { height, weight, age, gender } = bmiSchema.parse(req.body);
      
      // Calculate BMI: weight (kg) / (height (m) * height (m))
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      
      // Determine BMI category
      let category = "";
      if (bmi < 18.5) {
        category = "Underweight";
      } else if (bmi >= 18.5 && bmi < 25) {
        category = "Normal weight";
      } else if (bmi >= 25 && bmi < 30) {
        category = "Overweight";
      } else {
        category = "Obesity";
      }
      
      // Generate recommendations based on BMI category
      let recommendations = [];
      
      if (category === "Underweight") {
        recommendations = [
          "Increase calorie intake with nutrient-dense foods",
          "Focus on protein-rich meals",
          "Consider strength training to build muscle mass"
        ];
      } else if (category === "Normal weight") {
        recommendations = [
          "Maintain a balanced diet with plenty of vegetables",
          "Exercise 3-5 times per week for 30+ minutes",
          "Stay hydrated with 2L of water daily"
        ];
      } else if (category === "Overweight") {
        recommendations = [
          "Reduce calorie intake moderately",
          "Increase physical activity to 150+ minutes per week",
          "Focus on whole foods and reduce processed food consumption"
        ];
      } else {
        recommendations = [
          "Consult with a healthcare professional",
          "Develop a structured meal plan focused on whole foods",
          "Start with gentle exercise like walking and gradually increase intensity"
        ];
      }
      
      res.json({
        bmi: bmi.toFixed(1),
        category,
        recommendations
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to calculate BMI" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
