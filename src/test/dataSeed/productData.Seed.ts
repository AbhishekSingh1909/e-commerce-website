import Product from "../../types/Product";
import { categorydata } from "./categoryData.Seed";

export const productsData: Product[] = [
  {
    id: 1,
    title: "Electronic Metal Keyboard",
    price: 41,
    description:
      "The beautiful range of Apple Natural\u00E9 that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    images: [
      "https://i.imgur.com/wUBxCQh.jpeg",
      "https://i.imgur.com/9aM8pz3.jpeg",
      "https://i.imgur.com/ZDMM36B.jpeg",
    ],
    category: categorydata[0],
  },
  {
    id: 2,
    title: "Gorgeous Metal Car",
    price: 398,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    images: [
      "https://i.imgur.com/CCnU4YX.jpeg",
      "https://i.imgur.com/JANnz25.jpeg",
      "https://i.imgur.com/ioc7lwM.jpeg",
    ],
    category: categorydata[1],
  },
  {
    id: 3,
    title: "Intelligent Metal Chicken",
    price: 394,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    images: [
      "https://i.imgur.com/QEGACen.jpeg",
      "https://i.imgur.com/RQL19O6.jpeg",
      "https://i.imgur.com/G45P8tI.jpeg",
    ],

    category: categorydata[0],
  },
  {
    id: 4,
    title: "Generic Fresh Shirt",
    price: 621,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    images: [
      "https://i.imgur.com/nZnWUc0.jpeg",
      "https://i.imgur.com/rUWNzYa.jpeg",
      "https://i.imgur.com/rDC2jWQ.jpeg",
    ],

    category: categorydata[1],
  },
  {
    id: 5,
    title: "Generic Soft Bacon",
    price: 731,
    description: "The Football Is Good For Training And Recreational Purposes",
    images: [
      "https://i.imgur.com/G45P8tI.jpeg",
      "https://i.imgur.com/uDpzwEk.jpeg",
      "https://i.imgur.com/zQwsC2m.jpeg",
    ],

    category: categorydata[0],
  },
];
