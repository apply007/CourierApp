import { Router } from 'express';
import { auth, permit } from '../middlewares/auth.js';
import { listUsers, listParcels, assignAgent, analytics, exportReport, updateParcelStatus, updateParcelPayment } from '../controllers/admin.controller.js';

const router = Router();
router.use(auth, permit('admin'));

router.get('/users', listUsers);
router.get('/parcels', listParcels);
router.post('/assign/:code', assignAgent);
router.get('/analytics', analytics);
router.get('/export', exportReport);

router.patch('/parcels/:id/status', updateParcelStatus);
router.patch('/parcels/:id/payment', updateParcelPayment);


export default router;
