import { useEffect, useState } from "react";
import { useShares } from "../context/ShareContext";
import { Link, useParams } from "react-router-dom";
import "../components/share.css";

export const SharePage = () => {
  const { getAllSharesByTask, shares } = useShares();
  const { taskId } = useParams();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (taskId && !loaded) {
      const fetchShares = async () => {
        try {
          await getAllSharesByTask(taskId);
          setLoaded(true);
        } catch (error) {
          console.error("Error al obtener tareas:", error);
        }
      };
      fetchShares();
    }
  }, [taskId, loaded]);

  return (
    <div className="container">
      <h1>Lista de Tareas Compartidas</h1>

      {/* Mostrar "loading..." hasta que los datos estén cargados */}
      {!loaded ? (
        <h2>Loading...</h2>
      ) : !Array.isArray(shares) || shares.length === 0 ? (
        <div>
          <p>No hay tareas compartidas disponibles</p>
          <Link to={`/shares/user/${taskId}`} className="edit-btn">Agregar</Link>
        </div>
      ) : (
        shares
          .filter((share) => share && typeof share === "object") // Filtrar elementos no válidos
          .map((share) => (
            <div key={share.id || Math.random()} className="card">
              <p><strong>Share ID:</strong> {share.id}</p>
              <p><strong>Task ID:</strong> {share.taskId}</p>
              <p><strong>User ID:</strong> {share.userId}</p>
              {share.user && (
                <div>
                  <p><strong>Nombre:</strong> {share.user.name}</p>
                  <p><strong>Email:</strong> {share.user.email}</p>
                </div>
              )}
            </div>
          ))
      )}

      <Link to={`/shares/user/${taskId}`} className="edit-btn">Agregar</Link>
    </div>
  );
};
