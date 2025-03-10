import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Send,
  X,
  Loader2,
  Sparkles,
  Bot,
  User,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  Mic,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "../assets/Logo.png";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  status?: "sending" | "sent" | "error";
};

type Suggestion = {
  id: number;
  text: string;
  answer: string;
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm YUVI, your AI assistant for AIFI Club. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: 1,
      text: "What is AIFI Club?",
      answer:
        "AIFI Club stands for Artificial Intelligence for Future Innovations. We're a student-led club at REVA University's School of Computing and Information Technology focused on AI/ML research, hands-on projects, workshops, and building a vibrant community of tech enthusiasts.",
    },
    {
      id: 2,
      text: "Tell me about REVA University",
      answer:
        "REVA University is a premier educational institution located in Bangalore, India. It offers various undergraduate and postgraduate programs across multiple disciplines. The School of Computing and Information Technology is one of its prominent departments, known for innovation and research in emerging technologies like AI and ML.",
    },
    {
      id: 3,
      text: "What events are coming up?",
      answer:
        "We have several exciting events coming up! This includes our monthly AI Workshop series, a Hackathon in collaboration with industry partners, and guest lectures from AI experts. Check our Events section for specific dates and registration details, or join our WhatsApp community for real-time updates.",
    },
    {
      id: 4,
      text: "How can I join the club?",
      answer:
        "Joining AIFI Club is easy! Click on the 'Join Us' button on our website or join our WhatsApp community. We welcome students from all backgrounds who are interested in AI and machine learning. No prior experience is necessary - just bring your enthusiasm and willingness to learn!",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const API_KEY = "1Yn6pqywEK1IqOWhYb1zAzIrIUPna2wA";
  const CHAT_ENDPOINT = "https://codestral.mistral.ai/v1/chat/completions";

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: "user" as const,
      timestamp: new Date(),
      status: "sending" as const,
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Check if the message matches any of the suggested questions
    const matchingSuggestion = suggestions.find(
      suggestion => suggestion.text.toLowerCase() === newMessage.toLowerCase()
    );

    if (matchingSuggestion) {
      // Use predefined answer for suggested questions
      setTimeout(() => {
        // Update user message status to sent
        setMessages(prev =>
          prev.map(msg =>
            msg.id === userMessage.id
              ? { ...msg, status: "sent" as const }
              : msg
          )
        );

        // Add bot response with predefined answer
        setMessages(prev => [
          ...prev,
          {
            id: Date.now(),
            text: matchingSuggestion.answer,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 800); // Short delay to simulate thinking
    } else {
      // Use AI for other questions
      try {
        // Prepare context about AIFI and REVA University
        const context = `
          You are YUVI, the AI assistant for AIFI Club at REVA University.
          
          About AIFI Club:
          - AIFI stands for Artificial Intelligence for Future Innovations
          - It's an AI/ML club at REVA University's School of Computing and Information Technology
          - The club focuses on AI research, hands-on projects, workshops, and building a community
          - The club's vision is "Striving to empower students to become proficient in innovation, technical skills, real-world problem solving, critical thinking and effective collaboration"
          
          About REVA University:
          - REVA University is located in Bangalore, India
          - It offers various undergraduate and postgraduate programs
          - The School of Computing and Information Technology is one of its prominent departments
          - The university encourages innovation and research
          
          Your task is to be helpful, friendly, and informative. Answer questions about AIFI Club, REVA University, AI/ML topics, and provide guidance to users.
          Keep responses concise and friendly. If you don't know something specific, be honest about it.
        `;

        // Prepare conversation history
        const conversationHistory = messages.map(msg => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        }));

        // Add the new user message
        conversationHistory.push({
          role: "user",
          content: newMessage,
        });

        // Add system message with context
        conversationHistory.unshift({
          role: "system",
          content: context,
        });

        // Log the request for debugging
        console.log("Sending request to Codestral API:", {
          model: "codestral",
          messages: conversationHistory,
          temperature: 0.7,
          max_tokens: 500,
        });

        // Make API call to Codestral
        const response = await fetch(CHAT_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "codestral",
            messages: conversationHistory,
            temperature: 0.7,
            max_tokens: 500,
          }),
        });

        // Log the response status for debugging
        console.log("Codestral API response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API error response:", errorText);
          throw new Error(
            `API request failed with status ${response.status}: ${errorText}`
          );
        }

        const data = await response.json();
        console.log("Codestral API response data:", data);

        const botResponse = data.choices[0].message.content;

        // Update user message status to sent
        setMessages(prev =>
          prev.map(msg =>
            msg.id === userMessage.id
              ? { ...msg, status: "sent" as const }
              : msg
          )
        );

        // Add bot response
        setMessages(prev => [
          ...prev,
          {
            id: Date.now(),
            text: botResponse,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      } catch (error) {
        console.error("Error calling Codestral API:", error);

        // Update user message status to error
        setMessages(prev =>
          prev.map(msg =>
            msg.id === userMessage.id
              ? { ...msg, status: "error" as const }
              : msg
          )
        );

        // For now, use a fallback response system instead of showing an error
        const fallbackResponses = [
          "I'd be happy to help with that! As the AIFI Club assistant, I can tell you that we focus on AI research, hands-on projects, and building a community of tech enthusiasts at REVA University.",
          "That's an interesting question about AI! The AIFI Club at REVA University explores cutting-edge AI technologies through workshops, projects, and collaborative learning.",
          "Great question! AIFI Club members work on various AI and ML projects, participate in workshops, and connect with industry professionals to enhance their skills.",
          "As YUVI, the AIFI Club assistant, I can tell you that our club welcomes students from all backgrounds who are interested in artificial intelligence and machine learning.",
          "The AIFI Club at REVA University provides resources, mentorship, and a collaborative environment for students to explore AI technologies and develop practical skills.",
        ];

        const randomResponse =
          fallbackResponses[
            Math.floor(Math.random() * fallbackResponses.length)
          ];

        // Add fallback response
        setMessages(prev => [
          ...prev,
          {
            id: Date.now(),
            text: randomResponse,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleJoinClubQuestion = () => {
    // Update user message status to sent
    const userMessage = {
      id: Date.now(),
      text: "How can I join the club?",
      sender: "user" as const,
      timestamp: new Date(),
      status: "sending" as const,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      // Update user message status to sent
      setMessages(prev =>
        prev.map(msg =>
          msg.id === userMessage.id ? { ...msg, status: "sent" as const } : msg
        )
      );

      // Add bot response with predefined answer
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: "Joining AIFI Club is easy! Click on the 'Join Us' button on our website or use the button below to join our WhatsApp community. We welcome students from all backgrounds who are interested in AI and machine learning. No prior experience is necessary - just bring your enthusiasm and willingness to learn!",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === "How can I join the club?") {
      handleJoinClubQuestion();
      return;
    }

    setNewMessage(suggestion);
    // Focus the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-electric-blue shadow-neon-blue hover:bg-electric-blue/90 transition-all duration-300"
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] glass-morphism z-50 flex flex-col overflow-hidden rounded-xl shadow-neon-blue"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <div className="flex items-center justify-between p-4 bg-electric-blue/20 backdrop-blur-sm border-b border-electric-blue/30">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-electric-blue flex items-center justify-center overflow-hidden">
                    <img
                      src={Logo}
                      alt="AIFI Logo"
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-navy"></span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground text-sm">YUVI</h3>
                  <p className="text-xs text-foreground/70">AIFI Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
              <div className="flex flex-col space-y-4 w-full">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    } w-full`}
                  >
                    <div className="flex flex-col max-w-[75%] gap-1">
                      <div className="flex items-start gap-2">
                        {message.sender === "bot" && (
                          <div className="h-6 w-6 rounded-full bg-electric-blue/20 flex items-center justify-center mt-1 flex-shrink-0">
                            <Bot className="h-3 w-3 text-electric-blue" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "rounded-2xl p-3 break-words overflow-hidden word-break-word",
                            message.sender === "user"
                              ? "bg-electric-blue text-navy rounded-tr-none"
                              : "bg-secondary text-foreground rounded-tl-none"
                          )}
                          style={{ wordBreak: "break-word", maxWidth: "100%" }}
                        >
                          {message.text}
                          {message.sender === "bot" &&
                            message.text.includes("use the button below") && (
                              <div className="mt-2 pt-2 border-t border-white/10">
                                <a
                                  href="https://chat.whatsapp.com/CVISpJEYNSoG3hCo6GnEdA"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 mt-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md inline-flex items-center gap-1 transition-colors"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="mr-1"
                                  >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                  </svg>
                                  Join WhatsApp Community
                                </a>
                              </div>
                            )}
                        </div>
                        {message.sender === "user" && (
                          <div className="h-6 w-6 rounded-full bg-electric-blue/20 flex items-center justify-center mt-1 flex-shrink-0">
                            <User className="h-3 w-3 text-electric-blue" />
                          </div>
                        )}
                      </div>
                      <div
                        className={`flex items-center text-xs ${
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <span className="text-foreground/50">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.sender === "user" && message.status && (
                          <span className="ml-1">
                            {message.status === "sending" && (
                              <Loader2 className="h-3 w-3 animate-spin text-foreground/50" />
                            )}
                            {message.status === "sent" && (
                              <span className="text-electric-blue">✓</span>
                            )}
                            {message.status === "error" && (
                              <span className="text-destructive">!</span>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start w-full">
                    <div className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-electric-blue/20 flex items-center justify-center mt-1 flex-shrink-0">
                        <Bot className="h-3 w-3 text-electric-blue" />
                      </div>
                      <div className="bg-secondary text-foreground rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                        <div className="flex space-x-1">
                          <div
                            className="h-2 w-2 rounded-full bg-electric-blue/70 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="h-2 w-2 rounded-full bg-electric-blue/70 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="h-2 w-2 rounded-full bg-electric-blue/70 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {messages.length === 1 && !isTyping && (
                  <div className="mt-4 w-full">
                    <p className="text-xs text-foreground/70 mb-2">
                      Suggested questions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map(suggestion => (
                        <button
                          key={suggestion.id}
                          onClick={() => handleSuggestionClick(suggestion.text)}
                          className="text-xs bg-electric-blue/10 hover:bg-electric-blue/20 text-electric-blue px-3 py-1.5 rounded-full transition-colors"
                        >
                          {suggestion.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="p-3 border-t border-white/10 bg-secondary/50 backdrop-blur-sm">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-white/10 text-foreground/70 hover:text-electric-blue"
                    aria-label="Attach file"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-white/10 text-foreground/70 hover:text-electric-blue"
                    aria-label="Voice input"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/10 text-foreground rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-electric-blue"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-electric-blue text-navy hover:bg-electric-blue/90 rounded-full h-10 w-10"
                  aria-label="Send message"
                  disabled={newMessage.trim() === "" || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
