import User from '../model/user'
import * as Yup from 'yup'

class UserController {
    async Store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(3),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        const{name,email,password} = req.body
        const user = await User.create({name, email, password})
        
        return res.json(user)
    }

    async FindAll(req, res){
        const users  = await User.find();
        res.json(users);
    }
}

export default new UserController();