import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import robot from '../assets/robot.png';
import close from '../assets/close.svg';
import send from '../assets/send.svg';
import { useState, type ChangeEvent } from 'react';
import { generateContent } from '../lib/model';

interface ChatMessage {
  type: 'user' | 'bot' | 'system';
  message: string;
}

const Chat = () => {
  const [open, setOpen] = useState(false);
  // const [error, setError] = useState("");
  // const [value, setValue] = useState("");
  // const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);

  // const surpriseOptions = [
  //   'hello',
  //   'World',
  //   'JavaScript'
  // ]

  // const surprise = () => {
  //   const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
  //   setValue(randomValue);
  // }

  // const getResponse = async () => {
  //   if (!value) {
  //     setError('error');
  //     return;
  //   }
  //   try {
  //     const body = {
  //       contents: [
  //         {
  //           role: "user",
  //           parts: [
  //             {
  //               text: value  // ✅ must be wrapped in an array of { text: ... }
  //             }
  //           ]
  //         }
  //       ]
  //     };
  //     console.log("Payload to Gemini:", JSON.stringify(body, null, 2));
  //     const options = {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         history: chatHistory,
  //         message: value
  //       }),
  //       // body: JSON.stringify(body),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     }
  //     const response = await fetch('http://localhost:3001/gemini', options);
  //     // const data = await response.json();
  //     // const modelReply = data.content?.parts?.[0]?.text || "No response";

  //     // setChatHistory(prev => [
  //     //   ...prev,
  //     //   { role: "model", parts: modelReply }
  //     // ]);
  //     const data = await response.text();
  //     console.log('data', data)

  //     setChatHistory(oldChatHistory => [
  //       ...oldChatHistory, {
  //         role: "user",
  //         parts: value
  //       }, {
  //         role: "model",
  //         parts: data
  //       }
  //     ])
  //     setValue("");
  //   } catch (error) {
  //     setError('error')
  //     setChatHistory(prev => [
  //       ...prev,
  //       { role: "model", parts: "An error occurred while fetching the response." }
  //     ]);
  //   }
  // }

  // const clear = () => {
  //   setValue("");
  //   setError("");
  //   setChatHistory([]);
  // };

  // const generateAnswer = async () => {
  //   if (!value.trim()) {
  //     setError("⚠️ Please enter a message.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://localhost:3001/generate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         message: value,
  //       }),
  //     });

  //     const data = await response.json();

  //     setChatHistory((oldChat) => [
  //       ...oldChat,
  //       { role: "user", parts: value },
  //       { role: "model", parts: data.text },
  //     ]);

  //     setValue("");
  //     setError("");
  //   } catch (err) {
  //     console.error("Client error:", err);
  //     setError("❌ Failed to get a response from server.");
  //   }
  // };

  const [userInput, setUserInput] = useState<string>('');
  const [response, setResponse] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleClear = () => {
    setUserInput('');
    setResponse([]);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) {
      setResponse([{ type: 'system', message: 'Please enter a prompt..' }]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await generateContent(userInput);
      setResponse(prevResponse => [
        ...prevResponse,
        { type: 'user', message: userInput },
        { type: 'bot', message: res },
      ]);
      setUserInput('');
    } catch (err) {
      console.error('Error generating response:', err);
      setResponse(prevResponse => [
        ...prevResponse,
        { type: 'system', message: 'Failed to generate response' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: { key: string; preventDefault: () => void; }) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };


  return (
    <div className='bottom-20 fixed text-zinc-500 text-sm right-5 cursor-pointer'>
      <Popover open={open}>
        <PopoverTrigger>
          <img
            src={robot}
            width={65}
            height={65}
            className='cursor-pointer mt-2'
            onClick={() => setOpen(!open)}
          />
        </PopoverTrigger>
        <PopoverContent className='mr-5 w-80'>
          <div className="flex flex-col justify-between h-96">
            <div className="bg-[#b570ce] p-2 flex items-center gap-2 rounded-t-md relative">
              <img
                src={robot}
                width={35}
                height={35}
                className="cursor-pointer border-2 border-white rounded-full p-1"
              />
              <div className="text-sm text-white">Ask Tech Support</div>
              <img
                src={close}
                width={30}
                height={30}
                className="cursor-pointer absolute top-2 right-2"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {response.length === 0 ? (
                <h1>Got Questions? Chatty's Got Answers.</h1>
              ) : (
                <div className="chat-history">
                  {response.map((msg, index) => (
                    <p key={index} className={`message ${msg.type}`}>
                      {msg.message}
                    </p>
                  ))}
                  {isLoading && <p className="loading-text">Generating response...</p>}
                </div>
              )}
            </div>
            {/* <button onClick={surprise}>Surprise</button> */}
            <button onClick={handleClear} className="clear-btn">Clear</button>
            <div className="relative p-2 border-t">
              <Input
                placeholder="Reply to Tech Support"
                value={userInput}
                onChange={handleUserInput}
                onKeyDown={handleKeyPress}
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => handleKeyPress}
              >
                <img src={send} width={24} height={24} />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Chat;