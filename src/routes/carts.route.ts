import { Router, Request, Response } from "express";
import { productRoute } from "../utils/routes";
import { successStatus, failureStatus } from "../utils/statuses";
import { CartManagerDB } from "../dao/services/CartManagerDB";
import DbCart from "../interfaces/DbCart";
import ProductCart from "../interfaces/ProductCart";
import validateProductCart from "../validators/productCart";
import cartsModel from "../dao/models/carts.model";
import validateNumber from "../validators/number";

const cartsRouter: Router = Router();

/** GET ENDPOINTS */
// @@@@
cartsRouter.get("/:cid", async (req: Request, res: Response) => {
  try {
    const cartManagerDB: CartManagerDB = new CartManagerDB();
    const cid: string = req.params.cid;
    const cart: DbCart = await cartManagerDB.getCartById(cid);
    res.json(cart);
  } catch (error) {
    res.json(failureStatus(error.message));
  }
});

// @@@@
cartsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const cartManagerDB: CartManagerDB = new CartManagerDB();
    // const cid: string = req.params.cid;
    const cart: DbCart[] = await cartManagerDB.getCarts();
    res.json(cart);
  } catch (error) {
    res.json(failureStatus(error.message));
  }
});

/** POST ENPOINTS */
// @@@@
cartsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const cartManagerDB: CartManagerDB = new CartManagerDB();
    await cartManagerDB.createCart();
    res.json(successStatus);
  } catch (error) {
    res.json(failureStatus(error.message));
  }
});

// @@@@
cartsRouter.post(
  "/:cid" + productRoute + "/:pid",
  async (req: Request, res: Response) => {
    try {
      const cartManagerDB: CartManagerDB = new CartManagerDB();
      const cid: string = req.params.cid;
      const pid: string = req.params.pid;
      await cartManagerDB.addProductToCart(cid, pid);
      res.json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }
);

/** PUT ENPOINTS */
// @@@@
cartsRouter.put("/:cid", async (req: Request, res: Response) => {
  try {
    const cartManagerDB: CartManagerDB = new CartManagerDB();
    const cid: string = req.params.cid;
    const updateProducts: ProductCart[] = validateProductCart(req.body);
    await cartManagerDB.updateCart(cid, updateProducts);
    res.json(successStatus);
  } catch (error) {
    res.json(failureStatus(error.message));
  }
});

// @@@@
cartsRouter.put(
  "/:cid" + productRoute + "/:pid",
  async (req: Request, res: Response) => {
    try {
      const cartManagerDB: CartManagerDB = new CartManagerDB();
      const cid: string = req.params.cid;
      const pid: string = req.params.pid;
      const quantity: number = validateNumber(req.body);
      await cartManagerDB.updateProductQuantity(cid, pid, quantity);
      res.json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }
);

/** DELETE ENPOINTS */
// @@@@
cartsRouter.delete(
  "/:cid" + productRoute + "/:pid",
  async (req: Request, res: Response) => {
    try {
      const cartManagerDB: CartManagerDB = new CartManagerDB();
      const cid: string = req.params.cid;
      const pid: string = req.params.pid;
      await cartManagerDB.removeProductFromCart(cid, pid);
      res.json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }
);

// @@@@
cartsRouter.delete("/:cid", async (req: Request, res: Response) => {
  try {
    const cartManagerDB: CartManagerDB = new CartManagerDB();
    const cid: string = req.params.cid;
    await cartManagerDB.clearCart(cid);
    res.json(successStatus);
  } catch (error) {
    res.json(failureStatus(error.message));
  }
});

export default cartsRouter;
