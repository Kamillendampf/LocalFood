package Tests

import (
	. "LocalFoodBackend/Controller"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestLandingPage(t *testing.T) {
	// Define a set of test cases
	tests := []struct {
		name       string
		urlPath    string
		wantStatus int
	}{
		{
			name:       "ValidFile",
			urlPath:    "/index.html",
			wantStatus: http.StatusOK,
		},
		{
			name:       "InvalidFile",
			urlPath:    "/nonexistent.html",
			wantStatus: http.StatusNotFound,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req, err := http.NewRequest("GET", tt.urlPath, nil)
			if err != nil {
				t.Fatal(err)
			}

			rr := httptest.NewRecorder()
			handler := http.HandlerFunc(LandingPage)
			handler.ServeHTTP(rr, req)

			// Check headers
			if rr.Header().Get("Access-Control-Allow-Origin") != "*" {
				t.Errorf("handler returned wrong Access-Control-Allow-Origin header: got %v want %v", rr.Header().Get("Access-Control-Allow-Origin"), "*")
			}

			expectedCSP := " default-src 'self' https://fonts.gstatic.com; https://unpkg.com/leaflet@1.9.4/ tile.openstreetmap.org;" +
				"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com/leaflet@1.9.4/dist/leaflet.css;" +
				"img-src 'self' https://unpkg.com/leaflet@1.9.4/ https://tile.openstreetmap.org;" +
				"script-src 'self' https://unpkg.com/leaflet@1.9.4/dist/leaflet.js;" +
				"font-src 'self' https://fonts.gstatic.com;" +
				"connect-src 'self' localhost:8080 https://nominatim.openstreetmap.org;" +
				"object-src 'none';" +
				"base-uri 'self';" +
				"form-action 'self';" +
				"frame-ancestors 'none';"

			if rr.Header().Get("Content-Security-Policy") != expectedCSP {
				t.Errorf("handler returned wrong Content-Security-Policy header: got %v want %v", rr.Header().Get("Content-Security-Policy"), expectedCSP)
			}
		})
	}
}
