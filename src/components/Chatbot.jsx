"use client";
import { useState, useRef, useEffect } from "react";
import { Send, X, TrendingUp, Bot, IndianRupee, Shield, Award, Zap, Users, CheckCircle } from "lucide-react";

const questions = [
  {
    key: "wantIncrease",
    type: "choice",
    question: "नमस्ते! 🙏 आपका DirectNaukri में स्वागत है। क्या आप अपनी वर्तमान सैलरी बढ़वाना चाहते हैं?",
    options: ["हाँ, मैं चाहता हूँ 💰", "नहीं, धन्यवाद 🙏"],
  },
  {
    key: "hiredFromPlatform",
    type: "choice",
    question: "क्या आपको हमारे DirectNaukri platform के माध्यम से यह नौकरी मिली थी?",
    options: ["हाँ, DirectNaukri से मिली 📋", "नहीं, कहीं और से मिली ❌"],
  },
  {
    key: "hrDetails",
    type: "text",
    question: "कृपया बताएं - जिस HR के माध्यम से आपको नौकरी मिली, उनका नाम और मोबाइल नंबर क्या है?",
    placeholder: "जैसे: राहुल शर्मा - 9876543210"
  },
  {
    key: "yourDetails",
    type: "text",
    question: "अंत में, कृपया अपना नाम और मोबाइल नंबर बताएं ताकि हमारी team आपसे संपर्क कर सके।",
    placeholder: "जैसे: अमित कुमार - 9876543210"
  },
];

export default function SalaryIncreaseChatbot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (open && !hasStarted && !chatEnded) {
      setHasStarted(true);
      setTimeout(() => {
        setMessages([
          {
            type: "bot",
            content: "नमस्कार! 🙏 मैं आपका DirectNaukri सहायक हूँ। आइए मिलकर आपकी salary बढ़ाने में मदद करते हैं! 🚀",
            timestamp: new Date(),
          },
        ]);
        setTimeout(() => {
          askQuestion(0);
        }, 1000);
      }, 500);
    }
  }, [open]);

  // Professional tooltip trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!open) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 6000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [open]);

  const askQuestion = (stepIndex) => {
    const question = questions[stepIndex];
    if (!question || chatEnded) return;

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          type: "bot",
          content: question.question,
          timestamp: new Date(),
          questionType: question.type,
          options: question.options,
        }
      ]);
    }, 800);
  };

  const handleOptionClick = (option) => {
    if (chatEnded || isProcessing) return;
    const currentQuestion = questions[step];

    setIsProcessing(true);
    setMessages(prev => [...prev, { type: "user", content: option, timestamp: new Date() }]);
    const updatedAnswers = { ...answers, [currentQuestion.key]: option };
    setAnswers(updatedAnswers);

    // Handle exit conditions
    if (step === 0 && option === "नहीं, धन्यवाद 🙏") {
      endChat("कोई समस्या नहीं! 😊 जब भी आपको salary बढ़ाने में मदद चाहिए, तो हमसे संपर्क करें। आपका दिन शुभ हो! 🌟");
      return;
    }
    if (step === 1 && option === "नहीं, कहीं और से मिली ❌") {
      endChat("खुशी की बात है कि आपको नौकरी मिली! 🎉 लेकिन हम केवल DirectNaukri platform के माध्यम से hire हुए candidates की salary बढ़ाने में सहायता करते हैं। धन्यवाद! 🙏");
      return;
    }

    setTimeout(() => {
      nextStep(updatedAnswers);
    }, 500);
  };

  const handleTextSubmit = () => {
    if (!input.trim() || chatEnded || isProcessing) return;
    const currentQuestion = questions[step];
    const answer = input.trim();

    setIsProcessing(true);
    setMessages(prev => [...prev, { type: "user", content: answer, timestamp: new Date() }]);
    setInput("");
    const updatedAnswers = { ...answers, [currentQuestion.key]: answer };
    setAnswers(updatedAnswers);

    setTimeout(() => {
      nextStep(updatedAnswers);
    }, 500);
  };

  const nextStep = async (updatedAnswers) => {
    const next = step + 1;

    if (next < questions.length) {
      setStep(next);
      setIsProcessing(false);
      askQuestion(next);
    } else {
      // All questions done
      setChatEnded(true);
      setIsTyping(true);

     try {
  // Call API to save feedback
  const res = await fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wantIncrease: updatedAnswers.wantIncrease,
      hiredFromPlatform: updatedAnswers.hiredFromPlatform,
      hrDetails: updatedAnswers.hrDetails,
      yourDetails: updatedAnswers.yourDetails,
    }),
  });

  if (!res.ok) {
    const errorRes = await res.json();
    throw new Error(errorRes.error || "Failed to submit");
  }

  setIsTyping(false);
  setMessages(prev => [
    ...prev,
    {
      type: "bot",
      content: "🎉 बहुत बढ़िया! आपकी सभी जानकारी सफलतापूर्वक प्राप्त हो गई है। हमारी team 24-48 घंटों में आपसे संपर्क करेगी और आपकी salary बढ़ाने की पूरी process शुरू करेगी! 💼✨",
      timestamp: new Date(),
      isSuccess: true,
    },
  ]);

  setTimeout(() => {
    resetChat();
  }, 5000);

} catch (error) {
  console.error("Submit error:", error.message);
  setIsTyping(false);
  setMessages(prev => [
    ...prev,
    {
      type: "bot",
      content: "⚠️ कुछ तकनीकी समस्या हुई है। कृपया कुछ समय बाद पुनः प्रयास करें या हमसे सीधे संपर्क करें।",
      timestamp: new Date(),
      isError: true,
    },
  ]);

  setTimeout(() => resetChat(), 4000);
} finally {
  setIsProcessing(false);
}

    }
  };

  const endChat = (message) => {
    setChatEnded(true);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { type: "bot", content: message, timestamp: new Date(), isEnd: true }]);
      setTimeout(() => resetChat(), 4000);
    }, 600);
  };

  const resetChat = () => {
    setStep(0);
    setAnswers({});
    setMessages([]);
    setInput("");
    setIsTyping(false);
    setChatEnded(false);
    setIsProcessing(false);
    setHasStarted(false);
    setOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTextSubmit();
    }
  };

  const currentQuestion = questions[step];

  return (
    <>
      {/* Professional overlay for mobile */}
      {open && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Professional Chatbox */}
      {open && (
        <div className="fixed inset-4 md:bottom-4 md:right-4 md:inset-auto md:w-96 md:h-[32rem] lg:w-[28rem] lg:h-[36rem] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 flex flex-col z-50 overflow-hidden">
          
          {/* Professional Header */}
          <div className="relative bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 text-white p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <IndianRupee size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg md:text-xl text-white">DirectNaukri Salary Booster</h2>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Shield size={12} />
                    <span>हम आपकी सैलरी बढ़वा सकते हैं</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setOpen(false)} 
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Professional trust indicators */}
            <div className="mt-4 flex items-center justify-between text-xs text-white/70">
              <div className="flex items-center gap-1">
                <CheckCircle size={12} className="text-green-400" />
                <span>Verified Platform</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={12} className="text-blue-400" />
                <span>Data Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <Award size={12} className="text-yellow-400" />
                <span>Free Service</span>
              </div>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gradient-to-b from-gray-50/80 to-white">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.type === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                <div className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm md:text-base shadow-sm border ${
                  m.type === "user"
                    ? "bg-slate-600 text-white border-slate-500"
                    : m.isSuccess
                      ? "bg-green-50 text-green-800 border-green-200"
                      : m.isError
                        ? "bg-red-50 text-red-800 border-red-200"
                        : m.isEnd
                          ? "bg-blue-50 text-blue-800 border-blue-200"
                          : "bg-white text-gray-800 border-gray-200"
                }`}>
                  <div className="leading-relaxed">{m.content}</div>
                  {m.questionType === "choice" && m.options && !chatEnded && !isProcessing && (
                    <div className="flex flex-col mt-4 space-y-2">
                      {m.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(opt)}
                          className="bg-slate-600 hover:bg-slate-700 text-white py-3 px-4 rounded-xl shadow-sm transition-all duration-200 text-sm md:text-base font-medium hover:shadow-md active:scale-[0.98]"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white text-gray-600 px-4 py-3 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm md:text-base">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Professional Input */}
          {currentQuestion?.type === "text" && !isTyping && !chatEnded && !isProcessing && (
            <div className="border-t border-gray-200 p-4 md:p-6 bg-white">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={currentQuestion.placeholder}
                  className="flex-1 border-2 border-gray-200 text-black focus:border-slate-400 focus:ring-2 focus:ring-slate-100 px-4 py-3 rounded-xl text-sm md:text-base bg-gray-50 focus:bg-white transition-all duration-200 placeholder-gray-400"
                />
                <button
                  onClick={handleTextSubmit}
                  disabled={!input.trim()}
                  className="bg-slate-600 hover:bg-slate-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 md:px-6 py-3 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md active:scale-95 disabled:hover:scale-100"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* /* Professional Floating Button with Success Stories  */}
    {/* /* Premium Floating Button */} */
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-full blur-xl opacity-60 animate-pulse"></div>
          
          {/* Main button */}
          <button
            onClick={() => setOpen(!open)}
            className="relative bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white p-4 lg:p-5 rounded-full shadow-2xl shadow-indigo-300 hover:shadow-indigo-400 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm"
          >
            {open ? <X size={24} /> : <TrendingUp size={24} />}
          </button>
          
          {/* Notification badge */}
          {!open && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-bounce border-2 border-white">
              💰
            </div>
          )}
        </div>
        
        {/* Tooltip */}
        {!open && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Salary बढ़ाएं! 🚀
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </>
  );
}