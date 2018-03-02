import React from 'react';
import { Collapse } from 'react-collapse';
import { SvgIcon } from 'vizz-components';
import { isDevice } from 'utils/general';
import { Row } from 'components/ui/Grid';

export default class Introduction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.toggleLines = this.toggleLines.bind(this);
  }

  toggleLines(event) {
    event.preventDefault();

    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    return (
      <div className="c-guidance-introduction">
        <section className="tab-section wrapper">
          <Row>
            <div className="column small-12 large-10 large-offset-1">
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
                      <SvgIcon name="icon-flood" className="-tiny" />
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
                <p className="text">Floods are the most frequent and damaging of all natural hazards globally. Between 1994 and 2013, floods accounted for 43% of all recorded natural events, affecting nearly 2.5 billion people. During exceptional years such as 1998 and 2010, total losses due to flooding have exceeded $40 billion. In the coming decades with climate change, urbanization and demographic growth, the impact of coastal, fluvial and pluvial flooding is expected to increase significantly. Effective flood risk management is critical to protect people and their livelihoods from flooding and to limit future losses.</p>
                <p className="text">Until recently, most flood risk management involved conventional engineering measures. These measures are sometimes referred to as “hard” engineering or “gray” infrastructure. Examples include building embankments, dams, levees, and channels to control flooding. Recently the concept of “nature-based solutions”, “ecosystem-based adaptation”, “eco-DRR” or “green infrastructure” has emerged as a good alternative or complement to traditional gray approaches. Nature-based solutions make use of natural processes and ecosystem services for functional purposes, such as decreasing flood risk or improving water quality. These interventions can be completely “green” (i.e. consisting of only ecosystem elements) or “hybrid” (i.e. a combination of ecosystem elements and hard engineering approaches).</p>
                <p className="text">Nature-based solutions can help mitigate flood (the focus of this guidance), drought, erosion and landslide.</p>

                {!this.state.expanded && <button className="c-btn -tertiary" onClick={this.toggleLines}>Read more</button>}

                <Collapse className="text-collapsed" isOpened={this.state.expanded}>
                  <p className="text">There is increasing momentum for the use of nature-based solutions as part of resilience-building strategies, sustainable adaptation, and disaster risk management portfolios. Awareness of nature-based solutions from communities, donors, and policy- and decision-makers is growing. Further, investors and the insurance industry are increasingly interested in nature-based solutions. From a climate change perspective, ecosystem-based adaptation has been highlighted as a priority investment area in global funds such as the Global Environment Facility or the Green Climate Fund.</p>
                  <p className="text">As with conventional engineering solutions, the effective application of nature-based solutions requires a comprehensive assessment and implementation process. However, nature-based solutions are often implemented on an ad-hoc basis. While there have been significant advances in the design and testing protocols for ecosystems and their role in risk mitigation, these solutions have yet to be fully evaluated and standardized. As a result, some nature-based projects for climate adaptation and disaster risk reduction have not been designed properly, leading to ineffective and unsustainable results. As is the case for engineering solutions, there is no ‘one size fits all’ approach given that climatic, ecological, and hazard characteristics are variable and are often poorly understood. However, the sector of traditional infrastructure has a long history in which they have fully developed protocols and standards, whereas nature-based solutions are emerging approaches that needs the same level of investigation of lessons learned and development of standards. Therefore, guidance and standards need to be developed for nature-based solutions which can aid project designers, implementers, funders, evaluators and others and others involved in project development. Guidance also facilitates achieving a common understanding of likely effectiveness and risk reduction outcomes. This guidance attempts to be one step towards standardized guidelines for all nature-based solutions.</p>
                  <p className="text">The objective of this guidance is to present five principles and implementation guidance for planning, such as evaluation, design, and implementation of nature-based solutions for flood risk management as an alternative to or complementary to conventional engineering measures. The potential users of these principles and implementation steps are professionals in risk management and climate adaptation, NGOs, donors, and international organisations. This guidance was developed in cooperation with a large and diverse group of international funding agencies, research institutes, NGOs, governmental organisations, and engineering firms.</p>
                </Collapse>

                {this.state.expanded && <button className="c-btn -tertiary" onClick={this.toggleLines}>Stop read more</button>}

                <h2 className="h2">This guidance has two parts:</h2>
                <ul className="info-list -normal">
                  <li><span className="item-list-title">1. Principles</span>, describing key considerations to consider when planning nature-based solutions.</li>
                  <li><span className="item-list-title">2. Implementation guidance</span>, describing the timeline and activities needed to implement nature-based solutions.</li>
                </ul>
              </div>
            </div>
          </Row>
        </section>
        {!isDevice() && <section className="tab-section wrapper">
          <Row>
            <div className="column small-12 medium-8 medium-offset-2">
              <h2>Nature-based or other risk reduction measures?</h2>
              <img src="/images/decision_tree.svg" alt="Scheme" className="decision-tree" />
            </div>
          </Row>
        </section>}
      </div>
    );
  }
}

Introduction.propTypes = {};
Introduction.defaultProps = {};
