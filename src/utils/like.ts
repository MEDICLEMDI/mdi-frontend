import { IProductItem } from "@/interfaces/api";

export const handleUpdateProductLike = (productList:IProductItem[], product_id: string) => {
    const targetProductIndex = productList.findIndex(
      product => product.product_id === product_id
    );

    const updatedProductList:IProductItem[] = productList.map((product, _index) => {
      if (_index === targetProductIndex) {
        return {
          ...product,
          like: !product.like,
        };
      }
      return product;
    });

    return updatedProductList;
  };