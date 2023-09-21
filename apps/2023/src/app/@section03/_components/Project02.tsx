import Content from "./Content";

const Project02 = () => {
  return (
    <div className="section-container" id="project2">
      <div className="section">
        <div className="section03">
          {/* Daily Check-in */}
          <Content
            description="블록체인게임 오픈전 게임 아이템을 일일 보상으로 주는 이벤트 페이지 프론트 개발."
            mainImage="/image/metaverse_world1.webp"
            scopes={[
              "UI 퍼블리싱",
              "메인 홈페이지에 보여질 UI 및 런처프로그램에서 띄워질 webview 화면 개발",
              "일일 보상 claim 기능 구현",
            ]}
            specs={[
              "Framework: next@12, react@17",
              "State Management: recoil",
              "Style: emotion",
              "CI/CD: github-actions, serverless-component(AWS)",
            ]}
            title="Metaverse World: Daily Check-in"
          />

          {/* Presale */}
          <Content
            description="블록체인게임 캐릭터 코스튬 사전판매 프론트 개발."
            mainImage="/image/metaverse_world2.webp"
            scopes={[
              "퍼블리셔분과 협업하여 특정 UI 퍼블리싱",
              "블록체인과 rpc 통신하여 구매/교환 기능 구현",
              "구매한 코스튬박스 뽑기(가챠)시 연출 기획 및 개발",
            ]}
            specs={[
              "Framework: next@12, react@17",
              "State Management: recoil",
              "Style: emotion, sass",
              "CI/CD: github-actions, serverless-component(AWS)",
            ]}
            title="Metaverse World: Presale"
          />
        </div>
      </div>
    </div>
  );
};

export default Project02;
