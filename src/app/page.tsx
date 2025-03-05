import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">군입대 정보 도우미</h1>
        <p className="text-center text-gray-500">오른쪽 하단의 채팅 아이콘을 클릭하여 질문하세요</p>
      </header>
      
      <main className="flex flex-col gap-8 items-center w-full max-w-3xl">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard 
            title="신체검사 등급" 
            description="군 신체검사는 1~7급으로 구분됩니다. 1~2급은 현역, 3급은 보충역, 4급은 전시근로역, 5급은 전시근로역(2차), 6급은 면제, 7급은 재검 대상입니다." 
          />
          <InfoCard 
            title="군 종류 및 복무기간" 
            description="육군(21개월), 해군(23개월), 공군(24개월), 해병대(21개월)로 구분됩니다. 각 군별로 복무기간과 특성이 다릅니다." 
          />
          <InfoCard 
            title="사회복무요원" 
            description="신체검사 3급 판정을 받은 사람이 복무하는 보충역입니다. 복무기간은 21개월이며, 행정기관, 학교, 병원 등에서 근무합니다." 
          />
          <InfoCard 
            title="입대 시기/일정" 
            description="입대 시기는 본인이 원하는 시기에 지원하거나, 병무청의 병역 판정검사 이후 통지에 따라 결정됩니다." 
          />
        </div>
      </main>
      
      <footer className="w-full max-w-3xl text-center p-4 text-gray-500 text-sm">
        © 2023 군입대 정보 도우미 | 이 사이트는 정보 제공을 목적으로 합니다.
      </footer>
    </div>
  );
}

function InfoCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
