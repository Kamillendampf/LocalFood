package Controller

import (
	"LocalFoodBackend/Service"
	"LocalFoodBackend/Struct"
	"net/http"
)

/*
SecuredMiddleware()
Controlling access to the secured area of the application.
This function returns a bool value and could deny the access.
*/
func SecuredMiddleware(r *http.Request) bool {
	var credentials = Struct.User{IdentKey: r.Header.Get("Authorization")}
	if Service.LoginCheck(&credentials) {
		return true
	} else {
		return false
	}

}
