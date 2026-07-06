import {Router} from 'express';
const userRouter = Router();

userRouter.get('/', (req, res) => res.send({ title: 'GET all Users' }));
userRouter.get('/:id', (req, res) => res.send({ title: 'GET User details' }));
userRouter.post('/', (req, res) => res.send({ title: 'Create new User' }));
userRouter.put('/:id', (req, res) => res.send({ title: 'Update User ' }));
userRouter.delete('/:id', (req, res) => res.send({ title: 'Delete User ' }));

export default userRouter;