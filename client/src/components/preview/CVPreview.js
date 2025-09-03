import React from 'react';

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
			className='bg-white shadow-lg max-w-4xl mx-auto'
			style={{
				fontFamily: 'Calibri, sans-serif',
				fontSize: '11pt',
				lineHeight: '1.2',
				minHeight: '11in',
			}}
		>
			<div className='p-8'>
				{/* Header */}
				<CVHeader personalInfo={cvData.personalInfo} />

				{/* Summary */}
				{cvData.summary && (
					<CVSection title='Summary'>
						<p className='text-justify'>{cvData.summary}</p>
					</CVSection>
				)}

				{/* Technical Skills */}
				{Object.values(cvData.skills).some(
					(skills) => skills?.length > 0
				) && (
					<CVSection title='Technical Skills'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
							{skillCategories?.map(
								(category) =>
									cvData.skills[category.key]?.length > 0 && (
										<div
											key={category.key}
											className='mb-2'
										>
											<span className='font-bold'>
												{category.label}:{' '}
											</span>
											<span>
												{cvData.skills[
													category.key
												].join(', ')}
											</span>
										</div>
									)
							)}
						</div>
					</CVSection>
				)}

				{/* Professional Experience */}
				{cvData.experience?.length > 0 && (
					<CVSection title='Professional Experience'>
						{cvData.experience?.map((exp, index) => (
							<CVExperienceItem
								key={index}
								experience={exp}
							/>
						))}
					</CVSection>
				)}

				{/* Key Projects */}
				{cvData.projects?.length > 0 && (
					<CVSection title='Key Projects'>
						{cvData.projects?.map((project, index) => (
							<CVProjectItem
								key={index}
								project={project}
							/>
						))}
					</CVSection>
				)}

				{/* Education & Awards */}
				{(cvData.education.degree || cvData.awards?.length > 0) && (
					<CVSection title='Education & Awards'>
						{cvData.education.degree && (
							<div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3'>
								<div className='font-medium'>
									<span className='font-bold'>
										{cvData.education.degree}
									</span>
									{cvData.education.university && (
										<span className='ml-2'>
											| {cvData.education.university}
										</span>
									)}
								</div>
								{cvData.education.duration && (
									<span
										className='italic text-sm mt-1 sm:mt-0'
										style={{ fontSize: '10pt' }}
									>
										{cvData.education.duration}
									</span>
								)}
							</div>
						)}
						{cvData.awards.filter((award) => award.trim())?.length >
							0 && (
							<div className='mt-3'>
								<span className='font-bold'>Awards: </span>
								<span>
									{cvData.awards
										.filter((award) => award.trim())
										.join(' | ')}
								</span>
							</div>
						)}
					</CVSection>
				)}

				{/* Empty State */}
				{!cvData.personalInfo.name &&
					!cvData.summary &&
					Object.values(cvData.skills).every(
						(skills) => skills?.length === 0
					) &&
					cvData.experience?.length === 0 &&
					cvData.projects?.length === 0 &&
					!cvData.education.degree &&
					cvData.awards?.length === 0 && (
						<div className='text-center py-20 text-gray-500'>
							<p className='text-lg mb-2'>
								Your CV preview will appear here
							</p>
							<p className='text-sm'>
								Start by filling out your personal information
							</p>
						</div>
					)}
			</div>
		</div>
	);
};

const CVHeader = ({ personalInfo }) => (
	<div className='text-center mb-6 pb-4 border-b border-gray-300'>
		<h1
			className='text-2xl font-bold mb-2'
			style={{ fontSize: '18pt' }}
		>
			{personalInfo.name || '[Your Name]'}
		</h1>
		<div
			className='text-sm text-gray-600 flex flex-wrap justify-center gap-2'
			style={{ fontSize: '10pt' }}
		>
			{[
				personalInfo.phone,
				personalInfo.email,
				personalInfo.location,
				personalInfo.linkedin,
				personalInfo.github,
			]
				.filter(Boolean)
				?.map((item, index, array) => (
					<React.Fragment key={index}>
						<span>{item}</span>
						{index < array?.length - 1 && <span>|</span>}
					</React.Fragment>
				))}
		</div>
	</div>
);

const CVSection = ({ title, children }) => (
	<div className='mb-6'>
		<h2
			className='text-sm font-bold uppercase border-b border-black mb-3 pb-1'
			style={{ fontSize: '14pt' }}
		>
			{title}
		</h2>
		{children}
	</div>
);

const CVExperienceItem = ({ experience }) => (
	<div className='mb-4'>
		<div className='flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2'>
			<div className='font-medium'>
				<span className='font-bold'>{experience.title}</span>
				{experience.company && (
					<span className='ml-2'>
						|{' '}
						<span className='font-bold'>{experience.company}</span>
					</span>
				)}
			</div>
			{experience.duration && (
				<span
					className='italic text-sm mt-1 sm:mt-0'
					style={{ fontSize: '10pt' }}
				>
					{experience.duration}
				</span>
			)}
		</div>
		{experience.bullets.filter((bullet) => bullet.trim())?.length > 0 && (
			<ul className='ml-4 space-y-1'>
				{experience.bullets
					.filter((bullet) => bullet.trim())
					?.map((bullet, bulletIndex) => (
						<li
							key={bulletIndex}
							className='list-disc text-justify'
						>
							{bullet}
						</li>
					))}
			</ul>
		)}
	</div>
);

const CVProjectItem = ({ project }) => (
	<div className='mb-4'>
		<div className='font-bold text-base'>{project.name}</div>
		{project.techStack && (
			<div
				className='italic text-gray-600 text-sm mb-2'
				style={{ fontSize: '10pt' }}
			>
				{project.techStack}
			</div>
		)}
		{project.bullets.filter((bullet) => bullet.trim())?.length > 0 && (
			<ul className='ml-4 space-y-1'>
				{project.bullets
					.filter((bullet) => bullet.trim())
					?.map((bullet, bulletIndex) => (
						<li
							key={bulletIndex}
							className='list-disc text-justify'
						>
							{bullet}
						</li>
					))}
			</ul>
		)}
	</div>
);

export default CVPreview;
