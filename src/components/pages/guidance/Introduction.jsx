import React from 'react';
import { SvgIcon } from 'vizz-components';
import { isDevice } from 'utils/general';
import { Row } from 'components/ui/Grid';

export default class Introduction extends React.Component {
  render() {
    return (
      <div className="c-guidance-introduction">
        <section className="tab-section wrapper">
          <Row>
            <div className="column small-12 medium-8 medium-offset-2">
              <h3 className="tag">Guidance</h3>
              <h1 className="title">Introduction</h1>
              <div className="intro-graph">
                <div className="water-viel"></div>
                <div className="graph-title">
                  <p>Natural events recorded</p>
                  <p>between 1994 and 2013</p>
                </div>

                <div className="stats">
                  <div className="data">
                    <h2 className="label">
                      <SvgIcon name="icon-flag" className="-tiny" />
                      Floods
                    </h2>
                    <p className="number">40%</p>
                  </div>

                  <div className="data">
                    <h2 className="label">
                      People affected
                    </h2>
                    <p className="number">2.5 billion</p>
                  </div>
                </div>
              </div>
              <div className="text-container">
                <p className="text">The total losses from floods in exceptional years such as 1998 and 2010 exceeded $40 billion. With climate change, urbanization trends and demographic growth, the impacts of floods are accelerating and are expected to increase significantly in the next decades. Designing effective flood risk management options is critical to limit these losses, and to protect people and their livelihoods from flooding.</p>
                <p className="text">Until recently, most flood risk management responses have focused on using “hard” engineering solutions or “gray” infrastructure. These approaches include building embankments, dams, levees and channels to control flooding. In recent years, the concept of “nature-based solutions,” “ecosystem-based adaptation” or “green infrastructure” has been proposed widely as a good alternative or complement to traditional infrastructure. They provide a cost-effective way to provide flood protection and reduce vulnerability to climate change while also providing multiple benefits to the environment and local communities including sustaining livelihoods, improving food security and sequestering carbon. Such solutions are implemented on the level of river basins (e.g. reforestation and green embankments), coastal zones (e.g. mangroves and wetlands) and cities (e.g. urban parks).</p>
                <p className="text">There is a growing momentum for the use of nature-based solutions as part of resilience-building strategies and sustainable adaptation and disaster risk management portfolios. Interest from communities, donors, policy and decision makers, and even investors and the insurance industry is growing. From the climate change perspective, ecosystem-based adaptation has been highlighted as a priority investment area in global funds such as the Global Environment Facility or the Green Climate Fund.  However, similar to hard engineering solutions, the effective implementation of nature-based solutions requires a comprehensive assessment and implementation process. Currently, nature-based solutions are still often implemented on an ad-hoc basis and while there have been significant advances in the design and testing protocols for ecosystems and their role in risk mitigation, these are yet to be fully evaluated and standardized.  As a result, some ecosystem restoration projects for climate adaptation and disaster risk reduction have not been designed properly, leading to ineffective and unsustainable results. While there is no ‘one-size fits all’ approach and climatic, ecological and hazard characteristics are regionally and even locally variable, guidance can be developed which can aide local and regional resource managers, flood risk professionals, funders and others involved in project development achieve a common understanding of likely effectiveness and flood risk reduction outcomes.
                Nature-based solutions present an opportunity to respond to the quest for sustainable and integrated adaptation and risk management strategies to protect against hazards and strengthen the resilience of the system overall.  Seizing this opportunity necessitates a consistent approach to design nature-based solutions to deliver effective and sustainable risk reduction benefits in addition to other development benefits.</p>
                <p className="text">This guidance makes a case for a structured approach to design and implement nature-based solutions that are chosen as an alternative or complement to hard-engineering measures. It is aimed at disaster risk management and climate adaptation professionals who plan flood risk management interventions in a variety of settings, NGOs that often implement nature-based solutions, as well as staff of donors and international agencies who design, review or fund such projects. This guidance has two parts:
                Guiding principles, which describe the key considerations that should be taken into account when planning nature-based solutions
                Practical implementation guidance, which describes the timeline and activities of nature-based solutions.</p>
              </div>
            </div>
          </Row>
        </section>
        {!isDevice() && <section className="tab-section wrapper">
          <Row>
            <div className="column small-12 medium-8 medium-offset-2">
              <h2>Nature-based or other risk reduction measures?</h2>
              <img src="" alt="Scheme" />
            </div>
          </Row>
        </section>}
      </div>
    );
  }
}

Introduction.propTypes = {};
Introduction.defaultProps = {};
