const { product, user, category, productCategory } = require("../../models");

exports.getProducts = async (req, res) => {
  try {
    let data = await product.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: category,
          as: "categories",
          through: {
            model: productCategory,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });

    data = data.map((item) => {
      item.image = 'http://localhost:5000/uploads/' + item.image

      return item
    })

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await product.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: 'user',
          attributess: {
            exclude: ['createdAt', 'updatedAt', 'password' ],
          },
        },
        {
          model: category,
          as: 'categories',
          through: {
            model: productCategory,
            as: 'bridge',
            attributes: [],
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },

          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          }
        },
      ]
    });

    res.status(200).send({
      status: "success",
      data,
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "server error"
    })
  }
};

exports.addProduct = async (req, res) => {
  try {
    // const { category: categoryName, ...data } = req.body;
    
    const data = await product.create({
      ...req.body,
      image: req.file.filename,
      idUser: req.user.id
    })

    res.send({
      message: 'Add Product finished',
      data
    })
  
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;


    const data = {
      name: req?.body?.name,
      desc: req?.body.desc,
      price: req?.body?.price,
      image: req?.file?.filename,
      qty: req?.body?.qty,
      idUser: req?.user?.id,
    };

    await product.update(data, {
      where: {
        id,
      },
    });

    res.send({
      status: 'success',
      data: {
        id,
        data,
        image: req?.file?.filename,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.deleteProduct = async(req,res) => {
  try {
    const { id } = req.params;

    // delete product with destroy method
    await product.destroy({
      where: {
        id,
      }
    });

    res.status(200).send({
      status: "success",
      message: "Delete Product id: ${id} finished"
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      message: "server error"
    })
  }
};



