import React, { useState, type ReactNode } from "react";
import { IoSend } from "react-icons/io5";
import HumanMessage from "./HumanMessage";
import AIMessage from "./AIMessage";
import { useDispatch } from "react-redux";
import { type AppDispatch } from "../state/store";
import { setSearchResults } from "../state/dataSlice";

const Chat: React.FC<{
  className?: string;
  setData?: (data: object) => void;
}> = ({ className, setData }) => {
  const [messages, setMessages] = useState<ReactNode[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [checkpointId, setCheckpointId] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (message: string) => {
    const userPrompt = message.trim();

    if (!userPrompt || isLoading) return;

    setPrompt("");
    setMessages((prev) => [...prev, <HumanMessage content={userPrompt} />]);

    try {
      setIsLoading(true);
      setMessages((prev) => [...prev, <AIMessage content="Loading..." />]);

      let url = `http://127.0.0.1:8000/api/agent/${encodeURIComponent(
        userPrompt
      )}`;
      if (checkpointId) {
        url += `?checkpoint_id=${encodeURIComponent(checkpointId)}`;
      }

      const eventSource = new EventSource(url);

      let streamedContent = "";

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Data: ", data);

          switch (data.type) {
            case "checkpoint":
              setCheckpointId(data.checkpoint_id);
              break;

            case "content":
              streamedContent += data.content;
              setMessages((prev) => {
                // Remove the last "Loading..." AIMessage
                const updated = prev.slice(0, -1);
                return [...updated, <AIMessage content={streamedContent} />];
              });
              break;

            case "results":
              dispatch(setSearchResults(data.content.search_results));
              setData?.(data.content.clustered_results);
              break;

            case "end":
              setIsLoading(false);
              eventSource.close();
              break;

            default:
              break;
          }
        } catch (error) {
          console.error(error);
        }
      };
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`bg-white flex flex-col rounded-xl ${className ?? ""}`}>
      <div
        className="flex-1 space-y-5 px-5 py-5 rounded-t-xl bg-blue-50 overflow-auto"
        style={{
          scrollbarColor: "gray transparent",
          scrollbarWidth: "thin",
        }}
      >
        {messages.map((message, i) => (
          <div key={i}>{message}</div>
        ))}
      </div>
      <div className="flex h-12 items-center space-x-5 px-5 rounded-b-xl border-t shadow-[0_0px_15px_-6px] shadow-zinc-300">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border-0 text-black h-full w-full focus:outline-none focus:border-transparent"
          placeholder="Ask anything"
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(prompt);
          }}
        />
        <IoSend
          onClick={() => handleSubmit(prompt)}
          className="text-zinc-400 text-xl cursor-pointer hover:text-black transition-colors duration-300"
        />
      </div>
    </div>
  );
};

export default Chat;
