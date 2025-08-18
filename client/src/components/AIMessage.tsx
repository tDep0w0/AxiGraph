import React from "react";

interface AIMessageProps {
  content: string;
}

const AIMessage: React.FC<AIMessageProps> = ({ content }) => {
  return <div className="text-black">{content}</div>;
};

export default AIMessage;
