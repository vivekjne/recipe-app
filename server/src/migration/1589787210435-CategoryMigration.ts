import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryMigration1589787210435 implements MigrationInterface {
  name = "CategoryMigration1589787210435";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `category` (`id` int NOT NULL AUTO_INCREMENT, `category_name` varchar(255) NOT NULL, `category_image` varchar(255) NOT NULL, `description` text NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, UNIQUE INDEX `IDX_9359e3b1d5e90d7a0fbe3b2807` (`category_name`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    );
    await queryRunner.query(
      "INSERT INTO `category` (`category_name`,`category_image`,`description`) VALUES ('Vegetarian','https://images.theconversation.com/files/291667/original/file-20190910-109927-gmdi8q.jpg?ixlib=rb-1.1.0&rect=40%2C0%2C4500%2C2997&q=45&auto=format&w=496&fit=clip','Vegetarian food is good for health.'),('Non Vegetarian','https://www.archanaskitchen.com/images/archanaskitchen/0-Archanas-Kitchen-Recipes/2019/high_protein_nonveg.png','Non Vegetarian food is tasty.');"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "DROP INDEX `IDX_9359e3b1d5e90d7a0fbe3b2807` ON `category`",
      undefined
    );
    await queryRunner.query("DROP TABLE `category`", undefined);
  }
}
