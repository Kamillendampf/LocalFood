package Controller

import (
	"LocalFoodBackend/Service"
	"LocalFoodBackend/Struct"
	"encoding/json"
	"log"
	"net/http"
)

func AddCoupon(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		if SecuredMiddleware(r) {
			var _coupon Struct.Coupon

			if err := json.NewDecoder(r.Body).Decode(&_coupon); err != nil {
				http.Error(w, " unknown host", http.StatusInternalServerError)
				log.Printf(err.Error())
				return
			}
			Service.AddCoupon(&_coupon)
			w.WriteHeader(http.StatusOK)
		} else {
			w.WriteHeader(http.StatusUnauthorized)
		}

	} else {
		log.Printf("Register: You send a Request with the wrong method.")
		w.WriteHeader(http.StatusMethodNotAllowed)
	}

}

func GetAllCoupons(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		if SecuredMiddleware(r) {
			jsonizedOutput, err := json.Marshal(Service.GetAllCoupons())
			if err != nil {
				log.Print("JSON faild to read with: ", err)
				return
			}
			w.Header().Set("Content-Type", "application/json")
			_, _ = w.Write(jsonizedOutput)
			return
		}
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func AddMyCoupon(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		if SecuredMiddleware(r) {
			var _coupon Struct.MyCoupon

			if err := json.NewDecoder(r.Body).Decode(&_coupon); err != nil {
				http.Error(w, " unknown host", http.StatusInternalServerError)
				log.Printf(err.Error())
				return
			}
			Service.AddMyCoupon(&_coupon)
			w.WriteHeader(http.StatusOK)
		} else {
			w.WriteHeader(http.StatusUnauthorized)
		}

	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
	}

}

func GetMyCoupons(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		if SecuredMiddleware(r) {
			var _myCoupon Struct.MyCoupon
			if err := json.NewDecoder(r.Body).Decode(&_myCoupon); err != nil {
				http.Error(w, " unknown host", http.StatusInternalServerError)
				log.Printf(err.Error())
				return
			}

			jsonizedOutput, err := json.Marshal(Service.GetMyCoupons(&_myCoupon))
			if err != nil {
				log.Print("JSON faild to read with: ", err)
				return
			}
			w.Header().Set("Content-Type", "application/json")
			_, _ = w.Write(jsonizedOutput)
			return
		}
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func DeleteMyCoupons(w http.ResponseWriter, r *http.Request) {
	log.Print("Anfrage erhalten.")
	if r.Method == "POST" {
		if SecuredMiddleware(r) {
			log.Print("Ein Nutzer hat einen Coupon einglöst")
			var _myCoupon Struct.MyCoupon
			if err := json.NewDecoder(r.Body).Decode(&_myCoupon); err != nil {
				http.Error(w, " unknown host", http.StatusInternalServerError)
				log.Printf(err.Error())
				return
			}
			Service.DeleteMyCoupon(&_myCoupon)
			w.WriteHeader(http.StatusOK)
			return
		}
	} else {
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}
