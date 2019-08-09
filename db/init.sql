CREATE TABLE "fc_users" (
	"user_id" serial NOT NULL,
	"username" varchar(200) NOT NULL UNIQUE,
	"password" varchar(200) NOT NULL
	
);

CREATE TABLE "fc_posts" (
	"post_id" serial NOT NULL,
	"post_author" varchar(200) NOT NULL,
	"post_content" varchar(500) NOT NULL
	
);