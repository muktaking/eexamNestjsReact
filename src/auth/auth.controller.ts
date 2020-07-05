import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { AuthService } from "./auth.service";
import { createUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/user.model";
import { GetUser } from "./get-user.decorator";
import { UsersService } from "src/users/users.service";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post("/registration")
  async signUp(@Body(ValidationPipe) createUserDto: createUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard("local"))
  @Post("/login")
  async logIn(
    // @Body("email", ValidationPipe) email: string,
    // @Body("password", ValidationPipe) password: string,
    @Req() req
  ) {
    return this.authService.login(req.user);
    //return await this.usersService.validateUser(email, password);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post("/test")
  test(@Req() req) {
    return req.user;
  }
}
