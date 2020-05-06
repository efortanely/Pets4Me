import React from "react";
import { IssuesStatistics } from "../../models/IssueStatistics";
import { Commit } from "../../models/Commit";
import { Issue } from "../../models/Issue";
import { Contributor } from "../../models/Contributor";
import ApiService from "./ApiService";

export class GitlabApiService extends ApiService {
  constructor() {
    const project_id: string = "16969987";
    super("https://gitlab.com/api/v4/projects/" + project_id);
  }

  getIssuesStatistics(): Promise<IssuesStatistics> {
    return this.fetchJsonAsObject<IssuesStatistics>("issues_statistics", {
      scope: "all",
    });
  }

  async getAllCommits(): Promise<Commit[]> {
    let res: Commit[] = [];
    let commits: Commit[] = [];
    let pageNumber: number = 1;
    do {
      res = await this.fetchJsonAsObject<Commit[]>("repository/commits", {
        ref_name: "dev",
        per_page: 100,
        page: pageNumber,
      });
      commits.push(...res);
      pageNumber++;
    } while (res.length > 0);

    return Promise.resolve(commits);
  }

  getContributors(): Promise<Contributor[]> {
    return this.fetchJsonAsObject<Contributor[]>("repository/contributors", {});
  }

  getIssuesByAssignee(assignee_username: string): Promise<Issue[]> {
    return this.fetchJsonAsObject<Issue[]>("issues", {
      assignee_username: assignee_username,
      per_page: 99,
    });
  }
}

const gitlabApiService: GitlabApiService = new GitlabApiService();

const GitlabApiServiceContext = React.createContext<GitlabApiService>(
  gitlabApiService
);

export default GitlabApiServiceContext;
