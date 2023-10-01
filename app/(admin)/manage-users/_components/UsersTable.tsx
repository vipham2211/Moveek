"use client";
import { deleteUserAction } from "@/app/lib/actions/userAction";
import { orderBy } from "@/common.funcs";
import { useModal } from "@/common.stateFuncs";
import { DataListUsersInterface, NewUserInterface } from "@/common.types";
import Modal from "@/components/ui/Modal";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import EditUser from "./EditUser";

interface UsersTableProps {
  dataListUsersState: DataListUsersInterface;
  setDataListUsersState: (val: DataListUsersInterface) => void;
}

const ColumnTitle = [
  { name: "Username", value: "taiKhoan", sort: true, responsive: false },
  { name: "Password", value: "matKhau", sort: false, responsive: true },
  { name: "Fullname", value: "hoTen", sort: true, responsive: true },
  { name: "Email", value: "email", sort: true, responsive: true },
  { name: "Phone", value: "soDt", sort: false, responsive: true },
  { name: "Roles", value: "maLoaiNguoiDung", sort: true },
];

const UsersTable = ({
  dataListUsersState,
  setDataListUsersState,
}: UsersTableProps) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [sortBy, setSortBy] = useState("");
  const [sortField, setSortField] = useState("");
  const [userState,setUserState] = useState<NewUserInterface>()



  const handleSort = (sortBy: "asc" | "desc", sortField: string) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUsers = [...dataListUsersState.items];
    cloneListUsers = orderBy(cloneListUsers, sortField, sortBy);
    setDataListUsersState({ ...dataListUsersState, items: cloneListUsers });
  };

  const deleteUser = async (taiKhoan: string) => {
    const { statusCode, content } = await deleteUserAction(taiKhoan);
    if (statusCode === 200) {
      toast.success("Xóa người dùng thành công");
    } else {
      toast.error(content);
    }
  };

  const editUser = (user:NewUserInterface) => {
    openModal();
    setUserState(user)
  };

  return (
  
    <Fragment>
  <table className="w-full border-collapse border border-[#eff0fe] ">
      <thead>
        <tr className="bg-dashboard">
          {ColumnTitle.map((item, index) => {
            return (
              <th
                key={index}
                className={`${
                  item.responsive &&
                  `hidden ${
                    item.name === "Fullname" ? `md:table-cell` : `lg:table-cell`
                  } `
                } border select-none  py-4 px-3 text-left border-[#eff0fe] ${
                  item.sort && `cursor-pointer`
                } `}
              >
                <div
                  className="flex items-center justify-between"
                  onClick={() =>
                    item.sort &&
                    handleSort(
                      sortBy === "asc" && sortField === item.value
                        ? "desc"
                        : "asc",
                      item.value
                    )
                  }
                >
                  <p>{item.name}</p>
                  {item.sort && (
                    <div>
                      <ChevronUpIcon
                        className={`w-3 h-3 ${
                          sortBy === "asc" &&
                          sortField === item.value &&
                          `text-black`
                        }`}
                      />
                      <ChevronDownIcon
                        className={`w-3 h-3 ${
                          sortBy === "desc" &&
                          sortField === item.value &&
                          `text-black`
                        }`}
                      />
                    </div>
                  )}
                </div>
              </th>
            );
          })}
          <th className="border py-4 px-3 text-left border-[#eff0fe]">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {dataListUsersState.items.map((user, index) => {
          return (
            <tr key={index}>
              <td className=" border py-4 px-3 text-left border-[#eff0fe]">
                {user.taiKhoan}
              </td>
              <td className="hidden lg:table-cell border py-4 px-3 text-left border-[#eff0fe]">
                {user.matKhau}
              </td>
              <td className="hidden md:table-cell border py-4 px-3 text-left border-[#eff0fe]">
                {user.hoTen}
              </td>
              <td className="hidden lg:table-cell border py-4 px-3 text-left border-[#eff0fe]">
                {user.email}
              </td>
              <td className="hidden lg:table-cell border py-4 px-3 text-left border-[#eff0fe]">
                {user.soDt !== null ? (
                  <span>{user.soDt}</span>
                ) : (
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                    Empty{" "}
                  </span>
                )}
              </td>
              <td className=" border py-4 px-3 text-left border-[#eff0fe]">
                <span
                  className={`text-sm ${
                    user.maLoaiNguoiDung === "QuanTri"
                      ? `bg-pink-100 px-2 py-1 rounded-full text-pink-700`
                      : `bg-green-100 px-2 py-1 rounded-full text-green-700`
                  } `}
                >
                  {user.maLoaiNguoiDung === "QuanTri" ? "Admin" : "Customer"}
                </span>
              </td>
              <td className=" text-center py-4 px-3  border border-[#eff0fe]">
                <a title="Delete">
                  <TrashIcon
                    className="w-5 h-5 inline-block hover:text-red-500 cursor-pointer"
                    onClick={() => deleteUser(user.taiKhoan)}
                  />
                </a>
                <a title="Edit">
                  <PencilSquareIcon
                    className="w-5 h-5 inline-block mx-2 hover:text-green-500 cursor-pointer"
                    onClick={() => editUser(user)}
                  />
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          position={"rightSidebar"}
          heightStyle="heightFullSidebar"
          width="w-[300px] sm:w-[400px]"
        >
        {userState &&<EditUser user={userState} closeModal={closeModal}  /> }  
        </Modal>
  
    </Fragment>
  );
};

export default UsersTable;
