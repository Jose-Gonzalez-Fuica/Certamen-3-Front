
let usuarios = [];

const cargarUsuarios = () => {
      fetch('https://localhost:44380/api/Usuario')
            .then(response => response.json())
            .then(usuario => {
                  if (usuario.data.length > 0) {
                        usuarios = usuario.data;
                        let tabla = ''
                        usuario.data.forEach(element => {
                              tabla += `
                      <tr>
                              <td class="text-center">${element.nombreUsuario}</td>
                              <td class="text-center">${element.contrasena}</td>
                              <td class="text-center">${element.nombres}  ${element.apellidos}</td>
                              <td class="text-center">${element.correo}</td>
                              <td class="text-center">${element.telefono}</td>
                              <td class="text-center">${element.montoBilletera}</td>
                              <td class="text-right">
                                    <button class="btn btn-warning" 
                                    data-bs-toggle="modal" data-bs-target="#modalModifyUsuario"
                                    onclick="showModalEdit(${element.id})"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-danger" onclick="eliminar(${element.id}, '${element.nombres}', '${element.apellidos}')"><i class="fa fa-trash"></i></button>
                              </td>
                        </tr>
                      `
                        })
                        document.getElementById('bodyUsuarios').innerHTML = tabla

                        Swal.fire({
                              icon: 'info',
                              title: 'Información',
                              html: 'Se han cargado exitosamente los registros.'
                        })
                  }
                  else {
                        document.getElementById('tablaUsuarios').hidden = false
                  }
            })
}

const validarUsuario = (control) => {
      if (validateInputs(control) > 0) {

            const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-right',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: false,
                  didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
            })

            Toast.fire({
                  icon: 'error',
                  title: 'Formulario Incompleto',
                  html: 'Por favor, complete toda la información del formulario.'
            })

            return;
      }
      else {
           

            if( control == 'Guardar' )
            {
                  var usuario = {
                        NombreUsuario: document.getElementById("nombreUsuario").value,
                        Contrasena: document.getElementById("contrasena").value,
                        Nombres: document.getElementById("nombres").value,
                        Apellidos: document.getElementById("apellidos").value,
                        Correo: document.getElementById("correo").value,
                        Telefono: document.getElementById("telefono").value,
                        MontoBilletera: document.getElementById("billetera").value
                  };

                  crear(usuario);
            }
            else
            {
                  var usuario = {
                        NombreUsuario: document.getElementById("nombreUsuarioE").value,
                        Contrasena: document.getElementById("contrasenaE").value,
                        Nombres: document.getElementById("nombresE").value,
                        Apellidos: document.getElementById("apellidosE").value,
                        Correo: document.getElementById("correoE").value,
                        Telefono: document.getElementById("telefonoE").value,
                        MontoBilletera: document.getElementById("billeteraE").value
                  };

                  modificar(usuario);
            }
      }
}

const validateInputs = (control) => {
      if( control == 'Guardar' )
      {
            var nombreUsuario = document.getElementById("nombreUsuario");
            var password = document.getElementById("contrasena");
            var nombres = document.getElementById("nombres");
            var apellidos = document.getElementById("apellidos");
            var correo = document.getElementById("correo");
            // var telefono = document.getElementById("telefono"); 
            var billetera = document.getElementById("billetera");
      }
      else
      {
            var nombreUsuario = document.getElementById("nombreUsuarioE");
            var password = document.getElementById("contrasenaE");
            var nombres = document.getElementById("nombresE");
            var apellidos = document.getElementById("apellidosE");
            var correo = document.getElementById("correoE");
            // var telefono = document.getElementById("telefonoE"); 
            var billetera = document.getElementById("billeteraE");
      }
      

      var controls = [nombreUsuario, password, nombres, apellidos, correo, billetera];
      var error = 0;

      for (var i = 0; i < controls.length; i++) {

            if (controls[i].value.trim() == "") {
                  controls[i].parentNode.classList.add("is-invalid");
                  error++;
            } else {
                  controls[i].parentNode.classList.remove("is-invalid");
                  controls[i].parentNode.classList.add("is-valid");
            }

      }

      return error;
}

const crear = (usuario) => {
      const url = new URL('https://localhost:44380/api/Usuario');
      url.search = new URLSearchParams(usuario).toString();
    
      fetch(url, { method: 'post' })
      .then(response => {
        if (!response.ok) {
          throw new Error('La respuesta fue incorrecta');
        }
        return response.json();  
      })
      .then(result => {
        if(result.success) {
          document.getElementById('closeModalUsuarioCreate').click();
          limpiar();
    
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            html: 'El Usuario se ha creado con éxito.'
          }).then(() => {
            cargarUsuarios();
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            html: 'Ha ocurrido un error al crear el Usuario.'
          });
        }
      })
      .catch(error => {
        console.error('Ha ocurrido un error', error);
      });
}
  
const modificar = (usuario) => {
      let id = document.getElementById('idUsuario').value;
      usuario.id = parseInt(id);
      const url = new URL('https://localhost:44380/api/Usuario');
      url.search = new URLSearchParams(usuario).toString();
    
      fetch(url, { method: 'put' })
      .then(response => {
        if (!response.ok) {
          throw new Error('La respuesta fue incorrecta');
        }
        return response.json();  
      })
      .then(result => {
        if(result.success) {
          document.getElementById('closeModalUsuarioModify').click();
          limpiar();
          document.getElementById('idUsuario').value = '';
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            html: 'El Usuario se ha modificado con éxito.'
          }).then(() => {
            cargarUsuarios();
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            html: 'Ha ocurrido un error al modificar el Usuario.'
          });
        }
      })
      .catch(error => {
        console.error('Ha ocurrido un error', error);
      });

}

const limpiar = () => {
      document.querySelectorAll('.form-control').forEach(e => {
            e.value = '';
            e.parentElement.classList.remove('is-valid');
      })
}

const eliminar = (id, nombres, apellidos) => {
      Swal.fire({
            title: 'Eliminar Usuario',
            html: `Estas seguro de eliminar el Usuario <br> <b><em> ${nombres} ${apellidos} </em></b>?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
      }).then((result) => {
            if (result.isConfirmed) {
                  fetch(`https://localhost:44380/api/Usuario/${id}`, { method: 'delete' })
                        .then(response => {
                              if (!response.ok) {
                                    throw new Error('La respuesta fue incorrecta');
                              }
                              return response.json();
                        })
                        .then(result => {
                              if (result.success) {
                                    Swal.fire({
                                          icon: 'success',
                                          title: 'Éxito',
                                          html: 'El Usuario se ha eliminado con éxito.'
                                    }).then(() => {
                                          cargarUsuarios();
                                    })
                              } else {
                                    Swal.fire({
                                          icon: 'error',
                                          title: 'Error',
                                          html: 'Ha ocurrido un error al eliminar el Usuario.'
                                    });
                              }
                        })
                        .catch(error => {
                              console.error('Ha ocurrido un error', error);
                        });
            }
      })
}

const showModalEdit = (id) => {
      document.getElementById('idUsuario').value = id;

      var element = usuarios.find(usuario => usuario.id === id);

      document.getElementById("nombreUsuarioE").value = element.nombreUsuario;
      document.getElementById("contrasenaE").value = element.contrasena;
      document.getElementById("nombresE").value = element.nombres;
      document.getElementById("apellidosE").value = element.apellidos;
      document.getElementById("correoE").value = element.correo;
      document.getElementById("telefonoE").value = element.telefono;
      document.getElementById("billeteraE").value = element.montoBilletera;
} 

cargarUsuarios()
