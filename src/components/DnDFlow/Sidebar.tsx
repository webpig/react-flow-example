import React, { DragEvent } from 'react';
import { NodeItem, DataType } from '../../types';
import { NODE_TYPE_TO_IMG_MAP } from '../../utlis/constant';

const data: DataType = [
  {
    type: 'input',
    name: '输入节点',
  },
  {
    type: 'output',
    name: '输出节点',
  },
  {
    type: 'operate',
    name: '操作节点'
  }
];

export default () => {
  const onDragStart = (event: DragEvent, node: NodeItem) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(node));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="aside">
      {
        data.map((item) => {
          return (
            <div
              className="dndnode"
              onDragStart={(event) => onDragStart(event, item)}
              draggable
              key={item.type}
            >
              <div className="icon-wrap">
                <img
                  src={NODE_TYPE_TO_IMG_MAP[item.type]}
                  alt={item.type}
                  className="node-icon"
                  draggable={false}
                />
              </div>
              <div className="node-name">{ item.name }</div>
            </div>
          )
        })
      }
    </aside>
  );
};
