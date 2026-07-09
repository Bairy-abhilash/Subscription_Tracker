import {Router} from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { getAllUsers, getUser } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', getAllUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => res.send({ title: 'Create new User' }));

userRouter.put('/:id', (req, res) => res.send({ title: 'Update User ' }));

userRouter.delete('/:id', (req, res) => res.send({ title: 'Delete User ' }));

export default userRouter;