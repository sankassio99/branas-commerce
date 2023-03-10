import Product from "../../domain/entities/product";

export default class FreightCalculator {
	static calculate (product: Product, quantity : number = 1) {
		const volume = product.getVolume();
		const density = product.weight/volume;
		const itemFreight = 1000 * volume * (density/100);
		let freightValue = itemFreight * quantity;
		if(freightValue < 10){
			return 10
		}
		return freightValue;
	}
}
