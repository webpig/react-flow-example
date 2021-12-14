import React, { useState, DragEvent, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  OnLoadParams,
  Elements,
  Connection,
  Edge,
  ElementId,
  Node,
} from 'react-flow-renderer';
import Sidebar from './Sidebar';
import CustomNode from './CustomNode';
import './dnd.css';
import { generateUUID } from '../../utlis/index';

const nodeTypes = {
  custom: CustomNode,
};

const initialElements = [{ id: '1', type: 'input', data: { label: 'input node' }, position: { x: 250, y: 5 } }];

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

const getId = (): ElementId => generateUUID();

const DnDFlow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams | null>(null);
  const [elements, setElements] = useState<Elements>(initialElements);

  const onConnect = (params: Connection | Edge) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance: OnLoadParams) => setReactFlowInstance(_reactFlowInstance);

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const json = event.dataTransfer.getData('application/reactflow');
      const data = JSON.parse(json);
      let reactFlowBounds = {
        left: 0,
        top: 0,
      };

      if (reactFlowWrapper?.current) {
        reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode: Node = {
        id: getId(),
        type: 'custom',
        position,
        data,
      };

      setElements((es) => es.concat(newNode));
    }
  };

  const onSelectionChange = (elements: Elements | null) => {
    if (elements === null) {
      setElements((els) => 
        els.map((el) => {
          el.data = { ...el.data, isSelected: false }
          return el;
        }));
    } else {
      setElements((els) => 
        els.map((el) => {
          let isSelected = false;

          if (elements.find((item) => item.id === el.id)) {
            isSelected = true;
          }

          el.data = { ...el.data, isSelected };

          return el;
        }));
    }
  }

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onSelectionChange={onSelectionChange}
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;