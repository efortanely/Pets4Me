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
    this.fetchObjectsPage(pageNumber)
        .then(this.updatePage)
        .catch(console.log)
  }

  getSearchParam = (): string => {
    return this.state.searchParams.get('search') || ''
  }

  noResults() {
    return <h5 className='left-align'>No results found for selected filters.</h5>
  }

  render() {
    return (
      <Container fluid>
        {
        this.state.loading ? <Spinner animation='border'><span className='sr-only'>Loading</span></Spinner> : 
        (<div>
          <h3 className='left-align'>{this.state.page.num_results} results</h3>
        { this.getInfoCards() }
        </div>)}
        {!isNullOrUndefined(this.state.page?.objects) && this.state.page.objects.length !== 0 && <Paginator active={this.state.pageNumber} numPages={ Math.max(this.state.page.total_pages, 1)} pathName={this.getPathName()} onPageChange={this.onPageChange}/>}
        {(isNullOrUndefined(this.state.page?.objects) || this.state.page.objects.length === 0) && !this.state.loading && this.noResults()}
      </Container>
    )
  }

  getInfoCards = (): JSX.Element[] => {
    return this.state.page.objects.map(this.createInfoCard)
  }

  fetchObjectsPage = (pageNumber: number): Promise<ObjectsPage<T>> => {
    const modelInstanceService: ModelInstanceService<T> = this.getModelInstanceService()
    return modelInstanceService.getModelPageOfInstances(pageNumber, 
      { 
        resultsPerPage: this.props.itemsPerPage,
        search: this.getSearchParam(), 
        filterString: this.props.filterString
      })
  }

  abstract getModelInstanceService(): ModelInstanceService<T>

  abstract createInfoCard(o: T, key: any): JSX.Element

  getPathName = (): string => {
    return this.props.history?.location.pathname || '/'
  }
}

export default InfoCards