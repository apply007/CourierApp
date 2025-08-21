import { Router } from 'express';
import { auth, permit } from '../middlewares/auth.js';
import { myAssignments } from '../controllers/agent.controller.js';

const router = Router();
router.use(auth, permit('agent'));
router.get('/assignments', myAssignments);

export default router;
