import Subscription from '../models/subscription.model.js'
import { workflowClient } from '../config/upstash.js';

export const createSubscription = async(req, res, next) => {
    try{
        const subscription = await Subscription.create({
            ... req.body,
            user: req.user._id,
        })
        await workflowClient.trigger({
            url: '${SERVER_URL}'
        })

        const {workflowRunId} = await workflowClient.trigger({
            url: '${SERVER_URL}/api/v1/workflows/subscriptions/reminder',
            body:{
                subscriptionId:subscription.id,
            },
            headers:{
                'content-type':'application/json',
            },
            retries:0,
        })

        res.status(201).json({success: true, data:subscription, workflowRunId});
    }catch(e){
        next(e);
    }
}

export const getUserSubscriptions = async(req,res,next) => {
    try{
        //Check if the user is same as the one in the token 
        if(req.user.id != req.params.id){
            const error = new Error('You  are not the owner of this account');
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({user:req.params.id});

        res.status(200).json({success: true, data: subscriptions});
    }catch(e){
        next(e);
    }
}

export const getSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({
            user: req.user._id,
        });

        res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions,
        });
    } catch (e) {
        next(e);
    }
}

export const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error('Subscription not found');
            error.status = 404;
            throw error;
        }

        // Ensure the logged-in user owns this subscription
        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error('Unauthorized');
            error.status = 403;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: subscription,
        });
    } catch (e) {
        next(e);
    }
};