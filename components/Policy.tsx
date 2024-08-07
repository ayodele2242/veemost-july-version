"use client"
import React from 'react'

import Container from './Container'
import Header from './Header'
import Footer from './Footer'
import Link from 'next/link'

const Policy = () => {
  return (
    <main className="w-full overflow-hidden">
      <Header />
      <div className="mt-10 relative text-white overflow-hidden" 
    style={{ 
      backgroundImage: "url('/services-banner.png')",
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100%'
      }}>
      <div className="absolute inset-0 bg-grey bg-grayTransparent" />
      <Container className="flex flex-col items-center gap-4 justify-center text-center relative z-10 overflow-hidden">
        
      <div className="md:m-[4rem] m-[1rem] md:pt-0 pt-[4rem] xl:m-0">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
            <div className="flex flex-col">
                <div className="">
                    <h2 className="text-[#0B0B0C] font-GilroySemiBold font-extrabold 
                    text-[32px] lg:text-[36px] xl:text-[42px] 2xl:text-[48px] text-center leading-normal">
                       VeeMost Technologies Inc. Privacy <br className="hidden lg:block" />Statement and Notice at Collection
                    </h2>
                </div>
                
            </div>
                     
            </div>
      </div>
        
    </Container>
    
    </div>
        <Container>
        <style
    dangerouslySetInnerHTML={{
      __html:
        "\n\t\t\tbody { line-height:108%; font-family:Aptos; font-size:11pt }\n\t\t\th1, h2, h3, h4, h5, h6, p { margin:0pt 0pt 8pt }\n\t\t\tli { margin-top:0pt; margin-bottom:8pt }\n\t\t\th1 { margin-top:18pt; margin-bottom:4pt; page-break-inside:avoid; page-break-after:avoid; line-height:108%; font-family:'Aptos Display'; font-size:20pt; font-weight:normal; color:#0f4761 }\n\t\t\th2 { margin-top:8pt; margin-bottom:4pt; page-break-inside:avoid; page-break-after:avoid; line-height:108%; font-family:'Aptos Display'; font-size:16pt; font-weight:normal; color:#0f4761 }\n\t\t\th3 { margin-top:8pt; margin-bottom:4pt; page-break-inside:avoid; page-break-after:avoid; line-height:108%; font-family:Aptos; font-size:14pt; font-weight:normal; color:#0f4761 }\n\t\t\th4 { margin-top:4pt; margin-bottom:2pt; page-break-inside:avoid; page-break-after:avoid; line-height:108%; font-family:Aptos; font-size:11pt; font-weight:normal; font-style:italic; color:#0f4761 }\n\t\t\th5 { margin-top:4pt; margin-bottom:2pt; page-break-inside:avoid; page-break-after:avoid; line-height:108%; font-family:Aptos; font-size:11pt; font-weight:normal; color:#0f4761 }\n\t\t\th6 { margin-top:2pt; margin-bottom:0pt; page-break-inside:avoid; page-break-after:avoid; line-height:108%; font-family:Aptos; font-size:11pt; font-weight:normal; font-style:italic; color:#595959 }\n\t\t\t.Heading7 { margin-top:2pt; margin-bottom:0pt; page-break-inside:avoid; page-break-after:avoid; line-height:108%; font-family:Aptos; font-size:11pt; font-weight:normal; font-style:normal; color:#595959 }\n\t\t\t.Heading8 { margin-bottom:0pt; page-break-inside:avoid; page-break-after:avoid; line-height:108%; font-family:Aptos; font-size:11pt; font-weight:normal; font-style:italic; color:#272727 }\n\t\t\t.Heading9 { margin-bottom:0pt; page-break-inside:avoid; page-break-after:avoid; line-height:108%; font-family:Aptos; font-size:11pt; font-weight:normal; font-style:normal; color:#272727 }\n\t\t\t.Footer { margin-bottom:0pt; line-height:normal; font-size:11pt }\n\t\t\t.Header { margin-bottom:0pt; line-height:normal; font-size:11pt }\n\t\t\t.IntenseQuote { margin:18pt 43.2pt; text-align:center; line-height:108%; border-top:0.75pt solid #0f4761; border-bottom:0.75pt solid #0f4761; padding-top:10pt; padding-bottom:10pt; font-size:11pt; font-style:italic; color:#0f4761 }\n\t\t\t.ListParagraph { margin-left:36pt; margin-bottom:8pt; line-height:108%; font-size:11pt }\n\t\t\t.Quote { margin-top:8pt; margin-bottom:8pt; text-align:center; line-height:108%; font-size:11pt; font-style:italic; color:#404040 }\n\t\t\t.Subtitle { margin-bottom:8pt; line-height:108%; font-size:14pt; letter-spacing:0.75pt; color:#595959 }\n\t\t\t.Title { margin-bottom:4pt; line-height:normal; font-family:'Aptos Display'; font-size:28pt; letter-spacing:-0.5pt }\n\t\t\t.selectable-text { margin-top:5pt; margin-bottom:5pt; line-height:normal; font-family:'Times New Roman'; font-size:12pt }\n\t\t\tspan.Heading1Char { font-family:'Aptos Display'; font-size:20pt; color:#0f4761 }\n\t\t\tspan.Heading2Char { font-family:'Aptos Display'; font-size:16pt; color:#0f4761 }\n\t\t\tspan.Heading3Char { font-size:14pt; color:#0f4761 }\n\t\t\tspan.Heading4Char { font-style:italic; color:#0f4761 }\n\t\t\tspan.Heading5Char { color:#0f4761 }\n\t\t\tspan.Heading6Char { font-style:italic; color:#595959 }\n\t\t\tspan.Heading7Char { color:#595959 }\n\t\t\tspan.Heading8Char { font-style:italic; color:#272727 }\n\t\t\tspan.Heading9Char { color:#272727 }\n\t\t\tspan.Hyperlink { text-decoration:underline; color:#467886 }\n\t\t\tspan.IntenseEmphasis { font-style:italic; color:#0f4761 }\n\t\t\tspan.IntenseQuoteChar { font-style:italic; color:#0f4761 }\n\t\t\tspan.IntenseReference { font-weight:bold; font-variant:small-caps; letter-spacing:0.25pt; color:#0f4761 }\n\t\t\tspan.QuoteChar { font-style:italic; color:#404040 }\n\t\t\tspan.SubtitleChar { font-size:14pt; letter-spacing:0.75pt; color:#595959 }\n\t\t\tspan.TitleChar { font-family:'Aptos Display'; font-size:28pt; letter-spacing:-0.5pt }\n\t\t\tspan.UnresolvedMention { color:#605e5c; background-color:#e1dfdd }\n@media (max-width: 900px) { \nimg { \n   max-width: 100%;\n   height: auto;\n}\n\n.table-container {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n}\n\ntable {\n    width: 100%;\n    border-collapse: collapse;\n}\n\ntd, th {\n    padding: 8px;\n    text-align: left;\n    border: 1px solid #ddd;\n}\n}\t\n\n\n\t\t"
    }}
  />

<div>
   

   <p>
     <strong>&nbsp;</strong>
   </p>
   <p
     style={{
       marginBottom: "0pt",
       textAlign: "center",
       lineHeight: "108%",
       fontSize: "26pt"
     }}
   >
    
   </p>
   <p>&nbsp;&nbsp;</p>
   <p>
     <strong>V1.1</strong>
   </p>
   <p>
     <strong>Last updated July 26, 2024</strong>
   </p>
   <p>
     <strong>&nbsp;</strong>
   </p>
   <p>
     <strong>Purpose and Scope</strong>
   </p>
   <p>
     <strong>VeeMost Technologies Inc.,</strong> which has its headquarters in
     the US but subsidiaries all over the world (a list of which is provided
     upon request), is a distributor and reseller of IT products and services
     to other organizations and legal entities. In order to provide cloud
     aggregation, cybersecurity solutions, data center management, logistics,
     technology distribution, mobility device life cycle, and training for our
     enterprise customers, VeeMost Technologies Inc. provides global technology
     and supply chain services. See the "Services" and "About Us" sections of
     our website for additional details about VeeMost Technologies Inc.
   </p>
   <p>
     Enterprise clients of VeeMost Technologies Inc. have the option to buy or
     utilize a range of goods and services that are made available by VeeMost
     Technologies Inc. and different outside vendors (collectively,
     "Offerings"), both directly from VeeMost Technologies Inc. and via
     distributors and resellers. The terms of this privacy statement may be
     superseded or supplemented by offering-specific privacy policies, WHICH
     MAY APPLY TO EVERY OFFERING. Before accessing or using any offering,
     VEEMOST TECHNOLOGIES INC. strongly advises you to carefully read the
     privacy policy of that offering.
   </p>
   <p>
     This Protection Articulation portrays how we collect, utilize, store, and
     share your Individual Information, both offline and online, and your
     rights and choices in association your Individual Information. On the off
     chance that you're a representative, temporary worker, or work candidate,
     your Individual Information collected in those settings will be subject to
     an isolated privacy notice that we offer to you where and when suitable.
     This Security Explanation does not apply to any Individual Information we
     get to or get when acting as an information processor on sake of our
     undertaking clients.
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         Although we empower you to read this whole Security Explanation, this
         is often a rundown of a few of the more imperative perspectives of the
         Protection Articulation:
       </span>
     </li>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         Every advertisement may include a specific protection scheme related
         to its claim. Any time you have lately accessed or used an
         advertisement, you should carefully read its security policy. We may
         get information about you from a number of sources, including{" "}
       </span>
     </li>
   </ul>
   <p style={{ marginLeft: "36pt" }}>&nbsp;</p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         Personal Data that we have directly obtained from you and your
         devices, whether they are used online or offline. Additionally, we
         might mix it with data we get about you from other sources, like
         subsidiaries, publicly accessible information sources (like your
         publicly accessible social media accounts), and other outside parties.
         We will not use or share your Personal Data except as described in
         this Privacy Statement.
       </span>
     </li>
   </ul>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     •{" "}
     <span style={{ fontSize: "11pt" }}>
       Our ability to do business with you, including the purchase of Offerings
       and the processing of your transactions, may be hampered if you do not
       give us correct and current Personal Data.{" "}
     </span>
     <br />
     <span style={{ fontSize: "11pt" }}>
       • Insofar as it relates to specific uses of your Personal Data under
       this Privacy Statement, we respect your requests to opt out, including
       requests to have your Personal Data deleted or to stop receiving
       marketing emails from us.{" "}
     </span>
   </p>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal" }}
   >
     &nbsp;
   </p>
   <p>
     <strong>1. General Principles for the Processing of Personal Data</strong>
   </p>
   <p>
     Individual Information will be collected, put away, prepared and
     transmitted in agreement with VeeMost Innovations Inc’s built up
     arrangements and appropriate government, state, nearby and worldwide laws,
     rules and controls.
   </p>
   <p>
     The standards of VeeMost Innovations Inc. with regard to the preparing of
     Individual Information are as takes after: (1) Individual Information will
     be handled reasonably and legally, (2) Individual Information will be
     collected for indicated, unequivocal, and true blue purposes and not
     advance prepared for contradictory purposes, (3) Individual Information
     collected by VeeMost Advances Inc. will be satisfactory, important, and
     not intemperate in connection to the purposes for which it is collected,
     (4) Individual Information collected by VeeMost Advances Inc. will be
     exact and, where essential, kept up to date to the leading of our
     capacity, (5) Individual Information will be secured against unauthorized
     get to and handling utilizing fitting specialized and organizational
     security measures and controls; and (6) Individual Information collected
     by VeeMost Innovations Inc. will be held as identifiable information for
     now not than vital to serve the purposes for which the Personal
     Information was collected.
   </p>
   <p>
     In the event that VeeMost Advances Inc. locks in within the handling of
     Individual Information for purposes other than those indicated in this
     Security Articulation, VeeMost Advances Inc. will give a take note of
     these changes, the purposes for which the Individual Information will be
     utilized, and the beneficiaries of Individual Information.
   </p>
   <p>
     <strong>2. Collection of Personal Data</strong>
   </p>
   <p style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}>
     A number of sources, including you directly, other users, resellers and
     distributors, vendors, service providers, third-party information
     providers, customers, subsidiaries, and the website itself, may be used by
     VeeMost Technologies Inc. to obtain Personal Data about you. <br />
     Depending on the details of your interactions with us, the following types
     of "Personal Data" may be gathered by VeeMost Technologies Inc. or on its
     behalf:
   </p>
   <p style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}>
     &nbsp;
   </p>
   <p style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}>
     <br />• Identity Data: which includes title, firm name, government-issued
     identity number, first and last name, username, and other similar
     identifiers.
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>
         Contact Data: which includes phone numbers, email addresses, shipping
         addresses, and billing addresses.{" "}
       </span>
     </li>
   </ul>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     &nbsp;
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>
         Financial Data: including credit history, bank account information,
         and payment card details.{" "}
       </span>
     </li>
   </ul>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     &nbsp;
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>
         Transaction Data: which includes information about payments to and
         from you as well as additional specifics about the goods and services
         you have bought from us.{" "}
       </span>
     </li>
   </ul>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     <br />• Technical Information: This includes your IP address, login
     information, browser type and version, time zone location and setting,
     browser plug-in types and versions, operating system, platform, and other
     technological information from the devices you use to visit our websites.
   </p>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     <br />• Profile Data: your account number, purchases or orders placed by
     you, your hobbies and preferences, feedback, and survey answers, as well
     as your username and password to access the website.
   </p>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     &nbsp;
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "12pt" }}
       >
         Usage Data: includes details about how you use our website, products,
         and services. It also includes information about the text you enter in
         online chat rooms and form fields, as well as the keystrokes and mouse
         clicks you make.{" "}
       </span>
     </li>
   </ul>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "108%", fontSize: "12pt" }}
   >
     <br />• Preference Data: such as your communication preferences and your
     inclinations regarding marketing communications from us and our third
     parties.
   </p>
   <p
     className="ListParagraph"
     style={{ lineHeight: "108%", fontSize: "12pt" }}
   >
     <br />• Professional Data:&nbsp; which includes, if you communicate with
     us on behalf of a business client or vendor, your company affiliation, job
     title, office location, and professional contact details.
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         Sensitive Personal Data: such as government issued identification
         number, username, and password to access an VeeMost Technologies Inc.
         account, bank account information, payment card details. This
         information may be subject to additional protections and privacy
         rights, as described below.
       </span>
     </li>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         Other information that we collect with your consent from time to time.
       </span>
     </li>
   </ul>
   <p>&nbsp;</p>
   <p>&nbsp;</p>
   <p>&nbsp;</p>
   <p>
     VeeMost Technologies Inc. collects Personal Data as follows and from the
     following categories of sources:
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         Information provided voluntarily. We may gather Personal Data from you
         directly if you freely offer it to us. For example, when you contact
         us by phone or through the Website via email, online chat, web form,
         or online account registration to obtain access to Offerings, register{" "}
       </span>
     </li>
   </ul>
   <p>&nbsp;</p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         for an event or training, visit us at an event or trade show, sign up
         for marketing, promotional, or informational emails or communications,
         purchase an Offering, ask questions, attempt to resolve any issues
         with the Website or Offerings, or submit feedback and comments.
       </span>
       <br />
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         The Personal Data that you are asked to supply, as well as the reasons
         for doing so, will be made plain to you when we ask for it.
       </span>
     </li>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         We collect information automatically. When you visit our website or
         engage with any of our online ads, content, or emails, we
         automatically collect certain information from your device.
       </span>
     </li>
   </ul>
   <p style={{ marginLeft: "36pt" }}>
     <br />
     We automatically collect information such as your IP address, device type,
     unique device identification numbers, browser type, Media Access Control
     (MAC) Address, broad geographic location (e.g., country or city-level
     location), and other technical information. We may also collect
     information on how your Device interacted with our Website, such as the
     pages you visited and the links you clicked, if you clicked on our adverts
     or other digital content, and whether you opened and clicked on our
     emails.
   </p>
   <p style={{ marginLeft: "36pt" }}>
     Collecting this information allows us to better identify who visits our
     website, where they come from, and what material on our website, adverts,
     and emails interests them. We use this data for internal analytics and to
     improve the quality and relevance of our website, digital content, and
     communications to our visitors.
   </p>
   <p style={{ marginLeft: "36pt" }}>
     Some of this information may be acquired via cookies and other tracking
     technology, as detailed more under the title "Cookies and Other Website
     Usage Information" below.
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "28.06pt",
         paddingLeft: "7.94pt",
         fontFamily: "serif"
       }}
     >
       <span style={{ fontFamily: "Aptos" }}>
         We, or our vendors operating on our behalf, also gather information
         via "session replay technology," which automatically collects your
         keystrokes, mouse movements, text entered forms, and text entered chat
         boxes on our website, for example.
       </span>
     </li>
   </ul>
   <p style={{ marginLeft: "36pt" }}>
     • From other users. We may obtain Personal Data about you from other
     Website users who give us with information. For example, we may obtain
     information when they communicate with you or with us over the Website.
   </p>
   <p style={{ marginLeft: "36pt" }}>&nbsp;</p>
   <p style={{ marginLeft: "36pt" }}>&nbsp;</p>
   <p style={{ marginLeft: "36pt" }}>
     • From resellers and distributors. We may collect Personal Data about you
     from resellers and distributors who purchase Offerings from us and
     distribute them to you.
   </p>
   <p style={{ marginLeft: "36pt", lineHeight: "108%", fontSize: "12pt" }}>
     <br />
     •From our vendors. We may collect Personal Data about you from third-party
     suppliers that make Offerings available through us.
   </p>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     <br />• From our service providers. We may collect Personal Data about you
     from service providers who assist us with our business operations. For
     example, service providers who
   </p>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     &nbsp;
   </p>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     host or manage our website or send promotional emails on our behalf may
     provide us with personal information. Payment processors may acquire your
     payment information. Our marketing agencies, advertising technology
     vendors, analytics providers, and other service partners may also give us
     with personal information about you.
   </p>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     &nbsp;
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>
         From customers. We may collect Personal Data about you from
         third-party clients who contract with us for services. For example, we
         may provide fulfillment services on behalf of other organizations,
         which include picking, packing, and shipping a physical goods to you.
         In this case, we will get your name, mailing address, and order
         information and will only use your Personal Data to provide services
         on behalf of the customer.{" "}
       </span>
       <br />
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>&nbsp;</span>
     </li>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span style={{ fontFamily: "Aptos", fontSize: "11pt" }}>
         Data sourced from providers. VeeMost Technologies Inc. may also
         collect or license Personal Data from third parties who hold
         information about you and have the right to transfer it to us. For
         example, if you register for the Website using a third-party service
         or through a third-party website or service, we will receive the
         information you supply to that third party to create your account on
         the Website. We may also enter contracts with organizations that
         provide information to businesses like ours in order to verify or
         gather information.
       </span>
       <u>
         <span style={{ fontFamily: "Aptos", fontSize: "11pt" }}> </span>
       </u>
       <br />
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>&nbsp;</span>
     </li>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>
         Based on publicly available sources. We may also collect Personal Data
         from publicly available sources, such as open government databases or
         other public domain data.{" "}
       </span>
     </li>
   </ul>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     &nbsp;
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "28.52pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "7.48pt",
         fontFamily: "serif",
         fontSize: "12pt"
       }}
     >
       <span style={{ fontFamily: "Aptos" }}>
         From affiliates and subsidiaries. We may collect personal information
         from our affiliates and subsidiaries.{" "}
       </span>
     </li>
   </ul>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     &nbsp;
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "28.52pt",
         marginBottom: "12pt",
         lineHeight: "normal",
         paddingLeft: "7.48pt",
         fontFamily: "serif",
         fontSize: "12pt"
       }}
     >
       <span style={{ fontFamily: "Aptos" }}>
         We improve our products and advertising by using Microsoft Clarity to
         see how you use our website.{" "}
       </span>
     </li>
   </ul>
   <p style={{ marginBottom: "12pt", lineHeight: "normal", fontSize: "12pt" }}>
     &nbsp;
   </p>
   <p>
     <strong>3. Cookies and Other Website Usage Information</strong>
   </p>
   <p>
     The Website, our digital content, and our communications may automatically
     monitor and collect information about your access, use, and interaction
     with them using "cookies," "web beacons," and other automated monitoring
     technology.
   </p>
   <p>
     A "cookie" is a short text file saved on the user's device. Cookies enable
     us to gather information such as your browser type, time spent on the
     Website, pages visited, and language preferences. We and our service
     partners use the information to improve security, make navigation easier,
     display information more effectively, and personalize your experience on
     the Website.
   </p>
   <p>
     Generally, the cookies that are used on the Website can be broken down
     into the following categories:
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "28.52pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "7.48pt",
         fontFamily: "serif",
         fontSize: "12pt"
       }}
     >
       <span style={{ fontFamily: "Aptos" }}>
         Cookies that are strictly necessary. These are the cookies that our
         website needs in order to function. They consist of, for instance,
         cookies that let you utilize a shopping cart or log into secure
         sections of our website.{" "}
       </span>
     </li>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "28.52pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "7.48pt",
         fontFamily: "serif",
         fontSize: "12pt"
       }}
     >
       <br />
       <span style={{ fontFamily: "Aptos" }}>
         Cookies for performance and analytics. These cookies let us track and
         assess how the website is used, which enables us to make improvements
         to your online experience.{" "}
       </span>
     </li>
   </ul>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     &nbsp;
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "28.52pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "7.48pt",
         fontFamily: "serif",
         fontSize: "12pt"
       }}
     >
       <span style={{ fontFamily: "Aptos" }}>
         These cookies enable us to detect when technical problems with the
         website occur and to customize the content of the website to reflect
         what users find most interesting. Additionally, we might utilize this
         information to create reports that will assist us in analyzing how the
         website is used, what the most frequent problems are, and how we can
         make improvements.{" "}
       </span>
     </li>
   </ul>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     &nbsp;
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       className="selectable-text"
       style={{
         marginTop: "14pt",
         marginLeft: "28.52pt",
         marginBottom: "14pt",
         paddingLeft: "7.48pt",
         fontFamily: "serif"
       }}
     >
       <span className="selectable-text1" style={{ fontFamily: "Aptos" }}>
         Cookies that track and function. We are able to identify returning
         users of our websites thanks to these cookies. A tracking cookie
         records a user's origin, the search engine they may have used, the
         link they clicked, the term they entered, and their location when they
         viewed the website by comparing it to an anonymous, randomly generated
         identifier. Through the tracking of this data, we can enhance our
         website.
       </span>
     </li>
   </ul>
   <p
     className="selectable-text"
     style={{ marginTop: "14pt", marginBottom: "14pt" }}
   >
     <span className="selectable-text1" style={{ fontFamily: "Aptos" }}>
       &nbsp;
     </span>
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       className="selectable-text"
       style={{
         marginTop: "14pt",
         marginLeft: "28.52pt",
         marginBottom: "14pt",
         paddingLeft: "7.48pt",
         fontFamily: "serif"
       }}
     >
       <span className="selectable-text1" style={{ fontFamily: "Aptos" }}>
         Aiming for cookies. These cookies keep track of your visits to our
         website, including the pages you view and the links you click. We will
         use this data to better target our advertisements on our website and
         our website itself to your interests. For this reason, we might also
         give this information to other parties.
       </span>
     </li>
   </ul>
   <p className="ListParagraph">&nbsp;</p>
   <p>
     <u>
       The above cookies can be either session cookies or persistent cookies:
     </u>
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         Cookies used during sessions. These cookies are used "in-session" each
         time you visit and then expire soon after; they don't include any
         Personal Data, are not saved on your device indefinitely, and reduce
         the amount of Personal Data that needs to be transferred over the
         internet. You have the option to remove these cookies or to reject
         their use, but doing so will negatively impact the functionality and
         user experience of the website. In addition, these cookies capture
         time stamps indicating your website visits and exits.
       </span>
     </li>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         Cookie persistence. This kind of cookie is not removed when the
         browser is closed and is stored on your device for a predetermined
         amount of time—often a few hours, sometimes a year or longer. In
         situations when we need to retain your identity across many browsing
         sessions, persistent cookies are employed. This kind of cookie, for
         instance, might be used to save your preferred language so that it
         will be remembered when you visit the website again.
       </span>
     </li>
   </ul>
   <p>
     Please go to the "Your Privacy Rights" section below to find out how to
     modify your cookie settings.
     <br />
     <br />A “web beacon” (also known as a clear pixel or pixel tag) includes
     an electronic image embedded in the Website interface that allows us to
     recognize when you visit that area of the Website. These may also be used
     in connection with some Website pages and HTML-formatted email messages
     to, among other things, track the actions of Website users and e-mail
     recipients, measure the success of our marketing campaigns, and compile
     statistics about Website usage and email response rates.
   </p>
   <p>&nbsp;</p>
   <p>
     Additionally, when you voluntarily click on one or more third-party
     "widgets" on our website (typically indicated by a third-party platform
     logo in the top or bottom corner of the website), you can choose to
     consciously interact with one or more third parties. When you click on and
     activate a company's widget, that company will automatically gather data
     about your activities on the website.
   </p>
   <p>
     <strong>4. Use of Personal Data</strong>
   </p>
   <p>
     In order to run our company and give you Offerings, VeeMost Technologies
     Inc. uses the Personal Data we gather. This includes using the data to
     enhance our Offerings and customize your experiences. Additionally, we
     might use the information to get in touch with you and tell you about
     things like account and product details.
   </p>
   <p>
     VeeMost Technologies Inc. may use your Personal Data, including Sensitive
     Personal Data, for a number of purposes (the "Purposes"), depending on the
     nature of your interactions with us. These purposes may include:
   </p>
   <p>&nbsp;</p>
   <p>&nbsp;</p>
   <p>&nbsp;</p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       className="selectable-text"
       style={{
         marginTop: "14pt",
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         className="selectable-text1"
         style={{ fontFamily: "Aptos", fontSize: "12pt" }}
       >
         Register you as a new customer;{" "}
       </span>
     </li>
     <li
       className="selectable-text"
       style={{
         marginTop: "0pt",
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         className="selectable-text1"
         style={{ fontFamily: "Aptos", fontSize: "12pt" }}
       >
         Provide, maintain, and improve the Website and our Offerings,
         including operating certain features and functionality of the Website;{" "}
       </span>
     </li>
     <li
       className="selectable-text"
       style={{
         marginTop: "0pt",
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         className="selectable-text1"
         style={{ fontFamily: "Aptos", fontSize: "12pt" }}
       >
         &nbsp;
       </span>
       <span
         className="selectable-text1"
         style={{ fontFamily: "Aptos", fontSize: "12pt" }}
       >
         Recognize user preferences to improve user experience;
       </span>
     </li>
     <li
       className="selectable-text"
       style={{
         marginTop: "0pt",
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         className="selectable-text1"
         style={{ fontFamily: "Aptos", fontSize: "12pt" }}
       >
         Research and analyze the efficacy of the Website and the marketing,
         advertising, and sales efforts of VeeMost Technologies Inc., its
         subsidiaries, contractors, and business partners, including with the
         use of automated systems that analyze data using machine learning and
         other analytic techniques;{" "}
       </span>
     </li>
     <li
       className="selectable-text"
       style={{
         marginTop: "0pt",
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         className="selectable-text1"
         style={{ fontFamily: "Aptos", fontSize: "12pt" }}
       >
         Gather account receivables owed by VeeMost Technologies Inc.
       </span>
     </li>
     <li
       className="selectable-text"
       style={{
         marginTop: "0pt",
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>
         Handle payments, delivery, and orders sent via the website;
       </span>
     </li>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>&nbsp;</span>
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>
         Create new offerings;
       </span>
     </li>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>&nbsp;</span>
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>
         Adhere to legal requirements or legitimate requests from public
         authorities (such as those pertaining to national security or law
         enforcement);{" "}
       </span>
     </li>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>&nbsp;</span>
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>
         Oversee our day-to-day operations;
       </span>
     </li>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>&nbsp;</span>
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>
         Ensure adherence to our Terms of Use and relevant legislation;{" "}
       </span>
     </li>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>&nbsp;</span>
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>
         Bring a case in court, in arbitration, or in a comparable legal
         setting and/or defend it.{" "}
       </span>
     </li>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>
         For security and safety reasons, including safeguarding the Website
         and our business from online threats, defending our legal rights and
         our customers' legal rights, and identifying, looking into, and
         stopping fraud or other illicit activity;{" "}
       </span>
     </li>
   </ul>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     &nbsp;
   </p>
   <p style={{ marginLeft: "36pt" }}>
     • Have direct communication with you by periodically providing you with
     newsletters, surveys, special offers, promotions, and information about
     new goods and services in line with your marketing preferences. By
     selecting "Unsubscribe" at the bottom of the email or contacting us using
     the information listed under "Questions and Contact Information," you can
     stop receiving our marketing emails at any time. Communicate directly with
     you by phone to respond to customer service inquiries or comments through
     the Website, social
   </p>
   <p style={{ marginLeft: "36pt" }}>&nbsp;</p>
   <p style={{ marginLeft: "36pt" }}>
     media or otherwise, to discuss issues relating to your account or the
     Website, and to provide customer support.
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         • Provide you with advertising, such as by assisting publishers and
         advertisers in managing and serving ads on the Website or on other
         websites, and customizing ads according to your browsing preferences
         and interests. For more information on this kind of advertising and
         the controls you have over it, please go to the section on Cookies and
         Other Website Usage Information;
       </span>
     </li>
   </ul>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     • Keep track of and record all of your correspondence with us, including
     calls, emails, texts, social media posts, chat messages, and other forms
     of communication (as allowed by local law);
   </p>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     <br />
     •Before answering to your requests for privacy involving your personal
     data, please confirm your identity;
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>
         Adhere to our legal and contractual requirements to exchange
         information with law enforcement, fraud prevention, and credit
         reference agencies;
       </span>
     </li>
   </ul>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}
   >
     &nbsp;
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>
         Gather aggregated data regarding the functionality and usage of our
         website in order to have a deeper understanding of the preferences of
         our users; and
       </span>
     </li>
   </ul>
   <p
     className="ListParagraph"
     style={{ marginBottom: "0pt", lineHeight: "108%", fontSize: "12pt" }}
   >
     &nbsp;
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         lineHeight: "normal",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>&nbsp;</span>
       <span style={{ fontFamily: "Aptos", fontSize: "12pt" }}>
         Other Purposes: To accomplish other justifiable business objectives
         and other legal objectives that we will advise you of.
       </span>
     </li>
   </ul>
   <p style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}>
     <br />
     <br />
     We might add to and improve the Personal Data we get about you by
     combining it with other data we get from outside sources. <br />
     We might also create aggregated, anonymized data using the Personal
     Information we get from you via the Website. By doing this, we make sure
     that the aggregated, anonymized data is no longer individually
     identifiable and cannot be used to identify you in the future. This will
     entail, for instance, keeping the aggregated, anonymized data apart from
     any personal data.
   </p>
   <p style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}>
     &nbsp;
   </p>
   <p style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}>
     <br />
     <br />
     Modification of Goal. Unless we reasonably believe that we need to use
     your personal data for another reason that is compatible with the original
     purpose, we will only use it for the purposes for which it was obtained.
     Please get in touch with us if you would need more information about how
     the processing for the new purpose is consistent with the original
     purpose.
     <br />
     <br />
     We will notify you and provide an explanation of the legal justification
     if we must use your Personal Data for an unconnected purpose.
     <br />
     Please be aware that, if required or authorized by law, we may process
     your Personal Data in accordance with the aforementioned guidelines
     without your knowledge or consent.
   </p>
   <p>&nbsp;</p>
   <p>
     Fraud Prevention, Credit Reference Checks, and Denied Parties. When you
     open an account, we may share your personal information with credit
     reference, fraud prevention, and denied party agencies. These
     organizations use it to verify your identification and stop fraud and
     money laundering.
   </p>
   <p style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}>
     <br />
     When you open your account and on a regular basis, we may access and use
     information from credit reference and denied party agencies in order to: •
     monitor and make decisions
   </p>
   <p style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}>
     &nbsp;
   </p>
   <p style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}>
     regarding your account, including determining your creditworthiness;
     <br />
     <br />• stop money laundering, fraud, and illegal conduct;
     <br />
     <br />• confirm the veracity of the information you give us and
     authenticate your identification; and
     <br />
     <br />• Find debtors and get money back.
   </p>
   <p style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}>
     &nbsp;
   </p>
   <p style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}>
     <br />
     Decisions about applications may be made only on the basis of
     automatically generated reports from internal databases and credit
     reference agencies. <br />
     Throughout your association with us, we will continue to provide credit
     reference bureaus with information about how you handle your account,
     including any payment defaults. Other organizations will have access to
     this information so they can make judgments regarding you.
     <br />
     <br />
     Information will be shared with law enforcement agencies, fraud prevention
     organizations, and other organizations that may access and utilize it, in
     the event that fraudulent activity is detected or suspected, or if false
     or erroneous information is submitted.
     <br />
     <br />
     We reserve the right to refuse to provide you services if we or a fraud
     prevention organization determine that you present a risk of fraud or
     money laundering.
   </p>
   <p style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}>
     &nbsp;
   </p>
   <p style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}>
     <br />
     The fraud prevention agencies will keep a record of any fraud or money
     laundering risk, which can make other people reluctant to offer you
     financing or services. Your information may be retained by fraud
     prevention organizations for a variety of lengths of time. <br />
     In order to safeguard their company and adhere to applicable regulations,
     credit reference, fraud prevention, and denied party agencies have a
     legitimate interest in preventing fraud and money laundering as well as
     confirming identification. This is the rationale behind their processing
     of your information.
   </p>
   <p style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}>
     &nbsp;
   </p>
   <p style={{ marginBottom: "0pt", lineHeight: "normal", fontSize: "12pt" }}>
     &nbsp;
   </p>
   <p>
     <strong>5. Information Sharing</strong>
   </p>
   <p>
     We share your Individual Information along with your assent or as
     essential to complete any transaction or give any Advertising you have got
     asked or authorized. We too share Individual Information with third-party
     sellers, affiliates and distributors, third-party benefit suppliers,
     Auxiliaries and commerce units, when required by law or to reply to
     legitimate handle, to ensure our clients, to ensure lives, to preserve the
     security of our Offerings, and to ensure the rights or property of VeeMost
     Advances Inc..
   </p>
   <p>&nbsp;</p>
   <p>
     Depending on the nature of your intuitive with us, we may unveil your
     Individual Information, counting Delicate Individual Information, as takes
     after:
   </p>
   <p>
     With Sellers. VeeMost Advances Inc. may share Individual Information
     almost you with the third-party merchants that make Offerings accessible
     through us. For illustration, we may share your Individual Information
     with a third-party merchant in the event that you buy or get to an
     Advertising through us, or an VeeMost Innovations Inc. affiliate or
     wholesaler, which seller requires confirmation of an Advertising buy in
     arrange to enroll that Advertising. We may moreover share your Individual
     Information with a third-party seller on the off chance that that merchant
     co-sponsors a showcasing action with us to confirm your support within the
     showcasing action.
   </p>
   <p>
     With Affiliates and Wholesalers. VeeMost Innovations Inc. may share your
     Individual Information with the affiliates and distributors that buy
     Offerings accessible through the Site. For case, we may share your
     Individual Information on the off chance that you buy or get to an
     Advertising through a affiliate or merchant, which affiliate or merchant
     utilized our affiliate apparatuses and administrations.
   </p>
   <p>
     With Benefit Suppliers. VeeMost Advances Inc. may give your Individual
     Information to sellers that give administrations to help us with running
     our trade, working the Site, and accomplishing the Purposes. For case,
     these benefit suppliers may incorporate suppliers of client benefit,
     installment handling, mail and informing bolster, facilitating,
     administration, support, data investigation, advertising fulfillment or
     conveyance, or other administrations we may get on an outsourced premise.
     A list of third-party benefit suppliers is accessible upon ask.
   </p>
   <p>
     With Auxiliaries and Commerce Units. VeeMost Innovations Inc. may share
     your Individual Information with our Auxiliaries and other trade units.
     Our Auxiliaries and business units will utilize your Individual
     Information we share with them in a way steady with this Protection
     Articulation.
   </p>
   <p>
     With Other Clients. VeeMost Advances Inc. may share your Individual
     Information with other clients after you choose to connect with those
     clients (or ask that we communicate with them on your sake) through the
     Site. This may incorporate encouraging communications with other clients
     or empowering posting of Individual Information to zones of the Site
     available by other clients. You ought to be mindful that any Individual
     Information (or other data) you give in these ranges may be examined,
     collected, and utilized by others who get to them.
   </p>
   <p>&nbsp;</p>
   <p>
     With Law Requirement and Security. VeeMost Innovations Inc. may share your
     Individual Information with any competent law requirement, administrative,
     government office, court, other administrative authorities, or other
     third-party where we accept divulgence is fundamental (i) as a matter of
     appropriate law or direction, (ii)to work out, build up or protect our
     legal rights, or (iii) to ensure your crucial interface or those of any
     other person.
   </p>
   <p>
     Sale or Procurement of Resources. On the off chance that VeeMost Advances
     Inc. exchanges possession or control of any parcel of VeeMost Innovations
     Inc. or the Site to an real or potential
   </p>
   <p>&nbsp;</p>
   <p>
     buyer, whether within the setting of an acquisition, merger,
     reorganization, or other mien of all or any parcel of our commerce,
     resources, or stock (counting in association with any liquidation or
     comparative procedures), we may exchange your Individual Information to
     that genuine or potential buyer, given that the utilize of your Individual
     Information by that third-party remains subject to pertinent law.
   </p>
   <p>
     With Sponsors and Publicizing Companies. VeeMost Advances Inc. may share
     your Individual Information with promoters, publicizing systems, promoting
     servers, and analytics companies or other third parties in association
     with our and their showcasing, special, and other offers, as well as item
     data.
   </p>
   <p>
     With Others. We may share your Individual Information with any other
     individual along with your assent to the revelation.
   </p>
   <p>
     We may too share amassed, anonymized data with third parties for other
     purposes. Such data does not distinguish you separately, but may
     incorporate utilization, seeing and specialized data we collected through
     your utilize of our Site. On the off chance that we are required under
     applicable law to treat such data as Individual Information, at that point
     we are going as it were unveil it as depicted over.
   </p>
   <p>
     <strong>6. Your Choices Regarding your Personal Data</strong>
   </p>
   <p>
     <u>Cookies.</u> You can choose to allow or reject cookies. Many of our
     websites have cookie banners that let you pick the types of cookies you
     want. Most web browsers automatically accept cookies, but you can change
     your browser settings to refuse cookies if you want. If you don't want to
     accept cookies, most web browsers let you: (i) change settings so you get
     a warning when a cookie is coming, so you can decide if you want to accept
     it; (ii) turn off cookies that are already saved; or (iii) make your
     browser automatically refuse any cookies. If you turn off or refuse
     cookies, some parts of our Websites might not work correctly. This is
     because we may not be able to recognize and link you to your account(s).
     Also, the things we offer when you come to see us might not match what you
     need or like.
   </p>
   <p
     className="selectable-text"
     style={{ marginTop: "14pt", marginBottom: "14pt" }}
   >
     <u>
       <span style={{ fontFamily: "Aptos" }}>Interest-Based Advertising.</span>
     </u>
     <span style={{ fontFamily: "Aptos" }}> </span>
     <span className="selectable-text1" style={{ fontFamily: "Aptos" }}>
       nterest-Based Advertising means showing ads that match what you like or
       are interested in. When you go to the Website, we and other companies
       that provide cookies might put cookies and similar tools on your device.
       These help us track what you do online over time and on different
       websites, so we can show you ads or content that matches your{" "}
     </span>
   </p>
   <p
     className="selectable-text"
     style={{ marginTop: "14pt", marginBottom: "14pt" }}
   >
     <span className="selectable-text1" style={{ fontFamily: "Aptos" }}>
       &nbsp;
     </span>
   </p>
   <p
     className="selectable-text"
     style={{ marginTop: "14pt", marginBottom: "14pt" }}
   >
     <span className="selectable-text1" style={{ fontFamily: "Aptos" }}>
       interests. You can stop being tracked online for targeted ads by
       visiting https://optout. aboutadsinfo or
       https://optoutnetworkadvertisingorg You can also turn off advertising
       cookies by clicking the "Do Not Sell or Share my Personal Information"
       link at the bottom of{" "}
     </span>
   </p>
   <p
     className="selectable-text"
     style={{ marginTop: "14pt", marginBottom: "14pt" }}
   >
     <span className="selectable-text1" style={{ fontFamily: "Aptos" }}>
       &nbsp;
     </span>
   </p>
   <p
     className="selectable-text"
     style={{ marginTop: "14pt", marginBottom: "14pt" }}
   >
     <span className="selectable-text1" style={{ fontFamily: "Aptos" }}>
       this page. The choices you make depend on the device and the web browser
       you are using. If you use different web browsers on your computer or on
       different devices, you'll need to turn off interest-based ads separately
       for each browser and device you use.
     </span>
   </p>
   <p>
     <u>Marketing Communications.</u> refers to the ways a business talks to
     its customers about its products or services. You can choose not to
     receive marketing messages from us whenever you want. You can use this
     option by clicking the "unsubscribe" or "opt-out" link in the marketing
     emails we send you. If you want to stop receiving other types of
     marketing, like mail or phone calls, please reach out to us using the
     contact info below under “Questions and Contact information,” or visit our
     preference center.
   </p>
   <p>
     <u>Do Not Track.</u> Some web browsers and devices you use to visit the
     Website allow you to say that you do not want to be "tracked" online.
     Right now, the website does not react to "Do Not Track" requests. We don't
     change your experience on the website or the personal information we
     collect from you based on your preferences.
   </p>
   <p>
     <u>Preference Center.</u> Many of our subsidiaries have a preference
     center where you can choose to stop getting messages from us or receive
     fewer messages. You can choose or change your communication preferences
     anytime using the online form provided by that Affiliate.
   </p>
   <p>
     <strong>7. Your Privacy Rights</strong>
   </p>
   <p>
     Later in Section 7, we explain the privacy rights you might have depending
     on where you live. We will reply to requests from people who want to use
     their privacy rights as allowed by the law. We might not be able to agree
     to some requests, or we might only be able to do part of what was asked,
     because of our legal rights and responsibilities. If you work for us, are
     a contractor, or are applying for a job, we will give you a separate
     privacy notice that explains your rights about your Personal Data. You
     will receive this notice when it's needed.
   </p>
   <p>
     You cannot be treated unfairly for using your right to privacy. We won't
     refuse to give you products or services, and we won't charge you higher
     prices just because you are using your privacy rights.
   </p>
   <p>
     People who are eligible can ask to use the privacy rights mentioned below
     in any of these ways:
   </p>
   <p>
     You can send an email to{" "}
     <a href="mailto:veestore@veemost.com" style={{ textDecoration: "none" }}>
       <span className="Hyperlink">veestore@veemost.com</span>
     </a>
   </p>
   <p>You can call +1 732 523 1180.</p>
   <p>
     We will check your identity carefully before we answer your requests. The
     steps to check your information will be different based on how sensitive
     the personal data is and if you have an account with us.
   </p>
   <p>&nbsp;</p>
   <p>
     You can choose someone to ask for something for you. When you make the
     request, please make sure the authorized agent shows that they are allowed
     to act as an agent.
   </p>
   <p>&nbsp;</p>
   <p>
     <strong>
       <u>United States Privacy Rights</u>
     </strong>
   </p>
   <p>
     Where provided for by the applicable privacy laws in your state, United
     States residents may be entitled to exercise some or all of the following
     privacy rights:
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <em>
         <u>
           <span
             style={{
               lineHeight: "108%",
               fontFamily: "Aptos",
               fontSize: "11pt"
             }}
           >
             Access / Right to Know:
           </span>
         </u>
       </em>
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         {" "}
         You have the right to check if we are using your Personal Data and to
         ask us to share the following information with you: (i) what types of
         Personal Data we have collected about you (including Sensitive
         Personal Data); (ii) where we got your Personal Data from; (iii) why
         we collected or sold your Personal Data; (iv) what Personal Data we
         have sold about you and who we sold it to; (v) what Personal Data we
         have shared for our business and who we shared it with; (vi) a copy of
         the specific Personal Data we have about you; and (vii) details about
         any automated decisions we make that affect you, including what the
         result of those decisions might be.
       </span>
     </li>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <em>
         <u>
           <span
             style={{
               lineHeight: "108%",
               fontFamily: "Aptos",
               fontSize: "11pt"
             }}
           >
             Correct or update your Personal Data:
           </span>
         </u>
       </em>
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         {" "}
         You may have the right to request that we correct, update, or modify
         the Personal Data we maintain about you.
       </span>
     </li>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <em>
         <u>
           <span
             style={{
               lineHeight: "108%",
               fontFamily: "Aptos",
               fontSize: "11pt"
             }}
           >
             Delete your Personal Data:
           </span>
         </u>
       </em>
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         {" "}
         You can ask us to delete the copies of your Personal Data that we
         have, but there are some rules and limits to this.
       </span>
     </li>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <em>
         <u>
           <span
             style={{
               lineHeight: "108%",
               fontFamily: "Aptos",
               fontSize: "11pt"
             }}
           >
             Do Not Sell My Personal Data or Share my Personal Data for
             Behavioral Advertising:
           </span>
         </u>
       </em>
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         {" "}
         You can choose not to sell or share your personal information for ads
         by clicking the "Do Not Sell or Share My Personal Information" link at
         the bottom of this page. If you want to stop cookie-based tracking for
         ads (which may be considered a "sale" or "sharing" by law), you need
         to change your cookie settings on this page or use the "Do Not Sell or
         Share My Personal Information" link at the bottom of the page.
       </span>
     </li>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <em>
         <u>
           <span
             style={{
               lineHeight: "108%",
               fontFamily: "Aptos",
               fontSize: "11pt"
             }}
           >
             Opt-out of automated decision-making:
           </span>
         </u>
       </em>
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         {" "}
         You might have the right to ask to stop being profiled or to keep
         automated decisions from being made about you, as long as we do those
         things, and any privacy laws allow it.
       </span>
     </li>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <em>
         <u>
           <span
             style={{
               lineHeight: "108%",
               fontFamily: "Aptos",
               fontSize: "11pt"
             }}
           >
             Limit the use of my Sensitive Personal Data:
           </span>
         </u>
       </em>
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         {" "}
         About the Sensitive Personal Data mentioned in Section 2 above, you
         can ask us to restrict how we use and share this data according to the
         rules set by privacy laws.
       </span>
     </li>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <strong>
         <u>
           <span
             style={{
               lineHeight: "108%",
               fontFamily: "Aptos",
               fontSize: "11pt"
             }}
           >
             European Economic Area (EEA) / United Kingdom (UK) and Switzerland
             Privacy Rights
           </span>
         </u>
       </strong>
     </li>
   </ul>
   <p style={{ marginLeft: "36pt" }}>
     If you are visiting from the European Economic Area, Switzerland, or the
     United Kingdom, please check this section for details about your data
     protection rights, who is in charge of your personal information, and why
     we are allowed to use your personal information.
   </p>
   <p style={{ marginLeft: "36pt" }}>
     People in the EEA, Switzerland, and the UK can ask for the following about
     their Personal Data:
   </p>
   <p style={{ marginLeft: "36pt" }}>&nbsp;</p>
   <p style={{ marginLeft: "36pt" }}>&nbsp;</p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <em>
         <u>
           <span
             style={{
               lineHeight: "108%",
               fontFamily: "Aptos",
               fontSize: "11pt"
             }}
           >
             Access and portability of your Personal Data:
           </span>
         </u>
       </em>
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         {" "}
         You have the right to see your Personal Data if we are using it. You
         can get a copy of your Personal Data that you can carry with you.
       </span>
     </li>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <em>
         <u>
           <span
             style={{
               lineHeight: "108%",
               fontFamily: "Aptos",
               fontSize: "11pt"
             }}
           >
             Rectification of your Personal Data:
           </span>
         </u>
       </em>
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         {" "}
         You can ask us to fix, change, or update your Personal Data that we
         have.
       </span>
     </li>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <em>
         <u>
           <span
             style={{
               lineHeight: "108%",
               fontFamily: "Aptos",
               fontSize: "11pt"
             }}
           >
             Erasure of your Personal Data:
           </span>
         </u>
       </em>
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         {" "}
         You can ask us to delete the copies of your personal information that
         we have, but there are some rules and limits about this.
       </span>
     </li>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <em>
         <u>
           <span
             style={{
               lineHeight: "108%",
               fontFamily: "Aptos",
               fontSize: "11pt"
             }}
           >
             Object to processing:
           </span>
         </u>
       </em>
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         {" "}
         You can refuse to let us use your personal information if we are doing
         so for our own good reasons.
       </span>
     </li>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <em>
         <u>
           <span
             style={{
               lineHeight: "108%",
               fontFamily: "Aptos",
               fontSize: "11pt"
             }}
           >
             Restrict processing:
           </span>
         </u>
       </em>
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         {" "}
         You can ask us to limit how we use your personal information or stop
         using it altogether. When we can't use your information, we can keep
         it safe.
       </span>
     </li>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <em>
         <u>
           <span
             style={{
               lineHeight: "108%",
               fontFamily: "Aptos",
               fontSize: "11pt"
             }}
           >
             Refuse or withdraw consent:
           </span>
         </u>
       </em>
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         {" "}
         If we have gathered and used your personal information because you
         agreed, you can take back your agreement anytime. If you take back
         your consent, it won't change the legality of any processing we did
         before you withdrew it. It also won't affect the processing of your
         Personal Data that is based on other legal reasons besides consent.
       </span>
     </li>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <em>
         <u>
           <span
             style={{
               lineHeight: "108%",
               fontFamily: "Aptos",
               fontSize: "11pt"
             }}
           >
             Complaints:
           </span>
         </u>
       </em>
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         {" "}
         You can complain to a data protection authority if you are unhappy
         with how we collect and use your personal information, or if you don't
         like our answer to your privacy questions. For more information,
         please reach out to your local data protection office. (You can find
         contact information for data protection authorities in the European
         Economic Area and the UK here.)
       </span>
     </li>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <u>
         <span
           style={{
             lineHeight: "108%",
             fontFamily: "Aptos",
             fontSize: "11pt"
           }}
         >
           Identity of the Controller for purposes of European data protection
           law.
         </span>
       </u>
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         {" "}
         The controller for any Personal Data processed by us is the VeeMost
         Technologies Inc. Affiliate in the European Economic Area country, UK
         or Switzerland collecting the Personal Data. If you have any questions
         about the Personal Data you have submitted to the respective
         Affiliate, please contact the relevant Affiliate.
       </span>
     </li>
   </ul>
   <p>
     <u>
       Legal Basis for Processing Personal Data (EEA, Switzerland and UK
       Visitors).
     </u>{" "}
     The reason we collect and use your Personal Data will vary based on what
     information we collect and how we collect it. We usually collect your
     Personal Data only in the following situations: (i) when we need it to
     complete a contract with you (like when you buy something), (ii) when it's
     in our interests and doesn't go against your rights, or (iii) when you
     give us permission to collect it. Sometimes, we might be required by law
     to collect your Personal Data, or we might need it to keep you or someone
     else safe.
   </p>
   <p>
     If we need your Personal Data because of a law or to fulfill a contract
     with you, we will let you know when we ask for it. We will also tell you
     if giving this information is required and what might happen if you do not
     provide it.
   </p>
   <p>&nbsp;</p>
   <p>&nbsp;</p>
   <p>
     If we gather and use your Personal Data because we have a good reason to
     do so (or someone else does), it's usually to run our platform and talk to
     you as needed to provide our services. This can also be for our business
     interests, like answering your questions, making our platform better,
     doing marketing, or finding and stopping illegal activities. We might have
     other valid reasons for our actions, and if necessary, we will tell you
     what those reasons are when the time comes.
   </p>
   <p>
     If we gather and use your personal information with your permission, we
     will explain what happens if you say no or revoke your permission when you
     give it.
   </p>
   <p>
     If you have questions or need more information about why we collect and
     use your Personal Data, please reach out to us using the contact details
     listed under "Questions and Contact Information" below.
   </p>
   <p>
     <strong>
       <u>Other Jurisdiction Privacy Rights</u>
     </strong>
   </p>
   <p>
     Depending on where you live or use our website or services, you might have
     certain privacy rights. These rights are like those in the United States,
     the European Economic Area (EEA), Switzerland, and the UK. They include
     the ability to access a copy of your Personal Data, correct it, delete it,
     ask us to stop processing it, limit how we use and share your Sensitive
     Personal Data, choose to not be part of automatic decisions, and opt out
     of selling or sharing your Personal Data for targeted advertising.
   </p>
   <p>
     You can make a request by filling out our online form, sending an email to
     veestore@veemost.com, or calling +1 732 523 1180. We will reply following
     the data protection laws that apply.
   </p>
   <p>
     <strong>8. Additional California Privacy Disclosures</strong>
   </p>
   <p>
     For purposes of California privacy law, California residents should note
     the following:
   </p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         We gather and use the following types of personal information for the
         business and commercial reasons explained in this Privacy Policy:
         identifiers and personal information categories listed in California
         law. Sure, please provide the text you'd like me to simplify. Code
         1798. 80(e) includes personal information like your name, contact
         details, government ID numbers, and IP address. It also covers
         information about your purchases and services, your marketing choices,
         and your answers to surveys. Additionally, it includes details about
         how you use our website, general location data (not exact locations),
         your work-related information like your company and job title, and
         sensitive personal information like your payment card details from
         VeeMost Technologies Inc. login information and government ID numbers,
         as well as conclusions drawn from that information. For more
         information, look at Section 2 above.
       </span>
     </li>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         We use the types of personal information mentioned earlier for our
         rules, business needs, and sales as explained in Section 4 above.
       </span>
     </li>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         We collect your personal information from various sources. This
         includes information you give us, data from your devices, other users
         of our website, companies that sell our{" "}
       </span>
     </li>
   </ul>
   <p style={{ marginLeft: "36pt" }}>&nbsp;</p>
   <ul style={{ margin: "0pt", paddingLeft: "0pt" }}>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         products, businesses that help us provide services, third-party
         customers we work with, data providers, public records, and our
         partner companies. We share the types of personal information
         mentioned above with our related companies, service providers who
         assist us, advertisers on our Platform, advertising networks,
         resellers and distributors, data analytics providers, other Website
         visitors (if you ask us to), for legal reasons, and with possible
         buyers of parts of our business. Please refer to Section 5 above for
         more information.
       </span>
     </li>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         marginBottom: "0pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         We might "sell" or "share" some of these types of personal
         information: names and other identifiers, and personal information
         categories mentioned in California law. Civil Code § 1798. 80(e) talks
         about business information, online activities, and location data from
         electronic devices. We share your personal information with
         advertisers, social networks, and other business partners. We do not
         sell or share the personal information of anyone under 16 years old.
       </span>
     </li>
     <li
       className="ListParagraph"
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         We don’t use or share your private information for anything other than
         what California privacy laws allow.
       </span>
     </li>
     <li
       style={{
         marginLeft: "27.6pt",
         lineHeight: "108%",
         paddingLeft: "8.4pt",
         fontFamily: "serif",
         fontSize: "10pt"
       }}
     >
       <span
         style={{ lineHeight: "108%", fontFamily: "Aptos", fontSize: "11pt" }}
       >
         See Section 11 for information about how long we retain Personal Data.
       </span>
     </li>
   </ul>
   <p>
     California's "Shine the Light" law allows people in California to ask
     companies how they have shared their personal information with other
     parties for advertising purposes. There is a rule that some businesses
     don’t have to follow. If a business has a privacy policy saying they won’t
     share a person’s personal information with others for advertising, and
     that person has chosen not to allow their information to be shared, then
     the business doesn’t need to share it. We have a policy that lets you
     choose not to share your personal information with other companies for
     marketing purposes. If you want to stop us from sharing your personal
     information with other companies for marketing or if you want to use your
     rights mentioned here, please reach out to us using the contact
     information listed under “Questions and Contact Information” below.
   </p>
   <p>
     <strong>9. Other Important Privacy Information</strong>
   </p>
   <p>
     <u>Security of Personal Data.</u> VeeMost Innovations Inc. employments
     specialized, and organization controls and measures planned to secure and
     secure your Individual Information from unauthorized misfortune, abuse,
     and revelation, such as solid client get to controls, sectioned arrange
     engineering, and comprehensive representative arrangements and preparing.
     Shockingly, no information transmitted over or available through the Web
     can be ensured to be 100% secure. As a result, whereas VeeMost Innovations
     Inc. endeavors to ensure all Individual Information, VeeMost Advances Inc.
     cannot guarantee or warrant that Individual Information will be totally
     secure from misappropriation by programmers or from other evil or criminal
     exercises, or within the occasion of a disappointment of computer
     equipment, program, or a broadcast communication organize. VeeMost
     Innovations Inc. will inform you within the occasion we ended up mindful
     of a security breach including your identifiable data (as characterized by
     the pertinent outside, government, state, and nearby laws) put away by or
     for us, in agreement with pertinent laws.
   </p>
   <p>&nbsp;</p>
   <p>&nbsp;</p>
   <p>
     <u>Compliance: </u>VeeMost Technologies Inc. shall periodically confirm
     that the Privacy Statement is correct, comprehensive for the information
     intended to be covered, clearly displayed, implemented, and accessible.
     The company will employ a self-assessment approach to ensure compliance
     with this Privacy Statement. VeeMost Technologies Inc. urges you to report
     any concerns using the contact information provided in this Privacy
     Statement under the “Questions and Contact information” heading below if
     you think that your Personal Data has been handled or disclosed in
     violation of this Privacy Statement. Regarding the use and disclosure of
     Personal Data, VeeMost Technologies Inc. will investigate any complaints
     and disputes and try to find a solution.
   </p>
   <p>
     <u>Accuracy.</u> It is your duty to supply accurate Personal Data to
     VeeMost Technologies Inc. VeeMost Technologies Inc. will only use Personal
     Data in ways that are compatible with the reasons for which it was
     collected or as later approved by you, unless otherwise specified in this
     Privacy Statement. VeeMost Technologies Inc. will take reasonable measures
     to guarantee that Personal Data is accurate, complete, current, and
     pertinent to its intended use, to the extent required for these
     objectives.
   </p>
   <p>
     <strong>10. International Data Transfers</strong>
   </p>
   <p>
     <br />
     It is possible for your personal data to be processed and transmitted to
     nations other than your home country. There's a chance that the data
     protection regulations in these nations differ from those in your own.
   </p>
   <p>
     Particularly, our essential Site servers are within the Joined together
     States, and our Backups and third-party benefit suppliers and accomplices
     work around the world. This implies that when we collect your Individual
     Information, we may handle it in any of these nations. In any case, we
     have taken suitable shields to require that your Individual Information
     will stay ensured in understanding with this Security Explanation. For
     Personal Information collected within the nations of the European
     Financial Range and/or the UK and transferred or gotten to by VeeMost
     Advances Inc. within the Joined together States, VeeMost Advances Inc.,
     Inc. has executed the European Commission’s Standard Legally binding
     Clauses and their UK and Swiss counterparts in expansion to suitable
     specialized and organization controls.
   </p>
   <p>
     For extra exchanges of Individual Information between our Auxiliaries
     exterior the EEA and/or the UK and the Joined together States we have
     executed the European Commission’s Standard Legally binding Clauses and
     their UK and Swiss reciprocals in expansion to suitable specialized and
     organization controls, which require us to ensure Individual Information
     they prepare from the EEA or the UK in agreement with European Union and
     UK information assurance law as pertinent. We have actualized comparable
     fitting shields with our third-party benefit suppliers and accomplices.
   </p>
   <p>
     <strong>11. Retention Period</strong>
   </p>
   <p>
     We hold each of the categories of Individual Information (counting Touchy
     Individual Information) for as long as we have a progressing genuine trade
     got to do so (for case, to supply you with an
   </p>
   <p>&nbsp;</p>
   <p>
     Advertising you've got asked or to comply with applicable legal, tax or
     bookkeeping necessities). The criteria we utilize to decide whether we
     have an continuous genuine trade have to be hold Individual Data include
     among others: (i) administrative prerequisites that we are subject to,
     counting laws and controls related to assess, work, accounting, and
     securities, (ii) whether a legitimate claim could be brought against us,
     for which the Individual Information would be significant, (iii) the need
     of the Individual Information to supply our administrations to our
     clients, and (iv) the sorts and affectability of Individual Information
     being handled.
   </p>
   <p>
     When we have no ongoing legitimate business need to process your Personal
     Data, we will either delete or anonymize it or, if this is not possible
     (for example, because your Personal Data has been stored in backup
     archives), then we will securely store your Personal Data and isolate it
     from any further processing until deletion is possible.
   </p>
   <p>
     If you are a resident of the European Union or the UK, all the Personal
     Data related to you and received and stored by VeeMost Technologies Inc.
     are erased after 5 years, save for any Personal Data in documents and
     files we must keep for a longer period under applicable laws. For example,
     we cannot erase personal data appearing on VAT invoices before we can
     delete the invoices from our systems.
   </p>
   <p>
     <strong>12. Not for Children</strong>
   </p>
   <p>
     Children under the age of 18 are not intended to use this website; it is
     only meant for use by those who are 18 years of age or older. Children
     under the age of eighteen are not intentionally solicited or given
     Personal Data by VeeMost Technologies Inc.
   </p>
   <p>
     <strong>13. Third-party Websites</strong>
     <br />
     The Website may contain links to other websites and web services in
     addition to giving access to the Offerings. Websites and services that are
     not covered by this Privacy Statement may have different privacy policies
     from those stated in this Privacy Statement. Your Personal Data is subject
     to the privacy policies that apply to such websites and services if you
     provide it to any of those other websites or services. VeeMost
     Technologies Inc. advises you to thoroughly review any website or web
     service's privacy statement before using it.
   </p>
   <p>
     <strong>14. Revisions and Updates to this Privacy Statement</strong>
     <br />
     In its sole and absolute discretion, VeeMost Technologies Inc. may update
     this privacy statement from time to time to reflect modifications to our
     business procedures or new requirements for disclosure under applicable
     privacy laws. As required by applicable privacy regulations, we will
     notify you if we make changes to this Privacy Statement by either posting
     the new version on this website or sending you an email. On the day that
     VeeMost Technologies Inc. updates the Privacy Statement on the website,
     the changes will take effect and be applicable to the data that has been
     acquired. If we need your permission to make any changes to how we use
     your personal data as outlined in our amended privacy statement because we
     are required by applicable data protection legislation, then we will do
     that.
   </p>
 </div>

        </Container>

      <Footer />

      </main>

  )
}

export default Policy
