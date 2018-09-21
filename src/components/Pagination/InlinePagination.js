import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import IntlMessages from 'util/IntlMessages';


const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});


const EmptyComponent = () => (
  <div></div>
)

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  onPageNumberClick = data => {
    this.props.onChangePage(data.selected);
  }

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;
    const tatalPages = Math.ceil(count / rowsPerPage)

    return (
        <ReactPaginate
          previousLabel={<IntlMessages id="component.pagination.previous_label" />}
          nextLabel={<IntlMessages id="component.pagination.next_label" />}
          breakLabel={<a href="" className="page-link">...</a>}
          breakClassName={"page-item"}
          pageCount={tatalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.onPageNumberClick}
          containerClassName={"pagination m-0"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          nextClassName={"page-item"}
          previousClassName={"page-item"}
          previousLinkClassName= {"page-link"}
          nextLinkClassName= {"page-link"}
          pageLinkClassName = {"page-link"}
          forcePage={page}
        />
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);



class InlinePagination extends React.Component{
  render(){
    let startCount = (this.props.page * this.props.rowsPerPage) + 1;
    let endCount = (this.props.page * this.props.rowsPerPage) + this.props.rowsPerPage;

    if(endCount > this.props.count) endCount = this.props.count
    if(startCount > this.props.count) startCount = this.props.count


    return (
      <Grid container justify={'flex-end'} alignItems={"center"} spacing={16} className={'mt-3'}>
        <Grid item >
          <Typography variant={'caption'}>{`${startCount}-${endCount} of ${this.props.count}`} {this.props.name}</Typography>
        </Grid>
        <Grid item >
          <TablePaginationActionsWrapped
            colSpan={this.props.colspan}
            totalPages = { this.props.totalPages}
            count={this.props.count}
            rowsPerPage={this.props.rowsPerPage}
            page={this.props.page}
            onChangePage={this.props.onChangePage}
          />
        </Grid>
      </Grid>
    );
  }
}

export default InlinePagination;
