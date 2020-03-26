import React from 'react'
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react'

export default class ProcessTimeline extends React.PureComponent {

    render() {
        return (
            <div className="timelineContainer">
                <div className="header">
                    <h1>Submitting Code to the New Relic One Catalog</h1>
                    <h4>Phase Ownership Key</h4>
                    <ul className="timelineKey">
                        <li style={{backgroundColor: '#20A4F3'}}>Developer</li>
                        <li style={{backgroundColor: '#FAA613'}}>Approver</li>
                        <li style={{backgroundColor: '#F44708'}}>Reviewer</li>
                        <li style={{backgroundColor: '#3357B2'}}>Maintainer</li>
                    </ul>
                </div>
                <Timeline lineColor={'#ddd'}>
                  <TimelineItem
                    key="001"
                    dateText="Pre PR"
                    dateInnerStyle={{ background: '#20A4F3' }}
                    style={{ color: '#20A4F3' }}>
                    <h2>Before Developer submits a PR</h2>
                    <h3>Stakeholders</h3>
                    <ul className="timelineKey">
                      <li style={{backgroundColor: '#20A4F3'}}>Developer</li>
                    </ul>
                    <h3>Description</h3>
                    <p>
                    <strong>Developer</strong> <a href="https://help.github.com/en/github/getting-started-with-github/fork-a-repo">forks</a> the <strong><a href="https://github.com/newrelic/nr1-catalog">nr1-catalog</a></strong> repository, reviews <a href="/">documentation</a> on this website as well as the <a href="/add-checklist">PR checklist</a>, preps their nerdpack, and adds that repository as a <a href="https://git-scm.com/book/en/v2/Git-Tools-Submodules">git submodule</a> under the <strong>apps</strong> directory.
                    </p>
                    <p>
                    <code>
                      #checked out nr1-catalog<br/>
                      cd apps<br/>
                      git submodule add [YOUR REPO]<br/>
                    </code>
                    </p>
                    <h3>Outcomes</h3>
                    <ul>
                      <li>
                      Nerdpack repository is prepared for a Pull Request to the <strong>nr1-catalog</strong> repository.
                      </li>
                    </ul>
                    <h3>Next Step(s)</h3>
                    <ul>
                      <li>Submitting a Pull Request to the <strong>nr1-catalog</strong> repository</li>
                    </ul>
                  </TimelineItem>
                  <TimelineItem
                    key="002"
                    dateText="Submit PR"
                    dateInnerStyle={{ background: '#20A4F3' }}
                    style={{ color: '#20A4F3' }}>
                    <h2>Developer submits a PR</h2>
                    <h3>Stakeholders</h3>
                    <ul className="timelineKey">
                      <li style={{backgroundColor: '#20A4F3'}}>Developer</li>
                    </ul>
                    <h3>Description</h3>
                    <p>
                    In this phase, the <strong>Developer</strong> submits a pull request to <strong>nr1-catalog</strong> repository.
                    </p>
                    <h3>Outcomes</h3>
                    <ul>
                      <li>PR is structurally verified via automation</li>
                      <li>Nerdpack is ready for the review phase</li>
                      <li><strong>Developer</strong> can track the status and queue depth of their Pull Request in GitHub</li>
                    </ul>
                    <h3>Next Step(s)</h3>
                    <ul>
                      <li><strong>Maintainers</strong> and <strong>Reviewers</strong> execute a multi-phased review of the Nerdpack</li>
                    </ul>
                  </TimelineItem>
                  <TimelineItem
                    key="003"
                    dateText="Review"
                    dateInnerStyle={{ background: '#3357B2' }}
                    style={{ color: '#3357B2' }}>
                    <h2>Review of the Nerdpack</h2>
                    <h3>Stakeholders</h3>
                    <ul className="timelineKey">
                      <li style={{backgroundColor: '#20A4F3'}}>Developer</li>
                      <li style={{backgroundColor: '#F44708'}}>Reviewer</li>
                      <li style={{backgroundColor: '#3357B2'}}>Maintainer</li>
                    </ul>
                    <h3>Description</h3>
                    <p>Based on the level of change (new Nerdpacks require more review), <strong>Maintainers</strong> shepherd the submitted nerdpack (added to the <strong>nr1-catalog</strong> repository as a git submodule) through a number of standards set by expert <strong>Reviewers</strong>. This phase can take hours or days, depending on the size of the Nerdpack and level of change.
                    </p>
                    <p>Reviews cover the following
                      <ul>
                        <li>Security review</li>
                        <li>Code review</li>
                        <li>Design review</li>
                        <li>Documentation review</li>
                      </ul>
                    </p>
                    <p>In each phase, remedian may be requested and/or required of the <strong>Developer</strong> by the <strong>Reviewer(s)</strong>, as communicated through the GitHub Pull Request.</p>
                    <h3>Outcomes</h3>
                    <ul>
                      <li>Pull Request is rejected and closed</li>
                      <li>Pull Request is ready for <strong>Approval</strong> and merge to master</li>
                    </ul>
                  </TimelineItem>
                  <TimelineItem
                    key="004"
                    dateText="Approval"
                    dateInnerStyle={{ background: '#FAA613' }}
                    style={{ color: '#FAA613' }}>
                    <h2>Final Approval of the Nerdpack</h2>
                    <h3>Stakeholders</h3>
                    <ul className="timelineKey">
                      <li style={{backgroundColor: '#FAA613'}}>Approver</li>
                      <li style={{backgroundColor: '#3357B2'}}>Maintainer</li>
                    </ul>
                    <h3>Description</h3>
                    <ul>
                      <li><strong>Maintainer</strong> requests via GitHub Pull Request Review features for <strong>Approver</strong> to provide official sign off</li>
                      <li><strong>Approver</strong> indicates approval via GitHub Pull Request Review features approval for deployment</li>
                    </ul>
                    <h3>Outcomes</h3>
                    <ul>
                      <li>Approved, accepted Pull Request</li>
                    </ul>
                  </TimelineItem>
                  <TimelineItem
                    key="005"
                    dateText="Deployment"
                    dateInnerStyle={{ background: '#3357B2' }}
                    style={{ color: '#3357B2' }}>
                    <h2>Deployment to the New Relic One Catalog</h2>
                    <h3>Stakeholders</h3>
                    <ul className="timelineKey">
                      <li style={{backgroundColor: '#3357B2'}}>Maintainer</li>
                    </ul>
                    <h3>Description</h3>
                    <p>Once approved, the <strong>Maintainer</strong> will merge the nerdpack (attached as a git submodule) to the master branch of <strong>nr1-catalog</strong>, and automation will perform the following:
                    <ul>
                      <li>Build the application</li>
                      <li>Assign/retrieve the application's global catalog uuid</li>
                      <li>Publish the application</li>
                      <li>Update the NR1 Catalog service with the application's metadata</li>
                    </ul>
                    </p>
                  </TimelineItem>
                </Timeline>

            </div>

        )
    }
}