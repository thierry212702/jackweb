import mongoose from 'mongoose';

const podcastEpisodeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: String,
  legalTopic: {
    type: String,
    required: [true, 'Legal topic is required']
  },
  audioUrl: String,
  duration: String,
  episodeNumber: {
    type: Number,
    unique: true
  },
  releaseDate: {
    type: Date,
    default: Date.now
  },
  transcript: String,
  keyTakeaways: [String],
  isPublished: {
    type: Boolean,
    default: true
  },
  listenCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('PodcastEpisode', podcastEpisodeSchema);