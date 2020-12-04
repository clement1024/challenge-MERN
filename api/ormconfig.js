const db_user = process.env.MYSQL_USER || 'root';
const db_password = process.env.MYSQL_ROOT_PASSWORD ||'';
const db_dbname = process.env.MYSQL_DATABASE || 'adfoodio';
module.exports = {
 name: 'default',
 type: 'mysql',
 host: 'localhost',
 username: db_user,
 password: db_password,
 database: db_dbname,
 synchronize: false,
 entities: [
   "src/models/*.ts"
 ],
 subscribers: [
   "src/subscribers/*.ts"
 ],
 migrations: [
   "src/migrations/*.ts"
 ],
 cli: {
   entitiesDir: "src/models",
   migrationsDir: "src/migrations",
   subscribersDir: "src/subscribers"
 }
};
