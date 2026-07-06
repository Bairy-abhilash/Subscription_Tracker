import {Router} from 'express';
const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({ title: 'GET all Subscriptions' }));
subscriptionRouter.get('/:id', (req, res) => res.send({ title: 'GET Subscription details' }));
subscriptionRouter.post('/', (req, res) => res.send({ title: 'Create new Subscription' }));
subscriptionRouter.put('/:id', (req, res) => res.send({ title: 'Update Subscription ' }));
subscriptionRouter.delete('/:id', (req, res) => res.send({ title: 'Delete Subscription ' }));

export default subscriptionRouter;