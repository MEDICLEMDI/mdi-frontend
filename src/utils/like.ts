import { IProductItem } from "@/interfaces/api";

/**
 * 상품 좋아요 클릭시 UI랜더링 (좋아요 색칠, 제거)를 위해 상품 리스트 정보 업데이트
 * @param productList 
 * @param product_id 
 * @returns 
 */
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