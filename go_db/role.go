package go_db

import (
  "github.com/jinzhu/gorm"
)

type Role struct {
  gorm.Model
  Name  string `gorm:"size:80;unique_index"`
  Users []User
}

func (r Role) TableName() string {
  return "roles"
}
