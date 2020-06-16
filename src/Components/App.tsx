import React, { useContext } from "react";

import GlobalStyles from "./GlobalStyles";
import Router from "./Router";
import Lang from "../Translation/context";
import translations from "../Translation/translations";

function App() {
  return (
    <Lang defaultLang="en-US" translations={translations}>
      <Router />
      <GlobalStyles />
    </Lang>
  );
}

export default App;
