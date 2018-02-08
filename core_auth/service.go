package main

import (
  "fmt"
  "log"
  "net"
  "os"

  "google.golang.org/grpc"
  "github.com/jinzhu/gorm"

  pb "github.com/abeagley/msoa-umbrella/go_rpc"
  "github.com/abeagley/msoa-umbrella/core_auth/handlers"
)

type coreAuthService struct {
  Db *gorm.DB
}

func main() {
  host := os.Getenv("MSOA_AUTH_HOST")
  port := os.Getenv("MSOA_AUTH_PORT")
  lis, err := net.Listen("tcp", fmt.Sprintf("%s:%s", host, port))
  if err != nil {
    log.Fatalf("Failed to listen: %v", err)
  }
  grpcServer := grpc.NewServer()
  pb.RegisterCoreAuthServer(grpcServer, handlers.CreateServiceHandler())
  grpcServer.Serve(lis)
}
