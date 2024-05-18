import { FaStar } from "react-icons/fa";
import Link from "next/link";

export default function MovieCard({ element }) {
  const apiImage = process.env.NEXT_PUBLIC_API_IMG;
  return (
    <div className="flex flex-col w-[340px] items-center justify-center gap-4 py-[18px] rounded-xl bg-slate-950 bg-opacity-60 border-[1.5px] border-[#0cb7f2] shadow-blue-shadow">
      <img
        src={apiImage + element.poster_path}
        alt={element.title}
        className="flex items-center rounded-xl border border-black w-[300px]"
      />
      <h2 className="text-white font-bold">{element.title}</h2>
      <p className="flex items-center gap-2 justify-center text-white">
        <FaStar color="#f1e702" />
        {element.vote_average}
      </p>
      <Link
        href={`/movie/${element.id}`}
        className="bg-[#d9d246] text-black font-bold py-4 px-[120px] rounded-xl border border-black hover:bg-[#88842e] transition duration-500"
      >
        ABOUT
      </Link>
    </div>
  );
}
