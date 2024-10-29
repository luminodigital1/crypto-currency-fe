import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
} from "@mui/material";

interface CryptoTableProps {
  data: CryptoData[];
}

const CryptoTable: React.FC<CryptoTableProps> = ({ data }) => {
  const filteredData = data.filter((crypto) => {
    return (
      (crypto.price && crypto.price !== 0) ||
      (crypto.previousPrice && crypto.previousPrice !== 0)
    );
  });

  return (
    <Grid container justifyContent="center">
      <TableContainer
        component={Paper}
        sx={{
          margin: "16px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          width: "90%",
        }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "navy", color: "#fff" }}>
              <TableCell>
                <Typography variant="h6" style={{ color: "#fff" }}>
                  Currency
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6" style={{ color: "#fff" }}>
                  Price
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6" style={{ color: "#fff" }}>
                  Previous Price
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6" style={{ color: "#fff" }}>
                  Current Time
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6" style={{ color: "#fff" }}>
                  Percentage Change
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((crypto) => (
              <TableRow
                key={crypto.currency}
                sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
              >
                <TableCell component="th" scope="row">
                  <Typography variant="body1">{crypto.currency}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">${crypto.price}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">
                    ${crypto.previousPrice}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1">
                    {new Date(crypto.currentTime).toLocaleString()}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body1"
                    style={{
                      color: crypto.percentageChange > 0 ? "green" : "red",
                    }}
                  >
                    {crypto.percentageChange * 100}%
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default CryptoTable;
