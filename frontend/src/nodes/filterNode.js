import { useEffect } from 'react';
import { Position } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from '../store';
import { BaseNode, NodeField } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const { updateNodeField } = useStore(
    (state) => ({ updateNodeField: state.updateNodeField }),
    shallow
  );

  const condition = data?.condition ?? 'value != null';

  useEffect(() => {
    if (data?.condition === undefined) updateNodeField(id, 'condition', condition);
  }, [data?.condition, condition, id, updateNodeField]);

  return (
    <BaseNode
      title="Filter"
      description="Passes through only matching items."
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-in` },
        { type: 'source', position: Position.Right, id: `${id}-out` },
      ]}
    >
      <NodeField label="Condition">
        <input
          className="vs-nodeInput"
          type="text"
          value={condition}
          onChange={(e) => updateNodeField(id, 'condition', e.target.value)}
        />
      </NodeField>
    </BaseNode>
  );
};
