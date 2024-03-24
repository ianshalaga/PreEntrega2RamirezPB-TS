import { productsModel } from "../models/products.model";
import Product from "../../interfaces/Product";
import DbProduct from "../../interfaces/DbProduct";
import UpdateProduct from "../../interfaces/UpdateProduct";
import query from "../../types/query";

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
  ): Promise<DbProduct[]> {
    try {
      const pipeline = [];
      if (query) {
        if ("category" in query && query.category) {
          pipeline.push({ $match: { category: query.category } });
        }
        if ("status" in query && query.status) {
          pipeline.push({ $match: { status: JSON.parse(query.status) } });
        }
      }
      if (sort) {
        if (sort === "asc") pipeline.push({ $sort: { price: 1 } });
        else pipeline.push({ $sort: { price: -1 } });
      }
      // @@@@
      if (page) {
        pipeline.push({ $skip: (page - 1) * limit });
      }
      if (limit) {
        pipeline.push({ $limit: limit });
      }
      const products = await productsModel.aggregate(pipeline);
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
