
    window.onload = () => {
        const button = document.querySelector('button[data-action="change"]');
        button.innerText = 'NEXT';

        let places = staticLoadPlaces();
        renderPlaces(places);
    };

function staticLoadPlaces() {
    return [
        {
            name: 'Hamburguesa',
            location: {
                // decomment the following and add coordinates:
                //lat: 17.26913,
                //lng: -97.67965,
            },
        },
    ];
    }
    var models = [
        {
            url: 'https://cdn.glitch.com/05e1a300-5fe8-4c3d-aa8e-bc069bcb2db8%2FHamburguesa.glb?v=1623293425699',
            scale: '6 6 6',
            info: 'Hamburguesa, con la mejor carne, Precio: $60',
            rotation: '0 -80 60',
            
        },
        {
            url: 'https://cdn.glitch.com/05e1a300-5fe8-4c3d-aa8e-bc069bcb2db8%2FPizza.glb?v=1623293471899',
            scale: '30 30 30',
            rotation: '0 180 0',
            info: 'Pizza, Hawallana relleno de queso, Precio: $20',
        },
        {
            url: 'https://cdn.glitch.com/05e1a300-5fe8-4c3d-aa8e-bc069bcb2db8%2Fcombo.glb?v=1623293390010',
            scale: '3 3 3',
            rotation: '250 100 -100',
            info: 'Combo de Hamburguesa, incluye refresco, Precio: $120',
        },
    ];

    var modelIndex = 0;
    var setModel = function (model, entity) {
        if (model.scale) {
            entity.setAttribute('scale', model.scale);
        }

        if (model.rotation) {
            entity.setAttribute('rotation', model.rotation);
        }

        if (model.position) {
            entity.setAttribute('position', model.position);
        }

        entity.setAttribute('gltf-model', model.url);

        const div = document.querySelector('.instructions');
        div.innerText = model.info;
    };

    function renderPlaces(places) {
        let scene = document.querySelector('a-scene');

        places.forEach((place) => {
            let latitude = place.location.lat;
            let longitude = place.location.lng;

            let model = document.createElement('a-entity');
            model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

            setModel(models[modelIndex], model);

            model.setAttribute('animation-mixer', '');

            document.querySelector('button[data-action="change"]').addEventListener('click', function () {
                var entity = document.querySelector('[gps-entity-place]');
                modelIndex++;
                var newIndex = modelIndex % models.length;
                setModel(models[newIndex], entity);
            });

            scene.appendChild(model);
        });
    }
