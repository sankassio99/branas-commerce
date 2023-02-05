import express, { Request, Response } from 'express';
import data from './data';
import { Order, Product } from './order';
import { validate } from './validator';
const app = express();
app.use(express.json());

let myCart = [];
let myOrder: Order;

app.post('/checkout', function (req: Request, res: Response) {
  let output: Output = {};
  const isValid = validate(req.body.cpf);

  if (!isValid) {
    output.message = "Invalid cpf";
  }

  myOrder = new Order([]);
  output.order = myOrder;

  if (req.body.items) {
    req.body.items.forEach((item: ProductReq) => {
      let product = findProductById(item.id);
      if (product) {
        product.quantity = item.quantity;
        myOrder.products.push(product);
      }
    });
  }

  if (req.body.discountCoupon) {
    var discountValue = getDicountValue(req.body.discountCoupon);
    if (discountValue) {
      myOrder.addDiscountCoupon(discountValue!);
    } else {
      output.message = "Discount coupon invalid";
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

function getDicountValue(coupon: string): number | undefined {
  if (coupon == "VALE20") return 20;
}


function findProductById(id: string): Product | undefined {
  return data.jsonProducts.find((element) => element.id == id);
}

app.listen(3000)