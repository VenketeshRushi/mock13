const express = require("express");
const Job = require("../model/job.model");
const jobRouter = express.Router();

jobRouter.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const data = await Job.create(req.body);
    return res.status(200).send({ message: "Data added", data: data });
  } catch (e) {
    return res.status(500).send("Server Error");
  }
});

jobRouter.get("/", async (req, res) => {
  try {
    const data = await Job.find();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send("Job Error");
  }
});

jobRouter.delete("/:id", async (req, res) => {
  let id = req.params.id.split(":")[1];
  console.log(id);
  try {
    const data = await Job.findByIdAndDelete(id);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send("Job Error");
  }
});

// jobRouter.get("/", async (req, res) => {
//   const { sort, search, filter, page = 1, limit = 10 } = req.query;
//   try {
//     let newJob;
//     let len = await Job.find();
//     if (search) {
//       if (filter) {
//         if (sort == "asc") {
//           newJob = await Job.find({ role: filter, language: search })
//             .sort({ createdAt: 1 })
//             .skip(10 * (page - 1))
//             .limit(limit);
//         } else if (sort == "desc") {
//           newJob = await Job.find({ role: filter, language: search })
//             .sort({ createdAt: -1 })
//             .skip(10 * (page - 1))
//             .limit(limit);
//         }
//       } else {
//         if (sort == "asc") {
//           newJob = await Job.find({ language: search })
//             .sort({ createdAt: 1 })
//             .skip(10 * (page - 1))
//             .limit(limit);
//         } else if (sort == "desc") {
//           newJob = await Job.find({ language: search })
//             .sort({ createdAt: -1 })
//             .skip(10 * (page - 1))
//             .limit(limit);
//         }
//       }
//     } else if (filter) {
//       if (sort == "asc") {
//         newJob = await Job.find({ role: filter })
//           .sort({ createdAt: 1 })
//           .skip(10 * (page - 1))
//           .limit(limit);
//       } else if (sort == "desc") {
//         newJob = await Job.find({ role: filter })
//           .sort({ createdAt: -1 })
//           .skip(10 * (page - 1))
//           .limit(limit);
//       }
//     } else {
//       if (sort == "asc") {
//         newJob = await Job.find()
//           .sort({ createdAt: 1 })
//           .skip(10 * (page - 1))
//           .limit(limit);
//       } else if (sort == "desc") {
//         newJob = await Job.find()
//           .sort({ createdAt: -1 })
//           .skip(10 * (page - 1))
//           .limit(limit);
//       }
//     }

//     return res.status(200).send({
//       message: "Product get successfully",
//       data: newJob,
//       totalPages: Math.ceil(len.length / limit),
//     });
//   } catch (e) {
//     return res.status(500).send("Internal server error");
//   }
// });

module.exports = jobRouter;
