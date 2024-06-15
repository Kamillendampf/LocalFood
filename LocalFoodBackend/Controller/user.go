package Controller

import (
	"LocalFoodBackend/Service"
	"LocalFoodBackend/Struct"
	"encoding/json"
	"log"
	"net"
	"net/http"
)

func Register(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		var _users Struct.User

		if err := json.NewDecoder(r.Body).Decode(&_users); err != nil {
			if ip, _, err := net.SplitHostPort(r.RemoteAddr); err != nil {
				var _errorMessage = "read body from " + ip + "failed\n"
				http.Error(w, _errorMessage, http.StatusBadRequest)
			} else {
				http.Error(w, " unknown host", http.StatusInternalServerError)
			}
			return
		}
		Service.AddUser(&_users)
		w.WriteHeader(http.StatusOK)
	} else {
		log.Printf("Register: You send a Request with the wrong method.")
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {

		var _users Struct.User

		if err := json.NewDecoder(r.Body).Decode(&_users); err != nil {
			if ip, _, err := net.SplitHostPort(r.RemoteAddr); err != nil {
				var _errorMessage = "read body from " + ip + "failed\n"
				http.Error(w, _errorMessage, http.StatusBadRequest)
			} else {
				http.Error(w, " unknown host", http.StatusInternalServerError)
			}
			return
		}

	}
}
