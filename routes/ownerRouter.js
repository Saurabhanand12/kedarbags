const express = require('express');
const router = express.Router();
const ownermodel = require('../models/owner-model')


if (process.env.NODE_ENV === "development") {
  router.post('/create', async (req, res) => {
    try {
      let owners = await ownermodel.find();

      // Agar already ek owner hai, to naya create karne ki permission mat do
      if (owners.length > 0) {
        return res
          .status(403) // 403 = Forbidden (503 nahi use karna chahiye)
          .send("You don't have permission to create a new Owner");
      }

      let { fullname, email, password } = req.body;

      let createdOwner = await ownermodel.create({
        fullname,
        email,
        password, // ⚠️ Hash karna mat bhoolna!
      });

      res.status(201).send(createdOwner);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });
}

router.get('/admin',(req,res)=>{
    let success = req.flash("success");
    res.render("admin",{success});
});


module.exports = router;

// <!-- <%- include('admin/partials/header') %>

//         <% if (success && success.length> 0) { %>
//             <div class="bg-success absolute rounded-md">
//                 <span class="inline-block mt-1 mb-1 text-white">
//                     <%= success %>
//                 </span>
//             </div>
//             <% } %> -->