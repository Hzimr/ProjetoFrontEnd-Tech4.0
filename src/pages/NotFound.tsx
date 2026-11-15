import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="pt-10 gap-8 flex flex-col justify-start items-center h-96 ">
      <h2 className="text-2xl text-primary font-bold ">
        Página não Encontrada
      </h2>
      <Link to={"/"}>
        <p className="text-2xl text-primary hover:underline font-bold">
          Voltar
        </p>
      </Link>
    </div>
  );
};

export default NotFound;
