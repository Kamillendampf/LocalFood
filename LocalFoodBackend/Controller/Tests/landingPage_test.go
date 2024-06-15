package Tests

import (
	"LocalFoodBackend/Controller"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestLandingPage(t *testing.T) {
	// Erstellen einer HTTP-Anfrage für die LandingPage
	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatal(err)
	}

	// Recorder, um die Antwort aufzuzeichnen
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Controller.LandingPage)

	// Anfrage ausführen
	handler.ServeHTTP(rr, req)

	// Statuscode prüfen
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Prüfen der Header
	expectedCSP := " default-src 'self' https://fonts.gstatic.com;" +
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;" +
		"img-src 'self';" +
		"script-src 'self';" +
		"font-src 'self' https://fonts.gstatic.com;" +
		"connect-src 'self' http://localhost:8080;" +
		"object-src 'none';" +
		"base-uri 'self';" +
		"form-action 'self';" +
		"frame-ancestors 'none';"

	if csp := rr.Header().Get("Content-Security-Policy"); csp != expectedCSP {
		t.Errorf("Handler returned unexpected Content-Security-Policy header: got %v want %v",
			csp, expectedCSP)
	}

	if acao := rr.Header().Get("Access-Control-Allow-Origin"); acao != "*" {
		t.Errorf("Handler returned unexpected Access-Control-Allow-Origin header: got %v want %v",
			acao, "*")
	}
}
