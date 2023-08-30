import Layout from "@/components/layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import Dummy from "./dummy.png";

const DOM = () => {
  // Mengubah teks konten dari elemen
  setTimeout(() => {
    const element = document.getElementById("text-1");
    if (element) {
      element.textContent = "ini text pertama update";
    }
  }, 5000);

  // Menambahkan class
  setTimeout(() => {
    const element = document.getElementById("class-1");
    if (element) {
      element.classList.remove("bg-gray-800", "text-white");
      element.classList.add("bg-indigo-800", "text-gray-300");
      element.classList.replace("flex-row", "flex-col");
    }
  }, 5000);

  // Menambahkan elemen baru
  useEffect(() => {
    const newElement = document.createElement("p");
    newElement.textContent = "Ini paragraf baru";

    const targetElement = document.getElementById("dom-1");
    if (targetElement) {
      if (!targetElement.classList.contains("new-paragraph-added")) {
        targetElement.parentNode?.insertBefore(
          newElement,
          targetElement.nextSibling
        );
        targetElement.classList.add("new-paragraph-added");
      }
    }

    return () => {
      if (targetElement) {
        targetElement.classList.remove("new-paragraph-added");
        targetElement.parentNode?.removeChild(newElement);
      }
    };
  }, []);

  // Mengubah link
  setTimeout(() => {
    const linkElement = document.getElementById("link-1") as HTMLAnchorElement;
    if (linkElement) {
      linkElement.href = "https://www.example-update.com";
    }
  }, 5000);

  // Menambahkan event listener
  if (typeof window != "undefined") {
    const clickButton = document.getElementById("click-button");
    clickButton?.addEventListener("click", () => {
      alert("Tombol telah diklik!");
    });
  }

  // Mengambil nilai dari input
  if (typeof window != "undefined") {
    const inputElement = document.querySelector<HTMLInputElement>("#input-1");
    const inputValue = inputElement?.value;
    console.log("Nilai input:", inputValue);
  }

  if (typeof window != "undefined") {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log("Lokasi pengguna:", latitude, longitude);
    });
  }

  // user media
  if (typeof window != "undefined") {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(function (stream) {
        const videoElement = document.createElement("video");
        videoElement.srcObject = stream;
        videoElement.autoplay = true;
        document.body.appendChild(videoElement);
      })
      .catch(function (error) {
        console.error("Gagal mengakses kamera atau audio:", error);
      });
  }

  // canvas
  if (typeof window !== "undefined") {
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "blue";
        ctx.fillRect(10, 10, 50, 50);
      } else {
        console.error("Browser does not support 2d canvas context.");
      }
    }
  }

  // canvas
  if (typeof window !== "undefined") {
    const canvas = document.getElementById(
      "certificateCanvas"
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const background = new Image();
      background.src = "https://dummyimage.com/hd1080";
      background.onload = function () {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // Memuat data dari API atau database
        const name = "John Doe";
        const score = 95;

        // Menggambar data ke dalam canvas
        ctx.font = "bold 40px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";

        ctx.fillText(`Sertifikat Kepelatihan`, canvas.width / 2, 250);
        ctx.fillText(`Diberikan Kepada: ${name}`, canvas.width / 2, 350);
        ctx.fillText(`Skor: ${score}`, canvas.width / 2, 450);
      };
      background.onerror = function () {
        console.error("Failed to load background image.");
      };
    } else {
      console.error("Browser does not support 2d canvas context.");
    }
  }

  // Menyimpan hasil canvas sebagai PDF saat tombol di klik

  // const downloadButton = document.getElementById("downloadButton");
  // if (downloadButton) {
  //   downloadButton.addEventListener("click", function () {
  //     const dataUrl = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF();
  //     pdf.addImage(dataUrl, "PNG", 0, 0);
  //     pdf.save("certificate.pdf");
  //   });
  // }

  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon");
      if (response.status === 200) {
        const responseData = await response.json();
        setData(responseData);
      }
    } catch (error: any) {
      console.log("error", error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <div
        id="class-1"
        className="flex flex-row gap-4 bg-gray-800 text-white p-8 items-center"
      >
        <div id="dom-1" className="p-2 rounded bg-blue-200 text-black">
          ini text pertama
        </div>

        <Link
          href={"https://www.example.com"}
          id="link-1"
          className="p-2 rounded bg-blue-200 text-black"
        >
          link 1
        </Link>

        <button
          id="click-button"
          className="p-2 rounded bg-blue-200 text-black"
        >
          klik me
        </button>

        <input
          id="input-1"
          value={"value input-1"}
          onChange={() => {}}
          className="border rounded px-4"
        />

        {!loading && (
          <div className="flex flex-col gap-4 w-full p-8 bg-white text-gray-900 rounded">
            {data?.results.map((pokemon: { name: string; url: string }) => (
              <div>{pokemon.name}</div>
            ))}
          </div>
        )}

        <canvas id="myCanvas" />
        <canvas id="certificateCanvas" />
      </div>
    </Layout>
  );
};

export default DOM;
