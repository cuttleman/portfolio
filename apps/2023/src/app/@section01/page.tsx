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
                <div>Why Cuttleman?</div>
                <pre>- cuttlefish + man</pre>
                <p>
                  display mean: 환경의 색에 잘 녹아드는 오징어처럼 어떤 조직이던지 그 색에 맞춰
                  녹아드는 사람이 되겠습니다.
                </p>
                <p>real mean: 유튜브에서 본 갑오징어가 너무 귀여워서 본인의 캐릭터로 만듬.</p>
              </li>
              <li>
                <div>Position</div>
                <p>Frontend Developer</p>
              </li>
              <li>
                <div>Hobby</div>
                <p>웹툰, 복싱, 3D 모델링(blender)</p>
              </li>
              <li>
                <div>Career</div>
                <p>2022.12 ~ 2023.06 : Quest3 Corp.</p>
                <p>2022.01 ~ 2022.10 : Metaverse World Corp.</p>
                <p>2021.09 ~ 2021.12 : Itamgames Corp.</p>
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
