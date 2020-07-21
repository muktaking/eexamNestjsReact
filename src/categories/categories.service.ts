import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as config from "config";
import * as _ from "lodash";

import { Category } from "./category.model";
import { createCategoryDto } from "./dto/category.dto";
import { firstltrCapRestLow, to, deleteImageFile } from "../utils/utils";

const serverConfig = config.get("server");
const SERVER_URL = `${serverConfig.url}:${serverConfig.port}/`;

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel("Category") private readonly CategoryModel: Model<Category>
  ) {}

  async findAllCategories() {
    const [err, categories] = await to(
      this.CategoryModel.find({}, { __v: 0 }).sort({
        slug: 1,
      })
    ); // fetch categories with name property and sort by name in ascending order;
    if (err) throw new InternalServerErrorException();
    //function to storing category according to their hierarchy
    let catHierarchy: Array<any> = [];
    categories.forEach((element, index, arr) => {
      let child = arr.filter((e) => {
        return element._id.equals(e.parentId);
      }); //store child into parent
      if (child.length > 0) {
        element.child = child;
      }
      if (element.parentId === null) {
        catHierarchy.push(element);
      }
    });
    return { categories, catHierarchy };
  }
  async findCategoryBySlug(slug: string) {
    const [err, category] = await to(
      this.CategoryModel.findOne({ slug: slug }, { __v: 0, _id: 0 })
    );
    if (err) throw new InternalServerErrorException();

    return category;
  }
  async createCategory(categoryDto: createCategoryDto, image: any) {
    let { name, description, parentId, order } = categoryDto;
    name = firstltrCapRestLow(name);
    order = +order;
    parentId = parentId === "Top" ? null : parentId;
    const imageUrl = image.filename;

    try {
      let [parent] = await this.CategoryModel.find({
        _id: parentId,
      });

      let slug = parentId ? parent.slug : "Top";
      slug = slug + "_" + name;

      //create a new category and save in db
      let category = new this.CategoryModel({
        name,
        slug,
        description,
        parentId,
        order,
        imageUrl,
      });

      let result = await category.save();
      return result;
    } catch (error) {
      deleteImageFile(imageUrl);
      if (error.code == 11000) {
        throw new ConflictException(`This category is already exist.`);
      } else throw new InternalServerErrorException();
    }
  }

  async updateCategory(id: string, categoryDto: createCategoryDto, image: any) {
    let { name, description, parentId, order, slug } = categoryDto;

    name = firstltrCapRestLow(name);
    let newCategorySlug;
    parentId = parentId !== "Top" ? parentId : null;
    try {
    } catch (error) {}
    const [err, [oldCategory]] = await to(this.CategoryModel.find({ _id: id }));
    if (err) {
      if (image) deleteImageFile(image.filename);
      throw new InternalServerErrorException();
    }

    if (_.isEqual(oldCategory.parentId.toString(), parentId)) {
      const [duplicateCategory] = await this.CategoryModel.find({
        name: name,
        slug: slug,
        parentId: parentId,
      });

      if (duplicateCategory) {
        duplicateCategory.description = description;
        duplicateCategory.order = order;
        if (image) duplicateCategory.imageUrl = image.filename;
        const [err, res] = await to(duplicateCategory.save());

        if (res) return { msg: "category updated successully" };
        if (image) deleteImageFile(image.filename);
        if (err)
          throw new ConflictException(
            "Category by this name is already present"
          );
      } else {
        if (image) deleteImageFile(image.filename);
        //if (err)
        throw new ConflictException("Category by this name is already present");
      }
    }

    let childCategories = await this.CategoryModel.find({
      $or: [{ _id: id }, { parentId: id }],
    }).sort({ slug: 1 });

    let NewParentCategory;
    if (parentId) {
      [NewParentCategory] = await this.CategoryModel.find({ _id: parentId });
    }
    if (childCategories) {
      childCategories.forEach((element) => {
        if (element._id.equals(id)) {
          element.name = name;
          element.description = description;
          if (image) {
            element.imageUrl = image.filename;
          }

          element.order = +order;
          element.parentId = parentId !== "Top" ? parentId : null;
          newCategorySlug = element.slug = parentId
            ? NewParentCategory.slug + "_" + name
            : "Top_" + name;
          return;
        }

        element.slug =
          newCategorySlug + element.slug.split(oldCategory.name)[1];
      });
      try {
        childCategories.forEach(async (element) => {
          await element.save();
        });

        return { msg: "Category updated successfully" };
      } catch (error) {
        console.log(error);
        deleteImageFile(image.filename);
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteCategoryById(id: string) {
    const [err, [categoryToDelete]] = await to(
      this.CategoryModel.find({ _id: id })
    );
    if (err) {
      throw new InternalServerErrorException();
    }

    if (categoryToDelete) {
      const childCategories = await this.CategoryModel.find({ parentId: id });
      childCategories.forEach(async (element) => {
        element.parentId = categoryToDelete.parentId;
        element.slug = element.slug.replace(
          "_" + categoryToDelete.name + "_",
          "_"
        );
        try {
          await element.save();
        } catch (error) {
          console.log(error);
        }
      });
      try {
        await this.CategoryModel.deleteOne({ _id: id });
        deleteImageFile(categoryToDelete.imageUrl);
        //
        // const haveAnyQuestion = await QuestionModel.findOne({category: catId});
        // if(haveAnyQuestion){
        //     if(categoryToDelete.parentId === null){
        //         let [checkOthers] = await Category.find({name: 'Others', parentId: null});
        //         if(!checkOthers){
        //             checkOthers = new Category({
        //                 name: 'Others',
        //                 parentId: null,
        //                 slug: 'Top / Others',
        //                 order: 10000,
        //                 catDescribe: 'All other non-categorized topics'
        //             })
        //             checkOthers = await checkOthers.save();
        //         }
        //         await QuestionModel.updateMany({category: catId},{$set:{category: checkOthers._id}});
        //         return res.redirect('/category');
        //     }
        //     await Question.updateMany({category: catId},{$set:{category: categoryToDelete.parentId}});
        //     return res.redirect('/category');
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }

      //
      //return res.redirect('/category');
    }
  }
}
