'use client'

import { DevicePhoneMobileIcon, EnvelopeIcon,  UserCircleIcon } from "@heroicons/react/24/outline"
import { useFormState } from 'react-dom';
import toast from "react-hot-toast";
import { useEffect } from 'react';

export default function UpdateAccount({ user, updateAction }) {
  const [state, submitUpdateAccount] = useFormState(updateAction,
    {
        message: '',
        error: ''
    })

    useEffect(() => {
      if (state.message) {
          toast.success(state.message);
      }
  }, [state, state.message]);

  useEffect(() => {
      if (state.error) {
          console.log(state.error);
          toast.error(state.error);
      }
  }, [state.error]);

  return (
    <div className="flex flex-col w-full">
      <form className="w-1/2 max-w-md mx-auto" action={submitUpdateAccount}>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm  border border-e-0 rounded-s-md bg-gray-600 text-gray-400 border-gray-600">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
            </span>
            <input type="email" id="email" name="email" className="shadow-sm text-sm rounded-e-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white shadow-sm-light" defaultValue={user.email} required readOnly />
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Name</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm  border border-e-0 rounded-s-md bg-gray-600 text-gray-400 border-gray-600">
              <UserCircleIcon className="h-5 w-5 text-gray-400" />
            </span>
            <input type="text" id="name"name="name" className="shadow-sm  border text-sm rounded-e-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" defaultValue={user.name} required />
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-white">Mobile</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm  border border-e-0 rounded-s-md bg-gray-600 text-gray-400 border-gray-600">
              <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400" />
            </span>
            <input type="text" id="mobile" name="mobile" className="shadow-sm border text-sm rounded-e-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-sm-light" defaultValue={user.mobile} required />
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="address" className="block mb-2 text-sm font-medium text-white">Address</label>
          <textarea id="address" rows="4" name="address" className="block p-2.5 w-full text-sm rounded-lg border  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Your Address" defaultValue={user.address} required></textarea>
        </div>
        <button type="submit" className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Update</button>
      </form>

    </div>
  )
}