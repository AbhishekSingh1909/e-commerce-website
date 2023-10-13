import { CartItem } from "../../types/CartItem";

export const cartItemsData: CartItem[] = [
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
    category: {
      id: 3,
      name: "Furniture",
      image: "https://i.imgur.com/imQx3Az.jpeg",
    },
    quantity: 1,
  },
];
