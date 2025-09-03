import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Save, Download, FileText, RotateCcw } from 'lucide-react';

import { useCVData } from '../hooks/useCVData';
import { cvApi, pdfApi } from '../services/api';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import PersonalInfoTab from '../components/forms/PersonalInfoTab';
import SkillsTab from '../components/forms/SkillsTab';
import ExperienceTab from '../components/forms/ExperienceTab';
import EducationTab from '../components/forms/EducationTab';
import ProjectsTab from '../components/forms/EducationTab';
// Import other form components...
import CVPreview from '../components/preview/CVPreview';

const CVBuilder = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [currentCVName, setCurrentCVName] = useState('');
	const [activeTab, setActiveTab] = useState('personal');

	const {
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
	} = useCVData();

	// Load CV data if ID is provided
	useEffect(() => {
		if (id) {
			loadCV(id);
		}
	}, [id]);

	const loadCV = async (cvId) => {
		setLoading(true);
		try {
			const cv = await cvApi.getById(cvId);
			setCvData(cv.data);
			setCurrentCVName(cv.name);
		} catch (error) {
			toast.error('Failed to load CV');
			navigate('/');
		} finally {
			setLoading(false);
		}
	};

	const saveCV = async () => {
		if (!currentCVName.trim()) {
			toast.error('Please enter a CV name');
			return;
		}

		setSaving(true);
		try {
			const cvPayload = {
				name: currentCVName,
				data: cvData,
				userId: 'anonymous', // Replace with actual user ID when auth is implemented
			};

			if (id) {
				await cvApi.update(id, cvPayload);
			} else {
				const newCV = await cvApi.create(cvPayload);
				navigate(`/builder/${newCV._id}`, { replace: true });
			}
		} catch (error) {
			// Error is handled by the API service
		} finally {
			setSaving(false);
		}
	};

	const exportToPDF = async () => {
		try {
			await pdfApi.generatePDF(cvData);
		} catch (error) {
			// Error is handled by the API service
		}
	};

	const handleReset = () => {
		if (
			window.confirm(
				'Are you sure you want to clear all data? This cannot be undone.'
			)
		) {
			resetData();
			setCurrentCVName('');
			if (id) {
				navigate('/', { replace: true });
			}
		}
	};

	const tabs = [
		{ id: 'personal', label: 'Personal Info' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'education', label: 'Education' },
	];

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
						addExperience={addExperience}
						updateExperience={updateExperience}
						removeExperience={removeExperience}
						setCvData={setCvData}
					/>
				);
			case 'projects':
				return (
					<ProjectsTab
						projects={cvData.projects}
						addProject={addProject}
						updateProject={updateProject}
						removeProject={removeProject}
						setCvData={setCvData}
					/>
				);

			case 'education':
				return (
					<EducationTab
						education={cvData.education}
						awards={cvData.awards}
						updateEducation={updateEducation}
						addAward={addAward}
						updateAward={updateAward}
						removeAward={removeAward}
					/>
				);
			// Add other cases for experience, projects, education
			default:
				return <div>Content for {activeTab}</div>;
		}
	};

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Print Styles */}
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
				<div className='bg-white rounded-lg shadow-md p-6 mb-6 no-print'>
					<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
						<div>
							<h1 className='text-2xl font-bold text-gray-800'>
								CV Builder
							</h1>
							<p className='text-gray-600 mt-1'>
								Create your professional resume
							</p>
						</div>

						<div className='flex flex-wrap gap-2'>
							<input
								type='text'
								placeholder='Enter CV name...'
								value={currentCVName}
								onChange={(e) =>
									setCurrentCVName(e.target.value)
								}
								className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
							<Button
								onClick={saveCV}
								disabled={saving || !currentCVName.trim()}
								icon={<Save size={16} />}
								variant='primary'
							>
								{saving ? 'Saving...' : 'Save CV'}
							</Button>
							<Button
								onClick={exportToPDF}
								icon={<Download size={16} />}
								variant='success'
							>
								Export PDF
							</Button>
							<Button
								onClick={handleReset}
								icon={<RotateCcw size={16} />}
								variant='outline'
							>
								Reset
							</Button>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
					{/* Form Section */}
					<div className='bg-white rounded-lg shadow-md no-print'>
						{/* Tab Navigation */}
						<div className='border-b border-gray-200'>
							<nav className='flex overflow-x-auto'>
								{tabs?.map((tab) => (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
											activeTab === tab.id
												? 'border-blue-500 text-blue-600 bg-blue-50'
												: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
										}`}
									>
										{tab.label}
									</button>
								))}
							</nav>
						</div>

						{/* Tab Content */}
						<div className='p-6'>
							<div className='min-h-96'>{renderTabContent()}</div>
						</div>
					</div>

					{/* Preview Section */}
					<div className='print-area'>
						<div className='bg-white rounded-lg shadow-md'>
							<div className='p-4 border-b border-gray-200 no-print'>
								<h2 className='text-lg font-semibold text-gray-800 flex items-center'>
									<FileText
										className='mr-2'
										size={20}
									/>
									Live Preview
								</h2>
							</div>
							<div className='p-2'>
								<CVPreview cvData={cvData} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CVBuilder;
