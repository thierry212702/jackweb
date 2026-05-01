import mongoose from 'mongoose';
import PodcastEpisode from '../models/PodcastEpisode.js';
import dotenv from 'dotenv';

dotenv.config();

const sampleEpisodes = [
  {
    title: "Statute of Limitations: Don't Wait Too Long!",
    description: "Understanding critical deadlines in your case",
    legalTopic: "Civil Procedure",
    audioUrl: "https://example.com/episode1.mp3",
    duration: "32:15",
    episodeNumber: 1,
    keyTakeaways: ["Know your deadlines", "File early", "Consult immediately"]
  },
  {
    title: "Employment Rights: Wrongful Termination",
    description: "What to do if you've been unfairly fired",
    legalTopic: "Employment Law",
    audioUrl: "https://example.com/episode2.mp3",
    duration: "45:22",
    episodeNumber: 2,
    keyTakeaways: ["Document everything", "Know your contract", "Seek counsel"]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await PodcastEpisode.deleteMany({});
    await PodcastEpisode.insertMany(sampleEpisodes);
    console.log('Database seeded!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedDatabase();