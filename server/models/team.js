import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        maxlength: 100
    },
    workspaceId: {
        type: Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    },
    teamLeadId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

// module.exports = mongoose.model('Team', teamSchema);
const Team = mongoose.model('Team', teamSchema);
export default Team;
