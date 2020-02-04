export default class chartDrawing {

    constructor(polluant, canvas) {

        this.polluant = polluant;
        this.canvas = canvas;
        this.newDate = new Date();                
        this.days = new Array();
        this.vLimite;
        this.maxPoint;
        this.gradient = this.canvas.createLinearGradient(300, 250, 300, 600);        
        this.gradient.addColorStop(0, 'rgb(255, 0, 0)'); 
        this.gradient.addColorStop(0.2, 'rgb(255, 170, 0)');
        this.gradient.addColorStop(0.4, 'rgb(255, 255, 0)');   
        this.gradient.addColorStop(0.6, 'rgb(153, 230, 0)');
        this.gradient.addColorStop(0.8, 'rgb(0, 204, 170)');
        this.gradient.addColorStop(1, 'rgb(0, 204, 170)');
        this.moment = require('moment');
    }

    drawMesureMaxAndPrevi(data, previsionData) {

        if(this.polluant == "O3") {
            this.vLimite = [180, 180, 180, 180, 180, 180, 180, 180];
            this.maxPoint = 360;
        } else {
            this.vLimite = [200, 200, 200, 200, 200, 200, 200, 200];
            this.maxPoint = 400;
        }
            
        previsionData.unshift(data[data.length-1]);
    
        for(let u = 0; u < 4; u++) {
            previsionData.unshift(null);
        }

        for(let i = -5; i < 3; i++) {   
            const date = this.moment(this.newDate).add(i, 'days').format('DD/MM/YYYY'); 
            this.days.push(date);
        }
        
        new Chart(this.canvas, {
            type: 'line',
            data: {
                labels: this.days,
                datasets: [
                    {
                        label: this.polluant + " Mesures",
                        borderColor: this.gradient,
                        fill: false,
                        data: data,
                    },
                    {
                        label: this.polluant + " Prévisions",
                        borderColor: this.gradient,
                        borderDash: [10,5],
                        fill: false,
                        data:  previsionData,
                    },
                    {
                        label: this.polluant + " Valeur limite",
                        fill: false,
                        backgroundColor: "red",
                        borderColor: "red",
                        data: this.vLimite,
                    },
                ]
            },
            options: {
                responsive: true,
                title: {
                    fontSize: 20,
                    display: true,
                    text: 'Evolution des max horaires journaliers en ' + this.polluant
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: this.maxPoint
                        }
                    }]
                },
                legend: {
                    position: 'bottom',
                    display: true, 
                    labels: {fontSize: 10},                
                },
            }
        });
    }

    drawMesureMax(data) {

        this.vLimite = [350, 350, 350, 350, 350, 350, 350, 350];
        this.maxPoint = 700;
        this.newDate.setDate((this.newDate.getDate()-8));

        for(let i = 0; i < 8; i++) {                              
            const date = this.moment(this.newDate).add(i, 'days').format('DD/MM/YYYY'); 
            this.days.push(date);
        }

        new Chart(this.canvas, {
            type: 'line',
            data: {
                labels: this.days,
                datasets: [
                    {
                        label: this.polluant + " Mesures",
                        borderColor: this.gradient,
                        fill: false,
                        data: data,
                    },
                    {
                        label: this.polluant + " Valeur limite",
                        fill: false,
                        backgroundColor: "red",
                        borderColor: "red",
                        data: this.vLimite,
                    },
                ]
            },
            options: {
                responsive: true,
                title: {
                    fontSize: 20,
                    display: true,
                    text: 'Evolution des max horaires journaliers en ' + this.polluant
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: this.maxPoint
                        }
                    }]
                },
                legend: {
                    position: 'bottom',
                    display: true, 
                    labels: {fontSize: 10},                
                },
            }
        });
    }

    drawMesureMoyAndPrevi(data, previsionData) {
        this.vLimite = [50, 50, 50, 50, 50, 50, 50, 50];
        this.maxPoint = 100;

        for(let i = -5; i < 3; i++) {   
            const date = this.moment(this.newDate).add(i, 'days').format('DD/MM/YYYY'); 
            this.days.push(date);
        }

        previsionData.unshift(data[data.length-1]);
    
        for(let u = 0; u < 4; u++) {
            previsionData.unshift(null);
        }

        new Chart(this.canvas, {
            type: 'line',
            data: {
                labels: this.days,
                datasets: [
                    {
                        label: this.polluant + " Mesures",
                        borderColor: this.gradient,
                        fill: false,
                        data: data,
                    },
                    {
                        label: this.polluant + " Prévisions",
                        borderColor: this.gradient,
                        borderDash: [10,5],
                        fill: false,
                        data:  previsionData,
                    },
                    {
                        label: this.polluant + " Valeur limite",
                        fill: false,
                        backgroundColor: "red",
                        borderColor: "red",
                        data: this.vLimite,
                    },
                ]
            },
            options: {
                responsive: true,
                title: {
                    fontSize: 20,
                    display: true,
                    text: 'Evolution des moyennes journalières en ' + this.polluant
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: this.maxPoint
                        }
                    }]
                },
                legend: {
                    position: 'bottom',
                    display: true, 
                    labels: {fontSize: 10},                
                },
            }
        });
    }
}