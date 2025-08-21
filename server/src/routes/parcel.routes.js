import { Router } from 'express';
import { auth, permit } from '../middlewares/auth.js';
import { createParcel, myParcels, trackPublic, updateStatus } from '../controllers/parcel.controller.js';

const router = Router();

// customer
router.post('/', auth, permit('customer'), createParcel);
router.get('/me', auth, permit('customer'), myParcels);

// public tracking
router.get('/track/:code', trackPublic);

// agent/customer status update (agent required)
router.patch('/status/:code', auth, permit('agent','admin'), updateStatus);

export default router;
