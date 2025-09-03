import React, { useState } from 'react';
import {
	Plus,
	Trash2,
	Download,
	Save,
	FileText,
	Edit2,
	Copy,
} from 'lucide-react';

// Hooks
const useCVData = () => {
	const [cvData, setCvData] = useState({
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

	return {
		cvData,
		setCvData,
		updatePersonalInfo,
		updateSummary,
		addSkill,
		removeSkill,
	};
};

// Personal Info Component
const PersonalInfoTab = ({
	personalInfo,
	summary,
	updatePersonalInfo,
	updateSummary,
}) => (
	<div className='space-y-4'>
		<div className='grid grid-cols-2 gap-4'>
			<input
				type='text'
				placeholder='Full Name'
				value={personalInfo.name}
				onChange={(e) => updatePersonalInfo('name', e.target.value)}
				className='border rounded px-3 py-2'
			/>
			<input
				type='email'
				placeholder='Email'
				value={personalInfo.email}
				onChange={(e) => updatePersonalInfo('email', e.target.value)}
				className='border rounded px-3 py-2'
			/>
			<input
				type='text'
				placeholder='Phone'
				value={personalInfo.phone}
				onChange={(e) => updatePersonalInfo('phone', e.target.value)}
				className='border rounded px-3 py-2'
			/>
			<input
				type='text'
				placeholder='Location'
				value={personalInfo.location}
				onChange={(e) => updatePersonalInfo('location', e.target.value)}
				className='border rounded px-3 py-2'
			/>
			<input
				type='text'
				placeholder='LinkedIn'
				value={personalInfo.linkedin}
				onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
				className='border rounded px-3 py-2'
			/>
			<input
				type='text'
				placeholder='GitHub'
				value={personalInfo.github}
				onChange={(e) => updatePersonalInfo('github', e.target.value)}
				className='border rounded px-3 py-2'
			/>
		</div>
		<textarea
			placeholder='Professional Summary'
			value={summary}
			onChange={(e) => updateSummary(e.target.value)}
			className='w-full border rounded px-3 py-2 h-24'
		/>
	</div>
);

// Skills Component
const SkillsTab = ({ skills, addSkill, removeSkill }) => {
	const [newSkill, setNewSkill] = useState({
		category: 'frontend',
		value: '',
	});

	const skillCategories = [
		{ key: 'frontend', label: 'Frontend' },
		{ key: 'backend', label: 'Backend' },
		{ key: 'database', label: 'Database' },
		{ key: 'tools', label: 'Tools & DevOps' },
		{ key: 'other', label: 'Other' },
	];

	const handleAddSkill = () => {
		addSkill(newSkill.category, newSkill.value);
		setNewSkill({ ...newSkill, value: '' });
	};

	return (
		<div className='space-y-4'>
			<div className='flex gap-2 mb-4'>
				<select
					value={newSkill.category}
					onChange={(e) =>
						setNewSkill({ ...newSkill, category: e.target.value })
					}
					className='border rounded px-3 py-2'
				>
					{skillCategories.map((cat) => (
						<option
							key={cat.key}
							value={cat.key}
						>
							{cat.label}
						</option>
					))}
				</select>
				<input
					type='text'
					placeholder='Add skill'
					value={newSkill.value}
					onChange={(e) =>
						setNewSkill({ ...newSkill, value: e.target.value })
					}
					onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
					className='flex-1 border rounded px-3 py-2'
				/>
				<button
					onClick={handleAddSkill}
					className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
				>
					<Plus size={16} />
				</button>
			</div>

			{skillCategories.map((category) => (
				<SkillCategory
					key={category.key}
					category={category}
					skills={skills[category.key]}
					onRemoveSkill={(index) => removeSkill(category.key, index)}
				/>
			))}
		</div>
	);
};

// Skill Category Component
const SkillCategory = ({ category, skills, onRemoveSkill }) => (
	<div className='border rounded p-4'>
		<h3 className='font-semibold mb-2'>{category.label}</h3>
		<div className='flex flex-wrap gap-2'>
			{skills.map((skill, index) => (
				<SkillTag
					key={index}
					skill={skill}
					onRemove={() => onRemoveSkill(index)}
				/>
			))}
		</div>
	</div>
);

// Skill Tag Component
const SkillTag = ({ skill, onRemove }) => (
	<span className='bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2'>
		{skill}
		<button
			onClick={onRemove}
			className='text-red-500 hover:text-red-700'
		>
			<Trash2 size={12} />
		</button>
	</span>
);

// Experience Component
const ExperienceTab = ({ experience, setCvData }) => {
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
			experience: prev.experience.map((exp, i) =>
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

	return (
		<div className='space-y-4'>
			<button
				onClick={addExperience}
				className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2'
			>
				<Plus size={16} /> Add Experience
			</button>

			{experience.map((exp, index) => (
				<ExperienceItem
					key={index}
					experience={exp}
					index={index}
					onUpdate={updateExperience}
					onRemove={removeExperience}
					setCvData={setCvData}
				/>
			))}
		</div>
	);
};

// Experience Item Component
const ExperienceItem = ({
	experience,
	index,
	onUpdate,
	onRemove,
	setCvData,
}) => {
	const addBullet = () => {
		setCvData((prev) => ({
			...prev,
			experience: prev.experience.map((exp, i) =>
				i === index ? { ...exp, bullets: [...exp.bullets, ''] } : exp
			),
		}));
	};

	const updateBullet = (bulletIndex, value) => {
		setCvData((prev) => ({
			...prev,
			experience: prev.experience.map((exp, i) =>
				i === index
					? {
							...exp,
							bullets: exp.bullets.map((bullet, j) =>
								j === bulletIndex ? value : bullet
							),
					  }
					: exp
			),
		}));
	};

	const removeBullet = (bulletIndex) => {
		setCvData((prev) => ({
			...prev,
			experience: prev.experience.map((exp, i) =>
				i === index
					? {
							...exp,
							bullets: exp.bullets.filter(
								(_, j) => j !== bulletIndex
							),
					  }
					: exp
			),
		}));
	};

	return (
		<div className='border rounded p-4 space-y-3'>
			<div className='flex justify-between items-start'>
				<div className='flex-1 grid grid-cols-2 gap-3'>
					<input
						type='text'
						placeholder='Job Title'
						value={experience.title}
						onChange={(e) =>
							onUpdate(index, 'title', e.target.value)
						}
						className='border rounded px-3 py-2'
					/>
					<input
						type='text'
						placeholder='Company'
						value={experience.company}
						onChange={(e) =>
							onUpdate(index, 'company', e.target.value)
						}
						className='border rounded px-3 py-2'
					/>
					<input
						type='text'
						placeholder='Duration (e.g., Mar 2021 - Present)'
						value={experience.duration}
						onChange={(e) =>
							onUpdate(index, 'duration', e.target.value)
						}
						className='border rounded px-3 py-2 col-span-2'
					/>
				</div>
				<button
					onClick={() => onRemove(index)}
					className='text-red-500 hover:text-red-700 ml-2'
				>
					<Trash2 size={16} />
				</button>
			</div>

			<BulletPointsManager
				bullets={experience.bullets}
				onAddBullet={addBullet}
				onUpdateBullet={updateBullet}
				onRemoveBullet={removeBullet}
				placeholder='Achievement/responsibility with quantifiable results'
				label='Key Achievements:'
			/>
		</div>
	);
};

// Projects Component
const ProjectsTab = ({ projects, setCvData }) => {
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
			projects: prev.projects.map((proj, i) =>
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

	return (
		<div className='space-y-4'>
			<button
				onClick={addProject}
				className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2'
			>
				<Plus size={16} /> Add Project
			</button>

			{projects.map((project, index) => (
				<ProjectItem
					key={index}
					project={project}
					index={index}
					onUpdate={updateProject}
					onRemove={removeProject}
					setCvData={setCvData}
				/>
			))}
		</div>
	);
};

// Project Item Component
const ProjectItem = ({ project, index, onUpdate, onRemove, setCvData }) => {
	const addBullet = () => {
		setCvData((prev) => ({
			...prev,
			projects: prev.projects.map((proj, i) =>
				i === index ? { ...proj, bullets: [...proj.bullets, ''] } : proj
			),
		}));
	};

	const updateBullet = (bulletIndex, value) => {
		setCvData((prev) => ({
			...prev,
			projects: prev.projects.map((proj, i) =>
				i === index
					? {
							...proj,
							bullets: proj.bullets.map((bullet, j) =>
								j === bulletIndex ? value : bullet
							),
					  }
					: proj
			),
		}));
	};

	const removeBullet = (bulletIndex) => {
		setCvData((prev) => ({
			...prev,
			projects: prev.projects.map((proj, i) =>
				i === index
					? {
							...proj,
							bullets: proj.bullets.filter(
								(_, j) => j !== bulletIndex
							),
					  }
					: proj
			),
		}));
	};

	return (
		<div className='border rounded p-4 space-y-3'>
			<div className='flex justify-between items-start'>
				<div className='flex-1 space-y-3'>
					<input
						type='text'
						placeholder='Project Name'
						value={project.name}
						onChange={(e) =>
							onUpdate(index, 'name', e.target.value)
						}
						className='w-full border rounded px-3 py-2'
					/>
					<input
						type='text'
						placeholder='Tech Stack (e.g., Angular, .NET Core, MongoDB)'
						value={project.techStack}
						onChange={(e) =>
							onUpdate(index, 'techStack', e.target.value)
						}
						className='w-full border rounded px-3 py-2'
					/>
				</div>
				<button
					onClick={() => onRemove(index)}
					className='text-red-500 hover:text-red-700 ml-2'
				>
					<Trash2 size={16} />
				</button>
			</div>

			<BulletPointsManager
				bullets={project.bullets}
				onAddBullet={addBullet}
				onUpdateBullet={updateBullet}
				onRemoveBullet={removeBullet}
				placeholder='Project feature/achievement with metrics'
				label='Project Details:'
			/>
		</div>
	);
};

// Bullet Points Manager Component
const BulletPointsManager = ({
	bullets,
	onAddBullet,
	onUpdateBullet,
	onRemoveBullet,
	placeholder,
	label,
}) => (
	<div>
		<div className='flex justify-between items-center mb-2'>
			<label className='text-sm font-semibold'>{label}</label>
			<button
				onClick={onAddBullet}
				className='text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1'
			>
				<Plus size={14} /> Add Point
			</button>
		</div>
		{bullets.map((bullet, bulletIndex) => (
			<div
				key={bulletIndex}
				className='flex gap-2 mb-2'
			>
				<input
					type='text'
					placeholder={placeholder}
					value={bullet}
					onChange={(e) =>
						onUpdateBullet(bulletIndex, e.target.value)
					}
					className='flex-1 border rounded px-3 py-2'
				/>
				{bullets.length > 1 && (
					<button
						onClick={() => onRemoveBullet(bulletIndex)}
						className='text-red-500 hover:text-red-700'
					>
						<Trash2 size={14} />
					</button>
				)}
			</div>
		))}
	</div>
);

// Education Component
const EducationTab = ({ education, awards, setCvData }) => {
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
			awards: prev.awards.map((award, i) =>
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

	return (
		<div className='space-y-4'>
			<div className='grid grid-cols-1 gap-4'>
				<input
					type='text'
					placeholder='Degree (e.g., B.Sc Computer Science and Engineering)'
					value={education.degree}
					onChange={(e) => updateEducation('degree', e.target.value)}
					className='border rounded px-3 py-2'
				/>
				<input
					type='text'
					placeholder='University'
					value={education.university}
					onChange={(e) =>
						updateEducation('university', e.target.value)
					}
					className='border rounded px-3 py-2'
				/>
				<input
					type='text'
					placeholder='Duration (e.g., 2016 - 2020)'
					value={education.duration}
					onChange={(e) =>
						updateEducation('duration', e.target.value)
					}
					className='border rounded px-3 py-2'
				/>
			</div>

			<AwardsManager
				awards={awards}
				onAddAward={addAward}
				onUpdateAward={updateAward}
				onRemoveAward={removeAward}
			/>
		</div>
	);
};

// Awards Manager Component
const AwardsManager = ({
	awards,
	onAddAward,
	onUpdateAward,
	onRemoveAward,
}) => (
	<div>
		<div className='flex justify-between items-center mb-2'>
			<label className='text-sm font-semibold'>
				Awards & Achievements:
			</label>
			<button
				onClick={onAddAward}
				className='text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1'
			>
				<Plus size={14} /> Add Award
			</button>
		</div>
		{awards.map((award, index) => (
			<div
				key={index}
				className='flex gap-2 mb-2'
			>
				<input
					type='text'
					placeholder='Award or achievement'
					value={award}
					onChange={(e) => onUpdateAward(index, e.target.value)}
					className='flex-1 border rounded px-3 py-2'
				/>
				<button
					onClick={() => onRemoveAward(index)}
					className='text-red-500 hover:text-red-700'
				>
					<Trash2 size={14} />
				</button>
			</div>
		))}
	</div>
);

// CV Preview Component
const CVPreview = ({ cvData }) => {
	const skillCategories = [
		{ key: 'frontend', label: 'Frontend' },
		{ key: 'backend', label: 'Backend' },
		{ key: 'database', label: 'Database' },
		{ key: 'tools', label: 'Tools & DevOps' },
		{ key: 'other', label: 'Other' },
	];

	return (
		<div
			className='bg-white p-8 shadow-lg'
			style={{
				fontFamily: 'Calibri, sans-serif',
				fontSize: '11pt',
				lineHeight: '1.2',
			}}
		>
			{/* Header */}
			<div className='text-center mb-4 border-b pb-3'>
				<h1
					className='text-xl font-bold mb-2'
					style={{ fontSize: '18pt' }}
				>
					{cvData.personalInfo.name || '[Your Name]'}
				</h1>
				<div
					className='text-sm text-gray-600'
					style={{ fontSize: '10pt' }}
				>
					{[
						cvData.personalInfo.phone,
						cvData.personalInfo.email,
						cvData.personalInfo.location,
						cvData.personalInfo.linkedin,
						cvData.personalInfo.github,
					]
						.filter(Boolean)
						.join(' | ')}
				</div>
			</div>

			{/* Summary */}
			{cvData.summary && (
				<CVSection title='Summary'>
					<p>{cvData.summary}</p>
				</CVSection>
			)}

			{/* Technical Skills */}
			{Object.values(cvData.skills).some(
				(skills) => skills.length > 0
			) && (
				<CVSection title='Technical Skills'>
					<div className='grid grid-cols-2 gap-2'>
						{skillCategories.map(
							(category) =>
								cvData.skills[category.key].length > 0 && (
									<div
										key={category.key}
										className='mb-1'
									>
										<span className='font-bold'>
											{category.label}:
										</span>{' '}
										{cvData.skills[category.key].join(', ')}
									</div>
								)
						)}
					</div>
				</CVSection>
			)}

			{/* Professional Experience */}
			{cvData.experience.length > 0 && (
				<CVSection title='Professional Experience'>
					{cvData.experience.map((exp, index) => (
						<CVExperienceItem
							key={index}
							experience={exp}
						/>
					))}
				</CVSection>
			)}

			{/* Key Projects */}
			{cvData.projects.length > 0 && (
				<CVSection title='Key Projects'>
					{cvData.projects.map((project, index) => (
						<CVProjectItem
							key={index}
							project={project}
						/>
					))}
				</CVSection>
			)}

			{/* Education & Awards */}
			{(cvData.education.degree || cvData.awards.length > 0) && (
				<CVSection title='Education & Awards'>
					{cvData.education.degree && (
						<div className='flex justify-between items-center mb-2'>
							<div>
								<span className='font-bold'>
									{cvData.education.degree}
								</span>
								{cvData.education.university && (
									<span>
										{' '}
										| {cvData.education.university}
									</span>
								)}
							</div>
							{cvData.education.duration && (
								<span
									className='italic text-sm'
									style={{ fontSize: '10pt' }}
								>
									{cvData.education.duration}
								</span>
							)}
						</div>
					)}
					{cvData.awards.filter((award) => award.trim()).length >
						0 && (
						<p className='mt-2'>
							<span className='font-bold'>Awards:</span>{' '}
							{cvData.awards
								.filter((award) => award.trim())
								.join(' | ')}
						</p>
					)}
				</CVSection>
			)}
		</div>
	);
};

// CV Section Component
const CVSection = ({ title, children }) => (
	<div className='mb-4'>
		<h2
			className='text-sm font-bold uppercase border-b border-black mb-2 pb-1'
			style={{ fontSize: '14pt' }}
		>
			{title}
		</h2>
		{children}
	</div>
);

// CV Experience Item Component
const CVExperienceItem = ({ experience }) => (
	<div className='mb-3'>
		<div className='flex justify-between items-center mb-1'>
			<div>
				<span className='font-bold'>{experience.title}</span>
				{experience.company && (
					<span>
						{' '}
						|{' '}
						<span className='font-bold'>{experience.company}</span>
					</span>
				)}
			</div>
			{experience.duration && (
				<span
					className='italic text-sm'
					style={{ fontSize: '10pt' }}
				>
					{experience.duration}
				</span>
			)}
		</div>
		{experience.bullets.filter((bullet) => bullet.trim()).length > 0 && (
			<ul className='ml-4 space-y-1'>
				{experience.bullets
					.filter((bullet) => bullet.trim())
					.map((bullet, bulletIndex) => (
						<li
							key={bulletIndex}
							className='list-disc'
						>
							{bullet}
						</li>
					))}
			</ul>
		)}
	</div>
);

// CV Project Item Component
const CVProjectItem = ({ project }) => (
	<div className='mb-3'>
		<div className='font-bold'>{project.name}</div>
		{project.techStack && (
			<div
				className='italic text-gray-600 text-sm mb-1'
				style={{ fontSize: '10pt' }}
			>
				{project.techStack}
			</div>
		)}
		{project.bullets.filter((bullet) => bullet.trim()).length > 0 && (
			<ul className='ml-4 space-y-1'>
				{project.bullets
					.filter((bullet) => bullet.trim())
					.map((bullet, bulletIndex) => (
						<li
							key={bulletIndex}
							className='list-disc'
						>
							{bullet}
						</li>
					))}
			</ul>
		)}
	</div>
);

// Saved CV Manager Component
const SavedCVManager = ({
	savedCVs,
	onSave,
	onLoad,
	onDuplicate,
	onDelete,
	currentCVName,
	setCurrentCVName,
}) => (
	<div className='bg-white rounded-lg shadow-md p-6 mb-6 no-print'>
		<h1 className='text-2xl font-bold text-gray-800 mb-4'>
			Dynamic CV Builder
		</h1>

		{/* Action Buttons */}
		<div className='flex flex-wrap gap-3 mb-4'>
			<input
				type='text'
				placeholder='CV Name'
				value={currentCVName}
				onChange={(e) => setCurrentCVName(e.target.value)}
				className='border rounded px-3 py-2'
			/>
			<button
				onClick={onSave}
				className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2'
			>
				<Save size={16} /> Save CV
			</button>
			<button
				onClick={() => window.print()}
				className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2'
			>
				<Download size={16} /> Export PDF
			</button>
			<button
				onClick={() => {
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
						education: { degree: '', university: '', duration: '' },
						awards: [],
					});
					setCurrentCVName('');
				}}
				className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
			>
				Clear All
			</button>
		</div>

		{/* Saved CVs */}
		{savedCVs.length > 0 && (
			<div>
				<h3 className='font-semibold mb-2'>Saved CVs:</h3>
				<div className='flex flex-wrap gap-2'>
					{savedCVs.map((savedCV) => (
						<div
							key={savedCV.id}
							className='bg-gray-100 rounded p-2 flex items-center gap-2'
						>
							<FileText size={14} />
							<span className='text-sm'>{savedCV.name}</span>
							<span className='text-xs text-gray-500'>
								({savedCV.createdAt})
							</span>
							<button
								onClick={() => onLoad(savedCV)}
								className='text-blue-500 hover:text-blue-700'
								title='Load'
							>
								<Edit2 size={12} />
							</button>
							<button
								onClick={() => onDuplicate(savedCV)}
								className='text-green-500 hover:text-green-700'
								title='Duplicate'
							>
								<Copy size={12} />
							</button>
							<button
								onClick={() => onDelete(savedCV.id)}
								className='text-red-500 hover:text-red-700'
								title='Delete'
							>
								<Trash2 size={12} />
							</button>
						</div>
					))}
				</div>
			</div>
		)}
	</div>
);

// Tab Navigation Component
const TabNavigation = ({ activeTab, onTabChange }) => {
	const tabs = [
		{ id: 'personal', label: 'Personal' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'education', label: 'Education' },
	];

	return (
		<div className='flex flex-wrap border-b mb-4'>
			{tabs.map((tab) => (
				<button
					key={tab.id}
					onClick={() => onTabChange(tab.id)}
					className={`px-4 py-2 font-medium ${
						activeTab === tab.id
							? 'border-b-2 border-blue-500 text-blue-600'
							: 'text-gray-600 hover:text-gray-800'
					}`}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
};

// Main CV Builder Component
const CVBuilder = () => {
	const {
		cvData,
		setCvData,
		updatePersonalInfo,
		updateSummary,
		addSkill,
		removeSkill,
	} = useCVData();

	const [savedCVs, setSavedCVs] = useState([]);
	const [currentCVName, setCurrentCVName] = useState('');
	const [activeTab, setActiveTab] = useState('personal');

	const saveCV = () => {
		if (!currentCVName.trim()) {
			alert('Please enter a CV name');
			return;
		}
		const newCV = {
			id: Date.now(),
			name: currentCVName,
			data: { ...cvData },
			createdAt: new Date().toLocaleDateString(),
		};
		setSavedCVs((prev) => [...prev, newCV]);
		setCurrentCVName('');
		alert('CV saved successfully!');
	};

	const loadCV = (savedCV) => {
		setCvData(savedCV.data);
		setCurrentCVName(savedCV.name);
	};

	const duplicateCV = (savedCV) => {
		setCvData(savedCV.data);
		setCurrentCVName(`${savedCV.name} (Copy)`);
	};

	const deleteCV = (id) => {
		setSavedCVs((prev) => prev.filter((cv) => cv.id !== id));
	};

	const renderTabContent = () => {
		switch (activeTab) {
			case 'personal':
				return (
					<PersonalInfoTab
						personalInfo={cvData.personalInfo}
						summary={cvData.summary}
						updatePersonalInfo={updatePersonalInfo}
						updateSummary={updateSummary}
					/>
				);
			case 'skills':
				return (
					<SkillsTab
						skills={cvData.skills}
						addSkill={addSkill}
						removeSkill={removeSkill}
					/>
				);
			case 'experience':
				return (
					<ExperienceTab
						experience={cvData.experience}
						setCvData={setCvData}
					/>
				);
			case 'projects':
				return (
					<ProjectsTab
						projects={cvData.projects}
						setCvData={setCvData}
					/>
				);
			case 'education':
				return (
					<EducationTab
						education={cvData.education}
						awards={cvData.awards}
						setCvData={setCvData}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className='min-h-screen bg-gray-50'>
			<style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

			<div className='container mx-auto p-4'>
				{/* Header */}
				<SavedCVManager
					savedCVs={savedCVs}
					onSave={saveCV}
					onLoad={loadCV}
					onDuplicate={duplicateCV}
					onDelete={deleteCV}
					currentCVName={currentCVName}
					setCurrentCVName={setCurrentCVName}
				/>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
					{/* Form Section */}
					<div className='bg-white rounded-lg shadow-md p-6 no-print'>
						<TabNavigation
							activeTab={activeTab}
							onTabChange={setActiveTab}
						/>

						{/* Tab Content */}
						<div className='min-h-96'>{renderTabContent()}</div>
					</div>

					{/* Preview Section */}
					<div className='print-area'>
						<div className='bg-white rounded-lg shadow-md p-2'>
							<h2 className='text-lg font-semibold mb-4 no-print'>
								Live Preview
							</h2>
							<CVPreview cvData={cvData} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CVBuilder;
