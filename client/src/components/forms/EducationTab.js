import React from 'react';
import { Plus, Trash2, GraduationCap, Award } from 'lucide-react';
import Button from '../common/Button';

const EducationTab = ({ education, awards, updateEducation, addAward, updateAward, removeAward }) => {
  return (
    <div className="space-y-8">
      {/* Education Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <GraduationCap className="mr-2" size={20} />
          Education
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Degree
            </label>
            <input
              type="text"
              placeholder="e.g. B.Sc Computer Science and Engineering"
              value={education.degree}
              onChange={(e) => updateEducation('degree', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              University/Institution
            </label>
            <input
              type="text"
              placeholder="e.g. University of California, Berkeley"
              value={education.university}
              onChange={(e) => updateEducation('university', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              type="text"
              placeholder="e.g. 2016 - 2020"
              value={education.duration}
              onChange={(e) => updateEducation('duration', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      
      {/* Awards Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Award className="mr-2" size={20} />
            Awards & Achievements
          </h3>
          <Button onClick={addAward} icon={<Plus size={16} />} size="sm">
            Add Award
          </Button>
        </div>
        
        {awards.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Award className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">No awards added yet</p>
            <Button onClick={addAward} icon={<Plus size={16} />} size="sm">
              Add Your First Award
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {awards.map((award, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Award className="text-yellow-500 flex-shrink-0" size={16} />
                <input
                  type="text"
                  placeholder="e.g. Winner - Bangabandhu Innovation Grant (BIG 2020)"
                  value={award}
                  onChange={(e) => updateAward(index, e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  onClick={() => removeAward(index)}
                  variant="danger"
                  size="sm"
                  icon={<Trash2 size={14} />}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Tips:</strong></p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Include competition wins, grants, scholarships</li>
            <li>Mention year and organizing body</li>
            <li>Add academic honors like Dean's List</li>
            <li>Include relevant certifications</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EducationTab;