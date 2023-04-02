import ICouponRepository from "../repository/iCouponRepository";

export default class ValidateCoupon {
	
    /**
     *
     */
    constructor(readonly couponRepository: ICouponRepository) {
        
    }

    async execute(couponId: string) : Promise<boolean> {
        let output = false;
		const coupon = await this.couponRepository.get(couponId);
        
        output = !coupon.isExpired(new Date());
        return output;
	}
}