import React, { memo, FC, CSSProperties } from 'react';
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import { NODE_TYPE_TO_IMG_MAP } from '../../utlis/constant';
import { NodeItem } from '../../types';

const targetHandleStyle: CSSProperties = { background: '#555', top: 30 };
const sourceHandleStyle: CSSProperties = { ...targetHandleStyle, top: 30 };

const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

interface CustomNodeProps extends NodeProps {
  data: NodeItem
}

const CustomNode: FC<CustomNodeProps> = ({ data, isConnectable }) => {
  return (
    <>
      <Handle type="target" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <div
        className="dndnode"
        style={{ marginBottom: 0 }}
      >
        <div
          className={`icon-wrap ${data.isSelected ? 'focus' : ''}`}
        >
          <img
            src={NODE_TYPE_TO_IMG_MAP[data.type]}
            alt={data.type}
            className="node-icon"
            draggable={false}
          />
        </div>
        <div className="node-name">{ data.name }</div>
      </div>
      <Handle type="source" position={Position.Right} id="a" style={sourceHandleStyle} isConnectable={isConnectable} />
    </>
  );
};

export default memo(CustomNode);