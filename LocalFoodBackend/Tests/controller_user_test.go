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

	"github.com/stretchr/testify/assert"
)

// Mocking the Service.AddUser and Service.LoginCheck functions
var addUserMock func(user *Struct.User)
var loginCheckMock func(user *Struct.User) bool
var getUserInformationsMock func(user *Struct.User) *Struct.User

func TestRegister(t *testing.T) {
	log.Print("it should respond with status code 200")
	// Testdaten
	user := Struct.User{
		Name:        "testuser",
		IdentKey:    "testpassword",
		Email:       "testuser@test.mail",
		ProfileType: true,
	}
	body, _ := json.Marshal(user)

	// Mock the Service.AddUser function
	addUserMock = func(u *Struct.User) {
		assert.Equal(t, user, *u)
	}

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
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusOK)
	} else {
		fmt.Print("PASSED\n")
	}

	log.Printf("it should respond with %v", http.StatusMethodNotAllowed)
	// Test, wenn die Methode nicht POST ist
	fmt.Print("Test Register with GET\n")
	req, err = http.NewRequest("GET", "/register", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr = httptest.NewRecorder()
	handler.ServeHTTP(rr, req)

	// Statuscode prüfen
	if status := rr.Code; status != http.StatusMethodNotAllowed {
		t.Errorf("Handler returned wrong status code for GET: got %v want %v", status, http.StatusMethodNotAllowed)
	} else {
		fmt.Print("PASSED\n")
	}
}

func TestLoginUser(t *testing.T) {
	// Testdaten
	user := Struct.User{
		Name:     "testuser",
		IdentKey: "testpassword",
	}
	body, _ := json.Marshal(user)

	// Mock the Service.LoginCheck function
	loginCheckMock = func(u *Struct.User) bool {
		assert.Equal(t, user, *u)
		return true
	}

	getUserInformationsMock = func(u *Struct.User) *Struct.User {
		assert.Equal(t, user, *u)
		return &user
	}

	// Test-Request und -Response
	req, err := http.NewRequest("POST", "/login", bytes.NewBuffer(body))
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Controller.LoginUser)

	// Anfrage ausführen
	handler.ServeHTTP(rr, req)

	log.Print("User should be logged in")
	// Statuscode prüfen
	if status := rr.Code; status != http.StatusAccepted {
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusAccepted)
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
		t.Errorf("Handler returned wrong status code for GET: got %v want %v", status, http.StatusMethodNotAllowed)
	} else {
		fmt.Print("PASSED\n")
	}
}

func TestLoginUserInvalidCredentials(t *testing.T) {
	// Testdaten
	user := Struct.User{
		Name:     "invaliduser",
		IdentKey: "invalidpassword",
	}
	body, _ := json.Marshal(user)

	// Mock the Service.LoginCheck function to return false
	loginCheckMock = func(u *Struct.User) bool {
		assert.Equal(t, user, *u)
		return false
	}

	// Test-Request und -Response
	req, err := http.NewRequest("POST", "/login", bytes.NewBuffer(body))
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Controller.LoginUser)

	// Anfrage ausführen
	handler.ServeHTTP(rr, req)

	log.Print("User should not be logged in with invalid credentials")
	// Statuscode prüfen
	if status := rr.Code; status != http.StatusUnauthorized {
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusUnauthorized)
	} else {
		fmt.Print("PASSED\n")
	}
}
