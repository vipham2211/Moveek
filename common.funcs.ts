import { notFound } from "next/navigation";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}`;
};

export const formatHours = (dateString: string) => {
  const date = new Date(dateString);
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return `${hour < 10 ? "0" + hour : hour}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};
export const formatYear = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  return year.toString()
};

export const  convertString = (str:string) => {
  if(str === 'Quản trị') return 'QuanTri'
  if(str === 'Khách hàng') return 'KhachHang'
 
}

export const formatTotalCost = (num: number) => {

  var strNumber = num.toString();

  var parts = [];

  for (var i = strNumber.length - 1, j = 0; i >= 0; i--, j++) {
    parts.unshift(strNumber[i]);

    if (j % 3 === 2 && i !== 0) {
      parts.unshift(".");
    }
  }

  var formattedNumber = parts.join("");

  return formattedNumber;
};
export function capitalizeFirstLetterEveryWord(str: string): string {
  // Chia chuỗi thành các từ riêng biệt bằng cách tách theo khoảng trắng
  const words = str.split(' ');

  // Lặp qua mỗi từ và viết hoa chữ cái đầu tiên của từ đó
  const capitalizedWords = words.map(word => {
    const firstLetter = word.charAt(0).toUpperCase(); // Chữ cái đầu tiên của từ
    const restOfWord = word.substring(1).toLowerCase(); // Các chữ cái còn lại của từ
    return `${firstLetter}${restOfWord}`; // Kết hợp chữ cái đầu tiên và phần còn lại để tạo nên từ mới viết hoa chữ cái đầu tiên
  });

  // Nối các từ lại thành một chuỗi mới và trả về
  return capitalizedWords.join(' ');

}

export const encode = (text: string|undefined, secretKey: string | undefined) => {
  // Chuyển đổi secret key thành Uint8Array
  var secretKeyBytes = new TextEncoder().encode(secretKey);

  // Chuyển đổi text thành Uint8Array
  var textBytes = new TextEncoder().encode(text);

  // XOR Uint8Array của text với Uint8Array của secret key
  var encodedBytes = new Uint8Array(textBytes.length);
  for (var i = 0; i < textBytes.length; i++) {
    encodedBytes[i] = textBytes[i] ^ secretKeyBytes[i % secretKeyBytes.length];
  }

  // Mã hóa Uint8Array đã xor bằng base64
  var encodedText = btoa(
    String.fromCharCode.apply(null, Array.from(encodedBytes))
  );

  // Chuyển đổi kết quả thành chuỗi hex
  var encodedHex = "";
  for (var j = 0; j < encodedText.length; j++) {
    var hex = encodedText.charCodeAt(j).toString(16);
    encodedHex += hex.length === 2 ? hex : "0" + hex;
  }

  // Trả về kết quả mã hóa
  return encodedHex;
};

export const decode = (encodedText: string, secretKey: string | undefined) => {
  // Chuyển đổi secret key thành Uint8Array
  var secretKeyBytes = new TextEncoder().encode(secretKey);
  var encodeURI = encodeURIComponent(encodedText);
  // Chuyển đổi chuỗi hex thành chuỗi base64
  var encodedTextBase64 = "";
  for (var i = 0; i < encodeURI.length; i += 2) {
    var hex = encodeURI.substring(i, i + 2);
    encodedTextBase64 += String.fromCharCode(parseInt(hex, 16));
  }

  // Kiểm tra xem chuỗi base64 có đúng định dạng hay không
  try {
    atob(encodedTextBase64);
  } catch (error) {
    return notFound();
  }

  // Giải mã base64 để nhận được Uint8Array đã xor
  var encodedBytes = new Uint8Array(
    atob(encodedTextBase64)
      .split("")
      .map(function (c) {
        return c.charCodeAt(0);
      })
  );

  // XOR Uint8Array đã xor với Uint8Array của secret key
  var decodedBytes = new Uint8Array(encodedBytes.length);
  for (var j = 0; j < encodedBytes.length; j++) {
    decodedBytes[j] =
      encodedBytes[j] ^ secretKeyBytes[j % secretKeyBytes.length];
  }

  // Chuyển đổi Uint8Array thành text
  var decodedText = new TextDecoder().decode(decodedBytes);

  // Trả về kết quả giải mã
  return decodedText;
};

export const getAlphabetLetter = (index: number) => {
  // Chuyển đổi chỉ số thành ASCII tương ứng của chữ cái
  var letterAscii = index + 96;

  // Chuyển đổi ASCII thành chữ cái
  var letter = String.fromCharCode(letterAscii);

  return letter.toUpperCase();
};

export const convertSeatName = (seatName: string) => {
  let num = Number(seatName);

  return num > 16 && num % 16 !== 0 ? num % 16 : num % 16 === 0 ? 16 : num % 16;
};

export const removeDiacriticalMarks =(string:string)=> {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}



export function orderBy(array:any, field:string , sortOrder: 'asc' | 'desc') {
  return array.sort((a:any, b:any) => {
    const valueA = a[field] 
    const valueB = b[field]

    if (valueA < valueB) {
      return sortOrder === 'asc' ? -1 : 1;
    } else if (valueA > valueB) {
      return sortOrder === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  });
}




