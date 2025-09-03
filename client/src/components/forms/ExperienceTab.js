import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Button from '../common/Button';
import BulletPointsManager from '../common/BulletPointsManager';

const ExperienceTab = ({
	experience,
	addExperience,
	updateExperience,
	removeExperience,
	setCvData,
}) => {
	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-center'>
				<h3 className='text-lg font-semibold text-gray-800'>
					Work Experience
				</h3>
				<Button
					onClick={addExperience}
					icon={<Plus size={16} />}
					variant='success'
				>
					Add Experience
				</Button>
			</div>

			{experience?.length === 0 ? (
				<div className='text-center py-12 bg-gray-50 rounded-lg'>
					<p className='text-gray-500 mb-4'>
						No work experience added yet
					</p>
					<Button
						onClick={addExperience}
						icon={<Plus size={16} />}
					>
						Add Your First Job
					</Button>
				</div>
			) : (
				experience?.map((exp, index) => (
					<ExperienceItem
						key={index}
						experience={exp}
						index={index}
						onUpdate={updateExperience}
						onRemove={removeExperience}
						setCvData={setCvData}
					/>
				))
			)}
		</div>
	);
};

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
			experience: prev.experience?.map((exp, i) =>
				i === index ? { ...exp, bullets: [...exp.bullets, ''] } : exp
			),
		}));
	};

	const updateBullet = (bulletIndex, value) => {
		setCvData((prev) => ({
			...prev,
			experience: prev.experience?.map((exp, i) =>
				i === index
					? {
							...exp,
							bullets: exp.bullets?.map((bullet, j) =>
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
			experience: prev.experience?.map((exp, i) =>
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
		<div className='border border-gray-200 rounded-lg p-6 space-y-4 bg-white'>
			<div className='flex justify-between items-start'>
				<h4 className='font-medium text-gray-800'>
					Experience #{index + 1}
				</h4>
				<Button
					onClick={() => onRemove(index)}
					variant='danger'
					size='sm'
					icon={<Trash2 size={14} />}
				>
					Remove
				</Button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Job Title *
					</label>
					<input
						type='text'
						placeholder='e.g. Senior Software Engineer'
						value={experience.title}
						onChange={(e) =>
							onUpdate(index, 'title', e.target.value)
						}
						className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						required
					/>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Company *
					</label>
					<input
						type='text'
						placeholder='e.g. Microsoft'
						value={experience.company}
						onChange={(e) =>
							onUpdate(index, 'company', e.target.value)
						}
						className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						required
					/>
				</div>

				<div className='md:col-span-2'>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Duration *
					</label>
					<input
						type='text'
						placeholder='e.g. March 2021 - Present'
						value={experience.duration}
						onChange={(e) =>
							onUpdate(index, 'duration', e.target.value)
						}
						className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						required
					/>
				</div>
			</div>

			<BulletPointsManager
				bullets={experience.bullets}
				onAddBullet={addBullet}
				onUpdateBullet={updateBullet}
				onRemoveBullet={removeBullet}
				placeholder='Achievement/responsibility with quantifiable results (e.g. Led team of 5 developers, increased performance by 40%)'
				label='Key Achievements & Responsibilities'
			/>
		</div>
	);
};

export default ExperienceTab;
