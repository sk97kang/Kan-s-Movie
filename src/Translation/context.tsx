import React, { useState, useContext, createContext } from "react";

const LangContext = createContext<any>(undefined);

interface IProps {
  defaultLang: string;
  translations: Object;
}

const Lang: React.SFC<IProps> = ({ defaultLang, children, translations }) => {
  const [lang, setLang] = useState(defaultLang);
  return (
    <LangContext.Provider value={[lang, setLang]}>
      {children}
    </LangContext.Provider>
  );
};

export default Lang;
