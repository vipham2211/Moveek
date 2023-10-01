'use client'
import { PlusSmallIcon } from '@heroicons/react/24/outline'
import React,{useEffect, useState} from 'react'
import EntriesListBox from '@/app/(admin)/_components/EntriesListBox'
import { DataListMoviesInterface } from '@/common.types'
import Pagination from '@/app/(admin)/_components/Pagination'
import { useRouter } from 'next/navigation'
import MoviesTable from './MoviesTable'
import SearchTable from '../../_components/SearchTable'
import AddNewButton from '../../_components/AddNewButton'
import { useModal } from '@/common.stateFuncs'
import AddNewMovie from './AddNewMovie'

interface UsersTableProps {
	dataListMovies:DataListMoviesInterface,
	keyword:string|undefined
}


const entries = [10,15,20,25 ];

const Content = ({dataListMovies,keyword}:UsersTableProps) => {
	const { isOpen, openModal, closeModal } = useModal();
	const [dataListMoviesState ,setDataListMoviesState] = useState<DataListMoviesInterface>(dataListMovies)
	const [limit, setLimit] = useState(entries[0])
	
	useEffect(()=>{
		setDataListMoviesState(dataListMovies)
		
	},[dataListMovies])

	

  return (
	<div className="p-6 bg-white rounded-lg shadow-lg   ">
	<div className="flex mb-3 ">
	<AddNewButton isOpen={isOpen} openModal={openModal} closeModal={closeModal} text="Add new movie">
            <AddNewMovie closeModal={closeModal}  />
    </AddNewButton>
	</div>
	<div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row items-start sm:justify-between py-4  sm:items-center">
	  <div className="flex space-x-2 items-center">
		<EntriesListBox keyword={keyword} entries={entries} href='manage-movies' currentPage={limit*dataListMoviesState.currentPage > dataListMoviesState.totalCount? 1  : dataListMoviesState.currentPage} limit={limit} setLimit={setLimit}  />
		<span>entries per page</span>
	  </div>

	  <SearchTable limit={limit} keyword={keyword} href="manage-movies"/>
	
	  
	</div>
	<MoviesTable dataListMoviesState={dataListMoviesState} setDataListMoviesState={setDataListMoviesState}/>
	<Pagination  href='manage-movies' currentPage={dataListMoviesState.currentPage} limit={limit}  totalCount={dataListMoviesState.totalCount} keyword={keyword} />
  </div>
  )
}

export default Content