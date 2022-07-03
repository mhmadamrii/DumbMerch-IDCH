const { category, productCategory } = require('../../models');

exports.getCategories = async (req, res) => {
    try {
        const data = await category.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            }
        });

        res.status(200).send({
            status: "success",
            data
        })
    } catch (error) {
        console.log(error)
        res.status(400).send ({
            status: "failed",
            message: "server error"
        })
    }
};

exports.getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await category.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        res.send({
            status: 'success',
            data,
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: "failed",
            message: "server error"
        })
    }
};

exports.addCategory = async (req, res) => {
    try {
        const newCategory = await category.create(req.body);

        res.status(200).send({
            status: 'success',
            data: {
                id: newCategory.id,
                name: newCategory.name,
            }
        })
    } catch (error) {
        connsole.log(error);
        res.status(400).send({
            status: "failed",
            message: "server error"
        })
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const data = {
            name: req?.body?.name
        };

        await category.update(data, {
            where: {
                id,
            }
        });
        
        res.status(200).send({
            status: "success",
            data: {
                id: id,
                data
            }
        })
        // console.log(data.name)
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "server error"
        })
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await category.destroy({
            where: {
                id,
            }
        });

        await productCategory.destroy({
            where: {
                idCategory: id,
            }
        })

        res.status(200).send({
            status: "success",
            message: `Delete category id: ${id} finished`
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "server error"
        })
    }
};