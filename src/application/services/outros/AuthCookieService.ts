import { CookieOptions, Response } from "express";

export class AuthCookieService {
  static readonly cookieTokenName = "accessToken";
  static readonly cookieRefreshTokenName = "refreshToken";

  setToken(res: Response, token: string) {
    res.cookie(
      AuthCookieService.cookieTokenName,
      token,
      this._getTokenOptions()
    );
  }

  setRefreshToken(res: Response, refreshToken: string) {
    res.cookie(
      AuthCookieService.cookieRefreshTokenName,
      refreshToken,
      this._getRefreshTokenOptions()
    );
  }

  clearToken(res: Response) {
    res.clearCookie(AuthCookieService.cookieTokenName, this._getTokenOptions());
  }

  clearRefreshToken(res: Response) {
    res.clearCookie(
      AuthCookieService.cookieRefreshTokenName,
      this._getRefreshTokenOptions()
    );
  }

  private _getTokenOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutos
    };
  }

  private _getRefreshTokenOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 dias
    };
  }
}
