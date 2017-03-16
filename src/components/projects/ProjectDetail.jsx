import React from 'react';

export default function ProjectDetail(props) {
  return (
    <article className="c-project-detail">
      <div className="project-bar">
        <button className="project-back" onClick={props.onBack} type="button">See all projects</button>
      </div>
      <div className="project-detail-section">
        <h1 className="project-title">Metro Colombo Urban Development Project</h1>
        <span className="project-company">World Bank</span>
        <span className="project-date">2012 - currently</span>
        <p className="project-text">The project's objective is to support Sri Lanka in reducing the flooding in the catchment of the Colombo Water Basin, and strengthen the capacity of local authorities in the Colombo Metropolitan Area to rehabilitate, improve and maintain local infrastructure and services through selected demonstration investments. The project aims to achieve this through Flood and Drainage Management, Urban development, infrastructure rehabilitation and capacity building for Metro Colombo local authorities, and Implementation Support. The flood control and drainage management program would benefit, directly or indirectly, about 2.5 million people.</p>
        <a className="project-link" target="_blank" href="http://www.worldbank.org/">Project page</a>
      </div>
      <div>
        <dl className="project-detail-list">
          <dt>Status</dt>
          <dd>On going</dd>
          <dt>Hazard</dt>
          <dd>Urban, River</dd>
          <dt>Intervention</dt>
          <dd>Hybrid - Hybrid measures utilize a combination of both grey and green measures to simultaneously establish immediate risk reduction while maintaining the valuable role of the relevant ecosystem</dd>
          <dt>Solution</dt>
          <dd>River restoration and Wetland restoration</dd>
          <dt>Co-benefits of intervention</dt>
          <dd>Recreation of real state value</dd>
          <dt>Cost in million</dt>
          <dd className="-big">105,5 USD</dd>
          <dt>Benefits</dt>
          <dd></dd>
        </dl>
      </div>
    </article>
  );
}

ProjectDetail.propTypes = {
  data: React.PropTypes.object,
  onBack: React.PropTypes.func
};
