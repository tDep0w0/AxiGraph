import React from "react";

interface HumanMessageProps {
  content: string;
}

const HumanMessage: React.FC<HumanMessageProps> = ({ content }) => {
  return (
    <div className="flex justify-end">
      <div className="max-w-[70%] w-fit py-3 px-5 bg-white rounded-xl text-black text-left">
        {content}
      </div>
    </div>
  );
};

export default HumanMessage;
