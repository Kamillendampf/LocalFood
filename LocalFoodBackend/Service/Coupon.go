package Service

import (
	"LocalFoodBackend/DAO"
	"LocalFoodBackend/Struct"
)

func AddCoupon(coupon *Struct.Coupon) {
	DAO.InsertCoupon(coupon)
}

func AddMyCoupon(coupon *Struct.MyCoupon) {
	DAO.InsertMyCoupon(coupon)
}

func GetAllCoupons() []Struct.Coupon {
	return DAO.GetAllCoupons()
	g
}

func GetMyCoupons(coupon *Struct.MyCoupon) []Struct.Coupon {
	var myCoupons []Struct.Coupon
	for _, values := range DAO.MyCoupns(coupon.UserIdent) {
		myCoupons = append(myCoupons, DAO.GetMyCoupons(values.CouponID))
	}
	return myCoupons
}

func DeleteMyCoupon(coupon *Struct.MyCoupon) {
	DAO.DeleteMyCoupon(coupon)
}
