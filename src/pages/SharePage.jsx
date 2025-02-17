import { useEffect } from "react";
import { useShares } from "../context/ShareContext";
import { Link, useParams } from "react-router-dom";
import "../components/share.css";

export const SharePage = () => {
  const { getAllSharesByTask, shares } = useShares([]);
  const { taskId } = useParams();

  useEffect(() => {
    const fetchShares = async () => {
      try {
        await getAllSharesByTask(taskId);
      } catch (error) {
        console.error("Error al obtener tareas:", error);
      }
    };
    fetchShares();
  }, []);

  return (
    <div className="container">
      <h1>Lista de Tareas Compartidas</h1>
      {shares.length === 0 ? (
        <div>
          <p>No hay tareas compartidas disponibles</p>
          <Link to={`/shares/user/${taskId}`} className="edit-btn">Agregar</Link>
        </div>
      ) : (
        shares.map((share) => (
          <div className="card" key={share.id}>
            <p>
              <strong>Share ID:</strong> {share.id}
            </p>
            <p>
              <strong>Task ID:</strong> {share.taskId}
            </p>
            <p>
              <strong>User ID:</strong> {share.userId}
            </p>
            {share.user && (
              <div>
                <p>
                  <strong>Nombre:</strong> {share.user.name}
                </p>
                <p>
                  <strong>Email:</strong> {share.user.email}
                </p>
              </div>
            )}
            <button>eliminar</button>
            </div>
        ))
      )}
    </div>
  );
};
