package Controller

import (
	"LocalFoodBackend/Service"
	"LocalFoodBackend/Struct"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func Register(w http.ResponseWriter, r *http.Request) {
	fmt.Print("Register wurde aufgerufen")
	if r.Method == "POST" {
		var _users Struct.User

		if err := json.NewDecoder(r.Body).Decode(&_users); err != nil {
			http.Error(w, " unknown host", http.StatusInternalServerError)
			log.Printf(err.Error())
			return
		}
		fmt.Println("Der Nutzer hat folgende werte:")
		fmt.Println(_users)
		Service.AddUser(&_users)
		fmt.Println(_users)
		w.WriteHeader(http.StatusOK)
	} else {
		log.Printf("Register: You send a Request with the wrong method.")
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	log.Printf("Login is called")
	if r.Method == "POST" {
		var _user Struct.User
		if err := json.NewDecoder(r.Body).Decode(&_user); err != nil {
			log.Printf(err.Error())
			w.WriteHeader(http.StatusInternalServerError)
		}

		if Service.LoginCheck(&_user) {
			w.WriteHeader(http.StatusAccepted)
			jsonizedOutput, err := json.Marshal(Service.GetUserInformations(&_user))
			if err != nil {
				log.Print("JSON faild to read with: ", err)
				return
			}
			w.Header().Set("Content-Type", "application/json")
			_, _ = w.Write(jsonizedOutput)
			return
		} else {
			log.Printf("login %s was unsuccessful\n", _user.IdentKey)
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
	} else {
		log.Printf("Login: You send a Request with the wrong method.")
		w.WriteHeader(http.StatusMethodNotAllowed)
	}

}
