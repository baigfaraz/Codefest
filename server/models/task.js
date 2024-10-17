import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
        maxlength: 255
    },
    description: {
        type: String
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    estimatedTime: {
        type: Number,
        default: 0
    },
    taskStatus: {
        type: String,
        enum: ['not_started', 'in_progress', 'completed'],
        default: 'not_started'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

// module.exports = mongoose.model('Task', taskSchema);
const Task = mongoose.model('Task', taskSchema);
export default Task;
