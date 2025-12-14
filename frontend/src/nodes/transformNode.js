import { useEffect } from 'react';
import { Position } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from '../store';
import { BaseNode, NodeField } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const { updateNodeField } = useStore(
    (state) => ({ updateNodeField: state.updateNodeField }),
    shallow
  );

  const expression = data?.expression ?? 'value.toString()';

  useEffect(() => {
    if (data?.expression === undefined) updateNodeField(id, 'expression', expression);
  }, [data?.expression, expression, id, updateNodeField]);

  return (
    <BaseNode
      title="Transform"
      description="Maps input value to output."
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-in` },
        { type: 'source', position: Position.Right, id: `${id}-out` },
      ]}
    >
      <NodeField label="Expr">
        <input
          className="vs-nodeInput"
          type="text"
          value={expression}
          onChange={(e) => updateNodeField(id, 'expression', e.target.value)}
        />
      </NodeField>
    </BaseNode>
  );
};
