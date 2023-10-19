"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

export default function DomainModel() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [mmitDomain, setMmitDomain] = React.useState("");

  const getAddress = async () => {
    try {
      console.log("this try catch is working");
      const url = "http://54.87.155.123:6000/api/getAddress";

      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization:
            "Z2hkZmdkZmctZGZzZG1mMzJta21zZGtmbjEyZGtsZm1sa2RtZmxrZG0zNDNmNGdmZzVx",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ username: "waqas1968.mmit" }),
      });

      if (!response.ok) {
        console.log("this try catch throw error");
        throw new Error("Failed to fetch data");
      }
      console.log("this try catch throw error After");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Hello Error: ", error);
      return error;
    }
    //
  };

  return (
    <div>
      {/* <Button >Open modal</Button> */}
      <button
        onClick={handleOpen}
        className="rounded-[80px] py-3 px-6 bg-[#ffffff33] hover:opacity-[0.60]"
      >
        Wallet Connect
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="p-2"
          >
            Enter Your MMIT Domain Name
          </Typography>
          <input
            className="border p-4 rounded-3xl w-[100%] mt-3"
            type="text"
            placeholder=".mmitdomain"
            onChange={(e) => setMmitDomain(e.target.value)}
          />
          <button
            onClick={getAddress}
            className="mt-4 p-4 rounded-3xl bg-[#007fff] text-white w-[100%] hover:opacity-[0.60]"
          >
            Get Domain
          </button>
        </Box>
      </Modal>
    </div>
  );
}
