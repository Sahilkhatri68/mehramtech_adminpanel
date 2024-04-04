import React, { useEffect } from "react";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import { API } from "./API/API";

function UnReadNotificationDevices() {
  const [completedIssue, setCompletedIssue] = useState(); //state to manage completed issue

  const getCompletedRequestDevice = () => {
    axios
      .get(`${API}/devicerequest/notification/false`)
      .then((res) => {
        console.log(res.data.requestedNotificationType);
        const FetchUnReadNotificationDevices =
          res.data.requestedNotificationType.map((device) => {
            const createdAt = new Date(device.createdAt);
            const formattedDate = `${createdAt.getDate()}-${
              createdAt.getMonth() + 1
            }-${createdAt.getFullYear()}`;
            const formattedTime = `${createdAt.getHours()}:${createdAt.getMinutes()}`;
            const formattedDateTime = `${formattedDate}  ( ${formattedTime} )`;

            return {
              ...device,
              formattedDateTime,
            };
          });
        setCompletedIssue(FetchUnReadNotificationDevices);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCompletedRequestDevice();
  }, []);
  return (
    <>
      {" "}
      <div>
        <Header
          Children={
            <div>
              <div className="w-full h-screen  ">
                <div className=" mx-auto sm:px-6 lg:px-8">
                  <div className="flex flex-col">
                    <div className="mb-4">
                      <h1 className="text-3xl font-bolder leading-tight text-gray-900">
                        Completed Product List
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
                              Updated Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {completedIssue &&
                            completedIssue
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
                                        i.issueresolveStatus !==
                                          "completed" && (
                                          <span className="bg-gray-300 p-2 rounded text-red-500 font-semibold">
                                            Not Completed
                                          </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                      <div className="flex items-center">
                                        {i.formattedDateTime}
                                        <div className="ml-4">
                                          <div className="text-sm leading-5 font-medium text-gray-900"></div>
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
            </div>
          }
        ></Header>
      </div>
    </>
  );
}
export default UnReadNotificationDevices;
