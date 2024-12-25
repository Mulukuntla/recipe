const follows= require("../models/follow")
const User= require("../models/user")

const activity= require("../models/activity")
const follow=async (req, res) => {
    const followerId = req.user.id;
    const followedId = req.params.userId;
  
    if (followerId === followedId) {
      return res.status(400).json({ error: 'You cannot follow yourself.' });
    }
  
    try {
      const existingFollow = await follows.findOne({
        where: { followerId, followedId },
      });
  
      if (existingFollow) {
        return res.status(400).json({ error: 'Already following this user.' });
      }
  
      await follows.create({ followerId, followedId });
      res.status(200).json({ message: 'Successfully followed the user.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to follow user.' });
    }
  };




const feed=async (req, res) => {
    const userId = req.user.id;
  
    try {
      // Get a list of user IDs that the current user is following
      const followedUsers = await follows.findAll({
        where: { followerId: userId },
        attributes: ['followedId'],
      });
  
      const followedUserIds = followedUsers.map(follow => follow.followedId);
  
      // Get activities of followed users
      const activities = await activity.findAll({
        where: { userId: followedUserIds },
        include: [
          { model: User, attributes: ['id', 'userName'] },
        ],
        order: [['createdAt', 'DESC']], // Order by most recent activity
      });
  
      res.status(200).json(activities);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to fetch activity feed.' });
    }
  };
  const activitys=async (req, res) => {
    try {
      const { userId, activityType, description } = req.body;
      console.log(userId,activityType,description)
  
      const newActivity = await activity.create({ userId, action:activityType, description });
  
      res.status(201).json(newActivity);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to log activity.' });
    }
  };
  module.exports={
    follow,
    feed,
    activitys,
  }