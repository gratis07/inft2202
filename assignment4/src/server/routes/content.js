import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.send('Home'));
router.get('/about', (req, res) => res.send('About'));
router.get('/contact', (req, res) => res.send('Contact'));

export default router;
