import { useState } from "react";
import { Box, Drawer, IconButton } from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import Form from "./Form";

export default function LeftNav(props) {
  const { onFormSubmission, setNotificationOpen } = props;
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 360, marginLeft: 5 }} role="presentation" onClick={toggleDrawer(false)}>
      <Form onFormSubmission={onFormSubmission} setNotificationOpen={setNotificationOpen} />
    </Box>
  );

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
