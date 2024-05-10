import React, { useEffect, useState, Fragment } from "react";
import Card from "@/components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { BASE_API } from "@/utils/BaseApi";
import axios from "axios";
import Spinner from "../../components/Spinner";
import Select from "react-select";
import DropZone from "./DropZone";
import Textarea from "@/components/ui/Textarea";
import { useCookies } from "react-cookie";
import { ToastPopup } from "@/lib/ToastPopup";

import { Tab } from "@headlessui/react";

import TinyMCE from "./TinyMCE";
import { useNavigate, useParams } from "react-router-dom";

// dummy data 
const packages = [
  { value: "reactjs", label: "ReactJs" },
  { value: "vuejs", label: "VueJs" },
  { value: "laravel", label: "Laravel" },
];

const version = [
  { value: "20.03.01", label: "20.03.01" },
  { value: "18.05.22", label: "18.05.22" },
  { value: "15.02.05", label: "15.02.05" },
];

const styles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const buttons = [
  {
    title: "Info",
    icon: "heroicons-outline:home",
  }
];

const EditPost = () => {
  const { id } = useParams();
  const [text, setText] = useState("")
  const [value, setValue] = useState("<p>TinyMCE Editor text</p>")
  const [showLoading, setShowLoading] = useState(false)
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState("")
  const navigate = useNavigate()

  // Cookies
  const [cookie, removeCookie] = useCookies()
  const headers = {
  'Authorization': `Bearer ${cookie._token}`,
  // 'Content-Type': 'application/json'
  }
  const [updatePostData, setUpdatePostData] = useState({
    package_name: packages[0].value,
    version: version[0].value
  })


  const fetchPost = () => {
    axios.get(`${BASE_API}update-post/get/${id}`, {
      headers: headers
    })
    .then(res => {
      setValue(res.data.details)
      setImage(res.data.image)
      setUpdatePostData({
        package_name: res.data.package_name,
        version: res.data.version
      })
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


  // Add new Post
 const handleAddPost = () => {
  if(files.length > 0){
    const formData = new FormData();
    formData.append("image", files[0]);
    
    axios.post(`https://upload.codesstackflow.com/upload/single`, formData)
      .then((res) => {
        const imageUrl = res.data.pathname + res.data.filename

        const updatedData = {
          package: updatePostData.package_name,
          version: updatePostData.version,
          details: value,
          image: imageUrl,
        }
        axios.put(`${BASE_API}update-post/update/${id}`, updatedData, {
          headers: headers
        })
        .then((res) => {
            setShowLoading(false)
            ToastPopup("success", "New Blog Added!")
            navigate("/post/details")
        })
        .catch((err) => {
          setShowLoading(false)
          if(err.response.data.error.includes("is required")){
            ToastPopup("error", "Required Value Missing!")
          }
          if(err.response.data.error === "Authentication error!"){
            removeCookie("_token")
              ToastPopup("error", "Token Was Expired!")
            }else{
              ToastPopup("error", "There was some problem")
            }
        });
      })
      .catch((err) => {
        ToastPopup("error", "File not uploaded!")
      });
  }else{
    const updatedData = {
      package: updatePostData.package_name,
      version: updatePostData.version,
      details: value,
      image: image,
    }
    axios.put(`${BASE_API}update-post/update/${id}`, updatedData, {
      headers: headers
    })
    .then((res) => {
        setShowLoading(false)
        ToastPopup("success", "New Blog Added!")
        navigate("/post/details")
    })
    .catch((err) => {
      setShowLoading(false)
      if(err.response.data.error.includes("is required")){
        ToastPopup("error", "Required Value Missing!")
      }
      if(err.response.data.error === "Authentication error!"){
        removeCookie("_token")
          ToastPopup("error", "Token Was Expired!")
        }else{
          ToastPopup("error", "There was some problem")
        }
    });
  }
 }


//  Change select Options
  function handlePackageChange(e) {
    setUpdatePostData({
        ...updatePostData, package_name:e.value
    })
  }
  function handleVersionChange(e) {
    setUpdatePostData({
        ...updatePostData, version:e.value
    })
  }

  return (
    <div>
      <Spinner showLoading={showLoading} />
      <Card title="Update New Post">
      <Tab.Group>
        <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
          {buttons.map((item, i) => (
            <Tab as={Fragment} key={i}>
              {({ selected }) => (
                <button
                  className={` text-sm font-medium mb-7 capitalize bg-white
          dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2
            transition duration-150 before:transition-all before:duration-150 relative 
            before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 
            before:-translate-x-1/2 
            
            ${
              selected
                ? "text-primary-500 before:w-full"
                : "text-slate-500 before:w-0 dark:text-slate-300"
            }
            `}
                >
                  {item.title}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="block md:flex gap-10 my-5">
              <div className="w-full md:w-1/2">
              <div>
                <label htmlFor=" hh23" className="form-label">
                  Package Name: <h5>{updatePostData.package_name}</h5>
                </label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={packages[0].value}
                  name="loading"
                  options={packages}
                  isLoading={true}
                  isClearable={false}
                  onChange={(e) => handlePackageChange(e)}
                  id="hh23"
                  styles={styles}
                />
              </div>
              </div>
              <div className="w-full md:w-1/2">
              <div>
                <label htmlFor=" hh23" className="form-label">
                  Version: <h5>{updatePostData.version}</h5>
                </label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={updatePostData.version}
                  name="loading"
                  options={version}
                  isLoading={true}
                  isClearable={false}
                  onChange={(e) => handleVersionChange(e)}
                  id="hh23"
                  styles={styles}
                />
              </div>
              </div>
            </div>
            <div className="flex justify-center py-3">
              <img src={`https://upload.codesstackflow.com/${image}`} alt="" />
            </div>
            <DropZone files={files} setFiles={setFiles} />

            <div className="my-5">
              <TinyMCE text={text} setText={setText} value={value} setValue={setValue} />
            </div>
            <div className="my-4 flex justify-end">
              <Button text="Submit" className="btn-dark" onClick={(e) => handleAddPost(e)} />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      
      </Card>
    </div>
  );
};

export default EditPost;