import { useEffect } from 'react';
import { Position } from 'reactflow';
import { shallow } from 'zustand/shallow';
import { useStore } from '../store';
import { BaseNode, NodeField } from './BaseNode';

export const HttpNode = ({ id, data }) => {
  const { updateNodeField } = useStore(
    (state) => ({ updateNodeField: state.updateNodeField }),
    shallow
  );

  const url = data?.url ?? 'https://example.com';
  const method = data?.method ?? 'GET';

  useEffect(() => {
    if (data?.url === undefined) updateNodeField(id, 'url', url);
    if (data?.method === undefined) updateNodeField(id, 'method', method);
  }, [data?.method, data?.url, id, method, updateNodeField, url]);

  return (
    <BaseNode
      title="HTTP"
      description="Fetches data from a URL."
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-response` },
      ]}
    >
      <NodeField label="Method">
        <select
          className="vs-nodeSelect"
          value={method}
          onChange={(e) => updateNodeField(id, 'method', e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </NodeField>
      <NodeField label="URL">
        <input
          className="vs-nodeInput"
          type="text"
          value={url}
          onChange={(e) => updateNodeField(id, 'url', e.target.value)}
        />
      </NodeField>
    </BaseNode>
  );
};
