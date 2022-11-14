import express from 'express'
const router = express.Router()
import { getFeatures } from '../controllers/featureController.js'

router.route('/').get(getFeatures)

export default router