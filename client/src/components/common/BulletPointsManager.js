import React from 'react';
import { Plus, Trash2, Info } from 'lucide-react';
import Button from './Button';

const BulletPointsManager = ({
	bullets,
	onAddBullet,
	onUpdateBullet,
	onRemoveBullet,
	placeholder,
	label,
}) => {
	return (
		<div>
			<div className='flex justify-between items-center mb-3'>
				<label className='text-sm font-medium text-gray-700'>
					{label}
				</label>
				<Button
					onClick={onAddBullet}
					variant='outline'
					size='sm'
					icon={<Plus size={14} />}
				>
					Add Point
				</Button>
			</div>

			<div className='space-y-3'>
				{bullets?.map((bullet, bulletIndex) => (
					<div
						key={bulletIndex}
						className='flex items-start gap-2'
					>
						<span className='text-gray-400 mt-3 text-xs'>•</span>
						<textarea
							placeholder={placeholder}
							value={bullet}
							onChange={(e) =>
								onUpdateBullet(bulletIndex, e.target.value)
							}
							className='flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical min-h-[80px]'
							rows='2'
						/>
						{bullets?.length > 1 && (
							<Button
								onClick={() => onRemoveBullet(bulletIndex)}
								variant='danger'
								size='sm'
								icon={<Trash2 size={14} />}
							>
								Remove
							</Button>
						)}
					</div>
				))}
			</div>

			<div className='mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
				<div className='flex items-start gap-2'>
					<Info
						className='text-blue-500 flex-shrink-0 mt-0.5'
						size={16}
					/>
					<div className='text-sm text-blue-700'>
						<p className='font-medium mb-1'>Writing Tips:</p>
						<ul className='list-disc list-inside space-y-0.5 text-xs'>
							<li>
								Start with action verbs (Led, Built,
								Implemented, Optimized)
							</li>
							<li>
								Include quantifiable results (increased by 40%,
								managed team of 5)
							</li>
							<li>
								Focus on achievements, not just responsibilities
							</li>
							<li>
								Use specific technologies and metrics when
								possible
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BulletPointsManager;
