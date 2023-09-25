"use client";
import React, { useEffect, useState } from "react";
import EntriesListBox from "@/app/(admin)/EntriesListBox";
import UsersTable from "./UsersTable";
import { DataListUsersInterface } from "@/common.types";
import Pagination from "@/app/(admin)/Pagination";
import SearchTable from "../../SearchTable";
import AddNewButton from "../../AddNewButton";
import { useModal } from "@/common.stateFuncs";
import AddNewUser from "../AddNewUser";

interface UsersTableProps {
  dataListUsers: DataListUsersInterface;
  keyword: string | undefined;
}

const entries = [10, 15, 20, 25];

const Content = ({ dataListUsers, keyword }: UsersTableProps) => {

  const { isOpen, openModal, closeModal } = useModal();
  const [dataListUsersState, setDataListUsersState] =
    useState<DataListUsersInterface>(dataListUsers);
  const [limit, setLimit] = useState(entries[0]);

  useEffect(() => {
    setDataListUsersState(dataListUsers);
  }, [dataListUsers]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg  ">
      <div className="flex mb-3 ">
       
        <AddNewButton isOpen={isOpen} openModal={openModal} closeModal={closeModal} text="Add new user">
            <AddNewUser  closeModal={closeModal}/>
        </AddNewButton>
      </div>
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row items-start sm:justify-between py-4  sm:items-center">
        <div className="flex space-x-2 items-center">
          <EntriesListBox
            keyword={keyword}
            entries={entries}
            href="manage-users"
            currentPage={
              limit * dataListUsersState.currentPage >
              dataListUsersState.totalCount
                ? 1
                : dataListUsersState.currentPage
            }
            limit={limit}
            setLimit={setLimit}
          />
          <span>entries per page</span>
        </div>

        <SearchTable limit={limit} keyword={keyword} href="manage-users" />
      </div>
      <UsersTable
        dataListUsersState={dataListUsersState}
        setDataListUsersState={setDataListUsersState}
      />
      <Pagination
        href="manage-users"
        currentPage={dataListUsersState.currentPage}
        limit={limit}
        totalCount={dataListUsersState.totalCount}
        keyword={keyword}
      />
    </div>
  );
};

export default Content;
