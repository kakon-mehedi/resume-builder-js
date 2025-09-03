const mongoose = require('mongoose');

const CVSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'anonymous'
  },
  name: {
    type: String,
    required: true
  },
  data: {
    personalInfo: {
      name: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String
    },
    summary: String,
    skills: {
      frontend: [String],
      backend: [String],
      database: [String],
      tools: [String],
      other: [String]
    },
    experience: [{
      title: String,
      company: String,
      duration: String,
      bullets: [String]
    }],
    projects: [{
      name: String,
      techStack: String,
      bullets: [String]
    }],
    education: {
      degree: String,
      university: String,
      duration: String
    },
    awards: [String]
  },
  template: {
    type: String,
    default: 'modern'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CV', CVSchema);