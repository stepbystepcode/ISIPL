import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"

import { Send, Search, Phone, Video, MoreVertical } from "lucide-react";

// 定义用户类型
interface User {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "offline" | "away";
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

// 定义消息类型
interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

// 示例用户数据
const users: User[] = [
  {
    id: "1",
    name: "李京",
    status: "online",
    lastMessage: "我们讨论一下量子分布式的应用场景",
    lastMessageTime: "09:30",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "张荣源",
    status: "online",
    lastMessage: "GPU版本已经推送到GitHub",
    lastMessageTime: "昨天",
  },
  {
    id: "3",
    name: "吕金鸿",
    status: "away",
    lastMessage: "AWQ量化的效果如何？",
    lastMessageTime: "周一",
    unreadCount: 1,
  },
  {
    id: "4",
    name: "宁国源",
    status: "offline",
    lastMessage: "我看了CCE链接，可以分解为几个子任务",
    lastMessageTime: "上周",
  },
  {
    id: "5",
    name: "研究小组",
    status: "online",
    lastMessage: "下周一开会讨论进度",
    lastMessageTime: "10:15",
    unreadCount: 5,
  },
];

// 示例消息数据
const initialMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      senderId: "1",
      text: "你好，我们讨论一下量子分布式的应用场景吧",
      timestamp: "09:30",
      isRead: true,
    },
    {
      id: "m2",
      senderId: "current-user",
      text: "好的，我觉得可以先从金融领域开始探讨",
      timestamp: "09:31",
      isRead: true,
    },
    {
      id: "m3",
      senderId: "1",
      text: "金融领域的确是一个很好的切入点。量子分布式计算可以提高金融模型的计算效率和安全性",
      timestamp: "09:32",
      isRead: true,
    },
    {
      id: "m4",
      senderId: "current-user",
      text: "是的，特别是在风险评估和高频交易方面",
      timestamp: "09:33",
      isRead: true,
    },
    {
      id: "m5",
      senderId: "1",
      text: "除了金融，医疗和气象预测也是很好的应用场景",
      timestamp: "09:34",
      isRead: false,
    },
    {
      id: "m6",
      senderId: "1",
      text: "我们可以准备一个详细的报告，分析这几个领域的应用前景",
      timestamp: "09:35",
      isRead: false,
    },
  ],
};

export const Communication = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(users[0]);
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 过滤用户列表
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 发送消息
  const sendMessage = () => {
    if (newMessage.trim() === "" || !selectedUser) return;

    const newMsg: Message = {
      id: `m${Date.now()}`,
      senderId: "current-user",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMsg],
    }));

    setNewMessage("");
  };

  // 处理按Enter键发送消息
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedUser]);

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        {/* 左侧好友列表 */}
        <ResizablePanel defaultSize={25} minSize={20}>
          <div className="h-full bg-background">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">聊天</h2>
              <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索联系人"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <div className="px-2">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedUser?.id === user.id
                        ? "bg-accent"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="relative">
                      <Avatar>
                        {user.avatar ? (
                          <AvatarImage src={user.avatar} alt={user.name} />
                        ) : (
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        )}
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                          user.status === "online"
                            ? "bg-green-500"
                            : user.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {user.lastMessageTime}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground truncate">
                          {user.lastMessage}
                        </p>
                        {user.unreadCount ? (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                            {user.unreadCount}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* 右侧聊天区域 */}
        <ResizablePanel defaultSize={75}>
          {selectedUser ? (
            <div className="flex flex-col h-full">
              {/* 聊天头部 */}
              <div className="border-b p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    {selectedUser.avatar ? (
                      <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                    ) : (
                      <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedUser.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedUser.status === "online"
                        ? "在线"
                        : selectedUser.status === "away"
                        ? "离开"
                        : "离线"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* 消息区域 */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {(messages[selectedUser.id] || []).map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === "current-user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderId === "current-user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p>{message.text}</p>
                        <div
                          className={`text-xs mt-1 ${
                            message.senderId === "current-user"
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* 输入区域 */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="输入消息..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    发送
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground h-full">
              选择一个联系人开始聊天
            </div>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};