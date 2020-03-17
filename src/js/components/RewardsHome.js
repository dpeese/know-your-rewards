import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import Moment from 'react-moment';

import UserService from '../services/user-service';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'rgb(0, 188, 212)',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

class RewardsHome extends Component {
  state = {
    keys: []
  };
  componentDidMount() {
    new UserService().getTransactions(this.props.userName)
      .then(response => {
        const keys = [...response.keys()];
        let totalRewards = 0
        keys.forEach(key => {
          totalRewards = totalRewards + response.get(key).rewards;
        });
        this.setState({ transactions: response, keys, totalRewards });

      });
  }

  render() {
    const transactions = this.state.transactions;
    return (
      <div>
        <br />
        <Typography gutterBottom variant="h5" align="left">
          Hi {this.props.userName} !! your
          Total Reward Points are <b>{this.state.totalRewards}</b>
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Transaction</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Amount</StyledTableCell>
                <StyledTableCell align="right">Transaction Date</StyledTableCell>
                <StyledTableCell align="right">Transaction ID</StyledTableCell>
                <StyledTableCell align="right">Rewards</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.keys.map(key => (
                <>
                  <TableRow>
                    <TableCell colSpan="5" align="center">
                      <b>{key} </b>
                    </TableCell>
                    <TableCell colSpan="1" align="right">
                      <b>Rewards: {transactions.get(key).rewards}</b>
                    </TableCell>
                  </TableRow>

                  {transactions.get(key).transactions.map(row => (
                    <StyledTableRow key={row.transactionId}>
                      <TableCell component="th" scope="row">
                        {row.vendor}
                      </TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="left">{row.transactionAmount}</TableCell>
                      <TableCell align="right">
                        <Moment format="MM/DD/YYYY">
                          {row.transactionDate}
                        </Moment>
                      </TableCell>
                      <TableCell align="right">{row.transactionId}</TableCell>
                      <TableCell align="right">{row.reward || '-'}</TableCell>
                    </StyledTableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default RewardsHome;