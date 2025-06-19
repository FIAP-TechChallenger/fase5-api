import { CookieOptions, Response } from "express";

export class AuthCookieService {
  private _cookieTokenName = "accessToken";
  private _cookieRefreshTokenName = "refreshToken";

  setToken(res: Response, token: string) {
    res.cookie(this._cookieTokenName, token, this._getTokenOptions());
  }

  setRefreshToken(res: Response, refreshToken: string) {
    res.cookie(
      this._cookieRefreshTokenName,
      refreshToken,
      this._getRefreshTokenOptions()
    );
  }

  clearToken(res: Response) {
    res.clearCookie(this._cookieTokenName, this._getTokenOptions());
  }

  clearRefreshToken(res: Response) {
    res.clearCookie(
      this._cookieRefreshTokenName,
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
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    };
  }
}
