import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { DocumentationTemplate } from './components/DocumentationTemplate';
import { HomeworkTemplate } from './components/HomeworkTemplate';
import { Menu } from 'lucide-react';
import { documentationData, homeworkData } from './data/content';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex h-screen" style={{ backgroundColor: '#24272d' }}>
        <SidebarWrapper sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <MainContentWrapper sidebarOpen={sidebarOpen} />
      </div>
    </Router>
  );
}

// Wrap the Sidebar so it can read navigation
function SidebarWrapper({ sidebarOpen, setSidebarOpen }: any) {
  const navigate = useNavigate();

  const handleSelectItem = (mode: 'documentation' | 'homework', id: string) => {
    navigate(`/${mode}/${id}`); // Change the URL
  };

  return (
    <Sidebar
      isOpen={sidebarOpen}
      currentMode={'documentation'} // you can compute based on URL
      onModeChange={(mode) => {
        const homeId = mode === 'documentation' ? 'Documentation Overview' : 'HW Overview';
        handleSelectItem(mode, homeId);
      }}
      selectedItemId={''} // compute from URL if needed
      onSelectItem={(id: string) => handleSelectItem('documentation', id)} // adjust mode logic
      onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
    />
  );
}

// Main content area
function MainContentWrapper({ sidebarOpen }: any) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header sidebarOpen={sidebarOpen} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/documentation/Documentation Overview" />} />
            <Route path="/:mode/:id" element={<ContentRenderer />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function Header({ sidebarOpen }: any) {
  return (
    <header className="border-b" style={{ borderColor: '#3a3d45' }}>
      <div className="flex items-center gap-4 px-6 py-4">
        {!sidebarOpen && (
          <button
            onClick={() => {}}
            className="p-2 rounded-lg hover:bg-opacity-10 hover:bg-white transition-colors"
            style={{ color: '#80848d' }}
          >
            <Menu size={20} />
          </button>
        )}
        <h1 style={{ color: '#d17277' }}>Thacher Robotics</h1>
      </div>
    </header>
  );
}

function ContentRenderer() {
  const { mode, id } = useParams<{ mode: 'documentation' | 'homework'; id: string }>();

  const findItemById = (items: any[], id: string): any => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findItemById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const data = mode === 'documentation' ? documentationData : homeworkData;
  const item = findItemById(data, id || '');

  if (!item) {
    return <div style={{ color: '#80848d' }}>Item not found.</div>;
  }

  return mode === 'documentation' ? (
    <DocumentationTemplate data={item} />
  ) : (
    <HomeworkTemplate data={item} />
  );
}
