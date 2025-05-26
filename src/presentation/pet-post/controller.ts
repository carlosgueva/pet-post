import { Request, Response } from 'express';
import { CreatorPetPostService } from './services/creator-pet-post.service';
import { FinderPetPostService } from './services/finder-pet-post.service';
import { ApprovePetPostService } from './services/approve-pet-post.service';
import { RejectPetPostService } from './services/reject-pet-post.service';
import { UpdatePetPostService } from './services/update-pet-post.service';
import { EliminatorPetPostService } from './services/eliminator-pet-post.service';

export class PetPostController {
  constructor(
    private readonly creatorPetPostService: CreatorPetPostService,
    private readonly finderPetPostService: FinderPetPostService,
    private readonly approvePetPostService: ApprovePetPostService,
    private readonly rejectPetPostService: RejectPetPostService,
    private readonly updatePetPostService: UpdatePetPostService,
    private readonly eliminatorPetPostService: EliminatorPetPostService,
  ) {}

  create = (req: Request, res: Response) => {
    this.creatorPetPostService
      .execute(req.body)
      .then((petPost) => res.status(201).json(petPost))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  };

  findAll = (req: Request, res: Response) => {
    this.finderPetPostService
      .executeByFindAll()
      .then((petPost) => res.status(200).json(petPost))
      .catch((error) => {
        res.status(500).json({ message: 'Internal Server Error' });
      });
  };

  findOne = (req: Request, res: Response) => {
    const { id } = req.params;
    this.finderPetPostService
      .executeByFindOne(id)
      .then((petPost) => res.status(200).json(petPost))
      .catch((error) => {
        res.status(500).json({ message: 'Internal Server Error' });
      });
  };

  approve = (req: Request, res: Response) => {
    const { id } = req.params;
    this.approvePetPostService
      .execute(id)
      .then((petPost) => res.status(200).json(petPost))
      .catch((error) => {
        res.status(500).json({ message: 'Internal Server Error' });
      });
  };

  reject = (req: Request, res: Response) => {
    const { id } = req.params;
    this.rejectPetPostService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  };

  update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    this.updatePetPostService
      .execute(id, data)
      .then((result) => res.status(200).json(result))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  };

  delete = async (req: Request, res: Response) => {
    const id = req.params.id;

    this.eliminatorPetPostService
      .execute(id)
      .then((result) => res.status(200).json(result))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  };
}
