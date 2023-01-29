import { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
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

import "reactflow/dist/style.css";

const NODE_TYPES = {
  square: Square,
};

const EDGE_TYPES = {
  default: DefaultEdge,
};

// const INITIAL_NODES = [
//   {
//     id: crypto.randomUUID(),
//     type: "square",
//     position: {
//       x: 200,
//       y: 400,
//     },
//     data: {},
//   },
//   {
//     id: crypto.randomUUID(),
//     type: "square",
//     position: {
//       x: 1000,
//       y: 400,
//     },
//     data: {
//       onChangeText: onChangeText,
//     },
//   },
// ] satisfies Node[];

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  const onConnect = useCallback((connection: Connection) => {
    return setEdges((edges) => addEdge(connection, edges));
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
    <div className="w-screen h-screen">
      <ReactFlow
        connectionMode={ConnectionMode.Loose}
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        onNodesChange={onNodesChange}
        edgeTypes={EDGE_TYPES}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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
