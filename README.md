# 군입대 점수 계산 홈페이지 챗봇

군입대 점수 계산 홈페이지(www.allformillitary.site)에 삽입할 수 있는 챗봇 솔루션입니다. 군입대 관련 정보를 Supabase 데이터베이스에서 가져와 사용자 질문에 답변합니다.

## 기능

- 간단한 군입대 관련 질문에 대한 응답
- 사용자 친화적인 인터페이스
- 웹사이트에 쉽게 삽입 가능한 스크립트

## 기술 스택

- Next.js
- TypeScript
- Supabase (데이터베이스)
- Vercel (배포)

## 설치 및 실행 방법

### 로컬 개발 환경 설정

1. 저장소 클론
   ```bash
   git clone <repository-url>
   cd military-chatbot
   ```

2. 의존성 설치
   ```bash
   npm install
   ```

3. 환경 변수 설정
   `.env.local` 파일을 루트 디렉토리에 생성하고 다음 내용을 추가합니다:
   ```
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-anon-key
   ```

4. 개발 서버 실행
   ```bash
   npm run dev
   ```

5. 브라우저에서 접속
   `http://localhost:3000/example.html`을 방문하여 챗봇 예제 페이지를 확인하세요.

## Supabase 설정

1. Supabase 프로젝트 생성

2. `military_info` 테이블 생성:
   ```sql
   CREATE TABLE military_info (
     id SERIAL PRIMARY KEY,
     item TEXT NOT NULL,
     description TEXT NOT NULL,
     score_criteria TEXT NOT NULL
   );
   ```

3. 샘플 데이터 추가:
   ```sql
   INSERT INTO military_info (item, description, score_criteria)
   VALUES 
     ('신체검사 1급', '신체 건강상태 최상위 등급', '높은 선발 가능성'),
     ('TOEIC 900점', '영어 능력 우수', '특기병 가산점 5점'),
     ('수능 국어 1등급', '국어 능력 최상위 등급', '정보병 가산점 3점'),
     ('자격증 보유', 'IT 관련 자격증', '기술병 지원 가능');
   ```

## 배포 방법

1. Vercel로 배포
   ```bash
   vercel
   ```

2. 환경 변수 설정
   Vercel 프로젝트 설정에서 환경 변수를 추가합니다.

3. 완료
   배포된 URL을 확인하고 웹사이트에 스크립트를 삽입합니다:
   ```html
   <script src="https://your-project-url.vercel.app/chatbot.js"></script>
   <div id="chatbot-container"></div>
   ```

## 웹사이트 삽입 방법

웹사이트에 챗봇을 추가하려면 다음 코드를 HTML 페이지에 삽입하세요:

```html
<!-- 챗봇 컨테이너 -->
<div id="chatbot-container"></div>

<!-- 챗봇 스크립트 -->
<script src="https://your-project-url.vercel.app/chatbot.js"></script>
```

## 라이센스

MIT
# chatprac
