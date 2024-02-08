import React from "react";
import "./App.css";
import { Todo } from "./todo/Todo";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
      <div className="App-header">
        <Todo />
      </div>
    </NextUIProvider>
  );
}

export default App;
