import React from 'react';
import { Link } from 'react-router';
import { Row } from 'components/ui/Grid';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        {/* Heading section */}
        <section className="home-section -header">
          <div className="l-app-wrapper">
            <div className="section-wrapper">
              <h1 className="h1 -secondary -big">The Nature of Risk Reduction</h1>
              <h2 className="h2">Get inspired to create your solution with green infrastructure projects implemented around the world</h2>
              <Link className="btn -primary" to="/map">Go to the map</Link>
            </div>
          </div>
        </section>
        {/* Projects */}
        <section className="home-section">
          <div className="l-app-wrapper">
            <Row>
              <div className="small-6">
                <h1 className="h1 -line">Learn more about projects</h1>
                <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium commodi totam culpa, dolorum asperiores iusto quidem, nesciunt hic eaque blanditiis enim, id maiores nam nobis dignissimos aliquam ad minus nisi. </p>
                <Link className="btn -secondary" to="/map">See all</Link>
              </div>
            </Row>
          </div>
        </section>
        {/* Submit */}
        <section className="home-section -submit">
          <div className="l-app-wrapper">
            <Row>
              <div className="small-6">
                <h1 className="h1 -secondary -line">Submit project</h1>
                <p className="text -secondary">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium commodi totam culpa, dolorum asperiores iusto quidem, nesciunt hic eaque blanditiis enim, id maiores nam nobis dignissimos aliquam ad minus nisi. </p>
                <Link className="btn -secondary">See all</Link>
              </div>
            </Row>
          </div>
        </section>
        {/* Resources */}
        <section className="home-section">
          <div className="l-app-wrapper">
            <Row>
              <div className="small-6">
                <h1 className="h1 -line">Resources</h1>
              </div>
              <div className="small-6">
                <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium commodi totam culpa, dolorum asperiores iusto quidem, nesciunt hic eaque blanditiis enim, id maiores nam nobis dignissimos aliquam ad minus nisi. </p>
                <Link className="btn -secondary">See all</Link>
              </div>
            </Row>
          </div>
        </section>
        {/* Partners */}
        <section className="home-section">
          <div className="l-app-wrapper">
            <h1 className="h1 -line">Partners</h1>
          </div>
        </section>
      </div>
    );
  }
}

HomePage.propTypes = {};
HomePage.defaultProps = {};
