import UserService from "../../services/user.service";
import { Request, Response } from "express";
import { User } from "../../entity/User";

export class Controller {
  
  all(req: Request, res: Response): void {
    UserService.all().then(r => {
        res.json(r);
      });
  }

  byId(req: Request, res: Response): void {
    const user = new User();
    user.id = req.params.id;
    UserService.findById(user).then(r => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    const user = new User();
    user.loginName = req.body.name;
    user.password = req.body.password;
    UserService.create(user).then(r =>
      res
        .status(201)
        // .location(`/api/v1/examples/${r.id}`)
        .json(r)
    );
  }
}
export default new Controller();
