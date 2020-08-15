import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { ModalService } from '@app/modal/modal.service';

const PI = Math.PI;
const PI2 = PI * 2;

const SPEED = 2;
const SICK_TIMEFRAME = 275;

const COLOR = {
  recovered: 'violet',
  sick: 'tomato',
  dead: 'white',
  healthy: '#00d1b2'
};

const NORMAL = (degrees: any) => {
  const radians = (degrees * PI) / 180;
  return { x: Math.sin(radians), y: -Math.cos(radians) };
};

const WALLS = {
  N: { velocity: NORMAL(0) },
  S: { velocity: NORMAL(0) },
  E: { velocity: NORMAL(90) },
  W: { velocity: NORMAL(90) }
};

@Component({
  selector: 'app-about',
  templateUrl: './covid19-calculator.component.html',
  styleUrls: ['./covid19-calculator.component.scss']
})
export class Covid19CalculatorComponent implements OnInit {
  version: string | null = environment.version;
  $overlay: any;
  $quarantine: any;
  $run: any;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.$overlay = document.getElementById('overlay');
    this.$quarantine = document.getElementById('quarantine');
    this.$run = document.getElementById('run');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  public runSimulator() {
    const q = parseFloat(this.$quarantine.value);
    const pop = new Population(1000, q, 3);
    const graph = new Graph(pop);
    graph.context.clearRect(0, 0, graph.width, graph.height);
    this.$overlay.classList.remove('active');

    function run() {
      pop.tick();
      graph.tick();
      if (graph.done) {
        this.$overlay.classList.add('active');
      } else {
        requestAnimationFrame(run);
      }
    }
    run();
  }
}

class Vector {
  y: any;
  x: any;
  constructor(x: any, y: any) {
    this.x = x;
    this.y = y;
  }
}

class Person {
  private position: Vector;
  private radius: any;
  private height: any;
  private width: any;
  private id: any;
  private angle: number;
  private recovered: boolean;
  private sickFrame: number;
  private vulnerable: any;
  private quarantined: any;
  private velocity: { x: number; y: number };
  private dead: any;
  private sick: any;
  constructor(
    id: any,
    radius: any,
    width: any,
    height: any,
    sick: any,
    quarantined: any,
    vulnerable: any
  ) {
    this.id = id;
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.position = new Vector(
      Math.random() * (this.width - this.radius * 2) + this.radius,
      Math.random() * (this.height - this.radius * 2) + this.radius
    );

    this.quarantined = quarantined;
    this.sick = sick;
    this.vulnerable = vulnerable;
    this.sickFrame = 0;
    this.recovered = false;
    this.angle = Math.random() * 360;
    this.updateVelocity();
  }

  updateVelocity() {
    const radians = (this.angle * PI) / 180;
    this.velocity = {
      x: Math.sin(radians) * SPEED,
      y: -Math.cos(radians) * SPEED
    };
  }

  get edge() {
    return {
      bottom: this.position.y + this.radius,
      left: this.position.x - this.radius,
      right: this.position.x + this.radius,
      top: this.position.y - this.radius
    };
  }

  reflect({ velocity }: any) {
    const x = this.velocity.x * velocity.x;
    const y = this.velocity.y * velocity.y;
    const d = 2 * (x + y);
    this.velocity.x -= d * velocity.x;
    this.velocity.y -= d * velocity.y;
  }

  collide({ id, position }: any) {
    const dx = this.position.x - position.x;
    const dy = this.position.y - position.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    return id !== this.id && d < this.radius * 2;
  }

  tick(population: any) {
    if (this.edge.left <= 0) {
      this.reflect(WALLS.W);
    }
    if (this.edge.right >= this.width) {
      this.reflect(WALLS.E);
    }
    if (this.edge.top <= 0) {
      this.reflect(WALLS.N);
    }
    if (this.edge.bottom >= this.height) {
      this.reflect(WALLS.S);
    }
    if (this.sick) {
      population.forEach((person: any) => {
        if (!person.recovered && !person.sick && this.collide(person)) {
          person.sick = true;
        }
      });
    }
    if (!this.quarantined && !this.dead) {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
    if (this.sick) {
      this.sickFrame++;
    }
    if (this.sickFrame >= SICK_TIMEFRAME) {
      this.sick = false;
      this.recovered = true;
      if (this.vulnerable) {
        this.dead = true;
      }
    }
  }

  handleReflection(person: any) {
    if (this.edge.left <= person.edge.right) {
      this.reflect(WALLS.W);
    }
    if (this.edge.right >= person.edge.left) {
      this.reflect(WALLS.E);
    }
    if (this.edge.top <= person.edge.bottom) {
      this.reflect(WALLS.N);
    }
    if (this.edge.bottom >= person.edge.top) {
      this.reflect(WALLS.S);
    }
  }
}

class Population {
  private radius: number;
  private height: any;
  private width: any;
  private context: CanvasRenderingContext2D;
  private canvas: any;
  private people: any[];
  constructor(size: any, quarantineRate: any, patientZeroes: any) {
    this.people = [];
    this.canvas = document.getElementById('population');
    this.context = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.radius = size < 250 ? 12 : size < 500 ? 8 : 5;
    for (let i = 0; i < size; i++) {
      const sick = i > size - patientZeroes - 1;
      const quarantined = i / size <= quarantineRate;
      const vulnerable = Math.random() < 0.01;
      this.people.push(
        new Person(
          i,
          this.radius,
          this.width,
          this.height,
          sick,
          quarantined,
          vulnerable
        )
      );
    }
  }

  tick() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.people.forEach(p => {
      this.draw(p);
      p.tick(this.people);
    });
  }

  draw({ dead, position, recovered, sick }: any) {
    this.context.fillStyle = sick
      ? COLOR.sick
      : dead
      ? COLOR.dead
      : recovered
      ? COLOR.recovered
      : COLOR.healthy;
    this.context.beginPath();
    this.context.arc(position.x, position.y, this.radius, 0, PI2);
    this.context.fill();
  }
}

class Graph {
  width: any;
  height: any;
  context: CanvasRenderingContext2D;
  done: boolean;
  private $sick: any;
  private $healthy: any;
  private $recovered: any;
  private $dead: any;
  private canvas: any;
  private population: any;
  private x: number;
  constructor(population: any) {
    this.population = population;
    this.canvas = document.getElementById('graph');
    this.context = this.canvas.getContext('2d');
    this.height = this.canvas.height;
    this.width = this.canvas.width;
    this.$recovered = document.getElementById('recovered');
    this.$healthy = document.getElementById('healthy');
    this.$sick = document.getElementById('sick');
    this.$dead = document.getElementById('dead');
    this.$recovered.style.color = COLOR.recovered;
    this.$healthy.style.color = COLOR.healthy;
    this.$sick.style.color = COLOR.sick;
    this.reset();
  }

  reset() {
    this.x = 0;
    this.done = false;
  }

  tick() {
    let recovered = 0;
    let healthy = 0;
    let sick = 0;
    let dead = 0;
    this.population.people.forEach((person: any) => {
      if (person.dead) {
        dead++;
      } else if (person.recovered) {
        recovered++;
      } else if (person.sick) {
        sick++;
      } else {
        healthy++;
      }
    });
    const total = dead + recovered + healthy + sick;

    const recoveredH = (recovered / total) * this.height;
    const healthyH = (healthy / total) * this.height;
    const sickH = (sick / total) * this.height;
    const deadH = (dead / total) * this.height;

    this.$recovered.innerText = recovered;
    this.$healthy.innerText = healthy;
    this.$sick.innerText = sick;
    this.$dead.innerText = dead;

    this.context.strokeStyle = COLOR.recovered;
    this.context.beginPath();
    this.context.moveTo(this.x, 0);
    this.context.lineTo(this.x, recoveredH);
    this.context.stroke();

    this.context.strokeStyle = COLOR.healthy;
    this.context.beginPath();
    this.context.moveTo(this.x, recoveredH);
    this.context.lineTo(this.x, recoveredH + healthyH);
    this.context.stroke();

    this.context.strokeStyle = COLOR.sick;
    this.context.beginPath();
    this.context.moveTo(this.x, recoveredH + healthyH);
    this.context.lineTo(this.x, recoveredH + healthyH + sickH);
    this.context.stroke();

    this.context.strokeStyle = COLOR.dead;
    this.context.beginPath();
    this.context.moveTo(this.x, recoveredH + healthyH + sickH);
    this.context.lineTo(this.x, recoveredH + healthyH + sickH + deadH);
    this.context.stroke();

    this.x++;

    if (this.x >= this.width) {
      this.done = true;
    }
  }
}
