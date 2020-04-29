import React from 'react';
import dogInstances from '../static/visualizations/chart.png'
import catInstances from '../static/visualizations/chart_cats.png'
import shelterPetCount from '../static/visualizations/chart_shelters.png'
import safety from '../static/crashsafe_viz/safety.png'
import safetyOverTime from '../static/crashsafe_viz/safety_over_time.png'
import safetyToUserRatings from '../static/crashsafe_viz/safety_to_user_ratings.png'


import Youtube from 'react-youtube';

import './Visualizations.css'

export class Visualizations extends React.Component<{}, {}> {

    private videoId = 'YurILnm6w_o'

    _onReady(event: { target: { pauseVideo: () => void; }; }) {
    event.target.pauseVideo();
    }

    render() {
        return (
            <div className='viz'>
                <h3>
                    Pets4me Visualizations
                </h3>
                <div className='image-section'>
                    <img className='main-img bordered' src={dogInstances} alt='graph of dog counts'></img>
                    <span className='stacked-img'>
                        <img className='bordered' src={catInstances} alt='graph of cat counts'></img>
                        <img className='bordered' src={shelterPetCount} alt='graph of animals pet shelter'></img>
                        <Youtube className='video' videoId={this.videoId} onReady={this._onReady} />
                    </span>
                </div>
                <br/>
                <div className='divider'></div>
                <br/>
                <h3>
                    <a href='https://crashsafe.me/'>CrashSafe</a> Visualizations
                </h3>

                <div className='image-section'>
                    <img className='main-img bordered' src={safety} alt='graph of brand safety ratings'></img>
                    <span className='stacked-img'>
                        <img className='bordered' src={safetyOverTime} alt='safety ratings over time'></img>
                        <img className='bordered' src={safetyToUserRatings} alt='graph comparing safety ratings to user ratings for brand'></img>
                    </span>
                </div>

                <br/>
                <h6>Graphs and charts created with <a href="https://d3js.org/">D3</a>, Git visualization created with <a href="https://gource.io/">Gource</a>.</h6>
                <br/>

            </div>
        );
    }
} export default Visualizations;
