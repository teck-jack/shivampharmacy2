import type { Product } from "../types/product"

export const products: Product[] = [
 
  {
    id: 1,
    name: "Hajma Churna",
    description:
      "For healthy digestion, enhances appetite, and revitalizes the body—an all-natural formula for improved strength, energy, and overall well-being.",
    price: 350,
    image:
      "hajmabootifront.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Digestive",
    rating: 4.6,
    waight:"225 gm",
    isNew: false,
    discount: 5,
    purchaseLinks: {
      amazon: "https://www.amazon.com/Hajma-Churna/dp/...",
      meesho: "https://www.meesho.com/Hajma-Churna/p..."
    }

  },
  {
    id: 2,
    name: "Bahubali Body Gainer.",
    description:
      "Advanced body gainer formula designed to boost muscle mass, improve strength, enhance stamina, and support rapid, healthy weight gain with essential nutrients.",
    price: 365,
    image:
      "bahubalifront.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Gainer",
    rating: 4.7,
    waight:"250 gm",
    isNew: false,
    discount: 7,
    purchaseLinks: {
      amazon: "https://www.amazon.com/Hajma-Churna/dp/...",
      meesho: "https://www.meesho.com/Hajma-Churna/p..."
    }
  },
  {
    id: 3,
    name: "Advance Body Growth Powder",
    description: "A powerful herbal remedy that supports digestive health, boosts appetite, and strengthens the body for overall wellness and vitality.",
    price: 265,
    image:
      "advancedbodygrowthfront.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Gainer",
    rating: 4.9,
    waight:"200 gm",
    isNew: true,
    discount: 5,
    purchaseLinks: {
      amazon: "https://www.amazon.com/Hajma-Churna/dp/...",
      meesho: "https://www.meesho.com/Hajma-Churna/p..."
    }
  },
  
  {
    id: 4,
    name: "Advanced Healthy Body Growth Powder",
    description: "Enhancing body growth powder with natural ingredients to boost metabolism and promote muscle growth.",
    price: 265,
    image:
      "advancedhealthybodygrowthfront.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Gainer",
    rating: 4.4,
    waight:"225 gm",
    isNew: false,
    discount: 5,
    purchaseLinks: {
      amazon: "https://www.amazon.com/Hajma-Churna/dp/...",
      meesho: "https://www.meesho.com/Hajma-Churna/p..."
    }
  },
  {
    id: 5,
    name: "Smart Body Plus Powder",
    description:
      "Balancing body powder with natural ingredients to boost metabolism and promote muscle growth.",
    price: 350,
    image:
      "smartbodyfrontboth.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Gainer",
    rating: 4.8,
    waight:"225 gm",
    isNew: false,
    discount: 5,
    purchaseLinks: {
      amazon: "https://www.amazon.com/Hajma-Churna/dp/...",
      meesho: "https://www.meesho.com/Hajma-Churna/p..."
    }
  },
  {
    id: 6,
    name: "Bahubali Body Gainer.",
    description: "Enhancing body growth powder with natural ingredients to boost metabolism and promote muscle growth.",
    price: 365,
    image:
      "bahubaliback.webp?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "Gainer",
    rating: 5.0,
    waight:"250 gm",
    isNew: true,
    discount: 5,
    purchaseLinks: {
      amazon: "https://www.amazon.com/Hajma-Churna/dp/...",
      meesho: "https://www.meesho.com/Hajma-Churna/p..."
    }
  },
]
