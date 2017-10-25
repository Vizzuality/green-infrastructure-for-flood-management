import React from 'react';
import ScrollMagic from 'scrollmagic';
import MoveTo from 'moveto';
import { isDevice } from 'utils/general';
import { Row } from 'components/ui/Grid';

export default class Implementation extends React.Component {
  componentDidMount() {
    const triggers = ['implementation1', 'implementation2', 'implementation3',
      'implementation4', 'implementation5', 'implementation6', 'implementation7, implementation8, implementation9'];
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
              <p className="text">The five principles outlined some general ‘rules’ for sustainable and effective nature-based solutions for flood risk management. This section of the guidance summarizes the steps needed for the planning, assessment, design, implementation, monitoring, management, and evaluation of nature-based solutions for flood risk management. It follows the general cycle of a flood risk management project and therefore are also applicable for gray measures. However, it provides more information and detail on specific aspects that need further attention when implementing nature-based solutions. These guidelines build and expand upon existing guidance developed by other organizations, including NOAA, USACE and Ecoshape. This document attempts to cover the entire project cycle from preparation to monitoring and evaluation.</p>
              <p className="text">Projects that aim to implement nature-based solutions must consider biophysical and socio-economic processes on different scales in space and time. This calls for the engagement of experts from different disciplines such as hydrology, engineering, ecology, economics and social sciences. As with other risk management projects, the design and implementation of nature-based solutions should be done in a participatory manner with full engagement of all relevant stakeholders. This is particularly important as nature-based solutions present an opportunity to address flood risks by aligning conservation, development and poverty alleviation objectives. This can create new synergies and collaborations between governments, local communities, NGOs, but also relevant private sector stakeholders.</p>
              <div className="image-container">
                <img src="/images/steps.svg" alt="implementation" />
              </div>
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
                  <li id="anc1"><a className="js-scroll-imp1" href="#implementation1">01. Define problem, project scope and objectivess</a></li>
                  <li id="anc2"><a className="js-scroll-imp2" href="#implementation2">02. Financing strategy</a></li>
                  <li id="anc3"><a className="js-scroll-imp3" href="#implementation3">03. Conduct ecosystem, hazard, and risk assessments</a></li>
                  <li id="anc4"><a className="js-scroll-imp4" href="#implementation4">04. Develop nature-based risk management strategy</a></li>
                  <li id="anc5"><a className="js-scroll-imp5" href="#implementation5">05. Estimate the costs, benefits and effectiveness</a></li>
                  <li id="anc6"><a className="js-scroll-imp6" href="#implementation6">06. Select and design the intervention</a></li>
                  <li id="anc7"><a className="js-scroll-imp7" href="#implementation7">07. Implementation and construction</a></li>
                  <li id="anc8"><a className="js-scroll-imp8" href="#implementation8">08. Monitor and inform future actions</a></li>
                  <li id="anc9"><a className="js-scroll-imp9" href="#implementation9">09. Conclusions</a></li>
                </ul>
              </div>
            </div>
            <div id="implementations" className="column small-12 medium-9">
              <section id="implementation1">
                {isDevice() && <h3 className="tag">Step 1</h3>}
                <h2 className="section-title">Define problem, project scope and objectives</h2>
                <p className="text">Broadly identify the flood hazard, relevant stakeholders, and beneficiaries. The scope of the problem needs to be identified within the larger context, forming the basis of further analyses in the subsequent steps. Project objectives encompassing the necessitated flood risk mitigation and additional benefits need to be defined.</p>

                <h3 className="info-title -secondary">1. Identify the study area, problem, key stakeholders, and beneficiaries</h3>
                <p className="text">Identify the direct area of interest and the main flood hazard(s) and risk(s) that the project intends to address. Possible stakeholders and beneficiaries inside and outside of the intervention area should be identified. Meetings should be held with these stakeholders in order to understand their needs. Tradeoffs between stakeholders need to be acknowledged.</p>

                <h3 className="info-title -secondary">2. Define the project scope and set boundaries</h3>
                <p className="text">Define the scope of the problem within the greater physical, social, and environmental context. Determine the limits of boundaries of the project’s physical intervention area that is suitable for addressing the problem (as stated in principle 1, e.g. watershed, ridge to reef, estuary, etc.).  Institutional and legal constraints and opportunities should also be identified.</p>

                <h3 className="info-title -secondary">3. Set project objectives considering the full targeted range of benefits</h3>
                <p className="text">Define quantitative project objectives and the main reason of your initiatives. Any general constraints on project options need to be identified. Potential barriers may include legal constraints, fund raising problems, or an uneven distribution of the benefits. Stakeholder interviews can be used to identify the full range of desired benefits that should be taken into account. Potential benefits are flood risk reduction and erosion control, but may also include other services such as enhanced ecosystem quality, positive impact on the livelihood of local communities and opportunities for recreation.</p>

                <article className="extra-info">
                  <h3 className="info-title">Outputs</h3>
                  <ul className="info-list">
                    <li>- Documentation of stakeholder needs</li>
                    <li>- Maps of area of interest depicting main risks and root causes to these risks</li>
                    <li>- Measurable project objectives</li>
                  </ul>

                  <h2 className="info-title -principal">Example projects</h2>
                  <p className="text">The Ecoshape consortium consists of engineering companies, contractors, research institutes, and NGOs. It implements a large-scale project on restoration of eroding mangrove coasts in Central Java, Indonesia. The project is conducted in joint operation with the Ministry of Agriculture, Fisheries and Food and the Ministry of Public Works and Housing. It entails a unique combination of engineering and water management knowledge with an intensive community-based approach. The objective of the project is to halt coastal erosion through the construction of permeable bamboo dams that mitigate wave energy and increase elevation by trapping sediment. These measures create suitable conditions for mangrove recovery. The project continues to work on rehabilitation of aquaculture ponds, including the creation of alternative income sources. Clear targets are defined for different coastal stretches in the design and engineering plan. Each year, a new design and implementation process begins. This is based on community consultation and on monitoring results from previous years. Before project initiation, commitment from local communities and governmental organizations on national and local level was sought.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text">Tonneijck et al. “Building with Nature Indonesia: Securing Eroding Delta Coastlines. Design and Engineering Plan.” (2015): <a target="_blank" rel="noreferrer noopener" href="https://www.ecoshape.org/uploads/sites/2/2016/07/Ecoshape-2015-Result-1-5-Design-Engineering-Plan-v7-0-LAYOUT-Nature-style_2.pdf" download>https://www.ecoshape.org/uploads/sites/2/2016/07/Ecoshape-2015-Result-1-5-Design-Engineering-Plan-v7-0-LAYOUT-Nature-style_2.pdf</a>. Additional information on the Building with Nature project in Indonesia: <a target="_blank" rel="noreferrer noopener" href="http://www.indonesia.buildingwithnature.nl">www.indonesia.buildingwithnature.nl</a></p>

                  <h3 className="info-title">More information</h3>
                  <p className="text">Specific guidance on how to conduct a stakeholder analysis can be found on the Ecoshape website: <a target="_blank" rel="noreferrer noopener" href="https://publicwiki.deltares.nl/display/BWN1/Tool+-+Stakeholder+analysis">https://publicwiki.deltares.nl/display/BWN1/Tool+-+Stakeholder+analysis</a>.</p>
                  <p className="text">More information on involvement of local communities using a field school approach can be found with <a target="_blank" rel="noreferrer noopener" href="http://blue-forests.org/">Blue Forests (http://blue-forests.org/)</a>. Blue Forests is a local NGO based in Indonesia focused on empowering local communities to rehabilitate and maintain sustainable use of coastal ecosystem resources. Blue Forests provide environmental education, ecological mangrove rehabilitation, coastal field schools, and coastal business schools.</p>
                </article>
              </section>

              <section id="implementation2">
                {isDevice() && <h3 className="tag">Step 2</h3>}
                <h2 className="section-title">Financing strategy</h2>
                <p className="text">Evaluate financing options for the proposed measures and secure green finance opportunities, if possible.</p>

                <h3 className="info-title -secondary">1. Identify funding sources</h3>
                <p className="text">Identify the financing sources available to implement nature-based solutions. Investigate the availability of national and local government financing and related implementation capacities. Check how international financing sources, including International Financial Institutions (IFIs), link to national frameworks related to environmental solutions. Consider leveraging green or climate-related financing, such as the Green Climate Fund and the Global Environment Facility. Recognize that financing follows value creation and that the benefit streams (types and recipients of benefits) will typically drive the financing sources available. However, creation of added value or additional revenue streams can potentially be used to attract the private sector to invest in nature-based solutions. Consider the availability of co-financing by local stakeholders, which can help support local commitment to the success of the measures. Consider non grant-based funding such as environmental taxation or payments for ecosystem services. These types of funding can influence behavior, spur autonomous adaptation, and subsequently affect cost-effectiveness and cost-efficiency of the project.</p>

                <h3 className="info-title -secondary">2. Assess project timeline, risk, and feasibility in light of financing</h3>
                <p className="text">Assess requirements of financing sources regarding implementation of the project, including environmental and social safeguards. Recognize that nature-based solutions may be different than conventional solutions in terms of disbursement, performance, and risk timelines. This applies to the implementation as well as the monitoring and evaluation phases. Consider institutional feasibility and adaptability, given the (large) investments in capital necessary to make nature-based solutions successful.</p>

                <h3 className="info-title -secondary">3. Check for (adverse) incentives</h3>
                <p className="text">Realize that traditional financing sources may incentivize conventional solutions rather than hybrid or green measures. This relates to the better known project structures, possible shorter timelines, or larger disbursement amounts. Also be aware that financing sources for traditional infrastructure and nature-based solutions may go through different programs or institutions. For example gray solutions tend to go through the ministry of infrastructure whereas nature-based solutions may be commissioned by the ministry of environment or fisheries. Meet with all potential stakeholders. Then, consider how the social and environmental aspects can benefit each other. Results of the vulnerability and opportunity mapping may bring forward different benefits for multiple stakeholders and hence, multiple ongoing incentives. A cost-benefit analysis could be leveraged to overcome these incentives. Consider how the complexity of the project matches the transaction costs and desired project size of the funding sources. It should also be explored whether the implementation of this project can be bundled with other development interventions and programs in order to reach a ‘sizable project’ that can be part of an IFI pipeline.</p>


                <article className="extra-info">
                  <h3 className="info-title">Outputs</h3>
                  <ul className="info-list">
                    <li>- First budget estimate for project</li>
                    <li>- Overview of available and possible future resources</li>
                  </ul>

                  <h2 className="info-title -principal">Example projects</h2>
                  <p className="text">In 2000, The Nature Conservancy in collaboration with the U.S. Agency for International Development established a water fund. This fund directs money from water users to improve protection of the Condor Biosphere Reserve in Ecuador.  In 2004 the fund managed $2.1 million, financed by the Quito Municipal Water and Sewage Agency, the Quito Electricity Company, and the Andina Beer Company. The project reports successes on both social and ecological fronts. The nearly $5 million raised for conservation action have been used to plant 3.5 million trees, hire nine new park guards that provide new jobs and increase enforcement, build local capacity for monitoring and conflict resolution, fund hydrologic modeling and monitoring, and provide environmental education to children. Financial support for conservation came from an appreciation of the role that healthy forests play in supplying and regulating the availability of clean water. A key to the success of this project may have been a long record of flow and sedimentation monitoring data collected during hydropower operations. This data provided a clear signal of a degrading ecosystem service before any catastrophic event.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text">Tallis, Heather, et al. "An ecosystem services framework to support both practical conservation and economic development." Proceedings of the National Academy of Sciences 105.28 (2008): 9457-9464. URL: <a target="_blank" rel="noreferrer noopener" href="http://www.edc.uri.edu/temp/ci/ciip/FallClass/Docs_2008/Tallis%20et%20al.%202008.pdf" download>http://www.edc.uri.edu/temp/ci/ciip/FallClass/Docs_2008/Tallis%20et%20al.%202008.pdf</a>. Additional information on Quito’s Water Fund: <a target="_blank" rel="noreferrer noopener" href="http://www.fondosdeagua.org/en/quito-water-conservation-fund-fonag-quito-ecuador-2000" >http://www.fondosdeagua.org/en/quito-water-conservation-fund-fonag-quito-ecuador-2000</a></p>

                  <h3 className="info-title">More information</h3>
                  <p className="text">The Global Climate Change Alliance (GCCA+) offers a searchable repository of 47 sources of technical and financial support in Africa, Asia, Caribbean and Pacific regions in GCCA+ priority areas: <a target="_blank" rel="noreferrer noopener" href="http://www.gcca.eu/technical-and-financial-support">http://www.gcca.eu/technical-and-financial-support</a>.</p>

                  <p className="text">The Global Environment Facility (GEF) provides guidance on payment schemes for ecosystem services: <a target="_blank" rel="noreferrer noopener" href="https://www.thegef.org/sites/default/files/publications/28252nomarks_0.pdf" download>https://www.thegef.org/sites/default/files/publications/28252nomarks_0.pdf</a></p>
                </article>
              </section>

              <section id="implementation3">
                {isDevice() && <h3 className="tag">Step 3</h3>}
                <h2 className="section-title">Conduct ecosystem, hazard, and risk assessments</h2>
                <p className="text">Conduct an assessment of the type and intensity of the flood hazard, including the effects on population, assets, and infrastructure with specific attention to the role of the ecosystem.</p>

                <h3 className="info-title -secondary">1. Conduct an integrated system assessment of the intervention area</h3>
                <p className="text">Outline the direct area of interest (based on step 1) and assess the wider socio-economic environmental and institutional systems. This should include an assessment of the biophysical systems, the ecosystem and provided ecosystem services. Further detail the main flood hazard type affecting the study area and its source (started in step 1). River, coastal, and pluvial flooding can be driven by a range of factors such as extreme local rainfall, high river discharge, or coastal storm surge. Broadly define the various ecosystem types in the area and their risk reduction potential. Note that the area relevant from an ecosystem management perspective may be much larger than the area at direct risk of flooding (see Principle 1).</p>

                <h3 className="info-title -secondary">2. Gather data</h3>
                <p className="text">Collect data that can be used for the risk assessment. This includes data for hazard (e.g. rainfall, river discharge, sea level, and elevation data), exposure (e.g. population density and distribution, infrastructure location) and vulnerability (e.g. building typology, poverty). To assess the political dimensions of the system, collect information on the governance of relevant resources. This specifically applies to the strategic, legal, and regulatory framework (national or regional strategies, laws, municipal development plans), relevant institutes and stakeholders. Stakeholders are defined as people, groups, and entities affected by current and future flooding events as well as those benefiting or negatively affected by the proposed risk reduction measures. These types of data can be difficult to collect as they tend to be available in a wide range of places, for example across governmental organizations. In data scarce regions, the risk assessment often needs to rely on remote sensing or other globally available data products. If these are not available or sufficient to conduct a risk assessment, more effort needs to be invested in local data collection.</p>

                <h3 className="info-title -secondary">3. Assess current ecosystem extent, condition, and functioning</h3>
                <p className="text">Analyze if there are ecosystems that currently play a role in flood protection. Understand how these ecosystems can further contribute to reducing flood risk. Ecosystem health should be measured by indicators such as species diversity, abundance, and biomass. Historical changes and trends in the ecosystem should be researched with the objective to obtain a first impression of the ecosystem’s stability and resilience and to gain understanding of its original regulatory and provisioning services. At the same time, future trends that may influence these conditions should be anticipated. The role of ecosystems in reducing risk can be identified by examining their role in: reducing or regulating hazards (e.g. wave attenuation, current reduction), reducing the exposure of people and assets to hazards (e.g. by keeping people out of dangerous zones) and reducing vulnerability (e.g. through supporting livelihoods and economies and providing key services). Qualitatively articulate what the potential is for expanding the risk reduction potential of ecosystems by conservation or restoration efforts.</p>

                <h3 className="info-title -secondary">4. Model current and future flood hazard</h3>
                <p className="text">Conduct a probabilistic hydrological and hydraulic modeling assessment and map flood zones with the potential intensity and location of all relevant types of flooding. This should result in potential inundation maps for a range of return periods and appropriate planning horizons.</p>

                <h3 className="info-title -secondary">5. Quantify current and future flood exposure and risk</h3>
                <p className="text">Combine the flood hazard maps with exposure and vulnerability information to produce estimates of human and economic impact. Future scenarios should be developed using climate change scenarios affecting flood hazard, deterioration scenarios for any flood management infrastructure, and socio-economic scenarios informed by expected changes in population, land-use, and urbanization.</p>


                <h3 className="info-title -secondary">6. Identify opportunities and barriers to implementation in the socio-political setting</h3>
                <p className="text">Assess the legal, regulatory, financing, socio-economic, and political context and their effects on the feasibility of implementing various risk reduction interventions. Consider opportunities for enforcement of existing regulations or laws or possibly development of new ones. Local or national policies may affect government prioritization of ecological or engineering interventions. Assess the dependence of communities on the ecosystem and how this may be influenced by interventions.</p>

                <article className="extra-info">
                  <h3 className="info-title">Outputs</h3>
                  <ul className="info-list">
                    <li>- Maps indicating current and future hazard, exposure, and vulnerability</li>
                    <li>- Maps and analysis showing land use, ecosystem presence and health, and importance of ecosystem for disaster risk reduction</li>
                    <li>- Maps (with model results) indicating flood zones for different return periods</li>
                  </ul>

                  <h2 className="info-title -principal">Example projects</h2>
                  <p className="text">The European Commission and United Nations Environment Program (UNEP) led a Coastal Partners project in Port Salut, Haiti. National and community baseline assessments were undertaken in local hilly, coastal, and sea environments. The objective was to identify exposed or vulnerable areas and select appropriate reforestation interventions to reduce the risk of floods, storms and soil erosion. Through marine and terrestrial field surveys, remote sensing, and GIS modeling, detailed baseline maps were developed. Exposure under current and future ecosystem management scenarios was modeled. Interviews, multi-stakeholder focus group discussions, and participatory mapping also contributed to the baseline assessments.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text">UNEP (2016). Coastal Partners: Applying ecosystem-based disaster risk reduction (Eco-DRR) through a ridge-to-reef approach in Port Salut, Haiti. URL <a target="_blank" rel="noreferrer noopener" href="http://wedocs.unep.org/handle/20.500.11822/14211">http://wedocs.unep.org/handle/20.500.11822/14211</a></p>

                  <h3 className="info-title">More information</h3>
                  <ul className="info-list">
                    <li>- NOAA Guidance for Assessing the Costs and Benefits of Green Infrastructure: <a target="_blank" rel="noreferrer noopener" href="https://coast.noaa.gov/data/docs/digitalcoast/gi-cost-benefit.pdf" download>https://coast.noaa.gov/data/docs/digitalcoast/gi-cost-benefit.pdf</a></li>
                    <li>- Methodologies for assessing dynamic risk: <a target="_blank" rel="noreferrer noopener" href="https://www.gfdrr.org/sites/default/files/publication/Riskier%20Future.pdf" download>https://www.gfdrr.org/sites/default/files/publication/Riskier%20Future.pdf</a></li>
                    <li>- Open-source hazard data and screening:  <a target="_blank" rel="noreferrer noopener" href="http://www.thinkhazard.org">www.thinkhazard.org</a></li>
                    <li>- WRI Global Flood Analyzer: <a target="_blank" rel="noreferrer noopener" href="http://floods.wri.org">http://floods.wri.org</a></li>
                  </ul>
                </article>
              </section>

              <section id="implementation4">
                {isDevice() && <h3 className="tag">Step 4</h3>}
                <h2 className="section-title">Develop nature-based risk management strategy</h2>
                <p className="text">Identify possible strategies to reduce flood risk and evaluate whether nature-based solutions are a good alternative or valuable addition to conventional options.  Wherever possible, prioritize nature-based solutions by respecting the following sequence when evaluating intervention options. ‘No intervention’ is taken as a starting point and followed by considering management options, which are non-structural measures such as early warning systems or spatial planning. Then consider if working with natural processes only will achieve desired safety levels. This option constitutes working with present powers and ecosystems, hence managing the present ecosystem.  Then, more active intervention and creation of ecosystems is another option. Working with natural processes and green solutions both represent nature-based flood risk management solutions. Green-gray solutions refer to hybrid solutions that combine traditional infrastructure such as dikes with ecosystem restoration or other natural solutions. Only if there is no other option available, traditional (gray) solutions can be selected.</p>

                <div className="image-container">
                  <img src="/images/group5.svg" alt="steps" />
                </div>

                <h3 className="info-title -secondary">1. Consider the socio-political context, existing strategies and plans</h3>
                <p className="text">Consult and build on national and regional development plans and strategies. For the selection of targets and measures, consider land tenure and the overall governance of resources in the intervention area. Identify opportunities and roadblocks to implementation over the expected project duration. Certain projects may benefit from state-led, top-down governance and leadership to ensure sustainability of the intervention, while others will thrive under the leadership of the civil society or a public-private coalition. Assess the local capacity to build and maintain desired interventions, which is needed to select effective and realistic measures later in the process.</p>

                <h3 className="info-title -secondary">2. Select a flood reduction target</h3>
                <p className="text">Identify the acceptable level of risk considering stakeholder interaction from Step 1 and the realistic investments available for risk reduction measures. Clearly identify the time horizon for the risk management approach. Engineering structures generally have a lifetime timeframe of 50 years. Therefore, a time horizon of at least 50 years is desirable. However, time frame may depend on the amount of future uncertainty and available budget. For example, with very uncertain futures short term benefits may outweigh long-term planning. However, to opt for no-regret strategies is always preferable. Specify indicators related to the risk reduction target based on the risk assessment such as prevented flood damages or affected people.</p>

                <h3 className="info-title -secondary">3. Identify green or hybrid options with similar performance as or value addition to conventional options</h3>
                <p className="text">Based on the ecosystem analysis and flood risk assessment, identify possible green or hybrid solutions to address the specific flood risk issue. Consider that non-structural measures (such as early warning systems and spatial planning) and various combinations of green, conventional, and non-structural measures may be needed to address the specific flood risk issue. Consider how conservation, expansion of an existing ecosystem, or restoration of a destroyed ecosystem can contribute to reduce flood risk. Look at previous projects and possible green solutions for lessons and preliminary cost estimates. Assess which factors may influence the stability and performance of vital ecosystems. Also assess how they can be integrated into the wider system management. Construct a portfolio of feasible strategies and accompanying measures.</p>

                <p className="text">There are various sources of information on the range of possible nature-based flood management solutions and their pros and cons, including the UNEP Green Infrastructure Guide, the WWF Flood Green Guide, the Nature Conservancy, and the Panorama platform. However, while general information may be available on effectiveness and unit costs of nature-based solutions, the feasibility of each option will strongly depend on the local circumstances.</p>

                <h3 className="info-title -secondary">4. Assess integration of measure(s) with conservation/restoration of existing ecosystems</h3>
                <p className="text">Analyze to what extent the selected measures can be implemented by conserving and restoring existing ecosystems. In addition, analyze to what extent new ecosystem creation or engineering is required and what methods can be used. The ecosystem assessment performed under Step 3 can form a basis to select proper methods for conservation, restoration, and management of ecosystems. Analyses of factors impeding or jeopardizing ecosystem health and resilience can be expanded here to steer selection of appropriate measures. Make use of existing knowledge in restoration ecology. Use the guiding principles outlined above to apply proper restoration methods and not negatively impact other ecosystems in the area. Perform a full assessment on how the new measures may impact existing ecosystems. Analyze regulations and development plans contributing to the preservation or restoration of ecosystems; also include the degree in which they are enforced.</p>

                <h3 className="info-title -secondary">5. Adjust financing strategy</h3>
                <p className="text">With an estimation of project costs for risk reduction strategies comprising different sets of options, begin finalizing the funding strategy. Criteria for consideration should include the available grant size, application procedures, and mission of the donor. Be aware of lengthy application procedures and other requirements. Secure (co-)financing from stakeholders, governments and the private sector to foster buy-in to the intervention, if possible.</p>

                <h3 className="info-title -secondary">6. Discuss risk reduction targets and possible strategies with stakeholders</h3>
                <p className="text">Hold interactive stakeholder consultations to present and discuss potential intervention areas as well as potential intervention strategies. Discuss risk reduction targets and the (potential) role of ecosystems in reducing risk, using information from the risk and ecosystem assessments. Aim to understand stakeholder interests and preferences without raising expectations. Readjust risk reduction priorities if necessary.</p>

                <h3 className="info-title -secondary">7. Shortlist technically feasible and socially accepted interventions for further analysis</h3>
                <p className="text">Hold stakeholder meetings to discuss possible strategies and phasing. To proceed with further analysis, select options that are technically feasible, economically viable, and desirable from a range of stakeholder perspectives. Integrate the full range of benefits produced by an intervention in the shortlisting process as well as stakeholder priorities.</p>

                <article className="extra-info">
                  <h3 className="info-title">Outputs</h3>
                  <ul className="info-list">
                    <li>- Overview of feasible measures to reduce risk, their estimated effects and implementation steps</li>
                    <li>- Outline of different strategies and their possible phasing in time with a focus on no-regret and less costly strategies first</li>
                  </ul>

                  <h2 className="info-title -principal">Example projects</h2>
                  <p className="text">UNEP’s project “Building Capacity for Coastal Ecosystem-based Adaptation in Small Island Developing States” is being implemented in Grenada and the Seychelles. In Grenada, social and ecological vulnerability impact assessments (VIAs) were conducted in three local sites (Lauriston Beach, Windward, and Grand Anse Bay). The VIA process focused on modelling and analyzing the impacts of climate change in terms of extreme events such as hurricanes and tropical storms. The focus was also on the impact of sea level rise on coastal communities and coastal/marine habitats, highlighting the problem of beach erosion in all three areas. Human activities such as building construction on beaches were also examined. Various coastal adaptation options were proposed based on the identified vulnerabilities. This included coral reef and mangrove restoration, locally managed marine areas, beach nourishment, breakwaters and stone revetments, among others.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text">Day et al. (2016). Building Capacity for Coastal Ecosystem-based Adaptation in Small Island Developing States (SIDS). Assessing Climate Vulnerability in Grenada and Responding with Coastal Ecosystem-based Adaptation Action. URL: <a target="_blank" rel="noreferrer noopener" href="http://www.intasave.pecreative.co.uk/documents/Publications/Climate-Change-Science,-Policy-and-Practice/CARIBSAVE/BCCEbA-SIDS.pdf" download>http://www.intasave.pecreative.co.uk/documents/Publications/Climate-Change-Science,-Policy-and-Practice/CARIBSAVE/BCCEbA-SIDS.pdf</a></p>

                  <h3 className="info-title">More information</h3>
                  <ul className="info-list">
                    <li>- Decision tree on whether nature-based solutions can be effective for your project: <a target="_blank" rel="noreferrer noopener" href="http://www.naturalinfrastructureforbusiness.org/tools/#tree">http://www.naturalinfrastructureforbusiness.org/tools/#tree</a></li>
                    <li>- An overview of possible green measures for flood risk management by The Nature Conservancy (2014): <a target="_blank" rel="noreferrer noopener" href="https://www.conservationgateway.org/ConservationPractices/Freshwater/HabitatProtectionandRestoration/Documents/A%20Flood%20of%20Benefits%20-%20J.Opperman%20-%20May%202014.pdf" download>https://www.conservationgateway.org/ConservationPractices/Freshwater/HabitatProtectionandRestoration/Documents/A%20Flood%20of%20Benefits%20-%20J.Opperman%20-%20May%202014.pdf</a></li>
                    <li>- UNEP, DHI, IUCN and The Nature Conservancy’s Green Infrastructure Guide for Water Management: <a target="_blank" rel="noreferrer noopener" href="http://www.medspring.eu/sites/default/files/Green-infrastructure-Guide-UNEP.pdf" download>http://www.medspring.eu/sites/default/files/Green-infrastructure-Guide-UNEP.pdf</a></li>
                    <li>- For planning and strategy building including long-term uncertainty: <a target="_blank" rel="noreferrer noopener" href="https://www.deltares.nl/en/adaptive-pathways/">https://www.deltares.nl/en/adaptive-pathways/</a></li>
                  </ul>
                </article>
              </section>

              <section id="implementation5">
                {isDevice() && <h3 className="tag">Step 5</h3>}
                <h2 className="section-title">Estimate the costs, benefits and effectiveness</h2>
                <p className="text">Quantify the effect of the possible measures on project objectives, including a cost-benefit analysis to compare the costs of construction and maintenance of the measure against the range of (co-)benefits it will provide. This analysis should also address performance of measures in relation to the risk reduction target as defined in step 4. The results can be used to identify the most cost-effective measure. Depending on the progress of the development of the project and the evolving nature of the stakeholder interaction described in Step 6 below, these analyses may need to be repeated with progressively increasing levels of detail.</p>

                <h3 className="info-title -secondary">1. Model current and future flood risk with conventional, hybrid, and nature-based options</h3>
                <p className="text">Integrate the feasible green and hybrid solutions identified in Step 4 into the risk model developed in Step 3. Assess the flood hazard, exposure, and risk in the current situation as well as under the climate and socio-economic projections with the possible options in place. Methodologies and models for quantitatively assessing the effectiveness of green measures for reducing hazard intensity are constantly under development. Critically enquire about the methodologies and assumptions used for this assessment. Use models wisely, where appropriate, adopting conservative parameter settings for deterministic models and appropriately broad parameter distributions in probabilistic models. Apply a sensitivity analysis to gain insight into future tipping points that may occur under changing boundary conditions (e.g. sediment loads, subsidence levels, fresh water input) and that are relevant for the sustainability of nature-based measures. Quantify the uncertainty in the model outputs.</p>

                <h3 className="info-title -secondary">2. Quantify risk reduction costs and benefits</h3>
                <p className="text">Compute the per-unit and total investment and maintenance costs for each of the possible solutions. Compare the model damages without interventions to the damages with possible solutions in place to estimate the primary risk reduction benefits, i.e. the difference between the situation with and without the intervention now and in the future. In the calculations, consider the time it takes for the solution to finalize construction or become effective, as nature-based solutions may require years to realize their full risk reduction potential.</p>

                <h3 className="info-title -secondary">3. Assess the social and environmental impacts</h3>
                <p className="text">Assess social and environmental impacts of the selected measure(s) and check whether remedial action is required under national or international law or agreed guidance. For example, an intervention may require the involuntary resettlement of people or may have an impact on the existing ecosystem. Ensure costs are included for any impacts which must be mitigated as part of the project. If applicable, ensure that the proposed project implementation will be in compliance with laws and safeguard standards of the respective country and organization(s) involved.</p>

                <h3 className="info-title -secondary">4. Identify additional benefits associated with risk reduction measures</h3>
                <p className="text">Identify the full range of benefits of interventions and their value added to society and environment for all options under consideration. Socio-economic and environmental benefits, monetized or not, should be presented for consideration in decision-making. Determine how various benefit streams may increase or decrease over time. Quantify and monetize benefits as much as possible using tools for ecosystem valuation. An example is ecosystem goods and services such as an increase in fish stocks or recreational value. Quantify the uncertainty in benefit estimation. Benefits for which monetization is not desirable or achievable must find adequate representation in qualitative narratives.</p>
                <p className="text">Nature-based solutions can have a range of benefits beyond flood risk reduction, such as biodiversity conservation, job creation (e.g. in agriculture and fisheries), recreation, tourism, and public health. Describe these various expected benefits as thoroughly as possible, ideally in economic terms. Non-monetizable benefits should be adequately described and included in the decision-making process. Any potential negative effects should also be described and quantified.</p>

                <h3 className="info-title -secondary">5. Perform full cost-benefit and effectiveness analysis</h3>
                <p className="text">Perform a complete quantitative cost-benefit analysis of each possible solution, including the target risk reduction benefits as well as all other benefits. In order to make a fair comparison of costs and benefits, monetary values should be discounted and converted to net present value. Costs are paid in the early years of a project while benefits are realized year by year over a number of decades. Describe the distribution of the costs and each benefit stream.</p>

                <article className="extra-info">
                  <h3 className="info-title">Outputs</h3>
                  <ul className="info-list">
                    <li>- Cost-benefit analysis including the full range of values</li>
                    <li>- Social and environmental impact assessments</li>
                    <li>- Risk assessment with interventions</li>
                  </ul>

                  <h2 className="info-title -principal">Example projects</h2>
                  <p className="text">1. The rivers and coastlines of Lami Town in the Republic of the Fiji Islands are prone to flash and surge flooding. This town was the focus of an economic analysis of nature-based, hybrid, and conventional solutions. A comprehensive analysis of installation, maintenance, labor, and opportunity costs was conducted for each of four options. The costs of inaction were also calculated. The economic analysis was conducted using avoided damage estimates and incorporated ecosystem service benefits. Lastly, a sensitivity analysis was included based on time, discount rate, and estimated percent of damage avoidance.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text">Rao, Nalini S. An Economic Analysis of Ecosystem-based Adaptation and Engineering Options for Climate Change Adaptation in Lami Town, Republic of the Fiji Islands: Technical Report. 2013. <a target="_blank" rel="noreferrer noopener" href="http://ian.umces.edu/pdfs/ian_report_392.pdf" download>http://ian.umces.edu/pdfs/ian_report_392.pdf</a></p>

                  <p className="text">2. Despite a dyke that provides the primary flood protection of the area, Koh Mueng, Thailand experiences flooding. To assess green and conventional infrastructure, an evaluation of the most effective flood mitigation measures was pursued through hydrodynamic simulations and evaluation of economic viability using cost-benefit analysis. The solution options were evaluated for flood risk reduction effectiveness using assessments of flood hazards, physical and economic vulnerability, and ecosystem service values. The cost-benefit analysis evaluated direct and indirect losses through physical and economic vulnerability of the building stock, infrastructure, cultural artifacts, and tourism industry.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text">Vojinovic, Zoran, et al. "Combining Ecosystem Services with Cost-Benefit Analysis for Selection of Green and Grey Infrastructure for Flood Protection in a Cultural Setting." Environments 4.1 (2016). <a target="_blank" rel="noreferrer noopener" href="http://www.mdpi.com/2076-3298/4/1/3">http://www.mdpi.com/2076-3298/4/1/3</a></p>

                  <h3 className="info-title">More information</h3>
                  <ul className="info-list">
                    <li>- The NOAA Guidance for Assessing the Costs and Benefits of Green Infrastructure outlines methodologies for assessing the effectiveness of green solutions: <a target="_blank" rel="noreferrer noopener" href="https://coast.noaa.gov/data/docs/digitalcoast/gi-cost-benefit.pdf" download>https://coast.noaa.gov/data/docs/digitalcoast/gi-cost-benefit.pdf</a></li>
                    <li>- The World Business Council for Sustainable Development (WBCSD) produced a report on the business case for natural infrastructure: <a target="_blank" rel="noreferrer noopener" href="http://www.naturalinfrastructureforbusiness.org/wp-content/uploads/2016/02/WBCSD_BusinessCase_jan2016.pdf" download>http://www.naturalinfrastructureforbusiness.org/wp-content/uploads/2016/02/WBCSD_BusinessCase_jan2016.pdf</a></li>
                    <li>- ProjectSelect, also produced by WBCSD, is a free cost-benefit analysis that allows users to evaluate the long-term financial costs and benefits of natural and conventional solutions, as well as account for the non-financial co-benefits: <a target="_blank" rel="noreferrer noopener" href="http://www.naturalinfrastructureforbusiness.org/projectselect-tm/">http://www.naturalinfrastructureforbusiness.org/projectselect-tm/</a></li>
                  </ul>
                </article>
              </section>

              <section id="implementation6">
                {isDevice() && <h3 className="tag">Step 6</h3>}
                <h2 className="section-title">Select and design the interventionn</h2>
                <p className="text">Select the most effective and most appropriate option, based on the problem definition, the cost-benefit analyses and the local needs and capacity. Develop a detailed design and implementation plan.</p>

                <h3 className="info-title -secondary">1. Select effective and feasible measure(s) in collaboration with stakeholders</h3>
                <p className="text">Discuss cost-benefit and effectiveness analyses with stakeholders in (an) interactive session(s). Identify those stakeholders that should be involved to ensure the long-term commitment to plans and strategies.</p>

                <h3 className="info-title -secondary">2. Design a robust monitoring system, starting with baseline monitoring</h3>
                <p className="text">To ensure the success of the project, conduct baseline monitoring and identify in an early stage how the project will be monitored and evaluated. There are many kinds of evaluation systems, and it is not yet clear which system is appropriate for nature-based solutions. A different type of monitoring system may be required, e.g. monitoring and evaluation (M&E), or monitoring, reporting and verification (MRV) with costs and responsibilities assigned. Logical framework and results-based management approaches are the most common frameworks. Monitoring and evaluation should be tailored to each project. Decide upon the roles and responsibilities of the organizations who will do this follow-up work after the project is implemented.</p>

                <h3 className="info-title -secondary">3. Draft engineering design study</h3>
                <p className="text">Produce a draft engineering design and feasibility study of the selected measure(s), including detailed material and labor requirements. The engineering design should be informed by the risk reduction target, the required integration of the measure in the existing ecosystem and by identified ecosystem management and restoration methods. Engineering designs should be based on detailed flood hazard and effectiveness modeling. These designs should explicitly encompass both the ecosystem and engineering aspects in the case of hybrid interventions. There are various technical design guidelines for nature-based interventions available, for example through the Ecoshape consortium.</p>

                <h3 className="info-title -secondary">4. Draft maintenance plan</h3>
                <p className="text">To secure the flood risk reduction effectiveness of the measure over time, a maintenance plan should be drafted as part of the selection and design phase. Maintenance costs can play a role in the selection process, and will influence the optimal design. Furthermore, it is important to decide who will be responsible for the maintenance and how the long-term financing will be arranged. Also think about embedding maintenance and protection in local laws and regulations.</p>

                <article className="extra-info">
                  <h3 className="info-title">Outputs</h3>
                  <ul className="info-list">
                    <li>- Design of measures</li>
                    <li>- Environmental and social impact assessment</li>
                    <li>- Monitoring plan containing indicators, target values, roles and responsibilities and monitoring method and duration</li>
                    <li>- Maintenance plan</li>
                  </ul>

                  <h2 className="info-title -principal">Example projects</h2>
                  <p className="text">As part of the Mozambique Cities and Climate Change Project, the World Bank is creating urban parks in the city of Beira. The objective is to increase the resilience of the city to floods by improving and safeguarding the natural drainage capacity of the Chiveve River. The first phase of the project included the rehabilitation of the riverbed, the construction of an outlet, the dredging of the fishing port and the planting of 2,200 mangrove trees with active flood mitigation function. The second phase, which is being implemented at the time of writing, will focus on the further development of a multi-purpose green infrastructure solution along the stretch of the Chiveve River in Beira. This solution will include the creation of a large park along the river, public spaces, cycling paths, and overall green landscape planning.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text"><a target="_blank" rel="noreferrer noopener" href="http://projects.worldbank.org/P153544?lang=en">http://projects.worldbank.org/P153544?lang=en</a></p>

                  <h3 className="info-title">More information</h3>
                  <ul className="info-list">
                    <li>- Designing nature-based solutions: Building with Nature Guidelines: <a target="_blank" rel="noreferrer noopener" href="https://publicwiki.deltares.nl/display/BWN1/Building+with+Nature">https://publicwiki.deltares.nl/display/BWN1/Building+with+Nature</a></li>
                    <li>- Information on design characteristics of green solutions for flood risk management by The Nature Conservancy (2014): <a target="_blank" rel="noreferrer noopener" href="https://www.conservationgateway.org/ConservationPractices/Freshwater/HabitatProtectionandRestoration/Documents/A%20Flood%20of%20Benefits%20-%20J.Opperman%20-%20May%202014.pdf" download>https://www.conservationgateway.org/ConservationPractices/Freshwater/HabitatProtectionandRestoration/Documents/A%20Flood%20of%20Benefits%20-%20J.Opperman%20-%20May%202014.pdf</a></li>
                    <li>- Incentives for Natural Infrastructure, report by the World Business Council for Sustainable Development (WBCSD, 2017): <a target="_blank" rel="noreferrer noopener" href="http://www.wbcsd.org/Clusters/Water/Natural-Infrastructure-for-Business/Resources/Incentives-for-Natural-Infrastructure">http://www.wbcsd.org/Clusters/Water/Natural-Infrastructure-for-Business/Resources/Incentives-for-Natural-Infrastructure</a></li>
                  </ul>
                </article>
              </section>

              <section id="implementation7">
                {isDevice() && <h3 className="tag">Step 7</h3>}
                <h2 className="section-title">Implementation and construction</h2>
                <p className="text">Implement the project in consultation with stakeholders; ensure compliance with social and environmental standards.</p>

                <h3 className="info-title -secondary">1. Revisit social and environmental impact assessment</h3>
                <p className="text">Revisit the social and environmental impact assessment, including the standards and safeguards relevant to the project. Start planning any required involuntary resettlement of inhabitants and preparing the implementation area to limit environmental impacts.</p>

                <h3 className="info-title -secondary">2. Consideration of ecosystem structure, species diversity, and ecosystem functioning</h3>
                <p className="text">Implement the engineering and ecosystem aspects of the project in accordance to the Principles. Also include the ecosystem integration as assessed in the previous steps. Closely monitor ecosystem functioning and impacts during the implementation phase. Any unexpected impacts on ecosystem structure, species and functioning should be flagged. For hybrid solutions, ensure that the engineering works and ecosystem aspects are implemented in harmony as per the design plan.</p>

                <h3 className="info-title -secondary">3. Continuous stakeholder and community interaction during implementation</h3>
                <p className="text">Continuously inform and consult the key stakeholders as identified in the previous steps. Ensure stakeholder ownership and involvement. In communications, be sensitive to both the short-term impacts and expected long-term impacts, but also on the gains for communities and environment. Monitor impacts of the construction and rehabilitation work on the local stakeholders. Flexibly adjust the implementation of the project where required based on changing stakeholder needs and emerging information.</p>

                <article className="extra-info">
                  <h3 className="info-title">Outputs</h3>
                  <ul className="info-list">
                    <li>- Agreement on lifetime of intervention</li>
                    <li>- Regulatory frameworks to sustain and maintain intervention</li>
                    <li>- Implemented measures</li>
                  </ul>

                  <h2 className="info-title -principal">Example projects</h2>
                  <p className="text">A good example of a participatory design process is constituted by retrofitting the storm water management system of the city of Malmö, Sweden. The city experienced socio-economic decline and floods from overflowing drainage. A collaborative solution aimed to retrofit the area with Sustainable Urban Drainage Systems (SUDS) as part of a broader regeneration project. The objective was to create a more sustainable neighborhood and to benefit biodiversity. An extensive and iterative process of stakeholder engagement was initiated during the design and execution of this project. The process involved a series of consultations with local residents, representatives from the local school, practitioners, city staff, and many others. The idea behind these consultations was to build awareness about the SUDS retrofit, its benefits and costs, and to obtain public perspectives on the desired design. This included regular meetings, community workshops and informal gatherings. The approach became increasingly open and consultative, with approximately one fifth of the tenants in the area having participated in dialogue meetings about the project. Amongst other topics, safety issues related to open water areas (e.g. retention pools) were discussed with residents as well as the potential loss of particular recreational opportunities in the area. In many cases, comments and concerns from stakeholders were taken into account and addressed in redesigned SUDS plans.</p>

                  <h3 className="info-title">Read more</h3>
                  <p className="text"><a target="_blank" rel="noreferrer noopener" href="http://www.panorama.solutions/en/building-block/engaging-stakeholders-raise-awareness-and-support">http://www.panorama.solutions/en/building-block/engaging-stakeholders-raise-awareness-and-support</a></p>

                  <h3 className="info-title">More information</h3>
                  <ul className="info-list">
                    <li>- The Nature of Risk Reduction platform details projects from around the world: <a target="_blank" rel="noreferrer noopener" href="http://nature-of-risk-reduction.vizzuality.com/">http://nature-of-risk-reduction.vizzuality.com/</a></li>
                    <li>- NOAA Guidance for Assessing the Costs and Benefits of Green Infrastructure: <a target="_blank" rel="noreferrer noopener" href="https://coast.noaa.gov/data/docs/digitalcoast/gi-cost-benefit.pdf" download>https://coast.noaa.gov/data/docs/digitalcoast/gi-cost-benefit.pdf</a></li>
                    <li>- The WWF Flood Green Guide: <a target="_blank" rel="noreferrer noopener" href="http://envirodm.org/flood-management">http://envirodm.org/flood-management</a></li>
                  </ul>
                </article>
              </section>

              <section id="implementation8">
                {isDevice() && <h3 className="tag">Step 8</h3>}
                <h2 className="section-title">Monitor and inform future actions</h2>
                <p className="text">Monitoring activities during and after the implementation of a nature-based solution are needed to maintain its effectiveness and to grow an evidence base. They are also needed to record lessons learned for future use.</p>

                <p className="text">Monitor physical system, ecosystem status, species diversity, and ecosystem functioning</p>

                <p className="text">Carefully monitor the development of the ecosystem in the area of implementation, as well as the larger landscape. The aim is to assess how the intervention has affected the area, how the ecosystem flood protection functions are developing and whether ecosystem restoration is progressing according to plan. Monitor species diversity and density over time to determine whether the ecosystem develops through different successional stages. Also assess if these stages are occurring on the expected timelines.</p>

                <h3 className="info-title -secondary">1. Monitor risk reduction effectiveness</h3>
                <p className="text">Refer to the monitoring system (see step 6.3) to assess how the components of the project have been implemented. The extent to which the restoration and creation of ecosystem elements are providing a growing contribution to the risk reduction effectiveness should also be assessed. If monitoring results show significant (and unexpected) physical changes, re-run the hazard and risk model with the evolved interventions in place to assess the effect on damages.</p>

                <h3 className="info-title -secondary">2. Policy and regulatory framework development and adjustment</h3>
                <p className="text">As the benefits of nature-based solutions can be realized over many decades, it is important to understand the regulatory environment. Does it change over time? This will allow the project to adapt to forthcoming policies before they negatively impact the solution.</p>

                <h3 className="info-title -secondary">3. Continuous community involvement</h3>
                <p className="text">The sustainability of a nature-based solution depends on community willingness and commitment. If the community is not involved and does not see the value of the restored or created ecosystem, they may knowingly or unknowingly contribute to its decline. It is crucial to involve all social groups in the community by conducting meetings to explain the project and its benefits. Practical guidance should be provided on the use and protection of vital ecosystems. It is important to ensure that project representatives listen to the community. Sufficient time should be spent on addressing their concerns.  Community commitment can be increased in case of new employment opportunities derived from the ecosystem. There are several documented examples of nature-based solutions that were implemented with strong community involvement that can be used as guidance.</p>

                <h3 className="info-title -secondary">4. Review, evaluate, and act</h3>
                <p className="text">Monitoring and evaluation should generate insights on what works, what doesn’t work, and why. Monitoring also strongly informs maintenance and other necessary actions. Review all project components with special attention to risk reduction effectiveness, community impact, and environmental impacts. This monitoring and review process should include developments outside the project area that may influence the effectiveness of measures. Decide if structural and functional performance meet previously set standards and project objectives. If not, decide on follow up actions, regarding maintenance or even implementation of additional interventions.</p>

                <p className="text">To enable scaling-up and improvement of global best practices, publish evaluations and share insights with other implementing organizations. Investigate possibilities for scaling up successful approaches in other areas. While learning lessons should be done throughout the project, it is important for the success of other nature-based projects to capture and report these lessons in a way that is accessible more broadly. We encourage you to report your projects and lessons learned on the online platform ‘Natural Hazards – Nature-based Solutions’.</p>

                <article className="extra-info">
                  <h3 className="info-title">Outputs</h3>
                  <ul className="info-list">
                    <li>- Monitoring reports that discuss how the monitoring meets the target</li>
                    <li>- Actions to change or improve the project, if needed</li>
                    <li>- Sharing of lessons learned</li>
                  </ul>

                  <h2 className="info-title -principal">Example projects</h2>
                  <p className="text">New Zealand’s coastal parks have recently focused on restorative techniques focused on the use of indigenous sand-binding species, for example in the management of dune ecosystems in Christchurch. A collaborative and community-based vision for the area was established and management objectives were identified. These included a specific restoration plan for the dune system at the site, together with a monitoring plan. Other initiatives included the promotion of education on the area and the dune restoration initiative. A monitoring program was developed to measure the success of the key actions and provide useful information for future management decisions. The monitoring program has clearly shown changes in the dune system in response to the new management activities.</p>

                  <h3 className="info-title">More information</h3>
                  <p className="text">There are numerous online communities that support the advancement of nature-based solutions through a variety of approaches. These resources offer an opportunity to review and evaluate projects and share your own experiences to inform the development of future projects.</p>
                  <p className="text">The European Commission’s Oppla is a new knowledge marketplace; a place where the latest thinking on ecosystem services, natural capital and nature-based solutions is brought together. <a target="_blank" rel="noreferrer noopener" href="http://www.oppla.eu">http://www.oppla.eu</a></p>
                  <p className="text">The Partnership for Environment and Disaster Risk Reduction (PEDRR) is a global alliance of UN agencies, NGOs and specialist institutes. PEDRR seeks to promote and scale-up implementation of ecosystem-based disaster risk reduction and ensure it is mainstreamed in development planning at global, national and local levels. <a target="_blank" rel="noreferrer noopener" href="http://pedrr.org">http://pedrr.org</a></p>
                  <p className="text">The Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ) and IUCN host the PANORAMA platform. This is a partnership initiative to document and promote inspiring, replicable solutions across a range of conservation and development topics. This enables cross-sectoral learning and inspiration. <a target="_blank" rel="noreferrer noopener" href="http://panorama.solutions/en">http://panorama.solutions/en</a></p>
                  <p className="text">The Natural Infrastructure for Business platform developed by the World Business Council for Sustainable Development (WBCSD), CH2M (with support from The Nature Conservancy) and other member companies is designed to introduce business leaders and practitioners to natural infrastructure. <a target="_blank" rel="noreferrer noopener" href="http://www.naturalinfrastructureforbusiness.org">http://www.naturalinfrastructureforbusiness.org</a></p>
                  <p className="text">Stockholm Environment Institute’s weADAPT is a collaborative platform on climate adaptation issues. It allows practitioners, researchers and policy-makers to access credible, high-quality information. The platform also facilitates new connections between these stakeholders. <a target="_blank" rel="noreferrer noopener" href="https://www.weadapt.org">https://www.weadapt.org</a></p>
                  <p className="text">GIZ hosts an Adaptation Community which offers an inventory of methods for adaptation to climate change. It also serves as a platform for the exchange of experience among practitioners. <a target="_blank" rel="noreferrer noopener" href="http://www.adaptationcommunity.net">http://www.adaptationcommunity.net</a></p>
                  <p className="text">Building Ecological Solutions to Coastal Community Hazards. A Guide for New Jersey Coastal Communities. National Wildlife Federation (2017). <a target="_blank" rel="noreferrer noopener" href="http://www.nwf.org/~/media/PDFs/Global-Warming/NWF_FINAL-WEB-VERSION_BESCCH_070517.ashx">http://www.nwf.org/~/media/PDFs/Global-Warming/NWF_FINAL-WEB-VERSION_BESCCH_070517.ashx</a></p>
                  <p className="text">The Natural Hazards – Nature-based Solutions platform, managed by the Global Facility for Disaster Reduction and Recovery (GFDRR), the World Bank, and Deltares, provides a global overview of the nature-based or hybrid solutions projects implemented by a variety of organizations. The platform also houses these Principles and Implementation Guidance that are updated with lessons learned. <a target="_blank" rel="noreferrer noopener" href="http://naturebasedsolutions.org/">http://naturebasedsolutions.org/</a></p>
                </article>
              </section>

              <section id="implementation9">
                <h2 className="section-title">Conclusions</h2>
                <p className="text">The five principles and implementation guidance presented in this guidance make a case for a structured approach to the planning, evaluation, design, and implementation of nature-based solutions for flood risk management. They aim to support disaster risk management and climate adaptation professionals who plan flood risk management interventions, NGOs that implement nature-based solutions, as well as staff of donor and international agencies who design, review, or fund such projects. Using the growing momentum for the use of nature-based solutions as part of resilience-building strategies and disaster risk reduction, these guidelines offer a step-by-step approach for implementing successful nature-based solutions for flood risk management.</p>
                <p className="text">This document is one building block towards a system in which nature-based solutions for flood risk management are widely accepted and implemented as an alternative or complement to conventional engineering measures. However, the document is not meant to form an all-encompassing guide. Rather, it aims to set out the framework for nature-based flood management, and forms an addition to other more specific initiatives such as detailed guidance on implementation (e.g. the WWF Flood Green Guide; and USACE design guidelines that are currently in preparation), training programs (e.g. the NOAA Green Infrastructure for Coastal Resilience course), and international networks (such as the Partnership for Environment and Disaster Risk Reduction, PEDRR). As such, we have tried to reference such specific further resources throughout the guidance. Also, we encourage others to build from this framework to provide further detailed information that is needed for successful implementation.</p>
                <p className="text">We hope that ‘Implementing nature-based flood protection: Principles and implementation guidance’ streamlines and accelerates the process of knowledge development, evaluation, and standardization of design and testing protocols. That way, we can continue to improve and promote nature-based adaptation as a sustainable flood risk management solution.</p>
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
