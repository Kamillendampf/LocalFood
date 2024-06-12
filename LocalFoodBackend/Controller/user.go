package Controller

import (
	"fmt"
	"log"
	"net/http"
)

func Register(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		fmt.Print("Register\n")

		w.WriteHeader(http.StatusOK)
	} else {
		log.Printf("Register: You send a Request with the wrong method.")
	}
}
