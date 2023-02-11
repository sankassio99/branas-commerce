import express, { Request, Response } from 'express';
import data from './data/data';
import Order from './entities/order';
import Product from './entities/product';
import { validate } from './validator';
const app = express();
app.use(express.json());

let myOrder: Order;

let output: Output ;

app.post('/checkout', function (req: Request, res: Response) {
  output = {};

  const isValid = validate(req.body.cpf);

  if (!isValid) {
    output.message = `Invalid cpf`;
  }

  myOrder = new Order([]);
  output.order = myOrder;

  if (req.body.items) {
    req.body.items.forEach((item: ProductReq) => {
      if (item.quantity < 0) {
        output.message = "Invalid quantity";
      } else {
        let product = findProductById(item.id);
        if (product) {
          product.quantity = item.quantity;
          myOrder.products.push(product);
        }
      }
    });
  }

  if (req.body.discountCoupon) {
    var discountValue = getDicountValue(req.body.discountCoupon);
    if (discountValue) {
      myOrder.addDiscountCoupon(discountValue!);
    }
  }

  output.total = myOrder.getTotal();

  console.log(output);

  res.json(output);
});

type Output = {
  message?: string,
  total?: number,
  order?: Order,
}

type ProductReq = {
  id: string;
  quantity: number;
};

function getDicountValue(couponName: string): number | undefined {
  let coupon = data.jsonCoupons.find((element) => element.desc == couponName);

  if(coupon?.expired){
      output.message = "Discount coupon invalid";
      return;
  }
  return coupon?.value;
}


function findProductById(id: string): Product | undefined {
  return data.jsonProducts.find((element) => element.id == id);
}

app.listen(3000)