import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { BASE_API } from "@/utils/BaseApi";
import axios from "axios";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import { useCookies } from "react-cookie";
import { DatabaseDate } from "../../lib/DatabaseDate";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    label: "Id",
    field: "id",
  },
  {
    label: "Package Name",
    field: "package_name",
  },
  {
    label: "Version",
    field: "version",
  },
  {
    label: "Date",
    field: "date",
  },
  {
    label: "Manage",
    field: "manage",
  },
];


const DetailsPost = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [postId, setPostId] = useState("")
  const [cookie, setCookie, removeCookie] = useCookies()
  const headers = {
    'Authorization': `Bearer ${cookie._token}`
    }

    const fetchPost = () => {
      axios.get(`${BASE_API}update-post/get`, {
        headers: headers
      })
      .then(res => {
        setUser(res.data)
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

  const handleDeletePost = () => {
    axios.delete(`${BASE_API}update-post/delete/${postId}`, {
      headers: headers
    })
    .then(res => {
      fetchPost()
      setShowModal(false)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
            <Modal
          title="Warning"
          label="Warning "
          labelClass="btn-outline-warning"
          themeClass="bg-warning-500"
          activeModal={showModal}
          onClose={() => {
            setShowModal(false)
          }}
          footerContent={
            <Button
              text="Accept"
              className="btn-warning "
              onClick={() => {
                handleDeletePost()
              }}
            />
          }
        >
          <h4 className="font-medium text-lg mb-3 text-slate-900">
            Lorem ipsum dolor sit.
          </h4>
          <div className="text-base text-slate-600 dark:text-slate-300">
            Oat cake ice cream candy chocolate cake chocolate cake cotton
            candy dragée apple pie. Brownie carrot cake candy canes bonbon
            fruitcake topping halvah. Cake sweet roll cake cheesecake cookie
            chocolate cake liquorice.
          </div>
      </Modal>
      <Card title="Post Details">
      <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                <thead className="bg-slate-200 dark:bg-slate-700">
                  <tr>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className=" table-th ">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                  {user.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <td className="table-td">{row.id}</td>
                      <td className="table-td">{row.package_name}</td>
                      <td className="table-td ">{row.version}</td>
                      <td className="table-td ">{DatabaseDate(row.createdAt)}</td>
                      <td className="table-td ">
                      <div className="flex space-x-3 rtl:space-x-reverse">
                        {/* <Tooltip content="View" placement="top" arrow animation="shift-away">
                          <button className="action-btn" type="button">
                            <Icon icon="heroicons:eye" />
                          </button>
                        </Tooltip> */}
                        <Tooltip content="Edit" placement="top" arrow animation="shift-away">
                          <button className="action-btn" type="button" onClick={() => navigate(`/post/edit/${row.id}`)}>
                            <Icon icon="heroicons:pencil-square" />
                          </button>
                        </Tooltip>
                        <Tooltip
                          content="Delete"
                          placement="top"
                          arrow
                          animation="shift-away"
                          theme="danger"
                        >
                          <button className="action-btn" type="button" onClick={() => {setPostId(row.id);setShowModal(true) }}>
                            <Icon icon="heroicons:trash" />
                          </button>
                        </Tooltip>
                      </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DetailsPost;