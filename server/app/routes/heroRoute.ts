import express from 'express';
import * as HeroImageController from '../controllers/heroImageController.js';

const router = express.Router();

router.post('/image', HeroImageController.createHeroImage as any);
router.get('/image', HeroImageController.getAllHeroImages as any);
router.get('/image/:id', HeroImageController.getHeroImageById as any);
router.put('/image/:id', HeroImageController.updateHeroImage as any);
router.delete('/image/:id', HeroImageController.deleteHeroImage as any);

export default router;
