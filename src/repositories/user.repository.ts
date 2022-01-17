import db from "../db";
import User from "../models/user.model";

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const query = `
      SELECT uuid, username 
      FROM app_auth_user
    `;
    const { rows } = await db.query<User>(query);
    return rows || [];
  }
  
  async findById(uuid: string): Promise<User> {
    const query = `
      SELECT uuid, username 
      FROM app_auth_user
      WHERE uuid = $1
    `;
    const values = [uuid];
    const { rows } = await db.query<User>(query, values);
    const [user] = rows;

    return user;
  }

  async create(user: User): Promise<string> {
    const query = `
      INSERT INTO app_auth_user(
        username,
        password
      )
      VALUES ($1,crypt($2,'my_salt'))
      RETURNING uuid
    `;
    const values = [user.username, user.password];
    const { rows } = await db.query<{ uuid: string }>(query, values);
    const [newuser] = rows;
    return newuser.uuid;
  }
}

export default new UserRepository();