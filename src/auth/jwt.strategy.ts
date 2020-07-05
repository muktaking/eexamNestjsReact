import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
//import { Model } from "mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

//import { jwtPayload} from "./jwt.interface";
import { User } from "../users/user.model";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        'o7D+?wq::jKxyqX<[.j>+B2ij{w2y@S+"CpQ[l2ad0{;hf36+~g$KtEd-Ts>y:~'
    });
  }

  async validate(payload: any) {
    return { email: payload.email, id: payload.id, role: payload.role };
  }
}
