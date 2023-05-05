const Notificacion = ({ mensaje }) => {
  if (mensaje === null) return null;
  return <div className="notificacion">{mensaje}</div>;
};
export default Notificacion;
