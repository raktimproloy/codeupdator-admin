import React, { useEffect, useState } from 'react'
import Card from "@/components/ui/Card";
import axios from 'axios';
import { BASE_API } from "@/utils/BaseApi";
import Tooltip from "@/components/ui/Tooltip";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Select from "react-select";
import Textinput from "@/components/ui/Textinput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
const columns = [
    {
      label: "Id",
      field: "id",
    },
    {
      label: "Title",
      field: "title",
    },
    {
      label: "Slug",
      field: "slug",
    },
    {
      label: "Font Color",
      field: "font-color",
    },
    {
      label: "Bg Color",
      field: "bg-color ",
    },
    {
        label: "Action",
        field: "action",
    },
    {
      label: "Status",
      field: "status",
  },
  ];

  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };
  const schema = yup
  .object({
  })
  .required();
export default function Package() {
    const [packages, setPackages] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [newPackageData, setNewPackageData] = useState({
      title: '',
      slug: '',
      font_color: '',
      bg_color: '',
    })
    const [updatePackage, setUpdatePackage] = useState({
      title: '',
      slug: '',
      font_color: '',
      bg_color: '',
    })
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm({
        resolver: yupResolver(schema),
        //
        mode: "all",
      });
    const fetchUser = () => {
        axios.get(`${BASE_API}package/get`)
        .then(res => {
            setPackages(res.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
      }
      useEffect(() => {
        fetchUser()
      }, [])

    const addPackage = () => {
        axios.post(`${BASE_API}package/add`, {...newPackageData})
        .then(res => {
            setShowModal(false)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }

    const handleUpdatePackage = () => {
        axios.put(`${BASE_API}package/update/${updatePackage.id}`, {...updatePackage})
        .then(res => {
            showUpdateModal(false)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
    console.log(updatePackage)
  return (
    <div>
        <Modal
          title="Change Package"
          label="Warning "
          labelClass="btn-outline-success"
          themeClass="bg-success-500"
          activeModal={showUpdateModal}
          onClose={() => {
            setShowUpdateModal(false)
          }}
          footerContent={
            <Button
              text="Update"
              className="btn-success "
              onClick={() => {
                handleUpdatePackage()
              }}
            />
          }
        >
          <div className="block md:flex gap-10 my-5">
              <div className="w-full md:w-1/2">
                <div>
                    <Textinput
                        name="title"
                        label="Title"
                        type="text"
                        register={register}
                        defaultValue=""
                        placeholder="Enter title"
                        className="h-[48px]"
                        value={updatePackage.title}
                        onChange={(e) => setUpdatePackage({...updatePackage, title: e.target.value})}
                    />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div>
                    <Textinput
                        name="slug"
                        label="Slug"
                        type="text"
                        register={register}
                        defaultValue=""
                        placeholder="Enter slug"
                        className="h-[48px]"
                        value={updatePackage.slug}
                        onChange={(e) => setUpdatePackage({...updatePackage, slug: e.target.value})}
                    />
                </div>
              </div>
            </div>
            <div className="block md:flex gap-10 my-5">
              <div className="w-full md:w-1/2">
                <div>
                    <Textinput
                        name="font_color"
                        label="Font Color"
                        type="text"
                        register={register}
                        defaultValue=""
                        placeholder="Enter Font Color"
                        className="h-[48px]"
                        value={updatePackage.font_color}
                        onChange={(e) => setUpdatePackage({...updatePackage, font_color: e.target.value})}
                    />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div>
                    <Textinput
                        name="bg_color"
                        label="Background Color"
                        type="text"
                        register={register}
                        defaultValue=""
                        placeholder="Enter Background Color"
                        className="h-[48px]"
                        value={updatePackage.bg_color}
                        onChange={(e) => setUpdatePackage({...updatePackage, bg_color: e.target.value})}
                    />
                </div>
              </div>
            </div>
            <div className="block md:flex gap-10 my-5">
              <div className="w-full md:w-1/2">
              <div>
                <label htmlFor=" hh23" className="form-label">
                  Status
                </label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  name="loading"
                  options={[
                    { value: "publish", label: "Publish" },
                    { value: "draft", label: "Draft" },
                  ]}
                  defaultValue={{ value: updatePackage.status, label: updatePackage.status }}
                  isLoading={false}
                  isClearable={false}
                  id="hh23"
                  styles={styles}
                  // value={updatePackage.status}
                  onChange={(e) => setUpdatePackage({...updatePackage, status: e.value})}
                />
              </div>
              </div>
            </div>
        </Modal>
        <Modal
          title="Add Package"
          label="Warning "
          labelClass="btn-outline-success"
          themeClass="bg-success-500"
          activeModal={showModal}
          onClose={() => {
            setShowModal(false)
          }}
          footerContent={
            <Button
              text="Accept"
              className="btn-success "
              onClick={() => {
                addPackage()
              }}
            />
          }
        >
          <div className="block md:flex gap-10 my-5">
              <div className="w-full md:w-1/2">
                <div>
                <Textinput
                  label="Title"
                  type="text"
                  placeholder="Enter title"
                  className="h-[48px]"
                  defaultValue={newPackageData.title}
                  onChange={(e) => setNewPackageData({ ...newPackageData, title: e.target.value })}
                />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div>
                    <Textinput
                        label="Slug"
                        type="text"
                        placeholder="Enter slug"
                        className="h-[48px]"
                        value={newPackageData.slug}
                        onChange={(e) => setNewPackageData({...newPackageData, slug: e.target.value})}
                    />
                </div>
              </div>
            </div>
            <div className="block md:flex gap-10 my-5">
              <div className="w-full md:w-1/2">
                <div>
                    <Textinput
                        label="Font Color"
                        type="text"
                        placeholder="Enter Font Color"
                        className="h-[48px]"
                        value={newPackageData.font_color}
                        onChange={(e) => setNewPackageData({...newPackageData, font_color: e.target.value})}
                    />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div>
                    <Textinput
                        label="Background Color"
                        type="text"
                        placeholder="Enter Background Color"
                        className="h-[48px]"
                        value={newPackageData.bg_color}
                        onChange={(e) => setNewPackageData({...newPackageData, bg_color: e.target.value})}
                    />
                </div>
              </div>
            </div>
            <div className="block md:flex gap-10 my-5">
              <div className="w-full md:w-1/2">
              <div>
                <label htmlFor=" hh23" className="form-label">
                  Version
                </label>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  name="loading"
                  options={[
                    { value: "publish", label: "Publish" },
                    { value: "draft", label: "Draft" },
                  ]}
                  isLoading={false}
                  isClearable={false}
                  id="hh23"
                  styles={styles}
                  onChange={(e) => setNewPackageData({...newPackageData, status: e.value})}
                />
              </div>
              </div>
            </div>
        </Modal>
        <Card title="Hover Table" noborder>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className='flex justify-end me-5 mb-3'>
                <Button text="Add Package" className="btn-success" onClick={() => setShowModal(true)} />
            </div>
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
                  {packages.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <td className="table-td">{row.id}</td>
                      <td className="table-td">{row.title}</td>
                      <td className="table-td ">{row.slug}</td>
                      <td className="table-td ">{row.font_color}</td>
                      <td className="table-td ">{row.bg_color}</td>
                      <td className="table-td ">{row.status}</td>
                      <td className="table-td ">
                      <div className="flex space-x-3 rtl:space-x-reverse">
                        <Tooltip content="Edit" placement="top" arrow animation="shift-away">
                          <button className="action-btn" type="button" onClick={() => {setShowUpdateModal(true); setUpdatePackage(row)}}>
                            <Icon icon="heroicons:pencil-square" />
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
  )
}
