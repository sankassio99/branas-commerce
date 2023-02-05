import express, { Request, Response } from 'express';
import data from './data';
import { validate } from './validator';
const app = express();
app.use(express.json());

let myCart = [];

app.post('/checkout', function (req: Request, res: Response) {
  let output: Output = {};
  output.total = 0;
  const isValid = validate(req.body.cpf);
  if (!isValid) {
    output.message = "Invalid cpf";
  } 

  console.log(req.body?.items);

  if(!req.body?.items) res.json(output);

  req.body.items.forEach((element: { id: string; quantity : number }) => {
    let product = findProductById(element.id);
    console.log(product.desc);
    if(product){
      myCart.push(product);
      output.total! += product.value * element.quantity;
    }
  });

  res.json(output);
});

type Output = {
  message?: string,
  total?: number,
}

function findProductById(id : string) : any{
  return data.jsonProducts.find((element) => element.id == id);
}

app.listen(3000)