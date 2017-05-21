import React from 'react';
import ScrollMagic from 'scrollmagic';
import MoveTo from 'moveto';
import { isDevice } from 'utils/general';
import { Row } from 'components/ui/Grid';

export default class Implementation extends React.Component {
  componentDidMount() {
    const triggers = ['implementation1', 'implementation2', 'implementation3',
      'implementation4', 'implementation5'];
    const controller = new ScrollMagic.Controller();

    if (isDevice()) {
      this.setStepsButtonScene(controller);
      this.setAnchorScroll('js-scroll-steps');
      this.setAnchorScroll('js-scroll-steps-end');
    } else {
      this.setFixedMenuScenes(controller, triggers);
    }

    triggers.forEach((tr, i) => this.setAnchorScroll(`js-scroll-imp${i + 1}`));
  }

  setStepsButtonScene(controller) {
    const duration = document.querySelector('#implementations').offsetHeight - (screen.height + 90);

    new ScrollMagic.Scene({
      triggerElement: '#implementations',
      triggerHook: 'onLeave',
      duration
    })
    .setClassToggle('.js-scroll-steps', '-active')
    .addTo(controller);
  }

  setFixedMenuScenes(controller, triggers) {
    // build fixed menu scene
    new ScrollMagic.Scene({ triggerElement: '#fixedMenu', triggerHook: 0 })
      .setPin('#fixedMenu')
      .offset(-10)
      .addTo(controller);

    // build sections scene
    triggers.forEach((tr, i) => {
      new ScrollMagic.Scene({
        triggerElement: `#${tr}`,
        triggerHook: 'onLeave',
        duration: document.querySelector(`#${tr}`).offsetHeight
      })
      .setClassToggle(`#anc${i + 1}`, '-active') // add class toggle
      .addTo(controller);
    });
  }

  setAnchorScroll(triggerClass) {
    const triggerEl = document.getElementsByClassName(triggerClass)[0];
    const moveTo = new MoveTo({
      tolerance: 0,
      duration: 800,
      easing: 'easeOutQuart'
    });

    moveTo.registerTrigger(triggerEl);
  }

  render() {
    return (
      <div className="c-guidance-implementation">
        {/* Heading section */}
        <section className="tab-section -intro wrapper">
          <Row>
            <div className="column small-12 medium-8 medium-offset-2">
              <h3 className="tag">Guidance</h3>
              <h1 className="title">Implementation guidance</h1>
              <p className="text">Nature-based solutions projects require the consideration of biophysical processes, natural dynamics, and the interconnectivity of ecosystem services, which calls for the engagement of experts from different disciplines such as hydrology, engineering, ecology, economics, and social sciences. This section of the guidance summarizes the steps needed for the assessment, design, implementation, and monitoring and evaluation of nature-based solutions for flood risk management. It follows the general cycle of a flood risk management project and provides more information and detail on specific aspects that need further attention when implementing nature-based solutions. These guidelines build and expand upon existing guidance notes developed by other partners, including NOAA and Ecoshape[]. Whereas these existing guidelines focus on specific parts of the design (Ecoshape) or preparation (NOAA) of nature-based solutions, this document attempts to cover the entire project cycle from preparation to monitoring and evaluation.</p>
              <p className="text">As with other risk management projects, the design and implementation of nature-based solutions should be done in a participative manner with a full engagement of all relevant stakeholders.  This is particularly important as nature-based solutions present a tangible opportunity to address flood risks by aligning conservation, development, and poverty alleviation objectives and interests which can create new synergies and collaborations between governments, local communities, conservation, development and humanitarian aid organizations, and relevant private sector stakeholder.</p>
            </div>
          </Row>
        </section>

        <a className="show-steps js-scroll-steps" href="#fixedMenu">Show all steps</a>

        <section className="tab-section wrapper">
          <Row>
            <div className="column small-12 medium-3">
              <div id="fixedMenu" className="fixed-menu">
                {isDevice() && <h1 className="title">Implementation steps</h1>}
                <ul className="menu-list">
                  <li id="anc1"><a className="js-scroll-imp1" href="#implementation1">01. Conduct Ecosystem, Hazard, and Risk Assessments</a></li>
                  <li id="anc2"><a className="js-scroll-imp2" href="#implementation2">02. Develop Nature-based Risk Management Strategy</a></li>
                  <li id="anc3"><a className="js-scroll-imp3" href="#implementation3">03.Estimate the Cost, Benefit and Effectiveness</a></li>
                  <li id="anc4"><a className="js-scroll-imp4" href="#implementation4">04. Select, Plan, and Design the Intervention</a></li>
                  <li id="anc5"><a className="js-scroll-imp5" href="#implementation5">05. Financing the Project</a></li>
                </ul>
              </div>
            </div>
            <div id="implementations" className="column small-12 medium-9">
              <section id="implementation1">
                {isDevice() && <h3 className="tag">Step 1</h3>}
                <h2 className="section-title">Conduct Ecosystem, Hazard, and Risk Assessments</h2>
                <p className="text">Conduct an accurate assessment of the type and intensity of the flood hazard, and its effect on population, assets, and infrastructure with specific attention to the role of the ecosystem.</p>

                <h3 className="info-title -secondary">1. Identify the study area and conduct a system assessment</h3>
                <p className="text">Outline the direct area of interest, and assess the wider natural and socioeconomic system. This should include an assessment of the ecosystem assets and services they provide as well as the main stakeholders. Identify the main flood hazard type affecting the study area and the causes. Main flood hazard types to consider are river, coastal, and urban flooding, which can be driven by a range of factors such as extreme local rainfall, high river discharge, or coastal storm surge. Broadly define the various ecosystems typologies in the area and their risk reduction potential. Note that the area relevant from an ecosystem management perspective may be much larger than the area at direct risk of flooding (see “Guiding principle 4: Large temporal and spatial scale”).</p>

                <h3 className="info-title -secondary">2. Gather data</h3>
                <p className="text">Collect data that can be used for the risk assessment. This includes data for hazard (e.g. rainfall, discharge, sea level, and elevation data), exposure (e.g. population density, infrastructure location) and vulnerability (e.g. building typology, poverty) assessment. These data can be difficult to collect, as they tend to be available in a wide range of places, including online at OpenStreetMap.org or scattered across government ministries. In data scarce regions, the analysis often needs to rely on remote sensing or other globally available data products.</p>

                <h3 className="info-title -secondary">3. Assess current ecosystem extent, condition, and functioning</h3>
                <p className="text">Analyze if there are present ecosystems that currently play a major role in flood protection, and understand how these ecosystems can further contribute to reducing flood risk. Ecosystem status should be assessed by looking at indicators, such as biodiversity, species abundance, age, density, health and biomass. Evaluate evolution of ecosystems in the past and obtain a first idea of ecosystem stability and resilience in the future through insight in abiotic boundary conditions and future trends that may influence these conditions. An assessment of tenure and management of ecosystems is also critical. Identifying the role of ecosystems in reducing risk can be done by examining their role in: reducing or regulating hazards (wave attenuation, current reduction, etc.), reducing people and assets exposed to hazards (by keeping people out of harms’ way), and reducing vulnerability (through supporting livelihoods and economies and provisioning key services). Qualitatively articulate what the potential is for expanding risk reduction potential of ecosystems by conservation or restoration efforts.</p>

                <h3 className="info-title -secondary">4. Model current and future flood hazard </h3>
                <p className="text">Conduct a probabilistic hydrological and hydraulic modelling exercise, mapping the potential intensity and location of all types of flooding. This should result in potential inundation maps for a range of return periods.</p>

                <h3 className="info-title -secondary">5. Quantify current and future flood exposure and risk</h3>
                <p className="text">Combine the flood hazard maps with exposure and vulnerability information to produce estimates of human and economic exposure and risk. Future scenarios should be developed using climate change scenarios affecting flood hazard, and socioeconomic scenarios informing expected changes in population, land-use change, and urbanization.</p>


                <article className="extra-info">
                  <h2 className="info-title -principal">Example projects</h2>
                  <p className="text">The European Commission and UNEP led a Coastal Partners project in Port Salut, Haiti. National and community baseline assessments were undertaken in local hill, shore, and sea environments to identify exposed and vulnerable areas and select appropriate reforestation and revegetation interventions. The marine and terrestrial field surveys, remote sensing, and GIS modeling developed detailed baseline maps and modeled current and future exposure under different ecosystem management scenarios. Interviews, multi-stakeholder focus group discussions, and participatory mapping also contributed to the baseline assessments.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text">UNEP (2016). Coastal Partners: Applying ecosystem-based disaster risk reduction (Eco-DRR) through a ridge-to-reef approach in Port Salut, Haiti.</p>

                  <h3 className="info-title">More information</h3>
                  <ul className="info-list">
                    <li>- NOAA Guidance for Assessing the Costs and Benefits of Green Infrastructure</li>
                    <li>- Methodologies for assessing dynamic risk</li>
                    <li>- Open-source hazard data and screening</li>
                    <li>- WRI Global Flood Analyzer</li>
                    <li>- Information on finding data for risk assessments at Open Data for Resilience Initiative (OpenDRI)</li>
                  </ul>
                </article>
              </section>

              <section id="implementation2">
                {isDevice() && <h3 className="tag">Step 2</h3>}
                <h2 className="section-title">Implementation 2</h2>
                <p className="text">Conduct an accurate assessment of the type and intensity of the flood hazard, and its effect on population, assets, and infrastructure with specific attention to the role of the ecosystem.</p>

                <h3 className="info-title -secondary">1. Identify the study area and conduct a system assessment</h3>
                <p className="text">Outline the direct area of interest, and assess the wider natural and socioeconomic system. This should include an assessment of the ecosystem assets and services they provide as well as the main stakeholders. Identify the main flood hazard type affecting the study area and the causes. Main flood hazard types to consider are river, coastal, and urban flooding, which can be driven by a range of factors such as extreme local rainfall, high river discharge, or coastal storm surge. Broadly define the various ecosystems typologies in the area and their risk reduction potential. Note that the area relevant from an ecosystem management perspective may be much larger than the area at direct risk of flooding (see “Guiding principle 4: Large temporal and spatial scale”).</p>

                <h3 className="info-title -secondary">2. Gather data</h3>
                <p className="text">Collect data that can be used for the risk assessment. This includes data for hazard (e.g. rainfall, discharge, sea level, and elevation data), exposure (e.g. population density, infrastructure location) and vulnerability (e.g. building typology, poverty) assessment. These data can be difficult to collect, as they tend to be available in a wide range of places, including online at OpenStreetMap.org or scattered across government ministries. In data scarce regions, the analysis often needs to rely on remote sensing or other globally available data products.</p>

                <h3 className="info-title -secondary">3. Assess current ecosystem extent, condition, and functioning</h3>
                <p className="text">Analyze if there are present ecosystems that currently play a major role in flood protection, and understand how these ecosystems can further contribute to reducing flood risk. Ecosystem status should be assessed by looking at indicators, such as biodiversity, species abundance, age, density, health and biomass. Evaluate evolution of ecosystems in the past and obtain a first idea of ecosystem stability and resilience in the future through insight in abiotic boundary conditions and future trends that may influence these conditions. An assessment of tenure and management of ecosystems is also critical. Identifying the role of ecosystems in reducing risk can be done by examining their role in: reducing or regulating hazards (wave attenuation, current reduction, etc.), reducing people and assets exposed to hazards (by keeping people out of harms’ way), and reducing vulnerability (through supporting livelihoods and economies and provisioning key services). Qualitatively articulate what the potential is for expanding risk reduction potential of ecosystems by conservation or restoration efforts.</p>

                <h3 className="info-title -secondary">4. Model current and future flood hazard </h3>
                <p className="text">Conduct a probabilistic hydrological and hydraulic modelling exercise, mapping the potential intensity and location of all types of flooding. This should result in potential inundation maps for a range of return periods.</p>

                <h3 className="info-title -secondary">5. Quantify current and future flood exposure and risk</h3>
                <p className="text">Combine the flood hazard maps with exposure and vulnerability information to produce estimates of human and economic exposure and risk. Future scenarios should be developed using climate change scenarios affecting flood hazard, and socioeconomic scenarios informing expected changes in population, land-use change, and urbanization.</p>


                <article className="extra-info">
                  <h2 className="info-title -principal">Example projects</h2>
                  <p className="text">The European Commission and UNEP led a Coastal Partners project in Port Salut, Haiti. National and community baseline assessments were undertaken in local hill, shore, and sea environments to identify exposed and vulnerable areas and select appropriate reforestation and revegetation interventions. The marine and terrestrial field surveys, remote sensing, and GIS modeling developed detailed baseline maps and modeled current and future exposure under different ecosystem management scenarios. Interviews, multi-stakeholder focus group discussions, and participatory mapping also contributed to the baseline assessments.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text">UNEP (2016). Coastal Partners: Applying ecosystem-based disaster risk reduction (Eco-DRR) through a ridge-to-reef approach in Port Salut, Haiti.</p>

                  <h3 className="info-title">More information</h3>
                  <ul className="info-list">
                    <li>- NOAA Guidance for Assessing the Costs and Benefits of Green Infrastructure</li>
                    <li>- Methodologies for assessing dynamic risk</li>
                    <li>- Open-source hazard data and screening</li>
                    <li>- WRI Global Flood Analyzer</li>
                    <li>- Information on finding data for risk assessments at Open Data for Resilience Initiative (OpenDRI)</li>
                  </ul>
                </article>
              </section>
            </div>
          </Row>
        </section>

        <a id="showStepsEnd" className="show-steps -relative js-scroll-steps-end" href="#fixedMenu">Show all steps</a>
      </div>
    );
  }
}

Implementation.propTypes = {};
Implementation.defaultProps = {};
