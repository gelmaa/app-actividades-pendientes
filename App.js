class Activity {
    constructor(activity, course, day, month, year) {
        this.activity = activity;
        this.course = course;
        this.day = day;
        this.month = month;
        this.year = year;
    }
}

class UI {
    addActivity(actividad_pendiente) {
        const activityList = document.getElementById('activity-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card mb-4">
                <div class="card-body row"> 
                    <div class="col-md-9">
                        <h4><strong>${actividad_pendiente.activity}</strong></h4>
                        <h6 class="text-muted">${actividad_pendiente.course}</h6>
                        <hr />
                        <strong>Fecha de Entrega</strong>: ${actividad_pendiente.day} de ${actividad_pendiente.month} de ${actividad_pendiente.year}
                    </div>
                    <div class="col-md-3 text-end">
                        <a href="#" class="btn btn-danger" name="delete">Eliminar</a>
                    </div>
                </div>
            </div>
        `;
        activityList.appendChild(element);
    }

    resetForm() {
        document.getElementById('activity-form').reset();
    }

    deleteActivity(element) {
        if(element.name === 'delete') {
            element.parentElement.parentElement.parentElement.parentElement.remove();
            this.showMessage('Actividad eliminada satisfactoriamente.', 'info')
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        //Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// DOM Events
document.getElementById('activity-form')
    .addEventListener('submit', function(e) {
        const activity = document.getElementById('activity').value;
        const course = document.getElementById('course').value;
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;

        const actividad_pendiente = new Activity(activity, course, day, month, year);

        const ui = new UI();

        if(activity === '' || course === '') {
            return ui.showMessage('Por favor, complete los campos vacíos.', 'danger');
        }
        ui.addActivity(actividad_pendiente);
        ui.resetForm();
        ui.showMessage('Actividad agregada satisfactoriamente.', 'success')

        e.preventDefault();
});

document.getElementById('activity-list').addEventListener("click", function(e) {
    const ui = new UI();
    ui.deleteActivity(e.target);
});