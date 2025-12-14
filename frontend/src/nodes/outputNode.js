// outputNode.js

import { useEffect } from 'react';
import { Position } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from '../store';
import { BaseNode, NodeField } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const { updateNodeField } = useStore(
    (state) => ({ updateNodeField: state.updateNodeField }),
    shallow
  );

  const outputName = data?.outputName ?? id.replace('customOutput-', 'output_');
  const outputType = data?.outputType ?? 'Text';

  useEffect(() => {
    if (data?.outputName === undefined) updateNodeField(id, 'outputName', outputName);
    if (data?.outputType === undefined) updateNodeField(id, 'outputType', outputType);
  }, [data?.outputName, data?.outputType, id, outputName, outputType, updateNodeField]);

  return (
    <BaseNode
      title="Output"
      handles={[{ type: 'target', position: Position.Left, id: `${id}-value` }]}
    >
      <NodeField label="Name">
        <input
          className="vs-nodeInput"
          type="text"
          value={outputName}
          onChange={(e) => updateNodeField(id, 'outputName', e.target.value)}
        />
      </NodeField>
      <NodeField label="Type">
        <select
          className="vs-nodeSelect"
          value={outputType}
          onChange={(e) => updateNodeField(id, 'outputType', e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
