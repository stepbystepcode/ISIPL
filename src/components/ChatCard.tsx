import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'other';
};

export default function ChatCard() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "老师好，我想请教一下关系型数据库和非关系型数据库的主要区别是什么？", sender: 'user' },
    { id: 2, text: "同学你好，这是个很好的问题。关系型数据库使用表格来组织数据，强调数据之间的关系；而非关系型数据库则更灵活，可以存储非结构化数据。关系型数据库通常支持ACID事务，非关系型数据库则往往在性能和扩展性上有优势。", sender: 'other' },
    { id: 3, text: "明白了，那么在实际应用中，我们应该如何选择使用哪种类型的数据库呢？", sender: 'user' },
    { id: 4, text: "选择数据库类型需要考虑多个因素，如数据结构、一致性需求、扩展性和性能要求等。对于需要复杂查询和强一致性的应用，关系型数据库可能更合适；而对于需要处理大量非结构化数据或需要高扩展性的应用，非关系型数据库可能是更好的选择。建议根据具体项目需求来决定。", sender: 'other' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { id: messages.length + 1, text: inputMessage, sender: 'user' }]);
      setInputMessage('');
    }
  };

  return (
    <Card className="w-full h-[340px]">
      <CardHeader>
        <CardTitle>聊天</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="输入消息..."
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">发送</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}