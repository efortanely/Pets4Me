import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import shapeOne from "../static/shape1.svg";
import personOne from "../static/person1.svg";
import personTwo from "../static/person2.svg";
import { Link } from "react-router-dom";
import ModelInstanceService from "../common/services/ModelInstanceService";
import { Pet } from "../models/Pet";
import "./Home.css";
import { Pets4mePetsService } from "../common/services/Pets4meModelInstanceService";
import { ObjectsPage } from "../models/ObjectsPage";

interface HomeState {
  numPets: number;
}
interface HomeProviders {
  petsService: ModelInstanceService<Pet>;
}

class Home extends React.Component<any, HomeState> {
  static providers: HomeProviders = { petsService: Pets4mePetsService };

  constructor(props: any) {
    super(props);
    this.state = {
      numPets: 10,
    };
  }

  componentDidMount() {
    this.getTotalNumPets();
  }

  getModelInstanceService = (): ModelInstanceService<Pet> => {
    return Home.providers.petsService;
  };

  updateNumPets = (petsPage: ObjectsPage<Pet>) => {
    this.setState({ numPets: petsPage.num_results });
  };

  getTotalNumPets = () => {
    this.getModelInstanceService()
      .getModelPageOfInstances(1, { resultsPerPage: 1 })
      .then(this.updateNumPets);
  };

  getRandomPetLink(): JSX.Element {
    return (
      <Link to={`/pets/${Math.floor(Math.random() * this.state.numPets) + 1}`}>
        <h2 id="adopt">adopt a pet today</h2>
      </Link>
    );
  }

  render() {
    return (
      <div>
        <img
          className="shapeOne"
          src={shapeOne}
          alt="A rounded pink shape"
        ></img>
        <img
          className="personOne"
          src={personOne}
          alt="A woman holding a brown cat"
        ></img>
        <img
          className="personTwo"
          src={personTwo}
          alt="A woman holding a brown dog"
        ></img>

        <div className="frontPageInfo">
          <h1>Make a New Friend!</h1>
          {this.getRandomPetLink()}
          <p>
            Our goal is to make finding a new furry friend as easy as possible.
            Explore the best fit for your lifestyle with our dog and cat breed
            search engine, or jump right into discovering pets at your local
            shelters.
          </p>
          <FontAwesomeIcon
            className="paw"
            icon={faPaw}
            color="#581730"
            size="2x"
          />
        </div>
      </div>
    );
  }
}

export default Home;
