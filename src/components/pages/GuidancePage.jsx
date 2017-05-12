import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';

import Introduction from 'components/pages/guidance/Introduction';
import Principles from 'components/pages/guidance/Principles';
import Implementation from 'components/pages/guidance/Implementation';

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
              <p className="intro">Implementing nature-based flood protection</p>
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
              </TabList>
              <TabPanel><Introduction /></TabPanel>
              <TabPanel><Principles /></TabPanel>
              <TabPanel><Implementation /></TabPanel>
            </Tabs>
          </div>
        </section>
      </div>
    );
  }
}

GuidancePage.propTypes = {};
GuidancePage.defaultProps = {};
