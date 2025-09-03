import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import Button from '../common/Button';

const SkillsTab = ({ skills, addSkill, removeSkill }) => {
  const [newSkill, setNewSkill] = useState({ category: 'frontend', value: '' });
  
  const skillCategories = [
    { key: 'frontend', label: 'Frontend', placeholder: 'e.g. React, Angular, Vue.js' },
    { key: 'backend', label: 'Backend', placeholder: 'e.g. Node.js, .NET Core, Python' },
    { key: 'database', label: 'Database', placeholder: 'e.g. MongoDB, PostgreSQL, MySQL' },
    { key: 'tools', label: 'Tools & DevOps', placeholder: 'e.g. Docker, AWS, Git' },
    { key: 'other', label: 'Other', placeholder: 'e.g. Testing, Agile, Scrum' }
  ];

  const handleAddSkill = () => {
    if (newSkill.value.trim()) {
      addSkill(newSkill.category, newSkill.value);
      setNewSkill({ ...newSkill, value: '' });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Skill Form */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Add New Skill</h3>
        <div className="flex gap-2">
          <select
            value={newSkill.category}
            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {skillCategories.map(cat => (
              <option key={cat.key} value={cat.key}>{cat.label}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder={skillCategories.find(cat => cat.key === newSkill.category)?.placeholder}
            value={newSkill.value}
            onChange={(e) => setNewSkill({ ...newSkill, value: e.target.value })}
            onKeyPress={handleKeyPress}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleAddSkill} icon={<Plus size={16} />}>
            Add
          </Button>
        </div>
      </div>

      {/* Skills Categories */}
      {skillCategories.map(category => (
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

const SkillCategory = ({ category, skills, onRemoveSkill }) => (
  <div className="border border-gray-200 rounded-lg p-4">
    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
      {category.label} 
      <span className="ml-2 text-sm text-gray-500">({skills.length})</span>
    </h3>
    <div className="flex flex-wrap gap-2">
      {skills.length === 0 ? (
        <p className="text-gray-500 text-sm italic">No skills added yet</p>
      ) : (
        skills.map((skill, index) => (
          <SkillTag
            key={index}
            skill={skill}
            onRemove={() => onRemoveSkill(index)}
          />
        ))
      )}
    </div>
  </div>
);

const SkillTag = ({ skill, onRemove }) => (
  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
    {skill}
    <button
      onClick={onRemove}
      className="text-blue-600 hover:text-blue-800 ml-1"
      title="Remove skill"
    >
      <X size={14} />
    </button>
  </span>
);

export default SkillsTab;