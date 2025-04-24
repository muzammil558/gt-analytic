import React from "react";
import { styled, TableCell, TableRow } from "@mui/material";

import { PlayerData } from "@/utils/playerData";

function Row(props: { row: PlayerData }) {
  const { row } = props;
  const StyledTableRow = styled(TableRow)(() => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#022A30",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#001316",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <React.Fragment>
      <StyledTableRow>
        <TableCell align="center">{row.rank >= 0 ? row.rank : "-"}</TableCell>
        <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
          {row.name ? row.name : "-"}
        </TableCell>
        <TableCell align="center">{row.score >= 0 ? row.score : "-"}</TableCell>
        <TableCell align="center">{row.id ? row.id : "-"}</TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

export default Row;
