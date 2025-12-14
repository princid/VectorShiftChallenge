// textNode.js

import { useEffect } from 'react';
import { Position } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from '../store';
import { BaseNode, NodeField } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const { updateNodeField } = useStore(
    (state) => ({ updateNodeField: state.updateNodeField }),
    shallow
  );

  const text = data?.text ?? '{{input}}';

  useEffect(() => {
    if (data?.text === undefined) updateNodeField(id, 'text', text);
  }, [data?.text, id, text, updateNodeField]);

  return (
    <BaseNode
      title="Text"
      handles={[{ type: 'source', position: Position.Right, id: `${id}-output` }]}
    >
      <NodeField label="Text">
        <input
          className="vs-nodeInput"
          type="text"
          value={text}
          onChange={(e) => updateNodeField(id, 'text', e.target.value)}
        />
      </NodeField>
    </BaseNode>
  );
};
