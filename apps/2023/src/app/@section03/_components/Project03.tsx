import Content from "./Content";

const Project03 = () => {
  return (
    <div className="section-container" id="project3">
      <div className="section">
        <div className="section03">
          {/* Mad Matic */}
          <Content
            description="네이티브 토큰을 보상으로 주는 일일 추첨 이벤트 페이지 프론트 개발."
            mainImage="/image/quest3_1.webp"
            scopes={[
              "UI 퍼블리싱",
              "티켓 발급, 추첨결과에 따른 프론트 기능 개발",
              "특정시간에 추첨되는 시스템 개발",
            ]}
            specs={[
              "Backend: nodejs",
              "Frontend: next@13(pages router), react@17, react-query, contextAPI, chakraUI",
              "Style: emotion",
              "CI/CD: github-actions, vercel",
            ]}
            title="Quest3: Mad Matic"
          />

          {/* Daily Check-in */}
          <Content
            description="게임내 특정 활동을 통한 일일 미션 이벤트 페이지 개발."
            mainImage="/image/quest3_2.webp"
            scopes={[
              "UI 퍼블리싱 및 프론트 기능 개발",
              "DB 스키마 및 rest api 구현",
              "디자이너와 의견조율을 통해 디자인 개선",
            ]}
            specs={[
              "Backend: koa.js, dynamodb",
              "Frontend: next@13(pages router), react@17, react-query, contextAPI, chakraUI",
              "Style: emotion",
              "CI/CD: github-actions, vercel",
            ]}
            title="Quest3: Daily Check-in"
          />
        </div>
      </div>
    </div>
  );
};

export default Project03;
