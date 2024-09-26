import React from 'react';

interface TemplateSelectorProps {
  onSelectTemplate: (layout: any) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onSelectTemplate,
}) => {
  const templates = [
    { id: 1, name: 'Template 1', layout: [] },
    { id: 2, name: 'Template 2', layout: [] },
  ];

  return (
    <div className='template-selector'>
      <h2>Select a Template</h2>
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelectTemplate(template.layout)}
        >
          {template.name}
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
