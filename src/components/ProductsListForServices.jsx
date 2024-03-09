import React, { useEffect } from "react";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import { API } from "./API/API";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

// code for sliding transition of dialog box
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ProductsListForServices() {
  const [allrequestedDevice, setAllrequestedDevice] = useState(); // to get all request from api
  const [issuechange, setIssuechange] = useState(); // to handle select menu
  const [fetchedProductById, setFetchedProductById] = useState([]);
  // code to fetch all request
  const getAllRequestForService = () => {
    axios
      .get(`${API}/devicerequest`)
      .then((res) => {
        // console.log(res.data.allrequestedDevices);
        setAllrequestedDevice(res.data.allrequestedDevices);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllRequestForService();
  }, []);

  // code to handle menu option
  const handleSelectmenuIssueChanged = async (e) => {
    setIssuechange(e.target.value);
  };

  // code to open dialog of problem change box
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = async (_id) => {
    await axios
      .get(`${API}/devicerequest/${_id}`)
      .then((res) => {
        // console.log(res.data);
        setFetchedProductById(res.data);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  // code to update problemstatus with axios put request
  const handleProblemUpdate = async (_id) => {
    console.log(issuechange);
    setOpen(false);

    try {
      const updatedData = {
        issueresolveStatus: issuechange,
      };
      await axios
        .put(`${API}/devicerequest/${_id}`, updatedData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      setOpen(false);
      // Optionally, you can fetch updated data or perform other actions after the update
      getAllRequestForService();
    } catch (error) {
      console.error("Error updating issue status:", error);
    }
  };
  return (
    <div>
      <Header
        Children={
          <div>
            <div className="w-full h-screen  ">
              <div className=" mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col">
                  <div className="mb-4">
                    <h1 className="text-3xl font-bolder leading-tight text-gray-900">
                      Product List
                    </h1>
                    <hr className="mt-2" />
                  </div>
                </div>
                <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                    <table className="min-w-full">
                      {/* HEAD start */}
                      <thead>
                        <tr className="bg-[#d8d8d8] border-b border-gray-200 text-xs leading-4 text-gray-700 uppercase font-bold tracking-wider">
                          <th className="px-6 py-3 text-left font-semibold">
                            #
                          </th>
                          <th className="px-6 py-3 text-left font-semibold">
                            Device Brand
                          </th>
                          <th className="px-6 py-3 text-left font-semibold">
                            Device Model
                          </th>
                          <th className="px-6 py-3 text-left font-semibold">
                            Device IMEI
                          </th>
                          <th className="px-6 py-3 text-left font-semibold">
                            Device Problem
                          </th>
                          <th className="px-6 py-3 text-left font-semibold">
                            Problem Status
                          </th>
                          <th className="px-6 py-3 text-left font-semibold">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {allrequestedDevice &&
                          allrequestedDevice
                            // .filter((i) => {
                            //   return Search === ""
                            //     ? i
                            //     : i.className.includes(Search);
                            // })
                            // .filter((i) => {
                            //   return searchduration === ""
                            //     ? i
                            //     : i.duration.includes(searchduration);
                            // })
                            .map((i, index) => {
                              const serialNumber = index + 1;
                              return (
                                <tr key={i._id}>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="text-sm font-bold leading-5 text-gray-900">
                                      {serialNumber}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="text-sm leading-5 text-gray-900">
                                      {i.brand}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="flex items-center">
                                      {/* {i.assignedclass[0].className} */}
                                      {i.model}
                                      <div className="ml-4">
                                        <div className="text-sm leading-5 font-medium text-gray-900"></div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="flex items-center">
                                      {i.imei}
                                      <div className="ml-4">
                                        <div className="text-sm leading-5 font-medium text-gray-900"></div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="text-sm leading-5 text-gray-900">
                                      {i.problem}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    {i.issueresolveStatus === "pending" && (
                                      <span className="bg-gray-300 p-2 rounded text-black-500 font-semibold">
                                        Pending
                                      </span>
                                    )}

                                    {i.issueresolveStatus === "completed" && (
                                      <span className="bg-gray-300 p-2 rounded text-green-500 font-semibold">
                                        Completed
                                      </span>
                                    )}

                                    {i.issueresolveStatus !== "pending" &&
                                      i.issueresolveStatus !== "completed" && (
                                        <span className="bg-gray-300 p-2 rounded text-red-500 font-semibold">
                                          Not Completed
                                        </span>
                                      )}
                                  </td>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="text-sm leading-5 text-gray-900">
                                      <div
                                        onClick={() => handleClickOpen(i._id)}
                                        className="font-semibold underline cursor-pointer"
                                      >
                                        Action
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                      </tbody>
                      {/* BODY end */}
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {fetchedProductById !== "" || null ? (
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>
                  Update Device Problem Status{" "}
                  <span className="font-bold">
                    ( {fetchedProductById.brand} )
                  </span>
                  <hr />
                </DialogTitle>
                <DialogContent>
                  <div className="m-2 flex items-center text-[20px]">
                    <div className="w-[130px]">Model </div>:
                    <span className="ml-2">{fetchedProductById.model}</span>
                  </div>
                  <div className="m-2 flex items-center text-[20px]">
                    <div className="w-[130px]">IMEI </div>:
                    <span className="ml-2">{fetchedProductById.imei}</span>
                  </div>
                  <div className="m-2 flex items-center text-[20px]">
                    <div className="w-[130px]">Issue </div>:
                    <span className="ml-2">{fetchedProductById.problem}</span>
                  </div>
                  <div className="m-2 flex items-center text-[20px]">
                    <div className="w-[130px]">Update Issue </div>:
                    <span className="ml-2">
                      <select
                        value={issuechange}
                        onChange={handleSelectmenuIssueChanged}
                        id="problem"
                      >
                        {/* <option>----Choose----</option> */}
                        <option value="completed">Completed</option>
                        <option value="not-completed">Not-completed</option>
                        <option value="pending">Pending</option>
                      </select>
                    </span>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Disagree</Button>
                  <Button
                    onClick={() => handleProblemUpdate(fetchedProductById._id)}
                  >
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            ) : null}
          </div>
        }
      ></Header>
    </div>
  );
}

export default ProductsListForServices;
