'use server'
import { encode } from "@/common.funcs";
import { ListTicketInterface } from "@/common.types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";


export  async function fetchListCinemas(cinemaSystemId:string) {
	const res = await fetch(  `${process.env.DOMAIN}/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${cinemaSystemId}&maNhom=GP00`,{
		next: { tags: ['listCinemas'] }
	}
	)
	
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		
		throw new Error(`${res.status} : Failed to fetch data list cinemas`);
	}
	const data = await res.json()
	if(data.statusCode === 200){
		revalidateTag('listCinemas')
	}
	return data.content[0].lstCumRap;
  }

export  async function fetchCinemaSystems() {
	const res = await fetch(`${process.env.DOMAIN}/QuanLyRap/LayThongTinHeThongRap`)
	
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
	
		throw new Error(`${res.status} : Failed to fetch data cinema systems`);
	}
	const data = await res.json()

	return data.content
}

export  async function fetchTheaterInfoByShowtimeId(showtimeId: number) {
	
	const userCookie = cookies().get("REMEMBERME")
	const accessToken = userCookie ?  JSON.parse(userCookie.value).accessToken : ''
	
	
	const res = await fetch(
		`${process.env.DOMAIN}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showtimeId}`
	 ,{
	  headers: {
			"Authorization":`Bearer ${accessToken}`
		},
		cache:'no-store'
	 } );
	
	  if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error(`${res.status} : Failed to fetch data theater info`);
		
	  }
	  
	  const data = await res.json();
	
	  return data.content;
}

export  async function fetchTheaterInfoByMovieId(maPhim: string) {

	const res = await fetch(
		`${process.env.DOMAIN}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${Number(maPhim)}`,
		{next: { tags: ["showtimeInfoMovie"] },}
	 ,);
	   
	  if (!res.ok) {
		// This will activate the closest `error.js` Error 
		throw new Error(`${res.status} : Failed to fetch data theater info by Movie id`);
		
	  }
	
	  const data = await res.json();
	 
	  return data.content;
}



export  async function checkout(listBooking:ListTicketInterface) {

	const userCookie = cookies().get("REMEMBERME")
	if(!userCookie) return
	const {accessToken} = JSON.parse(userCookie.value)
	
	const res = await fetch(`${process.env.DOMAIN}/QuanLyDatVe/DatVe`,{
		method: "POST",
		headers: {
			"Content-Type": "application/json-patch+json",
			"Authorization": `Bearer ${accessToken}`,
			  },
		body: JSON.stringify(listBooking),
		next: { tags: ['theaterInfo'] }
	})
	
	if (!res.ok) {
	
		return undefined
	}
	const data =await res.json()
	if(data.statusCode === 200){
		revalidateTag('theaterInfo')
		
		cookies().set("checkout", encode(listBooking.maLichChieu.toString(),process.env.NEXT_PUBLIC_SECRET_KEY), {
			httpOnly: true,
			secure: true,
		  });
		
	}
	
	return data

}




