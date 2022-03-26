import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class GetUserDataService {
  async getData(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    return user;
  }
}

export { GetUserDataService };