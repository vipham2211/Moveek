export interface MovieInterface {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: string;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}

export interface MoviesInterface {
  dangChieu: boolean;
  hinhAnh: string;
  hot: boolean;
  maPhim: number;
  sapChieu: true;
  tenPhim: string;
  lstLichChieuTheoPhim: Array<ShowTimeInterface>;
}

export interface ShowTimeInterface {
  giaVe: number;
  maLichChieu: number;
  maRap: string;
  ngayChieuGioChieu: string;
  tenRap: string;
}

export interface CinemaSystemInterface {
  maHeThongRap: string;
  tenHeThongRap: string;
  biDanh: string;
  logo: string;
}

export interface CinemasInterface {
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
  danhSachPhim: Array<MoviesInterface>;
}

export interface SeatInterface {
  maGhe: number;
  tenGhe: string;
  maRap: number;
  loaiGhe: string;
  stt: string;
  giaVe: number;
  daDat: boolean;
  taiKhoanNguoiDat: string | null;
}

export interface MovieInfoInterface {
  maLichChieu: number;
  tenCumRap: string;
  tenRap: string;
  diaChi: string;
  tenPhim: string;
  hinhAnh: string;
  ngayChieu: string;
  gioChieu: string;
}
export interface MovieDetailInterface {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
  ngayKhoiChieu: string;
  danhGia: number;
}

export interface TheaterInfoInterface {
  thongTinPhim: Partial<MovieInfoInterface>;
  danhSachGhe: Array<SeatInterface>;
}

export interface ComboItemInterface {
  name: string;
  cost: number;
  detail?: string;
  quantity: number;
  type: string;
  shortName: string;
}

export interface ListTicketInterface {
  maLichChieu: number;
  danhSachVe: Array<{
    maGhe: number;
    giaVe: number;
  }>;
}

export interface NewUserInterface {
  taiKhoan: string,
  matKhau: string,
  email:string,
  soDt: string,
  maNhom: string,
  maLoaiNguoiDung: string,
  hoTen: string
}

export interface UserInfoInterface {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  loaiNguoiDung: string;
  accessToken: string;
}
export type ModifiedUserInfo = Omit<UserInfoInterface, 'accessToken'> & {
	soDt: string;
	maLoaiNguoiDung: string;
  };

export interface DataListUsersInterface {
  currentPage: number,
  count: number,
  totalPages: number,
  totalCount: number,
  items:ModifiedUserInfo[]
}
export interface DataListMoviesInterface {
  currentPage: number,
  count: number,
  totalPages: number,
  totalCount: number,
  items:MovieDetailInterface[]
}

export interface newMovieInterface {
  tenPhim: string,
  trailer: string,
  hinhAnh:File ,
  moTa: string,
  maNhom: string,
  hot: boolean,
  dangChieu: boolean,
  sapChieu: boolean,
  ngayKhoiChieu: string,
  danhGia: number
}


export interface userInfoI {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  loaiNguoiDung: string;
  thongTinDatVe: {
    maVe: number;
    ngayDat: string;
    tenPhim: string;
    hinhAnh: string;
    giaVe: number;
    thoiLuongPhim: number;
    danhSachGhe: {
      maHeThongRap: string;
      tenHeThongRap: string;
      maCumRap: string;
      tenCumRap: string;
      maRap: number;
      tenRap: string;
      maGhe: number;
      tenGhe: string;
    }[];
  }[];
}

export interface createShowTimeInterface {
  maPhim: number,
  ngayChieuGioChieu: string,
  maRap: string,
  giaVe: number
}