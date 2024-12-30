import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        code: String,
        expiry: Date
    },
    githubUrl: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    skills: { type: [String], default: [] },
    projects: {
        type: [{
            name: String,
            url: String
        }],
        default: []
    },
    certificates: { type: [String], default: [] },
    languages: {
        type: [{
            name: String,
            proficiency: String
        }],
        default: []
    },
    targetRole: { type: String, default: '' },
    preferredLocation: { type: String, default: '' },
    recommendedCourses: {
        type: [{
            name: String,
            url: String
        }],
        default: []
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Generate JWT token
userSchema.methods.generateAuthToken = function() {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

// Verify credentials
userSchema.statics.findByCredentials = async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('Invalid login credentials');
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid login credentials');
    
    return user;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
