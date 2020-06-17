import React, { useState, useContext, createContext } from "react";
import translations from "./translations";

const LangContext = createContext<any>(undefined);

interface ITransObj {
  lang: string;
}

interface IProps {
  defaultLang: string;
  translations: { [lang: string]: { [content: string]: string } };
}

const Lang: React.FC<IProps> = ({ defaultLang, children, translations }) => {
  const [lang, setLang] = useState(defaultLang);
  const hyperTranslate = (text: string) => {
    return translations[lang][text];
  };
  return (
    <LangContext.Provider value={{ lang, setLang, t: hyperTranslate }}>
      {children}
    </LangContext.Provider>
  );
};

export const useSetLang = () => {
  const { setLang } = useContext(LangContext);
  return setLang;
};

export const useT = () => {
  const { t } = useContext(LangContext);
  return t;
};

export const useLang = () => {
  const { lang } = useContext(LangContext);
  return lang;
};

export default Lang;
