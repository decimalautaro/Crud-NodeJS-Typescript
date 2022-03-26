import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class ListUsersService {
  async list() {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return users;
  }
}

export { ListUsersService };