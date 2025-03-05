import { NextResponse } from 'next/server';

// 간단한 응답 생성 함수
function generateResponse(message: string): string {
  const lowerMsg = message.toLowerCase();
  
  // 신체검사 관련 질문
  if (lowerMsg.includes('신체검사') || lowerMsg.includes('체중') || lowerMsg.includes('키') || lowerMsg.includes('몸무게')) {
    if (lowerMsg.includes('1급') || lowerMsg.includes('1 급') || lowerMsg.includes('일급') || lowerMsg.includes('1등급') || lowerMsg.includes('일등급')) {
      return "신체검사 1급은 정상체중, 신장, 시력, 질병이 없는 건강한 신체 상태를 의미합니다. 현역으로 복무할 수 있는 기준입니다.";
    } else if (lowerMsg.includes('2급') || lowerMsg.includes('2 급') || lowerMsg.includes('이급') || lowerMsg.includes('2등급') || lowerMsg.includes('이등급')) {
      return "신체검사 2급은 경도의 문제가 있지만 현역으로 복무 가능한 상태입니다. 일부 보직 제한이 있을 수 있습니다.";
    } else if (lowerMsg.includes('3급') || lowerMsg.includes('3 급') || lowerMsg.includes('삼급') || lowerMsg.includes('3등급') || lowerMsg.includes('삼등급')) {
      return "신체검사 3급은 현역 복무는 어렵지만 보충역으로 복무 가능한 상태입니다. 사회복무요원 등으로 복무하게 됩니다.";
    } else if (lowerMsg.includes('4급') || lowerMsg.includes('4 급') || lowerMsg.includes('사급') || lowerMsg.includes('4등급') || lowerMsg.includes('사등급')) {
      return "신체검사 4급은 병역이 면제되는 상태입니다. 심각한 질병이나 장애가 있는 경우 해당됩니다.";
    } else if (lowerMsg.includes('5급') || lowerMsg.includes('5 급') || lowerMsg.includes('오급')) {
      return "신체검사 5급은 전시에만 소집되는 등급입니다. 재검 대상자로 분류되는 경우도 있습니다.";
    } else if (lowerMsg.includes('6급') || lowerMsg.includes('6 급') || lowerMsg.includes('육급')) {
      return "신체검사 6급은 질병이나 심신장애로 인해 병역이 면제되는 상태입니다.";
    } else if (lowerMsg.includes('7급') || lowerMsg.includes('7 급') || lowerMsg.includes('칠급')) {
      return "신체검사 7급은 재검 대상자로, 일정 기간 후 다시 신체검사를 받게 됩니다.";
    } else {
      return "신체검사는 1~7급으로 구분됩니다. 1~2급은 현역, 3급은 보충역, 4급은 전시근로역, 5급은 전시근로역(2차), 6급은 면제, 7급은 재검 대상입니다. 특정 등급에 대해 더 자세히 알고 싶으시면 '신체검사 1급이 뭐야?'와 같이 질문해주세요.";
    }
  }
  
  // 군 종류 관련 질문
  else if (lowerMsg.includes('군종') || lowerMsg.includes('군 종류') || lowerMsg.includes('육군') || lowerMsg.includes('해군') || lowerMsg.includes('공군') || lowerMsg.includes('해병')) {
    if (lowerMsg.includes('육군')) {
      return "육군은 21개월 복무하며, 대한민국 병역의 가장 기본이 되는 군대입니다. 다양한 보직과 특기가 있으며, 전국 각지에 부대가 있습니다.";
    } else if (lowerMsg.includes('해군')) {
      return "해군은 23개월 복무하며, 해상 작전을 담당합니다. 함정 근무, 잠수함 등 다양한 특기가 있으며 육군보다 2개월 더 복무합니다.";
    } else if (lowerMsg.includes('공군')) {
      return "공군은 24개월 복무하며, 항공 및 우주 작전을 담당합니다. 조종, 정비, 관제 등 다양한 특기가 있으며 육군보다 3개월 더 복무합니다.";
    } else if (lowerMsg.includes('해병')) {
      return "해병대는 21개월 복무하며, 상륙작전과 도서방어 등을 담당합니다. 훈련이 강도 높기로 유명하며, 정예부대로 알려져 있습니다.";
    } else {
      return "대한민국 군대는 육군(21개월), 해군(23개월), 공군(24개월), 해병대(21개월)로 구분됩니다. 각 군별로 복무기간과 특성이 다릅니다. 특정 군에 대해 더 알고 싶으시면 '육군은 어때?' 같이 질문해주세요.";
    }
  }
  
  // 사회복무요원 관련 질문
  else if (lowerMsg.includes('사회복무') || lowerMsg.includes('공익') || lowerMsg.includes('사회 복무') || lowerMsg.includes('사복')) {
    return "사회복무요원은 신체검사 3급 판정을 받은 사람이 복무하는 보충역입니다. 복무기간은 21개월이며, 행정기관, 학교, 병원 등 다양한 곳에서 근무할 수 있습니다. 주 5일 근무하며 일반적으로 출퇴근 형태로 복무합니다.";
  }
  
  // 병역 면제 관련 질문
  else if (lowerMsg.includes('면제') || lowerMsg.includes('군대 안가')) {
    return "병역 면제는 주로 신체검사 4급이나 6급 판정을 받은 경우에 해당합니다. 심각한 질병이나 장애가 있거나, 특수한 가정 상황(독자, 생계유지 등)이 인정되는 경우가 있습니다. 하지만 면제 기준은 엄격하며, 자세한 사항은 병무청 홈페이지나 지역 병무청에서 확인하시는 것이 좋습니다.";
  }
  
  // 입대 시기/일정 관련 질문
  else if (lowerMsg.includes('입대') || lowerMsg.includes('언제') || lowerMsg.includes('일정') || lowerMsg.includes('시기')) {
    return "입대 시기는 본인이 원하는 시기에 지원하거나, 병무청의 병역 판정검사 이후 통지에 따라 결정됩니다. 현역병 입영 신청은 병무청 홈페이지에서 가능하며, 원하는 시기와 부대를 선택할 수 있습니다. 단, 인원이 많은 시기는 경쟁률이 높을 수 있습니다.";
  }
  
  // 기본 응답
  else {
    return "안녕하세요! 군입대와 관련된 질문에 답변해 드립니다. 신체검사, 군 종류, 복무 기간, 사회복무요원, 입대 시기 등에 대해 물어보실 수 있습니다. 예: '신체검사 등급이 어떻게 되나요?', '육군과 공군의 차이점은?'";
  }
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: '유효한 메시지가 필요합니다' },
        { status: 400 }
      );
    }
    
    // 약간의 지연 효과를 주기 위한 setTimeout
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const reply = generateResponse(message);
    
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다' },
      { status: 500 }
    );
  }
} 