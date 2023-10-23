import "./_styles/page.scss";

import ModelContainer from "@common/components/ModelContainer.client";
import { stats } from "@common/constants";

import ArmatureModel from "./_components/ArmatureModel.client";
import StatBadge from "./_components/StatBadge.client";
import StatGauge from "./_components/StatGauge.client";

const Section01 = () => {
  const [hpStat, ...restStats] = stats;

  return (
    <div className="section-container" id="info">
      <div className="section">
        <div className="section01">
          <div className="armature-view-container">
            <ModelContainer cameraPosition={[0, 0, 17]}>
              <ArmatureModel />
            </ModelContainer>
            <div className="property">
              {/* eslint-disable-next-line @next/next/no-img-element -- too small thing. */}
              <img alt="property" src="/image/water.svg" />
            </div>
          </div>
          <div className="stat">
            <StatGauge
              description={hpStat.description}
              id={hpStat.id}
              label={hpStat.label}
              max={hpStat.max}
              value={hpStat.value}
            />
            <p className="stat__badge-title">Status</p>
            <div className="stat__badge-container">
              {restStats.map((stat) => (
                <StatBadge
                  description={stat.description}
                  id={stat.id}
                  key={stat.id}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>
          </div>
          <div className="nick">Cuttleman</div>
          <div className="info">
            <ul>
              <li>
                <div>Who am I</div>
                <pre>- 안녕하세요. 웹 프론트엔드 개발자 이준오입니다.</pre>
                <p>1. 인터렉티브한 웹사이트에 관심이 많습니다 :)</p>
                <p>
                  2. NFT 마켓플레이스, 블록체인게임 홈페이지, 토큰 브릿지, 사내 어드민 등 프로젝트를
                  진행하였습니다.
                </p>
                <p>3. 디자이너와 원활하게 소통하며 퍼블리싱 + 프론트앤드 개발이 가능합니다.</p>
                <p>
                  4. 디자인시스템, 마이크로 프론트앤드, E2E 테스트를 실무에서 경험하길 희망합니다.
                </p>
                <p>5. 좌우명은 &#39;오늘은 몰라도 내일은 알자&#39; 입니다.</p>
              </li>
              <li>
                <div>Why Cuttleman?</div>
                <pre>- cuttlefish + man</pre>
                <p>
                  display mean: 환경의 색에 잘 녹아드는 오징어처럼 어떤 조직이던지 그 색에 맞춰
                  녹아드는 사람이 되겠습니다.
                </p>
                <p>real mean: 유튜브에서 본 갑오징어가 너무 귀여워서 본인의 캐릭터로 만듬.</p>
              </li>
              <li>
                <div>Hobby</div>
                <p>웹툰, 복싱, 꼬꼬무 (개발)공부</p>
              </li>
              <li>
                <div>Career</div>
                <p>2022.12 ~ 2023.06 : Quest3 Corp.</p>
                <p>2021.09 ~ 2022.11 : Metaverse World Corp.</p>
                <p>2019.12 ~ 2021.08 : Nomad Coders lecture</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section01;
