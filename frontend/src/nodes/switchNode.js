import { useEffect } from 'react';
import { Position } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from '../store';
import { BaseNode, NodeField } from './BaseNode';

export const SwitchNode = ({ id, data }) => {
  const { updateNodeField } = useStore(
    (state) => ({ updateNodeField: state.updateNodeField }),
    shallow
  );

  const predicate = data?.predicate ?? 'value === true';

  useEffect(() => {
    if (data?.predicate === undefined) updateNodeField(id, 'predicate', predicate);
  }, [data?.predicate, id, predicate, updateNodeField]);

  return (
    <BaseNode
      title="Switch"
      description="Routes input to true/false outputs."
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-in` },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-true`,
          style: { top: '33%' },
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-false`,
          style: { top: '66%' },
        },
      ]}
    >
      <NodeField label="If">
        <input
          className="vs-nodeInput"
          type="text"
          value={predicate}
          onChange={(e) => updateNodeField(id, 'predicate', e.target.value)}
        />
      </NodeField>
    </BaseNode>
  );
};
