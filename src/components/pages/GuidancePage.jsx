import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';

import { SvgIcon } from 'vizz-components';
import Introduction from 'components/pages/guidance/Introduction';
import Principles from 'components/pages/guidance/Principles';
import Implementation from 'components/pages/guidance/Implementation';
import Acknowledgements from 'components/pages/guidance/Acknowledgements';


export default class GuidancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: 0 };
  }

  render() {
    return (
      <div className="c-guidance">
        <section className="guidance-section -header wrapper">
          <div className="l-app-wrapper">
            <div className="section-wrapper">
              <h1 className="h1 -secondary -big">Guidance</h1>
              <div className="intro-container">
                <p className="intro">Implementing nature-based flood protection</p>
                <a className="c-btn -download" href="/files/Implementing_nature-based_flood_protection_Principles_and_implementation.pdf" download>
                  Download pdf
                  <SvgIcon name="icon-download-white" />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="guidance-section -tabs-header">
          <div className="l-app-wrapper">
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
              <TabList className="c-tabs-fixed wrapper">
                <Tab className="tab">Introduction</Tab>
                <Tab className="tab">Principles</Tab>
                <Tab className="tab">Implementation</Tab>
                <Tab className="tab">Acknowledgements</Tab>
              </TabList>
              <TabPanel><Introduction /></TabPanel>
              <TabPanel><Principles /></TabPanel>
              <TabPanel><Implementation /></TabPanel>
              <TabPanel><Acknowledgements /></TabPanel>
            </Tabs>
          </div>
        </section>
      </div>
    );
  }
}

GuidancePage.propTypes = {};
GuidancePage.defaultProps = {};
