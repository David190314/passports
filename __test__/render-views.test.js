const authCtrl = require('../controllers/auth.controller');
const catCtrl = require('../controllers/category.controller')

describe("probando que se este renderizando las  vistas del servidor",() =>{
    it("Probando render de Login", ()=>{
        const view = 'pages/login'
        const payload = {"title": "Iniciar Sesíon"}
        const req = {};
        const res = {
            render: jest.fn()
        }
        jest.spyOn(authCtrl, "renderLogin")
        authCtrl.renderLogin(req, res)
        expect(res.render).toHaveBeenCalled();
        expect(res.render).toHaveBeenCalledWith(view,payload)
    });

    it("Probande el render de categoria",()=>{
        const req = {
            user: {
                firstname : "firstname",
                lastname: "lastname"
            }
        }
        const view = 'pages/categories'
        const username = `${req.user.firstname} ${req.user.lastname}`;
        const payload = {"title":"Categories", username}
        const res = {
            render: jest.fn()
        }
        jest.spyOn(catCtrl, "renderCategory")
        catCtrl.renderCategory(req, res)
        expect(res.render).toHaveBeenCalled();
    })

    it("cerrendo sesión ", ()=>{
        const router = '/login'
        const req = {
            logout: jest.fn()
        }
        const res = {
            redirect: jest.fn()
        }
        jest.spyOn(authCtrl, "logout")
        authCtrl.logout(req, res)
        expect(res.redirect).toHaveBeenCalled();
        expect(req.logout).toHaveBeenCalled();
        expect(res.redirect).toHaveBeenCalledWith(router)
    });
});