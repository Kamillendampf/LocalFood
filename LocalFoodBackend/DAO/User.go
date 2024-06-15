package DAO

import (
	"LocalFoodBackend/Struct"
)

func InserUser(user *Struct.User) {
	db.Create(user)
}
