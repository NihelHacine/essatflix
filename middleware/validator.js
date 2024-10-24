const {check, validationResult} = require("express-validator");

exports.registerRules = () => 
    [
    check ('pseudo', 'pseudo is required').notEmpty(),
    check ('cin', 'phone number is required').notEmpty(),
    check ('cin', 'phone number is required').isLength(
        {
            min : 8 , 
            max : 8,
        }
    ),
    check ('email', 'email is required').notEmpty(),
    check ('email', 'check your email again').isEmail(),
    check ('password', 'password must be 6 to 20 characters').isLength(
        {
            min : 6 , 
            max : 20,
        }
    )
    ]
;

exports.loginRules = () => 
    [
        check ('email', 'email is required').notEmpty(),
        check ('email', 'check your email again').isEmail(),
        check ('password', 'password must be 6 to 20 characters').isLength(
            {
                min : 6 , 
                max : 20,
            }
    ), 
    ];

 exports.validation = (req,res,next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array().map((el)=>({msg:el.msg}))});   
    };
    next();
}

