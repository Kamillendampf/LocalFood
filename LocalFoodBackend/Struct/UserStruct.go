package Struct

type User struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	IdentKey    string `gorm:"unique;not null" json:"identKey"`
	ProfileType bool   `gorm:"not null" json:"profileType"`
	Name        string `gorm:"not null" json:"name"`
	Email       string `gorm:"not null" json:"email"`
}
