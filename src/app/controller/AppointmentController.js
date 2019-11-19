import Appoitment from '../model/appointment';
import User from '../model/user';
import Company from '../model/company';
import * as Yup from 'yup'
class AppointmentController {
    async Store(req, res) {
        const schema = Yup.object().shape({
            user: Yup.string().required(),
            company: Yup.string().required(),
            date: Yup.date().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
        const{user,company,date} = req.body
        const CheckUser = await User.findById(user);
        const CheckCompany = await Company.findById(company);
        if(!CheckCompany || !CheckUser){
            return res.status(401).json({error:"user or company not exist"})
        }
        const appoitment = await Appoitment.create({user,company,date})
        return res.json(appoitment)
    }

    async FindAll(req, res){
        const appoitments  = await Appoitment.find();
        res.json(appoitments);
    }
}
export default new AppointmentController();