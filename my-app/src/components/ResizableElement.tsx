import React from 'react';
import { Rnd } from 'react-rnd';

interface ResizableElementProps {
  elementId: string;
  onResizeEnd: (id: string, size: { width: number; height: number }) => void;
  children: React.ReactNode;
  position: { x: number; y: number };
}

const ResizableElement: React.FC<ResizableElementProps> = ({
  elementId,
  onResizeEnd,
  children,
}) => {
  return (
    <Rnd
      className='resizable-element'
      onResizeStop={(
        e: any,
        direction: any,
        ref: HTMLElement,
        delta: any,
        position: any
      ) => {
        onResizeEnd(elementId, {
          width: parseFloat(ref.style.width),
          height: parseFloat(ref.style.height),
        });
      }}
    >
      {children}
    </Rnd>
  );
};

export default ResizableElement;
