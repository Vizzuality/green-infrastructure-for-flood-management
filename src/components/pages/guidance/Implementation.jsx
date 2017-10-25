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
              <p className="text">The five principles outlined some general ‘rules’ for sustainable and effective nature-based solutions for flood risk management. This section of the guidance summarizes the steps needed for the planning, assessment, design, implementation, monitoring, management, and evaluation of nature-based solutions for flood risk management. It follows the general cycle of a flood risk management project and therefore are also applicable for gray measures. However, it provides more information and detail on specific aspects that need further attention when implementing nature-based solutions. These guidelines build and expand upon existing guidance developed by other organizations, including NOAA, USACE and Ecoshape. This document attempts to cover the entire project cycle from preparation to monitoring and evaluation.</p>
              <p className="text">Projects that aim to implement nature-based solutions must consider biophysical and socio-economic processes on different scales in space and time. This calls for the engagement of experts from different disciplines such as hydrology, engineering, ecology, economics and social sciences. As with other risk management projects, the design and implementation of nature-based solutions should be done in a participatory manner with full engagement of all relevant stakeholders. This is particularly important as nature-based solutions present an opportunity to address flood risks by aligning conservation, development and poverty alleviation objectives. This can create new synergies and collaborations between governments, local communities, NGOs, but also relevant private sector stakeholders.</p>
              <img src="/images/steps.svg" alt="implementation" />
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
                  <p className="text">Tonneijck et al. “Building with Nature Indonesia: Securing Eroding Delta Coastlines. Design and Engineering Plan.” (2015): <a href="https://www.ecoshape.org/uploads/sites/2/2016/07/Ecoshape-2015-Result-1-5-Design-Engineering-Plan-v7-0-LAYOUT-Nature-style_2.pdf" download>https://www.ecoshape.org/uploads/sites/2/2016/07/Ecoshape-2015-Result-1-5-Design-Engineering-Plan-v7-0-LAYOUT-Nature-style_2.pdf</a>. Additional information on the Building with Nature project in Indonesia: <a href="http://www.indonesia.buildingwithnature.nl">www.indonesia.buildingwithnature.nl</a></p>

                  <h3 className="info-title">More information</h3>
                  <p className="text">Specific guidance on how to conduct a stakeholder analysis can be found on the Ecoshape website: <a href="https://publicwiki.deltares.nl/display/BWN1/Tool+-+Stakeholder+analysis">https://publicwiki.deltares.nl/display/BWN1/Tool+-+Stakeholder+analysis</a>.</p>
                  <p className="text">More information on involvement of local communities using a field school approach can be found with <a href="http://blue-forests.org/">Blue Forests (http://blue-forests.org/)</a>. Blue Forests is a local NGO based in Indonesia focused on empowering local communities to rehabilitate and maintain sustainable use of coastal ecosystem resources. Blue Forests provide environmental education, ecological mangrove rehabilitation, coastal field schools, and coastal business schools.</p>
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
                  <p className="text">Tallis, Heather, et al. "An ecosystem services framework to support both practical conservation and economic development." Proceedings of the National Academy of Sciences 105.28 (2008): 9457-9464. URL: <a href="http://www.edc.uri.edu/temp/ci/ciip/FallClass/Docs_2008/Tallis%20et%20al.%202008.pdf" download>http://www.edc.uri.edu/temp/ci/ciip/FallClass/Docs_2008/Tallis%20et%20al.%202008.pdf</a>. Additional information on Quito’s Water Fund: <a href="http://www.fondosdeagua.org/en/quito-water-conservation-fund-fonag-quito-ecuador-2000" >http://www.fondosdeagua.org/en/quito-water-conservation-fund-fonag-quito-ecuador-2000</a></p>

                  <h3 className="info-title">More information</h3>
                  <p className="text">The Global Climate Change Alliance (GCCA+) offers a searchable repository of 47 sources of technical and financial support in Africa, Asia, Caribbean and Pacific regions in GCCA+ priority areas: <a href="http://www.gcca.eu/technical-and-financial-support">http://www.gcca.eu/technical-and-financial-support</a>.</p>

                  <p className="text">The Global Environment Facility (GEF) provides guidance on payment schemes for ecosystem services: <a href="https://www.thegef.org/sites/default/files/publications/28252nomarks_0.pdf" download>https://www.thegef.org/sites/default/files/publications/28252nomarks_0.pdf</a></p>
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
                  <p className="text">UNEP (2016). Coastal Partners: Applying ecosystem-based disaster risk reduction (Eco-DRR) through a ridge-to-reef approach in Port Salut, Haiti. URL <a href="http://wedocs.unep.org/handle/20.500.11822/14211">http://wedocs.unep.org/handle/20.500.11822/14211</a></p>

                  <h3 className="info-title">More information</h3>
                  <ul className="info-list">
                    <li>- NOAA Guidance for Assessing the Costs and Benefits of Green Infrastructure: <a href="https://coast.noaa.gov/data/docs/digitalcoast/gi-cost-benefit.pdf" download>https://coast.noaa.gov/data/docs/digitalcoast/gi-cost-benefit.pdf</a></li>
                    <li>- Methodologies for assessing dynamic risk: <a href="https://www.gfdrr.org/sites/default/files/publication/Riskier%20Future.pdf" download>https://www.gfdrr.org/sites/default/files/publication/Riskier%20Future.pdf</a></li>
                    <li>- Open-source hazard data and screening:  <a href="http://www.thinkhazard.org">www.thinkhazard.org</a></li>
                    <li>- WRI Global Flood Analyzer: <a href="http://floods.wri.org">http://floods.wri.org</a></li>
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
                  <p className="text">Day et al. (2016). Building Capacity for Coastal Ecosystem-based Adaptation in Small Island Developing States (SIDS). Assessing Climate Vulnerability in Grenada and Responding with Coastal Ecosystem-based Adaptation Action. URL: <a href="http://www.intasave.pecreative.co.uk/documents/Publications/Climate-Change-Science,-Policy-and-Practice/CARIBSAVE/BCCEbA-SIDS.pdf" download>http://www.intasave.pecreative.co.uk/documents/Publications/Climate-Change-Science,-Policy-and-Practice/CARIBSAVE/BCCEbA-SIDS.pdf</a></p>

                  <h3 className="info-title">More information</h3>
                  <ul className="info-list">
                    <li>- Decision tree on whether nature-based solutions can be effective for your project: <a href="http://www.naturalinfrastructureforbusiness.org/tools/#tree">http://www.naturalinfrastructureforbusiness.org/tools/#tree</a></li>
                    <li>- An overview of possible green measures for flood risk management by The Nature Conservancy (2014): <a href="https://www.conservationgateway.org/ConservationPractices/Freshwater/HabitatProtectionandRestoration/Documents/A%20Flood%20of%20Benefits%20-%20J.Opperman%20-%20May%202014.pdf" download>https://www.conservationgateway.org/ConservationPractices/Freshwater/HabitatProtectionandRestoration/Documents/A%20Flood%20of%20Benefits%20-%20J.Opperman%20-%20May%202014.pdf</a></li>
                    <li>- UNEP, DHI, IUCN and The Nature Conservancy’s Green Infrastructure Guide for Water Management: <a href="http://www.medspring.eu/sites/default/files/Green-infrastructure-Guide-UNEP.pdf" download>http://www.medspring.eu/sites/default/files/Green-infrastructure-Guide-UNEP.pdf</a></li>
                    <li>- For planning and strategy building including long-term uncertainty: <a href="https://www.deltares.nl/en/adaptive-pathways/">https://www.deltares.nl/en/adaptive-pathways/</a></li>
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
