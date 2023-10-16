import Content from "./Content";

const Project03 = () => {
  return (
    <div className="section-container" id="project3">
      <div className="section">
        <div className="section03">
          {/* Bridge */}
          <Content
            description="블록체인 네트워크간 자사 거버넌스 토큰을 교환해주는 브릿지 서비스 리뉴얼."
            mainImage="/image/itamgames1.webp"
            scopes={[
              "UI 퍼블리싱",
              "기존 브릿지 기능 마이그레이션 및 리펙토링",
              "대기상태인 교환이력들 Infinity scroll에서 Pagination 적용된 리스트로 개선",
            ]}
            specs={[
              "Library: react@16",
              "State Management: contextAPI",
              "Style: sass, styled-components",
              "CI/CD: github-actions, AWS CodePipeline",
            ]}
            title="Metaverse World: Token Bridge"
          />

          {/* Staking */}
          <Content
            description="게임 아이템을 예치하여 토큰을 이자로 얻는 스테이킹 프론트 개발."
            mainImage="/image/itamgames2.webp"
            scopes={["UI 퍼블리싱", "블록체인과 rpc 통신하여 예금/출금기능 구현"]}
            specs={[
              "Library: react@16",
              "State Management: contextAPI",
              "Style: styled-components",
            ]}
            title="Metaverse World: Staking Pool"
          />
        </div>
      </div>
    </div>
  );
};

export default Project03;
