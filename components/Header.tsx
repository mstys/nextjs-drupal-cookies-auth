import Link from 'next/link'
import { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { userService } from '../services';

export default function Header() {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link href="/">
            <img
              className="h-8 w-auto sm:h-10"
              src="/vmlyr-logo-black.png"
              alt=""
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          {
            userService.userValue ?
              <div>
                User: {userService.userValue.uid}
                <a
                  onClick={() => { userService.logout() }}
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Logout
                </a>
              </div>
              :
              <Link href="/login">
                <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                  Login in
                </a>
              </Link>
          }
        </div>
      </div>
    </div>
  )
}
