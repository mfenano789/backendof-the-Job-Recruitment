const mongoose = require('mongoose');   

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['jobSeeker', 'employer'], required: true },
    profile: {
        bio: { type: String },
        skills: [String],
        resumeUrl: { type: String }
    }
});

module.exports = mongoose.model('User', userSchema);
// Compare this snippet from job-recruitment-backend/models/Job.js: