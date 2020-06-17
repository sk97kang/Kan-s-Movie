import React from "react";

import GlobalStyles from "./GlobalStyles";
import Router from "./Router";
import Lang from "../Translation/context";
import translations from "../Translation/translations";
import { changeLanguage } from "../api";

function App() {
  return (
    <Lang defaultLang={navigator.language} translations={translations}>
      {changeLanguage(navigator.language)}
      <Router />
      <GlobalStyles />
    </Lang>
  );
}

export default App;
