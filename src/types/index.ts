export type NodeType = 'input' | 'output' | 'operate';

export interface NodeItem {
  type: NodeType,
  name: string,
  isSelected?: boolean,
}

export type DataType = Array<NodeItem>;