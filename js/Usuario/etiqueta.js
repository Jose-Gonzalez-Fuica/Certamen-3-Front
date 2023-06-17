
const cargarEtiquetas = () => {
      fetch('https://localhost:7214/api/Editor')
            .then(response => response.json())
            .then(usuario => {
                  if (usuario.success) {
                        let tabla = ''
                        usuario.data.forEach(element => {
                              tabla += `

                              <tr>
                                <td class="text-center text-wrap">${element.Etiqueta}</td>
                                <td class="text-center text-wrap">${element.Descripcion}</td>
                                <td class="text-center text-wrap">
                                    <div class="divColor" style="background-color:${element.Color}"></div>
                                </td>
                                <td class="text-center text-wrap">
                                    <button class="btn btn-warning" onclick="showModalEdit(${element.Id})"><i class="fa fa-pencil"></i></button>
                                    <button class="btn btn-danger" onclick="deleteEtiqueta(${element.Id}, ${element.Etiqueta}, ${element.Color})"><i class="fa fa-trash"></i></button>
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
      if (validateInputs() > 0) {

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

const validateInputs = () => {
      var nombreUsuario = document.getElementById("nombreUsuario");
      var password = document.getElementById("contrasena");
      var nombres = document.getElementById("nombres");
      var apellidos = document.getElementById("apellidos");
      var correo = document.getElementById("correo");
      // var telefono = document.getElementById("telefono"); 
      var billetera = document.getElementById("billetera");

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
      fetch('https://localhost:7247/api/usuario', {
            method: 'post',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
      }).then(response => {

            if(response.Success)
            {
                  cargarEtiquetas()
                  document.getElementById('closeModalUsuarioCreate').click();
                  limpiar()

                  Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        html: 'El Usuario se ha creado con éxito.'
                  })
            }
            else
            {
                  Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        html: 'Ha ocurrido un error al intentar modificar el Usuario.'
                  })
            }
            
      })
}

const modificar = (usuario) => {
      let id = document.getElementById('idUsuario').value;
      fetch('https://localhost:7247/api/sucursal/' + id, {
            method: 'put',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
      }).then(response => 
            {
                  if( response.Success )
                  {
                        cargarEtiquetas();
                        document.getElementById('idUsuario').value = '';
                        document.getElementById('closeModalUsuarioModify').click();
                        limpiar();

                        Swal.fire({
                              icon: 'success',
                              title: 'Éxito',
                              html: 'El Usuario se ha modificado con éxito.'
                        })
                  }
                  else
                  {
                        Swal.fire({
                              icon: 'error',
                              title: 'Error',
                              html: 'Ha ocurrido un error al intentar modificar el Usuario.'
                        })
                  }
      })

}

const limpiar = () => {
      document.querySelectorAll('.form-control').forEach(e => {
            e.value = ''
      })
}

const eliminar = (id) => {
      Swal.fire({
            title: 'Eliminar Usuario',
            html: `Estas seguro de eliminar el Usuario?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
      }).then((result) => {
            if (result.isConfirmed) {
                  fetch(`https://localhost:7247/api/sucursal/${id}`, {
                        method: 'delete'
                  }).then(response => {
                        Swal.fire(
                              'Eliminado',
                              'La sucursal ha sido eliminado con éxito',
                              'success'
                        )
                        cargarEtiquetas()
                  })

            }
      })
}

const showModalEdit = (id) => {
      document.getElementById('idUsuario').value = id;
} 

cargarEtiquetas()
