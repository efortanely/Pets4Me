import React from "react";
import { ObjectsPage } from "../../../models/ObjectsPage";
import Spinner from "react-bootstrap/Spinner";
import Paginator from "../Paginator";

interface InfoCardsProps { pageNumber: number }
interface InfoCardsState<T> { pageNumber: number, page: ObjectsPage<T>, loading: boolean }

abstract class InfoCards<T> extends React.Component<InfoCardsProps, InfoCardsState<T>> {
  static defaultProps = {
    pageNumber: 1
  }

  constructor(props: InfoCardsProps) {
    super(props)
    this.state = {
        pageNumber: props.pageNumber,
        page: { objects: [] as T[] } as ObjectsPage<T>,
        loading: true
    }
  } 

  componentDidMount() {
    this.fetchObjectsPage(this.props.pageNumber)
        .then(this.updatePage)
        .catch(console.log)
  }

  updatePage = (newPage: ObjectsPage<T>) => {
    this.setState({ page: newPage, loading: false})
  }

  onPageChange = (pageNumber: number) => {
    this.setState({ loading: true })
    this.fetchObjectsPage(pageNumber)
        .then(this.updatePage)
        .catch(console.log)
  }

  render() {
    return (
      <div className='cards'>
        {this.state.loading ? <Spinner animation='border'><span className='sr-only'>Loading...</span></Spinner> : this.state.page.objects.map(this.createInfoCard) }
        <Paginator active={this.state.pageNumber} numPages={this.state.page.total_pages} pathName={this.getPathName()} onPageChange={this.onPageChange}/>
      </div>
    )
  }

  abstract fetchObjectsPage(pageNumber: number): Promise<ObjectsPage<T>>

  abstract createInfoCard(o: T, key: any): JSX.Element

  abstract getPathName(): string
}

export default InfoCards