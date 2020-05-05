import React from "react";
import UltimatePaginationBootstrap4 from "react-ultimate-pagination-bootstrap-4";

interface PaginatorProps {
  initialActive: number;
  numPages: number;
  pathName: string;
  onPageChange: (page: number) => any;
}
interface PaginatorState {
  active: number;
}

class Paginator extends React.Component<PaginatorProps, PaginatorState> {
  static defaultProps = {
    active: 1,
    numPages: 1,
    pathName: "",
    maxItems: 1,
    onPageChange: (page: number) => {},
  };

  constructor(props: PaginatorProps) {
    super(props);
    this.state = {
      active: 1,
    };
  }

  componentDidMount() {
    this.setState({
      active: this.props.initialActive,
    });
  }

  render() {
    return (
      <UltimatePaginationBootstrap4
        currentPage={this.state.active}
        totalPages={this.props.numPages}
        siblingPagesRange={1}
        onChange={this.onPageChange}
      />
    );
  }

  onPageChange = (page: number) => {
    this.setState({ active: page });
    this.props.onPageChange(page);
  };
}

export default Paginator;
