import React from 'react';
import { useDrag } from 'react-dnd';

interface DraggableElementProps {
  elementId: string;
  onDragEnd: (id: string, position: { x: number; y: number }) => void;
  children: React.ReactNode;
}

const DraggableElement: React.FC<DraggableElementProps> = ({
  elementId,
  onDragEnd,
  children,
}) => {
  const [, drag] = useDrag({
    type: 'ELEMENT',
    item: { id: elementId },
    end: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (offset) {
        onDragEnd(item.id, { x: offset.x, y: offset.y });
      }
    },
  });

  return (
    <div ref={drag} className='draggable-element'>
      {children}
    </div>
  );
};

export default DraggableElement;
