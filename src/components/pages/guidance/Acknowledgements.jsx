import React from 'react';

// Comonents
import { Row } from 'components/ui/Grid';

// Constants
import { ACRONYMS } from 'constants/acknowledgements';

export default class Acknowledgements extends React.Component {
  static getAcronyms() {
    const acronyms = [];

    for (let i = 0; i < ACRONYMS.length; i += 2) {
      acronyms.push(
        <Row key={i}>
          <div className="column small-12 medium-6 large-5 large-offset-1">
            <div className="text-group">
              <p className="text">{ACRONYMS[i].name}</p>
              <p className="text -highlighted">{ACRONYMS[i].value}</p>
            </div>
          </div>
          {i + 1 < ACRONYMS.length &&
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">{ACRONYMS[i + 1].name}</p>
                <p className="text -highlighted">{ACRONYMS[i + 1].value}</p>
              </div>
            </div>
          }
        </Row>
      );
    }

    return acronyms;
  }

  render() {
    return (
      <div className="c-guidance-acknowledgements">
        {/* Heading section */}
        <section className="tab-section -intro wrapper">
          <Row>
            <div className="column small-12 large-10 large-offset-1">
              <h3 className="tag">Guidance</h3>
              <h1 className="title">Acknowledgements</h1>
              <p className="text">This guideline is a product of collective effort by Deltares, Global Facility for Disaster Reduction and Recovery (GFDRR), The World Bank, Ecoshape and United Nations Development Programme (UNDP). Furthermore, this document could not have been made without the input from all participants of the workshop on scaling up nature-based flood risk reduction, held on April 11th and 12th 2017 at Deltares (NL).</p>
            </div>
          </Row>
        </section>
        <section className="tab-section -authors wrapper">
          <Row>
            <div className="column small-12 large-10 large-offset-1">
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
            <div className="column small-12 large-10 large-offset-1">
              <p className="text">This document is drafted based upon comments and remarks from the following workshop participants</p>
            </div>
          </Row>

          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Abdi Yusuf</p>
                <p className="text -highlighted">United Nations Development Programme (UNDP)</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Ap van Dongeren</p>
                <p className="text -highlighted">Deltares</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Armando Guzman</p>
                <p className="text -highlighted">The World Bank</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Bastiaan Lammers</p>
                <p className="text -highlighted">The World Bank</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Boris van Zanten</p>
                <p className="text -highlighted">Wolfs Company</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Carrie de Wilde</p>
                <p className="text -highlighted">Ecoshape</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Cees van de Guchte</p>
                <p className="text -highlighted">Deltares</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Christophe Briere</p>
                <p className="text -highlighted">Deltares</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Claire Jeuken</p>
                <p className="text -highlighted">Deltares</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Ellis Penning</p>
                <p className="text -highlighted">Deltares</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Els van Lavieren</p>
                <p className="text -highlighted">Conservation International</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Femke Schasfoort</p>
                <p className="text -highlighted">Ecoshape</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Fokko van der Goot</p>
                <p className="text -highlighted">Ecoshape</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Hans Pietersen</p>
                <p className="text -highlighted">Rijkswaterstaat</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Hessel Winsemius</p>
                <p className="text -highlighted">Deltares</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Jaap Kwadijk</p>
                <p className="text -highlighted">Deltares</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Jaap van Thiel de Vries</p>
                <p className="text -highlighted">Boskalis</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Luca Sittoni</p>
                <p className="text -highlighted">Ecoshape</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Madhuvi Kisoen</p>
                <p className="text -highlighted">Ministry of Public Works Surinam</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Marcel Stive</p>
                <p className="text -highlighted">Ministry of Public Works Surinam</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Marcel Stive</p>
                <p className="text -highlighted">Delft University of Technology</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Mary Bryant</p>
                <p className="text -highlighted">US Army Corps of Engineers</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Mathias Bertram</p>
                <p className="text -highlighted">Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ)</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Mathijs van Ledden</p>
                <p className="text -highlighted">GFDRR</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Melisa October</p>
                <p className="text -highlighted">Ministry of Agriculture, Guyana</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Mindert de Vries</p>
                <p className="text -highlighted">Deltares</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Minke van Rees</p>
                <p className="text -highlighted">Turing Foundation</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Monica Altamirano</p>
                <p className="text -highlighted">Deltares</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Natasja van den Berg</p>
                <p className="text -highlighted">Tertium</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Nicolas Desramaut</p>
                <p className="text -highlighted">The World Bank</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Nigel Pontee</p>
                <p className="text -highlighted">Halcrow Group Ltd</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Dionisio Perez Blanco</p>
                <p className="text -highlighted">Fondazione Eni Enrico Mattei (FEEM)</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Peter Goodwin</p>
                <p className="text -highlighted">University of Idaho</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Pieter van Eijk</p>
                <p className="text -highlighted">Wetlands International</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Quirijn Lodder</p>
                <p className="text -highlighted">Rijkswaterstaat</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Remment ter Hofstede</p>
                <p className="text -highlighted">Van Oord</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Robert McCall</p>
                <p className="text -highlighted">Deltares</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Salah Dahir</p>
                <p className="text -highlighted">United Nations Development Programme (UNDP)</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Saskia Marijnissen</p>
                <p className="text -highlighted">United Nations Development Programme (UNDP)</p>
              </div>
            </div>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Vincent Vuik</p>
                <p className="text -highlighted">Delft University of Technology</p>
              </div>
            </div>
          </Row>
          <Row>
            <div className="column small-12 medium-6 large-5 large-offset-1">
              <div className="text-group">
                <p className="text">Wouter Gotje</p>
                <p className="text -highlighted">Witteveen + Bos</p>
              </div>
            </div>
          </Row>
        </section>

        <section className="tab-section -intro wrapper">
          <Row>
            <div className="column small-12 large-10 large-offset-1">
              <h3 className="info-title -secondary">List of acronyms</h3>
            </div>
          </Row>

          {Acknowledgements.getAcronyms()}
        </section>

        <section className="tab-section -intro wrapper">
          <Row>
            <div className="column small-12 large-10 large-offset-1">
              <p className="text">©2017 The World Bank</p>
              <p className="text">The International Bank for Reconstruction and Development</p>
              <p className="text">The World Bank Group</p>
              <p className="text">1818 H Street, NW</p>
              <p className="text">Washington, D.C. 20433, USA</p>
              <p className="text">Internet: <a href="http://www.worldbank.org" target="_blank" rel="noreferrer noopener">www.worldbank.org</a></p>
            </div>
          </Row>

          <Row>
            <div className="column small-12 large-10 large-offset-1">
              <p className="text">This work, including this document and the nature-based solutions online platform, was co-financed by the Program on Forests (PROFOR), the Global Facility for Disaster Reduction and Recovery (GFDRR), and Deltares.</p>
              <p className="text">The online platform that provides up-to-date implementation guidance and a database of nature-based solutions projects can be accessed at: <a href="http://www.naturebasedsolutions.org" target="_blank" rel="noreferrer noopener">naturebasedsolutions.org</a>.</p>
            </div>
          </Row>

          <Row>
            <div className="column small-12 large-10 large-offset-1">
              <h3 className="info-title -secondary">Attribution</h3>
              <p className="text">World Bank. 2017. Implementing nature-based flood protection: Principles and implementation guidance. Washington, DC: World Bank.</p>
            </div>
          </Row>

          <Row>
            <div className="column small-12 large-10 large-offset-1">
              <h3 className="info-title -secondary">Disclaimer</h3>
              <p className="text">This document is the product of work performed by the World Bank and GFDRR with external contributions. The findings, interpretations and conclusions expressed in this document do not necessarily reflect the views of any individual partner organizations of the World Bank, GFDRR, the Executive Directors of the World Bank, or the governments they represent.</p>
              <p className="text">The World Bank does not guarantee the accuracy of the data included in this work. The boundaries, colors, denomination, and other information shown in any map in this work do not imply any judgment on the part of The World Bank concerning the legal status of any territory or the endorsement or acceptance of such boundaries.</p>
              <p className="text">The contents of this report are the result of (scientific) research and should be interpreted related to this (scientific) research only. Use of the information is at your own expense and risk.</p>
            </div>
          </Row>

          <Row>
            <div className="column small-12 large-10 large-offset-1">
              <h3 className="info-title -secondary">Rights and Permissions</h3>
              <p className="text">The material in this work is subject to copyright. Because The World Bank encourages dissemination of its knowledge, this work may be reproduced, in whole or in part, for noncommercial purposes as long as full attribution to this work is given.</p>
              <p className="text">Any queries on rights and licenses, including subsidiary rights, should be addressed to the Office of the Publisher, The World Bank, 1818 H Street NW, Washington, DC 20433, USA; fax: 202-522-2422; e-mail: <a href="mailto:pubrights@worldbank.org">pubrights@worldbank.org</a>.</p>
            </div>
          </Row>

          <Row>
            <div className="column small-12 large-10 large-offset-1">
              <h3 className="info-title -secondary">Photo credits</h3>
              <p className="text">Building with Nature Indonesia is a program by Ecoshape partners and the Indonesian Ministry of Marine Affairs and Fisheries.</p>
              <p className="text">(MMAF), and the Indonesian Ministry of Public Work and Human Settlement (PU), in partnership with Witteveen+Bos, Deltares, Wageningen, University & Research Centre, UNESCO-IHE, Blue Forests, and Von Lieberman, with support from the Diponegoro University, and local.</p>
              <p className="text">Communities; p2, p4, p9, p14 and p17</p>
              <p className="text">Wetlands International; P1 and p9</p>
              <p className="text">Adobestock; cover and p16</p>
              <p className="text">Stefan Verschure; p4</p>
              <p className="text">Thinckstock; p6,p18, p20, p26, p28,29 and 30</p>
              <p className="text">@Crown copyright and databaseright; p8</p>
              <p className="text">Guus Schooneville; p10</p>
              <p className="text">Roel Wijnants; p11</p>
              <p className="text">Van beek images.com; p12 and p22</p>
            </div>
          </Row>
        </section>
      </div>
    );
  }
}

Acknowledgements.propTypes = {};
Acknowledgements.defaultProps = {};
