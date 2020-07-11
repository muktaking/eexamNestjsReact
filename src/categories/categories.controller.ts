import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
  Res,
  Req,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { imageFileFilter, editFileName } from "../utils/file-uploading.utils";
import * as config from "config";
import { createCategoryDto } from "./dto/category.dto";
import { CategoriesService } from "./categories.service";
import { IsMongoId } from "class-validator";
import { AuthGuard } from "@nestjs/passport";

// const serverConfig = config.get('server');
// const SERVER_URL = `${serverConfig.url}:${serverConfig.port}/`

@Controller("categories")
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return await this.categoriesService.findAllCategories();
  }

  @Get("/*")
  async getCategory(@Req() req) {
    return await this.categoriesService.findCategoryBySlug(
      "Top_" + req.params[0].replace("/", "_")
    );
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads/images",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  async createCategory(
    @Body() createCategoryDto: createCategoryDto,
    @UploadedFile() image
  ) {
    console.log(createCategoryDto);
    if (!image) {
      throw new Error("Image is not Selected");
    }
    return await this.categoriesService.createCategory(
      createCategoryDto,
      image
    );
  }

  @Patch()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads/images",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  async updateCategory(
    @Body("id") id: string,
    @Body() createCategoryDto: createCategoryDto,
    @UploadedFile() image
  ) {
    return await this.categoriesService.updateCategory(
      id,
      createCategoryDto,
      image
    );
  }

  @Delete()
  @UseGuards(AuthGuard("jwt"))
  @UsePipes(ValidationPipe)
  async deleteCategoryById(@Body("id") id: string) {
    return await this.categoriesService.deleteCategoryById(id);
  }
}
