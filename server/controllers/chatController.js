import TeamChat from '../models/teamChat.js';
import ProjectMember from '../models/projectMember.js';

// Controller for sending a message in project chat
const sendMessage = async (req, res) => {
    const { projectId, message } = req.body;
    const userId = req.user._id;  // Assuming authentication middleware provides the user ID
    try {
        // Check if the user is a member of the project
        const isMember = await ProjectMember.findOne({ projectId, userId });

        if (!isMember) {
            return res.status(403).json({ error: 'You are not a member of this project' });
        }

        // Create and save the new chat message
        const newMessage = new TeamChat({ projectId, userId, message });
        await newMessage.save();

        res.status(201).json({ message: 'Message sent successfully', chat: newMessage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to get all chat messages for a project
const getChatMessages = async (req, res) => {
    const { projectId } = req.body;
    const userId = req.user._id;

    try {
        // Check if the user is a member of the project
        const isMember = await ProjectMember.findOne({ projectId, userId });

        if (!isMember) {
            return res.status(403).json({ error: 'You are not a member of this project' });
        }

        // Fetch all chat messages for the project
        const chatMessages = await TeamChat.find({ projectId })
            .populate('userId', 'name')  // Populate user details (e.g., name)
            .sort({ dateSent: 1 });  // Sort messages by date (oldest first)

        res.status(200).json(chatMessages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { sendMessage, getChatMessages };