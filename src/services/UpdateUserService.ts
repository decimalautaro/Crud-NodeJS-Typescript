import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUser {
  id: string
  username: string;
  email: string;
  telefone: string;
  cidade: string;
  estado: string;
}

class UpdateUserService {
  async update({ id, username, email, telefone, cidade, estado }: IUser) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ username, email, telefone, cidade, estado })
      .where("id = :id", { id })
      .execute();

    return user;

  }
}

export { UpdateUserService };