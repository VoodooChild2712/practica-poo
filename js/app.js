const contenedorProfesores = document.querySelector('#cardsProfesores');
const contenedorEstudiantes = document.querySelector('#cardsEstudiantes');
const templateProfesor = document.querySelector('#templateProfesor');
const templateEstudiante = document.querySelector('#templateEstudiante');
const formulario = document.querySelector('#formulario')

const userName = document.querySelector('#nameUser');
const ageUser = document.querySelector('#ageUser');
const optionUser = document.querySelector('#optionUser');

const estudiantes = [];
const profesores = [];

class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
        this.id = Date.now();
    }

    static mostrarPersona(data, tipo) {
        if (tipo === 'Estudiante') {
            contenedorEstudiantes.textContent= '';
            const fragment = document.createDocumentFragment();
            data.forEach((item) => {
                fragment.appendChild(item.agregarNuevoEstudiante());
            });
            contenedorEstudiantes.appendChild(fragment);
        }
        if (tipo === 'Profesor') {
            contenedorProfesores.textContent = '';
            const fragment = document.createDocumentFragment();
            data.forEach((item) => {
                fragment.appendChild(item.agregarNuevoProfesor());
            })
            contenedorProfesores.appendChild(fragment);
        }
    }
}

class Estudiante extends Persona {

    constructor(nombre, edad, estado = false) {
        super(nombre, edad);
        this.estado = estado;
    }

    set setEstado (estado) {
        this.estado = estado;
    }

    agregarNuevoEstudiante() {
        const clone = templateEstudiante.content.cloneNode(true);
        clone.querySelector('h5 .text-primary').textContent = this.nombre;
        clone.querySelector('.lead').textContent = this.edad;

        if (this.estado) {
            clone.querySelector('.badge').className = 'badge bg-success';
            clone.querySelector('.badge').textContent = 'aprobado';
            clone.querySelector('.btn-success').disabled = true;
            clone.querySelector('.btn-danger').disabled = false;
        } else {
            clone.querySelector('.badge').className = 'badge bg-danger';
            clone.querySelector('.badge').textContent = 'reprobado';
            clone.querySelector('.btn-success').disabled = false;
            clone.querySelector('.btn-danger').disabled = true;
        }

        clone.querySelector('.btn-success').dataset.id = this.id;
        clone.querySelector('.btn-danger').dataset.id = this.id;

        return clone;
    }
}

class Profesor extends Persona {

    agregarNuevoProfesor() {
        const clone = templateProfesor.content.cloneNode(true);
        clone.querySelector('h5').textContent = this.nombre;
        clone.querySelector('.lead').textContent = this.edad;

        return clone;
    }
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = userName.value;
    const edad = ageUser.value;
    const tipo = optionUser.value;

    if (tipo === 'Estudiante') {
        const estudiante = new Estudiante(nombre, edad);
        estudiantes.push(estudiante);
        Persona.mostrarPersona(estudiantes, tipo);
    }

    if (tipo === 'Profesor') {
        const profesor = new Profesor(nombre, edad);
        profesores.push(profesor);
        Persona.mostrarPersona(profesores, tipo);
    }
});

document.addEventListener('click', (e) => {
    if (e.target.dataset.id) {
        if (e.target.matches('.btn-success')) {
            estudiantes.map((item) => {
                if (item.id === parseInt(e.target.dataset.id)) {
                    item.setEstado = true;
                };
                return item;
            });
            Persona.mostrarPersona(estudiantes, 'Estudiante');
        };
        if (e.target.matches('.btn-danger')) {
                estudiantes.map((item) => {
                    if (item.id === parseInt(e.target.dataset.id)) {
                        item.setEstado = false;
                    }
                    return item;
                });
                Persona.mostrarPersona(estudiantes, 'Estudiante');
        };
    };
});
