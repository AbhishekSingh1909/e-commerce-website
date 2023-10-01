interface UpdateProduct {
  id: number;
  updateProduct: ProductDto;
}

export interface ProductDto {
  title: string;
  price: number;
  description: string;
  categoryId: number;
}

export default UpdateProduct;
