import { useEffect } from 'react';
import { Position } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from '../store';
import { BaseNode, NodeField } from './BaseNode';

export const JoinNode = ({ id, data }) => {
  const { updateNodeField } = useStore(
    (state) => ({ updateNodeField: state.updateNodeField }),
    shallow
  );

  const delimiter = data?.delimiter ?? ', ';

  useEffect(() => {
    if (data?.delimiter === undefined) updateNodeField(id, 'delimiter', delimiter);
  }, [data?.delimiter, delimiter, id, updateNodeField]);

  return (
    <BaseNode
      title="Join"
      description="Joins two inputs into one string."
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-a`,
          style: { top: '33%' },
        },
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-b`,
          style: { top: '66%' },
        },
        { type: 'source', position: Position.Right, id: `${id}-out` },
      ]}
    >
      <NodeField label="Delimiter">
        <input
          className="vs-nodeInput"
          type="text"
          value={delimiter}
          onChange={(e) => updateNodeField(id, 'delimiter', e.target.value)}
        />
      </NodeField>
    </BaseNode>
  );
};
