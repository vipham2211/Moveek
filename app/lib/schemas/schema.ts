import { z } from "zod";
export const userUpdateSchema = z.object({
	email: z.string().max(30, { message: "Email quá dài" }),
	hoTen: z.string().max(30, { message: "Họ tên quá dài" }),
	soDt: z
	  .string()
	  .regex(
		/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
		{ message: "Số điện thoại không hợp lệ" }
	  ),
  });

