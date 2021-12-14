import { NodeType } from '../types/index';
import InputIcon from '../assets/imgs/icon_input.svg';
import OutputIcon from '../assets/imgs/icon_output.svg';
import OperateIcon from '../assets/imgs/icon_operate.svg';

export const NODE_TYPE_TO_IMG_MAP: Record<NodeType, string> = {
  input: InputIcon,
  output: OutputIcon,
  operate: OperateIcon,
};