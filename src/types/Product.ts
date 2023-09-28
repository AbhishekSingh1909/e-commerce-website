import ICategory from "./Category";

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ICategory;
  images: string[];
}

export default IProduct;
