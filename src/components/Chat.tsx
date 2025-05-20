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
import { formattedResponse } from '../lib/textFormat';

interface ChatMessage {
  type: 'user' | 'bot' | 'system';
  message: string;
}

const RoleTypes = {
  User: 'user',
  Bot: 'bot',
  System: 'system'
}

const Chat = () => {
  const [open, setOpen] = useState(false);

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

  const handleSubmit = async (userInput: string) => {
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
      handleSubmit(userInput);
    }
  };

  const predefinedQuestions = [
    'What tags can I search for',
    'How can I scroll through the results'
  ]

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
        <PopoverContent className='mr-5 w-90'>
          <div className="flex flex-col justify-between h-150">
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
              {response.length === 0 &&
                <>
                  <h1 className='text-sm mb-2'>Tell us a little bit about what you're looking for.</h1>
                  {predefinedQuestions.map((question, index) => {
                    return <p className='
                    border-1 border-[#7a4fe7] 
                    bg-gradient-to-r from-violet-200 to-pink-200 
                    text-sm rounded-sm 
                    p-2 mb-2 
                    cursor-pointer'
                      key={index}
                      onClick={() => handleSubmit(question)}
                    >{question}</p>

                  })}
                </>
              }
              {response.map((msg, index) => {
                const isBot = msg.type === RoleTypes.Bot;
                return (
                  <div
                    key={index}
                    className={`flex mb-2 ${isBot ? 'items-start' : 'justify-end'}`}
                  >
                    {isBot ? (
                      <>
                        <img src={robot} width={35} height={35} className="p-1" />
                        <div className="rounded-sm p-2 bg-red-50 ml-2 text-sm">{formattedResponse(msg.message)}</div>
                      </>
                    ) : (
                      <div className="rounded-sm p-2 bg-[#f3f3f6] text-right w-fit text-sm text-nowrap">
                        {msg.message}
                      </div>
                    )}
                  </div>
                );
              })}

              {isLoading && <div className="bouncing-loader flex items-start">
                <div></div>
                <div></div>
                <div></div>
              </div>}
            </div>
            {/* <button onClick={surprise}>Surprise</button> */}
            {/* <button onClick={handleClear} className="clear-btn">Clear</button> */}
            <div className="relative">
              <Input
                placeholder="Reply to Tech Support"
                value={userInput}
                onChange={handleUserInput}
                onKeyDown={handleKeyPress}
              />
              <div
                className="absolute right-1 top-2 cursor-pointer"
                onClick={() => handleSubmit(userInput)}
              >
                <img src={send} width={24} height={24} />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div >
  );
};

export default Chat;