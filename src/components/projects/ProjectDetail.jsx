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
        <a className="project-link" target="_blank">Project page</a>
      </div>
    </article>
  );
}

ProjectDetail.propTypes = {
  data: React.PropTypes.object,
  onBack: React.PropTypes.func
};
