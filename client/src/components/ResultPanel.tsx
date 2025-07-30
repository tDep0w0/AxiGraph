import type React from "react";
import { TfiClose } from "react-icons/tfi";
import { useReactFlow } from "@xyflow/react";
import type { SearchResult } from "../types/SearchResult";

type ResultPanelProps = {
  title: string;
  closePanel: () => void;
  results: SearchResult[];
};

const ResultPanel: React.FC<ResultPanelProps> = ({
  title,
  closePanel,
  results,
}) => {
  const { fitView } = useReactFlow();

  return (
    <div className="bg-[#1e1e1ebb] fixed left-0 rounded-2xl flex flex-col h-[calc(100vh-30px)] w-[600px] z-10 m-[15px]">
      <div className="flex justify-between items-center p-5 w-full border-[#3c3c3c] border-b-1 h-12 rounded-t-2xl">
        <p className="text-xl text-white">{title}</p>
        <TfiClose
          onClick={() => {
            closePanel();
            fitView({ duration: 200 });
          }}
          className="text-white text-lg cursor-pointer hover:text-[#979797]"
        />
      </div>
      <div className="overflow-auto flex-1 p-5 space-y-5">
        {results.map((result, i) => (
          <div
            key={i}
            className="bg-[#232323] flex items-center space-x-7 p-5 rounded-xl"
          >
            <div className=" flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <img
                  src={result.favicon}
                  className="aspect-square w-6 rounded-full"
                  alt="favicon"
                />
                <span>{result.source}</span>
              </div>
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                <h3 className="text-xl text-indigo-400 inline hover:underline">
                  {result.title}
                </h3>
              </a>
              <span className="block">{result.snippet}</span>
            </div>
            {result.thumbnail && (
              <img
                src={result.thumbnail}
                className="w-30 h-30 rounded-lg"
                alt="thumbnail"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultPanel;
