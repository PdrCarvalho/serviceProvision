import Appoitment from '../model/appointment';
import {
    isBefore, startOfHour, parseISO, format, subHours,endOfHour
  } from 'date-fns';
import User from '../model/user';
import Company from '../model/company';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';
import AppointmentMail from '../jobs/AppointmentMail';
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
        const hourdStart = startOfHour(parseISO(date));
        const hoursEnd = endOfHour(parseISO(date));
        if (isBefore(hourdStart, new Date())) {
          return res.status(400).json({ error: 'Past date are not permite' });
        }
        const CheckHours = await Appoitment.findOne({
           date : { $gte:hourdStart , $lte: hoursEnd },
           company : company,
           canceled_at: { $exists: false }
        })
        if(CheckHours){
            return res.status(400).json({error:"already booked time"})
        }
        const appointment = await Appoitment.create({user,company,date})
        appointment.company = CheckCompany;
        appointment.user = CheckUser;
        await Queue.add(AppointmentMail.Key, {
            appointment,
          });
        return res.json(appointment)
    }

    async FindAll(req, res){
    const appoitments  = await Appoitment.find({canceled_at: { $exists: false }});
        res.json(appoitments);
    }
    async Delete(req,res){
        const Checkappointment = await Appoitment.findById(req.params.id)
        if(!Checkappointment){
            return res.status(401).json({error:"appointment not exist"})
        }
        var appointment = await Appoitment.findByIdAndUpdate(
            req.params.id,
            {canceled_at: new Date() },
            { new: true },
          )
        appointment.company = await Company.findById(appointment.company);
        appointment.user = await User.findById(appointment.user);
        await Queue.add(CancellationMail.Key, {
            appointment,
          });
      
          return res.json(appointment);
    }
    async FindByUser(req,res){
        var appoitments = await Appoitment.find({
            user: req.params.id,
            canceled_at:{$exists : false}
        },{company:1,date:1,_id:0}).populate('company',{name:1,_id:0,email:1,service:1})
        return res.json(appoitments);
    }
    async FindByCompany(req,res){
        var appoitments = await Appoitment.find({
            company: req.params.id,
            canceled_at:{$exists : false}
        },{user:1,date:1,_id:0}).populate('user',{name:1,_id:0,email:1})
        return res.json(appoitments);
    }
}
export default new AppointmentController();