import { useSelector } from "react-redux";
import AppState from "../../../store/AppState";
import ProductstDTO from "../dto/ProductsDTO";

/**
 * Get products
 */
export default function useProductsDTO() {
  const products = useSelector((state: AppState) => state.product.products);
  return new ProductstDTO(products.docs);
}
