// textNode.js

import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from '../store';
import { BaseNode, NodeField } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const { updateNodeField } = useStore(
    (state) => ({ updateNodeField: state.updateNodeField }),
    shallow
  );

  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const text = data?.text ?? '{{input}}';

  // Variable extraction logic
  useEffect(() => {
    const regex = /{{([a-zA-Z_$][a-zA-Z0-9_$]*)}}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]);
    }
    const uniqueVariables = [...new Set(matches)];
    setVariables(uniqueVariables);
  }, [text]);

  // Auto-resizing logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      
      // Basic width expansion up to a max width.
      const minWidth = 200;
      const maxWidth = 600;
      const charWidth = 8; // approx
      const newWidth = Math.min(Math.max(minWidth, text.length * charWidth), maxWidth);
      
      if (textareaRef.current) {
        textareaRef.current.style.width = `${newWidth}px`;
      } 
    }
  }, [text]);

  // Dynamic handles
  const handles = [
    // Output handle
    { type: 'source', position: Position.Right, id: `${id}-output` },
    // Input handles for variables
    ...variables.map((variable, index) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${variable}`,
      style: { top: `${(index + 1) * 20 + 50}px` }
    }))
  ];

  return (
    <BaseNode
      title="Text"
      handles={handles}
      className="vs-node-text" 
      style={{ width: 'auto', minWidth: '250px' }}
    >
      <NodeField label="Text">
        <textarea
          ref={textareaRef}
          className="vs-nodeTextarea"
          value={text}
          onChange={(e) => updateNodeField(id, 'text', e.target.value)}
          style={{ 
            resize: 'none', 
            overflow: 'hidden', 
            minHeight: '40px',
            width: '100%' 
          }}
        />
      </NodeField>
    </BaseNode>
  );
};
