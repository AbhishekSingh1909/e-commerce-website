interface IUpdateProduct {
  id: number;
  updateProduct: IUpdateProduct;
}

export interface IUpdateProductDto {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string;
}

export default IUpdateProduct;
