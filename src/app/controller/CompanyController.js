import Company from '../model/company'
import * as Yup from 'yup'

class CompanyController {
    async Store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(3),
            service: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        const{name,email,password,service,description} = req.body
        const company = await Company.create({name, email, password, service, description})
        
        return res.json(company)
    }
    async FindAll(req, res) {
        const companys  = await Company.find();
        res.json(companys);
    }
}

export default new CompanyController();