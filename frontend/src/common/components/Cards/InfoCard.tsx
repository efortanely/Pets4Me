import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../../static/logo.png';
import './InfoCards.css'

export interface InfoCardProps<T> { info: T }

abstract class InfoCard<T> extends React.Component<InfoCardProps<T>> {
  static defaultProps = {
    other_info: []
  }

  lineBreakFragment = (text: string, i: number) => {
   return <React.Fragment key={`${this.getHeader()}-${i}`}>
    {text}
    <br />
    </React.Fragment>
  }

  render() {
    let pathname = this.getLinkPathname()
    let image_src = this.getImageSrc()
    if(image_src === '') {
      image_src = logo
    }
    return (
      <Link to={{
        pathname: `${pathname}`,
        state: { info: this.props.info }
        }}>
        <div className='single-card'>
                <img className='card-image' src={image_src} alt={`${this.getHeader()}`}></img>
                <div className='card-text'>
                    <h3>
                        {this.getHeader()}
                    </h3>
                    {this.getOtherInfo().map(this.lineBreakFragment)}
                </div>
                </div>
      </Link>
    )
  }

  abstract getHeader(): string

  abstract getLinkPathname(): string

  abstract getImageSrc(): string

  abstract getOtherInfo(): string[]
}

export default InfoCard