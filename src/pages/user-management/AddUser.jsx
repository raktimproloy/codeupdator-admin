import React, { useState } from "react";
import Card from "@/components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { BASE_API } from "@/utils/BaseApi";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [showLoading, setShowLoading] = useState(false)
  const navigate = useNavigate()
  const [newUserData, setNewUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: ""
  })
  const handleAddUser = (e) => {
    e.preventDefault()

    if(newUserData.first_name && newUserData.last_name && newUserData.email && newUserData.password && newUserData.confirm_password){
      if(newUserData.password === newUserData.confirm_password){
        setShowLoading(true)
        axios.post(`${BASE_API}admin-user/signup`, newUserData)
        .then(res => {
          setShowLoading(false)
          navigate("/user/details")
          ToastPopup("success", "New User Added Successful!")
        })
        .catch(err => {
          setShowLoading(false)
        })
      }else{
        ToastPopup("error", "Password Doesn't Match!")
      }
    }else{
      ToastPopup("error", "Required Input Missing!")
    }

  }
  return (
    <div>
      <Spinner showLoading={showLoading} />
      <Card title="Add User">
        <div className="space-y-4">
          <form onSubmit={(e) => handleAddUser(e)}>
            <div className="block md:flex gap-10 my-5">
              <div className="w-full md:w-1/2">
              <InputGroup
                label="First name"
                id="hi_Firstname1"
                type="text"
                placeholder="First name"
                onChange={(e) => setNewUserData({...newUserData, first_name: e.target.value})}
                prepend={<Icon icon="heroicons-outline:user" />}
                merged
              />
              </div>
              <div className="w-full md:w-1/2">
              <InputGroup
                label="Last name"
                id="hi_Lastname1"
                type="text"
                placeholder="Last name"
                onChange={(e) => setNewUserData({...newUserData, last_name: e.target.value})}
                prepend={<Icon icon="heroicons-outline:user" />}
                merged
              />
              </div>
            </div>
            
            <InputGroup
              label="Email"
              id="hi_email1"
              type="email"
              placeholder="Type your email"
              onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
              prepend={<Icon icon="heroicons-outline:mail" />}
              merged
            />
            <div className="block md:flex gap-10 my-5">
              <div className="w-full md:w-1/2">
              <InputGroup
                label="Password"
                id="hi_password1"
                type="Password"
                placeholder="8+ characters, 1 capitat letter "
                onChange={(e) => setNewUserData({...newUserData, password: e.target.value})}
                prepend={<Icon icon="heroicons-outline:lock-closed" />}
                merged
              />
              </div>
              <div className="w-full md:w-1/2">
              <InputGroup
                label="Confirm password"
                id="hi_password2"
                type="password"
                placeholder="8+ characters, 1 capitat letter "
                onChange={(e) => setNewUserData({...newUserData, confirm_password: e.target.value})}
                prepend={<Icon icon="heroicons-outline:lock-closed" />}
                merged
              />
              </div>
            </div>
            
            <div className="my-4">
              <Button type="submit" text="Submit" className="btn-dark" />
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AddUser;