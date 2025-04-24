import React, { useState } from "react";
import { styled, TableCell, TableRow } from "@mui/material";

import { PlayerData } from "@/utils/playerData";

function Row(props: { row: PlayerData; index: number }) {
  const { row, index } = props;
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
        <TableCell>{index + 1}</TableCell>
        <TableCell sx={{ whiteSpace: "nowrap" }}>
          {row.name ? row.name : "-"}
        </TableCell>
        <TableCell align="right">{row.games >= 0 ? row.games : "-"}</TableCell>
        <TableCell align="right">{row.wins >= 0 ? row.wins : "-"}</TableCell>
        <TableCell align="right">
          {row.assists >= 0 ? row.assists : "-"}
        </TableCell>
        <TableCell align="right">{row.kills >= 0 ? row.kills : "-"}</TableCell>
        <TableCell align="right">
          {row.deaths >= 0 ? row.deaths : "-"}
        </TableCell>
        <TableCell align="right">
          {row.damage >= 0 ? row.damage : "-"}
        </TableCell>
        <TableCell align="right">
          {row.treasures >= 0 ? row.treasures : "-"}
        </TableCell>
        <TableCell align="right">{row.gold >= 0 ? row.gold : "-"}</TableCell>
        <TableCell align="right">
          {row.healing >= 0 ? row.healing : "-"}
        </TableCell>
        <TableCell align="right">
          {row.mitigation >= 0 ? row.mitigation : "-"}
        </TableCell>
        <TableCell align="center">{row.id ? row.id : "-"}</TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

export default Row;
