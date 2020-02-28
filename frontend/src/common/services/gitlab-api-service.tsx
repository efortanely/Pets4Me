import { IssuesStatistics } from '../../models/issues-statistics'
import { Commit } from '../../models/commit'
import { Issue } from '../../models/issue'
import React from 'react'
import { Contributor } from '../../models/contributor';

export class GitlabApiService {
  api_url: string = "https://gitlab.com/api/v4"
  project_id: string = "16969987"

  buildUrl(path: string, params: any): string {

    var query_string = Object.keys(params).map((key) => {
      return '?' + encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    }).join('&');

    return `${this.api_url}/projects/${this.project_id}/${path}${query_string}`
  }

  getIssuesStatistics(): Promise<any> {
    return fetch(this.buildUrl('issues_statistics', { scope: 'all' }))
        .then(res => res.json() as Promise<IssuesStatistics>)
        .catch(console.log)
  }

  getCommits(): Promise<any> {
    return fetch(this.buildUrl('repository/commits', { ref_name: 'master' }))
        .then(res => res.json() as Promise<Commit[]>)
        .catch(console.log)
  }

  getContributors(): Promise<any> {
    return fetch(this.buildUrl("repository/contributors", { }))
        .then(res => res.json() as Promise<Contributor[]>)
        .catch(console.log)
  }

  getIssuesByAuthor(author_username: string): Promise<any> {
    return fetch(this.buildUrl('issues', { author_username: author_username }))
        .then(res => res.json() as Promise<Issue[]>)
        .catch(console.log)
  }
}

const gitlabApiService: GitlabApiService = new GitlabApiService()

const GitlabApiServiceContext = React.createContext<GitlabApiService>(gitlabApiService)

export default GitlabApiServiceContext