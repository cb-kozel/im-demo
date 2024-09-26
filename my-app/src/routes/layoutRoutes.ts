import { Router } from 'express';
import LayoutController from '../controllers/layoutController';
import { validateLayout } from '../validators/layoutValidator';

const router = Router();

router.post('/', validateLayout, LayoutController.saveLayout);
router.get('/:layoutId', LayoutController.getLayoutById);
router.get('/default', LayoutController.getDefaultLayout);
router.delete('/:layoutId', LayoutController.deleteLayout);

export default router;
