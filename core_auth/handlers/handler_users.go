package handlers

import (
  "golang.org/x/net/context"
  pb "github.com/abeagley/core-umbrella/go_rpc"
)

func (s *coreAuthHandler) AuthenticateUser(ctx context.Context, user *pb.User) (*pb.UserAuthenticationResponse, error) {
  return nil, nil
}

func (s *coreAuthHandler) CreateUser(ctx context.Context, user *pb.User) (*pb.User, error) {
  return nil, nil
}

func (s *coreAuthHandler) DeleteUser(ctx context.Context, user *pb.User) (*pb.User, error) {
  return nil, nil
}

func (s *coreAuthHandler) GetUser(ctx context.Context, user *pb.User) (*pb.User, error) {
  return nil, nil
}

func (s *coreAuthHandler) GetUsers(ctx context.Context, user *pb.UsersRequest) (*pb.Users, error) {
  return nil, nil
}

func (s *coreAuthHandler) UpdateUser(ctx context.Context, user *pb.User) (*pb.User, error) {
  return nil, nil
}
