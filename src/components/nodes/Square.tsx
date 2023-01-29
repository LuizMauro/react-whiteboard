import React from "react";
import { NodeProps, Handle, Position } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";

import "@reactflow/node-resizer/dist/style.css";

const Square: React.FC<NodeProps> = ({ selected, id, data }) => {
  const [label, setLabel] = React.useState(data.label ?? "");

  const onChangeText = (evt: any) => {
    if (data?.onChangeText) {
      setLabel(evt.target.value);
      data.onChangeText(id, evt.target.value);
    }
  };

  return (
    <div className="bg-violet-500 rounded h-full w-full min-w-[200px] min-h-[200px] flex flex-1 justify-center items-center">
      {data?.label && !selected && (
        <p className="text-2xl font-bold text-white">{data.label}</p>
      )}
      {selected && (
        <input
          className="h-10 bg-transparent text-2xl font-bold text-white text-center border-none max-w-[200px] max-h-[200px]"
          type="text"
          value={label}
          onChange={onChangeText}
        />
      )}

      <NodeResizer
        minWidth={200}
        minHeight={200}
        isVisible={selected}
        lineClassName="border-blue-400"
        handleClassName="h-3 w-3 bg-white border-1 rounded border-blue-400"
      />

      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        className="-bottom-4 w-3 h-3 bg-blue-400/80"
      />
      <Handle
        id="Left"
        type="source"
        position={Position.Left}
        className="-left-4 w-3 h-3 bg-blue-400/80"
      />
      <Handle
        id="Right"
        type="source"
        position={Position.Right}
        className="-right-4 w-3 h-3 bg-blue-400/80"
      />
      <Handle
        id="Top"
        type="source"
        position={Position.Top}
        className="-top-4 w-3 h-3 bg-blue-400/80"
      />
    </div>
  );
};

export default Square;
