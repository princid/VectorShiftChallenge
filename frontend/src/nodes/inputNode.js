// inputNode.js

import { useEffect } from 'react';
import { Position } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from '../store';
import { BaseNode, NodeField } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const { updateNodeField } = useStore(
    (state) => ({ updateNodeField: state.updateNodeField }),
    shallow
  );

  const inputName = data?.inputName ?? id.replace('customInput-', 'input_');
  const inputType = data?.inputType ?? 'Text';

  useEffect(() => {
    if (data?.inputName === undefined) updateNodeField(id, 'inputName', inputName);
    if (data?.inputType === undefined) updateNodeField(id, 'inputType', inputType);
  }, [data?.inputName, data?.inputType, id, inputName, inputType, updateNodeField]);

  return (
    <BaseNode
      title="Input"
      handles={[{ type: 'source', position: Position.Right, id: `${id}-value` }]}
    >
      <NodeField label="Name">
        <input
          className="vs-nodeInput"
          type="text"
          value={inputName}
          onChange={(e) => updateNodeField(id, 'inputName', e.target.value)}
        />
      </NodeField>
      <NodeField label="Type">
        <select
          className="vs-nodeSelect"
          value={inputType}
          onChange={(e) => updateNodeField(id, 'inputType', e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
