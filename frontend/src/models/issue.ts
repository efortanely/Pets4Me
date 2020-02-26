export interface Milestone {
  due_date?: any
  project_id: number
  state: string
  description: string
  iid: number
  id: number
  title: string
  created_at: Date
  updated_at: Date
}

export interface Author {
  state: string
  web_url: string
  avatar_url?: any
  username: string
  id: number
  name: string
}

export interface Assignee {
  avatar_url?: any
  web_url: string
  state: string
  username: string
  id: number
  name: string
}

export interface Assignee2 {
  avatar_url?: any
  web_url: string
  state: string
  username: string
  id: number
  name: string
}

export interface ClosedBy {
  state: string
  web_url: string
  avatar_url?: any
  username: string
  id: number
  name: string
}

export interface References {
  short: string
  relative: string
  full: string
}

export interface TimeStats {
  time_estimate: number
  total_time_spent: number
  human_time_estimate?: any
  human_total_time_spent?: any
}

export interface Links {
  self: string
  notes: string
  award_emoji: string
  project: string
}

export interface TaskCompletionStatus {
  count: number
  completed_count: number
}

export interface Issue {
  project_id: number
  milestone: Milestone
  author: Author
  description: string
  state: string
  iid: number
  assignees: Assignee[]
  assignee: Assignee2
  labels: string[]
  upvotes: number
  downvotes: number
  merge_requests_count: number
  id: number
  title: string
  updated_at: Date
  created_at: Date
  closed_at: Date
  closed_by: ClosedBy
  user_notes_count: number
  due_date: string
  web_url: string
  references: References
  time_stats: TimeStats
  has_tasks: boolean
  task_status: string
  confidential: boolean
  discussion_locked: boolean
  _links: Links
  task_completion_status: TaskCompletionStatus
}
