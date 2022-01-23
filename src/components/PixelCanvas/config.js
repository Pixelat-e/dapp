import { FaPencilAlt, FaEraser, FaFill, FaSlash, FaRegCircle, FaPlus, FaUndo, FaRedo, FaTrashAlt } from "react-icons/fa";

export var colors = [
  [0, 0, 0, 255],
  [127, 127, 127, 255],
  [136, 0, 21, 255],
  [237, 28, 36, 255],
  [255, 127, 39, 255],
  [255, 242, 0, 255],
  [34, 177, 36, 255],
  [0, 162, 232, 255],
  [63, 72, 204, 255],
  [163, 73, 164, 255],
  [255, 255, 255, 255],
  [195, 195, 195, 255],
  [185, 122, 87, 255],
  [255, 174, 201, 255],
  [255, 201, 14, 255],
  [239, 228, 176, 255],
  [181, 230, 29, 255],
  [153, 217, 234, 255],
  [112, 146, 190, 255],
  [200, 191, 231, 255],
];

export var tools = [
  {
    name: "Pen",
    icon: FaPencilAlt,
    isActive: true,
  },
  {
    name: "Eraser",
    icon: FaEraser,
    isActive: false
  },
  {
    name: "Fill",
    icon: FaFill,
    isActive: false,
  },
  {
    name: "Line",
    icon: FaSlash,
    isActive: false,
  },
  {
    name: "Circle",
    icon: FaRegCircle,
    isActive: false,
  },
  {
    name: "Ellipse",
    icon: FaRegCircle,
    isActive: false,
  },
  {
    name: "Add Frame",
    icon: FaPlus,
    isActive: false,
  },
  {
    name: "Undo",
    icon: FaUndo,
    isActive: false,
  },
  {
    name: "Redo",
    icon: FaRedo,
    isActive: false,
  },
  {
    name: "Clear Canvas",
    icon: FaTrashAlt,
    isActive: false,
  }
]