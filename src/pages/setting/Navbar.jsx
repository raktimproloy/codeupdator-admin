import React, { useEffect, useState } from 'react'
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { BASE_API } from "@/utils/BaseApi";
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function Navbar() {

    const [navbarString, setNavbarString] = useState()
    const [cookie] = useCookies()
    const headers = {
        'Authorization': `Bearer ${cookie._token}`
    }
    const fetchPost = () => {
        axios.get(`${BASE_API}setting/get`, {
          headers: headers
        })
        .then(res => {
            setNavbarString(res.data.data.navbar)
        })
        .catch(err => {
          // Authentication failed
          console.log(err.response.data)
          // if(err?.response?.data?.error === "Authentication failed"){
          //   removeCookie("_token")
          // }
        })
      }
  
    useEffect(() => {
      fetchPost()
    }, [])

    const handleUpdate = () => {
        axios.put(`${BASE_API}setting/update/navbar`, {navbar: JSON.parse(navbarString)}, {
            headers: headers
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const prettifyJson = (jsonString) => {
      try {
        const jsonObject = JSON.parse(jsonString);
        return JSON.stringify(jsonObject, null, 2); // 2 spaces for indentation
      } catch (error) {
        console.error('Invalid JSON string', error);
        return jsonString; // Return the original string if parsing fails
      }
    };
  return (
    <Card title="Basic Textarea">
        <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
        <textarea
          id="message"
          rows="10"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
          defaultValue={prettifyJson(navbarString)}
          onChange={(e) => setNavbarString(e.target.value)}
        ></textarea>
        <div className='flex justify-end gap-3 py-3'>
            <Button
                text="Update"
                className="btn-warning "
                onClick={() => {
                    handleUpdate()
                }}
            />
        </div>
    </Card>
  )
}
