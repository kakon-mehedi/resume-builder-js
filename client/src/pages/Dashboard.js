import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FileText, Edit2, Copy, Trash2, Download, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { cvApi, pdfApi } from '../services/api';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadCVs();
  }, []);

  const loadCVs = async () => {
    try {
      const data = await cvApi.getAll();
      setCvs(data);
    } catch (error) {
      // Error handled by API service
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = async (cv) => {
    try {
      await cvApi.duplicate(cv._id);
      loadCVs();
    } catch (error) {
      // Error handled by API service
    }
  };

  const handleDelete = async (cvId) => {
    if (window.confirm('Are you sure you want to delete this CV? This action cannot be undone.')) {
      try {
        await cvApi.delete(cvId);
        setCvs(prev => prev.filter(cv => cv._id !== cvId));
      } catch (error) {
        // Error handled by API service
      }
    }
  };

  const handleExportPDF = async (cv) => {
    try {
      await pdfApi.generatePDF(cv.data);
    } catch (error) {
      // Error handled by API service
    }
  };

  const filteredCVs = cvs.filter(cv =>
    cv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My CVs</h1>
              <p className="text-gray-600 mt-1">Manage and organize your resumes</p>
            </div>
            <Link to="/builder">
              <Button icon={<Plus size={20} />} size="lg">
                Create New CV
              </Button>
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search CVs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* CVs Grid */}
        {filteredCVs.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="mx-auto h-20 w-20 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {searchTerm ? 'No CVs found' : 'No CVs yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `No CVs match "${searchTerm}". Try a different search term.`
                : 'Create your first CV to get started building your professional resume.'
              }
            </p>
            {!searchTerm && (
              <Link to="/builder">
                <Button icon={<Plus size={20} />} size="lg">
                  Create Your First CV
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCVs.map((cv) => (
              <CVCard
                key={cv._id}
                cv={cv}
                onEdit={() => navigate(`/builder/${cv._id}`)}
                onDuplicate={() => handleDuplicate(cv)}
                onDelete={() => handleDelete(cv._id)}
                onExportPDF={() => handleExportPDF(cv)}
              />
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{cvs.length}</div>
              <div className="text-gray-600">Total CVs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {cvs.filter(cv => new Date(cv.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
              </div>
              <div className="text-gray-600">Updated This Week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {cvs.reduce((total, cv) => total + (cv.data.experience?.length || 0), 0)}
              </div>
              <div className="text-gray-600">Total Experiences</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CVCard = ({ cv, onEdit, onDuplicate, onDelete, onExportPDF }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 6;

    if (cv.data.personalInfo?.name) completed++;
    if (cv.data.summary) completed++;
    if (Object.values(cv.data.skills || {}).some(skills => skills.length > 0)) completed++;
    if (cv.data.experience?.length > 0) completed++;
    if (cv.data.projects?.length > 0) completed++;
    if (cv.data.education?.degree) completed++;

    return Math.round((completed / total) * 100);
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {cv.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {cv.data.personalInfo?.name || 'No name set'}
            </p>
          </div>
          <FileText className="text-gray-400 flex-shrink-0 ml-2" size={20} />
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-600">Completion</span>
            <span className="text-xs text-gray-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Meta Info */}
        <div className="text-xs text-gray-500 space-y-1 mb-4">
          <div>Created: {formatDate(cv.createdAt)}</div>
          <div>Updated: {formatDate(cv.updatedAt)}</div>
          <div>
            Sections: {[
              cv.data.experience?.length > 0 && 'Experience',
              cv.data.projects?.length > 0 && 'Projects',
              Object.values(cv.data.skills || {}).some(skills => skills.length > 0) && 'Skills',
              cv.data.education?.degree && 'Education'
            ].filter(Boolean).join(', ') || 'None'}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={onEdit}
            variant="primary"
            size="sm"
            className="flex-1"
            icon={<Edit2 size={14} />}
          >
            Edit
          </Button>
          <Button
            onClick={onDuplicate}
            variant="outline"
            size="sm"
            icon={<Copy size={14} />}
          >
            Copy
          </Button>
          <Button
            onClick={onExportPDF}
            variant="success"
            size="sm"
            icon={<Download size={14} />}
          >
            PDF
          </Button>
          <Button
            onClick={onDelete}
            variant="danger"
            size="sm"
            icon={<Trash2 size={14} />}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;