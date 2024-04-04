import React, { useEffect } from "react";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import { API } from "./API/API";
import { FaShop } from "react-icons/fa6";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { IoBagCheckSharp } from "react-icons/io5";
import { MdWork } from "react-icons/md";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

// import io from "socket.io-client";

function Body({ Children }) {
  const [totalshops, setTotalshops] = useState(); //code to get total shops
  const [adminavailabilitycheck, setAdminavailabilitycheck] = useState(false);
  const [allrequestedDevice, setAllrequestedDevice] = useState();
  const [unreadNotifiaction, setUnreadNotifiaction] = useState();
  const [completedIssueStatus, setCompletedIssueStatus] = useState();
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState(false); // Assume the initial availability is false, adjust as needed

  // code for fetching all shopkeepers
  const handletotalshops = () => {
    setLoading(true);

    axios
      .get(`${API}/shopkeepers`)
      .then((res) => {
        setTotalshops(res.data.length);
        setLoading(false); // Set loading to false after receiving the response
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false after receiving the response
      });
  };

  // code to fetch all requested device for services
  const handleallrequestedDevice = () => {
    setLoading(true); // Set loading to true before making the request

    axios
      .get(`${API}/devicerequest`)
      .then((res) => {
        setAllrequestedDevice(res.data.totalDevices);
        setLoading(false); // Set loading to false after receiving the response
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false after receiving the response
      });
  };

  let adminData = null;
  // code to get admin details
  const getAdmin = async () => {
    try {
      const response = await axios.get(
        `${API}/adminsettings/getadmin/65ec5a7200254d90494b2ec7`
      );
      adminData = response.data;
      //   console.log(adminData);
      setAvailability(response.data.adminavailability);

      // Perform additional actions with adminData if needed
    } catch (error) {
      console.error(error);
    }
  };
  const fetchData = async () => {
    if (adminData === null) {
      await getAdmin();
      //   console.log(adminData);
    } else {
      console.log(adminData);
      // Perform additional actions with adminData if needed
    }
  };
  fetchData();

  // code to get unread notification
  const getUnreadNotification = () => {
    setLoading(true); // Set loading to true before making the request

    axios
      .get(`${API}/devicerequest/notification/false`)
      .then((res) => {
        setUnreadNotifiaction(res.data.total);
        setLoading(false); // Set loading to false after receiving the response
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false after receiving the response
      });
  };

  // code to get issueResovleStatus which is completed
  const issueResolveStatusCompleted = () => {
    setLoading(true); // Set loading to true before making the request

    axios
      .get(`${API}/devicerequest/issueresolvestatus/completed`)
      .then((res) => {
        setCompletedIssueStatus(res.data.totalDevices);
        setLoading(false); // Set loading to false after receiving the response
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false after receiving the response
      });
  };
  // useEffect to call multiple request
  useEffect(() => {
    handletotalshops();
    handleallrequestedDevice();
    getUnreadNotification();
    issueResolveStatusCompleted();
  }, []);

  // extra code below ---------------
  const handletoggle = () => {};

  // const handleToggleAvailability = async () => {
  //   try {
  //     setLoading(true);

  //     // Make a PUT request to update admin availability
  //     const response = await axios.put(
  //       `${API}/adminsettings/availability/65d9e6548da22e0c726c3bc0`
  //     );

  //     // Handle the response as needed
  //     console.log(response.data);

  //     // Update the local state to reflect the new availability
  //     setAvailability(response.data.adminavailability);
  //   } catch (error) {
  //     console.error("Error updating admin availability:", error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <div>
      <Header
        Children={
          <div>
            <div className="my-6 mx-auto px-4 md:px-12">
              <div className="flex justify-between  items-center p-2">
                <div className="">
                  <span className="text-2xl font-semibold">
                    Admin Availability
                  </span>
                  &nbsp;
                  {adminavailabilitycheck === false ? (
                    <span className="ml-2 font-semibold">(Not Available)</span>
                  ) : (
                    <span className="ml-2 font-semibold">(Available)</span>
                  )}
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Switch
                        onClick={() =>
                          handletoggle(
                            setAdminavailabilitycheck(!adminavailabilitycheck)
                          )
                        }
                      />
                    }
                  />
                </div>
              </div>
              <hr />
              <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {/* Column */}
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
                  {/* Article */}
                  <article className="p-2 overflow-hidden rounded-lg shadow-lg">
                    <div className="flex items-center ">
                      <div className="w-[60px] bg-red-100 p-2 rounded">
                        <FaShop size={40} className="w-full" />
                      </div>
                      <div className="md:mx-4 flex items-center  mx-2 font-semibold text-[20px]">
                        Total Shops :
                        <div className="ml-2 mt-1">
                          {loading ? (
                            <CircularProgress size={17} />
                          ) : (
                            totalshops
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                  {/* END Article */}
                </div>
                {/* Column */}
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
                  {/* Article */}
                  <article className="p-2 overflow-hidden rounded-lg shadow-lg">
                    <Link to="/productlist">
                      <div className="flex items-center ">
                        <div className="w-[60px] bg-red-100 p-2 rounded">
                          <MdWork size={40} className="w-full" />
                        </div>
                        <div className="md:mx-4 flex items-center mx-2 font-semibold text-[20px]">
                          Requests :
                          <div className="ml-2">
                            {loading ? (
                              <CircularProgress size={17} />
                            ) : (
                              allrequestedDevice
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                  {/* END Article */}
                </div>
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
                  {/* Article */}
                  <article className="p-2 overflow-hidden rounded-lg shadow-lg">
                    <Link to="/unreadNotificationDevices">
                      <div className="flex items-center ">
                        <div className="w-[60px] bg-red-100 p-2 rounded">
                          <MdMarkUnreadChatAlt size={40} className="w-full" />
                        </div>

                        <div className="md:mx-4 flex items-center mx-2 font-semibold text-[20px]">
                          Unread :
                          <div className="ml-2">
                            {loading ? (
                              <CircularProgress size={17} />
                            ) : (
                              unreadNotifiaction
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                  {/* END Article */}
                </div>
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
                  {/* Article */}
                  <article className="p-2 overflow-hidden rounded-lg shadow-lg">
                    <Link to="/completedproductlist">
                      <div className="flex items-center ">
                        <div className="w-[60px] bg-red-100 p-2 rounded">
                          <IoBagCheckSharp size={40} className="w-full" />
                        </div>
                        <div className="md:mx-4 flex items-center mx-2 font-semibold text-[20px]">
                          Completed :
                          <div className="ml-2">
                            {loading ? (
                              <CircularProgress size={17} />
                            ) : (
                              completedIssueStatus
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                  {/* END Article */}
                </div>
                {/* END Column */}
              </div>
            </div>
          </div>
        }
      ></Header>
    </div>
  );
}

export default Body;
