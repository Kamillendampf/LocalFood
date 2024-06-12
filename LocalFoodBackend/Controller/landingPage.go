package Controller

import (
	"net/http"
	"path/filepath"
)

func LandingPage(w http.ResponseWriter, r *http.Request) {
	csp := " default-src 'self' https://fonts.gstatic.com;" +
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;" +
		"img-src 'self';" +
		"script-src 'self';" +
		"font-src 'self' https://fonts.gstatic.com;" +
		"connect-src 'self' http://localhost:8080;" +
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
