import { productsModel } from "../models/products.model";
import Product from "../../interfaces/Product";
import DbProduct from "../../interfaces/DbProduct";
import UpdateProduct from "../../interfaces/UpdateProduct";
import query from "../../types/query";
import GetProduct from "../../interfaces/GetProduct";

class ProductManagerDB {
  totalProducts: number = 0;

  constructor() {
    try {
      this.initializeTotalProducts();
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async initializeTotalProducts(): Promise<void> {
    this.totalProducts = await this.getTotalProducts();
  }

  // @@@@
  async getTotalProducts(): Promise<number> {
    try {
      const totalProducts: number = await productsModel.countDocuments();
      return totalProducts;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async addProduct(productObj: Product): Promise<void> {
    try {
      const existingProduct = await productsModel.findOne({
        code: productObj.code,
      });
      if (existingProduct) {
        throw new Error(
          "El código del producto que está intentando agregar ya existe. Utilice otro código."
        );
      }
      await productsModel.create(productObj);
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async getProducts(
    limit: number,
    page: number,
    sort: string,
    query: query
  ): Promise<GetProduct> {
    try {
      const options = {
        limit: limit,
        page: page,
        sort: sort === "asc" ? { price: 1 } : { price: -1 },
        lean: true,
      };
      const result = await productsModel.paginate(query, options);
      const products: GetProduct = {
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
      };
      return products;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async getProductById(id: string): Promise<DbProduct> {
    try {
      const product = await productsModel.findById(id);
      const dbProduct: DbProduct = await product.toObject();
      return dbProduct;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async updateProduct(id: string, updateObj: UpdateProduct): Promise<void> {
    try {
      const product = await this.getProductById(id);
      Object.keys(updateObj).forEach((key: string) => {
        product[key] = updateObj[key];
      });
      await productsModel.updateOne({ _id: id }, { $set: product });
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async deleteProduct(id: string): Promise<void> {
    try {
      await productsModel.deleteOne({ _id: id });
    } catch (error) {
      throw error;
    }
  }
}

export default ProductManagerDB;
