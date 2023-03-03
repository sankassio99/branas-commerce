import express, { Request, Response } from 'express';
import ICurrencyGateway from './application/gateway/iCurrencyGateway';
import data from './data/data';
import Item from './entities/item';
import Order from './entities/order';
import Product from './entities/product';
import CurrencyApiFake from './fakes/currencyApiFake';
import { validate } from './validator';
const app = express();
app.use(express.json());

let myOrder: Order;

let output: Output;
let currencyApi: ICurrencyGateway = new CurrencyApiFake();

app.post('/checkout', function (req: Request, res: Response) {
  output = { freight: 0 };

  const isValid = validate(req.body.cpf);

  if (!isValid) {
    output.message = `Invalid cpf`;
  }

  myOrder = new Order("746.971.314-01", currencyApi);
  output.order = myOrder;

  if (req.body.items) {
    req.body.items.forEach((item: ProductReq) => {
      if (item.quantity < 0) {
        output.message = "Invalid quantity";
      } else {
        let product = findProductById(item.id);
        if (product) {
          product.quantity = item.quantity;
          myOrder.items.push(new Item(product.id, product.price, item.quantity, product.currency));
          output.freight += calculeFreight(product);
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
  freight: number,
}

type ProductReq = {
  id: string;
  quantity: number;
};

function getDicountValue(couponName: string): number | undefined {
  let coupon = data.jsonCoupons.find((element) => element.desc == couponName);

  if (coupon?.expired) {
    output.message = "Discount coupon invalid";
    return;
  }
  return coupon?.value;
}


function findProductById(id: string): Product | undefined {
  return data.jsonProducts.find((element) => element.id == id);
}

function calculeFreight(item: Product): number {
  // Valor do Frete = distância (km) * volume (m3) * (densidade/100)
  const distance = 1000;
  const volume = calculeVolume(item);
  const density = calculeDesity(volume, item);
  return distance * volume * density / 1000;
}

app.listen(3000)

function calculeVolume(product: Product): number {
  // Exemplos de volume ocupado (cubagem)
  //   - Camera: H 20cm x D 15 cm x  W 10 cm = 30 m3
  const volume = product.height * product.deep * product.width / 1000;
  return volume;
}
function calculeDesity(volume: number, product: Product) {
  // Camera: 1kg / 0,003 m3 = 333kg/m3
  return product.weight / volume;
}