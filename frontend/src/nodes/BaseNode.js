import { Handle } from 'reactflow';

export const BaseNode = ({
  title,
  description,
  handles = [],
  children,
  className,
  style,
}) => {
  return (
    <div className={`vs-node ${className || ''}`.trim()} style={style}>
      {handles.map((handle) => (
        <Handle
          key={handle.key ?? `${handle.type}-${handle.position}-${handle.id}`}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
          isConnectable={handle.isConnectable}
        />
      ))}

      <div className="vs-nodeHeader">
        <span>{title}</span>
      </div>

      {(description || children) && (
        <div className="vs-nodeBody">
          {description && <div className="vs-nodeDescription">{description}</div>}
          {children}
        </div>
      )}
    </div>
  );
};

export const NodeField = ({ label, children }) => {
  return (
    <div className="vs-nodeRow">
      <label className="vs-nodeLabel">
        <span className="vs-nodeLabelText">{label}:</span>
        {children}
      </label>
    </div>
  );
};
