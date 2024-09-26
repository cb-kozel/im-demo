import React from 'react';

interface PreviewModeProps {
  isPreview: boolean;
  layout: any[];
  onTogglePreview: () => void;

  onExitPreview: () => void;
}

const PreviewMode: React.FC<PreviewModeProps> = ({
  isPreview,
  layout,
  onTogglePreview,
}) => {
  return (
    <div>
      <button onClick={onTogglePreview}>
        {isPreview ? 'Exit Preview' : 'Enter Preview'}
      </button>
      {isPreview && (
        <div className='preview-layout'>
          {layout.map((item, index) => (
            <div key={index} className='preview-item'>
              {/* Render the layout item here */}
              {item.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviewMode;
