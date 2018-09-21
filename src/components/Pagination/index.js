import React from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import IntlMessages from 'util/IntlMessages';

class TablePaginationActions extends React.Component {

  onPageNumberClick = data => {
    this.props.onChangePage( data.selected);
  };

  render() {
    const { count, page, rowsPerPage } = this.props;
    const tatalPages = Math.ceil(count / rowsPerPage);

    return (
      <div className="d-flex pagination-container align-items-center">
        <ReactPaginate
          previousLabel={
            window.innerWidth > 768 ? <IntlMessages id="component.pagination.previous_label" /> : <i className="zmdi zmdi-skip-previous zmdi-hc-fw" />
          }
          nextLabel={window.innerWidth > 768 ? <IntlMessages id="component.pagination.next_label" /> : <i className="zmdi zmdi-skip-next zmdi-hc-fw" />}
          breakLabel={''}
          pageCount={tatalPages}
          marginPagesDisplayed={window.innerWidth > 1199 ? 2 : 1}
          pageRangeDisplayed={window.innerWidth > 1199 ? 3 : 1}
          onPageChange={this.onPageNumberClick}
          containerClassName={'pagination mb-0'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          nextClassName={'page-item'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          pageLinkClassName={'page-link'}
          forcePage={page}
        />
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

class Pagination extends React.Component {
  static get defaultProps() {
    return {
      styleName: 'position-fixed fixed-bottom',
      rowsPerPage: 10
    }
  }

  render() {
    const {name} = this.props;
    return (
      <div className={`app-pagination d-flex flex-row justify-content-between ${this.props.styleName}`}>
        <div className="row-pagination d-flex align-items-center justify-content-between">
          <TablePagination
            component={Grid}
            colSpan={this.props.colspan}
            totalpages={this.props.totalPages}
            count={this.props.count}
            rowsPerPage={this.props.rowsPerPage}
            page={this.props.page}
            onChangePage={this.props.onChangePage}
            onChangeRowsPerPage={this.props.onChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            labelRowsPerPage={window.innerWidth > 1199 ? 'Rows per page:' : ''}
            labelDisplayedRows={({ from, to, count }) => {
              if(window.innerWidth > 768)
                return <React.Fragment>{`${from}-${to} of ${count} `} {name}</React.Fragment>

              return '';
            }}
            ActionsComponent={Component}
            style={{ borderWidth: 0 }}
          />
          {/* window.innerWidth > 1199 && <Typography variant="caption">{this.props.name}</Typography> */}
        </div>
        <TablePaginationActions
          colSpan={this.props.colspan}
          totalPages={this.props.totalPages}
          count={this.props.count}
          rowsPerPage={this.props.rowsPerPage}
          page={this.props.page}
          onChangePage={this.props.onChangePage}
          onChangeRowsPerPage={this.props.onChangeRowsPerPage}
        />
      </div>
    );
  }
}

const Component = () => <div />;

const styles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});


export default withStyles(styles, { withTheme: true })(Pagination);
