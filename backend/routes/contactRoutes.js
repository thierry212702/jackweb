import express from 'express';
import Contact from '../models/Contact.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Submit contact form
router.post('/',
  [
    body('name').notEmpty().trim().escape().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('message').notEmpty().trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    try {
      const contact = new Contact(req.body);
      const savedContact = await contact.save();
      
      res.status(201).json({ 
        success: true,
        message: 'Contact form submitted successfully',
        data: {
          id: savedContact._id,
          name: savedContact.name,
          status: savedContact.status
        }
      });
    } catch (error) {
      console.error('Contact submission error:', error);
      res.status(500).json({ 
        success: false,
        message: error.message 
      });
    }
  }
);

// Get contact by ID (for tracking)
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .select('name email status urgency message createdAt');
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;