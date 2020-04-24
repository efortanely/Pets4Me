import React from "react";
import InfoCard from './InfoCard';
import ModelInstanceService from '../../services/ModelInstanceService';
import { Carousel, Col, Row } from 'react-bootstrap';
import { Container } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./InfoCarousel.css"

interface InfoCarouselProps<T> { itemIds: (string | number)[], itemsPerSlide: number }
interface InfoCarouselState<T> { cards: InfoCard<T>[]}

abstract class InfoCarousel<T> extends React.Component<InfoCarouselProps<T>, InfoCarouselState<T>> {
  static defaultProps = {
    itemIds: [],
    itemsPerSlide: 3
  }

  constructor(props: InfoCarouselProps<T>) {
    super(props)
    this.state = {
      cards: []
    }
  }

  componentDidMount() {
    this.fetchInfoCards(this.props.itemIds.map((id) => `${id}`))
  }

  render() {
    return (
      <Carousel 
      interval={null} 
      keyboard={false} 
      nextIcon={<FontAwesomeIcon icon="chevron-right" color="#581730" size="2x"/>} 
      prevIcon={<FontAwesomeIcon icon="chevron-left" color="#581730" size="2x"/>}
      indicators={this.state.cards.length > this.props.itemsPerSlide}
      controls={this.state.cards.length > this.props.itemsPerSlide}>
        {this.buildSlides()}
      </Carousel>
    )
  }

  fetchInfoCards = (ids: string[]) => {
    const modelInstanceService = this.getModelInstanceService()
    ids.forEach((id) => 
      modelInstanceService.getInstanceById(`${id}`)
      .then((res) => this.setState({ 
        cards: ([] as InfoCard<T>[]).concat(this.state.cards, [this.buildInfoCard(res)]) 
      }))
    )
  }

  buildSlides = (): JSX.Element[] => {
    let items: JSX.Element[] = []
    let cards: InfoCard<T>[] = Array(...this.state.cards)
    for(let i: number = 0; i < cards.length; i += this.props.itemsPerSlide) {
      let end = Math.min(i + this.props.itemsPerSlide, cards.length)
      items.push(this.buildSlide(cards.slice(i, end), i))
    }

    return items
  }

  buildSlide = (cards: InfoCard<T>[], index: number): JSX.Element => {
    let elements: JSX.Element[] = cards.map<JSX.Element>((item, index): JSX.Element => 
      <Col className="info-card-col" xs={3} key={`info-carousel-${index}`}>{item.render()}</Col>
    )
    return (
      <Carousel.Item key={`info-carousel-slide-${index}`}>
        <Container>
          <Row className="card-row">
          {elements}
          </Row>
        </Container>
      </Carousel.Item>
    )
  }

  abstract getModelInstanceService(): ModelInstanceService<T>

  abstract buildInfoCard(o: T): InfoCard<T>
}

export default InfoCarousel