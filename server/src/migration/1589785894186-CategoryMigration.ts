import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { Category } from "../entity/Category";
export class CategoryMigration1589785894186 implements MigrationInterface {
  private category = getRepository(Category);
  public async up(queryRunner: QueryRunner): Promise<any> {
    this.category
      .createQueryBuilder()
      .insert()
      .values([
        {
          category_name: "Vegetarian",
          category_image:
            "https://images.theconversation.com/files/291667/original/file-20190910-109927-gmdi8q.jpg?ixlib=rb-1.1.0&rect=40%2C0%2C4500%2C2997&q=45&auto=format&w=496&fit=clip",
          deleted_at: null,
          description: "Vegetarian food is good for health.",
        },

        {
          category_name: "Non-Vegetarian",
          category_image:
            "https://www.archanaskitchen.com/images/archanaskitchen/0-Archanas-Kitchen-Recipes/2019/high_protein_nonveg.png",
          deleted_at: null,
          description: "Non Vegetarian food is tasty.",
        },
      ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    this.category.createQueryBuilder().delete();
  }
}
