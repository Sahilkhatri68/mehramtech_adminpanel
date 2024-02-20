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

function Body({ Children }) {
  const [totalshops, setTotalshops] = useState(); //code to get total shops

  // code for fetching all students
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

  useEffect(() => {
    handletotalshops();
  }, []);

  return (
    <div>
      <Header
        Children={
          <div>
            <div className="my-6 mx-auto px-4 md:px-12">
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
                        Total Jobs : 10
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
                        Total Cities : 0
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
                        Total Countries : 0
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
