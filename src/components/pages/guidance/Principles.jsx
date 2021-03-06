import React from 'react';
import 'rc-collapse/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';
import { SvgIcon } from 'vizz-components';
import { Row } from 'components/ui/Grid';
import { principle1, principle2, principle3, principle4, principle5 } from 'constants/guidance';

export default class Principles extends React.Component {
  constructor(props) {
    super(props);

    this.state = { activeKey: [] };
  }

  onClick(key) {
    const { activeKey } = this.state;
    const newKey = activeKey.length && activeKey[0] === key ? [] : [key];
    this.setState({ activeKey: newKey });
  }

  renderPanels() {
    const principles = [principle1, principle2, principle3, principle4, principle5];
    const { activeKey } = this.state;

    return (
      <Collapse className="c-accordion" activeKey={activeKey}>
        {principles.map(p => (
          <Panel
            header={(
              <div className="pp-header">
                <button className="show-more" onClick={() => this.onClick(p.number)}>
                  {(activeKey.length && activeKey[0] !== p.number) || !activeKey.length ?
                    <SvgIcon name="icon-plus" className="more -small" /> :
                    <SvgIcon name="icon-minus" className="more -medium" />
                  }
                </button>
                <h2 className="pp-title">
                  <span className="pp-number">Principle {p.number}</span>
                  <span>{p.title}</span>
                </h2>
              </div>
            )}
            key={p.number}
            className={activeKey.length && activeKey[0] === p.number ? '-active' : ''}
          >
            {<div dangerouslySetInnerHTML={{ __html: p.text.join('') }} className="text" />}
          </Panel>
        ))}
      </Collapse>
    );
  }

  render() {
    return (
      <div className="c-guidance-principles">
        {/* Heading section */}
        <section className="tab-section -intro wrapper">
          <Row>
            <div className="column small-12 large-10 large-offset-1">
              <h3 className="tag">Guidance</h3>
              <h1 className="title">Principles</h1>
              <p className="text">A number of pilot projects and technical reports have recently been released on the implementation of nature-based solutions for flood risk management. Five basic principles to guide future nature-based project development have come out of these pilot projects—both during design, implementation and maintenance—and reports on the topic. The main purpose of these principles is to promote best practices and prevent common pitfalls in the use of nature-based solutions. As such, these principles are meant as guidance for project development and initiation and not as a specific design manual. For more detailed information on design, existing technical guidelines (including the US National Oceanic and Atmospheric Administration (NOAA), the US Army Corps of Engineers (USACE), and Ecoshape) and guidelines under development (USACE) can be consulted.</p>
            </div>
          </Row>

          <Row>
            <div className="column small-12 large-10 large-offset-1">
              <div className="image-container">
                <img src="/images/principles.png" alt="principles" />
              </div>
              <span className="line" />
            </div>
          </Row>
        </section>


        {/* Principles accordion */}
        <section className="tab-section -principles wrapper">
          <Row>
            <div className="column small-12 large-10 large-offset-1">
              {this.renderPanels()}
            </div>
          </Row>
        </section>
      </div>
    );
  }
}

Principles.propTypes = {};
Principles.defaultProps = {};
