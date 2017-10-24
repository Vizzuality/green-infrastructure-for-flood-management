import React from 'react';
import ScrollMagic from 'scrollmagic';
import MoveTo from 'moveto';
import { isDevice } from 'utils/general';
import { Row } from 'components/ui/Grid';

export default class Implementation extends React.Component {
  componentDidMount() {
    const triggers = ['implementation1', 'implementation2', 'implementation3',
      'implementation4', 'implementation5', 'implementation6', 'implementation7'];
    const controller = new ScrollMagic.Controller();

    if (isDevice()) {
      this.setStepsButtonScene(controller);
      // Moveto js not working
      // this.setAnchorScroll('js-scroll-steps');
      // this.setAnchorScroll('js-scroll-steps-end');
    } else {
      this.setFixedMenuScenes(controller, triggers);
    }

    // Moveto js not working
    // triggers.forEach((tr, i) => this.setAnchorScroll(`js-scroll-imp${i + 1}`));
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
            <div className="column small-12 large-10 large-offset-1">
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
                  <li id="anc3"><a className="js-scroll-imp3" href="#implementation3">03. Estimate the Cost, Benefit and Effectiveness</a></li>
                  <li id="anc4"><a className="js-scroll-imp4" href="#implementation4">04. Select, Plan, and Design the Intervention</a></li>
                  <li id="anc5"><a className="js-scroll-imp5" href="#implementation5">05. Financing the Project</a></li>
                  <li id="anc6"><a className="js-scroll-imp6" href="#implementation6">06. Implementation and Construction</a></li>
                  <li id="anc7"><a className="js-scroll-imp7" href="#implementation7">07. Monitor and Maintain, Inform Future Practices</a></li>
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
                <p className="text">Conduct a probabilistic hydrological and hydraulic modeling exercise, mapping the potential intensity and location of all types of flooding. This should result in potential inundation maps for a range of return periods.</p>

                <h3 className="info-title -secondary">5. Quantify current and future flood exposure and risk</h3>
                <p className="text">Combine the flood hazard maps with exposure and vulnerability information to produce estimates of human and economic exposure and risk. Future scenarios should be developed using climate change scenarios affecting flood hazard, and socioeconomic scenarios informing expected changes in population, land-use change, and urbanization.</p>


                <article className="extra-info">
                  <h2 className="info-title -principal">Best Practice Examples</h2>
                  <p className="text">The European Commission and UNEP led a Coastal Partners project in Port Salut, Haiti. National and community baseline assessments were undertaken in local hill, shore, and sea environments to identify exposed and vulnerable areas and select appropriate reforestation and revegetation interventions. The marine and terrestrial field surveys, remote sensing, and GIS modeling developed detailed baseline maps and modeled current and future exposure under different ecosystem management scenarios. Interviews, multi-stakeholder focus group discussions, and participatory mapping also contributed to the baseline assessments.</p>
                </article>
              </section>

              <section id="implementation2">
                {isDevice() && <h3 className="tag">Step 2</h3>}
                <h2 className="section-title">Develop Nature-based Risk Management Strategy</h2>
                <p className="text">Identify possible strategies to reduce flood risk and evaluate whether nature-based solutions is a likely alternative.</p>

                <h3 className="info-title -secondary">1. Select a flood reduction target</h3>
                <p className="text">Identify the acceptable level of risk and the reasonable investments available for risk reduction measures. Clearly identify the time horizon for the risk management approach (at least 20 years, and preferably 50 years or longer). Specify indicators related to the risk reduction target based on the risk assessment, such as prevented flood damages or affected people.</p>

                <h3 className="info-title -secondary">2. Analyze the governance and socioeconomic situation</h3>
                <p className="text">Assess the legal, regulatory, financing, social, economic, and political circumstances and their effect on the feasibility of implementing various risk reduction interventions. Local or national policies may affect the government prioritization of ecological or engineering interventions. Assess the dependence of communities on the ecosystem, and how this could be influenced by interventions.</p>

                <h3 className="info-title -secondary">3. Identify feasible green or hybrid options that could be more effective than gray options</h3>
                <p className="text">Based on the ecosystem analysis and flood risk assessment, identify possible green or hybrid solutions to address the specific flood risk impact. Consider that combinations of green, gray and non-structural measures may be needed to address the specific flood risk issue. Consider how conservation and expansion of the current ecosystem can contribute to reducing flood risk. Look at previous projects and possible green solutions. Assess what factors may influence the stability and performance of vital ecosystems, and how they can be integrated into the wider system management. Construct a portfolio of feasible strategies and accompanying measures.</p>

                <h3 className="info-title -secondary">4. Involve stakeholders to select realistic options</h3>
                <p className="text">Hold interactive stakeholder consultations to discuss the possible interventions and get their input. Select options that are both technically feasible and desirable from a stakeholder perspective. Discuss prioritization of risk reduction targets and ecosystem aspects, using information from the risk and ecosystem assessments.</p>

                <article className="extra-info">
                  <h2 className="info-title -principal">Best Practice Examples</h2>
                  <p className="text">UNEP’s project “Building capacity for coastal Ecosystem-based Adaptation in Small Island Developing States” is being implemented in Grenada and Seychelles. In Grenada, social and ecological vulnerability impact assessments (VIAs) were carried out in three local sites (Lauriston Beach, Windward and Grand Anse Bay). The focus of the VIA process was on modelling and analyzing the impacts of climate change in terms of extreme events (e.g. hurricanes and tropical storms) and sea level rise on coastal communities and coastal/marine habitats, highlighting the problem of beach erosion in all three areas. Human activities, such as building construction on beaches, were also examined. Various coastal adaptation options were proposed based on the identified vulnerabilities including coral reef and mangrove restoration, locally managed marine area, beach nourishment, breakwaters, stone revetments, among others.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text">Wetlands International (2016). Promoting Ecosystems for Disaster Risk Reduction and Climate Change Adaptation. URL: <a href="https://www.wetlands.org/publications/promoting-ecosystems-for-disaster-risk-reduction-and-climate-change-adaptation-opportunities-for-integration/" target="_blank">https://www.wetlands.org/publications/promoting-ecosystems-for-disaster-risk-reduction-and-climate-change-adaptation-opportunities-for-integration/</a></p>

                  <h3 className="info-title">More information</h3>
                  <ul className="info-list">
                    <li>- Decision tree on whether nature-based solutions can be effective for your project: <a href="http://www.naturalinfrastructureforbusiness.org/tools/#tree" target="_blank">http://www.naturalinfrastructureforbusiness.org/tools/#tree</a></li>
                    <li>- An overview of possible green measures for flood risk management by the Nature Conservancy (2014): <a href="https://www.conservationgateway.org/ConservationPractices/Freshwater/HabitatProtectionandRestoration/Documents/A%20Flood%20of%20Benefits%20-%20J.Opperman%20-%20May%202014.pdf" download="Step 2">https://www.conservationgateway.org/ConservationPractices/Freshwater/HabitatProtectionandRestoration/Documents/A%20Flood%20of%20Benefits%20-%20J.Opperman%20-%20May%202014.pdf</a></li>
                  </ul>
                </article>
              </section>

              <section id="implementation3">
                {isDevice() && <h3 className="tag">Step 3</h3>}
                <h2 className="section-title">Estimate the Cost, Benefit and Effectiveness</h2>
                <p className="text">Quantify the effect of the possible feasible measures on flood risk, and conduct a cost-benefit analysis to select the most cost-effective measure.</p>

                <h3 className="info-title -secondary">1. Model current and future flood risk with the gray, hybrid, and stand-alone nature-based options</h3>
                <p className="text">Integrate the feasible green and hybrid solutions identified in Step 2 into the risk model developed in Step 1. Assess the flood hazard, exposure, and risk in the current situation as well as under the climate and socioeconomic projections with the possible options in place. Methodologies and models for quantitatively assessing the effectiveness of green measures for reducing hazard intensity are constantly under development; critically enquire about the methodologies and assumptions used for this assessment. Use models wisely, using conservative parameter settings. Apply a sensitivity analysis to gain insight into future tipping points that may occur under changing boundary conditions (e.g. sediment loads, subsidence levels, fresh water input, etc.) and that are relevant for the sustainability of nature-based measures.</p>

                <h3 className="info-title -secondary">2. Quantify costs and primary benefits</h3>
                <p className="text">Compute the required per-unit and total investment and maintenance costs for each of the possible solutions. Compare the model damages without interventions to each of the options under consideration to estimate the primary risk reduction benefits, i.e. the difference between the situation with and without the intervention. In the calculations, consider the time it takes for the solution to become effective, as nature-based solutions may require years to realize their full risk reduction potential. Compare the costs and benefits of all the different solutions under consideration.</p>

                <h3 className="info-title -secondary">3. Quantify co-benefits of intervention</h3>
                <p className="text">Nature-based solutions can have a range of co-benefits in addition to risk reduction, including biodiversity conservation, job creation in agriculture and fisheries, recreation, and public health. Evaluate these various expected co-benefits as much as possible, and quantify them in economic terms. The co-benefits that cannot be quantified should be described and included in the decision-making process.</p>

                <h3 className="info-title -secondary">4. Perform cost-benefit and effectiveness analysis</h3>
                <p className="text">Perform a full quantitative cost-benefit analysis of each possible solution, including the primary benefits to risk reduction as well as all co-benefits. In order to make a fair comparison of costs (which are paid in the early years of a project) and benefits (which are realized year by year over a number of decades) the dollar values have to be discounted and converted to net present value.</p>

                <article className="extra-info">
                  <h2 className="info-title -principal">Example projects</h2>
                  <p className="text">Lami Town, the Republic of the Fiji Islands, was the focus of an economic analysis of nature-based, hybrid and gray solutions as its rivers and coastlines are prone to flash and surge flooding. A comprehensive analysis of installation, maintenance, labor, and opportunity costs was estimated for each of the options, as was the cost of inaction. Four scenarios ranging from nature-based, hybrid and gray solutions were established to assess the most desirable one. The economic analysis was conducted using avoided damage estimates, and incorporated ecosystem service benefits. Lastly a sensitivity analysis was included, based on time, discount rate, and estimated percent of damage avoidance.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text">Rao, Nalini S. An Economic Analysis of Ecosystem-based Adaptation and Engineering Options for Climate Change Adaptation in Lami Town, Republic of the Fiji Islands: Technical Report. 2013. URL <a href="http://ian.umces.edu/pdfs/ian_report_392.pdf" download="Step 3 example 1">http://ian.umces.edu/pdfs/ian_report_392.pdf</a></p>

                  <p className="text">Despite a dyke that provides the primary flood protection of the area, Koh Mueng, Thailand, experiences flooding. As part of a broader methodological framework to assess green and gray infrastructure interventions, an evaluation of the most effective flood mitigation measures was pursued through hydrodynamic simulations, and evaluation of economic viability using cost-benefit analysis. The solution options were evaluated for flood risk reduction effectiveness using assessments of flood hazards, physical and economic vulnerability, and ecosystem service values. Cost-benefit analysis evaluated direct and indirect losses (or damages) through physical vulnerability of the building stock, infrastructure and cultural artifacts, and economic vulnerability of the study area, including the tourism industry.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text">Vojinovic, Zoran, et al. "Combining Ecosystem Services with Cost-Benefit Analysis for Selection of Green and Grey Infrastructure for Flood Protection in a Cultural Setting." Environments 4.1 (2016). URL: <a href="http://www.mdpi.com/2076-3298/4/1/3" target="_blank">http://www.mdpi.com/2076-3298/4/1/3</a></p>


                  <h3 className="info-title">More information</h3>
                  <ul className="info-list">
                    <li>- The NOAA Guidance for Assessing the Costs and Benefits of Green Infrastructure outlines methodologies for assessing the effectiveness of green solutions: <a href="https://coast.noaa.gov/data/docs/digitalcoast/gi-cost-benefit.pdf" download="Step 3 info">https://coast.noaa.gov/data/docs/digitalcoast/gi-cost-benefit.pdf</a></li>
                    <li>- The World Business Council for Sustainable Development (WBCSD) produced a report on the Business Case for Natural Infrastructure: <a href="http://www.naturalinfrastructureforbusiness.org/wp-content/uploads/2016/02/WBCSD_BusinessCase_jan2016.pdf" download="Step 3 info">http://www.naturalinfrastructureforbusiness.org/wp-content/uploads/2016/02/WBCSD_BusinessCase_jan2016.pdf</a></li>
                    <li>- ProjectSelect, also produced by WBCSD, is a free cost-benefit analysis that allows users to evaluate the long-term financial costs and benefits of natural and gray solutions.</li>
                  </ul>
                </article>
              </section>

              <section id="implementation4">
                {isDevice() && <h3 className="tag">Step 4</h3>}
                <h2 className="section-title">Select, Plan, and Design the Intervention</h2>
                <p className="text">Select the most effective and most appropriate option; and develop a detailed implementation plan and design.</p>

                <h3 className="info-title -secondary">1. Select effective and feasible measure(s) in collaboration with stakeholders</h3>
                <p className="text">Discuss the results of the cost-benefit and effectiveness analysis with stakeholders in an interactive session, and decide which of the measures are both effective and feasible. For the selected measure(s), identify those stakeholders that should be involved to ensure the long-term commitment to plans and strategies.</p>

                <h3 className="info-title -secondary">2. Assess integration of measure(s) with conservation/restoration of existing ecosystem</h3>
                <p className="text">For the selected measure(s), analyze to what extent they can be achieved by conserving and restoring existing ecosystems and to what extent new ecosystem development or engineering is required and what methods can be used.  The ecosystem assessment performed under Step 1 can form a basis to select proper methods for conservation, restoration, and management of ecosystems. Analyses of factors impeding or jeopardizing ecosystem health and resilience can be extended here to steer selection of appropriate measures. Make use of existing knowledge in restoration ecology and of guiding principles outlined above to use proper restoration methods and not destruct or impact other ecosystems in the area. Perform a full assessment on how the new measure(s) may impact the existing ecosystems.  Analyze regulations and development plans, and the enforcement of those regulations and plans that are in place that may contribute to preserving or restoring ecosystems.</p>

                <h3 className="info-title -secondary">3. Assess the social and environmental impacts</h3>
                <p className="text">Analyze how the selected measure(s) can have negative social and environmental effects that may trigger social and environmental safeguards, for example because they may require the involuntary resettlement of people or may have a negative impact on the existing ecosystem. If applicable, ensure that the proposed project implementation will be in compliance with the safeguard standards of the national government and financing organization.</p>

                <h3 className="info-title -secondary">4. Determine a robust monitoring system</h3>
                <p className="text">To ensure the success of the project, identify early on how the project will be monitored and evaluated. There are many kinds of evaluation systems, and it is not yet clear which system is right for nature-based solutions. Nature-based solutions may require a different sort of monitoring system, e.g. monitoring and evaluation (M&E), monitoring, reporting, and verification (MRV), with costs and responsibilities assigned. Logical framework and results-based management approaches are the most common frameworks, although monitoring and evaluation need to be tailored to each project.</p>

                <h3 className="info-title -secondary">5. Draft engineering design study</h3>
                <p className="text">Produce a draft engineering design and feasibility study of the selected measure(s), including detailed material and labor requirements. The engineering design should be informed by the risk reduction target, by the required integration of the measure in the existing ecosystem, and by identified ecosystem management and restoration methods. Engineering designs should be based on detailed flood hazard and effectiveness modeling, and should explicitly encompass both the ecosystem and engineering aspects in the case of hybrid interventions. There are various technical design guidelines for nature-based interventions available, for example through the Ecoshape Building with Nature consortium.</p>

                <article className="extra-info">
                  <h2 className="info-title -principal">Example projects</h2>
                  <p className="text">The Ecoshape consortium, in its Building with Nature project in Indonesia, adopted an adaptive management cycle and promoted the importance of prioritization in planning its mangrove greenbelt intervention. Furthermore, it aimed to engage stakeholders collaboratively, while additionally safeguarding the villages, the hinterland, and existing mangrove patches.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text"><a href="https://www.ecoshape.org/en/projects/building-with-nature-indonesia/" target="_blank">https://www.ecoshape.org/en/projects/building-with-nature-indonesia/</a></p>

                  <p className="text">As part of the Mozambique Cities and Climate Change Project, the World Bank is creating urban parks in the city of Beira, which will increase the resilience of the city to floods by improving and safeguarding the natural drainage capacity of the Chiveve river. The first phase of the project included the rehabilitation of the riverbed, the construction of an outlet, the dredging of the fishing port, and the planting of 2,200 mangrove trees with active flood mitigation function. The second phase, which is currently being implemented, will focus on the further development of a multi-purpose green infrastructure solution along the stretch of the Chiveve river in Beira, including the creation of a large park along the river, public spaces, cycling paths, and overall green landscape planning.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text"><a href="http://projects.worldbank.org/P153544?lang=en" target="_blank">http://projects.worldbank.org/P153544?lang=en</a></p>


                  <h3 className="info-title">More information</h3>
                  <ul className="info-list">
                    <li>- Designing nature-based solutions: Building with Nature Guidelines at <a href="https://publicwiki.deltares.nl/display/BWN1/Building+with+Nature" target="_blank">https://publicwiki.deltares.nl/display/BWN1/Building+with+Nature</a></li>
                    <li>- Information on design characteristics of green solutions for flood risk management by the Nature Conservancy (2014): <a href="https://www.conservationgateway.org/ConservationPractices/Freshwater/HabitatProtectionandRestoration/Documents/A%20Flood%20of%20Benefits%20-%20J.Opperman%20-%20May%202014.pdf" download="Step 4 info">https://www.conservationgateway.org/ConservationPractices/Freshwater/HabitatProtectionandRestoration/Documents/A%20Flood%20of%20Benefits%20-%20J.Opperman%20-%20May%202014.pdf</a></li>
                  </ul>
                </article>
              </section>

              <section id="implementation5">
                {isDevice() && <h3 className="tag">Step 5</h3>}
                <h2 className="section-title">Financing the Project</h2>
                <p className="text">Secure financing for the proposed measures, potentially by using green finance opportunities.</p>

                <h3 className="info-title -secondary">1. Identify financing source</h3>
                <p className="text">Identify the financing sources available to implement the proposed interventions. Explore the availability of national government financing and related implementation capacities. Check how international financing sources, including from International Finance Institutions (IFIs), link to national frameworks in light of environmental solutions. Consider leveraging green or climate related financing, such as the Green Climate Fund and the Global Environment Facility. Consider that financing follows value creation, and that the benefit streams (types and recipients of benefits) will typically drive the financing sources available.</p>

                <h3 className="info-title -secondary">2. Assess project timeline and risk in light of financing</h3>
                <p className="text">Assess the requirements of the financing source regarding the implementation of the project, including environmental and social safeguards. Consider that nature-based solutions may be different than gray solutions in terms of disbursement, performance, and risk timelines, both during the implementation as well as the monitoring and evaluation phases.</p>

                <h3 className="info-title -secondary">3. Check for (adverse) incentives</h3>
                <p className="text">Traditional financing sources may incentivize gray solutions rather than hybrid or green measures, due to the better known project structures, possible shorter timelines, and larger disbursement amounts. Consider how the social and environmental co-benefits, and the cost-benefit analysis conducted in Step 3 could be leveraged to overcome such incentives. Consider how the complexity of the project matches the transaction costs and desired project size of the funding sources, and explore whether the implementation of this project can be bundled with other development interventions in order to reach a ‘sizable project’ that can be part of an IFI pipeline.</p>

                <article className="extra-info">
                  <h2 className="info-title -principal">Examples projects</h2>
                  <p className="text">In 2000, The Nature Conservancy in collaboration with the U.S. Agency for International Development worked to establish a water fund that directs money from water users to improve protection of the Condor Biosphere Reserve.  In 2004, the fund was worth $2.1 million, paid into by the Quito Municipal Water and Sewage Agency, the Quito Electricity Company, and the Andina Beer Company. The project reports successes on both social and ecological fronts. The nearly $5 million raised for conservation action have been used to plant 3.5 million trees, hire nine new park guards that provide new jobs and increase enforcement, build local capacity for monitoring and conflict resolution, fund hydrologic modeling and monitoring, and provide environmental education to children. Financial support for conservation came from an appreciation of the role healthy forests play in supplying and regulating the availability of clean water. A key to the success of this project may have been a long record of flow and sedimentation monitoring data collected by hydropower operations, which provided a clear signal of a degrading ecosystem service before any catastrophic event.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text">Tallis, Heather, et al. "An ecosystem services framework to support both practical conservation and economic development." Proceedings of the National Academy of Sciences 105.28 (2008): 9457-9464. URL: <a href="http://www.edc.uri.edu/temp/ci/ciip/FallClass/Docs_2008/Tallis%20et%20al.%202008.pdf" download="Step 5 more info">http://www.edc.uri.edu/temp/ci/ciip/FallClass/Docs_2008/Tallis%20et%20al.%202008.pdf</a>. Additional information on Quito’s Water Fund: <a href="http://www.fondosdeagua.org/en/quito-water-conservation-fund-fonag-quito-ecuador-2000" target="_blank">http://www.fondosdeagua.org/en/quito-water-conservation-fund-fonag-quito-ecuador-2000</a></p>

                  <h3 className="info-title">More information</h3>
                  <ul className="info-list">
                    <li>- The Global Climate Change Alliance (GCCA+) offers a searchable repository of 47 sources of <a href="http://www.gcca.eu/technical-and-financial-support" target="_blank">technical and financial support</a> in Africa, Asia, the Caribbean, and Pacific regions in GCCA+ priority areas, including disaster risk management.</li>
                  </ul>
                </article>
              </section>

              <section id="implementation6">
                {isDevice() && <h3 className="tag">Step 6</h3>}
                <h2 className="section-title">Implementation and Construction</h2>
                <p className="text">Implement the project in consultation with stakeholders and in accordance with social and environmental standards.</p>

                <h3 className="info-title -secondary">1. Plan social and environmental impacts</h3>
                <p className="text">Revisit the social and environmental impact assessment and the standards and safeguards relevant to the project. Start planning and undertaking any required involuntary resettlement, and preparing the implementation area to limit environmental impacts.</p>

                <h3 className="info-title -secondary">2. Consideration to ecosystem structure, species diversity, and ecosystem functioning</h3>
                <p className="text">Implement the engineering and ecosystem aspects of the project in accordance to the Guiding Principles, and the ecosystem integration as assessed in the previous steps. Closely monitor ecosystem functioning and impact during the implementation phase, and flag any unexpected impacts on ecosystem structure, species, and functioning. For hybrid solutions, ensure that the engineering works and ecosystem aspects are implemented in harmony as per the design plan.</p>

                <h3 className="info-title -secondary">3. Continuous stakeholder and community interaction during implementation</h3>
                <p className="text">Continuously inform and consult the key stakeholders as identified in the previous steps. Ensure stakeholder ownership and involvement. In communications, be sensitive of both the short-term impacts and expected long-term gains on communities and environment. Monitor impact of the construction and rehabilitation work on the stakeholders and livelihoods. Flexibly adjust the implementation of the project where required based on changing stakeholder needs and emerging information.</p>

                <article className="extra-info">
                  <h2 className="info-title -principal">Best Practice Examples</h2>
                  <p className="text">The city of Mälmo, Sweden, experienced socioeconomic decline and floods from overflowing drainage. A collaborative solution aimed to retrofit the area with Sustainable Urban Drainage Systems (SuDS) as part of a broader regeneration project, thereby creating a more sustainable neighborhood and benefiting biodiversity. An extensive and iterative process of stakeholder engagement was initiated during the design and execution of this project. The process involved a ‘rolling program’ of consultation with local residents, representatives from the local school, practitioners, city staff, and many others in order to build awareness about the SuDS retrofit, its benefits and costs, and to obtain public perspectives on the desired design. This included regular meetings, community workshops, and informal gatherings at sports and cultural events. The approach became increasingly open and consultative, with approximately one fifth of the tenants in the area having participated in dialogue meetings about the project. Amongst other topics, safety issues related to open water areas (e.g. retention pools) were discussed with residents as well as the potential loss of particular recreational opportunities in the area. In many cases, comments and concerns from stakeholders were taken into account and addressed in redesigned SuDS plans.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text"><a href=" http://www.panorama.solutions/en/building-block/engaging-stakeholders-raise-awareness-and-support" target="_blank"> http://www.panorama.solutions/en/building-block/engaging-stakeholders-raise-awareness-and-support</a></p>

                  <h3 className="info-title">More information</h3>
                  <ul className="info-list">
                    <li>- NOAA Guidance for Assessing the Costs and Benefits of Green Infrastructure: <a href="https://coast.noaa.gov/data/docs/digitalcoast/gi-cost-benefit.pdf" download="Step 6 info">https://coast.noaa.gov/data/docs/digitalcoast/gi-cost-benefit.pdf</a></li>
                    <li>- The WWF guidelines for nature-based solutions provides detailed implementation guidelines and examples (expected publication April 2017)</li>
                  </ul>
                </article>
              </section>

              <section id="implementation7">
                {isDevice() && <h3 className="tag">Step 7</h3>}
                <h2 className="section-title">Monitor and Maintain, Inform Future Practices</h2>
                <p className="text">Activities after the implementation of the nature-based solution are needed to maintain and further develop its effectiveness, and to record lessons learned for future use.</p>

                <h3 className="info-title -secondary">1. Monitor ecosystem status, species diversity, and ecosystem functioning</h3>
                <p className="text">Carefully monitor: the development of the ecosystem in the area of implementation, as well as the larger landscape, to assess how the intervention has affected the area; how the ecosystem flood protection functions are developing; and whether ecosystem restoration is progressing according to plan. Monitor species diversity and density through time to determine whether the ecosystem goes through different successional stages.</p>

                <h3 className="info-title -secondary">2. Monitor risk reduction effectiveness</h3>
                <p className="text">Refer to your monitoring system (see step 4.4) to monitor how the gray and hybrid components of the project are implemented, and how the restoration and creation of ecosystem elements are increasingly contributing to the risk reduction effectiveness. If possible, re-run the hazard and risk model with the final interventions in place, to assess estimated effect on modeled damages.</p>

                <h3 className="info-title -secondary">3. Policy and regulatory framework development and adjustment</h3>
                <p className="text">Because the benefits of nature-based solutions can be realized many decades into the future, it is important to understand the regulatory environment and its changes over time. This will better allow the project to adapt to forthcoming policies before they negatively impact the solution.</p>

                <h3 className="info-title -secondary">4. Continuous community involvement</h3>
                <p className="text">The sustainability of the ecosystem elements depends strongly on the continuous involvement of the community. If the community is not involved and does not see the value of the restored or created ecosystem, they may contribute to its decline. To involve the community, conduct meetings to explain the project and its benefits; and provide practical guidance on the use and protection of the ecosystem. It is important to ensure that project representatives listen to the community and spend time understanding their concerns and answering their questions. If the community does not see that their concerns are being addressed, it is likely that the project will not be as successful or may fail. Monitor and help the creation of employment opportunities derived from the ecosystem.</p>

                <h3 className="info-title -secondary">5. Review and evaluation</h3>
                <p className="text">Monitoring and evaluation need to generate learning on what works and what doesn’t work, and why. Review all project components, with special attention to risk reduction effectiveness, community impact and environmental impacts. Publish review and share with other implementing organizations to build up global best practice. Investigate possibilities for upscaling of successful approaches to other places.</p>

                <h3 className="info-title -secondary">6. Capture lessons learned</h3>
                <p className="text">While identifying lessons learned should be done throughout the project, it is important for the success of nature-based projects to capture and report these lessons learned in a way that is accessible to others considering implementing nature-based solutions. There are a number of resources (see box) that serve as a repository of ongoing and completed projects where lessons can be captured. Moreover, these guiding and implementation principles should be re-examined and re-drafted based on experience, and we encourage you to report lessons learned to the platform. </p>

                <article className="extra-info">
                  <h2 className="info-title -principal">Example project</h2>
                  <p className="text">The management of dune ecosystems in Christchurch, New Zealand’s coastal parks has recently focused on restorative techniques focused on the use of indigenous sand-binding species. A collaborative and community-based vision for the area was established and management objectives were identified at the scale of the site. These included a specific restoration plan for the dune system at the site, together with a monitoring plan and other initiatives to promote education about the area and the dune restoration initiative. A monitoring program was developed to measure the success of the key actions and provide useful information for future management decisions. The monitoring program has clearly shown changes in the dune system in response to the new management activities.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text"><a href="https://www.iucn.org/sites/dev/files/2014-038.pdf" download="Step 7 more">https://www.iucn.org/sites/dev/files/2014-038.pdf</a></p>

                  <h3 className="info-title">More information</h3>
                  <p className="text">Informing future practices  – There are numerous online communities that support the advancement of nature-based solutions through a variety of approaches. These resources offer an opportunity to review and evaluate projects and share your own experiences to inform the development of future projects.</p>

                  <ul className="info-list">
                    <li>- European Commission’s Oppla is a new knowledge marketplace; a place where the latest thinking on ecosystem services, natural capital and nature-based solutions is brought together. Read more: <a href="http://www.oppla.eu" target="_blank">http://www.oppla.eu</a></li>
                    <li>- The Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) and IUCN host the PANORAMA platform that is a partnership initiative to document and promote examples of inspiring, replicable solutions across a range of conservation and development topics, enabling cross-sectoral learning and inspiration. Read more: <a href="http://panorama.solutions/en" target="_blank">http://panorama.solutions/en</a></li>
                    <li>- The Natural Infrastructure for Business platform developed by the World Business Council for Sustainable Development (WBCSD), CH2M (with support from The Nature Conservancy), and other member companies is designed to introduce business leaders and practitioners to natural infrastructure. Read more: <a href="http://www.naturalinfrastructureforbusiness.org" target="_blank">http://www.naturalinfrastructureforbusiness.org</a></li>
                    <li>- Stockholm Environment Institute’s weADAPT is a collaborative platform on climate adaptation issues. It allows practitioners, researchers and policy-makers to access credible, high-quality information and connect with one another. Read more: <a href="https://www.weadapt.org" target="_blank">https://www.weadapt.org</a></li>
                    <li>- The Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) hosts an Adaptation Community which offers an inventory of methods for adaptation to climate change and a platform for exchange among practitioners. Read more: <a href="http://www.adaptationcommunity.net" target="_blank">http://www.adaptationcommunity.net</a></li>
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
