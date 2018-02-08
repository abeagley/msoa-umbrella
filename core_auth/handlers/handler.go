package handlers

import (
  "github.com/jinzhu/gorm"
  "os"
  "log"

  db "github.com/abeagley/core-umbrella/go_db"
)

type coreAuthHandler struct {
  Db *gorm.DB
}

func CreateServiceHandler() (*coreAuthHandler) {
  dbCon := db.Connection{}
  dbc, err := dbCon.CreateCon(os.Getenv("MSOA_PG_GO"), "auth")

  if err != nil {
    log.Fatalf("Unable to establish db connection for handlers. %v", err)
  }

  return &coreAuthHandler{Db: dbc}
}
