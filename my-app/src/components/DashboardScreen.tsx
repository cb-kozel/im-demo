import React, { useState, useEffect } from 'react';
import DraggableElement from './DraggableElement';
import ResizableElement from './ResizableElement';
import TemplateSelector from './TemplateSelector';
import PreviewMode from './PreviewMode';
import axios from 'axios';

const DashboardScreen: React.FC = () => {
  interface LayoutElement {
    id: string;
    position: { x: number; y: number };
    size: { width: number; height: number };

    // Add other properties as needed
  }

  const [layout, setLayout] = useState<LayoutElement[]>([]);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const fetchLayout = async () => {
      const response = await axios.get('/api/layouts/default');
      setLayout(response.data.layoutData);
    };
    fetchLayout();
  }, []);

  const handleSaveLayout = async () => {
    await axios.post('/api/layouts', {
      userId: '123',
      name: 'Custom Layout',
      layoutData: layout,
      isDefault: false,
    });
  };

  const handleResetLayout = async () => {
    const response = await axios.get('/api/layouts/default');
    setLayout(response.data.layoutData);
  };

  const handleDragEnd = (id: string, position: { x: number; y: number }) => {
    setLayout((prevLayout: any) =>
      prevLayout.map((el: any) => (el.id === id ? { ...el, position } : el))
    );
  };

  return (
    <div className='dashboard-screen'>
      <header className='dashboard-header'>
        <h1>Dashboard</h1>
        <button onClick={handleSaveLayout}>Save Layout</button>
        <button onClick={handleResetLayout}>Reset Layout</button>
        <button onClick={() => setIsPreview(!isPreview)}>Preview</button>
      </header>
      <aside className='dashboard-sidebar'>
        <TemplateSelector onSelectTemplate={setLayout} />
      </aside>
      <main className='dashboard-body'>
        {isPreview ? (
          <PreviewMode
            layout={layout}
            onExitPreview={() => setIsPreview(false)}
            isPreview={isPreview}
            onTogglePreview={() => setIsPreview(!isPreview)}
          />
        ) : (
          layout.map((element) => (
            <ResizableElement
              key={element.id}
              elementId={element.id}
              onResizeEnd={(id, size) => {
                setLayout((prevLayout) =>
                  prevLayout.map((el) => (el.id === id ? { ...el, size } : el))
                );
              }}
              position={element.position}
            >
              <DraggableElement
                elementId={element.id}
                onDragEnd={handleDragEnd}
              >
                <div className='element-content'>{element.id}</div>
              </DraggableElement>
            </ResizableElement>
          ))
        )}
      </main>
    </div>
  );
};

export default DashboardScreen;
