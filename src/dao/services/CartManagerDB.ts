import cartsModel from "../models/carts.model";
import DbCart from "../../interfaces/DbCart";
import Cart from "../../interfaces/Cart";
import ProductManagerDB from "./ProductManagerDB";
import DbProduct from "../../interfaces/DbProduct";
import ProductCart from "../../interfaces/ProductCart";
import { productsModel } from "../models/products.model";

export class CartManagerDB {
  constructor() {}

  // @@@@
  async getCarts(): Promise<DbCart[]> {
    try {
      const carts = await cartsModel.find();
      let dbCarts: DbCart[] = [];
      carts.forEach((cart) => {
        dbCarts.push(cart.toObject());
      });
      return dbCarts;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async createCart(): Promise<void> {
    try {
      const cart: Cart = { products: [] };
      await cartsModel.create(cart);
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async getCartById(id: string): Promise<DbCart> {
    try {
      const cart = await cartsModel.findById(id).populate("products.product");
      const dbCart: DbCart = await cart.toObject();
      return dbCart;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async addProductToCart(cid: string, pid: string): Promise<void> {
    try {
      const cart = await cartsModel.findById(cid);
      const dbCart: DbCart = await cart.toObject();
      let productExist = false;
      const updatedProducts = dbCart.products.map((productInCart) => {
        if (productInCart.product.toString() === pid) {
          productExist = true;
          const productCart = {
            product: productInCart.product,
            quantity: productInCart.quantity + 1,
          };
          productInCart = productCart;
        }
        return productInCart;
      });
      dbCart.products = updatedProducts;
      if (!productExist) {
        const productCart = {
          product: pid,
          quantity: 1,
        };
        dbCart.products.push(productCart);
      }
      await cartsModel.updateOne({ _id: cid }, { $set: dbCart });
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async removeProductFromCart(cid: string, pid: string): Promise<void> {
    try {
      const cart = await cartsModel.findById(cid);
      const dbCart: DbCart = await cart.toObject();
      const updatedProducts = [];
      dbCart.products.forEach((productInCart) => {
        if (!(productInCart.product.toString() === pid)) {
          updatedProducts.push(productInCart);
        }
      });
      dbCart.products = updatedProducts;
      await cartsModel.updateOne({ _id: cid }, { $set: dbCart });
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async updateCart(cid: string, updateProducts: ProductCart[]): Promise<void> {
    try {
      const cart = await cartsModel.findById(cid);
      const dbCart: DbCart = await cart.toObject();
      dbCart.products = updateProducts;
      await cartsModel.updateOne({ _id: cid }, { $set: dbCart });
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async updateProductQuantity(
    cid: string,
    pid: string,
    quantity: number
  ): Promise<void> {
    try {
      const cart = await cartsModel.findById(cid);
      const dbCart: DbCart = await cart.toObject();
      dbCart.products.forEach((product) => {
        if (product.product.toString() === pid) {
          product.quantity = quantity;
        }
      });
      await cartsModel.updateOne({ _id: cid }, { $set: dbCart });
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async clearCart(cid: string): Promise<void> {
    try {
      const cart = await cartsModel.findById(cid);
      const dbCart: DbCart = await cart.toObject();
      dbCart.products = [];
      await cartsModel.updateOne({ _id: cid }, { $set: dbCart });
    } catch (error) {
      throw error;
    }
  }
}
