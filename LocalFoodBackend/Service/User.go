package Service

import (
	"LocalFoodBackend/DAO"
	"LocalFoodBackend/Struct"
)

func AddUser(user *Struct.User) {
	DAO.InserUser(user)
}

func LoginCheck(user *Struct.User) bool {
	if user.IdentKey == DAO.GetUser(user).IdentKey {
		return true
	} else {
		return false
	}
}

func GetUserInformations(user *Struct.User) Struct.User {
	var getUser Struct.User = DAO.GetUser(user)
	return getUser
}
