import { useState, useEffect, useRef } from 'react'
import { 
  ResizablePanelGroup, 
  ResizablePanel, 
  ResizableHandle 
} from "@/components/ui/resizable"
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Plus, Send, Trash2, User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

// Types for our chat interface
type MessageRole = 'user' | 'assistant'

interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

// OpenAI API constants from environment variables
const OPENAI_API_URL = import.meta.env.VITE_OPENAI_API_URL
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const OPENAI_MODEL = import.meta.env.VITE_OPENAI_MODEL

export const Interaction = () => {
  // State for chat sessions and current session
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Create a new chat session
  const createNewChat = () => {
    const newChatId = Date.now().toString()
    const newChat: ChatSession = {
      id: newChatId,
      title: `新对话 ${chatSessions.length + 1}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    setChatSessions(prev => [newChat, ...prev])
    setCurrentSessionId(newChatId)
  }

  // Initialize with a default chat if none exists
  useEffect(() => {
    if (chatSessions.length === 0) {
      createNewChat()
    }
  }, [])

  // Get current chat session
  const currentSession = chatSessions.find(chat => chat.id === currentSessionId) || null

  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatSessions, currentSessionId])

  // Send message to OpenAI API
  const sendMessage = async () => {
    if (!inputMessage.trim() || !currentSession || !OPENAI_API_KEY) return
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }
    
    // Update current session with user message
    const updatedSessions = chatSessions.map(session => {
      if (session.id === currentSessionId) {
        return {
          ...session,
          messages: [...session.messages, userMessage],
          updatedAt: new Date()
        }
      }
      return session
    })
    
    setChatSessions(updatedSessions)
    setInputMessage('')
    setIsLoading(true)
    
    try {
      // Prepare messages for API in the format OpenAI expects
      const messages = updatedSessions
        .find(s => s.id === currentSessionId)?.messages
        .map(msg => ({
          role: msg.role,
          content: msg.content
        })) || []
      
      // Call OpenAI API
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          messages,
          temperature: 0.7
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'API调用失败')
      }
      
      // Add assistant response to chat
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date()
      }
      
      // Update chat sessions with assistant message
      setChatSessions(prev => 
        prev.map(session => {
          if (session.id === currentSessionId) {
            // Update title based on first message if this is the first exchange
            let title = session.title
            if (session.messages.length === 1) {
              title = session.messages[0].content.substring(0, 30) + (session.messages[0].content.length > 30 ? '...' : '')
            }
            return {
              ...session,
              title,
              messages: [...session.messages, assistantMessage],
              updatedAt: new Date()
            }
          }
          return session
        })
      )
    } catch (error) {
      console.error('Error calling OpenAI API:', error)
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `错误: ${error.message || '调用AI服务时出现问题'}`,
        timestamp: new Date()
      }
      
      setChatSessions(prev => 
        prev.map(session => {
          if (session.id === currentSessionId) {
            return {
              ...session,
              messages: [...session.messages, errorMessage],
              updatedAt: new Date()
            }
          }
          return session
        })
      )
    } finally {
      setIsLoading(false)
    }
  }

  // Delete a chat session
  const deleteChat = (chatId: string) => {
    setChatSessions(prev => prev.filter(chat => chat.id !== chatId))
    
    // If we deleted the current session, select another one
    if (chatId === currentSessionId) {
      const remainingSessions = chatSessions.filter(chat => chat.id !== chatId)
      if (remainingSessions.length > 0) {
        setCurrentSessionId(remainingSessions[0].id)
      } else {
        createNewChat()
      }
    }
  }

  // Handle keydown for sending messages with Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="h-[calc(100vh-80px)] w-full p-4">
      <Card className="h-full">
        <CardHeader className="p-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5" />
            人机交互 AI 助手
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-[calc(100%-140px)]">
          <ResizablePanelGroup
            direction="horizontal"
            className="h-full rounded-lg border"
          >
            {/* Chat history sidebar */}
            <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between p-4">
                  <h3 className="text-sm font-medium">对话历史</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={createNewChat}
                    title="新建对话"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Separator />
                <ScrollArea className="flex-1">
                  <div className="space-y-1 p-2">
                    {chatSessions.map((chat) => (
                      <div
                        key={chat.id}
                        className={cn(
                          "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                          chat.id === currentSessionId
                            ? "bg-accent"
                            : "hover:bg-muted"
                        )}
                      >
                        <button
                          className="flex-1 text-left truncate"
                          onClick={() => setCurrentSessionId(chat.id)}
                        >
                          {chat.title}
                        </button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-70 hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteChat(chat.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            {/* Chat content area */}
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full flex-col">
                {/* Messages area */}
                <ScrollArea className="flex-1 p-4">
                  {currentSession && currentSession.messages.length > 0 ? (
                    <div className="space-y-4">
                      {currentSession.messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            "flex",
                            message.role === "user" ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[80%] rounded-lg px-4 py-3",
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            )}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {message.role === "assistant" ? (
                                <Bot className="h-4 w-4" />
                              ) : (
                                <User className="h-4 w-4" />
                              )}
                              <span className="text-xs font-medium">
                                {message.role === "user" ? "您" : "AI 助手"}
                              </span>
                            </div>
                            <div className="whitespace-pre-wrap text-sm">
                              {message.content}
                            </div>
                            <div className="text-xs opacity-50 mt-1 text-right">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="max-w-md text-center">
                        <h3 className="mb-2 text-lg font-medium">欢迎使用 AI 助手</h3>
                        <p className="text-sm text-muted-foreground">
                          输入您的问题，AI 助手将会给您回复。您可以询问任何问题，从简单的日常问题到复杂的专业知识。
                        </p>
                      </div>
                    </div>
                  )}
                </ScrollArea>
                {/* Input area */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="输入消息..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isLoading || !OPENAI_API_KEY}
                      className="flex-1 min-h-12 resize-none"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!inputMessage.trim() || isLoading || !OPENAI_API_KEY}
                      className="shrink-0"
                    >
                      {isLoading ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {!OPENAI_API_KEY && (
                    <div className="mt-2 text-xs text-orange-500">
                      请在环境变量中设置 VITE_OPENAI_API_KEY 以启用 AI 聊天功能
                    </div>
                  )}
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </CardContent>
      </Card>
    </div>
  )
}