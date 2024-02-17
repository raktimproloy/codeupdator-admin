import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import { BASE_API } from "@/utils/BaseApi";
import axios from "axios";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import { useCookies } from "react-cookie";

const columns = [
  {
    label: "Id",
    field: "id",
  },
  {
    label: "Full Name",
    field: "full_name",
  },
  {
    label: "Email",
    field: "email",
  },
  {
    label: "Role",
    field: "role",
  },
  {
    label: "Manage",
    field: "manage",
  },
];

const DetailsUser = () => {
  const [user, setUser] = useState([])
  const [cookie, setCookie, removeCookie] = useCookies()
  const headers = {
    'Authorization': `Bearer ${cookie._token}`
    }
  useEffect(() => {
    axios.get(`${BASE_API}admin-user/get`, {
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
  }, [])


  return (
    <div>
      <Card title="Hover Table" noborder>
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
                      <td className="table-td">{row._id}</td>
                      <td className="table-td">{row.first_name} {row.last_name}</td>
                      <td className="table-td ">{row.email}</td>
                      <td className="table-td ">{row.role}</td>
                      <td className="table-td ">
                      <div className="flex space-x-3 rtl:space-x-reverse">
                        {/* <Tooltip content="View" placement="top" arrow animation="shift-away">
                          <button className="action-btn" type="button">
                            <Icon icon="heroicons:eye" />
                          </button>
                        </Tooltip> */}
                        <Tooltip content="Edit" placement="top" arrow animation="shift-away">
                          <button className="action-btn" type="button">
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
                          <button className="action-btn" type="button">
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

export default DetailsUser;