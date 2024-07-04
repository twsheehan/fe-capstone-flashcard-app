import React, { Fragment } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import RootRoutes from "./RootRoutes";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <Fragment>
      <Header />
      <main className="container">
        <RootRoutes />
      </main>
    </Fragment>
  );
}

export default App;
