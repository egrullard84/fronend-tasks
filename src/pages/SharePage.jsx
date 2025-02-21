import { useEffect, useState } from "react";
import { useShares } from "../context/ShareContext";
import { Link, useParams } from "react-router-dom";
import "../components/share.css";

export const SharePage = () => {
  const { getAllSharesByTask, shares } = useShares();
  const { taskId } = useParams();
  const [loaded, setLoaded] = useState(false);

  
  useEffect(() => {
    const fetchShares = async () => {
      try {
        await getAllSharesByTask(taskId);
        setLoaded(true);
      } catch (error) {
        console.error("Error al obtener tareas:", error);
      }
    };

    if (taskId) {
      fetchShares();
    }
  }, [taskId]);

  return (
    <div className="container">
      <h1>Lista de Tareas Compartidas</h1>

      {!loaded ? (
        <h2>Loading...</h2>
      ) : !Array.isArray(shares) || shares.length === 0 ? (
        <div>
          <p>No hay tareas compartidas disponibles</p>
          <Link to={`/shares/user/${taskId}`} className="edit-btn">Agregar</Link>
        </div>
      ) : (
        <>
          {shares.map((share) => (
            <div key={share?.id} className="card">
              <p><strong>Share ID:</strong> {share?.id}</p>
              <p><strong>Task ID:</strong> {share?.taskId}</p>
              <p><strong>User ID:</strong> {share?.userId}</p>
              {share?.user ? (
                <div>
                  <p><strong>Nombre:</strong> {share.user.name}</p>
                  <p><strong>Email:</strong> {share.user.email}</p>
                </div>
              ) : (
                <Link to={`/shares/user/${taskId}`} className="edit-btn">Agregar</Link>
              )}
            </div>
          ))}
          {/* Botón "Agregar" al final de la lista */}
          <div className="add-button-container">
            <Link to={`/shares/user/${taskId}`} className="edit-btn">Agregar</Link>
          </div>
        </>
      )}
    </div>
  );
};
