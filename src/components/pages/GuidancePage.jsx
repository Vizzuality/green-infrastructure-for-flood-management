import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';

import { SvgIcon } from 'vizz-components';
import Introduction from 'components/pages/guidance/Introduction';
import Principles from 'components/pages/guidance/Principles';
import Implementation from 'components/pages/guidance/Implementation';
import Acknowledgements from 'components/pages/guidance/Acknowledgements';

const tabsNames = ['introduction', 'principles', 'implementation', 'acknowledgements'];

export default class GuidancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: 0 };
    this.onSelect = this.onSelect.bind(this);
  }

  componentWillMount() {
    const hashName = location.hash.split('#')[1];
    if (hashName) {
      this.setState({ tabIndex: tabsNames.indexOf(location.hash.split('#')[1]) });
    } else {
      this.setState({ tabIndex: this.state.tabIndex });
    }
  }

  onSelect(tabIndex) {
    location.hash = tabsNames[tabIndex];
    this.setState({ tabIndex });
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
                <div className="download-container">
                  <a className="c-btn -download" href="/files/Brochure-Implementing-nature-based-flood-protection_web.pdf" download>
                    Download pdf (EN)
                    <SvgIcon name="icon-download-white" />
                  </a>

                  <a className="c-btn -download" href="/files/2018002083SPAspa001_Brochure_Implementing_nature-based_flood_protection_VIEWONLY.pdf" download>
                    Download pdf (ES)
                    <SvgIcon name="icon-download-white" />
                  </a>

                  <a className="c-btn -download" href="/files/2018002083FREfre001_Brochure_Implementing_nature-based_flood_protection_Final_VIEWONLY.pdf" download>
                    Download pdf (FR)
                    <SvgIcon name="icon-download-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="guidance-section -tabs-header">
          <div className="l-app-wrapper">
            <Tabs selectedIndex={this.state.tabIndex} onSelect={this.onSelect}>
              <TabList className="c-tabs-fixed wrapper">
                <Tab className="tab">Introduction</Tab>
                <Tab className="tab">Principles</Tab>
                <Tab className="tab">Implementation</Tab>
                {/*<Tab className="tab">Acknowledgements</Tab>*/}
              </TabList>
              <TabPanel><Introduction /></TabPanel>
              <TabPanel><Principles /></TabPanel>
              <TabPanel><Implementation /></TabPanel>
              {/*<TabPanel><Acknowledgements /></TabPanel>*/}
            </Tabs>

            <div className="guidance-section -download">
              <div className="download-container">
                <a className="c-btn -download -inverse" href="/files/Brochure-Implementing-nature-based-flood-protection_web.pdf" download>
                  Download pdf (EN)
                  <SvgIcon name="icon-download" />
                </a>

                <a className="c-btn -download -inverse" href="/files/2018002083SPAspa001_Brochure_Implementing_nature-based_flood_protection_VIEWONLY.pdf" download>
                  Download pdf (ES)
                  <SvgIcon name="icon-download" />
                </a>

                <a className="c-btn -download -inverse" href="/files/2018002083FREfre001_Brochure_Implementing_nature-based_flood_protection_Final_VIEWONLY.pdf" download>
                  Download pdf (FR)
                  <SvgIcon name="icon-download" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

GuidancePage.propTypes = {};
GuidancePage.defaultProps = {};
