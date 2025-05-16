import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import robot from '../assets/robot.png';
import close from '../assets/close.svg';
import { useState } from 'react';

const Chat = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='bottom-20 fixed text-zinc-500 text-sm right-5 cursor-pointer'>
      <Popover open={open}>
        <PopoverTrigger>
          <img src={robot} width={65} height={65} className='cursor-pointer mt-2' onClick={() => setOpen(!open)} />
        </PopoverTrigger>
        <PopoverContent className='mr-5'>
          <div className="flex flex-col justify-between">
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
            <div className="mb-auto h-10 p-4">Content</div>
            <Input placeholder='Reply to Tech Support' />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Chat
