import { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  ConnectionMode,
  useEdgesState,
  Connection,
  addEdge,
  useNodesState,
} from "reactflow";
import { zinc } from "tailwindcss/colors";
import * as Toolbar from "@radix-ui/react-toolbar";

import Square from "./components/nodes/Square";
import DefaultEdge from "./components/edges/DefaultEdge";
import DownloadButton from "./components/ButtonDownload";

import "reactflow/dist/style.css";

const NODE_TYPES = {
  square: Square,
};

const EDGE_TYPES = {
  default: DefaultEdge,
};

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const onConnect = useCallback((connection: Connection) => {
    return setEdges((edges) =>
      addEdge({ ...connection, data: { onChangeLabel: onChangeLabel } }, edges)
    );
  }, []);

  const onChangeText = useCallback((id: string, text: string) => {
    setNodes((nodes) => {
      let nodesAux = nodes;
      const nodeFind = nodesAux.findIndex((n) => n.id === id);
      if (nodeFind >= 0) {
        nodesAux[nodeFind].data.label = text;
      }

      return nodesAux;
    });
  }, []);

  const onChangeLabel = useCallback((id: string, text: string) => {
    setEdges((edges) => {
      let edgesAux = edges;
      const edgeFind = edgesAux.findIndex((n) => n.id === id);
      if (edgeFind >= 0) {
        edgesAux[edgeFind].data.label = text;
      }

      return edgesAux;
    });
  }, []);

  const addSquareNode = () => {
    setNodes((nodes) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "square",
        position: {
          x: 750,
          y: 350,
        },
        data: {
          onChangeText: onChangeText,
        },
      },
    ]);
  };

  return (
    <div id="download-image" className="w-screen h-screen">
      <DownloadButton />
      <ReactFlow
        connectionMode={ConnectionMode.Loose}
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        onNodesChange={onNodesChange}
        edgeTypes={EDGE_TYPES}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        attributionPosition="top-right"
        defaultEdgeOptions={{
          type: "default",
        }}
      >
        <Background gap={12} size={2} color={zinc[200]}></Background>
        <Controls />
      </ReactFlow>
      <Toolbar.Root className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden">
        <Toolbar.Button
          className="w-32 h-32 bg-violet-500 mt-6 rounded  transition-transform hover:-translate-y-4"
          onClick={addSquareNode}
        />
      </Toolbar.Root>
    </div>
  );
}

export default App;
