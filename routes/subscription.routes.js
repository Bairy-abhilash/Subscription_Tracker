import {Router} from 'express';
import { createSubscription, getUserSubscriptions, getSubscriptions, getSubscriptionById } from '../controllers/subscription.controller.js'
import authorize from '../middlewares/auth.middleware.js'

const subscriptionRouter = Router();

subscriptionRouter.get('/', authorize, getSubscriptions );

subscriptionRouter.get('/:id', authorize, getSubscriptionById );

subscriptionRouter.post('/', authorize, createSubscription );

subscriptionRouter.put('/:id', (req, res) => res.send({ title: 'Update Subscription ' }));

subscriptionRouter.delete('/:id', (req, res) => res.send({ title: 'Delete Subscription ' }));

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title: 'Cancel user Subscription '}));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title: 'GET upcoming renewals '}));

export default subscriptionRouter;