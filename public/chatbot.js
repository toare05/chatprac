document.addEventListener("DOMContentLoaded", function() {
  // 챗봇 컨테이너가 있는지 확인
  const container = document.getElementById("chatbot-container");
  if (!container) {
    console.error("챗봇 컨테이너를 찾을 수 없습니다.");
    return;
  }

  // 챗봇 CSS 스타일 추가
  const style = document.createElement('style');
  style.textContent = `
    #chatbot-icon {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      background-color: #3b82f6;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 9999;
      transition: all 0.3s ease;
    }
    #chatbot-icon:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }
    #chatbot-chat-container {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 320px;
      border-radius: 10px;
      background-color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      z-index: 9998;
      display: none;
      transition: all 0.3s ease;
      max-height: 70vh;
      display: flex;
      flex-direction: column;
    }
    #chatbot-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 15px;
      background-color: #3b82f6;
      color: white;
      font-weight: bold;
    }
    #chatbot-close {
      cursor: pointer;
      font-size: 18px;
    }
    #chatbot-messages {
      padding: 15px;
      background-color: #f9fafb;
      min-height: 60px;
      overflow-y: auto;
      flex-grow: 1;
      max-height: 300px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .message {
      max-width: 80%;
      padding: 10px 12px;
      border-radius: 18px;
      font-size: 14px;
      line-height: 1.4;
      position: relative;
      margin-bottom: 2px;
    }
    .message-bot {
      align-self: flex-start;
      background-color: #e5e7eb;
      color: #111827;
      border-bottom-left-radius: 5px;
    }
    .message-user {
      align-self: flex-end;
      background-color: #3b82f6;
      color: white;
      border-bottom-right-radius: 5px;
    }
    .typing-indicator {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .typing-indicator span {
      width: 8px;
      height: 8px;
      background-color: #888;
      border-radius: 50%;
      display: inline-block;
      opacity: 0.6;
    }
    .typing-indicator span:nth-child(1) {
      animation: typing 1.5s infinite 0s;
    }
    .typing-indicator span:nth-child(2) {
      animation: typing 1.5s infinite 0.3s;
    }
    .typing-indicator span:nth-child(3) {
      animation: typing 1.5s infinite 0.6s;
    }
    @keyframes typing {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.8; }
    }
    #chatbot-input-container {
      display: flex;
      padding: 10px;
      border-top: 1px solid #e5e7eb;
    }
    #chatbot-input {
      flex-grow: 1;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 20px;
      outline: none;
    }
    #chatbot-send {
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      margin-left: 8px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    #chatbot-send:hover {
      background-color: #2563eb;
    }
    .hidden {
      display: none !important;
    }
    .visible {
      display: flex !important;
    }
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-up {
      animation: slide-up 0.3s ease forwards;
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .fade-in {
      animation: fade-in 0.3s ease forwards;
    }
  `;
  document.head.appendChild(style);

  // 챗봇 HTML 구조 생성
  container.innerHTML = `
    <!-- 챗봇 아이콘 -->
    <div id="chatbot-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </div>
    
    <!-- 챗봇 대화창 -->
    <div id="chatbot-chat-container" class="hidden">
      <div id="chatbot-header">
        <span>군입대 정보 도우미</span>
        <span id="chatbot-close">×</span>
      </div>
      <div id="chatbot-messages">
        <!-- 메시지들이 이곳에 동적으로 추가됩니다 -->
      </div>
      <div id="chatbot-input-container">
        <input id="chatbot-input" type="text" placeholder="질문을 입력하세요..." />
        <button id="chatbot-send">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  `;

  // DOM 요소 참조
  const chatbotIcon = document.getElementById("chatbot-icon");
  const chatContainer = document.getElementById("chatbot-chat-container");
  const closeButton = document.getElementById("chatbot-close");
  const messagesContainer = document.getElementById("chatbot-messages");
  const input = document.getElementById("chatbot-input");
  const sendButton = document.getElementById("chatbot-send");

  // 이벤트 리스너 등록
  chatbotIcon.addEventListener("click", toggleChatbot);
  closeButton.addEventListener("click", toggleChatbot);
  
  // 엔터 키 이벤트 처리
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

  // 보내기 버튼 클릭 이벤트 처리
  sendButton.addEventListener("click", sendMessage);

  // 챗봇 토글 함수
  function toggleChatbot() {
    if (chatContainer.classList.contains("hidden")) {
      chatContainer.classList.remove("hidden");
      chatContainer.classList.add("visible", "animate-slide-up");
      // 챗봇을 처음 열 때 인사 메시지 표시
      if (messagesContainer.children.length === 0) {
        addBotMessage("안녕하세요! 군입대 관련 궁금한 점을 물어보세요. 예를 들어 '신체검사 1급이 뭐야?'와 같이 질문해 보세요.");
      }
      input.focus();
    } else {
      chatContainer.classList.remove("visible", "animate-slide-up");
      chatContainer.classList.add("hidden");
    }
  }

  // 챗봇 메시지 추가 함수
  function addBotMessage(text) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "message-bot", "fade-in");
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    scrollToBottom();
  }

  // 사용자 메시지 추가 함수
  function addUserMessage(text) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "message-user", "fade-in");
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    scrollToBottom();
  }

  // 타이핑 표시기 추가 함수
  function addTypingIndicator() {
    const indicatorElement = document.createElement("div");
    indicatorElement.classList.add("message", "message-bot", "fade-in", "typing-indicator-container");
    indicatorElement.innerHTML = `
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    indicatorElement.id = "typing-indicator";
    messagesContainer.appendChild(indicatorElement);
    scrollToBottom();
    return indicatorElement;
  }

  // 타이핑 표시기 제거 함수
  function removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) {
      indicator.remove();
    }
  }

  // 스크롤을 항상 아래로 유지하는 함수
  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // 메시지 전송 함수
  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    // 사용자 입력 초기화
    input.value = "";
    
    // 사용자 메시지 표시
    addUserMessage(message);
    
    // 타이핑 표시기 추가
    const typingIndicator = addTypingIndicator();
    
    try {
      // API 호출 (약간의 지연을 줘서 자연스러운 느낌 연출)
      setTimeout(async () => {
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({ message }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          // 타이핑 표시기 제거
          removeTypingIndicator();

          if (!res.ok) {
            throw new Error("API 요청 실패");
          }

          const { reply } = await res.json();
          addBotMessage(reply);
        } catch (error) {
          console.error("에러:", error);
          removeTypingIndicator();
          addBotMessage("죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }, 1000); // 1초 지연
    } catch (error) {
      console.error("에러:", error);
      removeTypingIndicator();
      addBotMessage("죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
}); 