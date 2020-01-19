import React from 'react';
    import axios from 'axios';

export default class Lights extends React.Component {

    getGroupByName (groups, name) {
        return Object.keys(groups)
            .map(key => { return groups[key]})
            .filter(group => {
                return group.name === name;
            })
            .pop();
    };

    setLight(lightId, brightness) {
        let options = {
            bri: brightness,
            hue: lightId * Math.floor((Math.random() * 3583) * 17) % 65535 //Math.floor(Math.random()*65535)
        };

        axios.put('http://192.168.1.3/api/ZrQtiubwFZ4uF-1UnlUSgg9HDbb3MByoUuGBb6DX/lights/' + lightId + '/state', options)
            .then((response) => {
                //console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    triggerCascade (lights) {
        console.log(lights);
        setTimeout(() => {

            lights.map(light => {
                let rand = 60 + Math.floor(Math.random() * 50);
                this.setLight(light, rand);
            });

            this.triggerCascade(lights);
        }, 1000);
    }


    render () {
        console.log('here');
        axios.get('http://192.168.1.3/api/ZrQtiubwFZ4uF-1UnlUSgg9HDbb3MByoUuGBb6DX/groups')
        .then((response) => {
            console.log(response.data);
            const livingRoom = this.getGroupByName(response.data, 'Living room');

            this.triggerCascade(livingRoom.lights);
            /*
            const livingRoomLights = livingRoom.lights.map(light => {
                this.setLight(light);
            });
            */

        })
        .catch(function (error) {
            console.log(error);
        });

        const uname = 'ZrQtiubwFZ4uF-1UnlUSgg9HDbb3MByoUuGBb6DX';

        return (
            <div>
                foo
            </div>
        )
    }
}