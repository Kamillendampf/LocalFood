package Service

import (
	"LocalFoodBackend/DAO"
	"LocalFoodBackend/Struct"
)

func AddUser(user *Struct.User) {
	DAO.InserUser(user)
}
