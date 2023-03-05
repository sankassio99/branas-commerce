import ICouponRepository from "../repository/iCouponRepository";
import ICurrencyGateway from "../gateway/iCurrencyGateway";
import FreightCalculator from "./FreightCalculator";
import IProductRepository from "../repository/iProductRepository";
import IOrderRepository from "../repository/iOrderRepository";
import Order from "../../domain/entities/order";

export default class Checkout {

	constructor (
		readonly currencyGateway: ICurrencyGateway,
		readonly productRepository: IProductRepository,
		readonly couponRepository: ICouponRepository,
		readonly orderRepository: IOrderRepository
	) {
	}

	async execute (input: Input): Promise<Output> {
		// const currencies = await this.currencyGateway.getCurrencies();
		// const currencyTable = new CurrencyTable();
		// currencyTable.addCurrency("USD", currencies.usd);
		// const sequence = await this.orderRepository.count();
		const order = new Order(input.cpf, this.currencyGateway);
		let freight = 0;
		if (input.items) {
			for (const item of input.items) {
				const product = await this.productRepository.getProduct(item.idProduct);
				order.addItem(product, item.quantity);
				const itemFreight = FreightCalculator.calculate(product);
				freight += itemFreight;
			}
		}
		// if (input.from && input.to) {
		// 	order.freight = freight;
		// }
		if (input.coupon) {
			const coupon = await this.couponRepository.get(input.coupon);
			order.addDiscountCoupon(coupon);
		}
		let total = order.getTotal();
		await this.orderRepository.save(order);
		return {
			total,
			freight
		};
	}
}

type Input = {
	cpf: string,
	items: { idProduct: number, quantity: number }[],
	coupon?: string,
	from?: string,
	to?: string
}

type Output = {
	total: number,
	freight: number
}