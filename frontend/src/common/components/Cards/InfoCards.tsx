import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Paginator from "../Paginator";
import Button from 'react-bootstrap/Button';
import compare from '../../../static/compare.png'
import Container from "react-bootstrap/Container";
import ModelInstanceService from "../../services/ModelInstanceService";
import Modal from 'react-modal'
import { isNullOrUndefined } from "util";
import { ObjectsPage } from "../../../models/ObjectsPage";
import { RouteComponentProps } from 'react-router-dom';
import './InfoCards.css'
import { Row } from "react-bootstrap";

interface InfoCardsProps extends Partial<RouteComponentProps> { pageNumber: number, filterString: string, itemsPerPage: number }
interface InfoCardsState<T> { pageNumber: number, page: ObjectsPage<T>, loading: boolean, modalIsOpen: boolean, searchParams: URLSearchParams, cardsToCompare: JSX.Element[] }

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
        modalIsOpen: false,
        searchParams: new URLSearchParams(this.props.location?.search),
        cardsToCompare: []
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addToCompare = this.addToCompare.bind(this);
    this.props.history?.listen((location) => {
      this.setState({ searchParams: new URLSearchParams(location.search), pageNumber: 1 }, () => this.loadPage(1))
    })
  }

  componentDidMount() {
    Modal.setAppElement('#mainContent')
    this.fetchObjectsPage(this.props.pageNumber)
        .then(this.updatePage)
        .catch(console.log)
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.filterString !== prevProps.filterString) {
        this.loadPage(1)
    }
}

  updatePage = (newPage: ObjectsPage<T>) => {
    this.setState({ page: newPage, loading: false})
  }

  onPageChange = (pageNumber: number) => {
    this.loadPage(pageNumber)
  }

  loadPage = (pageNumber: number) => {
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

  addToCompare(card: JSX.Element) {
    let cards = this.state.cardsToCompare;
    cards.push(card);
    this.setState({cardsToCompare: cards});
  }

  clearCompareCards() {
    this.setState({cardsToCompare: []});
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <Container fluid>
        {
        this.state.loading ?
        <Spinner animation='border'><span id='loading' className='sr-only'>Loading...</span></Spinner> :
        (<div>
          <div className='left-align'>
            <Row className="results-compare">
              <h3>{this.state.page.num_results} results</h3>
              <Button className="compare submit left-align" variant='primary' onClick={() => this.openModal()}>
                <div className='compare-button-text'>
                  <img className='icon' src={compare} alt='venn diagram'></img>
                  {`\tCompare selected cards`}
                </div>
              </Button>
            </Row>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              shouldCloseOnOverlayClick={true}
              contentLabel="Info Card Comparison">
              <Button className='header-button' variant='primary' onClick={() => this.closeModal()}>
                Close
              </Button>
              <Button className='header-button' variant='primary' onClick={() => this.clearCompareCards()}>
                Clear comparisons
              </Button>
              <div></div>
              {this.state.cardsToCompare}
            </Modal>
          </div>
          <div>{''}</div>
          
          { this.getInfoCards() }
        </div>)}
        {!isNullOrUndefined(this.state.page?.objects) && this.state.page.objects.length !== 0 && <Paginator initialActive={this.state.pageNumber} numPages={ Math.max(this.state.page.total_pages, 1) } pathName={this.getPathName()} onPageChange={this.onPageChange} key={`${this.props.filterString}_${this.getSearchParam()}`}/>}
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