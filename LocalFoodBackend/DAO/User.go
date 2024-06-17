package DAO

import (
	"LocalFoodBackend/Struct"
	"database/sql"
	"errors"
	"log"
)

func InserUser(user *Struct.User) {
	db.Create(user)
}

func GetUser(user *Struct.User) Struct.User {
	var getUser Struct.User
	err := db.Where("ident_key = ?", user.IdentKey).First(&getUser)
	if errors.Is(err.Error, sql.ErrNoRows) {
		return Struct.User{}
	} else if err.Error != nil {
		log.Println(err.Error.Error())
		return Struct.User{}
	}
	return getUser
}
