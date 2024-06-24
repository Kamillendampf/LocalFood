package Struct

import "gorm.io/gorm"

type Coupon struct {
	gorm.Model
	ID           uint    `gorm:"primaryKey" json:"id"`
	UserIdent    string  `gorm:"not null" json:"identKey"`
	Username     string  `gorm:"size:100;not null" json:"username"`
	Latitude     float64 `gorm:"not null" json:"latitude"`
	Longitude    float64 `gorm:"not null" json:"longitude"`
	Kategorie    string  `gorm:"size:100;not null" json:"kategorie"`
	Artikelart   string  `gorm:"size:100;not null" json:"artikelart"`
	Name         string  `gorm:"size:100;not null" json:"name"`
	Beschreibung string  `gorm:"type:text" json:"beschreibung"`
	Abholzeit    string  `gorm:"size:100" json:"abholzeit"`
	Preis        string  `gorm:"not null" json:"preis"`
}

type MyCoupon struct {
	gorm.Model
	CouponID  uint   `gorm:"not null" json:"couponID"`
	UserIdent string `gorm:"not null" json:"identKey"`
}
