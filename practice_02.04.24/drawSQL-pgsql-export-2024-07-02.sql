CREATE TABLE "product_image"(
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "product_image" ADD PRIMARY KEY("id");
CREATE TABLE "wishlist"(
    "id" SERIAL NOT NULL,
    "user_account_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
CREATE INDEX "wishlist_user_account_id_product_id_index" ON
    "wishlist"("user_account_id", "product_id");
ALTER TABLE
    "wishlist" ADD PRIMARY KEY("id");
CREATE TABLE "review"(
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "user_account_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
CREATE INDEX "review_product_id_user_account_id_index" ON
    "review"("product_id", "user_account_id");
ALTER TABLE
    "review" ADD PRIMARY KEY("id");
CREATE TABLE "product"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "decription" TEXT NOT NULL,
    "price" DECIMAL(10, 2) NOT NULL,
    "stock_quantity" BIGINT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
CREATE INDEX "product_category_id_index" ON
    "product"("category_id");
ALTER TABLE
    "product" ADD PRIMARY KEY("id");
CREATE TABLE "order_item"(
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(8, 2) NOT NULL,
    "total" DECIMAL(8, 2) NOT NULL,
    "product_id" INTEGER NOT NULL
);
CREATE INDEX "order_item_order_id_product_id_index" ON
    "order_item"("order_id", "product_id");
ALTER TABLE
    "order_item" ADD PRIMARY KEY("id");
CREATE TABLE "category"(
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "category" ADD PRIMARY KEY("id");
CREATE TABLE "user_account"(
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "adress" TEXT NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
CREATE INDEX "user_account_email_index" ON
    "user_account"("email");
ALTER TABLE
    "user_account" ADD PRIMARY KEY("id");
CREATE TABLE "order"(
    "id" SERIAL NOT NULL,
    "user_account_id" INTEGER NOT NULL,
    "order_date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "total" DECIMAL(10, 2) NOT NULL
);
CREATE INDEX "order_user_account_id_index" ON
    "order"("user_account_id");
ALTER TABLE
    "order" ADD PRIMARY KEY("id");
ALTER TABLE
    "order_item" ADD CONSTRAINT "order_item_order_id_foreign" FOREIGN KEY("order_id") REFERENCES "order"("id");
ALTER TABLE
    "wishlist" ADD CONSTRAINT "wishlist_user_account_id_foreign" FOREIGN KEY("user_account_id") REFERENCES "user_account"("id");
ALTER TABLE
    "order" ADD CONSTRAINT "order_user_account_id_foreign" FOREIGN KEY("user_account_id") REFERENCES "user_account"("id");
ALTER TABLE
    "review" ADD CONSTRAINT "review_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "product"("id");
ALTER TABLE
    "wishlist" ADD CONSTRAINT "wishlist_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "product"("id");
ALTER TABLE
    "order_item" ADD CONSTRAINT "order_item_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "product"("id");
ALTER TABLE
    "review" ADD CONSTRAINT "review_user_account_id_foreign" FOREIGN KEY("user_account_id") REFERENCES "user_account"("id");
ALTER TABLE
    "product" ADD CONSTRAINT "product_category_id_foreign" FOREIGN KEY("category_id") REFERENCES "category"("id");
ALTER TABLE
    "product_image" ADD CONSTRAINT "product_image_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "product"("id");