package go_db

import (
  "github.com/jinzhu/gorm"
)

type User struct {
  gorm.Model
  Email    string `gorm:"size:100;unique_index;"`
  Password string `gorm:"size:100;"`
  Role     Role
  RoleID   uint
}

func (r User) TableName() string {
  return "users"
}
