import ExamplesService from "../../services/examples.service";
import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { User } from "../../entity/User";

export class Controller {
  all(req: Request, res: Response): void {
    getConnection().getRepository(User)
      .find()
      .then(r => {
        res.json(r);
      });
  }

  byId(req: Request, res: Response): void {
    ExamplesService.byId(req.params.id).then(r => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    ExamplesService.create(req.body.name).then(r =>
      res
        .status(201)
        .location(`/api/v1/examples/${r.id}`)
        .json(r)
    );
  }
}
export default new Controller();
