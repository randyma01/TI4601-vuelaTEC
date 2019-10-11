import Student from '../../models/student';
import Joi from 'joi';

function testRoutes(server) {
  server.route([
    // -- test api -- //
    {
      method: 'GET',
      path: '/api/v1/test',
      handler: async (request, reply) => {
        return '<h1>test</1>';
      }
    },

    // -- find all students -- //
    {
      method: 'GET',
      path: '/api/v1/estudiantes/find',
      handler: async (request, reply) => {
        try {
          const person = await Student.find();
          return reply.response(person);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // -- find students by name -- //
    {
      method: 'GET',
      path: '/api/v1/estudiantes/findOne',
      handler: async (request, reply) => {
        try {
          if (request.query) {
            const { name } = request.query;
            return Student.find({ name });
          }
          return Student.find();
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // -- find students by id -- //
    {
      method: 'GET',
      path: '/api/v1/estudiantes/findById/{id}',
      handler: async (request, reply) => {
        try {
          const studentId = request.params.id;
          const person = await PersonModel.findById(studentId);
          return reply.response(person);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // -- insert students -- //
    {
      method: 'POST',
      path: '/api/v1/estudiantes/insert',
      options: {
        validate: {
          payload: {
            name: Joi.string()
              .min(3)
              .required(),
            lastName: Joi.string().required(),
            hobbie: Joi.string().required()
          },
          failAction: (request, reply, error) => {
            return error.isJoi
              ? reply.response(error.details[0]).takeover()
              : reply.response(error).takeover();
          }
        }
      },
      handler: async (request, reply) => {
        try {
          const newStudent = new Student(request.payload);
          const result = await newStudent.save();
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // -- update students by id -- //
    {
      method: 'PUT',
      path: '/api/v1/estudiantes/update/{id}',
      options: {
        validate: {
          payload: {
            lastName: Joi.string().optional()
          },
          failAction: (request, reply, error) => {
            return error.isJoi
              ? reply.response(error.details[0]).takeover()
              : reply.response(error).takeover();
          }
        }
      },
      handler: async (request, reply) => {
        try {
          const result = await Student.findByIdAndUpdate(
            request.params.id,
            request.payload,
            { new: true }
          );
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    },

    // -- delete students by id -- //
    {
      method: 'DELETE',
      path: '/api/v1/estudiantes/delete/{id}',
      handler: async (request, reply) => {
        try {
          const studentId = request.params.id;
          const result = await Student.findByIdAndDelete(studentId);
          return reply.response(result);
        } catch (error) {
          return reply.response(error).code(500);
        }
      }
    }
    //-----------------//
    /* {
      method: 'GET',
      path: '/api/v1/usuarios/{nombre?}',
      handler: async (req, res) => {
        const nombre = req.params.nombre ? req.params.nombre : 'invitado';
        return `Hola ${nombre}!`;
      }
    },
    {
      method: 'POST',
      path: '/api/v1/usuarios',
      handler: async (req, res) => {
        const newUser = {
          nombre: req.payload.nombre,
          apellido: req.payload.apellido
        };
        return res
          .response({
            datos: newUser
          })
          .type('application/json');
      }
    },
    {
      method: 'PUT',
      path: '/usuarios/{id}',
      handler: async (req, res) => {
        const newUser = {
          nombre: req.payload.nombre,
          apellido: req.payload.apellido
        };
        return res
          .response({
            datos: newUser,
            mensaje: `Usuario ID: ${req.params.id} modificado exitósamente!`
          })
          .type('application/json');
      }
    },
    {
      method: 'DELETE',
      path: '/usuarios/{id}',
      handler: async (req, res) => {
        return res
          .response({
            mensaje: `Usuario ID: ${req.params.id} eliminado exitósamente!`
          })
          .type('application/json');
      }
    } */
    //-----------------//
  ]);
}

export default testRoutes;
