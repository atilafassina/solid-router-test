/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";

import "./index.css";
import Entry from "./entry";

const root = document.getElementById("root");

render(
  () => (
    <Router>
      <Entry />
    </Router>
  ),
  root
);
