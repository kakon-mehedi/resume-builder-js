import { useState } from 'react';

export const useCVData = (initialData = null) => {
	const [cvData, setCvData] = useState(
		initialData || {
			personalInfo: {
				name: '',
				email: '',
				phone: '',
				location: '',
				linkedin: '',
				github: '',
			},
			summary: '',
			skills: {
				frontend: [],
				backend: [],
				database: [],
				tools: [],
				other: [],
			},
			experience: [],
			projects: [],
			education: {
				degree: '',
				university: '',
				duration: '',
			},
			awards: [],
		}
	);

	const updatePersonalInfo = (field, value) => {
		setCvData((prev) => ({
			...prev,
			personalInfo: { ...prev.personalInfo, [field]: value },
		}));
	};

	const updateSummary = (value) => {
		setCvData((prev) => ({ ...prev, summary: value }));
	};

	const addSkill = (category, skill) => {
		if (skill.trim()) {
			setCvData((prev) => ({
				...prev,
				skills: {
					...prev.skills,
					[category]: [...prev.skills[category], skill.trim()],
				},
			}));
		}
	};

	const removeSkill = (category, index) => {
		setCvData((prev) => ({
			...prev,
			skills: {
				...prev.skills,
				[category]: prev.skills[category].filter((_, i) => i !== index),
			},
		}));
	};

	const addExperience = () => {
		setCvData((prev) => ({
			...prev,
			experience: [
				...prev.experience,
				{
					title: '',
					company: '',
					duration: '',
					bullets: [''],
				},
			],
		}));
	};

	const updateExperience = (index, field, value) => {
		setCvData((prev) => ({
			...prev,
			experience: prev.experience?.map((exp, i) =>
				i === index ? { ...exp, [field]: value } : exp
			),
		}));
	};

	const removeExperience = (index) => {
		setCvData((prev) => ({
			...prev,
			experience: prev.experience.filter((_, i) => i !== index),
		}));
	};

	const addProject = () => {
		setCvData((prev) => ({
			...prev,
			projects: [
				...prev.projects,
				{
					name: '',
					techStack: '',
					bullets: [''],
				},
			],
		}));
	};

	const updateProject = (index, field, value) => {
		setCvData((prev) => ({
			...prev,
			projects: prev.projects?.map((proj, i) =>
				i === index ? { ...proj, [field]: value } : proj
			),
		}));
	};

	const removeProject = (index) => {
		setCvData((prev) => ({
			...prev,
			projects: prev.projects.filter((_, i) => i !== index),
		}));
	};

	const updateEducation = (field, value) => {
		setCvData((prev) => ({
			...prev,
			education: { ...prev.education, [field]: value },
		}));
	};

	const addAward = () => {
		setCvData((prev) => ({
			...prev,
			awards: [...prev.awards, ''],
		}));
	};

	const updateAward = (index, value) => {
		setCvData((prev) => ({
			...prev,
			awards: prev.awards?.map((award, i) =>
				i === index ? value : award
			),
		}));
	};

	const removeAward = (index) => {
		setCvData((prev) => ({
			...prev,
			awards: prev.awards.filter((_, i) => i !== index),
		}));
	};

	const resetData = () => {
		setCvData({
			personalInfo: {
				name: '',
				email: '',
				phone: '',
				location: '',
				linkedin: '',
				github: '',
			},
			summary: '',
			skills: {
				frontend: [],
				backend: [],
				database: [],
				tools: [],
				other: [],
			},
			experience: [],
			projects: [],
			education: {
				degree: '',
				university: '',
				duration: '',
			},
			awards: [],
		});
	};

	return {
		cvData,
		setCvData,
		updatePersonalInfo,
		updateSummary,
		addSkill,
		removeSkill,
		addExperience,
		updateExperience,
		removeExperience,
		addProject,
		updateProject,
		removeProject,
		updateEducation,
		addAward,
		updateAward,
		removeAward,
		resetData,
	};
};
