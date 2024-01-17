import express from 'express';
import { body } from 'express-validator';
import validatePayload from './middleware/validatePayload.js';
import {RegistrationController} from './controllers/registrationController.js';

const registration = new RegistrationController();

export const router = express.Router();

router.get('/registration', registration.getHtmlForm);
router.post(
  '/registration',  [
    body('userDate').isString(),
    body('userDoc').isString(),
    body('userEmail').isString(),
    body('userName').isString(),
    body('userPassword').isString(),
    body('userPhone').isString(),
    body('userType').isString(),
  ],
  validatePayload,
  registration.postRegistration
);



