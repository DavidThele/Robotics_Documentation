import { useState } from 'react';
import { ChevronRight, ChevronDown, FileText, Folder, BookOpen, GraduationCap, Menu, X } from 'lucide-react';
import { documentationData, homeworkData } from '../data/content';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onToggleSidebar: () => void;
}

export function Sidebar({ isOpen, onToggleSidebar }: SidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));
  const navigate = useNavigate();
  const location = useLocation();

  // Parse current mode and selected item from URL
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentMode = pathParts[0] === 'homework' ? 'homework' : 'documentation';
  const selectedItemId = pathParts[1] || (currentMode === 'documentation' ? 'Documentation Overview' : 'HW Overview');

  const toggleFolder = (id: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedFolders(newExpanded);
  };

  const handleSelectItem = (mode: 'documentation' | 'homework', id: string) => {
    navigate(`/${mode}/${id}`);
  };

  const renderTree = (items: any[], depth: number = 0) => {
    return items.map((item) => {
      const isFolder = item.type === 'folder';
      const isExpanded = expandedFolders.has(item.id);
      const isSelected = selectedItemId === item.id;

      return (
        <div key={item.id}>
          <button
            onClick={() => {
              if (isFolder) toggleFolder(item.id);
              else handleSelectItem(currentMode, item.id);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-opacity-10 hover:bg-white"
            style={{
              paddingLeft: `${depth * 16 + 12}px`,
              backgroundColor: isSelected ? 'rgba(116, 173, 233, 0.1)' : 'transparent',
              color: isSelected ? '#74ade9' : '#80848d',
            }}
          >
            {isFolder ? (
              <>
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <Folder size={16} />
              </>
            ) : (
              <>
                <div style={{ width: '16px' }} />
                <FileText size={16} />
              </>
            )}
            <span className="flex-1 text-left">{item.name}</span>
          </button>
          {isFolder && isExpanded && item.children && <div>{renderTree(item.children, depth + 1)}</div>}
        </div>
      );
    });
  };

  const currentData = currentMode === 'documentation' ? documentationData : homeworkData;

  return (
    <aside
      className="border-r flex flex-col"
      style={{
        backgroundColor: '#1e2126',
        borderColor: '#3a3d45',
        width: isOpen ? '320px' : '0px',
        minWidth: isOpen ? '320px' : '0px',
        transition: 'all 0.3s ease',
        overflow: isOpen ? 'visible' : 'hidden',
      }}
    >
      {isOpen && (
        <>
          {/* Toggle Button and Mode Switcher */}
          <div className="p-4 border-b" style={{ borderColor: '#3a3d45' }}>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onToggleSidebar}
                className="p-2 rounded-lg hover:bg-opacity-10 hover:bg-white transition-colors"
                style={{ color: '#80848d' }}
                >
                <X size={20} />
              </button>
                  <h1 style={{ color: '#d17277' }} className="mx-auto">Navigation</h1> {/* Center title */}
            </div>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-lg" style={{ backgroundColor: '#24272d' }}>
              <button
                onClick={() => handleSelectItem('documentation', 'Documentation Overview')}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all"
                style={{
                  backgroundColor: currentMode === 'documentation' ? '#74ade9' : 'transparent',
                  color: currentMode === 'documentation' ? '#1e2126' : '#80848d',
                }}
              >
                <BookOpen size={16} />
                <span>Docs</span>
              </button>
              <button
                onClick={() => handleSelectItem('homework', 'HW Overview')}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all"
                style={{
                  backgroundColor: currentMode === 'homework' ? '#74ade9' : 'transparent',
                  color: currentMode === 'homework' ? '#1e2126' : '#80848d',
                }}
              >
                <GraduationCap size={16} />
                <span>HW</span>
              </button>
            </div>
          </div>

          {/* Tree Navigation */}
          <div className="flex-1 overflow-y-auto p-2">{renderTree(currentData)}</div>
        </>
      )}

      {!isOpen && (
        <button
          onClick={onToggleSidebar}
          className="absolute top-4 left-4 p-2 rounded-lg hover:bg-opacity-10 hover:bg-white transition-colors"
          style={{ color: '#80848d', backgroundColor: '#1e2126' }}
        >
          <Menu size={20} />
        </button>
      )}
    </aside>
  );
}
