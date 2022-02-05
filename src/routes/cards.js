const router = require("express").Router();

module.exports = db => {
  router.get("/cards", (request, response) => {
    const queryString =  `SELECT * FROM cards`
    db.query(queryString)
     .then(({ rows: cards}) => {
      response.json(cards);
    })
    .catch(error => console.log(error));
  })
 
   router.post("/cards", (request, response) => {
    const { photo,email,phone,facebook,github,linkedln,instagram,bio } = request.body
    const queryString = `INSERT INTO cards (photo,email,phone,facebook,github,linkedln,instagram,bio) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) returning *`
    const queryparams = [photo,email,phone,facebook,github,linkedln,instagram,bio]
    return db.query(queryString,queryparams)
             .then((response) => {
                return response.rows[0];
                })
             .catch(error => console.log(error));
  
  });

  // router.put("/cards/:id", (request, response) => {
  //   const queryString = `update INTO cards (photo,email,phone,facebook,github,linkedln,instagram,bio) VALUES ($1,$2,$3) returning *`;
  //   const queryparams =[]
  //   return db.query(queryString,queryparams)
  //     .then((res) => {
  //       return res.rows[0];
  //     })
  //     .catch(error => console.log(error));
  
  // })

  //   const { student, interviewer } = request.body.interview;

  //   db.query(
  //     `
  //     INSERT INTO interviews (student, interviewer_id, appointment_id) VALUES ($1::text, $2::integer, $3::integer)
  //     ON CONFLICT (appointment_id) DO
  //     UPDATE SET student = $1::text, interviewer_id = $2::integer
  //   `,
  //     [student, interviewer, Number(request.params.id)]
  //   )
  //     .then(() => {
  //       setTimeout(() => {
  //         response.status(204).json({});
  //         updateAppointment(Number(request.params.id), request.body.interview);
  //       }, 1000);
  //     })
  //     .catch(error => console.log(error));
  // });

  router.delete("/cards/:id", (request, response) => {
    const queryString =  `DELETE FROM cards WHERE card_id = $1`
    const queryparams = [request.params.id]
    db.query(queryString, queryparams)
      .then(() => {
      setTimeout(() => {
        response.status(204).json({});
        updateAppointment(Number(request.params.id), null);
      }, 1000);
    });
  });

  return router;
}















