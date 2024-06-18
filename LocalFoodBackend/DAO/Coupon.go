package DAO

import (
	"LocalFoodBackend/Struct"
	"fmt"
)

func InsertCoupon(coupon *Struct.Coupon) {
	db.Create(coupon)
}

func GetAllCoupons() []Struct.Coupon {
	var coupons []Struct.Coupon
	result := db.Find(&coupons)
	if result.Error != nil {
		fmt.Println("Error fetching coupons:", result.Error)
		return nil
	}
	return coupons
}
