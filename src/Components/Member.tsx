import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlask } from '@fortawesome/free-solid-svg-icons'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

function Member(props: { img: string, name: string, role: string; bio: string; commits: number; issues: number; tests: number; }) {
    return(
        <div className="member">
            <svg className="svg-1">
              <rect className="top-rect" width="1" height="1"></rect>
            </svg>
            <svg className="svg-2">
              <rect className="bottom-rect" width="1" height="1"></rect>
            </svg>
            
            <img src={props.img} alt={"A headshot of " + props.name}></img>
            <div className="member-text">
              <h4>{props.name}</h4>
              <p>{props.role}</p>
            </div>
  
            <div className="door">
              <div className="text">{props.bio}</div>
            </div>
            
            <div className="circles">
              <div className="circle" title="No. Commits">{props.commits}</div>
              <div className="circle" title="No. Issues">{props.issues}</div>
              <div className="circle" title="No. Unit Tests">{props.tests}</div>
            </div>
  
            <div className="icons">
              <FontAwesomeIcon className="icon" icon={faCodeBranch} color="#528C8B" size="1x"/>
              <FontAwesomeIcon className="icon" icon={faExclamationCircle} color="#528C8B" size="1x"/>
              <FontAwesomeIcon className="icon" icon={faFlask} color="#528C8B" size="1x"/>
            </div>
          </div>
    );
  }

export default Member;