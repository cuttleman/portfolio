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
            description="책 홍보용 정적 웹사이트 개발. 1차 외주에서 이벤트 기간내 누적 사용자수 50만 달성후 2차 외주 계약."
            mainImage="/image/outsourcing.webp"
            scopes={["UI 퍼블리싱", "캐러셀 슬라이드 바닐라코드 개발", "동적 공유이미지", "GA"]}
            specs={["Frontend: javascript, scss, gulp, pug", "Backend: firebase"]}
            title="Outsourcing: 관계유형테스트 / 방구석 골든벨"
          />
        </div>
      </div>
    </div>
  );
};

export default Project03;
