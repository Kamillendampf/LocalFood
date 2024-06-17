package Tests

import (
	"LocalFoodBackend/Controller"
	"LocalFoodBackend/Struct"
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"
)

// TestRegister prüft die Register-Funktion
func TestRegister(t *testing.T) {
	log.Print("it should respondes statuscode 200")
	// Testdaten
	user := Struct.User{
		Name:        "testuser",
		IdentKey:    "testpassword",
		Email:       "testuser@test.mail",
		ProfileType: true,
	}
	body, _ := json.Marshal(user)

	// Test-Request und -Response
	req, err := http.NewRequest("POST", "/register", bytes.NewBuffer(body))
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Controller.Register)

	// Anfrage ausführen
	handler.ServeHTTP(rr, req)

	// Statuscode prüfen
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	} else {
		fmt.Print("PASSED\n")
	}

	log.Printf("it should responde %v", http.StatusMethodNotAllowed)
	// Test, wenn die Methode nicht POST ist
	fmt.Print("Test Register with GET")
	req, err = http.NewRequest("GET", "/register", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr = httptest.NewRecorder()
	handler.ServeHTTP(rr, req)

	// Statuscode prüfen
	if status := rr.Code; status != http.StatusMethodNotAllowed {
		t.Errorf("Handler returned wrong status code for GET: got %v want %v",
			status, http.StatusMethodNotAllowed)
	} else {
		fmt.Print("PASSED\n")
	}
}

// TestLoginUser prüft die loginUser-Funktion
func TestLoginUser(t *testing.T) {
	// Testdaten
	user := Struct.User{
		Name:     "testuser",
		IdentKey: "testpassword",
	}
	body, _ := json.Marshal(user)

	// Test-Request und -Response
	req, err := http.NewRequest("POST", "/login", bytes.NewBuffer(body))
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Controller.LoginUser)

	// Anfrage ausführen
	handler.ServeHTTP(rr, req)

	log.Print("User should be loged in")
	// Statuscode prüfen
	if status := rr.Code; status != 202 {
		t.Errorf("Handler returned wrong status code: got %v want %v",
			status, 202)
	} else {
		fmt.Print("PASSED\n")
	}

	// Test, wenn die Methode nicht POST ist
	log.Printf("it should be ignored and response should be %d", http.StatusMethodNotAllowed)
	req, err = http.NewRequest("GET", "/login", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr = httptest.NewRecorder()
	handler.ServeHTTP(rr, req)

	// Statuscode prüfen
	if status := rr.Code; status != http.StatusMethodNotAllowed {
		t.Errorf("Handler returned wrong status code for GET: got %v want %v",
			status, http.StatusMethodNotAllowed)
	} else {
		fmt.Print("PASSED\n")
	}
}
