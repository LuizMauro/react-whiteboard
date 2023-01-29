import React from "react";
import { EdgeProps, getBezierPath } from "reactflow";
import Dialog from "../DialogLabelEdge";

import "./index.css";

const foreignObjectSize = 50;

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
  data,
}: EdgeProps) {
  const [label, setLabel] = React.useState(data.label ?? "");
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onChangeLabel = (e: string) => {
    if (data?.onChangeLabel) {
      setLabel(e);
      data.onChangeLabel(id, e);
    }
  };

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={300}
        height={foreignObjectSize}
        x={labelX - foreignObjectSize / 2}
        y={labelY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        {data?.label && !selected && (
          <p className="text-sm  text-black">{data.label}</p>
        )}

        {selected && (
          <Dialog
            value={data?.label ?? ""}
            title={data?.label ? "Change label" : "Add label"}
            onChange={(e) => onChangeLabel(e)}
          />
        )}
      </foreignObject>
    </>
  );
}
