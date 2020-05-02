import React from "react";
import { Form, Col } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface SearchBarProps extends RouteComponentProps { }
interface SearchBarState { searchOption: string }

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  
  static options = ['Pets4Me', 'Pets', 'Dog Breeds', 'Cat Breeds', 'Shelters']
  
  controlId = "search-bar"
  selectId = `${this.controlId}-select`
  inputId = `${this.controlId}-input`

  constructor(props: SearchBarProps) {
    super(props)
    this.state = {
      searchOption: SearchBar.options[0]
    }
  }

  updateSearchOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchOption: event.currentTarget.value })
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    let selectValue: string = this.getFormValueFromEvent(event, this.selectId)
    let inputValue : string = this.getFormValueFromEvent(event, this.inputId)
    this.props.history.push(`${this.optionsToRoute(selectValue)}?search=${encodeURIComponent(inputValue)}`)
    event.preventDefault()
  }

  optionsToRoute = (option: string): string => {
    let route: string = '/'
    if(option === SearchBar.options[0]) {
      route += 'search-results'
    }
    else {
      route += option.toLowerCase().replace(' ', '-')
    }
    return route
  }

  getFormValueFromEvent(event: React.FormEvent<HTMLFormElement>, itemName: string): string {
    return (event.currentTarget.elements.namedItem(itemName) as HTMLSelectElement).value
  }

  render() {
    return (
      <Form className="searchbar" onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Row>
            <Col xs="auto">
              <Form.Label srOnly>Search options</Form.Label>
              <Form.Control id={this.selectId} size="lg" as="select" onChange={this.updateSearchOption}>
                {SearchBar.options.map((option, i) => <option className="select-option" key={`${option}-${i}`}>{option}</option>)}
              </Form.Control>
            </Col>
            <Col>
              <Form.Label srOnly>{"Search placeholder"}</Form.Label>
              <Form.Control id={this.inputId} size="lg" type="text" placeholder={`Search ${this.state.searchOption}...`} />
            </Col>
          </Form.Row>
        </Form.Group>
      </Form>
    )
  }

}

export default withRouter(SearchBar)