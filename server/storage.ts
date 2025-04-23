import { 
  FoodItem, 
  Meal, 
  Product, 
  Plan, 
  PlateOrder, 
  InsertFoodItem, 
  InsertMeal, 
  InsertProduct, 
  InsertPlan, 
  InsertPlateOrder,
  User,
  InsertUser
} from "@shared/schema";

// Modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // Food items
  getFoodItems(): Promise<FoodItem[]>;
  getFoodItemsByCategory(category: string): Promise<FoodItem[]>;
  getFoodItem(id: number): Promise<FoodItem | undefined>;
  createFoodItem(item: InsertFoodItem): Promise<FoodItem>;

  // Meals
  getMeals(): Promise<Meal[]>;
  getMeal(id: number): Promise<Meal | undefined>;
  createMeal(meal: InsertMeal): Promise<Meal>;

  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Plans
  getPlans(): Promise<Plan[]>;
  getPlan(id: number): Promise<Plan | undefined>;
  createPlan(plan: InsertPlan): Promise<Plan>;

  // Plate orders
  createPlateOrder(order: InsertPlateOrder): Promise<PlateOrder>;
  getPlateOrders(): Promise<PlateOrder[]>;

  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private foodItems: Map<number, FoodItem>;
  private meals: Map<number, Meal>;
  private products: Map<number, Product>;
  private plans: Map<number, Plan>;
  private plateOrders: Map<number, PlateOrder>;
  private users: Map<number, User>;

  private currentFoodItemId: number;
  private currentMealId: number;
  private currentProductId: number;
  private currentPlanId: number;
  private currentPlateOrderId: number;
  private currentUserId: number;

  constructor() {
    this.foodItems = new Map();
    this.meals = new Map();
    this.products = new Map();
    this.plans = new Map();
    this.plateOrders = new Map();
    this.users = new Map();

    this.currentFoodItemId = 1;
    this.currentMealId = 1;
    this.currentProductId = 1;
    this.currentPlanId = 1;
    this.currentPlateOrderId = 1;
    this.currentUserId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  // Food items
  async getFoodItems(): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values());
  }

  async getFoodItemsByCategory(category: string): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values()).filter(
      (item) => item.category === category
    );
  }

  async getFoodItem(id: number): Promise<FoodItem | undefined> {
    return this.foodItems.get(id);
  }

  async createFoodItem(item: InsertFoodItem): Promise<FoodItem> {
    const id = this.currentFoodItemId++;
    const foodItem: FoodItem = { ...item, id };
    this.foodItems.set(id, foodItem);
    return foodItem;
  }

  // Meals
  async getMeals(): Promise<Meal[]> {
    return Array.from(this.meals.values());
  }

  async getMeal(id: number): Promise<Meal | undefined> {
    return this.meals.get(id);
  }

  async createMeal(meal: InsertMeal): Promise<Meal> {
    const id = this.currentMealId++;
    const newMeal: Meal = { ...meal, id };
    this.meals.set(id, newMeal);
    return newMeal;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const newProduct: Product = { ...product, id };
    this.products.set(id, newProduct);
    return newProduct;
  }

  // Plans
  async getPlans(): Promise<Plan[]> {
    return Array.from(this.plans.values());
  }

  async getPlan(id: number): Promise<Plan | undefined> {
    return this.plans.get(id);
  }

  async createPlan(plan: InsertPlan): Promise<Plan> {
    const id = this.currentPlanId++;
    const newPlan: Plan = { ...plan, id };
    this.plans.set(id, newPlan);
    return newPlan;
  }

  // Plate orders
  async createPlateOrder(order: InsertPlateOrder): Promise<PlateOrder> {
    const id = this.currentPlateOrderId++;
    const newOrder: PlateOrder = { ...order, id };
    this.plateOrders.set(id, newOrder);
    return newOrder;
  }

  async getPlateOrders(): Promise<PlateOrder[]> {
    return Array.from(this.plateOrders.values());
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Initialize with sample data
  private initializeData() {
    // Salad items
    this.createFoodItem({
      name: "Lettuce",
      nameAr: "خس",
      category: "salad",
      calories: 15,
      protein: 1.5,
      carbs: 2.9,
      fat: 0.2,
      price: 1.50,
      imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999",
      weight: 30
    });

    this.createFoodItem({
      name: "Spinach",
      nameAr: "سبانخ",
      category: "salad",
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      price: 1.75,
      imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
      weight: 30
    });

    this.createFoodItem({
      name: "Cucumber",
      nameAr: "خيار",
      category: "salad",
      calories: 10,
      protein: 0.7,
      carbs: 2.2,
      fat: 0.1,
      price: 1.25,
      imageUrl: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e",
      weight: 30
    });

    this.createFoodItem({
      name: "Tomatoes",
      nameAr: "طماطم",
      category: "salad",
      calories: 18,
      protein: 0.9,
      carbs: 3.9,
      fat: 0.2,
      price: 1.50,
      imageUrl: "https://images.unsplash.com/photo-1561136594-7f68413baa99",
      weight: 30
    });

    // Fruit items
    this.createFoodItem({
      name: "Apple",
      nameAr: "تفاح",
      category: "fruit",
      calories: 52,
      protein: 0.3,
      carbs: 14.0,
      fat: 0.2,
      price: 1.75,
      imageUrl: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2",
      weight: 30
    });

    this.createFoodItem({
      name: "Banana",
      nameAr: "موز",
      category: "fruit",
      calories: 89,
      protein: 1.1,
      carbs: 22.8,
      fat: 0.3,
      price: 1.50,
      imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e",
      weight: 30
    });

    this.createFoodItem({
      name: "Strawberries",
      nameAr: "فراولة",
      category: "fruit",
      calories: 32,
      protein: 0.7,
      carbs: 7.7,
      fat: 0.3,
      price: 2.00,
      imageUrl: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2",
      weight: 30
    });

    this.createFoodItem({
      name: "Blueberries",
      nameAr: "توت أزرق",
      category: "fruit",
      calories: 29,
      protein: 0.4,
      carbs: 7.3,
      fat: 0.2,
      price: 2.25,
      imageUrl: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e",
      weight: 30
    });

    // Protein items
    this.createFoodItem({
      name: "Grilled Chicken",
      nameAr: "دجاج مشوي",
      category: "protein",
      calories: 165,
      protein: 31.0,
      carbs: 0.0,
      fat: 3.6,
      price: 4.50,
      imageUrl: "https://images.unsplash.com/photo-1604503468506-a8da13d82791",
      weight: 100
    });

    this.createFoodItem({
      name: "Salmon",
      nameAr: "سلمون",
      category: "protein",
      calories: 206,
      protein: 22.0,
      carbs: 0.0,
      fat: 13.0,
      price: 5.75,
      imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      weight: 100
    });

    this.createFoodItem({
      name: "Tofu",
      nameAr: "توفو",
      category: "protein",
      calories: 144,
      protein: 15.6,
      carbs: 2.9,
      fat: 8.7,
      price: 3.75,
      imageUrl: "https://images.unsplash.com/photo-1546069901-5ec6a79120b0",
      weight: 100
    });

    this.createFoodItem({
      name: "Boiled Eggs",
      nameAr: "بيض مسلوق",
      category: "protein",
      calories: 143,
      protein: 12.6,
      carbs: 0.6,
      fat: 9.5,
      price: 3.25,
      imageUrl: "https://images.unsplash.com/photo-1593964278642-5fa63a59f353",
      weight: 100
    });

    this.createFoodItem({
      name: "Mixed Beans",
      nameAr: "فاصوليا متنوعة",
      category: "protein",
      calories: 127,
      protein: 9.0,
      carbs: 23.0,
      fat: 0.5,
      price: 3.00,
      imageUrl: "https://images.unsplash.com/photo-1596534738409-1461745be7f4",
      weight: 100
    });

    // Carb items
    this.createFoodItem({
      name: "Brown Rice",
      nameAr: "أرز بني",
      category: "carb",
      calories: 111,
      protein: 2.6,
      carbs: 23.0,
      fat: 0.9,
      price: 2.50,
      imageUrl: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6",
      weight: 100
    });

    this.createFoodItem({
      name: "Quinoa",
      nameAr: "كينوا",
      category: "carb",
      calories: 120,
      protein: 4.4,
      carbs: 21.3,
      fat: 1.9,
      price: 3.25,
      imageUrl: "https://images.unsplash.com/photo-1595961102870-1ff37289dddd",
      weight: 100
    });

    this.createFoodItem({
      name: "Sweet Potato",
      nameAr: "بطاطا حلوة",
      category: "carb",
      calories: 90,
      protein: 2.0,
      carbs: 20.7,
      fat: 0.2,
      price: 2.75,
      imageUrl: "https://images.unsplash.com/photo-1596147798623-c0c3175a2eba",
      weight: 100
    });

    this.createFoodItem({
      name: "Whole Grain Pasta",
      nameAr: "معكرونة الحبوب الكاملة",
      category: "carb",
      calories: 131,
      protein: 5.3,
      carbs: 27.2,
      fat: 0.9,
      price: 3.00,
      imageUrl: "https://images.unsplash.com/photo-1598866594230-a7c12756260f",
      weight: 100
    });

    // Pre-designed meals
    this.createMeal({
      name: "Balanced Power Bowl",
      nameAr: "وعاء الطاقة المتوازن",
      description: "Quinoa, grilled chicken, avocado, mixed greens, and our special dressing.",
      descriptionAr: "كينوا، دجاج مشوي، أفوكادو، خضار مشكلة، وصلصتنا الخاصة.",
      calories: 450,
      protein: 32,
      carbs: 42,
      fat: 18,
      price: 12.99,
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
    });

    this.createMeal({
      name: "Mediterranean Delight",
      nameAr: "بهجة البحر المتوسط",
      description: "Fresh salad with falafel, hummus, olives, and whole grain pita.",
      descriptionAr: "سلطة طازجة مع فلافل، حمص، زيتون، وخبز بيتا من الحبوب الكاملة.",
      calories: 380,
      protein: 18,
      carbs: 48,
      fat: 14,
      price: 10.99,
      imageUrl: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af"
    });

    this.createMeal({
      name: "Asian Fusion Bowl",
      nameAr: "وعاء الفيوجن الآسيوي",
      description: "Brown rice, edamame, tofu, avocado, and ginger-soy dressing.",
      descriptionAr: "أرز بني، إدامامي، توفو، أفوكادو، وصلصة الزنجبيل والصويا.",
      calories: 410,
      protein: 22,
      carbs: 52,
      fat: 16,
      price: 11.99,
      imageUrl: "https://images.unsplash.com/photo-1519996529931-28324d5a630e"
    });

    this.createMeal({
      name: "Protein Powerhouse",
      nameAr: "مصنع البروتين",
      description: "Grilled salmon, sweet potato, broccoli, and lemon-dill sauce.",
      descriptionAr: "سلمون مشوي، بطاطا حلوة، بروكلي، وصلصة الليمون والشبت.",
      calories: 520,
      protein: 42,
      carbs: 38,
      fat: 22,
      price: 14.99,
      imageUrl: "https://images.unsplash.com/photo-1485921325833-c519f76c4927"
    });

    this.createMeal({
      name: "Berry Breakfast Bowl",
      nameAr: "وعاء الإفطار بالتوت",
      description: "Greek yogurt, mixed berries, granola, honey, and chia seeds.",
      descriptionAr: "زبادي يوناني، توت مشكل، جرانولا، عسل، وبذور الشيا.",
      calories: 320,
      protein: 16,
      carbs: 46,
      fat: 8,
      price: 8.99,
      imageUrl: "https://images.unsplash.com/photo-1540914124281-342587941389"
    });

    this.createMeal({
      name: "Green Detox Salad",
      nameAr: "سلطة التخلص من السموم الخضراء",
      description: "Kale, spinach, cucumber, avocado, apple, and lemon vinaigrette.",
      descriptionAr: "كرنب، سبانخ، خيار، أفوكادو، تفاح، وصلصة الليمون.",
      calories: 280,
      protein: 10,
      carbs: 32,
      fat: 15,
      price: 9.99,
      imageUrl: "https://images.unsplash.com/photo-1607532941433-304659e8198a"
    });

    // Health products
    this.createProduct({
      name: "Organic Protein Powder",
      nameAr: "مسحوق البروتين العضوي",
      description: "Plant-based, 25g protein per serving",
      descriptionAr: "نباتي، 25 جرام بروتين لكل حصة",
      price: 29.99,
      imageUrl: "https://images.unsplash.com/photo-1607301405390-57127b04ccc2"
    });

    this.createProduct({
      name: "Multivitamin Complex",
      nameAr: "مركب الفيتامينات المتعددة",
      description: "Complete daily nutrients, 60 tablets",
      descriptionAr: "العناصر الغذائية اليومية الكاملة، 60 قرص",
      price: 19.99,
      imageUrl: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55"
    });

    this.createProduct({
      name: "Omega-3 Fish Oil",
      nameAr: "زيت السمك أوميغا-3",
      description: "Heart and brain health, 90 softgels",
      descriptionAr: "صحة القلب والدماغ، 90 كبسولة",
      price: 24.99,
      imageUrl: "https://images.unsplash.com/photo-1559881230-85ff405cb95a"
    });

    this.createProduct({
      name: "Probiotic Capsules",
      nameAr: "كبسولات البروبيوتيك",
      description: "Gut health, 50 billion CFU, 30 capsules",
      descriptionAr: "صحة الأمعاء، 50 مليار وحدة، 30 كبسولة",
      price: 22.99,
      imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd"
    });

    this.createProduct({
      name: "Vitamin D3 Drops",
      nameAr: "قطرات فيتامين د3",
      description: "Bone health, 1000 IU per drop, 30ml",
      descriptionAr: "صحة العظام، 1000 وحدة لكل قطرة، 30 مل",
      price: 15.99,
      imageUrl: "https://images.unsplash.com/photo-1617122124319-e22d2648fab5"
    });

    this.createProduct({
      name: "Collagen Peptides",
      nameAr: "ببتيدات الكولاجين",
      description: "Skin and joint health, 300g powder",
      descriptionAr: "صحة البشرة والمفاصل، 300 جرام مسحوق",
      price: 27.99,
      imageUrl: "https://images.unsplash.com/photo-1583623733237-4d5764a9dc82"
    });

    this.createProduct({
      name: "Green Tea Extract",
      nameAr: "مستخلص الشاي الأخضر",
      description: "Antioxidant support, 60 capsules",
      descriptionAr: "دعم مضادات الأكسدة، 60 كبسولة",
      price: 18.99,
      imageUrl: "https://images.unsplash.com/photo-1624453538263-42c562a750cc"
    });

    this.createProduct({
      name: "Magnesium Complex",
      nameAr: "مركب المغنيسيوم",
      description: "Muscle and nerve support, 120 tablets",
      descriptionAr: "دعم العضلات والأعصاب، 120 قرص",
      price: 16.99,
      imageUrl: "https://images.unsplash.com/photo-1582401656496-9d75f95f9018"
    });

    // Subscription plans
    this.createPlan({
      name: "Basic Plan",
      nameAr: "الخطة الأساسية",
      price: 89,
      isPopular: false,
      features: [
        {
          name: "10 healthy meals per month",
          nameAr: "10 وجبات صحية شهرياً",
          included: true
        },
        {
          name: "Basic nutritional guidance",
          nameAr: "إرشادات غذائية أساسية",
          included: true
        },
        {
          name: "Weekly delivery",
          nameAr: "توصيل أسبوعي",
          included: true
        },
        {
          name: "Personalized menu options",
          nameAr: "خيارات قائمة مخصصة",
          included: false
        },
        {
          name: "Health coaching sessions",
          nameAr: "جلسات تدريب صحية",
          included: false
        }
      ]
    });

    this.createPlan({
      name: "Premium Plan",
      nameAr: "الخطة المميزة",
      price: 149,
      isPopular: true,
      features: [
        {
          name: "20 healthy meals per month",
          nameAr: "20 وجبة صحية شهرياً",
          included: true
        },
        {
          name: "Advanced nutritional guidance",
          nameAr: "إرشادات غذائية متقدمة",
          included: true
        },
        {
          name: "Bi-weekly delivery",
          nameAr: "توصيل نصف أسبوعي",
          included: true
        },
        {
          name: "Personalized menu options",
          nameAr: "خيارات قائمة مخصصة",
          included: true
        },
        {
          name: "Health coaching sessions",
          nameAr: "جلسات تدريب صحية",
          included: false
        }
      ]
    });

    this.createPlan({
      name: "Elite Plan",
      nameAr: "الخطة النخبة",
      price: 249,
      isPopular: false,
      features: [
        {
          name: "30 healthy meals per month",
          nameAr: "30 وجبة صحية شهرياً",
          included: true
        },
        {
          name: "Expert nutritional guidance",
          nameAr: "إرشادات غذائية خبيرة",
          included: true
        },
        {
          name: "Daily delivery options",
          nameAr: "خيارات توصيل يومية",
          included: true
        },
        {
          name: "Fully customized menu",
          nameAr: "قائمة مخصصة بالكامل",
          included: true
        },
        {
          name: "Monthly health coaching",
          nameAr: "تدريب صحي شهري",
          included: true
        }
      ]
    });
  }
}

export const storage = new MemStorage();
