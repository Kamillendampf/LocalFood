package Service

import (
	"LocalFoodBackend/DAO"
	"LocalFoodBackend/Struct"
)

func AddCoupon(coupon *Struct.Coupon) {
	DAO.InsertCoupon(coupon)
}

func GetAllCoupons() []Struct.Coupon {
	return DAO.GetAllCoupons()
}
