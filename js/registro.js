// Declaracion e inicializacion de variable de iniciado
let iniciado 

iniciado=sessionStorage.getItem('iniciado');  


// Creación de la clase y la funcion constructora de usuarios
class usuarios {
    constructor(nombre, apellido, email, password) {
            this.nombre = nombre,
            this.apellido = apellido,
            this.email = email,
            this.password = password;
    }
}

// Función de subida a LocalStorage
const cargarDataEnStorage = (key,value) => {
    localStorage.setItem(key,value);
}

// Función de subida a sessionStorage
const cargarDataEnSessionStorage = (key,value) => {
    sessionStorage.setItem(key,value);
}


// Obtenemos data de registro almacenada y la parseamos a objetos
let userAlmacenado = JSON.parse(localStorage.getItem('usuario')); 

// Funcion para cuando el usuario este loggeado o iniciado en la página 
const usuarioIniciado = () => {
    
    iniciado=sessionStorage.getItem('iniciado');  
    if(iniciado == "true" || iniciado == true){
        
        // Aplicación y retiro de atributos segun estado de inicio de sesión 
        const iniciadoBtn = document.querySelector(".loggedInBtn");
        iniciadoBtn.setAttribute('style', 'display: inline;');

        const btnSignUp= document.getElementById("signUpBtn")
        btnSignUp.setAttribute('style', 'display: none;');
        
        const btnLogIn = document.getElementById("logInBtn")
        btnLogIn.setAttribute('style', 'display: none;');

        

        // Apartado individual (Usuario ya iniciado)
        let mensajeIndividual = document.querySelector(".mensajePersonalizado");

        mensajeIndividual.innerText = `Hola, ${userAlmacenado.nombre}!`

        mensajeIndividual.classList.add("dropdown-item");

        // Captura de contendor de datos personales
        let dataSeccion = document.querySelector(".infoDataContainer");

        // Imprimiendo datos
        dataSeccion.innerHTML=`

                                <div class="separadorInfo">
                                <p class="dataInfo dataInfoTitle"> Nombre: <p class="dataInfo resaltado">${userAlmacenado.nombre}</p></p>
                                </div>

                                <div class="separadorInfo">
                                <p class="dataInfo dataInfoTitle"> Apellido: <p class="dataInfo resaltado">${userAlmacenado.apellido}</p></p>
                                </div>

                                <div class="separadorInfo">
                                <p class="dataInfo dataInfoTitle"> Email: <p class="dataInfo resaltado">${userAlmacenado.email}</p></p>
                                </div>

                                `
    } 
}

usuarioIniciado();



// Declaración e inicializacion de variables para la validacion del registro (Sign Up)
nombreRegistroValido = false;
apellidoRegistroValido = false;
emailRegistroValido = false;
passwordRegistroValido = false;


// Validación de campos de registro 
const nombreRegistro = document.getElementById("registroNombre"); 
const apellidoRegistro = document.getElementById('registroApellido');
const emailRegistro = document.getElementById('registroEmail');
const passwordRegistro = document.getElementById('registroPassword');

//Validación por campo individual de registro
    emailRegistro.addEventListener('blur',() => {
        if (emailRegistro.value.length > 0 && emailRegistro.value.includes("@") && emailRegistro.value.includes(".com")){
            const texto = document.querySelector('.emailError');
            texto.innerHTML =`<p class = "mensajeError">
                                El mail es valido
                                </p>`;
            emailRegistroValido=true

                            
        }else{
            const texto = document.querySelector('.emailError');
            texto.innerHTML =`<p class = "mensajeError">
                                El mail ingresado no es valido
                                </p>
                            `;
            emailRegistroValido=false
        }
    }) 
    passwordRegistro.addEventListener('blur',() => {
        if (passwordRegistro.value.length > 5){
            const texto = document.querySelector('.passwordError');
            texto.innerHTML =`<p class = "mensajeError">
                                La contraseña es valida
                                </p>`;

        passwordRegistroValido = true;
                            
        }else{
            const texto = document.querySelector('.passwordError');
            texto.innerHTML =`<p class = "mensajeError">
                                    Recorda tener al menos 6 caracteres
                                </p>
                            `;
            passwordRegistroValido =false;
                        
        }
    }) 
    apellidoRegistro.addEventListener('blur',() => {
        if (apellidoRegistro.value.length > 0){
            const texto = document.querySelector('.surnameError');
            texto.innerHTML =`<p class = "mensajeError">
                                El apellido es valido
                                </p>`;
            apellidoRegistroValido = true
                            
        }else{
            const texto = document.querySelector('.surnameError');
            texto.innerHTML =`<p class = "mensajeError">
                                El apellido ingresado no es valido
                                </p>
                            `;
            apellidoRegistroValido = false
        }
    }) 
    nombreRegistro.addEventListener('blur',() => {
        if (nombreRegistro.value.length > 0){
            const texto = document.querySelector('.nameError');
            texto.innerHTML =`<p class = "mensajeError">
                                El nombre ingresado es valido
                                </p>`;
            nombreRegistroValido = true

                            
        }else{
            const texto = document.querySelector('.nameError');
            texto.innerHTML =`<p class = "mensajeError">
                                El nombre ingresado no es valido
                                </p>
                            `;
        nombreRegistroValido = false; 
                        }
    });


// Validación final para registrarse
const registroForm = document.getElementById('formularioRegistro');

const recargarVentana = () =>{
    window.location.reload()
}

//Funcion para la carga en storage y almacenamiento si el usuario es creado correctamente o alerta si no ha sido posible crearlo
const validarIngreso = (nombre, apellido, email, password) => {
    if(nombreRegistroValido === true && apellidoRegistroValido === true && emailRegistroValido === true && passwordRegistroValido === true){
        let user1 = new usuarios (nombre, apellido, email, password); 
        cargarDataEnStorage('usuario', JSON.stringify(user1));

            swal.fire({
                title: "Usuario creado correctamente",
                text: "Bienvenido/a a TecnoArg",
                icon: "success",
            })
            setTimeout(recargarVentana, 1500); 
    }else{
        swal.fire({
            background: "#fff",
            color: "#7B68EC",
            title: "No se ha podido crear el usuario",
            text:"Algunos de los datos no es correcto, vuelva a intentarlo!"
        })
        setTimeout(recargarVentana, 1500); 
    }
}

// Validacion final del formulario de registro
registroForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById("registroNombre").value; 
    const apellido = document.getElementById('registroApellido').value;
    const email = document.getElementById('registroEmail').value;
    const password = document.getElementById('registroPassword').value;

    validarIngreso(nombre, apellido, email, password);
    registroForm.reset(); 

    userAlmacenado = JSON.parse(localStorage.getItem('usuario')); 
})


// Validación del formulario de inicio de sesión (Log in, usuario ya creado previamente)
const inicioForm = document.getElementById("inicioForm");

let incioEmail = document.getElementsByClassName('inicioEmail');
let incioNombre = document.getElementsByClassName('inicioNombre');

inicioForm.addEventListener('submit', (e) =>{

    e.preventDefault();

    const email = document.getElementById('inicioEmail'); 
    const password = document.getElementById('incioPassword'); 

    let emailAlmacenado = userAlmacenado?.email || "No se ha creado un usuario";
    let passwordAlmacenado =  userAlmacenado?.password || "No se ha creado un usuario";

    console.log(emailAlmacenado, passwordAlmacenado); 

    if( password.value == passwordAlmacenado && email.value == emailAlmacenado){
    
        swal.fire({
            title: "¡Te extrañamos!",
            text: "Gracias por iniciar sesión en TecnoArg",
            icon:"success",
            background: "#fff",
            color: "#7B68EC",
        })
        iniciado = true;
        cargarDataEnSessionStorage('iniciado', iniciado);
        usuarioIniciado();
    } else{
    
        swal.fire({
            title: "Credenciales incorrectas",
            text:        
            `Alguno de los datos ingresados no coincide!
            
            Recuerda que debes haberte creado un Usuario!`,
            icon:"error",
            background: "#fff",
            color: "#7B68EC",

        })
        cargarDataEnSessionStorage('iniciado', iniciado);
    }

    inicioForm.reset();
})


// Captura de boton y creacion de función para el cierre de sesión
let cerrarSesionBtn = document.querySelector(".cerrarSesion");

const cerrarSesion = () => {
    iniciado=false;
    cargarDataEnSessionStorage('iniciado', iniciado);
    usuarioIniciado();
    window.location.reload();
}
cerrarSesionBtn.addEventListener('click', cerrarSesion);



