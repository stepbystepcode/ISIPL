import {useState} from 'react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Send} from "lucide-react"

type Message = {
    id: number
    sender: 'user' | 'teacher'
    content: string
}

type Contact = {
    id: number
    name: string
    messages: Message[]
}

export const Feedback = () => {
    const [contacts, setContacts] = useState<Contact[]>([
        {
            id: 1,
            name: '李老师 (数据库)',
            messages: [
                {id: 1, sender: 'user', content: '李老师，数据库这章的内容我有点不明白，能再讲解一下吗？'},
                {id: 2, sender: 'teacher', content: '当然可以，你具体哪部分不明白呢？'},
                {id: 3, sender: 'user', content: '关系代数的部分，特别是自然连接操作有点困惑。'},
                {id: 4, sender: 'teacher', content: '好的，让我为你详细解释一下自然连接...'},
            ]
        },
        {
            id: 2,
            name: '王老师 (计算机网络)',
            messages: [
                {id: 1, sender: 'teacher', content: '下节课我们将讨论TCP协议'},
                {id: 2, sender: 'user', content: '好的，我会提前预习的。'},
            ]
        },
        {
            id: 3,
            name: '张老师 (操作系统)',
            messages: [
                {id: 1, sender: 'teacher', content: '进程调度算法的作业已经批改完毕'},
                {id: 2, sender: 'user', content: '谢谢张老师，我待会就去查看。'},
            ]
        },
    ])

    const [selectedContact, setSelectedContact] = useState<number>(contacts[0].id)
    const [inputMessage, setInputMessage] = useState('')

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            setContacts(prevContacts =>
                prevContacts.map(contact =>
                    contact.id === selectedContact
                        ? {
                            ...contact,
                            messages: [
                                ...contact.messages,
                                {id: contact.messages.length + 1, sender: 'user', content: inputMessage}
                            ]
                        }
                        : contact
                )
            )
            setInputMessage('')
        }
    }

    const selectedContactData = contacts.find(contact => contact.id === selectedContact)

    return (
        <div className="flex h-screen bg-gray-100">
            {/* 左侧聊天列表 */}
            <div className="w-1/4 bg-white border-r border-gray-200">
                <ScrollArea className="h-[calc(100vh-60px)]">
                    {contacts.map((contact) => (
                        <div
                            key={contact.id}
                            className={`p-4 cursor-pointer hover:bg-gray-100 ${selectedContact === contact.id ? 'bg-blue-100' : ''}`}
                            onClick={() => setSelectedContact(contact.id)}
                        >
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-gray-500 truncate">
                                {contact.messages[contact.messages.length - 1]?.content}
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </div>

            {/* 右侧聊天内容 */}
            <div className="flex flex-col w-3/4">
                {selectedContactData && (
                    <>
                        {/* 聊天消息区域 */}
                        <ScrollArea className="flex-grow p-4">
                            {selectedContactData.messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                                >
                                    <div
                                        className={`max-w-[70%] p-3 rounded-lg ${
                                            message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                        }`}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>

                        {/* 输入框和发送按钮 */}
                        <div className="flex items-center p-4 bg-white border-t border-gray-200">
                            <Input
                                className="flex-grow mr-2"
                                placeholder="输入消息..."
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <Button onClick={handleSendMessage}>
                                <Send className="w-4 h-4 mr-2"/>
                                发送
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}