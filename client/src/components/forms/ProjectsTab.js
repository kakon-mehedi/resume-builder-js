import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Button from '../common/Button';
import BulletPointsManager from '../common/BulletPointsManager';

const ProjectsTab = ({ projects, addProject, updateProject, removeProject, setCvData }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Projects</h3>
        <Button onClick={addProject} icon={<Plus size={16} />} variant="success">
          Add Project
        </Button>
      </div>
      
      {projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No projects added yet</p>
          <Button onClick={addProject} icon={<Plus size={16} />}>
            Add Your First Project
          </Button>
        </div>
      ) : (
        projects.map((project, index) => (
          <ProjectItem
            key={index}
            project={project}
            index={index}
            onUpdate={updateProject}
            onRemove={removeProject}
            setCvData={setCvData}
          />
        ))
      )}
    </div>
  );
};

const ProjectItem = ({ project, index, onUpdate, onRemove, setCvData }) => {
  const addBullet = () => {
    setCvData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, bullets: [...proj.bullets, ''] } : proj
      )
    }));
  };

  const updateBullet = (bulletIndex, value) => {
    setCvData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? {
          ...proj,
          bullets: proj.bullets.map((bullet, j) => j === bulletIndex ? value : bullet)
        } : proj
      )
    }));
  };

  const removeBullet = (bulletIndex) => {
    setCvData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? {
          ...proj,
          bullets: proj.bullets.filter((_, j) => j !== bulletIndex)
        } : proj
      )
    }));
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 space-y-4 bg-white">
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-gray-800">Project #{index + 1}</h4>
        <Button
          onClick={() => onRemove(index)}
          variant="danger"
          size="sm"
          icon={<Trash2 size={14} />}
        >
          Remove
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Name *
          </label>
          <input
            type="text"
            placeholder="e.g. E-commerce Platform"
            value={project.name}
            onChange={(e) => onUpdate(index, 'name', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tech Stack
          </label>
          <input
            type="text"
            placeholder="e.g. Angular, .NET Core, MongoDB, Docker"
            value={project.techStack}
            onChange={(e) => onUpdate(index, 'techStack', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            List the main technologies used in this project
          </p>
        </div>
      </div>
      
      <BulletPointsManager
        bullets={project.bullets}
        onAddBullet={addBullet}
        onUpdateBullet={updateBullet}
        onRemoveBullet={removeBullet}
        placeholder="Project feature/achievement with metrics (e.g. Built responsive UI handling 10,000+ users)"
        label="Project Details & Achievements"
      />
    </div>
  );
};

export default ProjectsTab;