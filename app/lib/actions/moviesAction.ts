'use server'
import { createShowTimeInterface } from "@/common.types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";


export  async function fetchListMovies() {
	const res = await fetch(`${process.env.DOMAIN}/QuanLyPhim/LayDanhSachPhim?maNhom=GP00`,{
		next: { tags: ["listMoviesClient"] }
	})
	
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		
		throw new Error(`${res.status} : Failed to fetch data list movies`);
	}
	const data = await res.json()
	
	return data.content
}

export  async function fetchMovieDetail(maPhim:string) {
	const res = await fetch(`${process.env.DOMAIN}/QuanLyPhim/LayThongTinPhim?MaPhim=${Number(maPhim)}`,{
		next: { tags: ["movieDetail"] }
	})
	
	if (!res.ok) {
		
		return notFound()
	}
	const data = await res.json()
	
	return data.content
}


export async function fetchListMoviesAction(soTrang:number,soPhanTuTrenTrang:number,tenPhim?:string) {

	const keywordParam =  tenPhim  ? `&tenPhim=${tenPhim}` : '';
	const res = await fetch(
	  `${process.env.DOMAIN}/QuanLyPhim/LayDanhSachPhimPhanTrang?MaNhom=GP00${keywordParam}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`,{
		next: { tags: ["listMoviesAdmin"] }
		
		,
	  }
	);
	if (!res.ok) {
	  
	  throw new Error(`${res.status} : Failed to load data list movies`);
	}
	  const data = await res.json();
	
 
	  return data.content
  }

export async function addNewMovieAction (newMovie:FormData){

	const res = await fetch(
		`${process.env.DOMAIN}/QuanLyPhim/ThemPhimUploadHinh`,{
			method:'POST',
			body: newMovie,
		}
	  );
	  const data = await res.json();
	  
	  return data
}
export async function updateMovieAction (movie:FormData){
	const userCookie = cookies().get("REMEMBERME");
	if (!userCookie) return;
	const { accessToken } = JSON.parse(userCookie.value);
	const res = await fetch(
		`${process.env.DOMAIN}/QuanLyPhim/CapNhatPhimUpload`,{
			method:'POST',
			headers:{
				'Authorization': `Bearer ${accessToken}`,
			},
			body: movie,
		}
	  );
	  const data = await res.json();
	 
	  return data
}
export async function deleteMovieAction  (id:number){
	const userCookie = cookies().get("REMEMBERME");
	if (!userCookie) return;
	const { accessToken } = JSON.parse(userCookie.value);
	const res = await fetch(
		`${process.env.DOMAIN}/QuanLyPhim/XP?MaPhim=${id}`,{
			method:'DELETE',
			headers:{
				'Content-Type' : 'application/json',
				'Authorization': `Bearer ${accessToken}`,
			}
		}
	  );
	  const data = await res.json();
	  if(data.statusCode){
		revalidateTag('listMoviesAdmin')
		revalidateTag('listMoviesClient')
	  }
	  return data
}

export async function createShowtimeAction (showtime:createShowTimeInterface) {
	const userCookie = cookies().get("REMEMBERME");
	if (!userCookie) return;
	const { accessToken } = JSON.parse(userCookie.value);
	const res = await fetch(
		`${process.env.DOMAIN}/QuanLyDatVe/TaoLichChieu`,{
			method:'POST',
			headers:{
				'Content-Type' : 'application/json',
				'Authorization': `Bearer ${accessToken}`,
			},
			body:JSON.stringify(showtime)
		}
	  );
	
	  return res.json()
}

export const fetchImageAction  =async (url:string)=>{
	const response = await fetch(url);
const buffer = await response.arrayBuffer();
const array = new Uint8Array(buffer);
const base64String = Buffer.from(array).toString('base64');
return base64String;
	
	
}