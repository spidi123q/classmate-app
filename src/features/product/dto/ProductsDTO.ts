import { filter, find, isEmpty, uniqBy } from "lodash";
import PaginateResult from "../../../common/models/PaginateResult";
import IBrand from "../../../models/Brand";
import IProduct from "../../../models/Product";
import ISeller from "../../../models/Seller";
import * as JsSearch from "js-search";

export default class ProductsDTO {
  private readonly data: IProduct[];
  constructor(result: IProduct[]) {
    this.data = [...result];
  }

  getProducts(): IProduct[] {
    return this.data;
  }

  search(q?: string): ProductsDTO {
    if (q) {
      const result = this.getSearchInstance().search(q) as IProduct[];
      return new ProductsDTO(result);
    }
    return new ProductsDTO(this.data);
  }

  getSellers(): ISeller[] {
    const sellers = this.getProducts().map((product) => product.seller);
    const uniqSellers = uniqBy(sellers, "_id");
    return uniqSellers;
  }

  getBrands(): IBrand[] {
    const brands = this.getProducts().map((product) => product.brand);
    const uniqBrands = uniqBy(brands, "_id");
    return uniqBrands;
  }

  getProductsBySeller(sellerId: string): IProduct[] {
    const result = filter(this.getProducts(), {
      sellerId,
    });
    return result;
  }

  getProductCountBySeller(sellerId: string): number {
    const result = this.getProductsBySeller(sellerId);
    return result.length;
  }

  getSearchInstance() {
    const search = new JsSearch.Search("_id");
    search.addIndex("name");
    search.addIndex(["brand", "name"]);
    search.addIndex(["brand", "name"]);
    search.addIndex(["seller", "name"]);
    search.addIndex(["seller", "name"]);
    search.addDocuments(this.data);
    return search;
  }

  findById(id: string): IProduct | undefined {
    return find(this.data, {
      _id: id,
    });
  }
}
