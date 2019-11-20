import Appoitment from '../model/appointment';
import User from '../model/user';
import Company from '../model/company';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';
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
    async Delete(req,res){
        const Checkappointment = await Appoitment.findById(req.params.id)
        if(!Checkappointment){
            return res.status(401).json({error:"appointment not exist"})
        }
        const appointment = await Appoitment.findByIdAndUpdate(
            req.params.id,
            {canceled_at: new Date() },
            { new: true },
          )
        await Queue.add(CancellationMail.Key, {
            appointment,
          });
      
          return res.json(appointment);
    }
}
export default new AppointmentController();