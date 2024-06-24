package Controller

import (
	"net/http"
	"path/filepath"
)

func LandingPage(w http.ResponseWriter, r *http.Request) {
	csp := " default-src 'self' https://fonts.gstatic.com; https://unpkg.com/leaflet@1.9.4/ tile.openstreetmap.org;" +
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com/leaflet@1.9.4/dist/leaflet.css;" +
		"img-src 'self' https://unpkg.com/leaflet@1.9.4/ https://tile.openstreetmap.org;" +
		"script-src 'self' https://unpkg.com/leaflet@1.9.4/dist/leaflet.js;" +
		"font-src 'self' https://fonts.gstatic.com;" +
		"connect-src 'self' localhost:8080 https://nominatim.openstreetmap.org;" +
		"object-src 'none';" +
		"base-uri 'self';" +
		"form-action 'self';" +
		"frame-ancestors 'none';"

	acao := "*"

	const _landingPageDir = "C:\\Users\\rapha\\IdeaProjects\\LocalFood\\LocalFoodFrontend\\dist\\fornt-end\\browser"
	filePath := filepath.Join(_landingPageDir, r.URL.Path)
	w.Header().Set("Access-Control-Allow-Origin", acao)
	w.Header().Set("Content-Security-Policy", csp)
	http.ServeFile(w, r, filePath)
}
