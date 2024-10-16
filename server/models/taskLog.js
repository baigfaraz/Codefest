import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskLogSchema = new mongoose.Schema({
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    logTime: {
        type: Date,
        default: Date.now
    },
    action: {
        type: String,
        enum: ['start', 'end'],
        required: true
    }
});

// module.exports = mongoose.model('TaskLog', taskLogSchema);
const TaskLog = mongoose.model('TaskLog', taskLogSchema);
export default TaskLog;
