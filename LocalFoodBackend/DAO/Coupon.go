package DAO

import (
	"LocalFoodBackend/Struct"
	"database/sql"
	"errors"
	"fmt"
	"log"
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

func InsertMyCoupon(coupon *Struct.MyCoupon) {
	if err := db.Where("coupon_id = ? AND user_ident = ?", coupon.CouponID, coupon.UserIdent).Find(&coupon); errors.Is(err.Error, sql.ErrNoRows) || err.Error == nil {
		db.Create(coupon)
	}

}

func MyCoupns(userIdent string) []Struct.MyCoupon {
	var coupons []Struct.MyCoupon

	if err := db.Where("user_ident = ?", userIdent).Find(&coupons); err.Error != nil {
		log.Println(err)
	}

	return coupons
}

func GetMyCoupons(coupnId uint) Struct.Coupon {
	var coupons Struct.Coupon

	if err := db.Where("id = ?", coupnId).Find(&coupons); err.Error != nil {
		log.Println(err)
	}

	return coupons
}

func DeleteMyCoupon(coupon *Struct.MyCoupon) {
	if err := db.Where("coupon_id = ? AND user_ident = ?", coupon.CouponID, coupon.UserIdent).Delete(coupon); err != nil {
		log.Print(err.Error)
	} else {
		log.Println("Das element wurde gelöscht")
	}
}
