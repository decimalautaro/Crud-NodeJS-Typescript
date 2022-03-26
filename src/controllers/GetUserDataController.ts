import { Request, Response } from "express";
import { GetUserDataService } from "../services/GetUserDataService";

class GetUserDataController {
  async handle(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const getUserDataService = new GetUserDataService();

    const user = await getUserDataService.getData(id);

    return response.render("edit", {
      user: user
    });
  }
}

export { GetUserDataController };