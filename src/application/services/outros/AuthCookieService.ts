import { CookieConstants } from "@/shared/constants/cookies.consts";
import { CookieOptions, Response } from "express";

export class AuthCookieService {
  setToken(res: Response, token: string) {
    res.cookie(CookieConstants.cookieTokenName, token, this._getTokenOptions());
  }

  setRefreshToken(res: Response, refreshToken: string) {
    res.cookie(
      CookieConstants.cookieRefreshTokenName,
      refreshToken,
      this._getRefreshTokenOptions()
    );
  }

  clearToken(res: Response) {
    res.clearCookie(CookieConstants.cookieTokenName, this._getTokenOptions());
  }

  clearRefreshToken(res: Response) {
    res.clearCookie(
      CookieConstants.cookieRefreshTokenName,
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
