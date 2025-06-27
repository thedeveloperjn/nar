"use client"

import { useState, useCallback } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Info } from "lucide-react"

interface ChecklistProps {
  formData: any
  updateFormData: (data: any) => void
}

export function Checklist({ formData, updateFormData }: ChecklistProps) {
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  const handleCheckChange = useCallback((field: string, checked: boolean) => {
    updateFormData({ [field]: checked })
  }, [updateFormData])

  const openDetails = useCallback((type: string) => {
    setOpenDialog(type)
  }, [])

  const closeDialog = useCallback(() => {
    setOpenDialog(null)
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Final Checklist</h2>
      <p className="text-gray-600">Please review and accept the following before submission</p>

      <div className="space-y-4 border rounded-md p-4 bg-gray-50">
        {/* Code of Conduct */}
        <div className="flex items-start space-x-3">
          <Checkbox
            id="codeOfConduct"
            checked={formData.codeOfConduct}
            onCheckedChange={(checked) => handleCheckChange("codeOfConduct", checked as boolean)}
            className="mt-1"
          />
          <div className="space-y-1 flex-1">
            <div className="flex items-center">
              <Label htmlFor="codeOfConduct" className="font-medium">
                CODE OF CONDUCT *
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-2 h-8 w-8 p-0"
                onClick={() => openDetails("codeOfConduct")}
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              I agree to abide by the NAR India Code of Conduct and uphold the highest standards of professional behavior.
            </p>
          </div>
        </div>

        {/* Code of Ethics */}
        <div className="flex items-start space-x-3">
          <Checkbox
            id="codeOfEthics"
            checked={formData.codeOfEthics}
            onCheckedChange={(checked) => handleCheckChange("codeOfEthics", checked as boolean)}
            className="mt-1"
          />
          <div className="space-y-1 flex-1">
            <div className="flex items-center">
              <Label htmlFor="codeOfEthics" className="font-medium">
                CODE OF ETHICS *
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-2 h-8 w-8 p-0"
                onClick={() => openDetails("codeOfEthics")}
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              I agree to follow the NAR India Code of Ethics in all my professional dealings.
            </p>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start space-x-3">
          <Checkbox
            id="termsAndConditions"
            checked={formData.termsAndConditions}
            onCheckedChange={(checked) => handleCheckChange("termsAndConditions", checked as boolean)}
            className="mt-1"
          />
          <div className="space-y-1 flex-1">
            <div className="flex items-center">
              <Label htmlFor="termsAndConditions" className="font-medium">
                TERMS AND CONDITIONS *
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-2 h-8 w-8 p-0"
                onClick={() => openDetails("termsAndConditions")}
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              I have read and agree to the Terms and Conditions of NAR India membership.
            </p>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> NAR India will review your application. Once the review is complete, the team will get in touch with you via call or email for the next steps.
          The applicable membership fee for your city is {formData.city === "OTHER" ? "₹5,000" : "₹10,000"}.
        </p>
      </div>

      {/* Dialogs for full details */}
      {/* Style for conduct and ethics lists */}
      <style>{`
        .conduct-main-list {
          counter-reset: main;
        }
        .conduct-main-list > li {
          counter-increment: main;
          padding-top: 1.5em;
          padding-bottom: 1.5em;
        }
        .conduct-main-list > li > .conduct-sub-list {
          counter-reset: sub;
        }
        .conduct-main-list > li > .conduct-sub-list > li {
          counter-increment: sub;
          list-style: none;
          position: relative;
          margin-bottom: 1.2em;
          margin-top: 1.2em;
        }
        .conduct-main-list > li > .conduct-sub-list > li:before {
          content: counter(main) "." counter(sub) " ";
          font-weight: normal;
          position: absolute;
          left: -4em;
          width: 4em;
          text-align: right;
          padding-right: 1em;
        }
        .conduct-main-list > li > .conduct-heading {
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 1.1em;
          margin-bottom: 0.75em;
        }
        .conduct-main-list > li > .conduct-heading:before {
          content: counter(main) ". ";
          font-weight: bold;
          margin-right: 0.5em;
          font-size: 1.1em;
        }
        .ethics-main-list {
          counter-reset: main;
        }
        .ethics-main-list > li {
          counter-increment: main;
          padding-top: 1.5em;
          padding-bottom: 1.5em;
        }
        .ethics-main-list > li > .ethics-sub-list {
          counter-reset: sub;
        }
        .ethics-main-list > li > .ethics-sub-list > li {
          counter-increment: sub;
          list-style: none;
          position: relative;
          margin-bottom: 1.2em;
          margin-top: 1.2em;
        }
        .ethics-main-list > li > .ethics-sub-list > li:before {
          content: counter(main) "." counter(sub) " ";
          font-weight: normal;
          position: absolute;
          left: -4em;
          width: 4em;
          text-align: right;
          padding-right: 1em;
        }
        .ethics-main-list > li > .ethics-heading {
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 1.1em;
          margin-bottom: 0.75em;
        }
        .ethics-main-list > li > .ethics-heading:before {
          content: counter(main) ". ";
          font-weight: bold;
          margin-right: 0.5em;
          font-size: 1.1em;
        }
      `}</style>
      <Dialog open={openDialog === "codeOfConduct"} onOpenChange={closeDialog}>
        <DialogContent className="w-full sm:max-w-3xl h-[100vh] sm:max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>NAR India Code of Conduct</DialogTitle>
            <DialogDescription>Please read the complete Code of Conduct below</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p className="mb-4 font-medium">Acknowledgment and Commitment to<br/>The Code of Conduct</p>
            <p className="mb-4">As a member of the National Association of Realtors India, I/We hereby acknowledge receipt and understanding of the Code of Ethics for the Governing Board and Leadership. I/We affirm my/our commitment to uphold these ethical standards, ensuring the highest level of integrity, transparency, and accountability in our actions and decisions. By signing this document, I/We pledge to:</p>
            <ol className="conduct-main-list ml-6">
              <li>
                <span className="conduct-heading">Commitment to the Mission</span>
                <ol className="conduct-sub-list ml-6">
                  <li>Ensure all actions and decisions are aligned with the organization's mission, vision, and values.</li>
                  <li>Prioritize the organization's goals and objectives in all activities and strategic planning.</li>
                  <li>Regularly review the mission to ensure its relevance to community needs and alignment with current activities.</li>
                  <li>Communicate the mission clearly and consistently to all stakeholders, including donors, beneficiaries, staff, and volunteers.</li>
                  <li>Make decisions that advance the organization's mission and contribute to the public good.</li>
                </ol>
              </li>
              <li>
                <span className="conduct-heading">Integrity</span>
                <ol className="conduct-sub-list ml-6">
                  <li>Act with honesty, integrity, and fairness in all dealings related to the organization.</li>
                  <li>Uphold the highest standards of ethical behavior, demonstrating transparency and truthfulness in all communications.</li>
                  <li>Avoid any form of misrepresentation, fraud, or unethical conduct in the organization's operations and communications.</li>
                  <li>Lead by example, promoting a culture of integrity and ethical behavior throughout the organization.</li>
                  <li>Maintain confidentiality of sensitive information and use it only for authorized purposes that benefit the organization.</li>
                  <li>Ensure that all actions are free from deceit or corruption, reflecting the organization's commitment to ethical standards.</li>
                  <li>Encourage and support ethical behavior among all members of the organization, including staff and volunteers.</li>
                  <li>Be truthful in all statements, avoiding exaggeration or misrepresentation of the organization's capabilities or achievements.</li>
                  <li>Avoid any actions that could bring discredit to the organization or compromise its reputation for integrity.</li>
                  <li>Maintain personal integrity, avoiding situations that could lead to ethical compromises or conflicts.</li>
                </ol>
              </li>
              <li>
                <span className="conduct-heading">Accountability and Transparency</span>
                <ol className="conduct-sub-list ml-6">
                  <li>Take responsibility for the governance and management of the organization, ensuring all actions and decisions are transparent and accountable.</li>
                  <li>Provide accurate and timely information to stakeholders, including financial reports, meeting minutes, and program updates.</li>
                  <li>Ensure that all financial activities are conducted with transparency and are subject to regular audits and reviews.</li>
                  <li>Implement and follow policies and procedures that ensure accountability to donors, beneficiaries, and regulatory bodies.</li>
                  <li>Encourage open communication and feedback from stakeholders to improve transparency and accountability.</li>
                  <li>Regularly evaluate organizational performance against set goals and objectives, and report findings transparently.</li>
                  <li>Ensure all decisions are documented, providing a clear rationale and basis for actions taken.</li>
                  <li>Make information about the organization's activities, governance, and performance readily available to the public.</li>
                  <li>Respect the rights of stakeholders to be informed about how their contributions are used and the impact of their support.</li>
                  <li>Maintain high standards of financial stewardship, ensuring resources are used effectively and ethically to advance the organization's mission.</li>
                </ol>
              </li>
              <li>
                <span className="conduct-heading">Conflict of Interest</span>
                <ol className="conduct-sub-list ml-6">
                  <li>Avoid any situations where personal, financial, or other interests conflict, or appear to conflict, with the interests of the organization.</li>
                  <li>Disclose any potential or actual conflicts of interest to the board or appropriate governing body immediately.</li>
                  <li>Refrain from participating in or influencing decisions where a conflict of interest exists or could be perceived to exist.</li>
                  <li>Ensure that all decisions are made in the best interest of the organization and are free from undue influence or bias.</li>
                  <li>Implement and adhere to a conflict-of-interest policy that outlines procedures for identifying, disclosing, and managing conflicts of interest.</li>
                  <li>Abstain from using organizational resources, information, or opportunities for personal gain.</li>
                  <li>Ensure that relationships with vendors, partners, or contractors do not compromise the organization's integrity or independence.</li>
                  <li>Avoid engaging in outside activities or accepting gifts that could interfere with your responsibilities to the organization.</li>
                  <li>Regularly review and update the conflict-of-interest policy to reflect changes in law, organizational structure, or best practices.</li>
                  <li>Encourage a culture of transparency where conflicts of interest are openly discussed and managed effectively.</li>
                </ol>
              </li>
              <li>
                <span className="conduct-heading">Financial Stewardship</span>
                <ol className="conduct-sub-list ml-6">
                  <li>Ensure responsible management of the organization's financial resources, safeguarding assets and ensuring their use aligns with the organization's mission.</li>
                  <li>Approve budgets, financial statements, and expenditures that are transparent, accurate, and compliant with legal requirements.</li>
                  <li>Prevent misuse or misappropriation of funds, ensuring all financial transactions are conducted ethically and legally.</li>
                  <li>Conduct regular financial reviews and audits to maintain the integrity and accuracy of financial reporting.</li>
                  <li>Ensure all fundraising activities are conducted ethically, with clear communication to donors about how their contributions will be used.</li>
                  <li>Avoid any financial practices that could harm the organization's reputation or financial stability.</li>
                  <li>Ensure all financial policies and procedures are reviewed regularly to maintain compliance with legal and ethical standards.</li>
                  <li>Promote financial transparency by providing stakeholders with detailed reports on financial performance and the use of funds.</li>
                  <li>Encourage sound financial planning to support the long-term sustainability of the organization.</li>
                  <li>Ensure all financial decisions are made in the best interest of the organization and its stakeholders.</li>
                </ol>
              </li>
              <li>
                <span className="conduct-heading">Compliance with Laws and Regulations</span>
                <ol className="conduct-sub-list ml-6">
                  <li>Adhere to all applicable laws, regulations, and standards governing not-for-profit organizations in India.</li>
                  <li>Stay informed about changes to legal and regulatory requirements and ensure compliance in all organizational activities.</li>
                  <li>Ensure all contracts, agreements, and legal documents are reviewed and approved by appropriate legal counsel.</li>
                  <li>Report any illegal or unethical conduct to the appropriate authorities and take corrective action as necessary.</li>
                  <li>Promote a culture of compliance within the organization, providing training and resources to ensure all staff and volunteers understand their legal obligations.</li>
                  <li>Establish and maintain internal controls to ensure compliance with all applicable laws and regulations.</li>
                  <li>Avoid actions that could lead to legal disputes or jeopardize the organization's standing.</li>
                  <li>Ensure that all organizational policies are consistent with current laws and best practices.</li>
                  <li>Engage legal and professional advisors when necessary to maintain compliance and manage risks.</li>
                  <li>Document all compliance efforts and make these records available for review by stakeholders and regulators.</li>
                </ol>
              </li>
              <li>
                <span className="conduct-heading">Respect for Diversity and Inclusion</span>
                <ol className="conduct-sub-list ml-6">
                  <li>Ensure that all organizational policies, programs, and practices are inclusive and equitable.</li>
                  <li>Promote diversity in leadership and decision-making, encouraging diverse perspectives and experiences.</li>
                  <li>Ensure that all stakeholders are treated with respect, fairness, and dignity.</li>
                  <li>Take proactive steps to prevent discrimination, harassment, and bias in all organizational activities.</li>
                  <li>Develop and implement policies that support diversity and foster an inclusive work environment.</li>
                  <li>Regularly assess and improve the organization's practices to ensure they are inclusive and promote diversity.</li>
                </ol>
              </li>
              <li>
                <span className="conduct-heading">Ethical Leadership and Governance</span>
                <ol className="conduct-sub-list ml-6">
                  <li>Demonstrate ethical leadership, modeling behaviour that aligns with the organization's values and ethical standards.</li>
                  <li>Foster a culture of ethics and accountability within the organization, encouraging ethical decision-making and behaviour.</li>
                  <li>Ensure that all board members and leaders act in the best interests of the organization, prioritizing its mission over personal or financial interests.</li>
                  <li>Regularly review and assess the effectiveness of the board and leadership team, implementing changes to improve governance and ethical practices.</li>
                  <li>Encourage a participative and democratic approach to decision-making, involving all relevant stakeholders.</li>
                  <li>Uphold principles of good governance, including transparency, accountability, fairness, and responsibility.</li>
                  <li>Avoid any form of self-promotion that detracts from the organization's mission or appears to place personal gain over organizational objectives.</li>
                  <li>Engage in continuous learning and development to improve leadership and governance skills.</li>
                  <li>Evaluate the impact of decisions on all stakeholders and ensure ethical considerations are at the forefront of governance practices.</li>
                </ol>
              </li>
              <li>
                <span className="conduct-heading">Confidentiality</span>
                <ol className="conduct-sub-list ml-6">
                  <li>Protect confidential information acquired through board service or leadership roles and use it only for the intended organizational purposes.</li>
                  <li>Refrain from disclosing or using any confidential information for personal gain or benefit.</li>
                  <li>Ensure that all discussions and documents related to sensitive organizational matters are kept confidential and secure.</li>
                  <li>Ensure that all board members and staff understand and adhere to confidentiality obligations.</li>
                  <li>Avoid sharing confidential information outside the organization without proper authorization and legal necessity.</li>
                  <li>Use confidentiality agreements as necessary to protect sensitive information.</li>
                  <li>Immediately report any breaches of confidentiality to the appropriate authority within the organization.</li>
                  <li>Review and update confidentiality policies regularly to adapt to new risks and regulatory requirements.</li>
                </ol>
              </li>
              <li>
                <span className="conduct-heading">Promotion of the Organization</span>
                <ol className="conduct-sub-list ml-6">
                  <li>Ensure all public communications and promotional activities focus on the organization's mission, values, and achievements, rather than individual recognition.</li>
                  <li>Avoid personalizing achievements in a way that seeks individual acclaim; instead, emphasize the collective efforts of the organization's team, volunteers, and stakeholders.</li>
                  <li>Highlight the organization's impact, programs, and services in promotional efforts, ensuring that messaging reflects the organization's mission and objectives.</li>
                  <li>Use the organization's platforms to communicate successes and milestones achieved by the organization as a whole, rather than individual accomplishments.</li>
                  <li>Avoid using organizational resources, platforms, or events for personal gain or to advance personal reputations.</li>
                  <li>Ensure that all promotional content, including social media and public statements, aligns with the organization's ethical standards and mission.</li>
                  <li>Respect the organization's branding and messaging guidelines in all promotional activities to maintain consistency and integrity.</li>
                  <li>Seek to elevate the profile of the organization within the community and among stakeholders by promoting its work, rather than focusing on personal contributions.</li>
                  <li>Engage in promotional activities that foster trust and support for the organization's mission, avoiding any actions that could detract from its reputation or credibility.</li>
                  <li>Comply with the organization's policies regarding media engagement and public relations, ensuring all communications are approved and appropriately reflect the organization's goals and values.</li>
                  <li>Ensure all public communications are truthful and reflect the organization's mission, values, and achievements.</li>
                </ol>
              </li>
            </ol>
            <p className="mt-6">I/We understand that adherence to this Code of Ethics is essential for maintaining the integrity and reputation of the National Association of Realtors India. We commit to these principles and will strive to contribute to the betterment of the association and the real estate industry as a whole.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "codeOfEthics"} onOpenChange={closeDialog}>
        <DialogContent className="w-full sm:max-w-3xl h-[100vh] sm:max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>NAR India Code of Ethics</DialogTitle>
            <DialogDescription>Please read the complete Code of Ethics below</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <ol className="ethics-main-list ml-6">
              <li>
                <span className="ethics-heading">Integrity and Honesty</span>
                <ol className="ethics-sub-list ml-6">
                  <li>Always provide truthful, accurate, and clear information to clients and stakeholders.</li>
                  <li>Refrain from making any false or misleading statements about properties, market conditions, or competitors.</li>
                  <li>Represent facts honestly in all property advertisements and disclosures.</li>
                  <li>Honor all commitments, promises, and contractual obligations with clients and other professionals.</li>
                  <li>Do not engage in or condone any fraudulent, deceitful, or misrepresentative practices.</li>
                  <li>Be transparent about your professional status and disclose any licenses, affiliations, or qualifications honestly.</li>
                  <li>Avoid misrepresenting the value of a property for personal gain.</li>
                  <li>Do not exaggerate or downplay the features or conditions of properties to influence a sale or lease.</li>
                  <li>Ensure all marketing and promotional materials are accurate and reflective of the true state of the property.</li>
                  <li>Acknowledge mistakes and take corrective actions promptly when errors occur.</li>
                  <li>Maintain honesty in all negotiations, ensuring that all parties are equally informed and agreements are fair.</li>
                  <li>Disclose all material facts that could affect the value or desirability of a property.</li>
                  <li>Avoid using misleading tactics to attract potential buyers or tenants.</li>
                  <li>Ensure all public statements, including those on social media, are truthful and not misleading.</li>
                  <li>Maintain integrity in all dealings, whether directly or indirectly related to real estate transactions.</li>
                  <li>Treat all parties in a transaction fairly and equitably.</li>
                  <li>Provide honest feedback and opinions about market conditions and property values based on evidence.</li>
                  <li>Do not engage in or encourage any form of corruption or unethical practice.</li>
                  <li>Ensure that all client funds are handled with the utmost integrity and only used for their intended purpose.</li>
                  <li>Respect the trust placed in you by clients and maintain high ethical standards at all times.</li>
                </ol>
              </li>
              <li>
                <span className="ethics-heading">Accountability and Professionalism</span>
                <ol className="ethics-sub-list ml-6">
                  <li>Take full responsibility for your actions and decisions, especially when they impact clients and stakeholders.</li>
                  <li>Be prepared to justify and explain all decisions and actions to clients, colleagues, and regulatory bodies.</li>
                  <li>Keep comprehensive and accurate records of all transactions, communications, and agreements.</li>
                  <li>Ensure continuous professional development by staying updated with the latest industry knowledge, skills, and best practices.</li>
                  <li>Adhere to all laws, regulations, and standards governing real estate practice in India.</li>
                  <li>Act in a professional manner at all times, showing respect to clients, colleagues, and the public.</li>
                  <li>Avoid any conduct that might discredit the profession or harm the reputation of the real estate industry.</li>
                  <li>Provide high-quality service and advice that reflects your professional competence and expertise.</li>
                  <li>Refrain from engaging in any behavior that could be construed as unprofessional or unethical.</li>
                  <li>Maintain appropriate insurance cover, including professional indemnity insurance, to protect against claims of negligence.</li>
                  <li>Ensure all marketing and representation of services are consistent with professional capabilities and resources.</li>
                  <li>Refrain from practices that may exploit or unfairly disadvantage any party in a transaction.</li>
                  <li>Use professional qualifications, designations, and affiliations appropriately and truthfully.</li>
                  <li>Comply with all directives from regulatory authorities and adhere to professional disciplinary procedures when necessary.</li>
                  <li>Act in a manner that promotes public confidence in the real estate profession.</li>
                  <li>Avoid situations that could lead to conflicts of interest or compromise professional integrity.</li>
                  <li>Respond promptly to inquiries, requests, and complaints from clients, authorities, and colleagues.</li>
                  <li>Engage in fair competition practices that respect the rights and reputations of other professionals.</li>
                  <li>Support and contribute to the development of ethical standards and best practices within the industry.</li>
                  <li>Promote an inclusive, respectful, and diverse work environment within the profession.</li>
                </ol>
              </li>
              <li>
                <span className="ethics-heading">Confidentiality</span>
                <ol className="ethics-sub-list ml-6">
                  <li>Protect all confidential information entrusted to you by clients or other parties during the course of your work.</li>
                  <li>Do not disclose any private information about clients or properties without explicit consent unless required by law.</li>
                  <li>Ensure secure storage and handling of all documents and data containing confidential information.</li>
                  <li>Use confidential information only for its intended purpose and do not exploit it for personal gain.</li>
                  <li>Respect the confidentiality of all communications with clients, including those conducted electronically.</li>
                  <li>Implement and maintain robust data protection policies and procedures to safeguard client information.</li>
                  <li>Avoid discussing sensitive client information in public or non-secure environments.</li>
                  <li>Ensure that all staff and associates are aware of and comply with confidentiality obligations.</li>
                  <li>Obtain informed consent before sharing any confidential information with third parties, even if they are involved in the transaction.</li>
                  <li>Do not use confidential information to gain an unfair advantage in any transaction or negotiation.</li>
                  <li>Protect the privacy of all parties involved in a transaction, including co-brokers and other professionals.</li>
                  <li>Keep client information confidential even after the professional relationship has ended.</li>
                  <li>Refrain from using proprietary client information to market services without proper authorization.</li>
                  <li>Take all necessary steps to prevent unauthorized access to confidential information.</li>
                  <li>Comply with all relevant privacy laws and regulations in India and internationally.</li>
                  <li>Notify clients promptly if there is a breach of confidentiality and take appropriate corrective actions.</li>
                  <li>Ensure that confidentiality agreements are clearly understood and documented in writing.</li>
                  <li>Do not disclose any information about previous clients without their express consent.</li>
                  <li>Refrain from seeking unnecessary confidential information that is not relevant to the transaction.</li>
                  <li>Act in good faith when dealing with confidential information, ensuring that it is handled responsibly and ethically.</li>
                </ol>
              </li>
              <li>
                <span className="ethics-heading">Conflict of Interest</span>
                <ol className="ethics-sub-list ml-6">
                  <li>Avoid any actions or situations that could create a conflict of interest with your clients or stakeholders.</li>
                  <li>Disclose any actual or potential conflicts of interest to all relevant parties as soon as they arise.</li>
                  <li>Obtain the informed consent of all parties before proceeding with any action that may involve a conflict of interest.</li>
                  <li>Refrain from representing multiple parties in a transaction without full disclosure and consent.</li>
                  <li>Do not use your position or access to privileged information to benefit yourself or third parties unfairly.</li>
                  <li>Disclose any personal or financial interests in properties being sold, purchased, or leased.</li>
                  <li>Ensure that any gifts, benefits, or inducements do not influence or appear to influence professional judgment.</li>
                  <li>Avoid recommending service providers in which you have a financial interest without full disclosure.</li>
                  <li>Do not act as a broker and a principal in the same transaction without full disclosure to all parties.</li>
                  <li>Refrain from engaging in activities that could impair your ability to act in the best interest of your clients.</li>
                  <li>Disclose any potential conflicts with other professionals involved in a transaction.</li>
                  <li>Ensure transparency when there are familial or close personal relationships with any party involved in a transaction.</li>
                  <li>Avoid engaging in any transaction where a conflict of interest cannot be effectively managed or mitigated.</li>
                  <li>Maintain a written record of all disclosures of conflicts of interest and the steps taken to address them.</li>
                  <li>Ensure that any referrals to related service providers are made solely for the benefit of the client.</li>
                  <li>Do not engage in one side agreements or hidden arrangements that could undermine the primary transaction.</li>
                  <li>Seek guidance from legal or professional advisors when faced with complex conflict of interest situations.</li>
                  <li>Prioritize the interests of your clients above personal gains in all professional dealings.</li>
                  <li>Regularly review and assess your professional relationships and transactions to identify and address potential conflicts of interest.</li>
                </ol>
              </li>
              <li>
                <span className="ethics-heading">Transparency and Fair Dealing</span>
                <ol className="ethics-sub-list ml-6">
                  <li>Ensure all communications and transactions are conducted with complete transparency.</li>
                  <li>Provide accurate, clear, and comprehensive information about properties, services, fees, and commissions.</li>
                  <li>Ensure that all agreements, contracts, and documents are fully understood by all parties and are legally compliant.</li>
                  <li>Refrain from engaging in practices that could mislead or deceive clients or other parties.</li>
                  <li>Disclose all known material facts about a property that could affect its value or desirability.</li>
                  <li>Provide fair and unbiased advice and recommendations to clients, based on professional judgment and market evidence.</li>
                  <li>Do not withhold or obscure information that could be relevant to the client's decision-making.</li>
                  <li>Ensure that all offers, counteroffers, and negotiations are presented and documented accurately.</li>
                  <li>Avoid manipulating market conditions or creating artificial demand to influence property prices.</li>
                  <li>Disclose any dual agency relationships and obtain informed consent from all parties.</li>
                  <li>Maintain transparency in advertising and promotional materials, avoiding exaggerated claims or representations.</li>
                  <li>Respect the legal rights of all parties in a transaction and ensure that all dealings are conducted lawfully.</li>
                  <li>Provide clients with a clear understanding of the terms and conditions of all agreements and contracts.</li>
                  <li>Ensure that all commissions and fees are disclosed upfront and agreed upon in writing.</li>
                  <li>Provide fair access to property information and ensure that all potential buyers or tenants are treated equally.</li>
                  <li>Avoid practices that could unfairly exclude or discriminate against any party.</li>
                  <li>Ensure that all professional dealings are conducted in an open and honest manner.</li>
                  <li>Encourage clients to seek independent advice where appropriate, especially in complex transactions.</li>
                  <li>Do not use confidential information for personal gain or advantage.</li>
                  <li>Maintain accurate records of all transactions and ensure that they are accessible for review by clients and regulatory bodies.</li>
                </ol>
              </li>
              <li>
                <span className="ethics-heading">Competence and Diligence</span>
                <ol className="ethics-sub-list ml-6">
                  <li>Provide services competently, using professional knowledge and skills to deliver the best possible outcomes for clients.</li>
                  <li>Continuously update and enhance professional knowledge and skills through ongoing education and training.</li>
                  <li>Ensure that all advice and recommendations are based on sound market analysis and evidence.</li>
                  <li>Act with due care and diligence in all professional activities, ensuring thoroughness and accuracy.</li>
                  <li>Ensure that all work is performed within the scope of your professional expertise and capabilities.</li>
                  <li>Seek assistance or refer clients to other qualified professionals when the expertise required exceeds your capabilities.</li>
                  <li>Take prompt and appropriate action in response to client needs and inquiries.</li>
                  <li>Ensure that all transactions are conducted in a timely and efficient manner, respecting deadlines and commitments.</li>
                  <li>Maintain clear and accurate documentation of all professional activities, ensuring that records are comprehensive and up-to-date.</li>
                  <li>Be prepared to justify professional decisions and actions based on evidence and best practices.</li>
                  <li>Ensure that all advertising and promotional activities are consistent with professional standards and competence.</li>
                  <li>Avoid over-promising or making unrealistic commitments to clients.</li>
                  <li>Conduct thorough due diligence on properties and transactions to ensure accuracy and compliance.</li>
                  <li>Regularly review and evaluate professional practices and processes to identify and implement improvements.</li>
                  <li>Remain aware of and comply with all relevant laws, regulations, and standards affecting real estate practice.</li>
                  <li>Ensure that all employees and associates are adequately trained and supervised to provide competent services.</li>
                  <li>Take responsibility for any errors or omissions and take corrective actions promptly to address any issues.</li>
                  <li>Maintain professional indemnity insurance and other relevant protections to safeguard clients and the public.</li>
                  <li>Ensure that all property inspections, valuations, and assessments are conducted thoroughly and accurately.</li>
                  <li>Strive for excellence in all professional endeavors, seeking to provide the highest standard of service to clients.</li>
                </ol>
              </li>
              <li>
                <span className="ethics-heading">Financial Responsibility</span>
                <ol className="ethics-sub-list ml-6">
                  <li>Ensure transparency in all financial dealings, including the disclosure of fees, commissions, and charges.</li>
                  <li>Maintain accurate and complete financial records for all transactions, ensuring compliance with legal and regulatory requirements.</li>
                  <li>Do not engage in or condone any form of financial misconduct, including fraud, embezzlement, or money laundering.</li>
                  <li>Handle client funds responsibly, ensuring that they are used solely for their intended purposes.</li>
                  <li>Refrain from making unauthorized withdrawals or transfers from client accounts.</li>
                  <li>Ensure that all financial transactions are documented accurately and can be audited if necessary.</li>
                  <li>Provide clients with clear and detailed invoices and statements of account.</li>
                  <li>Ensure that all commissions and fees are agreed upon in writing before any services are provided.</li>
                  <li>Avoid conflicts of interest in financial dealings and disclose any financial relationships that could influence professional judgment.</li>
                  <li>Refrain from accepting or giving kickbacks, bribes, or other inducements that could compromise professional integrity.</li>
                  <li>Ensure that all financial obligations to clients, colleagues, and other parties are met in a timely manner.</li>
                  <li>Maintain adequate financial reserves and insurance coverage to meet potential liabilities and claims.</li>
                  <li>Avoid using client funds to cover business expenses or personal expenditures.</li>
                  <li>Ensure that all financial advice and recommendations are based on accurate market data and sound judgment.</li>
                  <li>Provide clients with clear information about the potential financial risks and benefits of transactions.</li>
                  <li>Ensure compliance with all tax obligations and regulations related to real estate transactions.</li>
                  <li>Avoid engaging in speculative or high-risk financial activities that could jeopardize client interests.</li>
                  <li>Ensure that all payments and financial arrangements are made through secure and authorized channels.</li>
                  <li>Refrain from making false or misleading financial statements or representations to clients or regulators.</li>
                  <li>Act with integrity in all financial dealings, ensuring that client trust is maintained at all times.</li>
                </ol>
              </li>
              <li>
                <span className="ethics-heading">Respect for Legal and Ethical Standards</span>
                <ol className="ethics-sub-list ml-6">
                  <li>Comply with all applicable laws, regulations, and ethical standards governing real estate practice in India.</li>
                  <li>Stay informed about changes to laws and regulations that impact real estate transactions and practices.</li>
                  <li>Ensure that all property transactions are conducted in accordance with legal requirements and best practices.</li>
                  <li>Adhere to the ethical standards set forth in this code and those of relevant professional organizations.</li>
                  <li>Report any illegal or unethical conduct observed within the industry to the appropriate authorities.</li>
                  <li>Ensure that all contracts, agreements, and legal documents are prepared and executed in compliance with applicable laws.</li>
                  <li>Provide clients with clear and accurate information about their legal rights and obligations in transactions.</li>
                  <li>Avoid engaging in or condoning any form of illegal or unethical behavior, including discrimination, harassment, or corruption.</li>
                  <li>Ensure that all advertising and marketing practices comply with legal and ethical standards.</li>
                  <li>Refrain from making false or misleading statements about competitors or their services.</li>
                  <li>Maintain a thorough understanding of property law and regulations to provide accurate advice and guidance to clients.</li>
                  <li>Ensure that all agreements and transactions are fully documented and legally binding.</li>
                  <li>Avoid any practices that could undermine the integrity or credibility of the real estate profession.</li>
                  <li>Act in accordance with the principles of fairness, equity, and justice in all professional dealings.</li>
                  <li>Ensure that all professional activities are conducted in a manner that promotes public trust and confidence.</li>
                  <li>Avoid any actions that could lead to conflicts of interest or compromise ethical standards.</li>
                  <li>Seek legal or professional advice when necessary to ensure compliance with laws and regulations.</li>
                  <li>Ensure that all professional communications are clear, accurate, and not misleading.</li>
                  <li>Respect the rights and interests of all parties in a transaction, including tenants, landlords, buyers, and sellers.</li>
                  <li>Promote ethical standards and practices within the real estate profession through education and advocacy.</li>
                </ol>
              </li>
              <li>
                <span className="ethics-heading">Respect for Colleagues</span>
                <ol className="ethics-sub-list ml-6">
                  <li>Treat all colleagues and other professionals with respect, fairness, and courtesy.</li>
                  <li>Refrain from making false or derogatory statements about other brokers or professionals.</li>
                  <li>Foster a spirit of cooperation and professionalism within the industry.</li>
                  <li>Respect the intellectual property and proprietary information of colleagues and competitors.</li>
                  <li>Avoid engaging in practices that could harm the reputation or credibility of other professionals.</li>
                  <li>Collaborate with colleagues to promote ethical standards and best practices within the industry.</li>
                  <li>Recognize and respect the contributions and expertise of other professionals in the field.</li>
                  <li>Avoid engaging in unfair competition practices that undermine the integrity of the profession.</li>
                  <li>Respect the rights and obligations of other professionals in a transaction.</li>
                  <li>Provide accurate and honest references and recommendations for colleagues when requested.</li>
                  <li>Do not interfere with the contractual relationships between other brokers and their clients.</li>
                  <li>Engage in constructive dialogue with colleagues to resolve disputes or disagreements.</li>
                  <li>Promote a culture of diversity, inclusion, and mutual respect within the profession.</li>
                  <li>Refrain from poaching clients or employees from other brokers or firms without proper justification.</li>
                  <li>Acknowledge and give credit to the work and contributions of other professionals.</li>
                  <li>Avoid making unsubstantiated claims about the capabilities or qualifications of other professionals.</li>
                  <li>Respect the confidentiality of information shared by colleagues and other professionals.</li>
                  <li>Work collaboratively with other professionals to achieve the best outcomes for clients.</li>
                </ol>
              </li>
            </ol>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openDialog === "termsAndConditions"} onOpenChange={closeDialog}>
        <DialogContent className="w-full sm:max-w-3xl h-[100vh] sm:max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>NAR India Terms and Conditions</DialogTitle>
            <DialogDescription>Please read the complete Terms and Conditions below</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <h3 className="font-bold mt-4">1. Eligibility</h3>
            <ul className="list-disc ml-6">
              <li>Open to individual real estate professionals, including:
                <ul className="list-disc ml-6">
                  <li>Brokers, agents, and consultants</li>
                  <li>Students and new entrants</li>
                  <li>Independent professionals</li>
                  <li>Those in areas without local NAR-India associations</li>
                </ul>
              </li>
              <li>Also available (with higher fee) in regions with an existing city association</li>
            </ul>
            <h3 className="font-bold mt-4">2. Membership Fee and Validity</h3>
            <ul className="list-disc ml-6">
              <li>Annual Fee:
                <ul className="list-disc ml-6">
                  <li>₹5,000 where no local association exists</li>
                  <li>₹10,000 where a local association is present</li>
                </ul>
              </li>
              <li>Membership is valid for one year from the date of payment</li>
            </ul>
            <h3 className="font-bold mt-4">3. Application and Documentation</h3>
            <ul className="list-disc ml-6">
              <li>Registration must be completed via the official NAR-India App or platform</li>
              <li>The following documents are mandatory:
                <ul className="list-disc ml-6">
                  <li>Government-issued ID proof</li>
                  <li>Proof of residence</li>
                  <li>Proof of real estate profession (RERA registration, license, or other)</li>
                  <li>Declaration & Affidavit of adherence to the Code of Ethics</li>
                  <li>Legal compliance declaration (no criminal/unethical record)</li>
                </ul>
              </li>
            </ul>
            <h3 className="font-bold mt-4">4. Member Benefits</h3>
            <ul className="list-disc ml-6">
              <li>Access to:
                <ul className="list-disc ml-6">
                  <li>Real estate training, certifications, and industry knowledge resources</li>
                  <li>NAR-India webinars, workshops, and professional events</li>
                  <li>Monthly newsletters and best practices guides</li>
                  <li>A welcome kit, lapel pin, and digital membership certificate</li>
                </ul>
              </li>
            </ul>
            <h3 className="font-bold mt-4">5. Rights and Limitations</h3>
            <ul className="list-disc ml-6">
              <li>Subscription Members:
                <ul className="list-disc ml-6">
                  <li>Are not entitled to vote</li>
                  <li>Do not hold any representation on the Governing Body</li>
                  <li>Cannot hold leadership positions in NAR-India</li>
                </ul>
              </li>
            </ul>
            <h3 className="font-bold mt-4">6. Compliance Requirements</h3>
            <ul className="list-disc ml-6">
              <li>Ethics Course completion is mandatory (whenever the course is rolled out)</li>
              <li>Members must:
                <ul className="list-disc ml-6">
                  <li>Uphold the NAR-India Code of Ethics</li>
                  <li>Comply with all rules, policies, and MOA as issued from time to time</li>
                  <li>Maintain integrity and professionalism in all real estate dealings</li>
                </ul>
              </li>
            </ul>
            <h3 className="font-bold mt-4">7. Validity, Renewal, and Disciplinary Action</h3>
            <ul className="list-disc ml-6">
              <li>Membership must be renewed annually to remain active</li>
              <li>Any non-compliance or ethical breach may result in:
                <ul className="list-disc ml-6">
                  <li>Suspension or termination of membership</li>
                  <li>Revocation of member benefits and access</li>
                </ul>
              </li>
            </ul>
            <h3 className="font-bold mt-4">8. Amendments and Legal Jurisdiction</h3>
            <ul className="list-disc ml-6">
              <li>Terms may be amended at NAR-India's discretion and communicated officially</li>
              <li>Governed by applicable Indian laws; jurisdiction lies within India</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
