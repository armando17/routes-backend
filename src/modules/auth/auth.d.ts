declare namespace Auth {
  export interface AccessRefreshTokens {
    accessToken: string;
    refreshToken: string;
    email?: string;
    name?: string;
    username?: string;
  }
}
