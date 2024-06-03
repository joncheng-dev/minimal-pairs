import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { InfoOutlined } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    setOpen(true);
    e.stopPropagation();
  };
  const handleClose = (e) => {
    setOpen(false);
    e.stopPropagation();
  };

  return (
    <div>
      <IconButton onClick={handleOpen} size="small" style={{ fontSize: "small", verticalAlign: "top" }}>
        <InfoOutlined fontSize="small" />
      </IconButton>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Minimal Pairs©
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            by Jon Cheng & Tim Clauson
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
