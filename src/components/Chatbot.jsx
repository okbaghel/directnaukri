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
                  <h2 className="font-semibold text-lg md:text-xl text-white">Salary Assistant</h2>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Shield size={12} />
                    <span>DirectNaukri Professional</span>
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

      {/* Professional Floating Button with Success Stories */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <div className="relative group">
          
          {/* Professional tooltip with success metrics */}
          {showTooltip && !open && (
            <div className="absolute bottom-full right-0 mb-4 w-72 md:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 transform transition-all duration-300 animate-slide-up">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp size={16} className="text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">Salary वृद्धि सेवा</div>
                  <div className="text-xs text-gray-500">Professional Career Growth</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">• Fields Jobs</span>
                  <span className="font-semibold text-green-600">avg +32%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">• Marketing Jobs</span>
                  <span className="font-semibold text-green-600">avg +28%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">• Security</span>
                  <span className="font-semibold text-green-600">avg +35%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <CheckCircle size={12} className="text-green-500" />
                  <span>99% Chance</span>
                </div>
                <button 
                  onClick={() => {setOpen(true); setShowTooltip(false);}}
                  className="text-xs bg-slate-600 text-white px-3 py-1 rounded-full hover:bg-slate-700 transition-colors"
                >
                  शुरू करें
                </button>
              </div>
              
              <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            </div>
          )}

          {/* Floating text above circle */}
          {!open && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-xl shadow-lg animate-bounce pointer-events-none"
                 style={{
                   boxShadow: '0 0 20px rgba(16, 185, 129, 0.5), 0 0 40px rgba(34, 197, 94, 0.3)',
                   animationDuration: '2s'
                 }}>
              <div className="text-center">
                <div className="text-sm font-bold leading-tight drop-shadow-lg">
                  Salary बढवाए
                </div>
              
              </div>
              {/* Arrow pointing down */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-emerald-500"></div>
            </div>
          )}

          {/* Multiple glowing rings for maximum attraction */}
          <div className="absolute inset-0 rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full animate-ping opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse blur-md opacity-50" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-500 rounded-full animate-ping blur-lg opacity-30" style={{animationDelay: '1s'}}></div>
          </div>

          {/* Glowing circular button */}
          <button
            onClick={() => setOpen(!open)}
            onMouseEnter={() => !open && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-700 hover:from-emerald-600 hover:via-green-700 hover:to-emerald-800 text-white rounded-full shadow-2xl shadow-emerald-400/60 hover:shadow-emerald-500/80 transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-emerald-300/50 group overflow-hidden flex items-center justify-center"
            style={{
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.4), 0 0 60px rgba(34, 197, 94, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Multi-layer shimmer effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent translate-x-full group-hover:-translate-x-full transition-transform duration-1200 rounded-full"></div>
            
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/20 to-green-500/20 animate-pulse"></div>
            
            {/* Icon */}
            <div className="relative z-10">
              {open ? (
                <X size={24} className="md:w-8 md:h-8 drop-shadow-lg" />
              ) : (
                <IndianRupee size={28} className="md:w-10 md:h-10 animate-bounce text-white drop-shadow-lg" />
              )}
            </div>
          </button>

          {/* Enhanced floating money emojis with glow */}
      

          {/* Glowing notification badge */}
          {!open && (
            <div className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs md:text-sm font-bold rounded-full flex items-center justify-center shadow-2xl animate-pulse border-2 border-white backdrop-blur-sm"
                 style={{
                   boxShadow: '0 0 20px rgba(239, 68, 68, 0.6), 0 0 40px rgba(249, 115, 22, 0.4)'
                 }}>
              🔥
            </div>
          )}
        </div>
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