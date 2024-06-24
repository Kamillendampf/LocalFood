package Tests

import (
	. "LocalFoodBackend/Controller"
	"LocalFoodBackend/Struct"
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestAddCoupon(t *testing.T) {
	coupon := Struct.Coupon{ /* fill with sample data */ }
	body, _ := json.Marshal(coupon)
	req, err := http.NewRequest("POST", "/add-coupon", bytes.NewBuffer(body))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(AddCoupon)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}
}

func TestGetAllCoupons(t *testing.T) {
	req, err := http.NewRequest("GET", "/get-all-coupons", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(GetAllCoupons)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	if rr.Header().Get("Content-Type") != "application/json" {
		t.Errorf("handler returned wrong content type: got %v want %v", rr.Header().Get("Content-Type"), "application/json")
	}
}

func TestAddMyCoupon(t *testing.T) {
	coupon := Struct.MyCoupon{ /* fill with sample data */ }
	body, _ := json.Marshal(coupon)
	req, err := http.NewRequest("POST", "/add-my-coupon", bytes.NewBuffer(body))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(AddMyCoupon)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}
}

func TestGetMyCoupons(t *testing.T) {
	coupon := Struct.MyCoupon{ /* fill with sample data */ }
	body, _ := json.Marshal(coupon)
	req, err := http.NewRequest("POST", "/get-my-coupons", bytes.NewBuffer(body))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(GetMyCoupons)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	if rr.Header().Get("Content-Type") != "application/json" {
		t.Errorf("handler returned wrong content type: got %v want %v", rr.Header().Get("Content-Type"), "application/json")
	}
}

func TestDeleteMyCoupons(t *testing.T) {
	coupon := Struct.MyCoupon{ /* fill with sample data */ }
	body, _ := json.Marshal(coupon)
	req, err := http.NewRequest("POST", "/delete-my-coupons", bytes.NewBuffer(body))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(DeleteMyCoupons)
	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}
}
