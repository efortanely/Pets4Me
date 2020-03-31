import React from 'react';
import { DogBreedsPage } from '../../models/dog-breeds-page';
import { DogBreedCard } from '../../common/components/Cards/DogBreedCard';
import { DogBreed } from '../../models/dog-breed';
import Pets4meDogBreedsServiceContext from '../../common/services/pets4me-dog-breeds-service';
import Paginator from '../../common/components/Paginator';
import DogBreedsService from '../../common/services/dog-breeds-service';
import Spinner from 'react-bootstrap/Spinner'

interface DogBreedsCardsProps { pageNumber: number }
interface DogBreedsCardsState { pageNumber: number, page: DogBreedsPage, loading: boolean }

class DogBreedsCards extends React.Component<DogBreedsCardsProps, DogBreedsCardsState> {
    static contextType = Pets4meDogBreedsServiceContext
    static defaultProps = {
        pageNumber: 1
    }
    
    constructor(props: DogBreedsCardsProps) {
        super(props)
        this.state = {
            pageNumber: props.pageNumber,
            page: { objects: [] as object[] } as DogBreedsPage,
            loading: true
        }
    }

    componentDidMount() {
        this.fetchDogBreedsPage(this.state.pageNumber)
            .then(this.updatePage)
            .catch(console.log)
    }

    fetchDogBreedsPage = (pageNumber: number): Promise<DogBreedsPage> => {
        const pets4meDogBreedService: DogBreedsService = this.context
        return pets4meDogBreedService.getDogBreeds(pageNumber)
    }

    updatePage = (newPage: DogBreedsPage) => {
        this.setState({ page: newPage, loading: false})
    }

    render() {
        return (
            <div className='cards'>
            {this.state.loading ? <Spinner animation='border'><span className='sr-only'>Loading...</span></Spinner> : this.state.page.objects.map(this.createDogBreedCard) }
            <Paginator active={this.state.pageNumber} numPages={this.state.page.total_pages} pathName={'/dog-breeds'} onPageChange={this.onPageChange}/>
        </div>
        )
    }

    onPageChange = (page: number) => {
        this.setState({loading: true})
        this.fetchDogBreedsPage(page)
            .then(this.updatePage)
            .catch(console.log)
    }

    createDogBreedCard = (breed: DogBreed, i: any) => {
        return <DogBreedCard key={`breed-card-${i}`} breed={breed} />
    }

}

export default DogBreedsCards