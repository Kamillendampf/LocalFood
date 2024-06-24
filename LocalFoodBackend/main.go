package main

import (
	. "LocalFoodBackend/Controller"
	"log"
	"net/http"
)

func main() {
	log.Printf("Server start at Port :8080 \n")

	http.HandleFunc("/", LandingPage)
	http.HandleFunc("/register", Register)
	http.HandleFunc("/login", LoginUser)

	http.HandleFunc("/addCoupon", AddCoupon)
	http.HandleFunc("/addMyCoupon", AddMyCoupon)

	http.HandleFunc("/getAllCoupons", GetAllCoupons)
	http.HandleFunc("/getMyCoupons", GetMyCoupons)
	http.HandleFunc("/deleteMyCoupons", DeleteMyCoupons)

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}
