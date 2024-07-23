package main

import (
	"fmt"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	fmt.Fprintf(w, "Hallo, dies ist eine Antwort vom Server aus AWS BeanStalke!")
}

func main() {
	http.HandleFunc("/hello", helloHandler)
	fmt.Println("Server läuft auf http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println("Fehler beim Starten des Servers:", err)
	}
}
