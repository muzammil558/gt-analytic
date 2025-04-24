import * as React from "react";
import { Grid, Box, Typography, Modal } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function StatusModal({
  open,
  setOpen,
  analyticsStatus,
}: {
  open: boolean;
  setOpen: any;
  analyticsStatus: any;
}) {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box sx={style}>
        <Typography component="h4" variant="h4" id="modal-title" mb={1}>
          Overall Status
        </Typography>

        <Grid container>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <p className="status-info">
              Players Online: {analyticsStatus?.players_online}
            </p>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <p className="status-info">
              Servers Online: {analyticsStatus?.servers_online}
            </p>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
