import React from 'react';
import { Row } from 'components/ui/Grid';

export default class Acknowledgements extends React.Component {
  render() {
    return (
      <div className="c-guidance-acknowledgements">
        {/* Heading section */}
        <section className="tab-section -intro wrapper">
          <Row>
            <div className="column small-12 large-8 large-offset-2">
              <h3 className="tag">Guidance</h3>
              <h1 className="title">Acknowledgements</h1>
              <p className="text">This guideline is a product of collective effort by Deltares, Global Facility for Disaster Reduction and Recovery (GFDRR), The World Bank, Ecoshape and United Nations Development Programme (UNDP). Furthermore, this document could not have been made without the input from all participants of the workshop on scaling up nature-based flood risk reduction, held on April 11th and 12th 2017 at Deltares (NL).</p>
            </div>
          </Row>
        </section>
        <section className="tab-section -authors wrapper">
          <Row>
            <div className="column small-12 large-8 large-offset-2">
              <h3 className="info-title -secondary">Authors</h3>
              <ul className="info-list">
                <li>Deltares: Bregje K. van Wesenbeeck, Stéphanie IJff</li>
                <li>GFDRR: Brenden Jongman, Simone Balog , Stefanie Kaupa, Lauren Bosche</li>
                <li>World Bank: Glenn-Marie Lange, Niels Holm-Nielsen</li>
                <li>Ecoshape: Henk Nieboer</li>
                <li>UNDP: Yusuke Taishi, Pradeep Kurukulasuriya</li>
                <li>Independent consultant: Imen Meliane</li>
              </ul>

              <h3 className="info-title -secondary">Contributors and reviewers</h3>
              <ul className="info-list">
                <li>The Water Institute of the Gulf: Denise Reed</li>
                <li>HR Wallingford: Jonathan Simm</li>
                <li>US Army Corps of Engineers: Todd S. Bridges</li>
                <li>Deltares: Stephanie Janssen, Karen Meijer</li>
                <li>IH Cantabria: Inigo Losada</li>
                <li>The Nature Conservancy & University of California, Santa Cruz: Borja G. Reguero</li>
                <li>Royal Haskoning-DHV: Petra Dankers</li>
                <li>The Nature Conservancy: Adam Whelchel</li>
                <li>Wetlands International: Marie-Jose Vervest, Susanna Tol</li>
                <li>Environmental Defense Fund: Natalie Peyronnin, Shannon Cunniff</li>
                <li>University of Western Australia: Ryan Lowe</li>
                <li>Delft University of Technology: Stefan Aarninkhof</li>
                <li>UN Environment/IUCN CEM: Karen Sudmeier</li>
                <li>UN Environment : Marisol Estrella</li>
                <li>University of the Free State : Fabrice Renaud</li>
              </ul>

              <h3 className="info-title -secondary">Design and Layout</h3>
              <ul className="info-list">
                <li>Deltares: Welmoed Jilderda</li>
              </ul>
            </div>
          </Row>
        </section>
        <section className="tab-section -intro wrapper">
          <Row>
            <div className="column small-12 large-8 large-offset-2">
              <img src="/images/acknowledgements.svg" alt="graph" />
            </div>
          </Row>
        </section>
      </div>
    );
  }
}

Acknowledgements.propTypes = {};
Acknowledgements.defaultProps = {};
