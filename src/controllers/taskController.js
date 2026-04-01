const Task = require("../models/Task")



const resolveAssignedUserId = async (assignedUserId) => {
    if (!assignedUserId) {
        return { id: null };
    }
    const user = await User.findById(assignedUserId);
    if (!user) {
        return { error: "Assigned user not found." };
    }
    return { id: user._id };
};


const createTask = async (req, res) => {
    try {
        console.log(req.body);
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized." });
        }
        const { title, description, done, priority, assignedUserId } = req.body;
        console.log(title, description, done, priority, assignedUserId);
        if (!title) {
            return res.status(400).json({ message: "Title is required!" });
        }
        const resolved = await resolveAssignedUserId(assignedUserId);
        console.log(resolved);
        if (resolved.error) {
            return res.status(400).json({ message: resolved.error });
        }
        const task = await Task.create({
            title,
            description,
            done,
            priority,
            assignedUserId: resolved.id,
            userId: req.user.id
        });
        return res.status(201).json({
            message: "Task created successfully!",
            data: { task }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while creating the task." });
    }
};



const getTasks = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized." });
        }
        const tasks = await Task.find({
            $or: [
                { userId: req.user.id },
                { assignedUserId: req.user.id }
            ]
        }).sort({ createdAt: -1 });
        console.log(tasks);
        return res.status(200).json({
            message: "Tasks fetched successfully.",
            data: { tasks }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error while fetching tasks." });
    }
}

module.exports = { createTask, getTasks };