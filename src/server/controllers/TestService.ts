import { Request, Response } from 'express';

export class TestController {

  public async Get(req: Request, res: Response) {
    try {
      const data = 'Hello World'

      res.status(200).send({ code: 200, message: '', data: data });
    } catch (e) {
      res.status(500).send({ code: 500, message: `Internal server error` });
    }
  }
}
