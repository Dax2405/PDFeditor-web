"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import axios from "axios";

export default function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };

  const handleSendFiles = async () => {
    setLoading(true);
    let formData = new FormData();
    formData.append("file", files[0]);
    formData.append("start", startPage.toString());
    formData.append("end", endPage.toString());

    try {
      const response = await axios.post(
        "https://pdf-api.dax-ec.ru/dividir_pdf/",
        formData,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "split_output.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      if ((error as any).response && (error as any).response.data) {
        const errorMessage = await (error as any).response.data.text();
        const errorJson = JSON.parse(errorMessage);
        setError(errorJson.detail);
      } else {
        setError((error as any).message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {loading && (
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {error && <div className="text-red-500">{error}</div>}
      <div className="w-full">
        <FileUpload onChange={handleFileUpload} />
      </div>
      <div className="flex flex-col items-center mt-4">
        <label className="text-white">Desde la página:</label>
        <input
          type="number"
          value={startPage}
          onChange={(e) => setStartPage(parseInt(e.target.value))}
          className="bg-zinc-800 text-white rounded-md p-2 mb-2"
        />
        <label className="text-white">Hasta la página:</label>
        <input
          type="number"
          value={endPage}
          onChange={(e) => setEndPage(parseInt(e.target.value))}
          className="bg-zinc-800 text-white rounded-md p-2 mb-4"
        />
      </div>
      <button
        onClick={handleSendFiles}
        className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
      >
        Separar PDF
      </button>
    </div>
  );
}
