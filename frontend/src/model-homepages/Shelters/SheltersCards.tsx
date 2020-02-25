import React from 'react';
import aac from '../../static/shelters/aac.jpg'
import ahs from '../../static/shelters/ahs.png'
import apa from '../../static/shelters/apa.png'


function SheltersCards() {
    return (
        <div>
            <form>
                <label>
                    <input type="text" name="name" placeholder='Search' />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <div className='cards'>
                <div className='single-card'>
                    <img className='card-image' src={ahs} alt=''></img>
                    <div className='card-text'>
                        <h3>
                            Austin Humane Society
                        </h3>
                        Address: 124 W. Anderson Lane, Austin, Texas 78752<br></br>
                        Email: adoption@austinhumanesociety.org<br></br>
                        Phone Number: 512-646-7387<br></br>
                        Hours: M-Sat 12-7pm; Sun 12-5pm
                </div>
                </div>

                <div className='single-card'>
                    <img className='card-image' src={apa} alt=''></img>
                    <div className='card-text'>
                        <h3>
                            Austin Pets Alive!
                        </h3>
                        Address: 7201 Levander Loop Bldg. A, Austin, TX 78702<br></br>
                        Email: https://www.austinpetsalive.org/contact<br></br>
                        Phone Number: 512-961-6519<br></br>
                        Hours: 11:30am-7pm everyday
                </div>
                </div>

                <div className='single-card'>
                    <img className='card-image' src={aac} alt=''></img>
                    <div className='card-text'>
                        <h3>
                            Austin Animal Center
                        </h3>
                        Address: 1156 West Cesar Chavez, Austin, TX 78703<br></br>
                        Email: N/A<br></br>
                        Phone Number: 311<br></br>
                        Hours: 11am-7pm everyday
                    </div>
                </div>
            </div>
        </div>
    );
} export default SheltersCards;