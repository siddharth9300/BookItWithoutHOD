import React from 'react'
import {  Link } from "react-router-dom"

const Unauthorized = () => {
  return (
    <div class="flex items-center flex-col justify-center lg:flex-row px-6 md:px-24  gap-16 lg:gap-28">
            <div class="w-full lg:w-1/2">
              {/* <img alt='error' class="hidden lg:block" src="https://i.ibb.co/v30JLYr/Group-192-2.png" />
              <img alt='error' class="hidden md:block lg:hidden" src="https://i.ibb.co/c1ggfn2/Group-193.png" /> */}
              <img alt='error' class="hidden lg:block"  src="https://gcdnb.pbrd.co/images/2PF5rEtb8fJL.png?o=1" />
              
            </div>
            <div class="w-full lg:w-1/2">
              <h1 class="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800 ">Looks Like You Are Not Authorized For This Page!</h1>
              <p class="py-4 text-xl text-gray-800">Please click on the below button to login.</p>
              {/* <p class="py-2 text-base text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p> */}
              <div>
    
                <Link to="/login" ><button
                  class="w-full lg:w-auto my-4 rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Login
                </button>
                </Link>
              </div>
            </div>
          </div>  )
}

export default Unauthorized