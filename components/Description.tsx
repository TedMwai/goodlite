import React from "react";
import parse, { domToReact, DOMNode, Element } from "html-react-parser";

interface ReplaceElementProps {
  element: Element;
}

const ReplaceElement: React.FC<ReplaceElementProps> = ({ element }) => {
  if (element.name === "div") {
    return (
      <div className="mt-4 text-base tracking-tight text-gray-600">
        {domToReact(element.children)}
      </div>
    );
  }

  if (
    element.name === "h1" ||
    element.name === "h2" ||
    element.name === "h3" ||
    element.name === "h4"
  ) {
    return (
      <h1 className="mt-4 text-base tracking-tight text-gray-600">
        {domToReact(element.children)}
      </h1>
    );
  }

  if (element.name === "p") {
    return (
      <p className="mt-4 text-base tracking-tight text-gray-600">
        {domToReact(element.children)}
      </p>
    );
  }
  if (element.name === "ul") {
    return (
      <ul className="custom-list">
        {domToReact(element.children)}
      </ul>
    );
  }
  if (element.name === "li") {
    return <li className="ml-4 list-disc">{domToReact(element.children)}</li>;
  }
  return null;
};

interface HtmlContentProps {
  html: string;
}

const HtmlContent: React.FC<HtmlContentProps> = ({ html }) => {
  const options = {
    replace: (node: DOMNode) => {
      if (node instanceof Element) {
        return <ReplaceElement element={node} />;
      }
    },
  };

  return <div>{parse(html, options)}</div>;
};

export default HtmlContent;
