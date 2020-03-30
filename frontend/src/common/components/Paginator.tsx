import React from 'react'
import UltimatePaginationBootstrap4 from 'react-ultimate-pagination-bootstrap-4'

interface PaginatorProps { active: number, numPages: number, pathName: string, maxItems: number}
interface PaginatorState { active: number, numPages: number }

class Paginator extends React.Component<PaginatorProps, PaginatorState> {
  static defaultProps = {
    active: 1,
    numPages: 1,
    pathName: '',
    maxItems: 1
  }

  constructor(props: PaginatorProps) {
    super(props)
    this.state = {
      active: 1,
      numPages: 1
    }
  }

  componentDidMount() {
    this.setState({
      active: this.props.active,
      numPages: this.props.numPages
    })
  }
  
  render() {
    return (
        <UltimatePaginationBootstrap4 
        currentPage={this.state.active} 
        totalPages={this.state.numPages} 
        siblingPagesRange={1} 
        onChange={this.onPageChange} />

    )
  }

  onPageChange = (page: number) => {
    this.setState({active: page});
  }
}

export default Paginator