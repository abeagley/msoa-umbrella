package go_db

import (
  "fmt"

  "github.com/jinzhu/gorm"
  _ "github.com/jinzhu/gorm/dialects/postgres"
)

type Connection struct{}

func (dbc *Connection) setSchema(db *gorm.DB, schemaName string) {
  db.Exec(fmt.Sprintf("CREATE  SCHEMA IF NOT EXISTS %s;", schemaName))
  db.Exec(fmt.Sprintf("SET search_path TO %s;", schemaName))
}

func (dbc *Connection) CreateCon(conString, schemaName string) (*gorm.DB, error) {
  db, err := gorm.Open("postgres", conString)
  defer db.Close()

  if err != nil {
    return nil, err
  }

  dbc.setSchema(db, "auth")
  //db.LogMode(true)
  db.AutoMigrate(
    &Role{},
    &User{})

  return db, nil
}
