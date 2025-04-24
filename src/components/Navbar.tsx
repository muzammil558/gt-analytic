/* eslint-disable @next/next/no-img-element */
// /* eslint-disable @next/next/no-img-element */
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Box, Grid } from "@mui/material";

// import StatusModal from "./StatusModal";

// import "../styles/Navbar.scss";

// const Navbar = ({
//   analyticsStatus,
//   handleSubmitStatus,
// }: {
//   analyticsStatus: any;
//   handleSubmitStatus: any;
// }) => {
//   const [open, setOpen] = useState<boolean>(false);

//   const handleClick = (e: any) => {
//     setOpen(true);
//     handleSubmitStatus(e);
//   };

//   return (
//     <>
//       <Box className={"nav-root"}>
//         <Grid container className={"nav-logoWrapper"}>
//           <Grid item>
//             <Link href="/">
//               <img
//                 src={"/assets/imgs/gt-logo.png"}
//                 alt="logo"
//                 className={"nav-logo"}
//               />
//             </Link>
//           </Grid>
//         </Grid>

//         <Grid container className={"btnsWrapper"}>
//           <Grid item className={"btnItem"}>
//             <button className={"loginBtn"} onClick={handleClick}>
//               <span className={"btnTxt"}>Check Backend Status</span>
//             </button>
//           </Grid>
//         </Grid>
//       </Box>

//       <StatusModal
//         open={open}
//         setOpen={setOpen}
//         analyticsStatus={analyticsStatus}
//       />
//     </>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

import StatusModal from "./StatusModal";
import "../styles/Navbar.scss";

export default function Nav({ analyticsStatus, handleSubmitStatus }: any) {
  const [open, setOpen] = useState(false);

  const handleClick = (e: any) => {
    setOpen(true);
    handleSubmitStatus(e);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(900));

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo-container">
            <a href="/" className="nav_logo">
              <img src="/assets/imgs/gt-logo.png" alt="Golden Tides" />
            </a>
          </div>
          {!isMobile ? (
            <div>
              <button className="status-button" onClick={handleClick}>
                CHECK THE STATUS SERVER
              </button>
            </div>
          ) : (
            <div>
              <button className="status-button" onClick={handleClick}>
                SERVER STATUS
              </button>
            </div>
          )}
        </div>
      </nav>

      <StatusModal
        open={open}
        setOpen={setOpen}
        analyticsStatus={analyticsStatus}
      />
    </>
  );
}
