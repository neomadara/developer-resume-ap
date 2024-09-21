import request from "supertest";
import app from "../../../app";
import * as Repository from "../../../src/resume/repository";


afterEach(() => {
  jest.resetAllMocks();
});

describe('Get Resume by email', () => {
  it('Should have an email in their query params', async () => {
    const res = await request(app).get("/resume/instanciageek")

    expect(res.status).toEqual(409)
    expect(res.body).toHaveProperty('issues')
  })
  it('Should return an object with the Resume information', async () => {
    const resumeMock = {
      name: "Cristian Gutiérrez",
      appointment: "Software Engineer",
      email: "instanciageek@gmail.com",
      phone: "+569 86174119",
      linkedInUrl: "http://linkedin.com/in/cristian-gutiérrez-a1958660/",
      githubUrl: "http://github.com/neomadara",
      scrumUrl: "https://scrummanager.com/index.php/es/perfil-publico?id=23964",
      presentation: "Hola! soy Cristian Gutiérrez Ingeniero en Informática y desarrollador Full Stack JavaScript. Lo que me apasiona de mi carrera es la oportunidad de resolver diversos problemas, también el llevar soluciones de mejor calidad a las personas ya que creo fielmente que la tecnologia nos entrega un valor incalculable.",
      technologies: [{
        subtitle: "Lenguajes de Programación",
        techs: ["JavaScript", "TypeScript", "Python","Go","Kotlin"]
      }, {subtitle: "Frontend", "techs": ["Angular 8","ReactJS"]}, {
        subtitle: "Backend",
        techs: ["MongoDB","Postgres"]
      }, {subtitle: "Mobile", "techs": ["Android"]}, {
        subtitle: "AWS",
        techs: ["S3","EC2","CloudFront","Route 53", "Elastic Beanstalk","EKS","Amplify"]
      }, {
        subtitle: "Mindset",
        techs: ["Pair Programming","Feedback","Agile Values","Team Work","Constant Learning"]
      }],
      jobs: [{
        appointment: "Full Stack Developer",
        company: "Walmart",
        date: "noviembre/2019 - Presente",
        description: "En Walmart formo parte del equipo 300, el cual se encarga de generar nuevos features y dar soporte al producto de Punto de Compra (Walstore).",
        stacks: ["React", "NodeJS","MongoDB", "Clean Architecture", "TDD", "Kubernetes","Docker", "Go", "Kotlin", "Android"]
      }, {
        appointment: "Senior Full Stack Developer",
        company: "CrediTú",
        date: "abril/noviembre 2019",
        description: "En CrediTú fui parte de un equipo el cual tenia como misión la generación de un sistema capaz saber perfilar Clientes en base a parametros entregados por el negocio.",
        stacks: ["Angular 8","Nest JS","MongoDB", "AWS"]
      }, {
        appointment: "Software Engineer",
        company: "R2DA",
        date: "2017 - 2019",
        description: "En R2DA tuve que desarrollar sistemas a medida, para el ambito seguimiento de ordenes de forma interna de empresa, modulos de gestion de proyectos (etapas, tareas, responsables, perfiles, etc) y generación de scripts para RPA.",
        stacks: ["Angular", "Lumen", "PHP","Mysqli"]
      }, {
        appointment: "Software Engineer",
        company: "Sietrans",
        date: "2016 - 2017",
        description: "En Sientras desarrollé funcionalidades a pedido del cliente, mayormente para el negocio de la Vendimia, administración flotas de camiones, mantenimientos de estos y del area de RRHH",
        stacks: ["PHP", "JavaScript", "Mysqli"]
      }],
      educations: [{
        career: "Ingeniero en informática",
        university: "Universidad tecnológica de Chile - INACAP",
        date: "2009 - 2015"
      }, {career: "Scrum Master", "university": "Diacos", "date": "2018"}],
      interests: ["Video juegos", "Basquetbol", "Rockear!"],
      githuburl: "http://github.com/neomadara",
      linkedinurl: "http://linkedin.com/in/cristian-gutiérrez-a1958660/",
      scrumurl: "https://scrummanager.com/index.php/es/perfil-publico?id=23964"
    }

    const spyRepository = jest
      .spyOn(Repository, "findByEmail")
      .mockResolvedValue(resumeMock)

    const res = await request(app).get("/resume/instanciageek@gmail.com")
    expect(spyRepository).toHaveBeenCalled()
    expect(res.status).toEqual(200)
    expect(res.body).toEqual(resumeMock)
  })
  it('Should return a not found message when the resume dont exists', async () => {
    const resumeMock = null

    const spyRepository = jest
      .spyOn(Repository, "findByEmail")
      .mockResolvedValue(resumeMock)

    const res = await request(app).get("/resume/nicolegeek@gmail.com")
    expect(spyRepository).toHaveBeenCalled()
    expect(res.status).toEqual(404)
    expect(res.body).toEqual(resumeMock)
  })
})
