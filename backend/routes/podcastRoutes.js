import express from 'express';
import PodcastEpisode from '../models/PodcastEpisode.js';

const router = express.Router();

// GET all episodes
router.get('/', async (req, res) => {
  try {
    const episodes = await PodcastEpisode.find({ isPublished: true })
      .sort({ episodeNumber: -1 })
      .limit(20);
    
    res.json({
      success: true,
      count: episodes.length,
      data: episodes
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// GET single episode
router.get('/:id', async (req, res) => {
  try {
    const episode = await PodcastEpisode.findById(req.params.id);
    
    if (!episode) {
      return res.status(404).json({ 
        success: false,
        message: 'Episode not found' 
      });
    }

    // Increment listen count
    episode.listenCount += 1;
    await episode.save();

    res.json({
      success: true,
      data: episode
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

export default router;