import Swal from "sweetalert2";

const successAlert = (title) => {
  const alert = Swal.fire({
    icon: "success",
    title: title,
    confirmButtonColor: "#228b22",
  });
  return alert;
};

export default successAlert;
