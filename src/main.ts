import express, {Request, Response} from 'express';
import { validate } from './validator';
const app = express();
app.use(express.json());

app.post('/checkout', function (req : Request, res : Response) {
  const output : any = {};
  const isValid = validate(req.body.cpf);
  if(!isValid) output.message = "Invalid cpf";
  res.json(output);
})

app.listen(3000)