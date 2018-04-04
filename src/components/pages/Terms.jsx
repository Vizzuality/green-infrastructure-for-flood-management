import React from 'react';
import { Link } from 'react-router';
import isEqual from 'lodash/isEqual';
import validator from 'validator';
// This import the validation rules, do not remove
import { validation } from 'utils/validation';
import { replace } from 'react-router-redux';
import Validation from 'react-validation';

import { Row } from 'components/ui/Grid';
import Spinner from 'components/ui/Spinner';
import Message from 'components/ui/Message';
import { Form, Input } from 'components/form/Form';

export default class AboutPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { error: null };

    this.form = {};

    // Bindings
    this.onContact = this.onContact.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    this.form[e.target.name] = e.target.value;
  }

  onContact(e) {
    e.preventDefault();
    if (this.form.email && validator.isEmail(this.form.email) &&
      this.form.name && this.form.name !== '' &&
      this.form.message && this.form.message !== '') {
      // Contact
      this.props.contact(this.form);
      this.setState({ error: null });
    } else if (!validator.isEmail(this.form.email)) {
      this.setState({ error: 'The email is not correct' });
    } else {
      this.setState({ error: 'Some required fields are missing' });
    }
  }

  setMessageText() {
    const { success } = this.props;
    let message = '';
    let type = '';

    if (this.state.error) {
      message = this.state.error;
      type = 'error';
    } else {
      message = success ? 'Your message has been sent successfully' : 'The message could not be sent. Try again';
      type = success ? 'success' : 'error';
    }
    return { message, type };
  }

  render() {
    const { success, error } = this.props;
    const message = this.setMessageText();

    return (
      <div className="c-about">

        <div className="c-submit">
          <section className="submit-section">
            <div className="l-app-wrapper">
              <Row>
                <div className="column small-12 medium-8 medium-offset-2">
                  <h1 className="h1 -line">Terms and conditions of using our site</h1>
                  <p className="text">The World Bank Group and its officers (referred to below as “The World Bank Group” or “we” or “us” or “our”) maintain this web site and/or any related site (such as a related mobile application) that links to these World Bank Group Terms and Conditions (the "Site") as part of efforts to provide broad public access to information. We encourage you to use the information and data provided by the World Bank Group and its partners for the Nature of Risk Reduction web site (the "Materials") as well as communications tools designed to facilitate this use. Your access to and use of the Site, the Materials, those communications tools, and any new tools made available by us that alter or improve your use of the Site or the Materials are subject to these World Bank Group Terms and Conditions, as well as any documents expressly incorporated by reference herein (collectively these “Terms and Conditions”).</p>
                  <p className="text">Please read these Terms and Conditions carefully before you start to use the Site. By using the Site, you accept and agree to be bound and abide by these Terms and Conditions and our <a href="/privacy-policy">Privacy Policy</a>. If you do not want to agree to these Terms and Conditions or the Privacy Policy, you must not access or use the Site.</p>
                  <p className="text">You may make non-commercial uses of the Materials, but you may not make any derivative work or commercial use, including without limitation reselling them, charging to access them, charging to redistribute them, or charging for derivative works based on them, without the prior written consent of the relevant member institution(s). The foregoing limited license rights are conditioned upon your providing proper attribution to The World Bank Group, and Deltares the individual author(s) of the work, if any, and any other third party content providers, consistent with the following format: “The World Bank Group authorizes the use of this material subject to the terms and conditions on its website, <a href="http://www.worldbank.org/en/about/legal">Legal</a>.”</p>
                  <p className="text">The World Bank Group is comprised of IBRD (International Bank for Reconstruction and Development), IDA (International Development Association), IFC (International Finance Corporation), MIGA (Multilateral Guarantee Agency), and ICSID (International Centre for Settlement of Investment Disputes). For purposes of these Terms of Use, “The World Bank Group” means any or all of its member institutions, as the context may require. The member institutions of the World Bank Group are separate legal entities and are severally (but not jointly) liable for their respective obligations hereunder. </p>
                  <p className="text">The GFDRR is a program funded by a trust fund managed by the World Bank. The World Bank is the legal entity responsible for these terms and conditions, and they constitute a binding agreement with the World Bank. Where these terms require it to be legally binding and enforceable, references to “GFDRR” shall be construed to references to the World Bank. GFDRR  maintains this website (the “Site”) as a courtesy to those who may choose to access the Site (“User”).</p>
                  <p className="text">All Materials on this Site from the various member institutions of The World Bank Group, and other content providers, appear subject to these Terms and Conditions, unless otherwise stated.</p>
                  <p className="text">Unless expressly stated otherwise, the findings, interpretations, and conclusions expressed in the Materials in this Site are those of the various authors of the Materials and are not necessarily those of The World Bank Group, its member institutions, their respective Boards of Executive Directors or member countries.</p>

                  <h2 className="h2">Table of contents:</h2>
                  <ul className="list">
                    <li><a href="#no-endorsement">No Endorsement</a></li>
                    <li><a href="#no-association">No Association</a></li>
                    <li><a href="#accessing-the-site">Accessing the Site; Usernames and Interactive Tools</a></li>
                    <li><a href="#intellectual-property-rights">Intellectual Property Rights</a></li>
                    <li><a href="#use-of-site">Use of the Site</a></li>
                    <li><a href="#application-program-interfaces">Application Program Interfaces</a></li>
                    <li><a href="#procedure-sending-complaints">Procedure for Sending Complaints Regarding Materials</a></li>
                    <li><a href="#procedure-sending-notices">Procedure for Sending Copyright Notices under the Digital Millennium Copyright Act</a></li>
                    <li><a href="#disclaimers-of-warranties">Disclaimers of Warranties</a></li>
                    <li><a href="#limitation-of-liability">Limitation of Liability</a></li>
                    <li><a href="#indemnification">Indemnification</a></li>
                    <li><a href="#governing-law">Governing Law</a></li>
                    <li><a href="#oreservation-of-immunities">Preservation of Immunities</a></li>
                    <li><a href="#miscellaneous">Miscellaneous</a></li>
                  </ul>

                  <h2 className="h2" id="no-endorsement">No Endorsement</h2>

                  <p className="text">You may not publicly represent or imply that The World Bank Group, or any of its member institutions, is participating in, or has sponsored, approved, or endorsed the manner or purpose of your use or reproduction of the Materials. The World Bank Group, any of its member institutions, shall be entitled to prosecute, to the fullest extent of the law, any use of the Materials in a manner that falsifies, misrepresents, disparages, or fraudulently uses the Materials.</p>

                  <h2 className="h2" id="no-association">No Association</h2>
                  <p className="text">The names World Bank Group, IBRD (International Bank for Reconstruction and Development), IDA (International Development Association), IFC (International Finance Corporation), MIGA (Multilateral Guarantee Agency), and ICSID (International Centre for Settlement of Investment Disputes), Global Facility for Disaster Reduction and Recovery GFDRR), and all related names, logos, product and service names, designs and slogans are trademarks of the relevant member institution(s). You may not use any such trademark, official mark, official emblem, or logo of The World Bank Group, its member institutions, or any of its other means of promotion or publicity, without the prior written consent of the relevant (member) institution(s), nor in any event to represent or imply an association or affiliation with The World Bank Group, any of its member institution(s), or All other names, logos, product and service names, designs and slogans on this Site are the trademarks of their respective owners.</p>

                  <h2 className="h2" id="accessing-the-site">Accessing the Site; Usernames and Interactive Tools</h2>
                  <p className="text">In order to submit a project to the Site, access certain portions and features of the Site, you must provide personal information. If you do so, you agree to provide accurate, current, and complete information about yourself as prompted by the Site's submission forms. You agree that all information you provide with this Site or otherwise, including but not limited to through the use of any interactive features on the Site, is governed by our Privacy Policy (which is hereby incorporated herein by reference), and you consent to all actions we take with respect to your information consistent with our Privacy Policy.</p>
                  <p className="text">The World Bank Group reserves the right, at its sole discretion for any reason or no reason at any time and from time to time and with or without notice to you, to modify or discontinue, temporarily or permanently, the Site (or any part thereof). Under no circumstances shall The World Bank Group be liable for any loss, damage, liability, or expense incurred or suffered which is claimed to result from your use of the Site or Materials made available on the Site, including without limitation, any fault, error, omission, interruption, or delay with respect thereto.</p>

                  <h2 className="h2" id="intellectual-property-rights">Intellectual Property Rights</h2>
                  <p className="text">The Site and its entire contents, features and functionality (including but not limited to all Posts, information, software, text, displays, images, video and audio, and the design, selection and arrangement thereof), are owned or licensed by The World Bank Group, its member institutions, service providers, licensors, users and are protected international copyright, trademark, patent, trade secret or other intellectual property or proprietary rights laws.</p>

                  <h2 className="h2" id="use-of-site">Use of the Site</h2>
                  <p className="text">You may use the Site only for lawful, personal and non-commercial purposes. The Site may contain tools that enable you to “Post” (i.e., upload, submit, post, make available, communicate, send, share, or transmit) Materials. You agree not to use the Site, to do any of the following:</p>
                  <ul className="list">
                    <li>Violate any applicable law or encourage or provide instructions to another to do so.</li>
                    <li>Defame, abuse, harass, stalk, threaten, or otherwise violate the legal rights (such as rights of privacy and publicity) of others.</li>
                    <li>Post any infringing, obscene, indecent, or unlawful material or information.</li>
                    <li>Misrepresent your identity, including by impersonating the World Bank Group or any member institution or staff thereof.</li>
                    <li>Collect or store personal information about anyone.</li>
                    <li>Transmit, or procure the sending of, any advertising or promotional material [without our prior written consent], including any "junk mail", "chain letter" or "spam" or any other similar solicitation.</li>
                    <li>Provide any investment advice or otherwise violate applicable securities laws, or undertake or promote other commercial activities or sales, such as contests, sweepstakes and other sales promotions, barter or advertising.</li>
                    <li>Upload or attach files that contain viruses, corrupted files, or any other similar software or programs that may damage the operation of another's computer.</li>
                    <li>Delete any author attributions, legal notices, or proprietary designations or labels in any file that is uploaded.</li>
                    <li>Falsify the origin or source of software or other material contained in a file that is uploaded.</li>
                    <li>Download any file posted by another User that you know, or reasonably should know, cannot be legally distributed in such manner.</li>
                    <li>Attempt to gain unauthorized access to, interfere with, damage or disrupt any parts of the Site, the server on which the Site is stored, or any server, computer or database connected to the Site.</li>
                    <li>Attack the Site via a denial-of-service attack or a distributed denial-of-service attack.</li>
                  </ul>
                  <p className="text">You further acknowledge that exchanges using the Submit form are public and not private communications. Therefore, any of your Submissions will be considered available for public use and distribution as provided herein.</p>
                  <p className="text">You represent and warrant that:</p>
                  <ul className="list">
                    <li>You own or control all rights in and to your Submission and have the right to grant the license granted above to us and our affiliates, business partners and service providers, and each of their and our respective licensees, successors and assigns.</li>
                    <li>All of your Submission do and will comply with these Terms and Conditions.</li>
                  </ul>
                  <p className="text">You understand and acknowledge that you are responsible for any of your Submission, that Submission by you and other users are not endorsed by The World Bank Group. The World Bank Group in its sole discretion to review, reject, or remove any and all Submission at any time for any or no reason whatsoever with or without notice to you.</p>
                  <p className="text">You hereby grant each and all of the member institutions of The World Bank Group a royalty-free, irrevocable, transferrable, sub licensable, and non-exclusive perpetual license throughout the universe for use in any and all media whether now known or hereafter devised to use and exploit (including without limitation by reproduction, distribution, public display, adaptation, and/or public performance) any and all Materials that you Submit.</p>

                  <h2 className="h2" id="application-program-interfaces">Application program interfaces</h2>
                  <p className="text">The World Bank Group Application Programming Interfaces (“APIs”) are tools that allow you to retrieve and use certain Materials found on the Site.</p>
                  <p className="text">For use of the APIs in connection with some of the Materials (such as Datasets listed in The World Bank [Group] Data Catalog), The World Bank Group has specific terms of use, all of which are hereby incorporated by reference. Those specific terms of use are available on the pages through which the relevant Materials are accessible. For use of the APIs in connection with other Materials, you may use the APIs to facilitate certain non-commercial uses of the Materials in accordance with these Terms and Conditions. However, you may not in any event use the APIs to facilitate commercial uses of the Materials, including without limitation reselling them, charging to access them, charging to redistribute them, or charging to create derivative works based on them.</p>
                  <p className="text">The World Bank Group may release updated versions of the APIs at its sole discretion. New versions may not be compatible with previous implementations, and you agree to use the most recently updated version.</p>
                  <p className="text">You agree not to modify, distribute, decompile, disassemble, or reverse engineer any portion of the APIs or any software of The World Bank Group.</p>
                  <p className="text">You may not use the APIs in a manner that exceeds reasonable request volume or constitutes excessive or abusive usage, as determined by The World Bank Group at its sole discretion.</p>
                  <p className="text">You may not use the APIs in a manner that is unlawful or that harms The World Bank Group, its service providers, its content providers, or any other person, as determined by The World Bank Group at its sole discretion.</p>
                  <p className="text">The World Bank Group may monitor your use of the APIs. You may not use any technical means to interfere with such monitoring, and we may use technical means to overcome any such interference.</p>
                  <p className="text">You agree not to facilitate access to Materials by using our APIs without entering into binding agreements with users of the Materials which limit use of the Materials in a manner that is consistent with these Terms and Conditions.</p>
                  <p className="text">Please contact The World Bank Group at <a href="mailto:data@worldbankgroup.org">data@worldbankgroup.org</a> with any questions regarding the APIs.</p>

                  <h2 className="h2" id="procedure-sending-complaints">Procedure for Sending Complaints Regarding Materials</h2>
                  <p className="text">If you believe that your rights, or the rights of a third party, are being violated in any way by any Materials on the Site, please contact us at:</p>
                  <p className="text">
                    Complaints:<br />
                    The World Bank Senior Vice President and Group General Counsel<br />
                    1818 H Street, N.W.<br />
                    Washington, D. C. 20433<br />
                    Tel: 202 458 1530<br />
                    Fax: 202 522 1589<br />
                    email: <a href="mailto:legalhelpdesk@worldbank.org">legalhelpdesk@worldbank.org</a>
                  </p>
                  <p className="text">We will work to prevent unlawful activity from taking place on or through the Site.</p>

                  <h2 className="h2" id="procedure-sending-notices">Procedure for Sending Copyright Notices under the Digital Millennium Copyright Act</h2>
                  <p className="text">If you have a good faith belief that your copyright is being infringed by any Materials on the Site and you want to provide The World Bank Group with a notification of claimed infringement under the Digital Millennium Copyright Act (DMCA), please send a Notice of Claimed Infringement, including the information listed below, to The World Bank Group’s Designated Copyright Agent:</p>
                  <p className="text">
                    Designated Copyright Agent:<br />
                    The World Bank Senior Vice President and Group General Counsel<br />
                    1818 H Street, N.W.<br />
                    Washington, D. C. 20433<br />>
                    Tel: 202 458 1530<br />
                    Fax: 202 522 1589<br />
                    email: <a href="mailto:legalhelpdesk@worldbank.org">legalhelpdesk@worldbank.org</a>
                  </p>
                  <p className="text">The World Bank Group has instituted a policy designed to enable, at The World Bank Group’s sole discretion, the expeditious removal of infringing material. Please make sure that any Notice of Claimed Infringement you send to The World Bank Group’s Designated Copyright Agent includes all of the following:</p>
                  <ul className="list">
                    <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                    <li>An identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works are covered by a single notification, a representative list of such works.</li>
                    <li>An identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material.</li>
                    <li>Information reasonably sufficient to permit us to contact you, such as an address, telephone number, and, if available, an electronic mail address at which you may be contacted.</li>
                    <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
                    <li>A statement that the information in the notification is accurate, and, under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                  </ul>

                  <h2 className="h2" id="disclaimers-of-warranties">Disclaimers of Warranties</h2>
                  <p className="text">YOU USE THE SITE AND MATERIALS AT YOUR SOLE RISK. THE WORLD BANK GROUP PROVIDE THE SITE AND MATERIALS "AS IS" AND "AS AVAILABLE". THE WORLD BANK GROUP EXPRESSLY DISCLAIMS TO THE FULL EXTENT PERMITTED BY LAW ALL WARRANTIES OF ANY KIND RELATED TO THE SITE AND MATERIALS WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF DATA THAT RESULTS FROM YOUR USE OF THE SITE OR MATERIALS. THE WORLD BANK GROUP MAKE NO WARRANTY THAT (1) THE SITE OR MATERIALS WILL MEET YOUR REQUIREMENTS; (2) THE SITE OR MATERIALS WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; (3) THE RESULTS OF THE SITE OR MATERIALS WILL BE ACCURATE OR RELIABLE; (4) THE QUALITY OF ANY PRODUCTS, SERVICES, OR MATERIAL OBTAINED BY YOU THROUGH THE SITE WILL MEET YOUR EXPECTATIONS; OR (5) THE SITE, ITS SERVERS, THE MATERIALS, OR COMMUNICATIONS SENT FROM THE WORLD BANK GROUP WILL BE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. NO INFORMATION OBTAINED BY YOU FROM THE WORLD BANK GROUP, OR THROUGH THE SITE SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THESE TERMS AND CONDITIONS.</p>
                  <p className="text">Other parties may have ownership interests in some of the Materials contained on the Site. The World Bank Group in no way represents or warrants that it owns or controls all rights in all Materials, and The World Bank Group will not be liable to you for any claims brought against you by third parties in connection with your use of any Materials.</p>
                  <p className="text">Nothing in the Site or any Materials shall be construed, implicitly or explicitly, as containing any investment recommendations. The World Bank Group is not registered under the U.S. Investment Advisers Act of 1940. Accordingly, nothing in the Site, or in such Materials, constitutes an offer of or an invitation by or on behalf of The World Bank Group to purchase or sell any shares or securities, nor should it be considered as investment advice.</p>
                  <p className="text">The Site may contain links to third-party web sites. The linked sites are not under the control of The World Bank Group, which is not responsible for the contents of any linked site or any link contained in a linked site. The World Bank Group does not endorse the linked sites.</p>

                  <h2 className="h2" id="limitiation-of-liability">Limitation of Liability</h2>
                  <p className="text">Under no circumstances, including, but not limited to, negligence, shall The World Bank Group, ANY ENTITY THAT IS A MEMBER OF THE WORLD BANK GROUP, or other content provider, be liable for any direct, indirect, incidental, special, EXEMPLARY, or consequential damages ARISING OUT OF OR RELATING TO THIS AGREEMENT (INCLUDING FOR CLAIMS ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SITE OR INABILITY TO ACCESS THE SITE), even if The World Bank Group has been advised of the possibility of such damages. THE FOREGOING DOES NOT AFFECT ANY LIABILITY WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.</p>
                  <p className="text">You specifically acknowledge and agree that none of The World Bank Group, any of its member institutions, are liable for any conduct of any User. You hereby release The World Bank Group, each of its member institutions, from claims, demands, and damages (actual and consequential) of every kind and nature, known and unknown, arising out of or in any way connected with the conduct of any User. You also waive California Civil Code §1542, which says: "A general release does not extend to claims which the creditor does not know or suspect to exist in his favor at the time of executing the release, which if known by him must have materially affected his settlement with the debtor." You also waive any and all benefits and rights that would otherwise accrue to you by reason of the provisions of any federal or state statute or principle of common law of any state of the United States, or any political entity or nation, province, or local law or regulation that may govern this release, which statute, regulation, law, or principle provides in substance something similar to California Civil Code § 1542.</p>
                  <p className="text">The Site may contain advice, opinions, and statements of various content providers. The World Bank Group do not represent or endorse the accuracy or reliability of any advice, opinion, statement, or other information provided by any content provider, or any User of this site, or other person or entity. Reliance upon any such opinion, advice, statement, or other information shall also be at your own risk. The World Bank Group shall not be liable to any you or anyone else for any inaccuracy, error, omission, interruption, timeliness, completeness, deletion, defect, failure of performance, computer virus, communication line failure, alteration of, or use of any Materials (including content therein), regardless of cause, for any damages resulting therefrom.</p>

                  <h2 className="h2" id="indemnification">Indemnification</h2>
                  <p className="text">As a condition of use of the Site, you agree to indemnify The World Bank Group, each of its member institution, from and against any and all actions, claims, losses, damages, liabilities, and expenses (including reasonable attorneys' fees) arising out of your use of the Site, including without limitation any claims alleging facts that if true would constitute a breach by you of these Terms and Conditions. You will cooperate as fully as reasonably required in the defense of any such claim. The World Bank Group, and reserve the right, at its own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, and you shall not in any event settle any matter without the written consent of The World Bank Group.</p>

                  <h2 className="h2" id="governing-law">Governing Law</h2>
                  <p className="text">Any dispute between The World Bank Group, or any of its member institutions, and you arising out of, or in connection with, the Site or your use of the Site which cannot be amicably settled between the parties to such dispute shall be arbitrated in accordance with the Commercial Arbitration Rules of the American Arbitration Association then in effect by one arbitrator appointed in accordance with those rules. The arbitration shall take place in the District of Columbia. Any resulting arbitration decision shall be final and binding on both parties. Judgment upon any arbitration award in favor of The World Bank Group may be entered in any court having jurisdiction thereof. The World Bank Group Terms and Conditions and the relationship between you and The World Bank Group shall be governed by the laws of the District of Columbia as an agreement wholly performed therein without regard to its conflict of law provisions.</p>

                  <h2 className="h2" id="preservation-od-immnunities">Preservation of Immunities</h2>
                  <p className="text">Nothing herein shall constitute or be considered to be a limitation upon or a waiver of the privileges and immunities of any of the member institutions of The Work Bank Group, which are specifically reserved.</p>

                  <h2 className="h2" id="miscellaneous">Miscellaneous</h2>
                  <p className="text">These Terms and Conditions may be amended by The World Bank Group from time to time at our sole discretion. Upon amendment, we will place a notice on our homepage. Please periodically review the controlling version of these Terms and Conditions. All changes are effective immediately when we post them. By continuing to use the Site subsequent to The World Bank Group making available an amended version of these Terms and Conditions, you thereby acknowledge, agree, and consent to such amendment.</p>
                  <p className="text">The failure of The World Bank Group, any of its member institutions to exercise or enforce any right or provision of these Terms and Conditions shall not constitute a waiver of such right or provision. No waiver by The World Bank Group or any of its member institutions of any provision of this Agreement shall be binding except as set forth in writing and signed by its duly authorized representative.</p>
                  <p className="text">These Terms and Conditions are fully assignable by The World Bank Group and will be binding upon and inure to the benefit of our successors and assigns.</p>
                  <p className="text">No agency, partnership, joint venture, employee-employer, or franchiser-franchisee relationship is intended or created by these Terms and Conditions. You agree to not make any public statements that assert or imply any relationship with The World Bank Group, unless you have The World Bank Group prior written approval.</p>
                  <p className="text">If any provision of these Terms and Conditions is found by a court of competent jurisdiction to be invalid, the court should nevertheless endeavor to give effect to the parties' intentions as reflected in the provision, and the other provisions of these Terms and Conditions remain in full force and effect.</p>
                  <p className="text">The World Bank Group reserve all rights not expressly granted under these Terms and Conditions, and no other rights are granted by implication or estoppel or otherwise.</p>
                  <p className="text">The headings in these Terms and Conditions are for convenience only and have no legal or contractual effect.</p>

                  <p className="text">Last Updated: October 2017</p>
                </div>
              </Row>
            </div>
          </section>
        </div>

        {/* Submit */}
        <section className="home-section -submit">
          <div className="l-app-wrapper">
            <Row>
              <div className="column small-12 medium-8">
                <h1 className="h1 -secondary -line">Submit your project</h1>
              </div>
            </Row>
            <Row>
              <div className="column small-12 medium-6">
                <p className="text -secondary">Contribute your nature-based project and experiences to Natural Hazards – Nature-based Solutions database, and join a growing community of practitioners, scientists and donors who are using nature-based approaches to reduce disaster risk.</p>
                <Link to="/submit" className="c-btn -primary">Submit a project</Link>
              </div>
            </Row>
          </div>
        </section>

        {/* Contact */}
        <section className="home-section contact">
          <div className="l-app-wrapper">
            <Spinner isLoading={this.props.loading} />
            <Row className="intro">
              <div className="column small-12 medium-6 medium-offset-3">
                <h1 className="h1 -line -center">Contact us</h1>
                <p className="intro-text">We welcome your feedback and value your input as we work to continually improve and update Natural Hazards – Nature-based Solutions database. Please do not hesitate to send us your comments and questions here.</p>
              </div>
            </Row>
            {(this.state.error || success || error) &&
              <Row className="intro">
                <div className="c-form column small-12 medium-8 medium-offset-2">
                  <Message message={message.message} type={message.type} />
                </div>
              </Row>
            }
            <Row>
              <div className="c-form column small-12 medium-8 medium-offset-2">
                <Form>
                  <div className="form">
                    <div className="form-field">
                      <div className="filter-field">
                        <h2 className="label">Name*</h2>
                        <Input
                          type="text"
                          name="name"
                          value=""
                          onChange={this.onInputChange}
                          validations={[]}
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <div className="filter-field">
                        <h2 className="label">E-mail*</h2>
                        <Input
                          type="text"
                          name="email"
                          value=""
                          onChange={this.onInputChange}
                          validations={['email']}
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <div className="filter-field">
                        <h2 className="label">Message*</h2>
                        <Input
                          type="text"
                          name="message"
                          value=""
                          onChange={this.onInputChange}
                          validations={[]}
                        />

                        {/* Hidden */}
                        <Input
                          type="text"
                          name="subject"
                          value=""
                          className="-hidden"
                          onChange={this.onInputChange}
                          validations={[]}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="actions">
                    <button
                      className="c-btn -filled -primary action"
                      onClick={this.onContact}
                    >
                      Send
                    </button>
                  </div>
                </Form>
              </div>
            </Row>
          </div>
        </section>
      </div>
    );
  }
}

AboutPage.propTypes = {
  success: React.PropTypes.bool,
  error: React.PropTypes.object,
  loading: React.PropTypes.bool,
  // Fucntions
  contact: React.PropTypes.func
};
AboutPage.defaultProps = {};
