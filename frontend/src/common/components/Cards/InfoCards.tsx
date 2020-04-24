import React from "react";
import { ObjectsPage } from "../../../models/ObjectsPage";
import Spinner from "react-bootstrap/Spinner";
import Paginator from "../Paginator";
import { isNullOrUndefined } from "util";
import { RouteComponentProps } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import ModelInstanceService from "../../services/ModelInstanceService";
import './InfoCards.css'

interface InfoCardsProps extends Partial<RouteComponentProps> { pageNumber: number, filterString: string, itemsPerPage: number }
interface InfoCardsState<T> { pageNumber: number, page: ObjectsPage<T>, loading: boolean, searchParams: URLSearchParams }

abstract class InfoCards<T> extends React.Component<InfoCardsProps, InfoCardsState<T>> {
  static defaultProps = {
    pageNumber: 1,
    itemsPerPage: 12,
    filterString: ''
  }

  constructor(props: InfoCardsProps) {
    super(props)
    this.state = {
        pageNumber: props.pageNumber,
        page: { objects: [] as T[], total_pages: 0} as ObjectsPage<T>,
        loading: true,
        searchParams: new URLSearchParams(this.props.location?.search)
    }
    this.props.history?.listen((location) => {
      this.setState({ searchParams: new URLSearchParams(location.search), pageNumber: 1 }, () => this.onPageChange(1))
    })
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
    if (pageNumber * this.props.itemsPerPage > this.state.page.objects.length) {
      this.fetchObjectsPage(pageNumber)
          .then(this.updatePage)
          .catch(console.log)
    }
  }

  getSearchParam = (): string => {
    return this.state.searchParams.get('search') || ''
  }

  noResults() {
    return <h5>No results found for selected filters.</h5>
  }

  render() {
    return (
      <Container fluid>
        {
        this.state.loading ? <Spinner animation='border'><span className='sr-only'>Loading...</span></Spinner> : 
        (<div>
          <h3>{this.state.page.num_results} results</h3>
        { this.getInfoCards() }
        </div>)}
        {!isNullOrUndefined(this.state.page?.objects) && this.state.page.objects.length !== 0 && <Paginator active={this.state.pageNumber} numPages={ Math.max(this.state.page.total_pages * this.pagesPerObjectPage(), 1)} pathName={this.getPathName()} onPageChange={this.onPageChange}/>}
        {(isNullOrUndefined(this.state.page?.objects) || this.state.page.objects.length === 0) && this.noResults()}
      </Container>
    )
  }

  getInfoCards = (): JSX.Element[] => {
    let startIndex: number = this.state.pageNumber % this.pagesPerObjectPage()
    return this.state.page.objects.slice(startIndex, startIndex + this.props.itemsPerPage).map(this.createInfoCard)
  }

  pagesPerObjectPage = (): number => {
    return Math.ceil(this.state.page.objects.length / this.props.itemsPerPage)
  }

  fetchObjectsPage = (pageNumber: number): Promise<ObjectsPage<T>> => {
    const modelInstanceService: ModelInstanceService<T> = this.getModelInstanceService()
    return modelInstanceService.getModelPageOfInstances(pageNumber, this.getSearchParam(), this.props.filterString)
  }

  abstract getModelInstanceService(): ModelInstanceService<T>

  abstract createInfoCard(o: T, key: any): JSX.Element

  getPathName = (): string => {
    return this.props.history?.location.pathname || '/'
  }
}

export default InfoCards