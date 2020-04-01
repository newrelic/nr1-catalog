import React from 'react'
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react'
import { Styled } from 'theme-ui'

export default class ProcessTimeline extends React.PureComponent {

    render() {
        return (
          <Styled.root>
            <div className="timelineContainer">
                <Timeline lineColor={'#ddd'}>
                  <TimelineItem
                    key="001"
                    dateText="1: Pre PR"
                    dateInnerStyle={{ background: '#20A4F3' }}
                    style={{ color: '#20A4F3' }}>
                    <Styled.h2>Before Developer submits a PR</Styled.h2>
                    <Styled.h3>Actor(s)</Styled.h3>
                    <Styled.ul className="timelineKey">
                      <li style={{backgroundColor: '#20A4F3'}}>Developer</li>
                    </Styled.ul>
                    <Styled.h3>Step(s)</Styled.h3>
                    <Styled.p>
                      <img src="https://github.com/newrelic/nr1-catalog/blob/master/docs/docs/images/screenshot01.png?raw=true" style={{width:'95%'}} />
                    </Styled.p>
                    <Styled.ul>
                      <li><strong>Developer</strong> <Styled.a href="https://help.github.com/en/github/getting-started-with-github/fork-a-repo">forks</Styled.a> the <strong><Styled.a href="https://github.com/newrelic/nr1-catalog">nr1-catalog</Styled.a></strong> repository</li>
                      <li><strong>Developer</strong> reviews <Styled.a href="#">documentation</Styled.a> on this website</li>
                      <li><strong>Developer</strong> preps their nerdpack based on the PR checklist to either <Styled.a href="add-checklist">add</Styled.a> or <Styled.a href="update-checklist">update</Styled.a> code</li>
                      <li><strong>Developer</strong> adds that repository as a <Styled.a href="https://git-scm.com/book/en/v2/Git-Tools-Submodules">git submodule</Styled.a> under the <strong>apps</strong> directory in the following manner:</li>
                    </Styled.ul>
                    <Styled.p>
                    <Styled.pre>
                      <code>
                        # assumed state: checked out nr1-catalog<br/>
                        cd apps<br/>
                        git submodule add [YOUR REPO]<br/>
                        # example: git submodule add https://github.com/newrelic/nr1-browser-analyzer.git
                      </code>
                    </Styled.pre>
                    </Styled.p>
                    <Styled.p><em>Note: You must use an <strong>https</strong> URL for the git repository versus the <strong>ssh</strong> URL.</em></Styled.p>
                    <Styled.h3>Outcomes</Styled.h3>
                    <Styled.ul>
                      <li>
                      Nerdpack repository is prepared for a Pull Request to the <strong>newrelic/nr1-catalog</strong> repository.
                      </li>
                    </Styled.ul>
                    <Styled.h3>Next Step(s)</Styled.h3>
                    <Styled.ul>
                      <li>Submitting a Pull Request to the <strong>newrelic/nr1-catalog</strong> repository</li>
                    </Styled.ul>
                  </TimelineItem>
                  <TimelineItem
                    key="002"
                    dateText="2: Submit PR"
                    dateInnerStyle={{ background: '#20A4F3' }}
                    style={{ color: '#20A4F3' }}>
                    <Styled.h2>Developer submits a PR</Styled.h2>
                    <Styled.h3>Actor(s)</Styled.h3>
                    <Styled.ul className="timelineKey">
                      <li style={{backgroundColor: '#20A4F3'}}>Developer</li>
                    </Styled.ul>
                    <Styled.h3>Step(s)</Styled.h3>
                    <Styled.p>
                      <img src="https://help.github.com/assets/images/help/pull_requests/pull-request-start-review-button.png" style={{maxWidth:'50%'}} />
                    </Styled.p>
                    <Styled.p>
                    In this phase, the <strong>Developer</strong> <Styled.a href="https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork">submits a pull request</Styled.a> from <em>their</em> forked instance of the <strong>nr1-catalog</strong> to <strong>newrelic/nr1-catalog</strong> repository.
                    </Styled.p>
                    <Styled.h3>Outcomes</Styled.h3>
                    <Styled.ul>
                      <li>PR is structurally verified via <Styled.a href="https://github.com/newrelic/nr1-catalog/tree/master/.github/workflows">automation</Styled.a> in <strong>newrelic/nr1-catalog</strong> </li>
                      <li>Nerdpack is ready for the <strong>Verify</strong> phase</li>
                      <li><strong>Developer</strong> can track the status and queue depth of their Pull Request in GitHub</li>
                    </Styled.ul>
                    <Styled.h3>Next Step(s)</Styled.h3>
                    <Styled.ul>
                      <li><strong>Maintainers</strong> and <strong>Reviewers</strong> execute a multi-phased review of the Nerdpack</li>
                    </Styled.ul>
                  </TimelineItem>
                  <TimelineItem
                    key="003"
                    dateText="3: Verify"
                    dateInnerStyle={{ background: '#3357B2' }}
                    style={{ color: '#3357B2' }}>
                    <Styled.h2>Verify the Nerdpack</Styled.h2>
                    <Styled.h3>Actor(s)</Styled.h3>
                    <Styled.ul className="timelineKey">
                      <li style={{backgroundColor: '#20A4F3'}}>Developer</li>
                      <li style={{backgroundColor: '#F44708'}}>Reviewer</li>
                      <li style={{backgroundColor: '#3357B2'}}>Maintainer</li>
                    </Styled.ul>
                    <Styled.h3>Step(s)</Styled.h3>
                    <Styled.p>
                      <img src="https://help.github.com/assets/images/help/pull_requests/pull-request-review-statuses.png" style={{maxWidth:'95%'}} />
                    </Styled.p>

                    <Styled.p>Based on the level of change (new Nerdpacks require more verification), <strong>Maintainers</strong> shepherd the submitted nerdpack (submitted to the <strong>newrelic/nr1-catalog</strong> repository as a <em>git submodulev</em>) through a number of standards set by expert <strong>Reviewers</strong>. This phase can take hours or days, depending on the size of the Nerdpack and level of change.
                    </Styled.p>
                    <Styled.p>Verification covers the following
                      <Styled.ul>
                        <li>Security verification</li>
                        <li>Code verification</li>
                        <li>Design verification</li>
                        <li>Documentation verification</li>
                      </Styled.ul>
                    </Styled.p>
                    <Styled.p>In each phase, remedian may be requested and/or required of the <strong>Developer</strong> by the <strong>Reviewer(s)</strong>, as communicated through the GitHub Pull Request.</Styled.p>
                    <Styled.h3>Outcomes</Styled.h3>
                    <Styled.ul>
                      <li>Pull Request is rejected and closed</li>
                      <li>Pull Request is ready for <strong>Approval</strong> and merge to master</li>
                    </Styled.ul>
                  </TimelineItem>
                  <TimelineItem
                    key="004"
                    dateText="4: Approval"
                    dateInnerStyle={{ background: '#FAA613' }}
                    style={{ color: '#FAA613' }}>
                    <Styled.h2>Final Approval of the Nerdpack</Styled.h2>
                    <Styled.h3>Stakeholders</Styled.h3>
                    <Styled.ul className="timelineKey">
                      <li style={{backgroundColor: '#FAA613'}}>Approver</li>
                      <li style={{backgroundColor: '#3357B2'}}>Maintainer</li>
                    </Styled.ul>
                    <Styled.h3>Step(s)</Styled.h3>
                    <Styled.p>
                      <img src="https://i.stack.imgur.com/0WXlq.gif" style={{maxWidth:'95%'}} />
                    </Styled.p>
                    <Styled.ul>
                      <li><strong>Maintainer</strong> requests via GitHub Pull Request Review features for <strong>Approver</strong> to provide official sign off</li>
                      <li><strong>Approver</strong> indicates approval via GitHub Pull Request Review features approval for deployment</li>
                    </Styled.ul>
                    <Styled.h3>Outcomes</Styled.h3>
                    <Styled.ul>
                      <li>Approved, accepted Pull Request</li>
                    </Styled.ul>
                  </TimelineItem>
                  <TimelineItem
                    key="005"
                    dateText="5: Deployment"
                    dateInnerStyle={{ background: '#3357B2' }}
                    style={{ color: '#3357B2' }}>
                    <Styled.h2>Deployment to the New Relic One Catalog</Styled.h2>
                    <Styled.h3>Actor(s)</Styled.h3>
                    <Styled.ul className="timelineKey">
                      <li style={{backgroundColor: '#3357B2'}}>Maintainer</li>
                    </Styled.ul>
                    <Styled.h3>Step(s)</Styled.h3>
                    <Styled.p>
                      <img src="https://i.stack.imgur.com/lnBI8.png" style={{ width: '95%'}} />
                    </Styled.p>
                    <Styled.p>Once approved, the <strong>Maintainer</strong> will merge the nerdpack (attached as a git submodule) to the master branch of <strong>newrelic/nr1-catalog</strong>, and automation will perform the following:
                    <Styled.ul>
                      <li>Build the application</li>
                      <li>Assign/retrieve the application's global catalog uuid</li>
                      <li>Publish the application to New Relic One</li>
                      <li>Update the New Relic One Catalog service with the application's metadata</li>
                    </Styled.ul>
                    </Styled.p>
                  </TimelineItem>
                </Timeline>

            </div>
            </Styled.root>

        )
    }
}