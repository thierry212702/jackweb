import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import Contact from '../models/Contact.js';
import PodcastEpisode from '../models/PodcastEpisode.js';
import Book from '../models/Book.js';
import User from '../models/User.js';

const router = express.Router();

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/stats', protect, admin, async (req, res) => {
  try {
    const [
      totalContacts,
      contactsByStatus,
      contactsByUrgency,
      recentContacts,
      totalPodcasts,
      totalBooks,
      totalUsers,
      contactsThisMonth
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Contact.aggregate([
        { $group: { _id: '$urgency', count: { $sum: 1 } } }
      ]),
      Contact.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('assignedTo', 'name email'),
      PodcastEpisode.countDocuments(),
      Book.countDocuments(),
      User.countDocuments(),
      Contact.countDocuments({
        createdAt: {
          $gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
        }
      })
    ]);

    // Contact trends (last 7 days)
    const contactTrends = await Contact.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 7))
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalContacts,
        contactsThisMonth,
        contactsByStatus: contactsByStatus.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        contactsByUrgency: contactsByUrgency.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        recentContacts,
        totalPodcasts,
        totalBooks,
        totalUsers,
        contactTrends
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/dashboard/contact-analytics
// @desc    Get detailed contact analytics
// @access  Private/Admin
router.get('/contact-analytics', protect, admin, async (req, res) => {
  try {
    const analytics = await Contact.aggregate([
      {
        $facet: {
          byCaseType: [
            { $group: { _id: '$caseType', count: { $sum: 1 } } }
          ],
          byMonth: [
            {
              $group: {
                _id: {
                  year: { $year: '$createdAt' },
                  month: { $month: '$createdAt' }
                },
                count: { $sum: 1 }
              }
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 12 }
          ],
          responseTime: [
            { $match: { status: { $ne: 'new' } } },
            {
              $project: {
                responseTime: {
                  $divide: [
                    { $subtract: ['$updatedAt', '$createdAt'] },
                    3600000 // Convert to hours
                  ]
                }
              }
            },
            {
              $group: {
                _id: null,
                avgResponseTime: { $avg: '$responseTime' },
                maxResponseTime: { $max: '$responseTime' },
                minResponseTime: { $min: '$responseTime' }
              }
            }
          ]
        }
      }
    ]);

    res.json({
      success: true,
      data: analytics[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;