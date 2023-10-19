"use client";
import Image from "next/image";
import React from "react";
import Bubble from "../../../public/images/bubble.webp";
import logo from "../../../public/images/logo.png";
import Ball1 from "../../../public/images/ball-1.webp";
import Ball2 from "../../../public/images/ball-2.webp";
import Ball3 from "../../../public/images/ball-3.webp";
import WalletConnectSample from "@/components/WalletConnectSample";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";
import { useAuth } from "../auth/login";
import axios from "axios";

const Page = () => {
  const [show, setShow] = useState(false);
  const [domain, setDomain] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [inputError, setInputError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginBtnVisible, setLoginBtnVisible] = useState(true);



  const auth = useAuth();

  const signIn = async (username, tokenid) => {
    const regex = /\.mmit$/;
    if (!regex.test(domain) || !domain || !tokenId) {
      setInputError("Please fill all the fields");
      return;
    }
    setLoading(true);
    let response;
    try {
      response = await axios.get(`/api/sdk`, {
        params: {
          username: username,
          id: tokenid
        }
      });
    } catch (error) {
      console.error(error);
    }
    const uservalidator = response?.data?.data
    if (uservalidator.success == true) {
      setLoginBtnVisible(false);
      handleClose()
      setLoading(false);
    }
    else {
      swal("Error", `${uservalidator.message}`, "error");
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    auth.login({ domain, tokenId });
    signIn(domain, tokenId)
  };



  const logOutUser = () => {
    setLoginBtnVisible(true);
  };

  const handleClose = () => {
    setShow(false);
    setDomain("");
    setTokenId("");
  };

  const handleShow = () => setShow(true);
  return (
    <div className="bg-black">
      <div className="back-cover">
        <div className="flex flex-wrap justify-between items-center py-6 px-10 text-white ">
          <div className="sm:mx-0 w-[150px] sm:w-[200px]">
            <Image src={logo} />
          </div>
          <div>
            <WalletConnectSample />
          </div>
        </div>
        <div className="p-10">
          <div className="flex max-[1100px]:flex-wrap">
            <div className="w-[50%] max-[1100px]:w-[100%]">
              <div className="text-white text-8xl max-[620px]:text-5xl font-semibold mt-10">
                Designing the Future of the
                <span className="text-[#bef84f]">Web3</span>
              </div>
              <div className="text-2xl text-white mt-6">
                We help companies design their products to be ready for web3
                world.
              </div>

              {/* <button
                className="rounded-[80px] text-[#fff] my-4 py-3 px-6 bg-[#ffffff33] hover:opacity-[0.60]"
              >
                Wallet Connect
              </button> */}

              {loginBtnVisible ? (
                <button
                  className="rounded-[80px] text-[#fff] my-4 py-3 px-6 bg-[#ffffff33] hover:opacity-[0.60]"
                  onClick={handleShow}
                >
                  Login With MMIT Domain
                </button>
              ) : (
                <>
                  <button
                    className="rounded-[80px] text-[#fff] my-4 mx-2 py-3 px-6 bg-[#ffffff33] hover:opacity-[0.60]"
                    onClick={logOutUser}
                  >
                    Logout
                  </button>
                </>
              )}

              {loading ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title className="text-white">Insert Your MMIT Domain</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          type="text"
                          placeholder="Domain"
                          onChange={(e) => {
                            setDomain(e.target.value);
                            setInputError("");
                          }}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Control
                          type="number"
                          placeholder="Token Id"
                          onChange={(e) => {
                            setTokenId(e.target.value);
                            setInputError("");
                          }}
                        />
                      </Form.Group>

                      <p className="text-danger my-2">{inputError}</p>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="dark" onClick={onSubmit}>
                      Login
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
            </div>
            <div className="w-[50%] max-[1100px]:w-[100%]">
              <Image
                src={Bubble}
                alt="bubble picture"
                className="max-[1100px]w-[60%] max-[500px]:w-[100%] m-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-5xl text-center font-semibold text-white my-11">
          Side Projects
        </div>
        <div className="flex max-[735px]:flex-wrap">
          <div className="w-[50%] max-[735px]:w-[100%] p-9">
            <div className="back-image-one h-[385px]">
              <div className="flex justify-between p-4 w-[100%] text-white bg-[#ffffff33] b-box">
                <div>
                  <div>KAAY Web3</div>
                  <div>Brand Strategy</div>
                </div>
                <div>
                  <div>2022</div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[50%] max-[735px]:w-[100%] p-9">
            <div className="back-image-two h-[385px]">
              <div className="flex justify-between p-4 w-[100%] text-white bg-[#ffffff33] b-box">
                <div>
                  <div>WebChain</div>
                  <div>Brand Identity, Web Design</div>
                </div>
                <div>
                  <div>2022</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-9">
        <div className="text-[144px] max-[800px]:text-[60px] text-white text-center">
          Ready for <span className="text-[#bef84f]">Web3</span>
        </div>
        <div className="flex max-[800px]:flex-wrap">
          <div className="w-[33.33%] max-[800px]:w-[50%] max-[500px]:w-[100%] p-2">
            <div>
              <Image src={Ball1} alt="picture" />
              <div className="text-4xl font-semibold text-white text-center">
                Product Strategy
              </div>
              <div className="text-white text-center mt-2">

                Are you still conceptualizing? Well assist you in determining the essential MVP product range.
              </div>
            </div>
          </div>
          <div className="w-[33.33%] max-[800px]:w-[50%] max-[500px]:w-[100%] p-2">
            <div>
              <Image src={Ball2} alt="picture" />
              <div className="text-4xl font-semibold text-white text-center">
                Product Design
              </div>
              <div className="text-white text-center mt-2">
                Crisp appearance, outstanding user experience, and a standout brand are essentials for launch.
              </div>
            </div>
          </div>
          <div className="w-[33.33%] max-[800px]:w-[50%] max-[500px]:w-[100%] p-2">
            <div>
              <Image src={Ball3} alt="picture" />
              <div className="text-4xl font-semibold text-white text-center">
                Maintain & Support
              </div>
              <div className="text-white text-center mt-2">
                Following the launch, we will collaborate closely to introduce new features and steer the product towards market alignment.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center p-6 text-white back-cover">
        <div>Copy Right @2023</div>
        <div></div>
      </div>
    </div>
  );
};

export default Page;
