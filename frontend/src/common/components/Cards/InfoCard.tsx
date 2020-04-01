import React from "react";

export interface InfoCardProps { image_src: string, header: string, other_info: string[] }

export class InfoCard extends React.Component<InfoCardProps> {
  static defaultProps = {
    other_info: []
  }

  lineBreakFragment = (text: string, i: number) => {
   return <React.Fragment key={`${this.props.header}-${i}`}>
    {text}
    <br />
    </React.Fragment>
  }
  

  render() {
    let displayInfo = this.props
    return (
    <div className='single-card'>
            <img className='card-image' src={displayInfo.image_src} alt=''></img>
            <div className='card-text'>
                <h3>
                    {displayInfo.header}
                </h3>
                {displayInfo.other_info.map(this.lineBreakFragment)}
            </div>
            </div>
    )
  }
}