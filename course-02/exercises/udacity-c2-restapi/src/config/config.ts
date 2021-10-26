export const config = {
  "dev": {
    "username": process.env.POSTGRESS_DEV_USERNAME,
    "password": process.env.POSTGRESS_DEV_PASSWORD,
    "database": process.env.POSTGRESS_DEV_DATABASE,
    "host": process.env.AWS_RDS_HOST_DEV,
    "dialect": "postgres",
    "aws_region": process.env.AWS_DEV_REGION,
    "aws_profile": process.env.AWS_DEV_PROFILE,
    "aws_media_bucket": process.env.AWS_S3_DEV_BUCKETNAME
  },
  "prod": {
    "username": process.env.POSTGRESS_PROD_USERNAME,
    "password": process.env.POSTGRESS_PROD_PASSWORD,
    "database": process.env.POSTGRESS_PROD_DATABASE,
    "host": process.env.AWS_RDS_HOST_PROD,
    "dialect": "postgres",
    "aws_region": process.env.AWS_PROD_REGION,
    "aws_profile": process.env.AWS_PROD_PROFILE,
    "aws_media_bucket": process.env.AWS_S3_PROD_BUCKETNAME
  },
  "jwt" : {
    "secret": process.env.JWT_SECRET
  }
}
