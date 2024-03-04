import React, { useEffect } from "react";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import { API } from "./API/API";
import { ToastContainer, toast } from "react-toastify";
import { FaShop } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { MdPlace } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

function Body({ Children }) {
  const [totalshops, setTotalshops] = useState(); //code to get total shops
  const [adminavailabilitycheck, setAdminavailabilitycheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState(false); // Assume the initial availability is false, adjust as needed
  const [allrequestedDevice, setAllrequestedDevice] = useState();

  // code for fetching all shopkeepers
  const handletotalshops = () => {
    axios
      .get(`${API}/shopkeepers`)
      .then((res) => {
        setTotalshops(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // code to fetch all requested device for services
  const handleallrequestedDevice = () => {
    axios
      .get(`${API}/devicerequest`)
      .then((res) => {
        setAllrequestedDevice(res.data.totalDevices);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handletotalshops();
    handleallrequestedDevice();
  }, []);

  let adminData = null;
  // code to get admin details
  const getAdmin = async () => {
    try {
      const response = await axios.get(
        `${API}/adminsettings/getadmin/65d9e6548da22e0c726c3bc0`
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

  const handleToggleAvailability = async () => {
    try {
      setLoading(true);

      // Make a PUT request to update admin availability
      const response = await axios.put(
        `${API}/adminsettings/availability/65d9e6548da22e0c726c3bc0`
      );

      // Handle the response as needed
      console.log(response.data);

      // Update the local state to reflect the new availability
      setAvailability(response.data.adminavailability);
    } catch (error) {
      console.error("Error updating admin availability:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const handletoggle = () => {};
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
                      <div className="md:mx-4 mx-2 font-semibold text-[20px]">
                        Total Shops : {totalshops}
                      </div>
                    </div>
                  </article>
                  {/* END Article */}
                </div>
                {/* Column */}
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
                  {/* Article */}
                  <article className="p-2 overflow-hidden rounded-lg shadow-lg">
                    <div className="flex items-center ">
                      <div className="w-[60px] bg-red-100 p-2 rounded">
                        <MdWork size={40} className="w-full" />
                      </div>
                      <div className="md:mx-4 mx-2 font-semibold text-[20px]">
                        Total Requests : {allrequestedDevice}
                      </div>
                    </div>
                  </article>
                  {/* END Article */}
                </div>
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
                  {/* Article */}
                  <article className="p-2 overflow-hidden rounded-lg shadow-lg">
                    <div className="flex items-center ">
                      <div className="w-[60px] bg-red-100 p-2 rounded">
                        <MdPlace size={40} className="w-full" />
                      </div>
                      <div className="md:mx-4 mx-2 font-semibold text-[20px]">
                        Total Cities : 1
                      </div>
                    </div>
                  </article>
                  {/* END Article */}
                </div>
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
                  {/* Article */}
                  <article className="p-2 overflow-hidden rounded-lg shadow-lg">
                    <div className="flex items-center ">
                      <div className="w-[60px] bg-red-100 p-2 rounded">
                        <BiWorld size={40} className="w-full" />
                      </div>
                      <div className="md:mx-4 mx-2 font-semibold text-[20px]">
                        Total Countries : 1
                      </div>
                    </div>
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
