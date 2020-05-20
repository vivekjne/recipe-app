import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Category } from "../entity/Category";

interface Query {
  where: Object;
  select: string[];
}
class CategoryController {
  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    console.log(req.query);

    let query: Object = { ...req.query };

    let specialParams = ["select", "page", "limit"];
    for (let param in query) {
      if (specialParams.includes(param)) {
        delete query[param];
      }
    }
    if (Object.keys(query).length > 0) {
      query = { where: query, select: [] };
    }
    if (req.query.select) {
      query["select"] = req.query.select.toString().split(",");
    }

    query["take"] = +req.query.limit || 10;

    const page = +req.query.page || 1;

    query["skip"] = page * query["take"] - query["take"];

    console.log("new query=", query);
    const categoryRepository = getRepository(Category);
    try {
      const categories = await categoryRepository.find(query);

      //Send the users object
      res.status(200).json({ data: categories, status: true });
    } catch (error) {
      res.status(500).json({ error, status: false });
    }
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const categoryRepository = getRepository(Category);
    const id: string | number = req.params.id;

    try {
      const category = await categoryRepository.findOneOrFail(id);
      if (category) {
        res.status(200).json({ data: category, status: true });
      } else {
        res
          .status(404)
          .json({ error: `Cannot find category with id ${id}`, status: false });
      }
    } catch (error) {
      res.status(500).json({ error, status: false });
    }
  };

  static newCategory = async (req: Request, res: Response) => {
    //Get parameters from the body
    const categoryRepository = getRepository(Category);
    let { category_name, description } = req.body;
    let category = new Category();
    category.category_name = category_name;
    category.description = description;
    category.category_image = "https://via.placeholder.com/350x150";

    //Validade if the parameters are ok
    const errors = await validate(category);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Hash the password, to securely store on DB

    //Try to save. If fails, the username is already in use

    try {
      await categoryRepository.save(category);
    } catch (e) {
      res
        .status(409)
        .json({ data: `Category with name ${category_name} already exists` });
      return;
    }

    //If all ok, send 201 response
    res.status(201).json({
      status: true,
      data: `Category ${category_name} created successfully!`,
    });
  };

  static deleteCategory = async (req: Request, res: Response) => {
    const categoryRepository = getRepository(Category);
    //Get the ID from the url
    const id = req.params.id;

    let category: Category;
    try {
      category = await categoryRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }
    categoryRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).json({
      data: `Category ${category.category_name} deleted successfully!`,
      status: true,
    });
  };
}

export default CategoryController;
