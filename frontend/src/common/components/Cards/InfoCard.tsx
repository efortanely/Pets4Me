import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../../static/logo.png';
import Button from 'react-bootstrap/Button';
import compare from '../../../static/compare.png'
import Highlighter from 'react-highlight-words'
import './InfoCards.css'

export interface InfoCardProps<T> { info: T, searchWords: string[], addToCompare: any }

abstract class InfoCard<T> extends React.Component<InfoCardProps<T>> {
  static defaultProps = {
    searchWords: []
  }

  lineBreakFragment = (text: string, i: number) => {
    return <React.Fragment key={`${this.getHeader()}-${i}`}>
      <Highlighter
        highlightClassName="highlight"
        searchWords={this.props.searchWords}
        textToHighlight={text} />
      <br/>
    </React.Fragment>
  }

  getCompareInfo(): JSX.Element {
    let image_src = this.getImageSrc()
    if (image_src === '') {
      image_src = logo
    }
    return (
      <div className='single-card' key={`${this.getHeader()}`}>
        <Link to={{
          pathname: `${this.getLinkPathname()}`,
          state: { info: this.props.info }
        }}>
          <img className='card-image' src={image_src} alt={`${this.getHeader()}`}></img>
        </Link>
        <div className='card-text'>
          <div>
            <h3>
              <Highlighter
                highlightClassName="highlight"
                searchWords={this.props.searchWords}
                textToHighlight={this.getHeader()} />
            </h3>
          </div>
          {this.getOtherInfo().map(this.lineBreakFragment)}
        </div>
      </div>
    )
  }

  render() {
    let pathname = this.getLinkPathname()
    let image_src = this.getImageSrc()
    if (image_src === '') {
      image_src = logo
    }
    return (
      <div className='single-card'>
        <Button className='add-compare' variant='primary' onClick={() => this.props.addToCompare(this.getCompareInfo())}>
          <div>
            <img className='icon' src={compare} alt='venn diagram'></img>
            {'+'}
          </div>
        </Button>
        <Link to={{
          pathname: `${pathname}`,
          state: { info: this.props.info }
        }}>
          <img className='card-image' src={image_src} alt={`${this.getHeader()}`}></img>
        <div className='card-text'>
          <div>
            <h3>
              <Highlighter
                highlightClassName="highlight"
                searchWords={this.props.searchWords}
                textToHighlight={this.getHeader()} />
            </h3>
            <span>
            
            </span>
          </div>
          {this.getOtherInfo().map(this.lineBreakFragment)}
        </div>
        </Link>
      </div>
    )
  }

  abstract getHeader(): string

  abstract getLinkPathname(): string

  abstract getImageSrc(): string

  abstract getOtherInfo(): string[]
}

export default InfoCard
