import { BaseResponse } from './base-response.model';

export interface User {
  id: number;
  username: string;
  email: string;
  roles: Array<string>;
}

export interface UserRegistrationRequest {
  username: string;
  email: string;
  password: string;
}
export interface UserRegistrationResponse extends BaseResponse { }

export interface UserLoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface UserLoginResponse extends BaseResponse {
  data: {
    accessToken: string;
    tokenType: string;
  };
}

export interface CurrentUser extends BaseResponse {
  data: User;
}