var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose')
var mongooseLogs = require('mongoose-activitylogs')
    
var Account = new Schema({    
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    accountType:  { type: Schema.Types.ObjectId, ref: 'nd_AccountType' },
    gender: String,
    active: Boolean,
    avatar: { data: Buffer, contentType: String },
    attempts: Number,
    lastloginAt: [{ type: Schema.Types.Date }],
    createdBy: {
        type: String
    },
    modifiedBy: {
        type: String
    }
},
{
    timestamps:true
}
);

Account.plugin(passportLocalMongoose,{
    usernameField: 'username',
    hashField:'password',
    attemptsField: 'attempts',
    lastLoginField: 'lastloginAt',
    MissingPasswordError: 'Favor, informar uma senha!',
    AttemptTooSoonError: 'Acesso do usuário bloqueado.Tente novamente mais tarde.',
    TooManyAttemptsError: 'Conta bloqueada devido ao excesso de tentativas de login.',
    IncorrectPasswordError: 'Senha incorreta!',
    IncorrectUsernameError: 'Email incorreto!',
    MissingUsernameError: 'Favor informar um email para login!',
    UserExistsError:'Estes dados já existem no registro de usuários.'  
});

Account.plugin(mongooseLogs, {
    schemaName: "Account User",
    createAction: "created",
    updateAction: "updated",
    deleteAction: "deleted" 
});

var account = mongoose.model('nd_Account', Account);

module.exports = account;