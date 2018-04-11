import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';

import { SvgIcon } from 'vizz-components';
import Introduction from 'components/pages/guidance/Introduction';
import Principles from 'components/pages/guidance/Principles';
import Implementation from 'components/pages/guidance/Implementation';
import Acknowledgements from 'components/pages/guidance/Acknowledgements';

const tabsNames = ['introduction', 'principles', 'implementation', 'acknowledgements'];

export default class AcknowledgementsPage extends React.Component {
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
              <h1 className="h1 -secondary -big">Acknowledgements</h1>
              <div className="intro-container">
                {/* <p className="intro">Implementing nature-based flood protection</p> */}
              </div>
            </div>
          </div>
        </section>
        <section className="guidance-section -tabs-header">
          <div className="l-app-wrapper">
            {/* <Tabs selectedIndex={this.state.tabIndex} onSelect={this.onSelect}>
              <TabList className="c-tabs-fixed wrapper">
                <Tab className="tab">Acknowledgements</Tab>
              </TabList>
              <TabPanel><Acknowledgements /></TabPanel>
            </Tabs> */}
            <Acknowledgements />

            {/* <div className="guidance-section -download">
              <div className="download-container -right">
                <a className="c-btn -download -inverse" href="/files/Implementing_nature-based_flood_protection_Principles_and_implementation.pdf" download>
                  Download pdf
                  <SvgIcon name="icon-download-white" />
                </a>
              </div>
            </div> */}
          </div>
        </section>
      </div>
    );
  }
}

AcknowledgementsPage.propTypes = {};
AcknowledgementsPage.defaultProps = {};
