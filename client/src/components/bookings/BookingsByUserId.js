import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom"
import axios from 'axios';
// import BookingForm from "./BookingForm";
import LoadingSpinner from "../LoadingSpinner";
import {Link} from "react-router-dom"

import { format, parseISO } from "date-fns"
import {RequestSent , ApprovedByAdmin,ApprovedByHod,RejectedByAdmin,RejectedByHod} from "../Steps"

const Bookings = () => {
  // const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [filterValue, setFilterValue] = useState("Request Sent");
  const [emailVerified, setEmailVerified] = useState(false);

  const userData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getdata`, {
        withCredentials: true, // include credentials in the request
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      console.log(data);
      setUserId(data._id);

      if (response.status !== 200) {
        throw new Error(response.error);
      }


      if(data.emailVerified){
        setEmailVerified(true)
      }

      getBookingData(data._id);



    } catch (error) {
      console.log(error);
    }
  };


  console.log(userId);

  const getBookingData = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bookings/${userId}`, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = response.data;
      console.log(data);
      setBookingData(data.booking);
      setIsLoading(false);
      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.log(error);
      // navigate("/login");
    }
  };



  useEffect(() => {
    userData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleFilter = (value) => {
    setFilterValue(value);
  };

  const filteredBookings = Object.values(bookingData).filter((bookingData) => {
    if (filterValue === "Request Sent") {
      return bookingData.isApproved === "Request Sent";
    } else if (filterValue === "Approved By HOD") {
      return bookingData.isApproved === "Approved By HOD";
    }else if (filterValue === "Approved By Admin") {
      return bookingData.isApproved === "Approved By Admin";
    }else if (filterValue === "Rejected By Admin") {
      return bookingData.isApproved === "Rejected By Admin";
    }else if (filterValue === "Rejected By HOD") {
      return bookingData.isApproved === "Rejected By HOD";
    } else {
      return bookingData
    }
  });

  // const handleBookingClick = (hallId, hallName) => {
  //   navigate(`/bookingForm/${hallId}/${hallName}`)
  // };


  // const hallId =userData.hallId
  // const hallName = userData.hallName

  // const handleBookingClick = (hallId,hallName) => {
  //   navigate('/bookingForm', { state: { hallId, hallName } });

  // };


  // const handleBookingClick = () => {
  //   sendData(data);
  // };


  return (
    <>

      <div className="mt-6">
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
          Your<span className="text-indigo-700"> Bookings</span> </h1>

          <div className="flex flex-wrap mb-4 justify-center my-6">
            <button
              className={`rounded-lg px-4 py-2 mx-4 focus:outline-none ${filterValue === "all" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"}`}
              onClick={() => handleFilter("all")}
            >
              All
            </button>
            <button
              className={`rounded-lg px-4 py-2 mx-4 focus:outline-none ${filterValue === "Request Sent" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"}`}
              onClick={() => handleFilter("Request Sent")}
            >
              Pending
            </button>
            <button
              className={`rounded-lg px-4 py-2 mx-4 focus:outline-none ${filterValue === "Approved By HOD" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"}`}
              onClick={() => handleFilter("Approved By HOD")}
            >
              Approved By HOD
            </button>
            <button
              className={`rounded-lg px-4 py-2 mx-4 focus:outline-none ${filterValue === "Rejected By HOD" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"}`}
              onClick={() => handleFilter("Rejected By HOD")}
            >
              Rejected By HOD
            </button>
            <button
              className={`rounded-lg px-4 py-2 mx-4 focus:outline-none ${filterValue === "Approved By Admin" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"}`}
              onClick={() => handleFilter("Approved By Admin")}
            >
              Approved By Admin
            </button>
            <button
              className={`rounded-lg px-4 py-2 mx-4 focus:outline-none ${filterValue === "Rejected By Admin" ? "bg-blue-500 text-white" : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"}`}
              onClick={() => handleFilter("Rejected By Admin")}
            >
              Rejected By Admin
            </button>
          </div>


        {isLoading ? (
          <LoadingSpinner />
        ) : !emailVerified ? (

      

          <div class="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
            <div class="w-full lg:w-1/2">
              {/* <img alt='error' class="hidden lg:block" src="https://i.ibb.co/v30JLYr/Group-192-2.png" />
              <img alt='error' class="hidden md:block lg:hidden" src="https://i.ibb.co/c1ggfn2/Group-193.png" /> */}
              <img alt='error' class="hidden lg:block"  src="https://gcdnb.pbrd.co/images/2PF5rEtb8fJL.png?o=1" />
              
            </div>
            <div class="w-full lg:w-1/2">
              <h1 class="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800 ">Looks Like Yout Have Not Verified Your Email!</h1>
              <p class="py-4 text-xl text-gray-800">Please click on the below button and verify email before booking.</p>
              {/* <p class="py-2 text-base text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p> */}
              <div>
    
                <Link to="/about" ><button
                  class="w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Verify Email
                </button>
                </Link>
              </div>
            </div>
          </div>
    
        ) : ( Array.isArray(filteredBookings) && filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking._id} className="my-2 ">
              <div className="flex  w-full items-center justify-center ">
                <div className="w-full rounded-xl p-12  shadow-2xl shadow-blue-200 md:w-8/12 lg:w-6/12 bg-white ">

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
                    {/* <div className="grid-cols-1 lg:col-span-3">
                      <div className="mx-auto flex h-[90px] w-[90px] items-center justify-center rounded-full bg-blue-100 p-4">
                        <svg
                          id="logo-39"
                          width="50"
                          height="40"
                          viewBox="0 0 50 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M25.0001 0L50 15.0098V24.9863L25.0001 40L0 24.9863V15.0099L25.0001 0Z"
                            fill="#A5B4FC"
                            className="ccompli2"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 15.0098L25 0L50 15.0098V24.9863L25 40L0 24.9863V15.0098ZM25 33.631L44.6967 21.8022V18.1951L44.6957 18.1945L25 30.0197L5.30426 18.1945L5.3033 18.1951V21.8022L25 33.631ZM25 24.5046L40.1018 15.4376L36.4229 13.2298L25 20.0881L13.5771 13.2298L9.89822 15.4376L25 24.5046ZM25 14.573L31.829 10.4729L25 6.37467L18.171 10.4729L25 14.573Z"
                            fill="#4F46E5"
                            className="ccustom"
                          ></path>
                          <path
                            d="M25.0001 0L0 15.0099V24.9863L25 40L25.0001 0Z"
                            fill="#A5B4FC"
                            className="ccompli2"
                            fill-opacity="0.3"
                          ></path>
                        </svg>
                      </div>
                    </div> */}

                    <div className="col-span-1 lg:col-span-9">
                      <div className="text-center lg:text-left">
                        <h2 className="text-2xl font-bold text-zinc-700">{booking.name}</h2>
                        {/* <p className="mt-2 text-l font-semibold text-zinc-700">{booking.location}</p> */}
                        {/* <p className="mt-4 text-zinc-500">I am a Front End Developer and UI/UX Designer</p> */}
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Booked Hall Name</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking.bookedHallName}</p>
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Event Name</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking.eventName}</p>
                        </div>
                      </div>


                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Organizing Club</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking.organizingClub}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Department</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking.department}</p>
                        </div>
                      </div>
                      {/* <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Booking Id</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking._id}</p>
                        </div>
                      </div> */}


                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Event Date</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700"> {format(new Date(booking.eventDate), "EEEE dd-MM-yyyy")}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Start Time</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{format(parseISO((booking.startTime).slice(0, -1)), "hh:mm aa")}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">End Time</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{format(parseISO((booking.endTime).slice(0, -1)), "hh:mm aa")}</p>
                        </div>
                      </div>




                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Event Manager</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking.eventManager}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Phone Number</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking.phoneNumber}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Alternate Number</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{booking.altNumber}</p>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                        <div>
                          <p className="font-bold text-zinc-700">Created At</p>
                        </div>

                        <div>
                          <p className="text-m font-semibold text-zinc-700">{format(parseISO((booking.createdAt)), "EEEE dd-MM-yyyy hh:mm aa")}</p>
                        </div>
                      </div>




                      <div className="mt-6 ">
                        {/* <div>
                          <p className="text-m  text-xl sm:text-3xl md:text-4xl  lg:text-3xl xl:text-3xl  text-zinc-700 font-bold ">Status</p>
                        </div> */}

                        <div>
                          {booking.isApproved === "Request Sent" && (
                            <RequestSent/>
                            // <p className="text-m text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-yellow-500 font-black">
                            //   {booking.isApproved}

                            // </p>
                          )}
                          {booking.isApproved === "Approved By HOD" && (
                            <ApprovedByHod/>
                            // <p className="text-m text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-green-500 font-black">
                            //   {booking.isApproved}
                            // </p>
                          )} 
                          {booking.isApproved === "Approved By Admin" && (
                            <ApprovedByAdmin/>
                            // <p className="text-m text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-green-500 font-black">
                            //   {booking.isApproved}
                            // </p>
                          )}
                          {booking.isApproved === "Rejected By HOD" && (
                            <RejectedByHod/>
                            // <p className="text-m text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-red-500 font-black">
                            //   {booking.isApproved}
                            // </p>
                          )}  
                          {booking.isApproved === "Rejected By Admin" && (
                            <RejectedByAdmin/>
                            // <p className="text-m text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-red-500 font-black">
                            //   {booking.isApproved}
                            // </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          ))
        ) : (


          <h2 className="text-2xl font-bold text-zinc-700 text-center mt-10">No Bookings found.</h2>




        )
       ) }


      </div>
    </>
  );
};

export default Bookings;
