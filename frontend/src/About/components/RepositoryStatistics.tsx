import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlask } from "@fortawesome/free-solid-svg-icons";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import GitlabApiServiceContext, {
  GitlabApiService,
} from "../../common/services/GitlabApiService";
import { IssuesStatistics } from "../../models/IssueStatistics";
import { Commit } from "../../models/Commit";
import "../About.css";

type RepositoryStatisticsProps = { testSum: number };
type RepositoryStatisticsState = {
  issuesStatistics: IssuesStatistics;
  commits: Commit[];
  commitCount: number;
};

export class RepositoryStatistics extends React.Component<
  RepositoryStatisticsProps,
  RepositoryStatisticsState
> {
  static contextType = GitlabApiServiceContext;

  constructor(props: any) {
    super(props);
    this.state = {
      issuesStatistics: {
        statistics: { counts: { all: 0, closed: 0, opened: 0 } },
      },
      commits: [],
      commitCount: 0,
    };
  }

  componentDidMount() {
    const gitlabApiService: GitlabApiService = this.context;
    gitlabApiService
      .getIssuesStatistics()
      .then((res) => this.setState({ issuesStatistics: res }));

    this.getCommitCount(gitlabApiService);

    // TODO make a test containing this line that will check that the number of names returned by the endpoint stays constant.
    // gitlabApiService.getCommits()
    // .then(res => {
    //   let names = new Set<String>(res.map(commit: => commit.author_name))
    // })

    // .then(res => this.setState( { commits: res } ))
  }

  getCommitCount(gitlabApiService: GitlabApiService) {
    gitlabApiService.getCommits().then((res) => {
      let count = (res as Commit[]).length;
      this.setState({ commitCount: count });
    });
  }

  render() {
    return (
      <div className="repo-stats">
        <h3>Repository Statistics</h3>
        <div className="circles">
          <div className="row">
            <FontAwesomeIcon
              className="icon"
              icon={faCodeBranch}
              color="#528C8B"
              size="1x"
            />
            <div className="circle">{this.state.commitCount}</div>
            <p>Total No. Commits</p>
          </div>
          <div className="row">
            <FontAwesomeIcon
              className="icon"
              icon={faExclamationCircle}
              color="#528C8B"
              size="1x"
            />
            <div className="circle">
              {this.state.issuesStatistics.statistics.counts.all}
            </div>
            <p>Total No. Issues⠀ ⠀</p>
          </div>
          <div className="row">
            <FontAwesomeIcon
              className="icon"
              icon={faFlask}
              color="#528C8B"
              size="1x"
            />
            <div className="circle">{this.props.testSum}</div>
            <p>Total No. Unit Tests</p>
          </div>
        </div>
      </div>
    );
  }
}
